import { describe, it, expect } from 'vitest';
import { buildGraph } from '../graph';
import { centrality, betweenness } from '../centrality';
import { findLoops } from '../loops';
import { findPaths } from '../paths';
import { propagate, rankLeverage } from '../leverage';
import { analyse } from '../index';
import { createEdge, createNetwork, createNode, fromWeight } from '../../model/factory';
import { parseNetwork } from '../../model/schema';
import type { PbtNetwork } from '../../model/types';

/**
 * Fixture: the worked worry/sleep example, on the three-level model.
 * Strengths are 1 (a little), 2 (moderately), 3 (a lot); normalised weights are
 * therefore thirds, which is what the expected numbers below reflect.
 */
function tutorialNetwork(): PbtNetwork {
  const net = createNetwork('Tutorial example');
  const mk = (label: string, cat: Parameters<typeof createNode>[0]['category'], severity?: number) =>
    createNode({ label, category: cat, position: { x: 0, y: 0 }, severity });

  const criticism = mk('Criticism from boss', 'context');
  const worry = mk('Worry about job security', 'cognition', 8);
  const sleep = mk('Difficulty sleeping', 'biophysiological', 7);
  const fatigue = mk('Fatigue', 'biophysiological', 6);
  const exercise = mk('Exercise', 'overtBehaviour', 2);
  const withdrawal = mk('Social withdrawal', 'sociocultural', 5);

  net.nodes = [criticism, worry, sleep, fatigue, exercise, withdrawal];
  net.edges = [
    createEdge(criticism.id, worry.id, 'increases', 3, 'unhelpful'),
    createEdge(worry.id, sleep.id, 'increases', 3, 'unhelpful'),
    createEdge(sleep.id, worry.id, 'increases', 2, 'unhelpful'),
    createEdge(sleep.id, fatigue.id, 'increases', 3, 'unhelpful'),
    createEdge(fatigue.id, worry.id, 'increases', 2, 'unhelpful'),
    createEdge(exercise.id, fatigue.id, 'decreases', 2, 'helpful'),
    createEdge(exercise.id, worry.id, 'decreases', 1, 'helpful'),
    createEdge(fatigue.id, exercise.id, 'decreases', 2, 'unhelpful'),
    createEdge(withdrawal.id, worry.id, 'increases', 2, 'unhelpful'),
    createEdge(withdrawal.id, exercise.id, 'decreases', 2, 'unhelpful'),
  ];
  return net;
}

const idOf = (net: PbtNetwork, label: string) => net.nodes.find((n) => n.label.startsWith(label))!.id;

describe('the three-level model', () => {
  it('derives a signed weight from direction and strength', () => {
    const net = tutorialNetwork();
    const up = net.edges[0]!;
    const down = net.edges[5]!;
    expect(up.direction).toBe('increases');
    expect(up.weight).toBe(3);
    expect(down.direction).toBe('decreases');
    expect(down.weight).toBe(-2);
  });

  it('normalises weights into -1..1', () => {
    const g = buildGraph(tutorialNetwork());
    expect(g.edges.every((e) => e.w >= -1 && e.w <= 1)).toBe(true);
    // The top level stops short of 1.0 on purpose: see graph.ts.
    expect(g.edges.find((e) => e.raw === 3)!.w).toBeCloseTo(0.8);
    expect(g.edges.find((e) => e.raw === -1)!.w).toBeCloseTo(-0.3);
    expect(g.edges.every((e) => Math.abs(e.w) < 1)).toBe(true);
  });

  it('collapses an old -10..+10 weight into the nearest of three levels', () => {
    expect(fromWeight(9)).toEqual({ direction: 'increases', strength: 3 });
    expect(fromWeight(5)).toEqual({ direction: 'increases', strength: 2 });
    expect(fromWeight(-8)).toEqual({ direction: 'decreases', strength: 3 });
    expect(fromWeight(-1)).toEqual({ direction: 'decreases', strength: 1 });
  });

  it('drops edges pointing at nodes that do not exist', () => {
    const net = tutorialNetwork();
    net.edges.push(createEdge('ghost', idOf(net, 'Worry'), 'increases', 2));
    expect(buildGraph(net).edges).toHaveLength(10);
  });
});

