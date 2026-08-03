import type { PbtNetwork, NodeId } from '../model/types';

/**
 * A lightweight adjacency view over a network, built once and reused by every
 * analysis. Weights are normalised to -1..+1 (dividing by the maximum strength)
 * so that products along a path stay meaningful rather than exploding.
 */
export interface EffectiveEdge {
  id: string;
  source: NodeId;
  target: NodeId;
  /** Raw signed strength, -3..+3. */
  raw: number;
  /** Normalised to -1..+1. */
  w: number;
  valence: 'neutral' | 'helpful' | 'unhelpful';
}

export interface GraphView {
  nodeIds: NodeId[];
  index: Map<NodeId, number>;
  labels: Map<NodeId, string>;
  edges: EffectiveEdge[];
  out: Map<NodeId, EffectiveEdge[]>;
  in: Map<NodeId, EffectiveEdge[]>;
}

/**
 * Strength levels mapped onto influence coefficients.
 *
 * Deliberately not 1/3, 2/3, 3/3. Sending the top level to 1.0 would say that a
 * strong influence transmits *perfectly* -- that all of a change in A arrives at
 * B -- and a chain of such links then implies undamped propagation, which makes
 * the leverage model diverge on ordinary clinical networks. No psychological
 * influence is total, so the top of the scale sits below unity and each step
 * down is a meaningful drop.
 */
const STRENGTH_WEIGHT: Record<number, number> = { 1: 0.3, 2: 0.55, 3: 0.8 };

function coefficient(signedStrength: number): number {
  const magnitude = STRENGTH_WEIGHT[Math.abs(signedStrength)] ?? 0.3;
  return signedStrength < 0 ? -magnitude : magnitude;
}

export function buildGraph(net: PbtNetwork): GraphView {
  const nodeIds = net.nodes.map((n) => n.id);
  const index = new Map(nodeIds.map((id, i) => [id, i]));
  const labels = new Map(net.nodes.map((n) => [n.id, n.label]));

  const edges: EffectiveEdge[] = net.edges
    .filter((e) => index.has(e.source) && index.has(e.target))
    .map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      raw: e.weight,
      w: coefficient(e.weight),
      valence: e.valence,
    }));

  const out = new Map<NodeId, EffectiveEdge[]>();
  const inc = new Map<NodeId, EffectiveEdge[]>();
  for (const id of nodeIds) {
    out.set(id, []);
    inc.set(id, []);
  }
  for (const e of edges) {
    out.get(e.source)!.push(e);
    inc.get(e.target)!.push(e);
  }

  return { nodeIds, index, labels, edges, out, in: inc };
}

/** Sign of a weight, treating exact zero as positive-neutral for loop parity. */
export function signOf(w: number): 1 | -1 {
  return w < 0 ? -1 : 1;
}
