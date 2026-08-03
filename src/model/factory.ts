import {
  SCHEMA_VERSION,
  weightOf,
  type PbtEdge,
  type PbtNetwork,
  type PbtNode,
  type Position,
  type Snapshot,
} from './types';
import type { EemmCategory, LinkValence, Strength } from './eemm';
import { deepClone } from './clone';

export function uid(prefix = ''): string {
  const rand =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
  return prefix ? `${prefix}_${rand}` : rand;
}

const now = () => new Date().toISOString();

export function createNode(opts: {
  label: string;
  category?: EemmCategory;
  position: Position;
  severity?: number;
  frequency?: number;
  notes?: string;
  trial?: import('./types').TrialState;
}): PbtNode {
  const t = now();
  return {
    id: uid('n'),
    label: opts.label.trim() || 'Untitled',
    category: opts.category ?? 'uncategorised',
    position: opts.position,
    severity: opts.severity,
    frequency: opts.frequency,
    notes: opts.notes,
    trial: opts.trial,
    createdAt: t,
    updatedAt: t,
  };
}

export function createEdge(
  source: string,
  target: string,
  direction: PbtEdge['direction'],
  strength: Strength,
  valence: LinkValence = 'neutral',
  notes?: string,
  trial?: import('./types').TrialState,
): PbtEdge {
  const t = now();
  return {
    id: uid('e'),
    source,
    target,
    direction,
    strength,
    valence,
    weight: weightOf(direction, strength),
    notes,
    trial,
    createdAt: t,
    updatedAt: t,
  };
}

/** Turn any signed number into the nearest valid direction + strength pair. */
export function fromWeight(w: number): { direction: PbtEdge['direction']; strength: Strength } {
  const direction: PbtEdge['direction'] = w < 0 ? 'decreases' : 'increases';
  const magnitude = Math.abs(w);
  // Anything on the old -10..10 scale collapses into three bands.
  const strength: Strength = magnitude >= 7 ? 3 : magnitude >= 4 ? 2 : magnitude >= 3 ? 3 : magnitude >= 2 ? 2 : 1;
  return { direction, strength: Math.min(3, Math.max(1, strength)) as Strength };
}

export function createNetwork(title = 'Untitled network'): PbtNetwork {
  const t = now();
  return {
    schemaVersion: SCHEMA_VERSION,
    id: uid('net'),
    meta: { title, createdAt: t, updatedAt: t },
    nodes: [],
    edges: [],
  };
}

export function createSnapshot(network: PbtNetwork, label: string): Snapshot {
  return {
    id: uid('snap'),
    networkId: network.id,
    label: label.trim() || new Date().toLocaleDateString(),
    takenAt: now(),
    network: deepClone(network),
  };
}

export function clampWeight(w: number): number {
  if (!Number.isFinite(w) || w === 0) return 1;
  return Math.min(3, Math.max(-3, Math.round(w)));
}

export function clampRating(r: number | undefined): number | undefined {
  if (r === undefined || !Number.isFinite(r)) return undefined;
  return Math.min(10, Math.max(0, Math.round(r)));
}