describe('centrality', () => {
  it('identifies worry as the most connected node', () => {
    const rows = centrality(buildGraph(tutorialNetwork())).sort((a, b) => b.totalStrength - a.totalStrength);
    expect(rows[0]!.label).toContain('Worry');
  });

  it('counts the influences arriving at worry', () => {
    const worry = centrality(buildGraph(tutorialNetwork())).find((r) => r.label.includes('Worry'))!;
    expect(worry.inDegree).toBe(5);
    expect(worry.outDegree).toBe(1);
  });

  it('flags the context node as an entry point and nothing as isolated', () => {
    const rows = centrality(buildGraph(tutorialNetwork()));
    expect(rows.find((r) => r.label.includes('Criticism'))!.isSource).toBe(true);
    expect(rows.filter((r) => r.isIsolated)).toHaveLength(0);
  });

  it('computes expected influence as the signed sum of outgoing weights', () => {
    const exercise = centrality(buildGraph(tutorialNetwork())).find((r) => r.label === 'Exercise')!;
    expect(exercise.expectedInfluence).toBeCloseTo(-0.85, 2);
    expect(exercise.outStrength).toBeCloseTo(0.85, 2);
  });

  it('gives the middle of a three-node chain a betweenness of 0.5', () => {
    const net = createNetwork();
    const a = createNode({ label: 'A', position: { x: 0, y: 0 } });
    const b = createNode({ label: 'B', position: { x: 0, y: 0 } });
    const c = createNode({ label: 'C', position: { x: 0, y: 0 } });
    net.nodes = [a, b, c];
    net.edges = [createEdge(a.id, b.id, 'increases', 2), createEdge(b.id, c.id, 'increases', 2)];
    const bc = betweenness(buildGraph(net));
    expect(bc.get(b.id)).toBeCloseTo(0.5);
    expect(bc.get(a.id)).toBeCloseTo(0);
  });
});

