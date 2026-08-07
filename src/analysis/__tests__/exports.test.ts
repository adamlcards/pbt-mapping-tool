import { describe, it, expect } from 'vitest';
import {
  diffSnapshots,
  exportAdjacencyCsv,
  exportEdgeListCsv,
  exportNodeListCsv,
  exportReportMarkdown,
  safeFilename,
} from '../../export/exporters';
import { createEdge, createNetwork, createNode, createSnapshot } from '../../model/factory';
import { decodeShare, encodeShare, packNetwork, unpackNetwork } from '../../persistence/share';
import { EEMM_CATEGORIES } from '../../model/eemm';
import type { PbtNetwork } from '../../model/types';
import { deepClone } from '../../model/clone';

/**
 * Labels with commas, quotes and non-Latin characters are the norm in clinical
 * use, not an edge case. Every one of these tests corresponds to something that
 * was actually broken.
 */
function awkwardNetwork(): PbtNetwork {
  const net = createNetwork('Test, with comma');
  const a = createNode({ label: 'Worry about money, and work', position: { x: 0, y: 0 }, severity: 8 });
  const b = createNode({ label: 'She said "just relax"', position: { x: 10, y: 10 }, severity: 4 });
  const c = createNode({ label: '睡眠障害', category: 'context', position: { x: 20, y: 20 } });
  net.nodes = [a, b, c];
  net.edges = [
    createEdge(a.id, b.id, 'increases', 3, 'unhelpful'),
    createEdge(b.id, c.id, 'decreases', 2, 'helpful'),
    createEdge(c.id, a.id, 'increases', 1, 'neutral'),
  ];
  return net;
}

describe('CSV export quoting', () => {
  it('quotes labels containing commas so columns do not shift', () => {
    const csv = exportEdgeListCsv(awkwardNetwork());
    const header = csv.split('\r\n')[0]!;
    expect(header.split(',')).toHaveLength(11);
    expect(csv).toContain('"Worry about money, and work"');
  });

  it('escapes embedded double quotes the way RFC 4180 requires', () => {
    const csv = exportNodeListCsv(awkwardNetwork());
    expect(csv).toContain('"She said ""just relax"""');
  });

  it('keeps the adjacency matrix square and labelled', () => {
    const csv = exportAdjacencyCsv(awkwardNetwork());
    const lines = csv.split('\r\n');
    expect(lines).toHaveLength(4); // header + 3 nodes
    expect(lines[0]!.startsWith(',')).toBe(true);
  });

  it('produces a report without throwing on unusual labels', () => {
    expect(() => exportReportMarkdown(awkwardNetwork())).not.toThrow();
    expect(exportReportMarkdown(awkwardNetwork())).toContain('睡眠障害');
  });

  it('carries the trial state through, so a research export knows what was tried', () => {
    const net = awkwardNetwork();
    net.nodes[0]!.trial = 'adopted';
    net.nodes[0]!.testedAt = '2026-08-04T00:00:00.000Z';
    net.edges[0]!.trial = 'ruledOut';
    expect(exportNodeListCsv(net)).toContain('adopted');
    expect(exportNodeListCsv(net)).toContain('2026-08-04');
    expect(exportEdgeListCsv(net)).toContain('ruledOut');
  });

  it('strips characters that are illegal in filenames', () => {
    expect(safeFilename('Intake: 3/8/26 *draft*')).not.toMatch(/[/:*]/);
    expect(safeFilename('')).toBe('network');
    expect(safeFilename('!!!')).toBe('network');
  });
});

