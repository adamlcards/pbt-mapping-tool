import { useState } from 'react';
import { Modal } from './Modal';
import {
  CATEGORY_META,
  LINK_VALENCES,
  STRENGTHS,
  STRENGTH_LABEL,
  VALENCE_LABEL,
  categoriesByGroup,
  type EemmCategory,
  type LinkValence,
  type Strength,
} from '../model/eemm';
import type { PbtEdge, PbtNode } from '../model/types';

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
            Cancel
          </button>
          <button className="btn btn-primary" onClick={submit} disabled={!label.trim()}>
            Add
          </button>
        </>
      }
    >
      <label className="field">
        <span>Name</span>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="In the person's own words"
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          maxLength={120}
        />
      </label>

      <fieldset className="field">
        <legend>Category</legend>
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
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <small>{CATEGORY_META[category].hint}</small>
      </fieldset>

      <button type="button" className="disclosure" onClick={() => setAdvanced(!advanced)}>
        {advanced ? '▾' : '▸'} Ratings and notes (optional)
      </button>

      {advanced && (
        <div className="advanced">
          <small className="muted">
            Used in research protocols to compare networks across people and across time. Not needed for
            everyday clinical mapping.
          </small>
          <Rating label="How distressing (0–10)" value={severity} onChange={setSeverity} />
          <Rating label="How often (0–10)" value={frequency} onChange={setFrequency} />
          <label className="field">
            <span>Notes</span>
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
          aria-valuetext={value === undefined ? 'Not rated' : String(value)}
        />
        <output>{value === undefined ? '—' : value}</output>
        <button type="button" className="btn btn-small" onClick={() => onChange(value === undefined ? 5 : undefined)}>
          {value === undefined ? 'Rate' : 'Clear'}
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
      title="How does this affect that?"
      onClose={onCancel}
      footer={
        <>
          {onDelete && (
            <button className="btn btn-danger btn-small" onClick={onDelete}>
              Remove link
            </button>
          )}
          <span className="spacer" />
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={strength === null}
            onClick={() => strength !== null && onSave({ direction, strength, valence })}
          >
            {initial ? 'Update' : 'Add link'}
          </button>
        </>
      }
    >
      {/* Reading the relationship back as a sentence is what stops people
          drawing the arrow the wrong way round, which is the most common error
          in network mapping. */}
      <p className="sentence">
        <strong>{sourceLabel}</strong> {direction === 'increases' ? 'increases' : 'decreases'}{' '}
        <strong>{targetLabel}</strong>
      </p>

      {(['increases', 'decreases'] as const).map((d) => (
        <div key={d} className="strength-block">
          <span className="strength-label">
            <ArrowGlyph filled={d === 'increases'} /> {d === 'increases' ? 'Increases it' : 'Decreases it'}
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
                {STRENGTH_LABEL[s]}
              </button>
            ))}
          </div>
        </div>
      ))}

      {alternate && onSwitchTo && (
        <p className="alt-direction">
          These two also influence each other the other way.{' '}
          <button type="button" className="linkish" onClick={() => onSwitchTo(alternate.id)}>
            Edit {alternate.sourceLabel} → {alternate.targetLabel}
          </button>
        </p>
      )}

      {/*
        Collapsed by default. This is the only thing that tells the analysis what
        counts as an improvement, so it earns its place, but most links do not
        need it and it should not slow down drawing.
      */}
      <button type="button" className="disclosure" onClick={() => setShowValence(!showValence)}>
        {showValence ? '▾' : '▸'} Is this link helping? {valence !== 'neutral' && `(${VALENCE_LABEL[valence]})`}
      </button>

      {showValence && (
        <fieldset className="field advanced">
          <div className="radio-row">
            {LINK_VALENCES.map((v) => (
              <label key={v} className="radio">
                <input type="radio" name="valence" checked={valence === v} onChange={() => setValence(v)} />
                <span>{VALENCE_LABEL[v]}</span>
              </label>
            ))}
          </div>
          <small>
            No process is helpful or harmful on its own; it depends what it connects to, which is why this is
            asked here and not when you name the box. Marking links is what lets the Analysis panel say which
            change would help rather than only which change would spread furthest. Leave it alone if you are
            not using that.
          </small>
        </fieldset>
      )}
    </Modal>
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