describe('feedback loops', () => {
  it('finds the worry-sleep loop and classifies it as reinforcing', () => {
    const { loops } = findLoops(buildGraph(tutorialNetwork()));
    const twoStep = loops.find(
      (l) => l.length === 2 && l.labels.some((x) => x.startsWith('Worry')) && l.labels.some((x) => x.startsWith('Difficulty')),
    );
    expect(twoStep).toBeDefined();
    expect(twoStep!.kind).toBe('reinforcing');
    expect(twoStep!.gain).toBeCloseTo(0.8 * 0.55, 2);
  });

  it('treats a two-decrease cycle as reinforcing, not balancing', () => {
    // Fatigue decreases exercise, exercise decreases fatigue. Less exercise means
    // more fatigue means less exercise: a vicious cycle, despite both links
    // being decreases. An even number of decreases is reinforcing.
    const { loops } = findLoops(buildGraph(tutorialNetwork()));
    const loop = loops.find((l) => l.length === 2 && l.labels.includes('Exercise') && l.labels.includes('Fatigue'));
    expect(loop).toBeDefined();
    expect(loop!.kind).toBe('reinforcing');
  });

  it('classifies a single-decrease cycle as balancing', () => {
    const net = createNetwork();
    const a = createNode({ label: 'A', position: { x: 0, y: 0 } });
    const b = createNode({ label: 'B', position: { x: 0, y: 0 } });
    net.nodes = [a, b];
    net.edges = [createEdge(a.id, b.id, 'increases', 3), createEdge(b.id, a.id, 'decreases', 2)];
    const { loops, balancing, reinforcing } = findLoops(buildGraph(net));
    expect(loops).toHaveLength(1);
    expect(loops[0]!.kind).toBe('balancing');
    expect(balancing).toBe(1);
    expect(reinforcing).toBe(0);
  });

  it('detects self-loops', () => {
    const net = createNetwork();
    const a = createNode({ label: 'Rumination', position: { x: 0, y: 0 } });
    net.nodes = [a];
    net.edges = [createEdge(a.id, a.id, 'increases', 3)];
    const { loops } = findLoops(buildGraph(net));
    expect(loops).toHaveLength(1);
    expect(loops[0]!.length).toBe(1);
    expect(loops[0]!.kind).toBe('reinforcing');
  });

  it('reports each cycle once rather than once per rotation', () => {
    const net = createNetwork();
    const nodes = ['A', 'B', 'C'].map((l) => createNode({ label: l, position: { x: 0, y: 0 } }));
    net.nodes = nodes;
    net.edges = [
      createEdge(nodes[0]!.id, nodes[1]!.id, 'increases', 2),
      createEdge(nodes[1]!.id, nodes[2]!.id, 'increases', 2),
      createEdge(nodes[2]!.id, nodes[0]!.id, 'increases', 2),
    ];
    expect(findLoops(buildGraph(net)).loops).toHaveLength(1);
  });

  it('respects the loop cap instead of hanging on a dense graph', () => {
    const net = createNetwork();
    const nodes = Array.from({ length: 9 }, (_, i) => createNode({ label: `N${i}`, position: { x: 0, y: 0 } }));
    net.nodes = nodes;
    for (const a of nodes) for (const b of nodes) if (a !== b) net.edges.push(createEdge(a.id, b.id, 'increases', 2));
    const result = findLoops(buildGraph(net), { maxLoops: 50 });
    expect(result.loops.length).toBeLessThanOrEqual(50);
    expect(result.truncated).toBe(true);
  });
});

describe('path tracing', () => {
  it('finds both the direct and indirect routes from sleep to worry', () => {
    const net = tutorialNetwork();
    const { paths } = findPaths(buildGraph(net), idOf(net, 'Difficulty'), idOf(net, 'Worry'));
    expect(paths.length).toBeGreaterThanOrEqual(2);
    expect(paths.some((p) => p.length === 1)).toBe(true);
    expect(paths.some((p) => p.labels.includes('Fatigue'))).toBe(true);
  });

  it('multiplies weights along a path', () => {
    const net = tutorialNetwork();
    const { paths } = findPaths(buildGraph(net), idOf(net, 'Difficulty'), idOf(net, 'Worry'));
    const viaFatigue = paths.find((p) => p.labels.includes('Fatigue') && p.length === 2)!;
    expect(viaFatigue.effect).toBeCloseTo(0.8 * 0.55, 2);
    expect(viaFatigue.direction).toBe('increases');
  });

  it('reads an odd number of decreasing links as a decrease', () => {
    const net = tutorialNetwork();
    const { paths } = findPaths(buildGraph(net), idOf(net, 'Exercise'), idOf(net, 'Worry'));
    const direct = paths.find((p) => p.length === 1)!;
    expect(direct.direction).toBe('decreases');
    expect(direct.effect).toBeCloseTo(-0.3, 2);
  });

  it('returns nothing when no route exists', () => {
    const net = tutorialNetwork();
    const { paths } = findPaths(buildGraph(net), idOf(net, 'Worry'), idOf(net, 'Criticism'));
    expect(paths).toHaveLength(0);
  });
});

