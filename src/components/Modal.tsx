import { useEffect, useRef, type ReactNode } from 'react';

interface Props {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}

/**
 * Shared dialog with a real focus trap.
 *
 * Most hand-rolled modals let Tab escape into the page behind them, which makes
 * the app unusable with a keyboard or a screen reader. Doing it once here means
 * every dialog in the tool gets it right.
 */
export function Modal({ title, onClose, children, footer, wide }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

  /*
   * onClose is almost always written inline at the call site, so its identity
   * changes on every render. Depending on it here meant this effect tore down
   * and re-ran constantly: each pass restored focus to the previous element and
   * then moved it back into the dialog. Opening a dialog from anything that
   * tracks focus (the List view rows do) turned that into a focus ping-pong and
   * an infinite render loop that froze the tab. The ref keeps the handler
   * current while the effect stays mounted exactly once.
   */
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    // querySelector returns the first match in *document* order, not in the
    // order the selectors are listed, so this used to land on the close button
    // in the header and you had to click into the field before typing.
    const body = ref.current?.querySelector('.modal-body');
    const field = body?.querySelector<HTMLElement>('input:not([type="radio"]):not([type="range"]), textarea');
    const fallback = ref.current?.querySelector<HTMLElement>(
      'input, select, textarea, button, [href], [tabindex]:not([tabindex="-1"])',
    );
    const target = field ?? fallback;
    target?.focus();
    if (target instanceof HTMLInputElement) target.select();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;
      const focusable = [
        ...ref.current.querySelectorAll<HTMLElement>(
          'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const firstEl = focusable[0]!;
      const lastEl = focusable[focusable.length - 1]!;
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      (previouslyFocused.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className={`modal${wide ? ' modal-wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={ref}
      >
        <header className="modal-head">
          <h2>{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </header>
        <div className="modal-body">{children}</div>
        {footer && <footer className="modal-foot">{footer}</footer>}
      </div>
    </div>
  );
}
