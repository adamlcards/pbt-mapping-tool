import { create } from 'zustand';
import type { EventType, LogEvent, NodeId, PbtEdge, PbtNetwork, Position, Snapshot } from '../model/types';
import { weightOf } from '../model/types';
import type { TrialState } from '../model/types';
import type { EemmCategory, LinkValence, Strength } from '../model/eemm';
import { clampRating, createEdge, createNetwork, createNode, createSnapshot, uid } from '../model/factory';
import { deepClone } from '../model/clone';

export type Tool = 'select' | 'add' | 'connect' | 'delete';

const MAX_HISTORY = 100;
const SESSION_START = Date.now();

interface HistoryEntry {
  network: PbtNetwork;
  label: string;
}

export interface AppState {
  network: PbtNetwork;
  snapshots: Snapshot[];
  events: LogEvent[];

  tool: Tool;
  selectedNodes: NodeId[];
  selectedEdge: string | null;
  /** Node awaiting a second click, when drawing a connection. */
  pendingSource: NodeId | null;

  past: HistoryEntry[];
  future: HistoryEntry[];

  dirty: boolean;
  /** While on, anything added is marked as a proposal rather than a description. */
  hypothesis: boolean;

  setTool: (t: Tool) => void;
  setHypothesis: (on: boolean) => void;
  setTrial: (kind: 'node' | 'edge', id: string, trial: TrialState | undefined) => void;
  select: (nodes: NodeId[], edge?: string | null) => void;
  clearSelection: () => void;
  setPendingSource: (id: NodeId | null) => void;

  addNode: (opts: { label: string; category?: EemmCategory; position: Position; trial?: TrialState }) => NodeId;
  updateNode: (
    id: NodeId,
    patch: Partial<{
      label: string;
      category: EemmCategory;
      severity: number | undefined;
      frequency: number | undefined;
      notes: string;
    }>,
  ) => void;
  moveNode: (id: NodeId, position: Position, commit: boolean) => void;
  deleteNode: (id: NodeId) => void;

  addEdge: (
    source: NodeId,
    target: NodeId,
    direction: PbtEdge['direction'],
    strength: Strength,
    valence: LinkValence,
    trial?: TrialState,
  ) => string | null;
  updateEdge: (
    id: string,
    patch: Partial<{
      direction: PbtEdge['direction'];
      strength: Strength;
      valence: LinkValence;
      notes: string;
    }>,
  ) => void;
  deleteEdge: (id: string) => void;

  setTitle: (title: string) => void;
  replaceNetwork: (net: PbtNetwork, label: string) => void;
  clearNetwork: () => void;

  takeSnapshot: (label: string) => void;
  deleteSnapshot: (id: string) => void;
  restoreSnapshot: (id: string) => void;

  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  log: (type: EventType, payload?: Record<string, unknown>) => void;
  markClean: () => void;
  hydrate: (state: { network: PbtNetwork; snapshots: Snapshot[] }) => void;
}

/**
 * Undo works by snapshotting the whole network before each mutation.
 *
 * A command-pattern undo stack would use less memory, but clinical networks are
 * tiny (tens of nodes) and a full copy is impossible to get subtly wrong, which
 * matters more here: silently corrupting someone's clinical formulation on undo
 * would be far worse than using a few hundred kilobytes.
 */
