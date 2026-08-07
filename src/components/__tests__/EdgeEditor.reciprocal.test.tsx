// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useState } from 'react';
import { EdgeEditor } from '../Editors';
import { useStore } from '../../state/store';
import { createEdge, createNetwork, createNode } from '../../model/factory';

/**
 * Reported live: set one direction of a reciprocal link, use the "Edit X ->
 * Y" link to jump to the other direction, set that one too — and the first
 * direction's change never actually saved. Root cause: clicking Update
 * closes the whole dialog (see App.tsx), so the *only* way to reach the
 * other direction is that link — and it used to just navigate away,
 * discarding whatever was picked on the current direction with no warning
 * and no save. The fix makes the link save first, the same thing Update
 * itself does, before switching.
 *
 * This mirrors App.tsx's real wiring (dialog state -> editingEdge lookup ->
 * <EdgeEditor key={editingEdge.id} .../> -> store.updateEdge) rather than
 * testing EdgeEditor in isolation, since the bug lived in that interaction,
 * not in any single component read on its own.
 */
function Harness() {
  const network = useStore((s) => s.network);
  const updateEdge = useStore((s) => s.updateEdge);
  const [editingId, setEditingId] = useState<string>(network.edges[0]!.id);

  const editingEdge = network.edges.find((e) => e.id === editingId)!;
  const nodeLabel = (id: string) => network.nodes.find((n) => n.id === id)?.label ?? id;
  const back = network.edges.find((x) => x.source === editingEdge.target && x.target === editingEdge.source);

  return (
    <EdgeEditor
      key={editingEdge.id}
      sourceLabel={nodeLabel(editingEdge.source)}
      targetLabel={nodeLabel(editingEdge.target)}
      initial={editingEdge}
      alternate={back ? { id: back.id, sourceLabel: nodeLabel(back.source), targetLabel: nodeLabel(back.target) } : undefined}
      onSwitchTo={(id) => setEditingId(id)}
      onCancel={() => {}}
      onSave={(v) => updateEdge(editingEdge.id, v)}
    />
  );
}

beforeEach(() => {
  const net = createNetwork('Reciprocal edit test');
  const pain = createNode({ label: 'Pain', position: { x: 0, y: 0 } });
  const fear = createNode({ label: 'Fear of making it worse', position: { x: 100, y: 0 } });
  net.nodes = [pain, fear];
  net.edges = [
    createEdge(pain.id, fear.id, 'increases', 3), // Pain -> Fear, a lot
    createEdge(fear.id, pain.id, 'increases', 3), // Fear -> Pain, a lot (starts equal, on purpose)
  ];
  useStore.setState({ network: net, past: [], future: [] });
});

afterEach(cleanup);

describe('editing one direction of a reciprocal link, then switching to the other', () => {
  // "A little" and "A lot" each appear twice (once in the Increases row, once
  // in Decreases) — the Increases row renders first, so index 0 is it.
  const clickIncreases = (label: RegExp) => fireEvent.click(screen.getAllByRole('button', { name: label })[0]!);

  it('saves the first direction before switching, so both end up right', () => {
    render(<Harness />);

    // Pick "a little" for the forward direction, then use the switch link —
    // NOT Update, which would close the dialog before the other direction
    // could be reached at all.
    clickIncreases(/a little/i);
    fireEvent.click(screen.getByRole('button', { name: /edit fear of making it worse → pain/i }));

    // Now on the backward direction: set it to "a lot" and save.
    clickIncreases(/a lot/i);
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    const net = useStore.getState().network;
    const forward = net.edges.find((e) => e.source === net.nodes[0]!.id)!;
    const backward = net.edges.find((e) => e.id !== forward.id)!;

    expect(forward.strength).toBe(1); // "a little" — must survive the switch
    expect(backward.strength).toBe(3); // "a lot"
  });

  it('does the same thing in reverse — starting from the backward direction', () => {
    render(<Harness />);

    clickIncreases(/a lot/i); // forward is already "a lot", no-op but exercises the path
    fireEvent.click(screen.getByRole('button', { name: /edit fear of making it worse → pain/i }));

    clickIncreases(/a little/i);
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    const net = useStore.getState().network;
    const forward = net.edges.find((e) => e.source === net.nodes[0]!.id)!;
    const backward = net.edges.find((e) => e.id !== forward.id)!;

    expect(forward.strength).toBe(3);
    expect(backward.strength).toBe(1);
  });
});
