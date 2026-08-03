import type { PbtNetwork } from '../model/types';
import { parseNetwork } from '../model/schema';

/**
 * Share links encode the whole network into the URL fragment.
 *
 * The fragment is deliberate: everything after '#' is never sent to the server
 * in an HTTP request, so a shared link carries clinical content past our
 * hosting without it ever touching a log. There is no server-side store, no
 * short-link service, and nothing to leak.
 *
 * The trade-off is length. Browsers handle roughly 32k characters comfortably,
 * which is far more than a realistic clinical network needs, but the limit is
 * checked and reported rather than producing a link that silently truncates.
 */

const MAX_URL_LENGTH = 30000;

/*
 * Compact representation, version 2.
 *
 * Version 1 carried every element's real id: a UUID, roughly 38 characters, and
 * each edge repeated two of them. A six-box map came out at nearly 3,000
 * characters, which technically works but is long enough that mail clients wrap
 * it and chat apps truncate it, so in practice shared links arrived broken.
 *
 * Here nodes are identified by their position in the array and edges refer to
 * them by integer, ids are regenerated on the way back in (nothing outside the
 * link refers to them), and the enums are single digits. The same map now fits
 * in about a fifth of the space.
 */
interface PackedV2 {
  /** Format version. Absent means the original format. */
  f: 2;
  v: number;
  t: string;
  /** label, category, x, y, severity, frequency, trial */
  n: [string, string, number, number, number | null, number | null, number | null][];
  /** sourceIndex, targetIndex, direction, strength, valence, trial */
  e: [number, number, number, number, number, number | null][];
}

/** The original format, still read so that links shared earlier keep working. */
interface PackedV1 {
  v: number;
  t: string;
  n: [string, string, string, number, number, number | null, number | null, string | null][];
  e: [string, string, string, string, number, string, string | null][];
}

const DIRECTIONS = ['increases', 'decreases'] as const;
const VALENCES = ['neutral', 'helpful', 'unhelpful'] as const;
const TRIALS = ['proposed', 'adopted', 'ruledOut'] as const;

const codeOf = <T extends string>(list: readonly T[], value: T | undefined): number | null =>
  value === undefined ? null : list.indexOf(value);
const valueOf = <T extends string>(list: readonly T[], code: number | null | undefined): T | undefined =>
  code === null || code === undefined || code < 0 ? undefined : list[code];

export function packNetwork(net: PbtNetwork): string {
  const index = new Map(net.nodes.map((n, i) => [n.id, i]));
  const packed: PackedV2 = {
    f: 2,
    v: net.schemaVersion,
    t: net.meta.title,
    n: net.nodes.map((n) => [
      n.label,
      n.category,
      Math.round(n.position.x),
      Math.round(n.position.y),
      n.severity ?? null,
      n.frequency ?? null,
      codeOf(TRIALS, n.trial),
    ]),
    e: net.edges
      .filter((e) => index.has(e.source) && index.has(e.target))
      .map((e) => [
        index.get(e.source)!,
        index.get(e.target)!,
        DIRECTIONS.indexOf(e.direction),
        e.strength,
        VALENCES.indexOf(e.valence),
        codeOf(TRIALS, e.trial),
      ]),
  };
  return toBase64Url(JSON.stringify(packed));
}

export function unpackNetwork(encoded: string): PbtNetwork | null {
  try {
    const packed = JSON.parse(fromBase64Url(encoded)) as PackedV2 | PackedV1;
    if (!packed || !Array.isArray(packed.n)) return null;
    const now = new Date().toISOString();

    const raw =
      'f' in packed && packed.f === 2
        ? (() => {
            const p = packed as PackedV2;
            const ids = p.n.map((_, i) => `n${i}`);
            return {
              nodes: p.n.map(([label, category, x, y, severity, frequency, trial], i) => ({
                id: ids[i],
                label,
                category,
                position: { x, y },
                severity: severity ?? undefined,
                frequency: frequency ?? undefined,
                trial: valueOf(TRIALS, trial),
              })),
              edges: p.e.map(([source, target, direction, strength, valence, trial], i) => ({
                id: `e${i}`,
                source: ids[source],
                target: ids[target],
                direction: DIRECTIONS[direction] ?? 'increases',
                strength,
                valence: VALENCES[valence] ?? 'neutral',
                trial: valueOf(TRIALS, trial),
              })),
            };
          })()
        : (() => {
            const p = packed as PackedV1;
            return {
              nodes: p.n.map(([id, label, category, x, y, severity, frequency, trial]) => ({
                id,
                label,
                category,
                position: { x, y },
                severity: severity ?? undefined,
                frequency: frequency ?? undefined,
                trial: trial ?? undefined,
              })),
              edges: p.e.map(([id, source, target, direction, strength, valence, trial]) => ({
                id,
                source,
                target,
                direction,
                strength,
                valence,
                trial: trial ?? undefined,
              })),
            };
          })();

    const result = parseNetwork({
      schemaVersion: packed.v,
      meta: { title: packed.t || 'Shared map', createdAt: now },
      ...raw,
    });
    return result.ok ? result.network! : null;
  } catch {
    return null;
  }
}

export interface ShareLink {
  url: string;
  tooLong: boolean;
  length: number;
}

export function buildShareLink(net: PbtNetwork): ShareLink {
  const base = `${location.origin}${location.pathname}`;
  const url = `${base}#share=${packNetwork(net)}`;
  return { url, tooLong: url.length > MAX_URL_LENGTH, length: url.length };
}

export function readShareFromUrl(): PbtNetwork | null {
  const hash = location.hash.startsWith('#') ? location.hash.slice(1) : location.hash;
  const params = new URLSearchParams(hash);
  const share = params.get('share');
  return share ? unpackNetwork(share) : null;
}

/** Base64url over UTF-8, so labels in any language survive the round trip. */
function toBase64Url(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(input: string): string {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
