import type { GraphView } from './graph';
import type { NodeId } from '../model/types';

export interface CentralityRow {
  id: NodeId;
  label: string;
  /** Sum of |w| over incoming edges. How much the network acts on this node. */
  inStrength: number;
  /** Sum of |w| over outgoing edges. How much this node acts on the network. */
  outStrength: number;
  /** inStrength + outStrength. The measure with the most simulation support. */
  totalStrength: number;
  /** Sum of signed incoming weights. Net push the network exerts on this node. */
  netIncoming: number;
  /** Sum of signed outgoing weights. Net push this node exerts outward. */
  expectedInfluence: number;
  inDegree: number;
  outDegree: number;
  /** Directed betweenness, normalised 0..1. Flags bridging nodes. */
  betweenness: number;
  /**
   * True when a node has outgoing but no incoming edges: a driver the network
   * never pushes back on. Often the most tractable intervention point.
   */
  isSource: boolean;
  /** Incoming but no outgoing. A pure endpoint, usually an outcome. */
  isSink: boolean;
  /** No edges at all. Usually means the user has not finished. */
  isIsolated: boolean;
}

export function centrality(g: GraphView): CentralityRow[] {
  const bc = betweenness(g);

  return g.nodeIds.map((id) => {
    const outs = g.out.get(id) ?? [];
    const ins = g.in.get(id) ?? [];
    const inStrength = sum(ins.map((e) => Math.abs(e.w)));
    const outStrength = sum(outs.map((e) => Math.abs(e.w)));
    return {
      id,
      label: g.labels.get(id) ?? id,
      inStrength: round(inStrength),
      outStrength: round(outStrength),
      totalStrength: round(inStrength + outStrength),
      netIncoming: round(sum(ins.map((e) => e.w))),
      expectedInfluence: round(sum(outs.map((e) => e.w))),
      inDegree: ins.length,
      outDegree: outs.length,
      betweenness: round(bc.get(id) ?? 0),
      isSource: ins.length === 0 && outs.length > 0,
      isSink: outs.length === 0 && ins.length > 0,
      isIsolated: ins.length === 0 && outs.length === 0,
    };
  });
}

/**
 * Brandes betweenness on the directed graph, treating every edge as one hop.
 *
 * Deliberately unweighted. Betweenness on a *signed* causal graph has no agreed
 * weighted definition, and inventing one would produce a number that looks
 * authoritative and means nothing. Unweighted answers a question that is
 * genuinely well posed: which nodes sit on the most causal routes between other
 * nodes. Normalised by (n-1)(n-2) so it is comparable across network sizes.
 */
export function betweenness(g: GraphView): Map<NodeId, number> {
  const cb = new Map<NodeId, number>(g.nodeIds.map((id) => [id, 0]));
  const n = g.nodeIds.length;
  if (n < 3) return cb;

  for (const s of g.nodeIds) {
    const stack: NodeId[] = [];
    const preds = new Map<NodeId, NodeId[]>();
    const sigma = new Map<NodeId, number>();
    const dist = new Map<NodeId, number>();

    for (const v of g.nodeIds) {
      preds.set(v, []);
      sigma.set(v, 0);
      dist.set(v, -1);
    }
    sigma.set(s, 1);
    dist.set(s, 0);

    const queue: NodeId[] = [s];
    let head = 0;
    while (head < queue.length) {
      const v = queue[head++]!;
      stack.push(v);
      for (const e of g.out.get(v) ?? []) {
        const w = e.target;
        if (dist.get(w) === -1) {
          dist.set(w, dist.get(v)! + 1);
          queue.push(w);
        }
        if (dist.get(w) === dist.get(v)! + 1) {
          sigma.set(w, sigma.get(w)! + sigma.get(v)!);
          preds.get(w)!.push(v);
        }
      }
    }

    const delta = new Map<NodeId, number>(g.nodeIds.map((id) => [id, 0]));
    while (stack.length > 0) {
      const w = stack.pop()!;
      for (const v of preds.get(w)!) {
        delta.set(v, delta.get(v)! + (sigma.get(v)! / sigma.get(w)!) * (1 + delta.get(w)!));
      }
      if (w !== s) cb.set(w, cb.get(w)! + delta.get(w)!);
    }
  }

  const norm = (n - 1) * (n - 2);
  for (const [k, v] of cb) cb.set(k, norm > 0 ? v / norm : 0);
  return cb;
}

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const round = (x: number) => Math.round(x * 1000) / 1000;
