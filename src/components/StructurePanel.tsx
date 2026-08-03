import { useStore } from '../state/store';
import { CATEGORY_META, STRENGTH_LABEL, VALENCE_LABEL } from '../model/eemm';

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
  const network = useStore((s) => s.network);
  const deleteNode = useStore((s) => s.deleteNode);
  const deleteEdge = useStore((s) => s.deleteEdge);
  const label = (id: string) => network.nodes.find((n) => n.id === id)?.label ?? 'unknown';

  if (network.nodes.length === 0) {
    return <div className="panel-empty">Nothing here yet. Add a node to begin.</div>;
  }

  return (
    <div className="structure">
      <h3>Nodes ({network.nodes.length})</h3>
      <ul className="struct-list">
        {network.nodes.map((n) => (
          <li key={n.id} onFocus={() => onHighlight([n.id])} onBlur={() => onHighlight([])}>
            <button className="struct-item" onClick={() => onEditNode(n.id)}>
              <span className="swatch" style={{ background: CATEGORY_META[n.category].colour, borderColor: CATEGORY_META[n.category].border }} aria-hidden="true" />
              <span className="struct-label">{n.label}</span>
              <span className="muted small">
                {CATEGORY_META[n.category].label}
                {n.severity !== undefined && ` · distress ${n.severity}`}
                {n.frequency !== undefined && ` · frequency ${n.frequency}`}
              </span>
            </button>
            <button
              className="icon-btn"
              onClick={() => deleteNode(n.id)}
              aria-label={`Delete node ${n.label}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <h3>Connections ({network.edges.length})</h3>
      {network.edges.length === 0 && <p className="muted small">None yet.</p>}
      <ul className="struct-list">
        {network.edges.map((e) => {
          const detail = e.valence === 'neutral' ? '' : `, ${VALENCE_LABEL[e.valence].toLowerCase()}`;
          const sentence = `${label(e.source)} ${e.direction} ${label(e.target)}, ${STRENGTH_LABEL[e.strength].toLowerCase()}${detail}`;
          return (
            <li key={e.id} onFocus={() => onHighlight([e.id])} onBlur={() => onHighlight([])}>
              <button className="struct-item" onClick={() => onEditEdge(e.id)}>
                <span className="struct-label">{sentence}</span>
              </button>
              <button className="icon-btn" onClick={() => deleteEdge(e.id)} aria-label={`Delete connection ${sentence}`}>
                ✕
              </button>
            </li>
          );
        })}
      </ul>

    </div>
  );
}
