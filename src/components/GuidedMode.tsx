import { useMemo, useState } from 'react';
import { useStore } from '../state/store';
import { buildGraph } from '../analysis/graph';
import { CATEGORY_META } from '../model/eemm';
import { findLoops } from '../analysis/loops';

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

interface Step {
  id: string;
  title: string;
  body: string;
  /** Returns null when satisfied, or a nudge when not. */
  check: (ctx: Ctx) => string | null;
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
    title: '1. Start with the context',
    body:
      'Use the Event / context button and add the situation this is about: what happened, where, with whom. It gets a rounded box, because it is not something the person is doing.\n\nStarting here is not a formality. In a functional assessment the same thought or action means different things in different situations, so the context is what makes everything after it interpretable.',
    check: (c) => (c.hasContext ? null : 'Add an event or context box to begin.'),
    done: (c) => c.hasContext,
  },
  {
    id: 'abc',
    title: '2. Add the response and what follows',
    body:
      'Now add what happens inside (a thought, feeling or urge) and what the person does or what results. Connect them in order, from the context onwards.\n\nThat is the three-term contingency, the unit a functional assessment is built from. Everything else grows out of it.',
    check: (c) =>
      c.nodeCount < 3
        ? 'Add two more boxes: the internal response, then what happens.'
        : c.edgeCount < 2
          ? 'Now connect them: context → internal response → what happens.'
          : null,
    done: (c) => c.nodeCount >= 3 && c.edgeCount >= 2,
  },
  {
    id: 'feedback',
    title: '3. Check whether it loops back',
    body:
      'Look at the end of your chain and ask: does that feed back into anything earlier? Poor sleep causes worry, but worry also causes poor sleep.\n\nFeedback is usually the answer to why a problem persists long after whatever started it has gone.',
    check: (c) => (c.hasLoop ? null : 'Nothing loops back yet. Does the consequence feed anything earlier?'),
    done: (c) => c.hasLoop,
  },
  {
    id: 'expand',
    title: '4. Add what else is involved',
    body:
      'What else is caught up in this? Add a node for anything affected by the consequence that also feeds back into the response.\n\nAmplifiers matter here. Fatigue is not just another problem, it makes everything else feel more threatening.',
    check: (c) => (c.nodeCount >= 4 ? null : 'Add at least one more element.'),
    done: (c) => c.nodeCount >= 4,
  },
  {
    id: 'protective',
    title: '5. Add what helps',
    body:
      'Not everything makes things worse. Add something that reduces one of these problems, draw it as a decreasing link, and mark that link as Helping.\n\nThis is often the part people skip, and it is where the intervention usually lives.',
    check: (c) =>
      !c.hasDecrease
        ? 'Add something that reduces one of these, drawn as a decreasing link.'
        : !c.hasHelpful
          ? 'Mark that link as Helping, so the map shows what is working.'
          : null,
    done: (c) => c.hasDecrease && c.hasHelpful,
  },
  {
    id: 'barriers',
    title: '6. Map what gets in the way',
    body:
      'Now the hard part. What stops the helpful thing from happening?\n\nThis is why "just exercise more" lands so badly. The person already knows it would help. Something in the system is suppressing it, and until that is visible the advice has nowhere to go.',
    check: (c) => (c.suppressedHelp ? null : 'Add a link that suppresses the thing that helps.'),
    done: (c) => c.suppressedHelp,
  },
];

export function GuidedMode({ onClose }: { onClose: () => void }) {
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
  const nudge = step.check(ctx);
  const satisfied = step.done(ctx);

  const go = (next: number) => {
    setIndex(next);
    log('guided.step', { step: STEPS[next]?.id, index: next });
  };

  return (
    <aside className="guided" aria-label="Guided build">
      <div className="guided-head">
        <span className="muted small">
          Step {index + 1} of {STEPS.length}
        </span>
        <button className="icon-btn" onClick={onClose} aria-label="Close guide">
          ✕
        </button>
      </div>

      <div className="guided-progress" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={STEPS.length}>
        {STEPS.map((s, i) => (
          <span key={s.id} className={`pip${i <= index ? ' on' : ''}${STEPS[i]!.done(ctx) ? ' complete' : ''}`} />
        ))}
      </div>

      <h3>{step.title}</h3>
      {step.body.split('\n\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}

      <div className={`guided-status ${satisfied ? 'ok' : 'todo'}`} role="status">
        {satisfied ? 'Done. Move on when you are ready.' : nudge}
      </div>

      <div className="guided-nav">
        <button className="btn" onClick={() => go(Math.max(0, index - 1))} disabled={index === 0}>
          Back
        </button>
        {index < STEPS.length - 1 ? (
          <button className="btn btn-primary" onClick={() => go(index + 1)}>
            Next
          </button>
        ) : (
          <button className="btn btn-primary" onClick={onClose}>
            Finish
          </button>
        )}
      </div>

      <p className="muted small">
        You can leave the guide at any point and keep everything you have built. The steps are a scaffold, not
        a form to complete.
      </p>
    </aside>
  );
}
