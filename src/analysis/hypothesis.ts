import type { PbtNetwork } from '../model/types';
import { buildGraph } from './graph';
import { findLoops, type Loop } from './loops';
import { propagate } from './leverage';

/**
 * Hypothesis comparison: what would change if the proposal held?
 *
 * The map is split in two. The *baseline* is what is already happening: the map
 * with anything still only proposed removed, and anything already tried and
 * ruled out removed too, since a thing that did not help is not part of what is
 * going on. The *proposed* network is the baseline plus whatever is being
 * considered.
 *
 * ---------------------------------------------------------------------------
 * On what it means to "break" a cycle
 *
 * An earlier version of this reported only whether the proposal created a
 * balancing loop, and called anything else a failure. That was too strict, and
 * wrong in a way that matters clinically. There are two genuinely different
 * ways a proposal can act on a vicious cycle, and they have different
 * implications for whether the gain will last:
 *
 * 1. **Sustained pressure.** A new process pushes down on a node inside the
 *    loop, but nothing in the loop feeds back to it. The loop keeps its
 *    self-amplifying character untouched: what changes is the *level* it runs
 *    at, not the dynamics. That is often plenty to get someone unstuck, and it
 *    is exactly what most homework tasks are. The catch is that nothing in the
 *    map maintains it, so it works for as long as the person keeps doing it.
 *
 * 2. **A balancing loop.** The loop itself now feeds the new process, and the
 *    new process pushes back. This changes the dynamics rather than the level,
 *    and it is self-maintaining: the worse things get, the harder the brake
 *    pushes. This is what you want if the gain is to hold without effort.
 *
 * Both are reported, distinctly, and neither is called a failure. What is
 * called a failure is a proposal that touches nothing in any loop.
 *
 * The size of a sustained-pressure effect also depends on the rest of the map:
 * how the reduction propagates once it arrives depends on what else the target
 * feeds. That is what the propagation figures are for.
 * ---------------------------------------------------------------------------
 */

export type Mechanism = 'balancing' | 'pressure' | 'none';

export interface LoopEffect {
  loop: Loop;
  mechanism: Mechanism;
  /** Balancing loops the proposal created that share a node with this loop. */
  opposedBy: Loop[];
  /** Net proposed influence arriving at this loop's nodes. Negative is downward. */
  netPressure: number;
  /** Which nodes in the loop the proposal pushes on. */
  pressuredNodes: { id: string; label: string; change: number }[];
}

export interface HypothesisReport {
  hasProposal: boolean;
  proposedNodes: number;
  proposedEdges: number;

  reinforcingBefore: number;
  reinforcingAfter: number;
  balancingBefore: number;
  balancingAfter: number;

  newBalancingLoops: Loop[];
  /** Every reinforcing loop, with how (or whether) the proposal acts on it. */
  loopEffects: LoopEffect[];

  amplificationBefore: number;
  amplificationAfter: number;
  amplificationChangePct: number;

  summary: string[];
}

/** The map as things actually stand: no proposals, and nothing already ruled out. */
export function baselineOf(net: PbtNetwork): PbtNetwork {
  const nodes = net.nodes.filter((n) => n.trial !== 'proposed' && n.trial !== 'ruledOut');
  const keep = new Set(nodes.map((n) => n.id));
  return {
    ...net,
    nodes,
    edges: net.edges.filter(
      (e) => e.trial !== 'proposed' && e.trial !== 'ruledOut' && keep.has(e.source) && keep.has(e.target),
    ),
  };
}

/** The map with the proposal included, but still without anything ruled out. */
export function withProposalOf(net: PbtNetwork): PbtNetwork {
  const nodes = net.nodes.filter((n) => n.trial !== 'ruledOut');
  const keep = new Set(nodes.map((n) => n.id));
  return {
    ...net,
    nodes,
    edges: net.edges.filter((e) => e.trial !== 'ruledOut' && keep.has(e.source) && keep.has(e.target)),
  };
}

export function hasProposal(net: PbtNetwork): boolean {
  return net.nodes.some((n) => n.trial === 'proposed') || net.edges.some((e) => e.trial === 'proposed');
}

/**
 * How much a disturbance spreads, measured only over the nodes that exist in
 * both versions of the map.
 *
 * Summing over every node was wrong: the proposal adds nodes, so the totals
 * were taken over different sets and the comparison moved simply because the
 * network got bigger. Restricting both measurements to the original nodes
 * isolates the thing being asked about, which is what the proposal does to the
 * system that is already there.
 */
function amplification(net: PbtNetwork, overIds: string[]): number {
  const g = buildGraph(net);
  const present = overIds.filter((id) => g.index.has(id));
  if (present.length === 0) return 0;
  let total = 0;
  for (const id of present) {
    const { change } = propagate(g, id, 1);
    for (const [nodeId, delta] of change) {
      if (nodeId === id) continue;
      total += Math.abs(delta);
    }
  }
  return Math.round((total / present.length) * 1000) / 1000;
}

const loopKey = (l: Loop) => [...l.nodes].sort().join('|');
const round = (x: number) => Math.round(x * 1000) / 1000;

