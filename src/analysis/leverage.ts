import type { GraphView } from './graph';
import type { NodeId, PbtNetwork } from '../model/types';

/**
 * Leverage estimation.
 *
 * IMPORTANT, and the UI repeats this wherever these numbers appear: this is a
 * heuristic, not a fitted model. It assumes influence is linear, instantaneous,
 * and that the weights the person drew are accurate. None of those are true.
 * It is useful for the same reason the drawing itself is useful, as a structured
 * way to think, and it should never be reported as a prediction.
 *
 * Method: a shock is applied to one node and propagated along directed edges
 * with damping, iterating until the change per round becomes negligible. Because
 * networks with strong reinforcing loops can diverge, divergence is detected and
 * reported rather than hidden. A diverging network is a clinically meaningful
 * finding in itself: the person has drawn a system with no brakes on it.
 */

export interface PropagationResult {
  /** Cumulative change per node, in normalised units. */
  change: Map<NodeId, number>;
  converged: boolean;
  iterations: number;
}

const DAMPING = 0.85;
const EPSILON = 1e-4;
const MAX_ITERATIONS = 60;
const DIVERGENCE_LIMIT = 1e3;

export function propagate(
  g: GraphView,
  origin: NodeId,
  shock = -1,
  opts: { damping?: number; maxIterations?: number } = {},
): PropagationResult {
  const damping = opts.damping ?? DAMPING;
  const maxIterations = opts.maxIterations ?? MAX_ITERATIONS;

  const total = new Map<NodeId, number>(g.nodeIds.map((id) => [id, 0]));
  if (!g.index.has(origin)) return { change: total, converged: true, iterations: 0 };

  let wave = new Map<NodeId, number>([[origin, shock]]);
  total.set(origin, shock);

  let iterations = 0;
  let converged = false;

  for (let i = 0; i < maxIterations; i++) {
    iterations = i + 1;
    const next = new Map<NodeId, number>();

    for (const [nodeId, delta] of wave) {
      if (Math.abs(delta) < EPSILON) continue;
      for (const e of g.out.get(nodeId) ?? []) {
        const contribution = delta * e.w * damping;
        if (Math.abs(contribution) < EPSILON) continue;
        next.set(e.target, (next.get(e.target) ?? 0) + contribution);
      }
    }

    let maxMagnitude = 0;
    for (const [nodeId, delta] of next) {
      total.set(nodeId, (total.get(nodeId) ?? 0) + delta);
      maxMagnitude = Math.max(maxMagnitude, Math.abs(delta));
    }

    if (maxMagnitude > DIVERGENCE_LIMIT) {
      return { change: total, converged: false, iterations };
    }
    if (maxMagnitude < EPSILON) {
      converged = true;
      break;
    }
    wave = next;
  }

  return { change: total, converged, iterations };
}

export interface LeverageRow {
  id: NodeId;
  label: string;
  /**
   * Total improvement across the network from reducing this node by one unit.
   * Positive is good: problematic load went down.
   */
  benefit: number;
  /** How many other nodes were affected at all. Breadth, not depth. */
  reach: number;
  /** Nodes this move would push in an unhelpful direction. */
  sideEffects: { id: NodeId; label: string; change: number }[];
  converged: boolean;
}

/**
 * Rank every node by how much reducing it would improve the network overall.
 *
 * "Improve" needs a definition, and this is where clinical judgement enters the
 * arithmetic, so it is made explicit rather than buried.
 *
 * Because helpfulness is a property of *links* rather than nodes, a node's role
 * is inferred from the company it keeps: a node feeding mostly links marked "not
 * helping" is treated as something worth reducing, one feeding mostly "helping"
 * links as something worth protecting. Nodes attached only to unjudged links sit
 * at neutral, so the analysis still says something sensible about a network
 * nobody has annotated. Severity, where rated, scales how much a node matters.
 */
export function rankLeverage(net: PbtNetwork, g: GraphView): LeverageRow[] {
  const importance = new Map<NodeId, number>();
  for (const n of net.nodes) {
    const touching = [...(g.out.get(n.id) ?? []), ...(g.in.get(n.id) ?? [])];
    const unhelpful = touching.filter((e) => e.valence === 'unhelpful').length;
    const helpful = touching.filter((e) => e.valence === 'helpful').length;
    const judged = unhelpful + helpful;
    // -1 (clearly protective) .. +1 (clearly problematic), 0 when unjudged.
    const role = judged === 0 ? 0.5 : (unhelpful - helpful) / judged;
    const sev = n.severity !== undefined ? n.severity / 10 : 0.5;
    importance.set(n.id, sev * role);
  }

  const protective = new Set(
    net.nodes
      .filter((n) => {
        const touching = [...(g.out.get(n.id) ?? []), ...(g.in.get(n.id) ?? [])];
        const helpful = touching.filter((e) => e.valence === 'helpful').length;
        return helpful > 0 && helpful >= touching.filter((e) => e.valence === 'unhelpful').length;
      })
      .map((n) => n.id),
  );

  const rows: LeverageRow[] = [];

  for (const id of g.nodeIds) {
    const { change, converged } = propagate(g, id, -1);

    let benefit = 0;
    let reach = 0;
    const sideEffects: LeverageRow['sideEffects'] = [];

    for (const [nodeId, delta] of change) {
      if (Math.abs(delta) < EPSILON) continue;
      if (nodeId !== id) reach++;
      const imp = importance.get(nodeId) ?? 0.5;
      // delta negative (node went down) * imp positive (problematic) = benefit.
      benefit += -delta * imp;

      // Flag anything protective that this move would suppress.
      const node = net.nodes.find((n) => n.id === nodeId);
      if (node && protective.has(nodeId) && delta < -EPSILON && nodeId !== id) {
        sideEffects.push({ id: nodeId, label: node.label, change: round(delta) });
      }
    }

    rows.push({
      id,
      label: g.labels.get(id) ?? id,
      benefit: round(benefit),
      reach,
      sideEffects: sideEffects.sort((a, b) => a.change - b.change).slice(0, 5),
      converged,
    });
  }

  return rows.sort((a, b) => b.benefit - a.benefit);
}

const round = (x: number) => Math.round(x * 1000) / 1000;
