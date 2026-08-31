import { beforeEach, describe, expect, it } from 'vitest';
import { useStore } from '../store';
import { createNetwork } from '../../model/factory';

/**
 * These cover the two things most likely to regress silently: an action that
 * writes to the network without leaving an undo entry, and a paste that
 * reattaches edges to the wrong nodes. Both produce a map that looks fine and
 * is wrong, which is the failure mode worth paying for tests to catch.
 */

function reset() {
  useStore.setState({
    network: createNetwork('Test'),
    snapshots: [],
    events: [],
    selectedNodes: [],
    selectedEdge: null,
    past: [],
    future: [],
    clipboard: null,
    pasteSerial: 0,
    dirty: false,
  });
}

const s = () => useStore.getState();

describe('applyPositions', () => {
  beforeEach(reset);

  it('records a layout as exactly one undo entry', () => {
    const a = s().addNode({ label: 'A', position: { x: 0, y: 0 } });
    const b = s().addNode({ label: 'B', position: { x: 10, y: 10 } });
    const depth = s().past.length;

    s().applyPositions(
      [
        { id: a, position: { x: 500, y: 500 } },
        { id: b, position: { x: 600, y: 600 } },
      ],
      'Organise',
    );

    expect(s().past.length).toBe(depth + 1);
  });

  it('undo after a layout restores the old positions and keeps the nodes', () => {
    const a = s().addNode({ label: 'A', position: { x: 0, y: 0 } });
    const b = s().addNode({ label: 'B', position: { x: 10, y: 10 } });

    s().applyPositions(
      [
        { id: a, position: { x: 500, y: 500 } },
        { id: b, position: { x: 600, y: 600 } },
      ],
      'Organise',
    );
    expect(s().network.nodes.find((n) => n.id === a)!.position).toEqual({ x: 500, y: 500 });

    s().undo();

    // The regression this exists for: Organise used to leave no history entry,
    // so this undo removed node B instead of moving the boxes back.
    expect(s().network.nodes).toHaveLength(2);
    expect(s().network.nodes.find((n) => n.id === a)!.position).toEqual({ x: 0, y: 0 });
    expect(s().network.nodes.find((n) => n.id === b)!.position).toEqual({ x: 10, y: 10 });
  });

  it('does not spend an undo step when nothing actually moved', () => {
    const a = s().addNode({ label: 'A', position: { x: 40, y: 40 } });
    const depth = s().past.length;
    s().applyPositions([{ id: a, position: { x: 40, y: 40 } }], 'Organise');
    expect(s().past.length).toBe(depth);
  });
});

describe('copy and paste', () => {
  beforeEach(reset);

  it('copies the selected nodes and only the edges wholly inside the selection', () => {
    const a = s().addNode({ label: 'A', position: { x: 0, y: 0 } });
    const b = s().addNode({ label: 'B', position: { x: 100, y: 0 } });
    const outside = s().addNode({ label: 'C', position: { x: 200, y: 0 } });
    s().addEdge(a, b, 'increases', 2, 'unhelpful');
    s().addEdge(b, outside, 'increases', 1, 'neutral');

    s().select([a, b]);
    expect(s().copySelection()).toBe(2);

    const clip = s().clipboard!;
    expect(clip.nodes.map((n) => n.label).sort()).toEqual(['A', 'B']);
    // B -> C had one end outside the selection, so it is not carried.
    expect(clip.edges).toHaveLength(1);
  });

  it('pastes new ids with the internal edge rewired to the copies', () => {
    const a = s().addNode({ label: 'A', position: { x: 0, y: 0 } });
    const b = s().addNode({ label: 'B', position: { x: 100, y: 0 } });
    s().addEdge(a, b, 'decreases', 3, 'helpful');

    s().select([a, b]);
    s().copySelection();
    const pasted = s().pasteClipboard();

    expect(pasted).toHaveLength(2);
    expect(s().network.nodes).toHaveLength(4);
    expect(s().network.edges).toHaveLength(2);

    const newEdge = s().network.edges.find((e) => e.source !== a)!;
    expect(pasted).toContain(newEdge.source);
    expect(pasted).toContain(newEdge.target);
    // Properties carry over; only identity and position change.
    expect(newEdge.direction).toBe('decreases');
    expect(newEdge.strength).toBe(3);
    expect(newEdge.valence).toBe('helpful');
  });

  it('offsets each successive paste so copies do not stack on one spot', () => {
    const a = s().addNode({ label: 'A', position: { x: 0, y: 0 } });
    s().select([a]);
    s().copySelection();

    const first = s().pasteClipboard()[0]!;
    const second = s().pasteClipboard()[0]!;
    const p1 = s().network.nodes.find((n) => n.id === first)!.position;
    const p2 = s().network.nodes.find((n) => n.id === second)!.position;

    expect(p1).not.toEqual(p2);
    expect(p2.x).toBeGreaterThan(p1.x);
  });

  it('selects what was pasted, and a paste is undoable in one step', () => {
    const a = s().addNode({ label: 'A', position: { x: 0, y: 0 } });
    s().select([a]);
    s().copySelection();
    const pasted = s().pasteClipboard();

    expect(s().selectedNodes).toEqual(pasted);
    s().undo();
    expect(s().network.nodes).toHaveLength(1);
  });

  it('copying nothing leaves the clipboard alone', () => {
    s().select([]);
    expect(s().copySelection()).toBe(0);
    expect(s().clipboard).toBeNull();
    expect(s().pasteClipboard()).toEqual([]);
  });
});
