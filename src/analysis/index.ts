import type { PbtNetwork } from '../model/types';
import { buildGraph } from './graph';
import { centrality, type CentralityRow } from './centrality';
import { findLoops, type LoopResult } from './loops';
import { rankLeverage, type LeverageRow } from './leverage';

export * from './graph';
export * from './centrality';
export * from './loops';
export * from './paths';
export * from './leverage';

export interface AnalysisReport {
  centrality: CentralityRow[];
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
  const loopResult = findLoops(g);
  const leverage = rankLeverage(net, g);

  const n = g.nodeIds.length;
  const possible = n * (n - 1);
  const density = possible > 0 ? Math.round((g.edges.length / possible) * 1000) / 1000 : 0;

  return {
    centrality: [...cent].sort((a, b) => b.totalStrength - a.totalStrength),
    loops: loopResult,
    leverage,
    summary: buildSummary(net, cent, loopResult, leverage),
    nodeCount: n,
    edgeCount: g.edges.length,
    density,
  };
}

function buildSummary(
  net: PbtNetwork,
  cent: CentralityRow[],
  loops: LoopResult,
  leverage: LeverageRow[],
): string[] {
  const out: string[] = [];
  if (net.nodes.length === 0) return ['Add some nodes to see an analysis.'];
  if (net.edges.length === 0) {
    return ['Nothing is connected yet. Add connections to see how the parts influence each other.'];
  }

  const byStrength = [...cent].sort((a, b) => b.totalStrength - a.totalStrength);
  const top = byStrength[0];
  if (top && top.totalStrength > 0) {
    out.push(
      `**${top.label}** is the most connected part of this network (${top.inDegree} influence${top.inDegree === 1 ? '' : 's'} coming in, ${top.outDegree} going out). Central nodes are often where change spreads furthest, though they can also be the hardest to shift directly.`,
    );
  }

  if (loops.reinforcing > 0) {
    const strongest = loops.loops.find((l) => l.kind === 'reinforcing');
    out.push(
      `There ${loops.reinforcing === 1 ? 'is' : 'are'} **${loops.reinforcing} reinforcing loop${loops.reinforcing === 1 ? '' : 's'}** here. These are self-sustaining cycles: they keep going even after whatever started them has passed.${strongest ? ` The tightest is ${strongest.labels.join(' → ')} → ${strongest.labels[0]}.` : ''}`,
    );
  } else {
    out.push(
      'No reinforcing loops were found. Worth asking whether anything here feeds back on itself, because feedback is often what makes a problem persist.',
    );
  }

  if (loops.balancing > 0) {
    out.push(
      `${loops.balancing} balancing loop${loops.balancing === 1 ? '' : 's'} found. These are self-correcting and often mark where the person already has some natural brake on the problem.`,
    );
  }

  const sources = cent.filter((c) => c.isSource);
  if (sources.length > 0) {
    out.push(
      `${sources.map((s) => `**${s.label}**`).join(', ')} influence${sources.length === 1 ? 's' : ''} others but nothing in the network influences ${sources.length === 1 ? 'it' : 'them'} back. Entry points like this are sometimes the most tractable place to start.`,
    );
  }

  const bestLeverage = leverage[0];
  if (bestLeverage && bestLeverage.benefit > 0) {
    const line = `Reducing **${bestLeverage.label}** has the widest modelled effect, reaching ${bestLeverage.reach} other node${bestLeverage.reach === 1 ? '' : 's'}.`;
    const caveat =
      bestLeverage.sideEffects.length > 0
        ? ` Note that it would also suppress ${bestLeverage.sideEffects.map((s) => s.label).join(', ')}, which ${bestLeverage.sideEffects.length === 1 ? 'is' : 'are'} tied to links you marked as helping.`
        : '';
    out.push(line + caveat);
  }

  const isolated = cent.filter((c) => c.isIsolated);
  if (isolated.length > 0) {
    out.push(
      `${isolated.map((s) => s.label).join(', ')} ${isolated.length === 1 ? 'is' : 'are'} not connected to anything yet.`,
    );
  }

  if (!leverage.every((l) => l.converged)) {
    out.push(
      'Some parts of this network amplify without limit when modelled, which usually means strong reinforcing loops with no dampening. Treat the leverage figures as indicative only.',
    );
  }

  out.push(
    '_These figures describe the map you drew, not the person. They are a structured way to look at your own thinking, not a prediction of what will happen._',
  );

  return out;
}
