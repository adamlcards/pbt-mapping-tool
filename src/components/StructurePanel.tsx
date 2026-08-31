import { useStore } from '../state/store';
import { CATEGORY_META, categoryLabel, strengthLabel, valenceLabelOf } from '../model/eemm';
import { fmt } from '../i18n/strings';
import { useStrings } from '../i18n';

/**
 * The accessible view of the graph.
 *
 * A canvas is opaque to a screen reader and to anyone who cannot use a mouse.
 * Rather than bolting ARIA onto drawing operations and hoping, this presents the
 * same network as a real list with real buttons: every node and connection can
 * be reached with Tab, read aloud, edited and deleted. It is also genuinely
 * quicker than the canvas for renaming a batch of nodes, so it does not sit
 * unused as a compliance afterthought.
 */
export function StructurePanel({
  onEditNode,
  onEditEdge,
  onHighlight,
}: {
  onEditNode: (id: string) => void;
  onEditEdge: (id: string) => void;
  onHighlight: (ids: string[]) => void;
}) {
  const t = useStrings();
  const network = useStore((s) => s.network);
  const deleteNode = useStore((s) => s.deleteNode);
  const deleteEdge = useStore((s) => s.deleteEdge);
  const label = (id: string) => network.nodes.find((n) => n.id === id)?.label ?? 'unknown';

  if (network.nodes.length === 0) {
    return <div className="panel-empty">{t.structure.empty}</div>;
  }

  return (
    <div className="structure">
      <h3>{fmt(t.structure.nodes, { count: network.nodes.length })}</h3>
      <ul className="struct-list">
        {network.nodes.map((n) => (
          <li key={n.id} onFocus={() => onHighlight([n.id])} onBlur={() => onHighlight([])}>
            <button className="struct-item" onClick={() => onEditNode(n.id)}>
              <span className="swatch" style={{ background: CATEGORY_META[n.category].colour, borderColor: CATEGORY_META[n.category].border }} aria-hidden="true" />
              <span className="struct-label">{n.label}</span>
              <span className="muted small">
                {categoryLabel(n.category)}
                {n.severity !== undefined && fmt(t.structure.nodeMetaDistress, { value: n.severity })}
                {n.frequency !== undefined && fmt(t.structure.nodeMetaFrequency, { value: n.frequency })}
              </span>
            </button>
            <button
              className="icon-btn"
              onClick={() => deleteNode(n.id)}
              aria-label={fmt(t.structure.deleteNodeAria, { label: n.label })}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <h3>{fmt(t.structure.connections, { count: network.edges.length })}</h3>
      {network.edges.length === 0 && <p className="muted small">{t.structure.noConnections}</p>}
      <ul className="struct-list">
        {network.edges.map((e) => {
          // Built from the same whole-sentence template the connection editor
          // uses, not by gluing subject + verb + object together. The glued
          // version forced English word order on every language: Turkish,
          // Japanese and Korean are all verb-final, and the result was
          // comprehensible but plainly foreign. The strength and helpfulness
          // are appended as trailing clauses, which is safe in every language
          // we ship because that is how the English reads too.
          //
          // `toLowerCase` is a no-op in scripts without case, and the pieces it
          // touches are mid-sentence fragments everywhere else.
          const clause = fmt(
            e.direction === 'increases' ? t.edgeEditor.sentenceIncreases : t.edgeEditor.sentenceDecreases,
            { source: label(e.source), target: label(e.target) },
          );
          const detail = e.valence === 'neutral' ? '' : `, ${valenceLabelOf(e.valence).toLowerCase()}`;
          const sentence = `${clause}, ${strengthLabel(e.strength).toLowerCase()}${detail}`;
          return (
            <li key={e.id} onFocus={() => onHighlight([e.id])} onBlur={() => onHighlight([])}>
              <button className="struct-item" onClick={() => onEditEdge(e.id)}>
                <span className="struct-label">{sentence}</span>
              </button>
              <button className="icon-btn" onClick={() => deleteEdge(e.id)} aria-label={fmt(t.structure.deleteEdgeAria, { sentence })}>
                ✕
              </button>
            </li>
          );
        })}
      </ul>

    </div>
  );
}
