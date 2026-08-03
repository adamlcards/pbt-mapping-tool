import { describe, it, expect } from 'vitest';
import { baselineOf, compareHypothesis, hasProposal, withProposalOf } from '../hypothesis';
import { createEdge, createNetwork, createNode } from '../../model/factory';
import type { PbtNetwork } from '../../model/types';

/**
 * A vicious cycle: worry keeps you awake, being tired makes you worry more.
 *
 * The proposal is a wind-down routine that worry prompts and which then reduces
 * worry. One decreasing link in the loop, so it is *balancing*: the system gets
 * a brake. That parity is the whole mechanism, and it is easy to get backwards
 * (see the test below where the routine is undermined instead).
 */
function withProposal(): { net: PbtNetwork; ids: Record<string, string> } {
  const net = createNetwork('Hypothesis test');
  const worry = createNode({ label: 'Worry', category: 'cognition', position: { x: 0, y: 0 } });
  const sleep = createNode({ label: 'Poor sleep', category: 'biophysiological', position: { x: 200, y: 0 } });
  const tired = createNode({ label: 'Tired', category: 'biophysiological', position: { x: 400, y: 0 } });
  const routine = createNode({
    label: 'Wind-down routine',
    category: 'overtBehaviour',
    position: { x: 200, y: 200 },
    trial: 'proposed',
  });
  net.nodes = [worry, sleep, tired, routine];
  net.edges = [
    createEdge(worry.id, sleep.id, 'increases', 3),
    createEdge(sleep.id, tired.id, 'increases', 3),
    createEdge(tired.id, worry.id, 'increases', 2),
    createEdge(worry.id, routine.id, 'increases', 2, 'neutral', undefined, 'proposed'),
    createEdge(routine.id, worry.id, 'decreases', 3, 'helpful', undefined, 'proposed'),
  ];
  return { net, ids: { worry: worry.id, sleep: sleep.id, tired: tired.id, routine: routine.id } };
}

describe('hypothesis comparison', () => {
  it('knows when there is nothing to compare', () => {
    const net = createNetwork();
    net.nodes = [createNode({ label: 'A', position: { x: 0, y: 0 } })];
    expect(hasProposal(net)).toBe(false);
    const report = compareHypothesis(net);
    expect(report.hasProposal).toBe(false);
    expect(report.summary[0]).toContain('Nothing is marked as being considered');
  });

  it('strips proposals, and any link that depended on them, from the baseline', () => {
    const { net } = withProposal();
    const base = baselineOf(net);
    expect(base.nodes).toHaveLength(3);
    // Both proposed links touched the proposed node and must go with it.
    expect(base.edges).toHaveLength(3);
    expect(base.nodes.some((n) => n.label === 'Wind-down routine')).toBe(false);
  });

  it('counts the reinforcing loop that already exists', () => {
    const { net } = withProposal();
    expect(compareHypothesis(net).reinforcingBefore).toBe(1);
  });

  it('reports the balancing loop the proposal creates', () => {
    const report = compareHypothesis(withProposal().net);
    expect(report.balancingBefore).toBe(0);
    expect(report.newBalancingLoops.length).toBeGreaterThan(0);
    expect(report.summary.join(' ')).toContain('self-correct');
  });

  it('says which reinforcing loops now have something pushing back', () => {
    const report = compareHypothesis(withProposal().net);
    expect(report.loopEffects.some((e) => e.mechanism === 'balancing')).toBe(true);
    expect(report.loopEffects.every((e) => e.mechanism !== 'none')).toBe(true);
  });

  it('flags a proposal that adds nothing as adding nothing', () => {
    // A dead-end proposal: influenced by the network, influencing nothing back.
    const net = createNetwork();
    const a = createNode({ label: 'A', position: { x: 0, y: 0 } });
    const b = createNode({ label: 'B', position: { x: 0, y: 0 } });
    const idea = createNode({ label: 'Idea', position: { x: 0, y: 0 }, trial: 'proposed' });
    net.nodes = [a, b, idea];
    net.edges = [
      createEdge(a.id, b.id, 'increases', 3),
      createEdge(b.id, a.id, 'increases', 3),
      createEdge(a.id, idea.id, 'increases', 2, 'neutral', undefined, 'proposed'),
    ];
    const report = compareHypothesis(net);
    expect(report.newBalancingLoops).toHaveLength(0);
    expect(report.loopEffects.some((e) => e.mechanism === 'none')).toBe(true);
    expect(report.summary.join(' ')).toContain('Nothing here acts on any cycle');
  });

  it('sees that a proposal the problem undermines is another vicious cycle', () => {
    // Worry *reduces* the routine, and less routine means more worry. Two
    // decreasing links, so the parity makes it reinforcing: adding a helpful
    // process is not enough if the problem suppresses it.
    const net = createNetwork();
    const worry = createNode({ label: 'Worry', position: { x: 0, y: 0 } });
    const other = createNode({ label: 'Poor sleep', position: { x: 0, y: 0 } });
    const routine = createNode({ label: 'Routine', position: { x: 0, y: 0 }, trial: 'proposed' });
    net.nodes = [worry, other, routine];
    net.edges = [
      createEdge(worry.id, other.id, 'increases', 3),
      createEdge(other.id, worry.id, 'increases', 3),
      createEdge(worry.id, routine.id, 'decreases', 3, 'unhelpful', undefined, 'proposed'),
      createEdge(routine.id, worry.id, 'decreases', 3, 'helpful', undefined, 'proposed'),
    ];
    const report = compareHypothesis(net);
    expect(report.newBalancingLoops).toHaveLength(0);
    expect(report.reinforcingAfter).toBeGreaterThan(report.reinforcingBefore);
  });

  it('notices a proposal that makes things worse', () => {
    const net = createNetwork();
    const a = createNode({ label: 'A', position: { x: 0, y: 0 } });
    const b = createNode({ label: 'B', position: { x: 0, y: 0 } });
    const bad = createNode({ label: 'Avoidance', position: { x: 0, y: 0 }, trial: 'proposed' });
    net.nodes = [a, b, bad];
    net.edges = [
      createEdge(a.id, b.id, 'increases', 2),
      createEdge(b.id, a.id, 'increases', 2),
      createEdge(a.id, bad.id, 'increases', 3, 'neutral', undefined, 'proposed'),
      createEdge(bad.id, b.id, 'increases', 3, 'neutral', undefined, 'proposed'),
    ];
    const report = compareHypothesis(net);
    expect(report.amplificationAfter).toBeGreaterThan(report.amplificationBefore);
    expect(report.amplificationChangePct).toBeLessThan(0);
    expect(report.summary.join(' ')).toContain('rises');
  });

  it('measures amplification over the same nodes on both sides', () => {
    // Otherwise the comparison moves just because the proposal added a node.
    const report = compareHypothesis(withProposal().net);
    expect(Number.isFinite(report.amplificationChangePct)).toBe(true);
    expect(report.amplificationBefore).toBeGreaterThan(0);
  });

  it('always carries the caveat about what this actually describes', () => {
    const report = compareHypothesis(withProposal().net);
    expect(report.summary[report.summary.length - 1]).toContain('not what the person will do');
  });
});

