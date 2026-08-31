import type { PbtNetwork } from '../model/types';
import { buildGraph } from './graph';
import { centrality, type CentralityRow } from './centrality';
import { findLoops, type LoopResult } from './loops';
import { rankLeverage, type LeverageRow } from './leverage';
import { fmt, plural, t } from '../i18n/strings';

export * from './graph';
export * from './centrality';
export * from './loops';
export * from './paths';
export * from './leverage';

/**
 * Centrality computed three ways over the same boxes.
 *
 * `all` is the whole map. `helpful` and `unhelpful` are the same calculation
 * restricted to arrows marked as helping or not helping, and they answer a
 * question the combined figure cannot: a process can look highly central
 * overall while every one of its connections is unhelpful, and the reverse —
 * a quiet-looking process that is the person's only adaptive hub. Merging the
 * two into one number averages away the distinction that matters clinically.
 *
 * Neutral (unjudged) arrows appear in `all` and in neither split, so the two
 * splits do not sum to the total. That is deliberate: an unjudged link is not
 * evidence of either kind, and silently filing it under one would invent a
 * clinical judgement the person never made.
 */
export interface ValenceCentrality {
  helpful: CentralityRow[];
  unhelpful: CentralityRow[];
  /** How many arrows carry each mark, so the panel can say when a split is empty. */
  counts: { helpful: number; unhelpful: number; neutral: number };
}

export interface AnalysisReport {
  centrality: CentralityRow[];
  byValence: ValenceCentrality;
  loops: LoopResult;
  leverage: LeverageRow[];
  summary: string[];
  nodeCount: number;
  edgeCount: number;
  density: number;
}

/**
 * Run everything and, crucially, turn it into sentences.
 *
 * A table of centrality scores is not clinically useful to most people who will
 * open this tool. The point of the analysis is to say something a clinician can
 * take into the room, so the numbers are always accompanied by plain language.
 */
export function analyse(net: PbtNetwork): AnalysisReport {
  const g = buildGraph(net);
  const cent = centrality(g);
  const helpfulG = buildGraph(net, (e) => e.valence === 'helpful');
  const unhelpfulG = buildGraph(net, (e) => e.valence === 'unhelpful');
  const loopResult = findLoops(g);
  const leverage = rankLeverage(net, g);

  const n = g.nodeIds.length;
  const possible = n * (n - 1);
  const density = possible > 0 ? Math.round((g.edges.length / possible) * 1000) / 1000 : 0;

  const byTotal = (rows: CentralityRow[]) => [...rows].sort((a, b) => b.totalStrength - a.totalStrength);

  return {
    centrality: byTotal(cent),
    byValence: {
      helpful: byTotal(centrality(helpfulG)),
      unhelpful: byTotal(centrality(unhelpfulG)),
      counts: {
        helpful: helpfulG.edges.length,
        unhelpful: unhelpfulG.edges.length,
        neutral: g.edges.length - helpfulG.edges.length - unhelpfulG.edges.length,
      },
    },
    loops: loopResult,
    leverage,
    summary: buildSummary(net, cent, loopResult, leverage),
    nodeCount: n,
    edgeCount: g.edges.length,
    density,
  };
}

/**
 * Turn the numbers into sentences, in whatever language is active.
 *
 * Every sentence is a whole template with placeholders rather than English
 * fragments glued together. Concatenation is what makes machine-translated
 * interfaces read badly: "There are" + count + "reinforcing loops" cannot be
 * reordered, and several of the languages this ships in need to reorder it.
 */
function buildSummary(
  net: PbtNetwork,
  cent: CentralityRow[],
  loops: LoopResult,
  leverage: LeverageRow[],
): string[] {
  const s = t().summary;
  const out: string[] = [];
  if (net.nodes.length === 0) return [s.noNodes];
  if (net.edges.length === 0) return [s.noEdges];

  const byStrength = [...cent].sort((a, b) => b.totalStrength - a.totalStrength);
  const top = byStrength[0];
  if (top && top.totalStrength > 0) {
    out.push(
      plural({ one: s.mostConnected_one, other: s.mostConnected_other }, top.inDegree, {
        label: top.label,
        inDegree: top.inDegree,
        outDegree: top.outDegree,
      }),
    );
  }

  if (loops.reinforcing > 0) {
    const strongest = loops.loops.find((l) => l.kind === 'reinforcing');
    const tightest = strongest
      ? fmt(s.tightestLoop, { path: `${strongest.labels.join(' → ')} → ${strongest.labels[0]}` })
      : '';
    out.push(
      plural({ one: s.reinforcing_one, other: s.reinforcing_other }, loops.reinforcing) + tightest,
    );
  } else {
    out.push(s.noReinforcing);
  }

  if (loops.balancing > 0) {
    out.push(plural({ one: s.balancing_one, other: s.balancing_other }, loops.balancing));
  }

  const sources = cent.filter((c) => c.isSource);
  if (sources.length > 0) {
    out.push(
      plural({ one: s.sources_one, other: s.sources_other }, sources.length, {
        labels: sources.map((x) => `**${x.label}**`).join(', '),
      }),
    );
  }

  const bestLeverage = leverage[0];
  if (bestLeverage && bestLeverage.benefit > 0) {
    const line = plural({ one: s.leverage_one, other: s.leverage_other }, bestLeverage.reach, {
      label: bestLeverage.label,
      reach: bestLeverage.reach,
    });
    const caveat =
      bestLeverage.sideEffects.length > 0
        ? plural(
            { one: s.leverageCaveat_one, other: s.leverageCaveat_other },
            bestLeverage.sideEffects.length,
            { labels: bestLeverage.sideEffects.map((x) => x.label).join(', ') },
          )
        : '';
    out.push(line + caveat);
  }

  const isolated = cent.filter((c) => c.isIsolated);
  if (isolated.length > 0) {
    out.push(
      plural({ one: s.isolated_one, other: s.isolated_other }, isolated.length, {
        labels: isolated.map((x) => x.label).join(', '),
      }),
    );
  }

  if (!leverage.every((l) => l.converged)) out.push(s.diverges);

  out.push(s.caveat);

  return out;
}
