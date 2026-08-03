import { describe, it, expect } from 'vitest';
import { layeredPositions, separateOverlaps } from '../../components/layout';
import { createEdge, createNetwork, createNode } from '../../model/factory';
import type { PbtNetwork } from '../../model/types';

function net(): PbtNetwork {
  const n = createNetwork('Layout test');
  const boss = createNode({ label: 'Criticism at work', category: 'context', position: { x: 900, y: 700 } });
  const partner = createNode({ label: 'Partner works nights', category: 'context', position: { x: 950, y: 40 } });
  const worry = createNode({ label: 'Worry', category: 'cognition', position: { x: 10, y: 400 } });
  const sleep = createNode({ label: 'Cannot sleep', category: 'biophysiological', position: { x: 50, y: 90 } });
  const bed = createNode({ label: 'Stays in bed', category: 'overtBehaviour', position: { x: 300, y: 600 } });
  // A process with nothing feeding it: an entry point, but not a context.
  const withdrawal = createNode({ label: 'Withdrawal', category: 'sociocultural', position: { x: 20, y: 20 } });
  n.nodes = [boss, partner, worry, sleep, bed, withdrawal];
  n.edges = [
    createEdge(boss.id, worry.id, 'increases', 3),
    createEdge(partner.id, sleep.id, 'increases', 2),
    createEdge(worry.id, sleep.id, 'increases', 3),
    createEdge(sleep.id, worry.id, 'increases', 2), // feedback loop
    createEdge(sleep.id, bed.id, 'increases', 3),
    createEdge(withdrawal.id, worry.id, 'increases', 2),
  ];
  return n;
}

const opts = (rankDir: 'TB' | 'LR') => ({
  rankDir,
  nodeWidth: 180,
  nodeHeights: new Map(net().nodes.map((n) => [n.id, 60])),
});

describe('layered layout', () => {
  it('keeps a source process out of the context column', () => {
    const n = net();
    const pos = layeredPositions(n, opts('LR'));
    const contextX = pos.get(n.nodes[0]!.id)!.x;
    const withdrawalX = pos.get(n.nodes.find((x) => x.label === 'Withdrawal')!.id)!.x;
    expect(withdrawalX).toBeGreaterThan(contextX);
  });

  it('leads with the context that reaches the most of the network', () => {
    const n = net();
    const pos = layeredPositions(n, opts('LR'));
    const boss = pos.get(n.nodes[0]!.id)!.x; // Criticism at work -> the whole chain
    const others = n.nodes.slice(1).map((x) => pos.get(x.id)!.x);
    expect(boss).toBeLessThan(Math.min(...others));
  });

  it('lets a secondary context sit beside what it influences, not in column one', () => {
    // "Partner works nights" only feeds Cannot sleep. Dragging it out to the
    // leading edge would stretch a corridor across the whole diagram.
    const n = net();
    const pos = layeredPositions(n, opts('LR'));
    const partner = pos.get(n.nodes[1]!.id)!.x;
    const boss = pos.get(n.nodes[0]!.id)!.x;
    const sleep = pos.get(n.nodes.find((x) => x.label === 'Cannot sleep')!.id)!.x;
    expect(partner).toBeGreaterThan(boss);
    expect(partner).toBeLessThan(sleep);
  });

  it('does the same top to bottom', () => {
    const n = net();
    const pos = layeredPositions(n, opts('TB'));
    const boss = pos.get(n.nodes[0]!.id)!.y;
    const others = n.nodes.slice(1).map((x) => pos.get(x.id)!.y);
    expect(boss).toBeLessThan(Math.min(...others));
  });

  it('leaves no empty gutter where the temporary layout root was', () => {
    const n = net();
    const pos = layeredPositions(n, opts('LR'));
    const minX = Math.min(...[...pos.values()].map((p) => p.x));
    // The contexts should start near the origin, not pushed right by a phantom.
    expect(minX).toBeLessThan(120);
  });

  it('positions every node exactly once', () => {
    const n = net();
    const pos = layeredPositions(n, opts('LR'));
    expect(pos.size).toBe(n.nodes.length);
    expect([...pos.values()].every((p) => Number.isFinite(p.x) && Number.isFinite(p.y))).toBe(true);
  });

  it('still lays out a network with no context at all', () => {
    const n = net();
    n.nodes = n.nodes.filter((x) => x.category !== 'context');
    const ids = new Set(n.nodes.map((x) => x.id));
    n.edges = n.edges.filter((e) => ids.has(e.source) && ids.has(e.target));
    const pos = layeredPositions(n, opts('LR'));
    expect(pos.size).toBe(n.nodes.length);
  });

  it('handles a network that is nothing but a mutual loop', () => {
    const n = createNetwork();
    const a = createNode({ label: 'A', position: { x: 0, y: 0 } });
    const b = createNode({ label: 'B', position: { x: 0, y: 0 } });
    n.nodes = [a, b];
    n.edges = [createEdge(a.id, b.id, 'increases', 2), createEdge(b.id, a.id, 'increases', 2)];
    const pos = layeredPositions(n, { rankDir: 'LR', nodeWidth: 180, nodeHeights: new Map() });
    expect(pos.size).toBe(2);
    expect(pos.get(a.id)!.x).not.toBe(pos.get(b.id)!.x);
  });

  it('returns nothing for an empty network rather than throwing', () => {
    expect(layeredPositions(createNetwork(), opts('LR')).size).toBe(0);
  });
});