describe('sustained pressure, which is not the same as a balancing loop', () => {
  /**
   * Kean's case: a new process pushes down on a node inside a vicious cycle,
   * with nothing feeding back to it. The loop keeps running exactly as before,
   * but at a lower level. Calling that "no effect" was wrong.
   */
  function pressureCase(): PbtNetwork {
    const net = createNetwork();
    const worry = createNode({ label: 'Worry', position: { x: 0, y: 0 } });
    const sleep = createNode({ label: 'Poor sleep', position: { x: 0, y: 0 } });
    const tired = createNode({ label: 'Tired', position: { x: 0, y: 0 } });
    const meds = createNode({ label: 'Sleep medication', position: { x: 0, y: 0 }, trial: 'proposed' });
    net.nodes = [worry, sleep, tired, meds];
    net.edges = [
      createEdge(worry.id, sleep.id, 'increases', 3),
      createEdge(sleep.id, tired.id, 'increases', 3),
      createEdge(tired.id, worry.id, 'increases', 2),
      createEdge(meds.id, sleep.id, 'decreases', 3, 'helpful', undefined, 'proposed'),
    ];
    return net;
  }

  it('recognises one-way downward pressure as acting on the cycle', () => {
    const report = compareHypothesis(pressureCase());
    const effect = report.loopEffects[0]!;
    expect(effect.mechanism).toBe('pressure');
    expect(effect.netPressure).toBeLessThan(0);
    expect(effect.pressuredNodes.map((n) => n.label)).toContain('Poor sleep');
  });

  it('says plainly that it needs keeping up, and does not call it a failure', () => {
    const text = compareHypothesis(pressureCase()).summary.join(' ');
    expect(text).toContain('steady downward pressure');
    expect(text).toContain('as long as the person keeps it up');
    expect(text).not.toContain('Nothing here acts on any cycle');
  });

  it('explains why the amplification figure does not move', () => {
    const report = compareHypothesis(pressureCase());
    // No feedback link was added, so the dynamics are untouched by design.
    expect(Math.abs(report.amplificationChangePct)).toBeLessThan(0.6);
    expect(report.summary.join(' ')).toContain('moves the level, not the dynamics');
  });

  it('flags pressure applied in the wrong direction', () => {
    const net = pressureCase();
    net.edges[3]!.direction = 'increases';
    net.edges[3]!.weight = 3;
    const report = compareHypothesis(net);
    expect(report.loopEffects[0]!.netPressure).toBeGreaterThan(0);
    expect(report.summary.join(' ')).toContain('pushed *upward*');
  });
});

describe('trial outcomes', () => {
  it('leaves something ruled out out of both sides of the comparison', () => {
    const net = createNetwork();
    const a = createNode({ label: 'A', position: { x: 0, y: 0 } });
    const b = createNode({ label: 'B', position: { x: 0, y: 0 } });
    const failed = createNode({ label: 'Did not help', position: { x: 0, y: 0 }, trial: 'ruledOut' });
    net.nodes = [a, b, failed];
    net.edges = [createEdge(a.id, b.id, 'increases', 2), createEdge(failed.id, a.id, 'decreases', 3, 'helpful', undefined, 'ruledOut')];
    expect(baselineOf(net).nodes).toHaveLength(2);
    expect(withProposalOf(net).nodes).toHaveLength(2);
  });

  it('treats something adopted as an ordinary part of the map', () => {
    const net = createNetwork();
    const a = createNode({ label: 'A', position: { x: 0, y: 0 } });
    const worked = createNode({ label: 'Worked', position: { x: 0, y: 0 }, trial: 'adopted' });
    net.nodes = [a, worked];
    net.edges = [createEdge(worked.id, a.id, 'decreases', 3, 'helpful', undefined, 'adopted')];
    expect(baselineOf(net).nodes).toHaveLength(2);
    expect(hasProposal(net)).toBe(false);
  });
});
