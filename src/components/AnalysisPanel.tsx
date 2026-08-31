import { useMemo, useState } from 'react';
import { useStore } from '../state/store';
import { analyse, buildGraph, findPaths } from '../analysis';
import { compareHypothesis, hasProposal } from '../analysis/hypothesis';
import { fmt, plural } from '../i18n/strings';
import { useStrings } from '../i18n';

interface Props {
  onHighlight: (ids: string[]) => void;
}

type Tab = 'summary' | 'central' | 'loops' | 'leverage' | 'paths' | 'hypothesis';

/**
 * Which arrows the centrality table is counting.
 *
 * Split out on request from clinicians: the combined figure answers "what is
 * busiest", which is not the same question as "what is holding the problem
 * together" or "what is this person's existing strength". A process can top the
 * combined table on unhelpful links alone.
 */
type CentralScope = 'all' | 'unhelpful' | 'helpful';

export function AnalysisPanel({ onHighlight }: Props) {
  const s = useStrings();
  const network = useStore((st) => st.network);
  const hypothesisOn = useStore((st) => st.hypothesis);
  const [tab, setTab] = useState<Tab>('summary');
  const [scope, setScope] = useState<CentralScope>('all');

  const report = useMemo(() => analyse(network), [network]);
  const rows =
    scope === 'all' ? report.centrality : scope === 'helpful' ? report.byValence.helpful : report.byValence.unhelpful;

  if (network.nodes.length === 0) {
    return <div className="panel-empty">{s.analysis.empty}</div>;
  }

  const proposal = hasProposal(network) || hypothesisOn;
  const tabs: [Tab, string][] = [
    ...((proposal ? [['hypothesis', s.analysis.whatIf]] : []) as [Tab, string][]),
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
              {fmt(s.analysis.stats, {
                nodes: report.nodeCount,
                edges: report.edgeCount,
                density: report.density,
              })}
            </p>
            {report.summary.map((line, i) => (
              <p key={i} className="summary-line" dangerouslySetInnerHTML={{ __html: markdownish(line) }} />
            ))}
          </>
        )}

        {tab === 'central' && (
          <>
            <div className="subtabs" role="tablist" aria-label={s.a11y.scopeTabs}>
              {(
                [
                  ['all', s.analysis.scopeAll, report.edgeCount],
                  ['unhelpful', s.analysis.scopeUnhelpful, report.byValence.counts.unhelpful],
                  ['helpful', s.analysis.scopeHelpful, report.byValence.counts.helpful],
                ] as [CentralScope, string, number][]
              ).map(([id, label, count]) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={scope === id}
                  className={`subtab${scope === id ? ' active' : ''}`}
                  onClick={() => {
                    setScope(id);
                    onHighlight([]);
                  }}
                >
                  {label} ({count})
                </button>
              ))}
            </div>
            <p className="muted small">{s.analysis.centralNote}</p>
            {scope !== 'all' && (
              <p className="muted small">
                {scope === 'unhelpful' ? s.analysis.scopeUnhelpfulNote : s.analysis.scopeHelpfulNote}{' '}
                {report.byValence.counts.neutral > 0 &&
                  plural(
                    { one: s.analysis.excludedNote_one, other: s.analysis.excludedNote_other },
                    report.byValence.counts.neutral,
                  )}
              </p>
            )}
            {rows.length > 0 && rows.every((c) => c.isIsolated) && (
              <p className="warn-box">
                {scope === 'unhelpful' ? s.analysis.noneMarkedUnhelpful : s.analysis.noneMarkedHelpful}
              </p>
            )}
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">{s.analysis.colNode}</th>
                  <th scope="col">{s.analysis.colIn}</th>
                  <th scope="col">{s.analysis.colOut}</th>
                  <th scope="col">{s.analysis.colStrength}</th>
                  <th scope="col">{s.analysis.colNetOutward}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id} onMouseEnter={() => onHighlight([c.id])} onMouseLeave={() => onHighlight([])}>
                    <th scope="row">
                      {c.label}
                      {c.isSource && <span className="chip">{s.analysis.chipEntryPoint}</span>}
                      {c.isSink && <span className="chip">{s.analysis.chipEndpoint}</span>}
                      {c.isIsolated && (
                        <span className="chip warn">
                          {scope === 'all'
                            ? s.analysis.chipUnconnected
                            : scope === 'helpful'
                              ? s.analysis.chipNothingHelping
                              : s.analysis.chipNothingUnhelpful}
                        </span>
                      )}
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
            {report.loops.loops.length === 0 && <p>{s.analysis.noLoops}</p>}
            {report.loops.truncated && <p className="warn-box">{s.analysis.manyLoops}</p>}
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
                    {plural(
                      { one: s.analysis.loopSteps_one, other: s.analysis.loopSteps_other },
                      l.length,
                      { gain: l.gain },
                    )}
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
                  <th scope="col">{s.analysis.colIfReduced}</th>
                  <th scope="col">{s.analysis.colBenefit}</th>
                  <th scope="col">{s.analysis.colReach}</th>
                </tr>
              </thead>
              <tbody>
                {report.leverage.map((l) => (
                  <tr key={l.id} onMouseEnter={() => onHighlight([l.id])} onMouseLeave={() => onHighlight([])}>
                    <th scope="row">
                      {l.label}
                      {l.sideEffects.length > 0 && (
                        <div className="side-effect">
                          {fmt(s.analysis.wouldAlsoSuppress, {
                            labels: l.sideEffects.map((x) => x.label).join(', '),
                          })}
                        </div>
                      )}
                      {!l.converged && <span className="chip warn">{s.analysis.chipNoDampening}</span>}
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
  const s = useStrings();
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
                <th scope="col">{s.analysis.colNow}</th>
                <th scope="col">{s.analysis.colWithThis}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{s.analysis.rowReinforcing}</th>
                <td>{report.reinforcingBefore}</td>
                <td>{report.reinforcingAfter}</td>
              </tr>
              <tr>
                <th scope="row">{s.analysis.rowBalancing}</th>
                <td>{report.balancingBefore}</td>
                <td>{report.balancingAfter}</td>
              </tr>
              <tr>
                <th scope="row">{s.analysis.rowAmplification}</th>
                <td>{report.amplificationBefore}</td>
                <td>{report.amplificationAfter}</td>
              </tr>
            </tbody>
          </table>

          {report.newBalancingLoops.length > 0 && (
            <>
              <h3>{s.analysis.newBrakes}</h3>
              <ul className="loop-list">
                {report.newBalancingLoops.map((l) => (
                  <li
                    key={l.id}
                    onMouseEnter={() => onHighlight([...l.nodes, ...l.edges.map((e) => e.id)])}
                    onMouseLeave={() => onHighlight([])}
                  >
                    <span className="badge balancing">{s.analysis.badgeNewBalancing}</span>
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
              <h3>{s.analysis.howItActs}</h3>
              <ul className="loop-list">
                {report.loopEffects.map(({ loop, mechanism, netPressure, pressuredNodes }) => (
                  <li
                    key={loop.id}
                    onMouseEnter={() => onHighlight([...loop.nodes, ...loop.edges.map((e) => e.id)])}
                    onMouseLeave={() => onHighlight([])}
                  >
                    <span className={`badge mech-${mechanism}`}>
                      {mechanism === 'balancing'
                        ? s.analysis.mechSelfCorrecting
                        : mechanism === 'pressure'
                          ? netPressure < 0
                            ? s.analysis.mechSteadyPressure
                            : s.analysis.mechPushedHarder
                          : s.analysis.mechUntouched}
                    </span>
                    <span className="loop-path">
                      {loop.labels.join(' → ')} → {loop.labels[0]}
                    </span>
                    {mechanism === 'pressure' && (
                      <span className="muted small">
                        {fmt(s.analysis.pressureOn, { labels: pressuredNodes.map((n) => n.label).join(', ') })}
                      </span>
                    )}
                    {mechanism === 'balancing' && (
                      <span className="muted small">{s.analysis.holdsOnItsOwn}</span>
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
  const s = useStrings();
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
          <span>{s.analysis.from}</span>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="">{s.analysis.choose}</option>
            {network.nodes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>{s.analysis.to}</span>
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="">{s.analysis.choose}</option>
            {network.nodes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {result && result.paths.length === 0 && <p>{s.analysis.noRoute}</p>}
      {result && result.paths.length > 0 && (
        <>
          <p className="stat-line">
            {plural({ one: s.analysis.routeStats_one, other: s.analysis.routeStats_other }, result.paths.length, {
              up: result.amplifying,
              down: result.dampening,
              net: result.netEffect > 0 ? `+${result.netEffect}` : result.netEffect,
            })}
          </p>
          <ul className="loop-list">
            {result.paths.map((p, i) => (
              <li
                key={i}
                onMouseEnter={() => onHighlight([...p.nodes, ...p.edges.map((e) => e.id)])}
                onMouseLeave={() => onHighlight([])}
              >
                <span className={`badge ${p.direction === 'increases' ? 'reinforcing' : 'balancing'}`}>
                  {p.direction === 'increases' ? s.analysis.increases : s.analysis.decreases}
                </span>
                <span className="loop-path">{p.labels.join(' → ')}</span>
                <span className="muted small">
                  {plural({ one: s.analysis.pathSteps_one, other: s.analysis.pathSteps_other }, p.length, {
                    effect: p.effect,
                  })}
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
