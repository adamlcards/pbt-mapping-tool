import { useState } from 'react';
import { useStore } from '../state/store';
import { diffSnapshots, exportSnapshotDiffCsv, download, safeFilename } from '../export/exporters';
import { fmt, plural } from '../i18n/strings';
import { useStrings } from '../i18n';

/**
 * Timepoints.
 *
 * Test-retest reliability is the open methodological question for perceived
 * causal networks: node centrality holds up reasonably across occasions, edges
 * much less so. A tool that lets someone re-draw at a second timepoint and see
 * exactly what moved is therefore not a convenience feature, it is the thing
 * that lets the method be evaluated at all.
 */
export function SnapshotPanel() {
  const t = useStrings();
  const network = useStore((s) => s.network);
  const snapshots = useStore((s) => s.snapshots);
  const takeSnapshot = useStore((s) => s.takeSnapshot);
  const deleteSnapshot = useStore((s) => s.deleteSnapshot);
  const restoreSnapshot = useStore((s) => s.restoreSnapshot);

  const [label, setLabel] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');

  const diff = (() => {
    const sa = snapshots.find((s) => s.id === a);
    const sb = snapshots.find((s) => s.id === b);
    if (!sa || !sb || sa.id === sb.id) return null;
    return { sa, sb, rows: diffSnapshots(sa, sb) };
  })();

  return (
    <div className="snapshots">
      <p className="muted small">{t.snapshots.intro}</p>

      <div className="snap-add">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder={t.snapshots.labelPlaceholder}
          aria-label={t.snapshots.labelAria}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            takeSnapshot(label || new Date().toLocaleDateString());
            setLabel('');
          }}
          disabled={network.nodes.length === 0}
        >
          {t.snapshots.saveButton}
        </button>
      </div>

      {snapshots.length === 0 && <p className="muted small">{t.snapshots.none}</p>}

      <ul className="struct-list">
        {snapshots.map((s) => (
          <li key={s.id}>
            <span className="struct-item static">
              <span className="struct-label">{s.label}</span>
              <span className="muted small">
                {fmt(t.snapshots.meta, {
                  when: new Date(s.takenAt).toLocaleString(),
                  nodes: s.network.nodes.length,
                  edges: s.network.edges.length,
                })}
              </span>
            </span>
            <button className="btn btn-small" onClick={() => restoreSnapshot(s.id)}>
              {t.action.restore}
            </button>
            <button className="icon-btn" onClick={() => deleteSnapshot(s.id)} aria-label={fmt(t.snapshots.deleteAria, { label: s.label })}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      {snapshots.length >= 2 && (
        <>
          <h3>{t.snapshots.compare}</h3>
          <div className="path-pickers">
            <label className="field">
              <span>{t.snapshots.earlier}</span>
              <select value={a} onChange={(e) => setA(e.target.value)}>
                <option value="">{t.analysis.choose}</option>
                {snapshots.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>{t.snapshots.later}</span>
              <select value={b} onChange={(e) => setB(e.target.value)}>
                <option value="">{t.analysis.choose}</option>
                {snapshots.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {diff && (
            <>
              <p className="stat-line">
                {plural(
                  { one: t.snapshots.changes_one, other: t.snapshots.changes_other },
                  diff.rows.length,
                )}
              </p>
              <ul className="diff-list">
                {diff.rows.slice(0, 60).map((row, i) => (
                  <li key={i}>
                    <span className={`badge ${row.kind}`}>{row.kind}</span> {row.detail}
                    {(row.before || row.after) && (
                      <span className="muted small">
                        {' '}
                        {row.before || '—'} → {row.after || '—'}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <button
                className="btn"
                onClick={() =>
                  download(
                    `${safeFilename(network.meta.title)}_comparison.csv`,
                    exportSnapshotDiffCsv(diff.sa, diff.sb),
                    'text/csv',
                  )
                }
              >
                {t.snapshots.downloadComparison}
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
