import { describe, expect, it } from 'vitest';
import { analyse } from '../index';
import { createEdge, createNetwork, createNode } from '../../model/factory';
import type { PbtNetwork } from '../../model/types';
import type { LinkValence } from '../../model/eemm';

/**
 * The split exists because a combined centrality score cannot distinguish a
 * process that is central because it holds the problem together from one that
 * is central because it is the person's main source of relief. These tests pin
 * that distinction down.
 */
function net(edges: [string, string, LinkValence][], labels = ['A', 'B', 'C']): PbtNetwork {
  const base = createNetwork('T');
  const nodes = labels.map((l, i) => ({ ...createNode({ label: l, position: { x: i * 100, y: 0 } }), id: l }));
  return {
    ...base,
    nodes,
    edges: edges.map(([a, b, v]) => createEdge(a, b, 'increases', 2, v)),
  };
}

describe('centrality split by valence', () => {
  it('counts only the arrows of the chosen kind', () => {
    const r = analyse(
      net([
        ['A', 'B', 'unhelpful'],
        ['A', 'C', 'unhelpful'],
        ['B', 'C', 'helpful'],
      ]),
    );

    expect(r.byValence.counts).toEqual({ unhelpful: 2, helpful: 1, neutral: 0 });

    const unhelpfulA = r.byValence.unhelpful.find((c) => c.id === 'A')!;
    const helpfulA = r.byValence.helpful.find((c) => c.id === 'A')!;
    expect(unhelpfulA.outDegree).toBe(2);
    // A has no helpful arrows at all, which is exactly the finding.
    expect(helpfulA.outDegree).toBe(0);
    expect(helpfulA.isIsolated).toBe(true);
  });

  it('keeps every node in both splits, even with none of its arrows surviving', () => {
    const r = analyse(net([['A', 'B', 'unhelpful']]));
    expect(r.byValence.helpful).toHaveLength(3);
    expect(r.byValence.unhelpful).toHaveLength(3);
  });

  it('excludes unjudged arrows from both splits rather than guessing', () => {
    const r = analyse(
      net([
        ['A', 'B', 'neutral'],
        ['B', 'C', 'helpful'],
      ]),
    );
    expect(r.byValence.counts).toEqual({ unhelpful: 0, helpful: 1, neutral: 1 });
    // The two splits deliberately do not sum to the total.
    expect(r.byValence.counts.helpful + r.byValence.counts.unhelpful).toBeLessThan(r.edgeCount);
  });

  it('can rank a node top overall and bottom on the adaptive split', () => {
    const r = analyse(
      net([
        ['A', 'B', 'unhelpful'],
        ['A', 'C', 'unhelpful'],
        ['C', 'B', 'helpful'],
      ]),
    );
    expect(r.centrality[0]!.id).toBe('A');
    expect(r.byValence.helpful[0]!.id).not.toBe('A');
  });

  it('leaves the combined table untouched', () => {
    const rows = [
      ['A', 'B', 'unhelpful'],
      ['B', 'C', 'helpful'],
    ] as [string, string, LinkValence][];
    const r = analyse(net(rows));
    expect(r.centrality).toHaveLength(3);
    expect(r.edgeCount).toBe(2);
  });
});
