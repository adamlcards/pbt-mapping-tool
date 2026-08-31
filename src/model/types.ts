import { t } from '../i18n/strings';
import type { EemmCategory, LinkValence, Strength } from './eemm';

/**
 * Core data model.
 *
 * Design rules, because these are the decisions that are expensive to reverse:
 *
 * 1. Every persisted object carries `schemaVersion`. Migration is cheap when you
 *    plan for it and miserable when you do not.
 * 2. Node ratings (severity, frequency) exist from day one even though the UI
 *    treats them as optional. They are part of the standard PECAN protocol and
 *    retrofitting them would invalidate any data collected before they existed.
 * 3. Positions live on the node, not in a separate layout blob, so a network is
 *    always self-contained and shareable as a single JSON object.
 * 4. Context is an ordinary node with the Context category, not a special
 *    arrow-onto-an-arrow construct. That is how clinicians actually draw it and
 *    how the textbook figures show it, and it avoids claiming a mathematical
 *    precision the analysis could not honestly deliver.
 */

export const SCHEMA_VERSION = 3;

/**
 * proposed  - being considered, not yet tried. Drawn dashed.
 * adopted   - tried, it helped, now part of the picture. Drawn normally.
 * ruledOut  - tried, it did not help. Kept, but faded into the background.
 */
export const TRIAL_STATES = ['proposed', 'adopted', 'ruledOut'] as const;
export type TrialState = (typeof TRIAL_STATES)[number];

/** English names, for exports and tests. Users see `trialLabel()`. */
export const TRIAL_LABEL: Record<TrialState, string> = {
  proposed: 'Being considered',
  adopted: 'Tried, and it helped',
  ruledOut: 'Tried, it did not help',
};

export function trialLabel(state: TrialState): string {
  return t().trial[state];
}

export function trialHint(state: TrialState): string {
  return state === 'proposed'
    ? t().trial.proposedHint
    : state === 'adopted'
      ? t().trial.adoptedHint
      : t().trial.ruledOutHint;
}

export type NodeId = string;
export type EdgeId = string;

export interface Position {
  x: number;
  y: number;
}

export interface PbtNode {
  id: NodeId;
  label: string;
  category: EemmCategory;
  position: Position;
  /**
   * How severe / distressing this is, 0-10. Undefined means "not rated".
   * Deliberately distinct from 0, which means "rated, and not severe".
   */
  severity?: number;
  /** How often it occurs, 0-10. Same undefined-vs-zero distinction. */
  frequency?: number;
  /** Free text. Clinician notes, verbatim client language, hypotheses. */
  notes?: string;
  /**
   * Where this sits in a trial, if it is one at all.
   *
   * Undefined means it is simply part of the map: something the person is
   * already doing. Otherwise it is something being tested, and the state says
   * what happened. Recording the outcome rather than deleting a failed idea is
   * the point: what was tried and did not help is clinically informative, and
   * losing it means the same thing gets tried again in six months.
   */
  trial?: TrialState;
  /** When it was marked tested. */
  testedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * A directed influence.
 *
 * `direction` says whether the source pushes the target up or down, and is drawn
 * with a filled or open arrowhead exactly as the textbook figures do. `strength`
 * is one of three levels. `valence` records whether this link is helping the
 * person, and is the only thing that carries colour.
 *
 * `weight` is kept as a derived signed number (-3..+3) purely so that the
 * analysis engine and every CSV export keep working without special-casing.
 */
export interface PbtEdge {
  id: EdgeId;
  source: NodeId;
  target: NodeId;
  direction: 'increases' | 'decreases';
  strength: Strength;
  valence: LinkValence;
  /** Derived: strength with the direction's sign applied. Never set by hand. */
  weight: number;
  notes?: string;
  /** See PbtNode.trial. */
  trial?: TrialState;
  testedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export function weightOf(direction: PbtEdge['direction'], strength: Strength): number {
  return direction === 'decreases' ? -strength : strength;
}

export interface NetworkMeta {
  /** Human-readable name, e.g. "Intake, 3 August". */
  title: string;
  /** Optional free text about who or what this network describes. */
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PbtNetwork {
  schemaVersion: number;
  id: string;
  meta: NetworkMeta;
  nodes: PbtNode[];
  edges: PbtEdge[];
}

/**
 * A frozen copy of a network at a point in time. Used for pre/post comparison
 * and for test-retest reliability, which is the live methodological question in
 * the perceived-causal-network literature.
 */
export interface Snapshot {
  id: string;
  networkId: string;
  label: string;
  takenAt: string;
  network: PbtNetwork;
}

/**
 * Process data. Which order someone built their network in, what they revised,
 * and how long they hesitated is arguably more interesting than the final graph.
 * Captured always, but only *transmitted* in study mode.
 */
export type EventType =
  | 'node.create'
  | 'node.update'
  | 'node.delete'
  | 'node.move'
  | 'edge.create'
  | 'edge.update'
  | 'edge.delete'
  | 'network.clear'
  | 'network.import'
  | 'snapshot.take'
  | 'guided.step'
  | 'analysis.open';

export interface LogEvent {
  id: string;
  type: EventType;
  at: string;
  /** Milliseconds since the session began. Cheap proxy for deliberation time. */
  sinceStartMs: number;
  payload?: Record<string, unknown>;
}

