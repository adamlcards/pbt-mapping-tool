import { EEMM_CATEGORIES, LINK_VALENCES } from './eemm';
import type { LinkValence, Strength } from './eemm';
import { SCHEMA_VERSION, type PbtNetwork } from './types';
import { clampRating, fromWeight, uid } from './factory';
import { TRIAL_STATES, weightOf } from './types';
import type { TrialState } from './types';

/**
 * Import is the most dangerous surface in the app: arbitrary JSON from a file
 * the user was handed. Everything is validated and coerced rather than trusted,
 * and anything unsalvageable is dropped with a reason the user can read.
 *
 * Also handles migration from older schema versions and from PLAN's export
 * format, so nobody has to abandon work they already did elsewhere.
 */

export interface ParseResult {
  ok: boolean;
  network?: PbtNetwork;
  warnings: string[];
  error?: string;
}

type Unknown = Record<string, unknown>;

/** Accepts the current `trial` field, or a v2 file's `proposed: true`. */
function readTrial(o: Record<string, unknown>): TrialState | undefined {
  if (typeof o.trial === 'string' && (TRIAL_STATES as readonly string[]).includes(o.trial)) {
    return o.trial as TrialState;
  }
  return o.proposed === true ? 'proposed' : undefined;
}

const isObj = (v: unknown): v is Unknown => typeof v === 'object' && v !== null && !Array.isArray(v);
const asStr = (v: unknown, fallback = ''): string => (typeof v === 'string' ? v : fallback);
const asNum = (v: unknown): number | undefined => (typeof v === 'number' && Number.isFinite(v) ? v : undefined);

export function parseNetwork(raw: unknown): ParseResult {
  const warnings: string[] = [];
  if (!isObj(raw)) return { ok: false, warnings, error: 'File does not contain a network object.' };

  // Detect and convert a PLAN-style export before doing anything else.
  const source = looksLikePlanExport(raw) ? convertFromPlan(raw, warnings) : raw;
  if (!isObj(source)) return { ok: false, warnings, error: 'Could not interpret this file.' };

  const version = asNum(source.schemaVersion) ?? 0;
  if (version > SCHEMA_VERSION) {
    warnings.push(
      `This file was made with a newer version of the tool (schema ${version}). Some information may be ignored.`,
    );
  }

  const nowIso = new Date().toISOString();
  const rawNodes = Array.isArray(source.nodes) ? source.nodes : [];
  const rawEdges = Array.isArray(source.edges) ? source.edges : [];
  const rawMods = Array.isArray(source.moderators) ? source.moderators : [];

  if (rawNodes.length === 0) return { ok: false, warnings, error: 'No nodes found in this file.' };

  const nodes: PbtNetwork['nodes'] = [];
  const seenIds = new Set<string>();

  for (const n of rawNodes) {
    if (!isObj(n)) continue;
    let id = asStr(n.id) || uid('n');
    if (seenIds.has(id)) {
      warnings.push(`Duplicate node id "${id}" was renamed.`);
      id = uid('n');
    }
    seenIds.add(id);

    const category = EEMM_CATEGORIES.includes(n.category as never)
      ? (n.category as PbtNetwork['nodes'][number]['category'])
      : 'uncategorised';
    const pos = isObj(n.position) ? n.position : {};
    nodes.push({
      id,
      label: asStr(n.label, 'Untitled').slice(0, 200),
      category,
      position: { x: asNum(pos.x) ?? Math.random() * 600, y: asNum(pos.y) ?? Math.random() * 400 },
      severity: clampRating(asNum(n.severity)),
      frequency: clampRating(asNum(n.frequency)),
      notes: typeof n.notes === 'string' ? n.notes.slice(0, 5000) : undefined,
      trial: readTrial(n),
      testedAt: typeof n.testedAt === 'string' ? n.testedAt : undefined,
      createdAt: asStr(n.createdAt, nowIso),
      updatedAt: asStr(n.updatedAt, nowIso),
    });
  }

  const nodeIds = new Set(nodes.map((n) => n.id));
  const edges: PbtNetwork['edges'] = [];
  const edgeIds = new Set<string>();
  let droppedEdges = 0;

  for (const e of rawEdges) {
    if (!isObj(e)) continue;
    const src = asStr(e.source);
    const tgt = asStr(e.target);
    // A dangling edge would crash every graph algorithm downstream. Drop it.
    if (!nodeIds.has(src) || !nodeIds.has(tgt)) {
      droppedEdges++;
      continue;
    }
    let id = asStr(e.id) || uid('e');
    if (edgeIds.has(id)) id = uid('e');
    edgeIds.add(id);
    // Accept either the current shape or a v1 file carrying a -10..+10 weight,
    // so nobody has to abandon a network they already drew.
    const explicitDirection = e.direction === 'decreases' ? 'decreases' : e.direction === 'increases' ? 'increases' : null;
    const explicitStrength = asNum(e.strength);
    const derived = fromWeight(asNum(e.weight) ?? 1);
    const direction = explicitDirection ?? derived.direction;
    const strength = (
      explicitStrength !== undefined && explicitStrength >= 1 && explicitStrength <= 3
        ? Math.round(explicitStrength)
        : derived.strength
    ) as Strength;
    const valence: LinkValence = LINK_VALENCES.includes(e.valence as never)
      ? (e.valence as LinkValence)
      : 'neutral';

    edges.push({
      id,
      source: src,
      target: tgt,
      direction,
      strength,
      valence,
      weight: weightOf(direction, strength),
      notes: typeof e.notes === 'string' ? e.notes.slice(0, 5000) : undefined,
      trial: readTrial(e),
      testedAt: typeof e.testedAt === 'string' ? e.testedAt : undefined,
      createdAt: asStr(e.createdAt, nowIso),
      updatedAt: asStr(e.updatedAt, nowIso),
    });
  }
  if (droppedEdges > 0) {
    warnings.push(`${droppedEdges} connection(s) referred to missing nodes and were removed.`);
  }

  if (Array.isArray(rawMods) && rawMods.length > 0) {
    warnings.push(
      `${rawMods.length} moderator(s) could not be brought across. Moderation is now expressed as an ordinary Context node, so add one where it mattered.`,
    );
  }

  const meta = isObj(source.meta) ? source.meta : {};
  return {
    ok: true,
    warnings,
    network: {
      schemaVersion: SCHEMA_VERSION,
      id: asStr(source.id) || uid('net'),
      meta: {
        title: asStr(meta.title, 'Imported network'),
        description: typeof meta.description === 'string' ? meta.description : undefined,
        createdAt: asStr(meta.createdAt, nowIso),
        updatedAt: nowIso,
      },
      nodes,
      edges,
    },
  };
}

