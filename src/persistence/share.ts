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
 * Compact representation, version 3.
 *
 * Version 1 carried every element's real id: a UUID, roughly 38 characters, and
 * each edge repeated two of them. A six-box map came out at nearly 3,000
 * characters, which technically works but is long enough that mail clients wrap
 * it and chat apps truncate it, so in practice shared links arrived broken.
 *
 * Version 2 identified nodes by array position and made the enums single
 * digits, which got that same map to about 800 characters. Measuring where
 * those 800 went was instructive: only 113 bytes were the labels themselves.
 * The rest was structure — and the single largest remaining item was the
 * category, spelled out in full ("biophysiological") once per node.
 *
 * Version 3 therefore stores the category as an index too, and drops trailing
 * nulls from each row, since most nodes carry no severity, frequency or trial
 * state. That alone takes the same map to 524 characters. The payload is then
 * DEFLATE-compressed (see encodeShare), which brings it to 316 — well under
 * half of what version 2 produced, and close to the floor set by the label
 * text itself.
 */
interface PackedV3 {
  f: 3;
  v: number;
  t: string;
  /** label, categoryIndex, x, y, severity?, frequency?, trial? — tail trimmed */
  n: (string | number | null)[][];
  /** sourceIndex, targetIndex, direction, strength, valence?, trial? — tail trimmed */
  e: (number | null)[][];
}

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

/**
 * A frozen snapshot of the category order, deliberately NOT imported from
 * model/eemm.
 *
 * Version 3 links store a category as its index in this list. If the list in
 * eemm.ts is ever reordered or has an entry inserted, every link shared before
 * that change would silently decode to the wrong categories — the map would
 * open looking plausible but wrong, which is worse than failing outright.
 * Keeping a separate copy here means such a change breaks the test below
 * instead of people's links. Append only; never reorder or remove.
 */
const SHARE_CATEGORIES = [
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
] as const;

const codeOf = <T extends string>(list: readonly T[], value: T | undefined): number | null =>
  value === undefined ? null : list.indexOf(value);
const valueOf = <T extends string>(list: readonly T[], code: number | null | undefined): T | undefined =>
  code === null || code === undefined || code < 0 ? undefined : list[code];

/** Drop trailing nulls, keeping at least `keep` entries. Most nodes have no
 *  severity, frequency or trial, so this is where a lot of the slack was. */
function trimTail<T>(row: T[], keep: number): T[] {
  const out = [...row];
  while (out.length > keep && (out[out.length - 1] === null || out[out.length - 1] === undefined)) out.pop();
  return out;
}

export function packNetwork(net: PbtNetwork): string {
  const index = new Map(net.nodes.map((n, i) => [n.id, i]));
  const packed: PackedV3 = {
    f: 3,
    v: net.schemaVersion,
    t: net.meta.title,
    n: net.nodes.map((n) =>
      trimTail(
        [
          n.label,
          Math.max(0, SHARE_CATEGORIES.indexOf(n.category as (typeof SHARE_CATEGORIES)[number])),
          Math.round(n.position.x),
          Math.round(n.position.y),
          n.severity ?? null,
          n.frequency ?? null,
          codeOf(TRIALS, n.trial),
        ],
        4,
      ),
    ),
    e: net.edges
      .filter((e) => index.has(e.source) && index.has(e.target))
      .map((e) =>
        trimTail(
          [
            index.get(e.source)!,
            index.get(e.target)!,
            DIRECTIONS.indexOf(e.direction),
            e.strength,
            VALENCES.indexOf(e.valence),
            codeOf(TRIALS, e.trial),
          ],
          4,
        ),
      ),
  };
  return toBase64Url(JSON.stringify(packed));
}

