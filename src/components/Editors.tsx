import { useState } from 'react';
import { Modal } from './Modal';
import {
  LINK_VALENCES,
  STRENGTHS,
  categoriesByGroup,
  categoryHint,
  categoryLabel,
  strengthLabel,
  valenceLabelOf,
  type EemmCategory,
  type LinkValence,
  type Strength,
} from '../model/eemm';
import type { PbtEdge, PbtNode } from '../model/types';
import { fmt } from '../i18n/strings';
import { useStrings } from '../i18n';

interface NodeEditorProps {
  initial?: Partial<PbtNode>;
  title: string;
  onCancel: () => void;
  onSave: (v: {
    label: string;
    category: EemmCategory;
    severity: number | undefined;
    frequency: number | undefined;
    notes: string;
  }) => void;
}

/**
 * Name and category, and nothing else on the first screen.
 *
 * The severity and frequency ratings come from the perceived-causal-network
 * protocol, not from the textbook. They are useful for research comparability
 * and they are two more sliders on every single node, so they live behind a
 * disclosure instead of setting the pace of the whole session.
 */
export function NodeEditor({ initial, title, onCancel, onSave }: NodeEditorProps) {
  const t = useStrings();
  const [label, setLabel] = useState(initial?.label ?? '');
  const [category, setCategory] = useState<EemmCategory>(initial?.category ?? 'uncategorised');
  const [severity, setSeverity] = useState<number | undefined>(initial?.severity);
  const [frequency, setFrequency] = useState<number | undefined>(initial?.frequency);
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [advanced, setAdvanced] = useState(false);

  const submit = () => {
    if (!label.trim()) return;
    onSave({ label: label.trim(), category, severity, frequency, notes });
  };

  return (
    <Modal
      title={title}
      onClose={onCancel}
      footer={
        <>
          <button className="btn" onClick={onCancel}>
            {t.action.cancel}
          </button>
          <button className="btn btn-primary" onClick={submit} disabled={!label.trim()}>
            {t.action.add}
          </button>
        </>
      }
    >
      <label className="field">
        <span>{t.nodeEditor.name}</span>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder={t.nodeEditor.namePlaceholder}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          maxLength={120}
        />
      </label>

      <fieldset className="field">
        <legend>{t.nodeEditor.category}</legend>
        <div className="cat-grid">
          {categoriesByGroup().map((group) => (
            <div key={group.group} className="cat-group">
              <span className="cat-group-title">{group.group}</span>
              <div className="cat-row">
                {group.items.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`cat-btn${category === c.id ? ' active' : ''}${c.isContext ? ' rounded' : ''}`}
                    style={{ background: c.colour, borderColor: c.border }}
                    onClick={() => setCategory(c.id)}
                    aria-pressed={category === c.id}
                  >
                    {categoryLabel(c.id)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <small>{categoryHint(category)}</small>
      </fieldset>

      <button type="button" className="disclosure" onClick={() => setAdvanced(!advanced)}>
        {advanced ? '▾' : '▸'} {t.nodeEditor.ratingsDisclosure}
      </button>

      {advanced && (
        <div className="advanced">
          <small className="muted">{t.nodeEditor.ratingsNote}</small>
          <Rating label={t.nodeEditor.severity} value={severity} onChange={setSeverity} />
          <Rating label={t.nodeEditor.frequency} value={frequency} onChange={setFrequency} />
          <label className="field">
            <span>{t.nodeEditor.notes}</span>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={2000} />
          </label>
        </div>
      )}
    </Modal>
  );
}

function Rating({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | undefined;
  onChange: (v: number | undefined) => void;
}) {
  const t = useStrings();
  return (
    <label className="field">
      <span>{label}</span>
      <div className="rating-row">
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={value === undefined}
          aria-valuetext={value === undefined ? t.nodeEditor.notRated : String(value)}
        />
        <output>{value === undefined ? '—' : value}</output>
        <button type="button" className="btn btn-small" onClick={() => onChange(value === undefined ? 5 : undefined)}>
          {value === undefined ? t.nodeEditor.rate : t.nodeEditor.clearRating}
        </button>
      </div>
    </label>
  );
}

interface EdgeEditorProps {
  sourceLabel: string;
  targetLabel: string;
  initial?: Pick<PbtEdge, 'direction' | 'strength' | 'valence'>;
  /** The other direction, when these two boxes already influence each other. */
  alternate?: { id: string; sourceLabel: string; targetLabel: string };
  onSwitchTo?: (id: string) => void;
  onDelete?: () => void;
  onCancel: () => void;
  onSave: (v: { direction: PbtEdge['direction']; strength: Strength; valence: LinkValence }) => void;
}

/**
 * Direction and strength in a single click.
 *
 * Six buttons in two rows means the common case, "this makes that worse, a lot",
 * is one tap rather than dragging a slider and reading a number off it. The
 * helping/not-helping row is optional and can be left alone.
 */
export function EdgeEditor({ sourceLabel, targetLabel, initial, alternate, onSwitchTo, onDelete, onCancel, onSave }: EdgeEditorProps) {
  const t = useStrings();
  const [direction, setDirection] = useState<PbtEdge['direction']>(initial?.direction ?? 'increases');
  const [strength, setStrength] = useState<Strength | null>(initial?.strength ?? null);
  const [valence, setValence] = useState<LinkValence>(initial?.valence ?? 'neutral');
  const [showValence, setShowValence] = useState((initial?.valence ?? 'neutral') !== 'neutral');

  const choose = (d: PbtEdge['direction'], s: Strength) => {
    setDirection(d);
    setStrength(s);
  };

  return (
    <Modal
      title={t.edgeEditor.title}
      onClose={onCancel}
      footer={
        <>
          {onDelete && (
            <button className="btn btn-danger btn-small" onClick={onDelete}>
              {t.edgeEditor.removeLink}
            </button>
          )}
          <span className="spacer" />
          <button className="btn" onClick={onCancel}>
            {t.action.cancel}
          </button>
          <button
            className="btn btn-primary"
            disabled={strength === null}
            onClick={() => strength !== null && onSave({ direction, strength, valence })}
          >
            {initial ? t.action.update : t.edgeEditor.addLink}
          </button>
        </>
      }
    >
      {/* Reading the relationship back as a sentence is what stops people
          drawing the arrow the wrong way round, which is the most common error
          in network mapping. */}
      {/* Built from a whole-sentence template rather than concatenated pieces:
          languages put the verb in different places, and gluing subject + verb
          + object in English order produces nonsense in several of them. */}
      <p
        className="sentence"
        dangerouslySetInnerHTML={{
          __html: fmt(
            direction === 'increases' ? t.edgeEditor.sentenceIncreases : t.edgeEditor.sentenceDecreases,
            { source: `<strong>${escapeHtml(sourceLabel)}</strong>`, target: `<strong>${escapeHtml(targetLabel)}</strong>` },
          ),
        }}
      />

      {(['increases', 'decreases'] as const).map((d) => (
        <div key={d} className="strength-block">
          <span className="strength-label">
            <ArrowGlyph filled={d === 'increases'} />{' '}
            {d === 'increases' ? t.edgeEditor.increasesIt : t.edgeEditor.decreasesIt}
          </span>
          <div className="strength-row">
            {STRENGTHS.map((s) => (
              <button
                key={s}
                type="button"
                className={`strength-btn${direction === d && strength === s ? ' active' : ''}`}
                onClick={() => choose(d, s)}
                aria-pressed={direction === d && strength === s}
              >
                <span className={`bar bar-${s}`} aria-hidden="true" />
                {strengthLabel(s)}
              </button>
            ))}
          </div>
        </div>
      ))}

      {alternate && onSwitchTo && (
        <p className="alt-direction">
          {t.edgeEditor.altDirection}{' '}
          <button
            type="button"
            className="linkish"
            onClick={() => {
              // Switching direction used to silently drop whatever was picked
              // here without a click on Update — the dialog would jump to the
              // other direction and this one's change just vanished, with no
              // warning. Reported live as "both ends up the same value": one
              // direction was set, switched away from before saving, and its
              // pending choice never actually landed. Saving here first, the
              // same thing Update itself would do, means the switch behaves
              // like a normal save-and-continue instead of a silent discard.
              if (strength !== null) onSave({ direction, strength, valence });
              onSwitchTo(alternate.id);
            }}
          >
            {fmt(t.edgeEditor.editAlt, { source: alternate.sourceLabel, target: alternate.targetLabel })}
          </button>
        </p>
      )}

      {/*
        Collapsed by default. This is the only thing that tells the analysis what
        counts as an improvement, so it earns its place, but most links do not
        need it and it should not slow down drawing.
      */}
      <button type="button" className="disclosure" onClick={() => setShowValence(!showValence)}>
        {showValence ? '▾' : '▸'} {t.edgeEditor.helpingDisclosure}{' '}
        {valence !== 'neutral' && `(${valenceLabelOf(valence)})`}
      </button>

      {showValence && (
        <fieldset className="field advanced">
          <div className="radio-row">
            {LINK_VALENCES.map((v) => (
              <label key={v} className="radio">
                <input type="radio" name="valence" checked={valence === v} onChange={() => setValence(v)} />
                <span>{valenceLabelOf(v)}</span>
              </label>
            ))}
          </div>
          <small>{t.edgeEditor.helpingNote}</small>
        </fieldset>
      )}
    </Modal>
  );
}

/** Node labels are user text and go into the sentence template as markup. */
function escapeHtml(value: string): string {
  return value.replace(
    /[<>&"']/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
}

function ArrowGlyph({ filled }: { filled: boolean }) {
  return (
    <svg width="26" height="10" viewBox="0 0 26 10" aria-hidden="true" style={{ verticalAlign: 'middle' }}>
      <line x1="0" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M 16 0.8 L 25 5 L 16 9.2 z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