/**
 * PLAN exports a flat structure with nodes carrying x/y directly and edges
 * using `from`/`to` plus a `value`. Recognise it so existing users can bring
 * their work across instead of starting again.
 */
function looksLikePlanExport(raw: Unknown): boolean {
  if (raw.schemaVersion !== undefined) return false;
  const nodes = raw.nodes;
  if (!Array.isArray(nodes) || nodes.length === 0) return false;
  const first = nodes[0];
  if (!isObj(first)) return false;
  return 'x' in first || 'y' in first || 'name' in first;
}

function convertFromPlan(raw: Unknown, warnings: string[]): Unknown {
  warnings.push('This looks like a PLAN export. Converting it across.');
  const planCategoryMap: Record<string, string> = {
    affect: 'affect',
    attention: 'attention',
    biology: 'biophysiological',
    cognition: 'cognition',
    context: 'context',
    motivation: 'motivation',
    'overt behavior': 'overtBehaviour',
    'overt behaviour': 'overtBehaviour',
    self: 'self',
    social: 'sociocultural',
  };

  const nodes = (raw.nodes as unknown[]).map((n) => {
    const o = isObj(n) ? n : {};
    const cat = asStr(o.category ?? o.group).toLowerCase();
    return {
      id: asStr(o.id) || uid('n'),
      label: asStr(o.label ?? o.name, 'Untitled'),
      category: planCategoryMap[cat] ?? 'uncategorised',
      position: { x: asNum(o.x) ?? asNum((o.position as Unknown)?.x) ?? 0, y: asNum(o.y) ?? asNum((o.position as Unknown)?.y) ?? 0 },
    };
  });

  const rawEdges = Array.isArray(raw.edges) ? raw.edges : Array.isArray(raw.links) ? raw.links : [];
  const edges = rawEdges.map((e) => {
    const o = isObj(e) ? e : {};
    return {
      id: asStr(o.id) || uid('e'),
      source: asStr(o.source ?? o.from),
      target: asStr(o.target ?? o.to),
      weight: asNum(o.weight ?? o.value ?? o.strength) ?? 0,
    };
  });

  return { schemaVersion: 0, meta: { title: 'Imported from PLAN' }, nodes, edges };
}
