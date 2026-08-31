import { useMemo, useState } from 'react';
import { useStore } from '../state/store';
import { buildGraph } from '../analysis/graph';
import { CATEGORY_META } from '../model/eemm';
import { findLoops } from '../analysis/loops';
import { fmt, type Strings } from '../i18n/strings';
import { useStrings } from '../i18n';

/**
 * Guided build.
 *
 * The evidence in this literature is that *structured guidance* is what turned
 * perceived causal networks from a nice idea into something with usable
 * reliability. A blank canvas is not neutral, it quietly asks the person to hold
 * the whole method in their head. These five steps follow the same progression
 * as the published tutorial, and each one checks the network rather than just
 * asserting the step is done, so the guide responds to what the person actually
 * built.
 */

/**
 * A step holds *which* strings it uses, not the strings themselves, so the
 * guide follows a language change like everything else. The check functions
 * take the catalogue rather than closing over one, for the same reason.
 */
interface Step {
  id: string;
  title: (t: Strings) => string;
  body: (t: Strings) => string;
  /** Returns null when satisfied, or a nudge when not. */
  check: (ctx: Ctx, t: Strings) => string | null;
  done: (ctx: Ctx) => boolean;
}

interface Ctx {
  hasContext: boolean;
  nodeCount: number;
  edgeCount: number;
  hasLoop: boolean;
  hasDecrease: boolean;
  hasHelpful: boolean;
  suppressedHelp: boolean;
}

const STEPS: Step[] = [
  {
    id: 'context',
    title: (t) => t.guided.step1Title,
    body: (t) => t.guided.step1Body,
    check: (c, t) => (c.hasContext ? null : t.guided.step1Nudge),
    done: (c) => c.hasContext,
  },
  {
    id: 'abc',
    title: (t) => t.guided.step2Title,
    body: (t) => t.guided.step2Body,
    check: (c, t) =>
      c.nodeCount < 3 ? t.guided.step2NudgeNodes : c.edgeCount < 2 ? t.guided.step2NudgeEdges : null,
    done: (c) => c.nodeCount >= 3 && c.edgeCount >= 2,
  },
  {
    id: 'feedback',
    title: (t) => t.guided.step3Title,
    body: (t) => t.guided.step3Body,
    check: (c, t) => (c.hasLoop ? null : t.guided.step3Nudge),
    done: (c) => c.hasLoop,
  },
  {
    id: 'expand',
    title: (t) => t.guided.step4Title,
    body: (t) => t.guided.step4Body,
    check: (c, t) => (c.nodeCount >= 4 ? null : t.guided.step4Nudge),
    done: (c) => c.nodeCount >= 4,
  },
  {
    id: 'protective',
    title: (t) => t.guided.step5Title,
    body: (t) => t.guided.step5Body,
    check: (c, t) =>
      !c.hasDecrease ? t.guided.step5NudgeDecrease : !c.hasHelpful ? t.guided.step5NudgeHelpful : null,
    done: (c) => c.hasDecrease && c.hasHelpful,
  },
  {
    id: 'barriers',
    title: (t) => t.guided.step6Title,
    body: (t) => t.guided.step6Body,
    check: (c, t) => (c.suppressedHelp ? null : t.guided.step6Nudge),
    done: (c) => c.suppressedHelp,
  },
];

export function GuidedMode({ onClose }: { onClose: () => void }) {
  const t = useStrings();
  const network = useStore((s) => s.network);
  const log = useStore((s) => s.log);
  const [index, setIndex] = useState(0);

  const ctx = useMemo<Ctx>(() => {
    const g = buildGraph(network);
    // Whatever is on the giving end of a link marked as helping is the thing
    // that is working; step 5 asks what gets in its way.
    const protective = new Set(network.edges.filter((e) => e.valence === 'helpful').map((e) => e.source));
    return {
      hasContext: network.nodes.some((n) => CATEGORY_META[n.category].isContext),
      nodeCount: network.nodes.length,
      edgeCount: network.edges.length,
      hasLoop: findLoops(g, { maxLoops: 1 }).loops.length > 0,
      hasDecrease: network.edges.some((e) => e.direction === 'decreases'),
      hasHelpful: network.edges.some((e) => e.valence === 'helpful'),
      suppressedHelp: network.edges.some((e) => e.direction === 'decreases' && protective.has(e.target)),
    };
  }, [network]);

  const step = STEPS[index]!;
  const nudge = step.check(ctx, t);
  const satisfied = step.done(ctx);

  const go = (next: number) => {
    setIndex(next);
    log('guided.step', { step: STEPS[next]?.id, index: next });
  };

  return (
    <aside className="guided" aria-label={t.guided.ariaLabel}>
      <div className="guided-head">
        <span className="muted small">
          {fmt(t.guided.stepOf, { current: index + 1, total: STEPS.length })}
        </span>
        <button className="icon-btn" onClick={onClose} aria-label={t.tooltip.closeGuide}>
          ✕
        </button>
      </div>

      <div className="guided-progress" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={STEPS.length}>
        {STEPS.map((s, i) => (
          <span key={s.id} className={`pip${i <= index ? ' on' : ''}${STEPS[i]!.done(ctx) ? ' complete' : ''}`} />
        ))}
      </div>

      <h3>{step.title(t)}</h3>
      {step
        .body(t)
        .split('\n\n')
        .map((para, i) => (
          <p key={i}>{para}</p>
        ))}

      <div className={`guided-status ${satisfied ? 'ok' : 'todo'}`} role="status">
        {satisfied ? t.guided.done : nudge}
      </div>

      <div className="guided-nav">
        <button className="btn" onClick={() => go(Math.max(0, index - 1))} disabled={index === 0}>
          {t.action.back}
        </button>
        {index < STEPS.length - 1 ? (
          <button className="btn btn-primary" onClick={() => go(index + 1)}>
            {t.action.next}
          </button>
        ) : (
          <button className="btn btn-primary" onClick={onClose}>
            {t.action.finish}
          </button>
        )}
      </div>

      <p className="muted small">{t.guided.footer}</p>
    </aside>
  );
}