describe('snapshot comparison', () => {
  it('returns structured rows, not a CSV string that must be re-split', () => {
    const first = awkwardNetwork();
    const snapA = createSnapshot(first, 'Intake');

    const second = deepClone(first);
    second.nodes[0]!.severity = 3;
    second.edges[0]!.strength = 1;
    second.edges[0]!.weight = 1;
    second.nodes.push(createNode({ label: 'New thing', position: { x: 5, y: 5 } }));
    const snapB = createSnapshot(second, 'Session 6');

    const rows = diffSnapshots(snapA, snapB);

    // The comma in the label must survive intact, which the old CSV-splitting
    // display destroyed.
    const rerated = rows.find((r) => r.kind === 'rerated');
    expect(rerated?.detail).toBe('Worry about money, and work');
    expect(rerated?.before).toBe('8');
    expect(rerated?.after).toBe('3');

    expect(rows.some((r) => r.kind === 'reweighted' && r.before === '3' && r.after === '1')).toBe(true);
    expect(rows.some((r) => r.kind === 'added' && r.detail === 'New thing')).toBe(true);
  });

  it('records a trial outcome as a change between timepoints', () => {
    const first = awkwardNetwork();
    const a = createSnapshot(first, 'Session 1');
    const second = deepClone(first);
    second.nodes[0]!.trial = 'ruledOut';
    const b = createSnapshot(second, 'Session 8');
    const row = diffSnapshots(a, b).find((r) => r.kind === 'trial');
    expect(row).toBeDefined();
    expect(row!.after).toBe('ruledOut');
  });

  it('reports no changes between a snapshot and itself', () => {
    const snap = createSnapshot(awkwardNetwork(), 'A');
    expect(diffSnapshots(snap, snap)).toHaveLength(0);
  });

  it('notices a removed node', () => {
    const net = awkwardNetwork();
    const a = createSnapshot(net, 'Before');
    const shrunk = deepClone(net);
    shrunk.nodes = shrunk.nodes.slice(0, 2);
    shrunk.edges = [];
    const b = createSnapshot(shrunk, 'After');
    expect(diffSnapshots(a, b).some((r) => r.kind === 'removed' && r.detail === '睡眠障害')).toBe(true);
  });
});

describe('share link encoding', () => {
  it('round-trips non-Latin labels and quotes without corruption', () => {
    const net = awkwardNetwork();
    const restored = unpackNetwork(packNetwork(net));
    expect(restored).not.toBeNull();
    expect(restored!.nodes.map((n) => n.label)).toEqual([
      'Worry about money, and work',
      'She said "just relax"',
      '睡眠障害',
    ]);
    expect(restored!.edges).toHaveLength(3);
    expect(restored!.nodes[0]!.severity).toBe(8);
    expect(restored!.nodes[2]!.category).toBe('context');
  });

  it('carries the trial state through a share link', () => {
    const net = awkwardNetwork();
    net.nodes[0]!.trial = 'proposed';
    net.edges[1]!.trial = 'adopted';
    const restored = unpackNetwork(packNetwork(net))!;
    expect(restored.nodes[0]!.trial).toBe('proposed');
    expect(restored.edges[1]!.trial).toBe('adopted');
    expect(restored.nodes[1]!.trial).toBeUndefined();
  });

  it('preserves direction, strength and valence through the round trip', () => {
    const net = awkwardNetwork();
    const restored = unpackNetwork(packNetwork(net))!;
    expect(restored.edges.map((e) => e.weight).sort((a, b) => a - b)).toEqual([-2, 1, 3]);
    expect(restored.edges.map((e) => e.valence)).toEqual(['unhelpful', 'helpful', 'neutral']);
  });

  it('returns null for a corrupted link rather than throwing', () => {
    expect(unpackNetwork('not-valid-base64!!!')).toBeNull();
    expect(unpackNetwork('')).toBeNull();
    expect(unpackNetwork(btoa('{"nonsense":true}'))).toBeNull();
  });
});

describe('deepClone fallback', () => {
  it('produces an independent copy via structuredClone', () => {
    const net = awkwardNetwork();
    const copy = deepClone(net);
    copy.nodes[0]!.label = 'changed';
    expect(net.nodes[0]!.label).toBe('Worry about money, and work');
  });

  it('still works when structuredClone is missing, as on older browsers', () => {
    const original = globalThis.structuredClone;
    // @ts-expect-error deliberately removing it to exercise the fallback
    delete globalThis.structuredClone;
    try {
      const net = awkwardNetwork();
      const copy = deepClone(net);
      copy.nodes[0]!.label = 'changed';
      expect(net.nodes[0]!.label).toBe('Worry about money, and work');
      expect(copy.nodes).toHaveLength(3);
      expect(copy.nodes[2]!.label).toBe('睡眠障害');
      expect(copy.edges[1]!.weight).toBe(-2);
    } finally {
      globalThis.structuredClone = original;
    }
  });
});