describe('leverage, driven by link valence', () => {
  it('propagates a reduction downstream with the correct sign', () => {
    const net = createNetwork();
    const a = createNode({ label: 'A', position: { x: 0, y: 0 } });
    const b = createNode({ label: 'B', position: { x: 0, y: 0 } });
    net.nodes = [a, b];
    net.edges = [createEdge(a.id, b.id, 'increases', 3)];
    const { change, converged } = propagate(buildGraph(net), a.id, -1);
    expect(converged).toBe(true);
    expect(change.get(a.id)).toBeCloseTo(-1);
    expect(change.get(b.id)!).toBeLessThan(0);
  });

  it('turns a reduction into an increase across a decreasing link', () => {
    const net = createNetwork();
    const a = createNode({ label: 'Exercise', position: { x: 0, y: 0 } });
    const b = createNode({ label: 'Fatigue', position: { x: 0, y: 0 } });
    net.nodes = [a, b];
    net.edges = [createEdge(a.id, b.id, 'decreases', 3)];
    expect(propagate(buildGraph(net), a.id, -1).change.get(b.id)!).toBeGreaterThan(0);
  });

  it('converges on the worked example', () => {
    const net = tutorialNetwork();
    const rows = rankLeverage(net, buildGraph(net));
    expect(rows.every((r) => r.converged)).toBe(true);
    expect(rows[0]!.benefit).toBeGreaterThan(0);
  });

  it('warns rather than hanging when a network has no brakes', () => {
    const net = createNetwork();
    const a = createNode({ label: 'A', position: { x: 0, y: 0 } });
    const b = createNode({ label: 'B', position: { x: 0, y: 0 } });
    net.nodes = [a, b];
    net.edges = [
      createEdge(a.id, b.id, 'increases', 3, 'unhelpful'),
      createEdge(b.id, a.id, 'increases', 3, 'unhelpful'),
    ];
    // Damping of 1 and a tight mutual loop: this must stop, not spin.
    const { iterations } = propagate(buildGraph(net), a.id, -1, { damping: 1, maxIterations: 40 });
    expect(iterations).toBeLessThanOrEqual(40);
  });

  it('infers a protective node from the links marked as helping', () => {
    const net = createNetwork();
    const stress = createNode({ label: 'Stress', position: { x: 0, y: 0 }, severity: 9 });
    const support = createNode({ label: 'Seeking support', position: { x: 0, y: 0 }, severity: 3 });
    const calm = createNode({ label: 'Feeling settled', position: { x: 0, y: 0 } });
    net.nodes = [stress, support, calm];
    net.edges = [
      createEdge(stress.id, support.id, 'increases', 3, 'unhelpful'),
      createEdge(support.id, calm.id, 'increases', 3, 'helpful'),
    ];
    const stressRow = rankLeverage(net, buildGraph(net)).find((r) => r.id === stress.id)!;
    expect(stressRow.sideEffects.some((s) => s.label === 'Seeking support')).toBe(true);
  });
});

describe('full report', () => {
  it('produces plain-language summary lines', () => {
    const report = analyse(tutorialNetwork());
    expect(report.nodeCount).toBe(6);
    expect(report.edgeCount).toBe(10);
    expect(report.summary.length).toBeGreaterThan(3);
    expect(report.summary.join(' ')).toContain('reinforcing');
  });

  it('says something useful about an empty or unconnected network', () => {
    expect(analyse(createNetwork()).summary[0]).toContain('Add some nodes');
    const net = createNetwork();
    net.nodes = [createNode({ label: 'Alone', position: { x: 0, y: 0 } })];
    expect(analyse(net).summary[0]).toContain('Nothing is connected');
  });
});