export const useStore = create<AppState>((set, get) => {
  const pushHistory = (label: string) => {
    const { network, past } = get();
    const entry: HistoryEntry = { network: deepClone(network), label };
    set({
      past: [...past, entry].slice(-MAX_HISTORY),
      future: [],
      dirty: true,
    });
  };

  const touch = (net: PbtNetwork): PbtNetwork => ({
    ...net,
    meta: { ...net.meta, updatedAt: new Date().toISOString() },
  });

  const logEvent = (type: EventType, payload?: Record<string, unknown>) => {
    const event: LogEvent = {
      id: uid('ev'),
      type,
      at: new Date().toISOString(),
      sinceStartMs: Date.now() - SESSION_START,
      payload,
    };
    set((s) => ({ events: [...s.events, event].slice(-5000) }));
  };

  return {
    network: createNetwork(),
    snapshots: [],
    events: [],
    tool: 'add',
    selectedNodes: [],
    selectedEdge: null,
    pendingSource: null,
    past: [],
    future: [],
    dirty: false,
    hypothesis: false,

    setHypothesis: (on) => set({ hypothesis: on }),

    setTrial: (kind, id, trial) => {
      pushHistory('Record trial outcome');
      const testedAt = trial === 'adopted' || trial === 'ruledOut' ? new Date().toISOString() : undefined;
      const apply = <T extends { id: string }>(items: T[]) =>
        items.map((x) => (x.id === id ? { ...x, trial, testedAt } : x));
      set((s) => ({
        network: touch({
          ...s.network,
          nodes: kind === 'node' ? apply(s.network.nodes) : s.network.nodes,
          edges: kind === 'edge' ? apply(s.network.edges) : s.network.edges,
        }),
      }));
      logEvent('node.update', { id, trial });
    },

    setTool: (t) => set({ tool: t, pendingSource: null, selectedEdge: null }),
    select: (nodes, edge = null) => set({ selectedNodes: nodes, selectedEdge: edge }),
    clearSelection: () => set({ selectedNodes: [], selectedEdge: null }),
    setPendingSource: (id) => set({ pendingSource: id }),

    addNode: (opts) => {
      pushHistory('Add node');
      const node = createNode(opts);
      set((s) => ({ network: touch({ ...s.network, nodes: [...s.network.nodes, node] }) }));
      logEvent('node.create', { id: node.id, label: node.label, category: node.category });
      return node.id;
    },

    updateNode: (id, patch) => {
      pushHistory('Edit node');
      set((s) => ({
        network: touch({
          ...s.network,
          nodes: s.network.nodes.map((n) =>
            n.id === id
              ? {
                  ...n,
                  ...patch,
                  severity: 'severity' in patch ? clampRating(patch.severity) : n.severity,
                  frequency: 'frequency' in patch ? clampRating(patch.frequency) : n.frequency,
                  label: patch.label !== undefined ? patch.label.trim() || n.label : n.label,
                  updatedAt: new Date().toISOString(),
                }
              : n,
          ),
        }),
      }));
      logEvent('node.update', { id, ...patch });
    },

    /**
     * Dragging fires continuously, so history is only pushed when the drag ends.
     * Otherwise a single drag would fill the entire undo stack.
     */
    moveNode: (id, position, commit) => {
      if (commit) pushHistory('Move node');
      set((s) => ({
        network: {
          ...s.network,
          nodes: s.network.nodes.map((n) => (n.id === id ? { ...n, position } : n)),
        },
        dirty: true,
      }));
      if (commit) logEvent('node.move', { id, position });
    },

    deleteNode: (id) => {
      pushHistory('Delete node');
      set((s) => {
        const removedEdges = s.network.edges.filter((e) => e.source === id || e.target === id);
        const removedEdgeIds = new Set(removedEdges.map((e) => e.id));
        return {
          network: touch({
            ...s.network,
            nodes: s.network.nodes.filter((n) => n.id !== id),
            edges: s.network.edges.filter((e) => !removedEdgeIds.has(e.id)),
          }),
          selectedNodes: s.selectedNodes.filter((n) => n !== id),
        };
      });
      logEvent('node.delete', { id });
    },

    addEdge: (source, target, direction, strength, valence, trial) => {
      const { network } = get();
      // Duplicate edges in the same direction would double-count in every
      // analysis, so an existing edge is updated rather than duplicated.
      const existing = network.edges.find((e) => e.source === source && e.target === target);
      if (existing) {
        get().updateEdge(existing.id, { direction, strength, valence });
        return existing.id;
      }
      if (!network.nodes.some((n) => n.id === source) || !network.nodes.some((n) => n.id === target)) {
        return null;
      }
      pushHistory('Add connection');
      const edge = createEdge(source, target, direction, strength, valence, undefined, trial);
      set((s) => ({ network: touch({ ...s.network, edges: [...s.network.edges, edge] }) }));
      logEvent('edge.create', { id: edge.id, source, target, direction, strength, valence });
      return edge.id;
    },

    updateEdge: (id, patch) => {
      pushHistory('Edit connection');
      set((s) => ({
        network: touch({
          ...s.network,
          edges: s.network.edges.map((e) => {
            if (e.id !== id) return e;
            const direction = patch.direction ?? e.direction;
            const strength = patch.strength ?? e.strength;
            return {
              ...e,
              ...patch,
              direction,
              strength,
              // weight is derived, never set directly, so the two can never drift.
              weight: weightOf(direction, strength),
              updatedAt: new Date().toISOString(),
            };
          }),
        }),
      }));
      logEvent('edge.update', { id, ...patch });
    },

    deleteEdge: (id) => {
      pushHistory('Delete connection');
      set((s) => ({
        network: touch({ ...s.network, edges: s.network.edges.filter((e) => e.id !== id) }),
        selectedEdge: null,
      }));
      logEvent('edge.delete', { id });
    },

    setTitle: (title) => {
      set((s) => ({ network: touch({ ...s.network, meta: { ...s.network.meta, title } }), dirty: true }));
    },

    replaceNetwork: (net, label) => {
      pushHistory(label);
      set({ network: net, selectedNodes: [], selectedEdge: null });
      logEvent('network.import', { title: net.meta.title, nodes: net.nodes.length });
    },

    clearNetwork: () => {
      pushHistory('Clear network');
      const title = get().network.meta.title;
      set({ network: { ...createNetwork(title) }, selectedNodes: [], selectedEdge: null });
      logEvent('network.clear');
    },

    takeSnapshot: (label) => {
      const snap = createSnapshot(get().network, label);
      set((s) => ({ snapshots: [...s.snapshots, snap], dirty: true }));
      logEvent('snapshot.take', { id: snap.id, label: snap.label });
    },

    deleteSnapshot: (id) => set((s) => ({ snapshots: s.snapshots.filter((x) => x.id !== id), dirty: true })),

    restoreSnapshot: (id) => {
      const snap = get().snapshots.find((s) => s.id === id);
      if (!snap) return;
      pushHistory('Restore snapshot');
      set({ network: deepClone(snap.network), selectedNodes: [], selectedEdge: null });
    },

    undo: () => {
      const { past, future, network } = get();
      const previous = past[past.length - 1];
      if (!previous) return;
      set({
        network: previous.network,
        past: past.slice(0, -1),
        future: [{ network: deepClone(network), label: previous.label }, ...future].slice(0, MAX_HISTORY),
        selectedNodes: [],
        selectedEdge: null,
        dirty: true,
      });
    },

    redo: () => {
      const { past, future, network } = get();
      const next = future[0];
      if (!next) return;
      set({
        network: next.network,
        past: [...past, { network: deepClone(network), label: next.label }].slice(-MAX_HISTORY),
        future: future.slice(1),
        selectedNodes: [],
        selectedEdge: null,
        dirty: true,
      });
    },

    canUndo: () => get().past.length > 0,
    canRedo: () => get().future.length > 0,

    log: logEvent,
    markClean: () => set({ dirty: false }),
    hydrate: (state) =>
      set({
        network: state.network,
        snapshots: state.snapshots,
        past: [],
        future: [],
        dirty: false,
      }),
  };
});
