import { useMemo, useState } from 'react';
import { useStore } from '../state/store';
import { analyse, buildGraph, findPaths } from '../analysis';
import { compareHypothesis, hasProposal } from '../analysis/hypothesis';
import { t } from '../i18n/strings';

interface Props {
  onHighlight: (ids: string[]) => void;
}

type Tab = 'summary' | 'central' | 'loops' | 'leverage' | 'paths' | 'hypothesis';

export function AnalysisPanel({ onHighlight }: Props) {
  const s = t();
  const network = useStore((st) => st.network);
  const hypothesisOn = useStore((st) => st.hypothesis);
  const [tab, setTab] = useState<Tab>('summary');

  const report = useMemo(() => analyse(network), [network]);

  if (network.nodes.length === 0) {
    return <div className="panel-empty">{s.analysis.empty}</div>;
  }

  const proposal = hasProposal(network) || hypothesisOn;
  const tabs: [Tab, string][] = [
    ...((proposal ? [['hypothesis', 'What if']] : []) as [Tab, string][]),
    ['summary', s.analysis.summary],
    ['central', s.analysis.central],
    ['loops', `${s.analysis.loops} (${report.loops.loops.length})`],
    ['leverage', s.analysis.leverage],
    ['paths', s.analysis.paths],
  ];

  return (
    <div className="analysis">
      <div className="tabs" role="tablist">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            className={`tab${tab === id ? ' active' : ''}`}
            onClick={() => {
              setTab(id);
              onHighlight([]);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="tab-body" role="tabpanel">
        {tab === 'summary' && (
          <>
            <p className="stat-line">
              {report.nodeCount} nodes · {report.edgeCount} connections · density {report.density}
            </p>
            {report.summary.map((line, i) => (
              <p key={i} className="summary-line" dangerouslySetInnerHTML={{ __html: markdownish(line) }} />
            ))}
          </>
        )}

        {tab === 'central' && (
          <>
            <p className="muted small">
              Strength counts how much influence flows in and out. It is the centrality measure with the most
              support for picking treatment targets, but a central node is not automatically the right one to
              push on.
            </p>
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Node</th>
                  <th scope="col">In</th>
                  <th scope="col">Out</th>
                  <th scope="col">Strength</th>
                  <th scope="col">Net outward</th>
                </tr>
              </thead>
              <tbody>
                {report.centrality.map((c) => (
                  <tr key={c.id} onMouseEnter={() => onHighlight([c.id])} onMouseLeave={() => onHighlight([])}>
                    <th scope="row">
                      {c.label}
                      {c.isSource && <span className="chip">entry point</span>}
                      {c.isSink && <span className="chip">endpoint</span>}
                      {c.isIsolated && <span className="chip warn">unconnected</span>}
                    </th>
                    <td>{c.inDegree}</td>
                    <td>{c.outDegree}</td>
                    <td>{c.totalStrength}</td>
                    <td className={c.expectedInfluence < 0 ? 'neg' : ''}>
                      {c.expectedInfluence > 0 ? `+${c.expectedInfluence}` : c.expectedInfluence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === 'loops' && (
          <>
            <p className="muted small">
              <strong>{s.analysis.reinforcing}:</strong> {s.analysis.reinforcingHelp}
            </p>
            <p className="muted small">
              <strong>{s.analysis.balancing}:</strong> {s.analysis.balancingHelp}
            </p>
            {report.loops.loops.length === 0 && <p>No loops found.</p>}
            {report.loops.truncated && (
              <p className="warn-box">This network has many loops. Only the strongest are listed.</p>
            )}
            <ul className="loop-list">
              {report.loops.loops.slice(0, 40).map((l) => (
                <li
                  key={l.id}
                  onMouseEnter={() => onHighlight([...l.nodes, ...l.edges.map((e) => e.id)])}
                  onMouseLeave={() => onHighlight([])}
                >
                  <span className={`badge ${l.kind}`}>
                    {l.kind === 'reinforcing' ? s.analysis.reinforcing : s.analysis.balancing}
                  </span>
                  <span className="loop-path">
                    {l.labels.join(' → ')} → {l.labels[0]}
                  </span>
                  <span className="muted small">
                    {l.length} step{l.length === 1 ? '' : 's'}, gain {l.gain}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        {tab === 'leverage' && (
          <>
            <p className="warn-box">{s.analysis.heuristicWarning}</p>
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">If this were reduced</th>
                  <th scope="col">Modelled benefit</th>
                  <th scope="col">Reach</th>
                </tr>
              </thead>
              <tbody>
                {report.leverage.map((l) => (
                  <tr key={l.id} onMouseEnter={() => onHighlight([l.id])} onMouseLeave={() => onHighlight([])}>
                    <th scope="row">
                      {l.label}
                      {l.sideEffects.length > 0 && (
                        <div className="side-effect">
                          Would also suppress {l.sideEffects.map((x) => x.label).join(', ')}
                        </div>
                      )}
                      {!l.converged && <span className="chip warn">no dampening</span>}
                    </th>
                    <td>{l.benefit}</td>
                    <td>{l.reach}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === 'paths' && <PathExplorer onHighlight={onHighlight} />}

        {tab === 'hypothesis' && <HypothesisView onHighlight={onHighlight} />}
      </div>
    </div>
  );
}

function HypothesisView({ onHighlight }: { onHighlight: (ids: string[]) => void }) {
  const network = useStore((st) => st.network);
  const report = useMemo(() => compareHypothesis(network), [network]);

  return (
    <>
      {report.summary.map((line, i) => (
        <p key={i} className="summary-line" dangerouslySetInnerHTML={{ __html: markdownish(line) }} />
      ))}

      {report.hasProposal && (
        <>
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">&nbsp;</th>
                <th scope="col">Now</th>
                <th scope="col">With this</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Reinforcing loops</th>
                <td>{report.reinforcingBefore}</td>
                <td>{report.reinforcingAfter}</td>
              </tr>
              <tr>
                <th scope="row">Balancing loops</th>
                <td>{report.balancingBefore}</td>
                <td>{report.balancingAfter}</td>
              </tr>
              <tr>
                <th scope="row">Modelled amplification</th>
                <td>{report.amplificationBefore}</td>
                <td>{report.amplificationAfter}</td>
              </tr>
            </tbody>
          </table>

          {report.newBalancingLoops.length > 0 && (
            <>
              <h3>New brakes on the system</h3>
              <ul className="loop-list">
                {report.newBalancingLoops.map((l) => (
                  <li
                    key={l.id}
                    onMouseEnter={() => onHighlight([...l.nodes, ...l.edges.map((e) => e.id)])}
                    onMouseLeave={() => onHighlight([])}
                  >
                    <span className="badge balancing">new balancing</span>
                    <span className="loop-path">
                      {l.labels.join(' → ')} → {l.labels[0]}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {report.loopEffects.length > 0 && (
            <>
              <h3>How it acts on each cycle</h3>
              <ul className="loop-list">
                {report.loopEffects.map(({ loop, mechanism, netPressure, pressuredNodes }) => (
                  <li
                    key={loop.id}
                    onMouseEnter={() => onHighlight([...loop.nodes, ...loop.edges.map((e) => e.id)])}
                    onMouseLeave={() => onHighlight([])}
                  >
                    <span className={`badge mech-${mechanism}`}>
                      {mechanism === 'balancing'
                        ? 'self-correcting'
                        : mechanism === 'pressure'
                          ? netPressure < 0
                            ? 'steady pressure'
                            : 'pushed harder'
                          : 'untouched'}
                    </span>
                    <span className="loop-path">
                      {loop.labels.join(' → ')} → {loop.labels[0]}
                    </span>
                    {mechanism === 'pressure' && (
                      <span className="muted small">
                        on {pressuredNodes.map((n) => n.label).join(', ')} · needs keeping up
                      </span>
                    )}
                    {mechanism === 'balancing' && (
                      <span className="muted small">holds on its own</span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </>
  );
}

function PathExplorer({ onHighlight }: { onHighlight: (ids: string[]) => void }) {
  const network = useStore((st) => st.network);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const result = useMemo(() => {
    if (!from || !to || from === to) return null;
    return findPaths(buildGraph(network), from, to);
  }, [network, from, to]);

  return (
    <>
      <div className="path-pickers">
        <label className="field">
          <span>From</span>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="">Choose…</option>
            {network.nodes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>To</span>
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="">Choose…</option>
            {network.nodes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {result && result.paths.length === 0 && <p>No route from one to the other.</p>}
      {result && result.paths.length > 0 && (
        <>
          <p className="stat-line">
            {result.paths.length} route{result.paths.length === 1 ? '' : 's'} · {result.amplifying} increasing ·{' '}
            {result.dampening} decreasing · net {result.netEffect > 0 ? `+${result.netEffect}` : result.netEffect}
          </p>
          <ul className="loop-list">
            {result.paths.map((p, i) => (
              <li
                key={i}
                onMouseEnter={() => onHighlight([...p.nodes, ...p.edges.map((e) => e.id)])}
                onMouseLeave={() => onHighlight([])}
              >
                <span className={`badge ${p.direction === 'increases' ? 'reinforcing' : 'balancing'}`}>
                  {p.direction}
                </span>
                <span className="loop-path">{p.labels.join(' → ')}</span>
                <span className="muted small">
                  {p.length} step{p.length === 1 ? '' : 's'}, effect {p.effect}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

/** Minimal bold/italic rendering. Input is our own strings, never user content. */
function markdownish(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>');
}
