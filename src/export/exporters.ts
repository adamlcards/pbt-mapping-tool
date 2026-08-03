import type { LogEvent, PbtNetwork, Snapshot } from '../model/types';
import { analyse } from '../analysis';
import { CATEGORY_META } from '../model/eemm';

/**
 * Exports.
 *
 * The formats here are chosen so that a network can leave this tool and be
 * analysed properly elsewhere. App-specific JSON is fine for round-tripping but
 * useless in R, and an adjacency matrix is what every network package actually
 * wants as input. Offering only PNG and proprietary JSON, as most of these tools
 * do, is what forces researchers to re-enter data by hand.
 */

export function download(filename: string, content: string | Blob, mime = 'text/plain'): void {
  const blob = typeof content === 'string' ? new Blob([content], { type: `${mime};charset=utf-8` }) : content;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function safeFilename(title: string): string {
  return (title || 'network').replace(/[^a-z0-9\-_ ]/gi, '').replace(/\s+/g, '_').slice(0, 60) || 'network';
}

export function exportJson(net: PbtNetwork): string {
  return JSON.stringify(net, null, 2);
}

/** One row per connection. The natural format for most analysis packages. */
export function exportEdgeListCsv(net: PbtNetwork): string {
  const rows = [
    [
      'source',
      'target',
      'direction',
      'strength',
      'weight',
      'link_valence',
      'trial',
      'tested_at',
      'source_category',
      'target_category',
      'notes',
    ],
    ...net.edges.map((e) => {
      const s = net.nodes.find((n) => n.id === e.source);
      const t = net.nodes.find((n) => n.id === e.target);
      return [
        s?.label ?? e.source,
        t?.label ?? e.target,
        e.direction,
        String(e.strength),
        String(e.weight),
        e.valence,
        e.trial ?? '',
        e.testedAt ?? '',
        s?.category ?? '',
        t?.category ?? '',
        e.notes ?? '',
      ];
    }),
  ];
  return toCsv(rows);
}

/** One row per node, with ratings. Pairs with the edge list. */
export function exportNodeListCsv(net: PbtNetwork): string {
  const report = analyse(net);
  const byId = new Map(report.centrality.map((c) => [c.id, c]));
  const rows = [
    [
      'label',
      'category',
      'category_label',
      'trial',
      'tested_at',
      'severity',
      'frequency',
      'in_degree',
      'out_degree',
      'in_strength',
      'out_strength',
      'total_strength',
      'expected_influence',
      'betweenness',
      'notes',
    ],
    ...net.nodes.map((n) => {
      const c = byId.get(n.id);
      return [
        n.label,
        n.category,
        CATEGORY_META[n.category].label,
        n.trial ?? '',
        n.testedAt ?? '',
        n.severity !== undefined ? String(n.severity) : '',
        n.frequency !== undefined ? String(n.frequency) : '',
        String(c?.inDegree ?? 0),
        String(c?.outDegree ?? 0),
        String(c?.inStrength ?? 0),
        String(c?.outStrength ?? 0),
        String(c?.totalStrength ?? 0),
        String(c?.expectedInfluence ?? 0),
        String(c?.betweenness ?? 0),
        n.notes ?? '',
      ];
    }),
  ];
  return toCsv(rows);
}

/**
 * Square weighted adjacency matrix, rows = source, columns = target.
 * Directly loadable by qgraph, igraph, networkx and friends.
 */
export function exportAdjacencyCsv(net: PbtNetwork): string {
  const labels = net.nodes.map((n) => n.label);
  const idx = new Map(net.nodes.map((n, i) => [n.id, i]));
  const size = net.nodes.length;
  const matrix: number[][] = Array.from({ length: size }, () => Array<number>(size).fill(0));
  for (const e of net.edges) {
    const r = idx.get(e.source);
    const c = idx.get(e.target);
    if (r === undefined || c === undefined) continue;
    matrix[r]![c] = e.weight;
  }
  const rows = [['', ...labels], ...matrix.map((row, i) => [labels[i] ?? '', ...row.map(String)])];
  return toCsv(rows);
}

/** Process data. Only meaningful in study mode, but always available locally. */
export function exportEventsCsv(events: LogEvent[]): string {
  const rows = [
    ['timestamp', 'ms_since_start', 'event', 'payload'],
    ...events.map((e) => [e.at, String(e.sinceStartMs), e.type, JSON.stringify(e.payload ?? {})]),
  ];
  return toCsv(rows);
}

/**
 * Comparison between two snapshots: what was added, removed, and re-rated.
 * This is the table a test-retest reliability analysis actually needs.
 */
export type DiffKind = 'added' | 'removed' | 'rerated' | 'reweighted' | 'trial';

export interface DiffRow {
  kind: DiffKind;
  element: string;
  detail: string;
  before: string;
  after: string;
}

/**
 * Structured comparison between two timepoints.
 *
 * Returned as objects rather than pre-formatted CSV because the UI needs the
 * same data: rendering it by splitting a CSV string on commas silently mangled
 * every label that happened to contain one, which is most real clinical wording.
 */
export function diffSnapshots(a: Snapshot, b: Snapshot): DiffRow[] {
  const rows: DiffRow[] = [];

  const aNodes = new Map(a.network.nodes.map((n) => [n.label.toLowerCase(), n]));
  const bNodes = new Map(b.network.nodes.map((n) => [n.label.toLowerCase(), n]));

  for (const [key, n] of aNodes) {
    if (!bNodes.has(key)) {
      rows.push({ kind: 'removed', element: 'node', detail: n.label, before: 'present', after: 'absent' });
    }
  }
  for (const [key, n] of bNodes) {
    const prev = aNodes.get(key);
    if (!prev) {
      rows.push({ kind: 'added', element: 'node', detail: n.label, before: 'absent', after: 'present' });
      continue;
    }
    if (prev.severity !== n.severity) {
      rows.push({
        kind: 'rerated',
        element: 'node severity',
        detail: n.label,
        before: prev.severity !== undefined ? String(prev.severity) : '',
        after: n.severity !== undefined ? String(n.severity) : '',
      });
    }
    if (prev.frequency !== n.frequency) {
      rows.push({
        kind: 'rerated',
        element: 'node frequency',
        detail: n.label,
        before: prev.frequency !== undefined ? String(prev.frequency) : '',
        after: n.frequency !== undefined ? String(n.frequency) : '',
      });
    }
    // What was tried between two timepoints, and how it went, is exactly the
    // thing a comparison across sessions is for.
    if (prev.trial !== n.trial) {
      rows.push({
        kind: 'trial',
        element: 'trial outcome',
        detail: n.label,
        before: prev.trial ?? 'not a trial',
        after: n.trial ?? 'not a trial',
      });
    }
  }

  const edgeMap = (net: PbtNetwork) => {
    const label = new Map(net.nodes.map((n) => [n.id, n.label.toLowerCase()]));
    return new Map(
      net.edges.map((e) => [`${label.get(e.source)} \u2192 ${label.get(e.target)}`, e.weight] as const),
    );
  };
  const aEdges = edgeMap(a.network);
  const bEdges = edgeMap(b.network);

  for (const [key, w] of aEdges) {
    if (!bEdges.has(key)) {
      rows.push({ kind: 'removed', element: 'connection', detail: key, before: String(w), after: '' });
    } else if (bEdges.get(key) !== w) {
      rows.push({
        kind: 'reweighted',
        element: 'connection',
        detail: key,
        before: String(w),
        after: String(bEdges.get(key)),
      });
    }
  }
  for (const [key, w] of bEdges) {
    if (!aEdges.has(key)) {
      rows.push({ kind: 'added', element: 'connection', detail: key, before: '', after: String(w) });
    }
  }

  return rows;
}

/** The same comparison, as a CSV for a reliability analysis. */
export function exportSnapshotDiffCsv(a: Snapshot, b: Snapshot): string {
  const rows = diffSnapshots(a, b);
  return toCsv([
    ['change', 'element', 'detail', a.label, b.label],
    ...rows.map((r) => [r.kind, r.element, r.detail, r.before, r.after]),
  ]);
}

/** A human-readable analysis report, for pasting into notes or a case file. */
export function exportReportMarkdown(net: PbtNetwork): string {
  const r = analyse(net);
  const lines: string[] = [];
  lines.push(`# ${net.meta.title}`, '');
  lines.push(`_Generated ${new Date().toLocaleString()}. ${r.nodeCount} nodes, ${r.edgeCount} connections._`, '');

  lines.push('## Summary', '');
  for (const s of r.summary) lines.push(`- ${s.replace(/\*\*/g, '**')}`);
  lines.push('');

  lines.push('## Most connected', '');
  lines.push('| Node | In | Out | Total strength | Net outward influence |');
  lines.push('|---|---|---|---|---|');
  for (const c of r.centrality.slice(0, 10)) {
    lines.push(`| ${c.label} | ${c.inDegree} | ${c.outDegree} | ${c.totalStrength} | ${c.expectedInfluence} |`);
  }
  lines.push('');

  if (r.loops.loops.length > 0) {
    lines.push('## Feedback loops', '');
    for (const l of r.loops.loops.slice(0, 15)) {
      lines.push(`- **${l.kind}** (${l.length} step${l.length === 1 ? '' : 's'}, gain ${l.gain}): ${l.labels.join(' → ')} → ${l.labels[0]}`);
    }
    lines.push('');
  }

  lines.push('## Modelled leverage', '');
  lines.push('_Heuristic. Assumes linear, instantaneous influence and that the ratings are accurate. Not a prediction._', '');
  lines.push('| Node | Modelled benefit | Reach | Would also suppress |');
  lines.push('|---|---|---|---|');
  for (const l of r.leverage.slice(0, 10)) {
    lines.push(`| ${l.label} | ${l.benefit} | ${l.reach} | ${l.sideEffects.map((s) => s.label).join(', ') || '—'} |`);
  }
  return lines.join('\n');
}

function toCsv(rows: string[][]): string {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          const v = cell ?? '';
          return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
        })
        .join(','),
    )
    .join('\r\n');
}
