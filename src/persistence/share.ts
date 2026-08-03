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

/** Minified representation: full keys would triple the URL length for nothing. */
interface Packed {
  v: number;
  t: string;
  n: [string, string, string, number, number, number | null, number | null, string | null][];
  e: [string, string, string, string, number, string, string | null][];
}

export function packNetwork(net: PbtNetwork): string {
  const packed: Packed = {
    v: net.schemaVersion,
    t: net.meta.title,
    n: net.nodes.map((n) => [
      n.id,
      n.label,
      n.category,
      Math.round(n.position.x),
      Math.round(n.position.y),
      n.severity ?? null,
      n.frequency ?? null,
      n.trial ?? null,
    ]),
    e: net.edges.map((e) => [e.id, e.source, e.target, e.direction, e.strength, e.valence, e.trial ?? null]),
  };
  return toBase64Url(JSON.stringify(packed));
}

export function unpackNetwork(encoded: string): PbtNetwork | null {
  try {
    const packed = JSON.parse(fromBase64Url(encoded)) as Packed;
    if (!packed || !Array.isArray(packed.n)) return null;
    const now = new Date().toISOString();
    const result = parseNetwork({
      schemaVersion: packed.v,
      meta: { title: packed.t || 'Shared network', createdAt: now },
      nodes: packed.n.map(([id, label, category, x, y, severity, frequency, trial]) => ({
        id,
        label,
        category,
        position: { x, y },
        severity: severity ?? undefined,
        frequency: frequency ?? undefined,
        trial: trial ?? undefined,
      })),
      edges: packed.e.map(([id, source, target, direction, strength, valence, trial]) => ({
        id,
        source,
        target,
        direction,
        strength,
        valence,
        trial: trial ?? undefined,
      })),
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