describe('share links stay short enough to survive being pasted', () => {
  it('is a fraction of the old size, because ids are not repeated', () => {
    const net = createNetwork('Worry and sleep cycle');
    // A realistic six-box map with ten links.
    const labels = [
      'Criticism at work',
      'Worry about job security',
      'Difficulty sleeping',
      'Fatigue',
      'Exercise',
      'Social withdrawal',
    ];
    net.nodes = labels.map((l) => createNode({ label: l, position: { x: 100, y: 100 } }));
    const pairs: [number, number][] = [
      [0, 1], [1, 2], [2, 1], [2, 3], [3, 1], [4, 3], [4, 1], [3, 4], [5, 1], [5, 4],
    ];
    net.edges = pairs.map(([a, b]) => createEdge(net.nodes[a]!.id, net.nodes[b]!.id, 'increases', 2));

    const packed = packNetwork(net);
    // The v1 format produced roughly 2,900 characters for this map.
    expect(packed.length).toBeLessThan(900);

    const restored = unpackNetwork(packed)!;
    expect(restored.nodes.map((n) => n.label)).toEqual(labels);
    expect(restored.edges).toHaveLength(10);
  });

  it('still reads a link made in the original format', () => {
    // Nobody should lose a link they already sent someone.
    const v1 = {
      v: 3,
      t: 'Old link',
      n: [
        ['n_aaa', 'Worry', 'cognition', 10, 20, 8, null, 'proposed'],
        ['n_bbb', 'Poor sleep', 'biophysiological', 30, 40, null, null, null],
      ],
      e: [['e_1', 'n_aaa', 'n_bbb', 'increases', 3, 'unhelpful', null]],
    };
    const encoded = btoa(JSON.stringify(v1)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const restored = unpackNetwork(encoded)!;
    expect(restored).not.toBeNull();
    expect(restored.nodes[0]!.label).toBe('Worry');
    expect(restored.nodes[0]!.severity).toBe(8);
    expect(restored.nodes[0]!.trial).toBe('proposed');
    expect(restored.edges[0]!.strength).toBe(3);
    expect(restored.edges[0]!.valence).toBe('unhelpful');
  });

  it('compresses, and still reads back correctly', async () => {
    const net = awkwardNetwork();
    net.nodes[0]!.trial = 'adopted';
    const plain = packNetwork(net);
    const encoded = await encodeShare(net);
    expect(encoded.startsWith('z')).toBe(true);
    expect(encoded.length).toBeLessThan(plain.length);

    const restored = (await decodeShare(encoded))!;
    expect(restored.nodes.map((n) => n.label)).toEqual([
      'Worry about money, and work',
      'She said "just relax"',
      '睡眠障害',
    ]);
    expect(restored.nodes[0]!.trial).toBe('adopted');
    expect(restored.nodes[2]!.category).toBe('context');
    expect(restored.edges.map((e) => e.weight).sort((a, b) => a - b)).toEqual([-2, 1, 3]);
  });

  it('still opens an uncompressed link, so nothing shared earlier breaks', async () => {
    const net = awkwardNetwork();
    const restored = (await decodeShare(packNetwork(net)))!;
    expect(restored).not.toBeNull();
    expect(restored.nodes).toHaveLength(3);
    expect(restored.nodes[2]!.category).toBe('context');
  });

  it('returns null for a corrupted compressed link rather than throwing', async () => {
    expect(await decodeShare('znot-real-deflate-data')).toBeNull();
  });

  it('keeps the category list frozen, because links store categories by index', () => {
    // If EEMM_CATEGORIES is reordered or has an entry inserted, every link
    // shared before that change decodes to the wrong categories — silently.
    // This test is the tripwire: append only, never reorder.
    expect([...EEMM_CATEGORIES]).toEqual([
      'uncategorised',
      'affect',
      'cognition',
      'attention',
      'self',
      'motivation',
      'overtBehaviour',
      'biophysiological',
      'sociocultural',
      'context',
    ]);
  });

  it('keeps every field through the compact round trip', () => {
    const net = awkwardNetwork();
    net.nodes[0]!.trial = 'adopted';
    net.edges[1]!.trial = 'ruledOut';
    const restored = unpackNetwork(packNetwork(net))!;
    expect(restored.nodes.map((n) => n.label)).toEqual([
      'Worry about money, and work',
      'She said "just relax"',
      '睡眠障害',
    ]);
    expect(restored.nodes[0]!.trial).toBe('adopted');
    expect(restored.nodes[0]!.severity).toBe(8);
    expect(restored.nodes[2]!.category).toBe('context');
    expect(restored.edges[1]!.trial).toBe('ruledOut');
    expect(restored.edges.map((e) => e.weight).sort((a, b) => a - b)).toEqual([-2, 1, 3]);
  });
});