export function unpackNetwork(encoded: string): PbtNetwork | null {
  try {
    const packed = JSON.parse(fromBase64Url(encoded)) as PackedV3 | PackedV2 | PackedV1;
    if (!packed || !Array.isArray(packed.n)) return null;
    const now = new Date().toISOString();

    const raw =
      'f' in packed && packed.f === 3
        ? (() => {
            const p = packed as PackedV3;
            const ids = p.n.map((_, i) => `n${i}`);
            return {
              nodes: p.n.map((row, i) => {
                const [label, cat, x, y, severity, frequency, trial] = row;
                return {
                  id: ids[i],
                  label: label as string,
                  category: SHARE_CATEGORIES[(cat as number) ?? 0] ?? 'uncategorised',
                  position: { x: (x as number) ?? 0, y: (y as number) ?? 0 },
                  severity: (severity as number | null) ?? undefined,
                  frequency: (frequency as number | null) ?? undefined,
                  trial: valueOf(TRIALS, trial as number | null),
                };
              }),
              edges: p.e.map((row, i) => {
                const [source, target, direction, strength, valence, trial] = row;
                return {
                  id: `e${i}`,
                  source: ids[source as number],
                  target: ids[target as number],
                  direction: DIRECTIONS[(direction as number) ?? 0] ?? 'increases',
                  strength: (strength as number) ?? 2,
                  valence: VALENCES[(valence as number) ?? 0] ?? 'neutral',
                  trial: valueOf(TRIALS, trial as number | null),
                };
              }),
            };
          })()
        : 'f' in packed && packed.f === 2
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

/*
 * Compression.
 *
 * The packed JSON is highly repetitive — the same bracket-comma skeleton over
 * and over — which is exactly what DEFLATE is good at. CompressionStream is
 * built into the browser, so this costs nothing in bundle size.
 *
 * A compressed payload is marked with a leading 'z'. That is unambiguous
 * because every uncompressed payload is base64 of a string starting '{"',
 * which always begins 'ey'. Anything not starting with 'z' is therefore read
 * as before, so links shared before this change keep working untouched.
 *
 * Where CompressionStream is missing (older Safari, and any browser with it
 * disabled) both encode and decode fall back to the uncompressed form rather
 * than failing — a longer link still works, an unreadable one does not.
 */
const COMPRESSED_PREFIX = 'z';

async function deflate(text: string): Promise<string | null> {
  if (typeof CompressionStream === 'undefined') return null;
  try {
    const stream = new Blob([text]).stream().pipeThrough(new CompressionStream('deflate-raw'));
    const buffer = await new Response(stream).arrayBuffer();
    return bytesToBase64Url(new Uint8Array(buffer));
  } catch {
    return null;
  }
}

async function inflate(encoded: string): Promise<string | null> {
  if (typeof DecompressionStream === 'undefined') return null;
  try {
    const stream = new Blob([base64UrlToBytes(encoded)])
      .stream()
      .pipeThrough(new DecompressionStream('deflate-raw'));
    return await new Response(stream).text();
  } catch {
    return null;
  }
}

/** Pack and compress. Falls back to the plain packed form when smaller or when
 *  the browser has no CompressionStream. */
export async function encodeShare(net: PbtNetwork): Promise<string> {
  const plain = packNetwork(net);
  const compressed = await deflate(fromBase64Url(plain));
  // On a very small map the deflate header can cost more than it saves.
  return compressed && compressed.length + 1 < plain.length ? COMPRESSED_PREFIX + compressed : plain;
}

/** Read either form: compressed, or any of the three uncompressed versions. */
export async function decodeShare(encoded: string): Promise<PbtNetwork | null> {
  if (!encoded.startsWith(COMPRESSED_PREFIX)) return unpackNetwork(encoded);
  const json = await inflate(encoded.slice(1));
  if (json === null) return null;
  return unpackNetwork(toBase64Url(json));
}

export interface ShareLink {
  url: string;
  tooLong: boolean;
  length: number;
}

export async function buildShareLink(net: PbtNetwork): Promise<ShareLink> {
  const base = `${location.origin}${location.pathname}`;
  const url = `${base}#share=${await encodeShare(net)}`;
  return { url, tooLong: url.length > MAX_URL_LENGTH, length: url.length };
}

export async function readShareFromUrl(): Promise<PbtNetwork | null> {
  const hash = location.hash.startsWith('#') ? location.hash.slice(1) : location.hash;
  const params = new URLSearchParams(hash);
  const share = params.get('share');
  return share ? decodeShare(share) : null;
}

/** Base64url over UTF-8, so labels in any language survive the round trip. */
function toBase64Url(input: string): string {
  return bytesToBase64Url(new TextEncoder().encode(input));
}

function fromBase64Url(input: string): string {
  return new TextDecoder().decode(base64UrlToBytes(input));
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToBytes(input: string): Uint8Array<ArrayBuffer> {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4));
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
