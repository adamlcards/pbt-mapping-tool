import { signOf, type GraphView, type EffectiveEdge } from './graph';
import type { NodeId } from '../model/types';

export type LoopKind = 'reinforcing' | 'balancing';

export interface Loop {
  id: string;
  /** Node ids in traversal order. The loop closes from last back to first. */
  nodes: NodeId[];
  labels: string[];
  edges: EffectiveEdge[];
  kind: LoopKind;
  /**
   * Product of normalised edge weights around the loop. |gain| near 1 means a
   * tight, strongly self-sustaining cycle; near 0 means it barely cycles.
   */
  gain: number;
  /** Geometric mean of |w|, so long loops are not unfairly penalised. */
  meanStrength: number;
  length: number;
}

export interface LoopResult {
  loops: Loop[];
  reinforcing: number;
  balancing: number;
  /** True if enumeration hit a limit and the list is incomplete. */
  truncated: boolean;
  /** Node ids that take part in at least one reinforcing loop. */
  nodesInReinforcingLoops: NodeId[];
}

const DEFAULT_MAX_LOOPS = 400;
const DEFAULT_MAX_LENGTH = 8;

/**
 * Enumerate simple directed cycles via depth-first search from each node,
 * only extending to nodes ordered after the start node so each cycle is found
 * exactly once rather than once per rotation.
 *
 * Cycle counts grow combinatorially, so both the number of loops and their
 * length are capped. Clinical networks are small enough that the caps rarely
 * bind, but a pathological graph must not freeze the browser.
 *
 * A loop is *reinforcing* when it contains an even number of negative edges:
 * an increase anywhere comes back around as a further increase, which is the
 * formal version of the vicious cycle a client describes. An odd number makes
 * it *balancing*, and the loop is self-correcting.
 */
export function findLoops(
  g: GraphView,
  opts: { maxLoops?: number; maxLength?: number } = {},
): LoopResult {
  const maxLoops = opts.maxLoops ?? DEFAULT_MAX_LOOPS;
  const maxLength = opts.maxLength ?? DEFAULT_MAX_LENGTH;

  const order = new Map(g.nodeIds.map((id, i) => [id, i]));
  const loops: Loop[] = [];
  let truncated = false;

  for (const start of g.nodeIds) {
    if (loops.length >= maxLoops) {
      truncated = true;
      break;
    }
    const startRank = order.get(start)!;
    const pathNodes: NodeId[] = [start];
    const pathEdges: EffectiveEdge[] = [];
    const onPath = new Set<NodeId>([start]);

    const dfs = (current: NodeId): void => {
      if (loops.length >= maxLoops) {
        truncated = true;
        return;
      }
      for (const e of g.out.get(current) ?? []) {
        const next = e.target;

        if (next === start) {
          // Self-loops (length 1) are legitimate and clinically meaningful:
          // "worry makes me worry more". Keep them.
          pathEdges.push(e);
          loops.push(makeLoop(g, [...pathNodes], [...pathEdges]));
          pathEdges.pop();
          if (loops.length >= maxLoops) {
            truncated = true;
            return;
          }
          continue;
        }

        // Only walk forward in the ordering, so each cycle is reported once.
        if (order.get(next)! < startRank) continue;
        if (onPath.has(next)) continue;
        if (pathNodes.length >= maxLength) {
          truncated = true;
          continue;
        }

        pathNodes.push(next);
        pathEdges.push(e);
        onPath.add(next);
        dfs(next);
        onPath.delete(next);
        pathEdges.pop();
        pathNodes.pop();
      }
    };

    dfs(start);
  }

  // Strongest and tightest first: that is the order a clinician wants to read.
  loops.sort((a, b) => Math.abs(b.gain) - Math.abs(a.gain) || a.length - b.length);

  const nodesInReinforcing = new Set<NodeId>();
  for (const l of loops) {
    if (l.kind === 'reinforcing') l.nodes.forEach((n) => nodesInReinforcing.add(n));
  }

  return {
    loops,
    reinforcing: loops.filter((l) => l.kind === 'reinforcing').length,
    balancing: loops.filter((l) => l.kind === 'balancing').length,
    truncated,
    nodesInReinforcingLoops: [...nodesInReinforcing],
  };
}

function makeLoop(g: GraphView, nodes: NodeId[], edges: EffectiveEdge[]): Loop {
  let negatives = 0;
  let gain = 1;
  let logSum = 0;
  for (const e of edges) {
    if (signOf(e.w) === -1) negatives++;
    gain *= e.w;
    logSum += Math.log(Math.max(Math.abs(e.w), 1e-9));
  }
  return {
    id: `loop:${edges.map((e) => e.id).join('|')}`,
    nodes,
    labels: nodes.map((n) => g.labels.get(n) ?? n),
    edges,
    kind: negatives % 2 === 0 ? 'reinforcing' : 'balancing',
    gain: Math.round(gain * 1000) / 1000,
    meanStrength: Math.round(Math.exp(logSum / Math.max(edges.length, 1)) * 1000) / 1000,
    length: edges.length,
  };
}