export function compareHypothesis(net: PbtNetwork): HypothesisReport {
  const proposedNodes = net.nodes.filter((n) => n.trial === 'proposed').length;
  const proposedEdges = net.edges.filter((e) => e.trial === 'proposed').length;

  const base = baselineOf(net);
  const after = withProposalOf(net);

  const beforeLoops = findLoops(buildGraph(base));
  const afterLoops = findLoops(buildGraph(after));

  const beforeBalancingKeys = new Set(
    beforeLoops.loops.filter((l) => l.kind === 'balancing').map(loopKey),
  );
  const newBalancingLoops = afterLoops.loops.filter(
    (l) => l.kind === 'balancing' && !beforeBalancingKeys.has(loopKey(l)),
  );

  // Proposed links arriving at a node from outside: sustained pressure.
  const proposedInto = new Map<string, number>();
  for (const e of after.edges) {
    if (e.trial !== 'proposed') continue;
    proposedInto.set(e.target, (proposedInto.get(e.target) ?? 0) + e.weight);
  }
  const labelOf = new Map(after.nodes.map((n) => [n.id, n.label]));

  const loopEffects: LoopEffect[] = afterLoops.loops
    .filter((l) => l.kind === 'reinforcing')
    .map((loop) => {
      const members = new Set(loop.nodes);
      const opposedBy = newBalancingLoops.filter((b) => b.nodes.some((n) => members.has(n)));

      const pressuredNodes = loop.nodes
        .filter((id) => proposedInto.has(id))
        .map((id) => ({ id, label: labelOf.get(id) ?? id, change: round(proposedInto.get(id) ?? 0) }));
      const netPressure = round(pressuredNodes.reduce((acc, n) => acc + n.change, 0));

      const mechanism: Mechanism =
        opposedBy.length > 0 ? 'balancing' : pressuredNodes.length > 0 ? 'pressure' : 'none';

      return { loop, mechanism, opposedBy, netPressure, pressuredNodes };
    });

  const sharedIds = base.nodes.map((n) => n.id);
  const amplificationBefore = amplification(base, sharedIds);
  const amplificationAfter = amplification(after, sharedIds);
  const changePct =
    amplificationBefore > 0
      ? Math.round(((amplificationBefore - amplificationAfter) / amplificationBefore) * 1000) / 10
      : 0;

  const report: HypothesisReport = {
    hasProposal: proposedNodes + proposedEdges > 0,
    proposedNodes,
    proposedEdges,
    reinforcingBefore: beforeLoops.reinforcing,
    reinforcingAfter: afterLoops.reinforcing,
    balancingBefore: beforeLoops.balancing,
    balancingAfter: afterLoops.balancing,
    newBalancingLoops,
    loopEffects,
    amplificationBefore,
    amplificationAfter,
    amplificationChangePct: changePct,
    summary: [],
  };

  report.summary = buildSummary(report);
  return report;
}

function buildSummary(r: HypothesisReport): string[] {
  if (!r.hasProposal) {
    return [
      'Nothing is marked as being considered yet. Turn on Hypothesis and add the process or link you are thinking about, and this will compare the map with and without it.',
    ];
  }

  const out: string[] = [];
  const what = [
    r.proposedNodes > 0 ? `${r.proposedNodes} new process${r.proposedNodes === 1 ? '' : 'es'}` : '',
    r.proposedEdges > 0 ? `${r.proposedEdges} new link${r.proposedEdges === 1 ? '' : 's'}` : '',
  ]
    .filter(Boolean)
    .join(' and ');
  out.push(`Testing ${what}.`);

  const balancing = r.loopEffects.filter((e) => e.mechanism === 'balancing');
  const pressure = r.loopEffects.filter((e) => e.mechanism === 'pressure');
  const untouched = r.loopEffects.filter((e) => e.mechanism === 'none');

  if (balancing.length > 0) {
    out.push(
      `**${balancing.length} loop${balancing.length === 1 ? '' : 's'} now self-correct${balancing.length === 1 ? 's' : ''}.** The cycle feeds the new process and the new process pushes back, so the worse things get the harder the brake pushes. This holds without the person having to keep it going.`,
    );
  }

  if (pressure.length > 0) {
    const eased = pressure.filter((e) => e.netPressure < 0);
    const worsened = pressure.filter((e) => e.netPressure > 0);
    if (eased.length > 0) {
      const names = eased
        .flatMap((e) => e.pressuredNodes.filter((n) => n.change < 0).map((n) => n.label))
        .filter((v, i, a) => a.indexOf(v) === i)
        .join(', ');
      out.push(
        `**${eased.length} loop${eased.length === 1 ? '' : 's'} get${eased.length === 1 ? 's' : ''} steady downward pressure**, on ${names}. That lowers where the cycle sits rather than changing how it runs, which is often enough to get someone moving. But nothing on this map feeds back to sustain it, so it lasts only as long as the person keeps it up.`,
      );
    }
    if (worsened.length > 0) {
      out.push(
        `**Careful:** ${worsened.length} loop${worsened.length === 1 ? ' is' : 's are'} being pushed *upward* by this. Worth checking the direction on the new links.`,
      );
    }
  }

  if (untouched.length > 0) {
    out.push(
      `${untouched.length} reinforcing loop${untouched.length === 1 ? ' is' : 's are'} untouched: ${untouched
        .slice(0, 3)
        .map((e) => e.loop.labels.join(' → '))
        .join('; ')}.`,
    );
  }

  if (balancing.length === 0 && pressure.length === 0 && untouched.length > 0) {
    out.push(
      '**Nothing here acts on any cycle.** The proposal is on the map but not connected to the pattern that keeps it going.',
    );
  }

  if (r.amplificationChangePct > 0.5) {
    out.push(`Modelled amplification falls by about ${r.amplificationChangePct}%.`);
  } else if (r.amplificationChangePct < -0.5) {
    out.push(`Modelled amplification **rises** by about ${Math.abs(r.amplificationChangePct)}%.`);
  } else if (pressure.length > 0) {
    out.push(
      '_Amplification is unchanged, and that is expected: steady pressure moves the level, not the dynamics. Only a feedback link changes how the cycle behaves._',
    );
  }

  out.push(
    '_This describes what your map implies, not what the person will do. It is a way of interrogating the formulation before acting on it._',
  );
  return out;
}