describe('overlap separation', () => {
  const sizes = new Map([
    ['a', { w: 180, h: 60 }],
    ['b', { w: 180, h: 60 }],
    ['c', { w: 180, h: 90 }],
  ]);

  const overlapping = (pos: Map<string, { x: number; y: number }>, gap: number) => {
    const ids = [...pos.keys()];
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = pos.get(ids[i]!)!;
        const b = pos.get(ids[j]!)!;
        const sa = sizes.get(ids[i]!)!;
        const sb = sizes.get(ids[j]!)!;
        const needX = (sa.w + sb.w) / 2 + gap;
        const needY = (sa.h + sb.h) / 2 + gap;
        if (needX - Math.abs(b.x - a.x) > 0.5 && needY - Math.abs(b.y - a.y) > 0.5) return true;
      }
    }
    return false;
  };

  it('separates boxes that were sitting on top of each other', () => {
    const pos = new Map([
      ['a', { x: 100, y: 100 }],
      ['b', { x: 110, y: 105 }],
      ['c', { x: 120, y: 95 }],
    ]);
    expect(overlapping(pos, 26)).toBe(true);
    expect(overlapping(separateOverlaps(pos, sizes), 26)).toBe(false);
  });

  it('handles boxes at exactly the same point without producing NaN', () => {
    const pos = new Map([
      ['a', { x: 0, y: 0 }],
      ['b', { x: 0, y: 0 }],
    ]);
    const out = separateOverlaps(pos, sizes);
    expect([...out.values()].every((p) => Number.isFinite(p.x) && Number.isFinite(p.y))).toBe(true);
    expect(overlapping(out, 26)).toBe(false);
  });

  it('leaves an already-spaced arrangement alone', () => {
    const pos = new Map([
      ['a', { x: 0, y: 0 }],
      ['b', { x: 500, y: 0 }],
      ['c', { x: 1000, y: 0 }],
    ]);
    expect(separateOverlaps(pos, sizes)).toEqual(pos);
  });

  it('keeps the broad arrangement rather than scattering it', () => {
    const pos = new Map([
      ['a', { x: 0, y: 0 }],
      ['b', { x: 40, y: 0 }],
      ['c', { x: 80, y: 0 }],
    ]);
    const out = separateOverlaps(pos, sizes);
    // a was left of b was left of c, and should still be.
    expect(out.get('a')!.x).toBeLessThan(out.get('b')!.x);
    expect(out.get('b')!.x).toBeLessThan(out.get('c')!.x);
  });
});
