import type { LogEvent, PbtNetwork } from '../model/types';

/**
 * Research instrumentation.
 *
 * Off unless a participant id is present in the URL, and the endpoint is a build
 * flag rather than a hardcoded address, so the public deployment has no server
 * to talk to at all. That separation is the point: the free clinical tool and
 * the study deployment share a codebase but not a data path.
 *
 * Set VITE_STUDY_ENDPOINT at build time to enable transmission.
 */

const ENDPOINT = (import.meta.env.VITE_STUDY_ENDPOINT as string | undefined) ?? '';

export interface StudyContext {
  active: boolean;
  participantId: string | null;
  /** Which timepoint this is, for test-retest designs. */
  wave: string | null;
  endpoint: string;
}

export function readStudyContext(): StudyContext {
  const params = new URLSearchParams(location.search);
  const pid = params.get('pid') ?? params.get('sona_id');
  const wave = params.get('wave');
  return {
    active: Boolean(pid && ENDPOINT),
    participantId: pid,
    wave,
    endpoint: ENDPOINT,
  };
}

interface SyncPayload {
  participantId: string;
  wave: string | null;
  network: PbtNetwork;
  events: LogEvent[];
  clientTime: string;
  userAgent: string;
}

/**
 * Fire-and-forget save. Failures are surfaced to the caller but never block the
 * participant, because a network hiccup must not cost someone their session.
 * Local IndexedDB remains the source of truth until a save is acknowledged.
 */
export async function syncToServer(
  ctx: StudyContext,
  network: PbtNetwork,
  events: LogEvent[],
): Promise<{ ok: boolean; error?: string }> {
  if (!ctx.active || !ctx.participantId) return { ok: false, error: 'Study mode is not active.' };

  const payload: SyncPayload = {
    participantId: ctx.participantId,
    wave: ctx.wave,
    network,
    events,
    clientTime: new Date().toISOString(),
    userAgent: navigator.userAgent,
  };

  try {
    const res = await fetch(`${ctx.endpoint.replace(/\/$/, '')}/networks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    if (!res.ok) return { ok: false, error: `Server responded ${res.status}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Network error' };
  }
}

/**
 * Last-gasp save when the tab is closing. `sendBeacon` is the only thing
 * browsers reliably allow at that point.
 */
export function flushOnUnload(ctx: StudyContext, network: PbtNetwork, events: LogEvent[]): void {
  if (!ctx.active || !ctx.participantId) return;
  const blob = new Blob(
    [
      JSON.stringify({
        participantId: ctx.participantId,
        wave: ctx.wave,
        network,
        events,
        clientTime: new Date().toISOString(),
        userAgent: navigator.userAgent,
      }),
    ],
    { type: 'application/json' },
  );
  navigator.sendBeacon?.(`${ctx.endpoint.replace(/\/$/, '')}/networks`, blob);
}
