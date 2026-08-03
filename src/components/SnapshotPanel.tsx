import { useState } from 'react';
import { useStore } from '../state/store';
import { diffSnapshots, exportSnapshotDiffCsv, download, safeFilename } from '../export/exporters';

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
      <p className="muted small">
        Save the network as it stands now, then come back and draw it again later. Nothing is overwritten.
      </p>

      <div className="snap-add">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label, e.g. Intake or Session 6"
          aria-label="Label for this timepoint"
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            takeSnapshot(label || new Date().toLocaleDateString());
            setLabel('');
          }}
          disabled={network.nodes.length === 0}
        >
          Save timepoint
        </button>
      </div>

      {snapshots.length === 0 && <p className="muted small">No timepoints saved yet.</p>}

      <ul className="struct-list">
        {snapshots.map((s) => (
          <li key={s.id}>
            <span className="struct-item static">
              <span className="struct-label">{s.label}</span>
              <span className="muted small">
                {new Date(s.takenAt).toLocaleString()} · {s.network.nodes.length} nodes ·{' '}
                {s.network.edges.length} connections
              </span>
            </span>
            <button className="btn btn-small" onClick={() => restoreSnapshot(s.id)}>
              Restore
            </button>
            <button className="icon-btn" onClick={() => deleteSnapshot(s.id)} aria-label={`Delete timepoint ${s.label}`}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      {snapshots.length >= 2 && (
        <>
          <h3>Compare</h3>
          <div className="path-pickers">
            <label className="field">
              <span>Earlier</span>
              <select value={a} onChange={(e) => setA(e.target.value)}>
                <option value="">Choose…</option>
                {snapshots.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Later</span>
              <select value={b} onChange={(e) => setB(e.target.value)}>
                <option value="">Choose…</option>
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
                {diff.rows.length} change{diff.rows.length === 1 ? '' : 's'}
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
                Download comparison (CSV)
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