describe('import safety and migration', () => {
  it('rejects rubbish without throwing', () => {
    expect(parseNetwork('not json').ok).toBe(false);
    expect(parseNetwork({}).ok).toBe(false);
    expect(parseNetwork({ nodes: [] }).ok).toBe(false);
  });

  it('round-trips a network through JSON', () => {
    const net = tutorialNetwork();
    const parsed = parseNetwork(JSON.parse(JSON.stringify(net)));
    expect(parsed.ok).toBe(true);
    expect(parsed.network!.nodes).toHaveLength(6);
    expect(parsed.network!.edges).toHaveLength(10);
    expect(parsed.network!.edges[0]!.direction).toBe('increases');
    expect(parsed.network!.edges[0]!.strength).toBe(3);
    expect(parsed.network!.edges[0]!.valence).toBe('unhelpful');
  });

  it('migrates a v1 file that still carries -10..+10 weights', () => {
    const old = {
      schemaVersion: 1,
      meta: { title: 'Old network' },
      nodes: [
        { id: 'a', label: 'Worry', category: 'cognition', valence: 'maladaptive', position: { x: 0, y: 0 }, severity: 8 },
        { id: 'b', label: 'Sleep', category: 'biophysiological', valence: 'maladaptive', position: { x: 1, y: 1 } },
      ],
      edges: [
        { id: 'e1', source: 'a', target: 'b', weight: 9 },
        { id: 'e2', source: 'b', target: 'a', weight: -4 },
      ],
    };
    const parsed = parseNetwork(old);
    expect(parsed.ok).toBe(true);
    expect(parsed.network!.edges[0]).toMatchObject({ direction: 'increases', strength: 3, weight: 3 });
    expect(parsed.network!.edges[1]).toMatchObject({ direction: 'decreases', strength: 2, weight: -2 });
    // Severity survives; the old node-level valence is simply not carried over.
    expect(parsed.network!.nodes[0]!.severity).toBe(8);
  });

  it('explains that moderators could not be carried across', () => {
    const old = {
      schemaVersion: 1,
      nodes: [{ id: 'a', label: 'A', position: { x: 0, y: 0 } }, { id: 'b', label: 'B', position: { x: 1, y: 1 } }],
      edges: [{ id: 'e1', source: 'a', target: 'b', weight: 5 }],
      moderators: [{ id: 'm1', source: 'a', targetEdge: 'e1', effect: 'strengthens', magnitude: 5 }],
    };
    const parsed = parseNetwork(old);
    expect(parsed.ok).toBe(true);
    expect(parsed.warnings.join(' ')).toContain('Context node');
  });

  it('drops dangling edges and says so', () => {
    const broken = JSON.parse(JSON.stringify(tutorialNetwork()));
    broken.edges.push({ id: 'x', source: 'nope', target: 'alsonope', direction: 'increases', strength: 2 });
    const parsed = parseNetwork(broken);
    expect(parsed.ok).toBe(true);
    expect(parsed.network!.edges).toHaveLength(10);
    expect(parsed.warnings.join(' ')).toContain('missing nodes');
  });

  it('converts a PLAN-style export, mapping its categories across', () => {
    const plan = {
      nodes: [
        { id: '1', name: 'Worry', category: 'Cognition', x: 10, y: 20 },
        { id: '2', name: 'Poor sleep', category: 'Biology', x: 30, y: 40 },
        { id: '3', name: 'Isolation', category: 'Social', x: 50, y: 60 },
      ],
      edges: [
        { from: '1', to: '2', value: 8 },
        { from: '2', to: '1', value: 6 },
      ],
    };
    const parsed = parseNetwork(plan);
    expect(parsed.ok).toBe(true);
    expect(parsed.warnings.join(' ')).toContain('PLAN export');
    expect(parsed.network!.nodes[0]!.category).toBe('cognition');
    expect(parsed.network!.nodes[1]!.category).toBe('biophysiological');
    expect(parsed.network!.nodes[2]!.category).toBe('sociocultural');
    expect(parsed.network!.nodes[0]!.position).toEqual({ x: 10, y: 20 });
    expect(analyse(parsed.network!).loops.reinforcing).toBe(1);
  });

  it('clamps an out-of-range strength rather than trusting it', () => {
    const broken = JSON.parse(JSON.stringify(tutorialNetwork()));
    broken.edges[0].strength = 99;
    broken.nodes[0].severity = -5;
    const parsed = parseNetwork(broken);
    expect(parsed.network!.edges[0]!.strength).toBeLessThanOrEqual(3);
    expect(parsed.network!.nodes[0]!.severity).toBe(0);
  });
});
