import { useCallback, useEffect, useRef, useState } from 'react';
import { Graph, type GraphApi } from './components/Graph';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Modal } from './components/Modal';
import { NodeEditor, EdgeEditor } from './components/Editors';
import { AnalysisPanel } from './components/AnalysisPanel';
import { GuidedMode } from './components/GuidedMode';
import { StructurePanel } from './components/StructurePanel';
import { SnapshotPanel } from './components/SnapshotPanel';
import { useStore, type Tool } from './state/store';
import { CATEGORY_META, type EemmCategory } from './model/eemm';
import { TRIAL_LABEL, TRIAL_STATES, type TrialState } from './model/types';
import { t } from './i18n/strings';
import { parseNetwork } from './model/schema';
import * as idb from './persistence/idb';
import { buildShareLink, readShareFromUrl, type ShareLink } from './persistence/share';
import { readStudyContext, syncToServer, flushOnUnload } from './study/study';
import { buildTemplate, listTemplates } from './templates/templates';
import {
  download,
  exportAdjacencyCsv,
  exportEdgeListCsv,
  exportEventsCsv,
  exportJson,
  exportNodeListCsv,
  exportReportMarkdown,
  safeFilename,
} from './export/exporters';

type Dialog =
  | { kind: 'none' }
  | { kind: 'newNode'; position: { x: number; y: number } }
  | { kind: 'editNode'; id: string }
  | { kind: 'newEdge'; source: string; target: string }
  | { kind: 'editEdge'; id: string }
  | { kind: 'templates' }
  | { kind: 'export' }
  | { kind: 'share' }
  | { kind: 'help' }
  | { kind: 'about' }
  | { kind: 'clear' }
  | { kind: 'trial'; elementKind: 'node' | 'edge'; id: string }
  | { kind: 'kernel' };

type SidePanel = 'none' | 'analysis' | 'structure' | 'snapshots';

const studyCtx = readStudyContext();

/** Shown in every tooltip so the shortcuts get learned by use, not by reading Help. */
const TOOL_KEY: Record<Tool, string> = {
  select: 'S',
  add: 'A',
  connect: 'C',
  delete: 'D, or Delete/Backspace to remove what is selected',
};

type Theme = 'light' | 'dark';

/**
 * Follows the operating system by default, because someone who has already told
 * their machine they want dark should not have to tell every app separately.
 * An explicit choice is remembered and wins over the system setting.
 */
function initialTheme(): Theme {
  // Both of these can throw or be missing: localStorage is unavailable in some
  // privacy modes, and matchMedia does not exist in every embedded webview.
  // Neither is worth blanking the entire app over.
  try {
    const saved = localStorage.getItem('pbt-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* storage blocked; fall through to the system preference */
  }
  const query = window.matchMedia?.('(prefers-color-scheme: dark)');
  return query?.matches ? 'dark' : 'light';
}

export default function App() {
  const s = t();
  const store = useStore();
  const {
    network,
    tool,
    setTool,
    pendingSource,
    setPendingSource,
  } = store;

  const [dialog, setDialog] = useState<Dialog>({ kind: 'none' });
  const [panel, setPanel] = useState<SidePanel>('none');
  const [guided, setGuided] = useState(false);
  const [highlight, setHighlight] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [showGrid, setShowGrid] = useState(() => {
    try {
      return localStorage.getItem('pbt-grid') === 'on';
    } catch {
      return false;
    }
  });
  // Which category the next new node should default to. Set by the dedicated
  // "Event / context" button so that adding context is one click, not a click
  // plus a hunt through a dropdown.
  // Context is the default because that is where a formulation usually starts:
  // the situation or event, then what it sets off.
  const [nextCategory, setNextCategory] = useState<EemmCategory>('context');
  /*
   * The category a plain "Add node" should start from. Defaults to Affect, the
   * first dimension in the EEMM ordering, then follows whatever
   * dimension they last chose: after a few nodes the tool matches their habit
   * instead of making them re-pick every time.
   */
  const [lastDimension, setLastDimension] = useState<EemmCategory>('affect');
  const [storage, setStorage] = useState<idb.StorageStatus>('unknown');
  const graphApi = useRef<GraphApi | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => idb.onStorageStatus(setStorage), []);

  useEffect(() => {
    try {
      localStorage.setItem('pbt-grid', showGrid ? 'on' : 'off');
    } catch {
      /* storage blocked; the setting still applies for this session */
    }
  }, [showGrid]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('pbt-theme', theme);
    } catch {
      /* storage blocked; the theme still applies for this session */
    }
  }, [theme]);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  }, []);

  const registerApi = useCallback((api: GraphApi) => {
    graphApi.current = api;
  }, []);

  const nodeLabel = useCallback(
    (id: string) => network.nodes.find((n) => n.id === id)?.label ?? '',
    [network.nodes],
  );

  // Load: a shared link wins over local storage, because someone who clicked a
  // link expects to see what was shared, not what they were last working on.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const shared = await readShareFromUrl();
      if (shared) {
        store.replaceNetwork(shared, 'Open shared network');
        notify('Opened a shared network. It has not overwritten your saved work.');
        return;
      }
      setStorage(await idb.probeStorage());
      const lastId = await idb.lastOpenedId();
      if (!lastId || cancelled) return;
      const net = await idb.loadNetwork(lastId);
      if (!net || cancelled) return;
      const snaps = await idb.listSnapshots(lastId);
      store.hydrate({ network: net, snapshots: snaps });
    })();
    return () => {
      cancelled = true;
    };
    // Intentionally once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave, debounced. Local only, and it is the reason closing the tab is safe.
  useEffect(() => {
    if (!store.dirty) return;
    const timer = setTimeout(async () => {
      await idb.saveNetwork(network);
      await idb.saveSnapshots(network.id, store.snapshots);
      store.markClean();
      if (studyCtx.active) void syncToServer(studyCtx, network, store.events);
    }, 800);
    return () => clearTimeout(timer);
  }, [network, store, store.dirty, store.snapshots]);

  useEffect(() => {
    if (!studyCtx.active) return;
    const handler = () => flushOnUnload(studyCtx, useStore.getState().network, useStore.getState().events);
    window.addEventListener('pagehide', handler);
    return () => window.removeEventListener('pagehide', handler);
  }, []);

  // Only when autosave is genuinely broken. A confirm-on-close prompt is
  // intrusive, and showing it when the work *is* saved would train people to
  // dismiss it without reading.
  useEffect(() => {
    if (storage !== 'unavailable') return;
    const handler = (e: BeforeUnloadEvent) => {
      if (useStore.getState().network.nodes.length === 0) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [storage]);

  // Keyboard shortcuts. Every tool is reachable without the mouse.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      // A dialog owns the keyboard while it is open. Without this, pressing a
      // number key on a focused dialog button silently switched the tool behind it.
      if (document.querySelector('.modal-backdrop')) return;
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        store.undo();
      } else if (meta && (e.key.toLowerCase() === 'y' || (e.key.toLowerCase() === 'z' && e.shiftKey))) {
        e.preventDefault();
        store.redo();
      } else if (!meta) {
        // Letters, because they are memorable in a way that 1-5 is not.
        const key = e.key.toLowerCase();
        if (key === 'c') {
          // If a box is already selected, arm it as the source so the very next
          // click completes the link. Re-picking the node you just clicked was
          // the most repetitive part of drawing a map.
          const selected = useStore.getState().selectedNodes[0];
          setTool('connect');
          setHighlight([]);
          if (selected) setPendingSource(selected);
          return;
        }
        if (key === 'a') {
          // A is Add node. It used to inherit whatever category was last armed,
          // so after using the Event button it silently kept making events.
          setTool('add');
          setNextCategory(lastDimension);
          setHighlight([]);
          return;
        }
        if (key === 'e') {
          setTool('add');
          setNextCategory('context');
          setHighlight([]);
          return;
        }
        const byKey: Record<string, Tool> = { s: 'select', d: 'delete' };
        const tl = byKey[key];
        if (tl) {
          setTool(tl);
          setHighlight([]);
          return;
        }
        if (key === 'g') {
          setShowGrid((v) => !v);
          return;
        }
        if (key === 'h') {
          store.setHypothesis(!store.hypothesis);
          return;
        }
        if (e.key.toLowerCase() === 'f') graphApi.current?.fit();
        else if (e.key.toLowerCase() === 'o') graphApi.current?.tidy();
        else if (e.key === 'Delete' || e.key === 'Backspace') {
          // Both, because which one a keyboard has depends on the machine.
          const { selectedNodes, selectedEdge } = useStore.getState();
          selectedNodes.forEach((id) => store.deleteNode(id));
          if (selectedEdge) store.deleteEdge(selectedEdge);
        } else if (e.key === 'Escape') {
          // First Escape abandons whatever is half-done. A second one, with
          // nothing left to cancel, drops back to Select so you can pan and
          // click around without reaching for the toolbar.
          const somethingInProgress = pendingSource !== null || highlight.length > 0;
          if (somethingInProgress) {
            setPendingSource(null);
            setHighlight([]);
          } else if (tool !== 'select') {
            setTool('select');
          }
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [store, setTool, setPendingSource, lastDimension, pendingSource, highlight.length, tool]);

  const onCanvasClick = (position: { x: number; y: number }) => {
    // Every formulation starts with a situation. On an empty canvas any click
    // creates the context box, whatever tool happens to be selected, so nobody
    // has to know which button to press before they can begin.
    if (network.nodes.length === 0) {
      setNextCategory('context');
      setDialog({ kind: 'newNode', position });
      return;
    }
    if (tool === 'add') {
      setDialog({ kind: 'newNode', position });
      return;
    }
    // Clicking empty space is the universal "never mind". It has to undo the
    // explore focus too, or the person is stuck looking at a greyed-out network.
    setPendingSource(null);
    setHighlight([]);
    store.clearSelection();
  };

  const onNodeClick = (id: string) => {
    if (tool === 'delete') {
      store.deleteNode(id);
      return;
    }
    if (tool === 'connect') {
      if (!pendingSource) setPendingSource(id);
      else if (pendingSource === id) setPendingSource(null);
      else {
        setDialog({ kind: 'newEdge', source: pendingSource, target: id });
        setPendingSource(null);
      }
      return;
    }
    // Select mode doubles as "explore": show only what this node touches, and
    // remember the selection so C can connect straight from it.
    store.select([id]);
    const touching = network.edges.filter((e) => e.source === id || e.target === id);
    setHighlight([id, ...touching.map((e) => e.id), ...touching.map((e) => (e.source === id ? e.target : e.source))]);
  };

  const onEdgeClick = (id: string) => {
    if (tool === 'delete') {
      store.deleteEdge(id);
      return;
    }
    // Select rather than edit, so an arrow behaves like a box: click to choose
    // (and Delete works on it), double-click to open. Editing on a single click
    // meant an arrow could never be selected, so Delete silently did nothing.
    const edge = network.edges.find((e) => e.id === id);
    store.select([], id);
    setHighlight(edge ? [id, edge.source, edge.target] : [id]);
  };

  const handleImportFile = async (file: File) => {
    try {
      const parsed = parseNetwork(JSON.parse(await file.text()));
      if (!parsed.ok || !parsed.network) {
        notify(parsed.error ?? 'Could not read that file.');
        return;
      }
      store.replaceNetwork(parsed.network, 'Import');
      notify(parsed.warnings.length > 0 ? parsed.warnings.join(' ') : 'Imported.');
    } catch {
      notify('That file is not valid JSON.');
    }
  };

  const editingNode = dialog.kind === 'editNode' ? network.nodes.find((n) => n.id === dialog.id) : undefined;
  const editingEdge = dialog.kind === 'editEdge' ? network.edges.find((e) => e.id === dialog.id) : undefined;

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <strong>{s.appShort}</strong>
          <input
            className="title-input"
            value={network.meta.title}
            onChange={(e) => store.setTitle(e.target.value)}
            aria-label="Network title"
          />
        </div>

        {storage === 'unavailable' ? (
          <div
            className="privacy-badge danger"
            title="This browser is not letting the page save anything, which usually happens when an HTML file is opened directly from disk, or in a private window. Your work is still private, but it will be lost when you close the tab. Use Export to keep it."
          >
            ⚠ Autosave unavailable — export to keep your work
          </div>
        ) : (
          <div className="privacy-badge" title={studyCtx.active ? s.privacy.studyModeLong : s.privacy.localOnlyLong}>
            {studyCtx.active ? `⬤ ${s.privacy.studyMode}` : `⬤ ${s.privacy.localOnly}`}
          </div>
        )}
      </header>

      {/* Three columns, two rows. Left is what you do to the drawing, middle is
          what you do with the mouse, right is what you do with the finished map.
          Grouping by purpose rather than by frequency means the position of a
          button can be remembered. */}
      <div className="toolbar" role="toolbar" aria-label="Tools">
        <div className="tb-col tb-left">
          <div className="tb-row">
            <button className="btn" onClick={store.undo} disabled={!store.canUndo()} title="Undo (Ctrl/Cmd+Z)">
              ↶ Undo
            </button>
            <button className="btn" onClick={store.redo} disabled={!store.canRedo()} title="Redo (Ctrl/Cmd+Y)">
              ↷ Redo
            </button>
            <button className="btn" onClick={() => graphApi.current?.fit()} title="Fit everything on screen (F)">
              Fit view
            </button>
            <button
              className="btn"
              onClick={() => graphApi.current?.tidy()}
              title="Snap the boxes into rows and columns that follow the arrows (O)"
            >
              Organise
            </button>
            <button className="btn" onClick={() => setDialog({ kind: 'clear' })} title="Remove everything">
              Clear
            </button>
          </div>
          <div className="tb-row">
            <button
              className={`btn${showGrid ? ' active' : ''}`}
              onClick={() => setShowGrid(!showGrid)}
              title="Show a grid and snap boxes to it (G)"
            >
              # Grid
            </button>
          </div>
        </div>

        <div className="tb-col tb-centre">
          <div className="tb-row">
            <button
              className={`btn tool-btn${tool === 'select' ? ' active' : ''}`}
              onClick={() => {
                setTool('select');
                setHighlight([]);
              }}
              aria-pressed={tool === 'select'}
              title="Select (S)"
            >
              {s.tool.select}
            </button>
            <button
              className={`btn tool-btn context-btn${tool === 'add' && nextCategory === 'context' ? ' active' : ''}`}
              onClick={() => {
                setTool('add');
                setNextCategory('context');
                setHighlight([]);
              }}
              aria-pressed={tool === 'add' && nextCategory === 'context'}
              title="Add an event or context (E)"
            >
              Event / context
            </button>
            <button
              className={`btn tool-btn${tool === 'add' && nextCategory !== 'context' ? ' active' : ''}`}
              onClick={() => {
                setTool('add');
                setNextCategory(lastDimension);
                setHighlight([]);
              }}
              aria-pressed={tool === 'add' && nextCategory !== 'context'}
              title="Add a process (A)"
            >
              {s.tool.add}
            </button>
            {(['connect', 'delete'] as Tool[]).map((tl) => (
              <button
                key={tl}
                className={`btn tool-btn${tool === tl ? ' active' : ''}`}
                onClick={() => {
                  const selected = store.selectedNodes[0];
                  setTool(tl);
                  setHighlight([]);
                  if (tl === 'connect' && selected) setPendingSource(selected);
                }}
                aria-pressed={tool === tl}
                title={`${s.tool[tl]} (${TOOL_KEY[tl]})`}
              >
                {s.tool[tl]}
              </button>
            ))}
          </div>
          <div className="tb-row">
            <button
              className={`btn hypothesis-btn${store.hypothesis ? ' active' : ''}`}
              onClick={() => {
                const on = !store.hypothesis;
                store.setHypothesis(on);
                if (on) {
                  setPanel('analysis');
                  notify('Hypothesis on. Anything you add now is a proposal, drawn dashed.');
                }
              }}
              aria-pressed={store.hypothesis}
              title="Add something you are considering and see what it would change (H)"
            >
              ⌕ Hypothesis
            </button>
            <button className="btn" onClick={() => setDialog({ kind: 'kernel' })} title="Treatment kernels (in development)">
              ⬡ Kernel
            </button>
            <button
              className={`btn${panel === 'analysis' ? ' active' : ''}`}
              onClick={() => setPanel(panel === 'analysis' ? 'none' : 'analysis')}
              title="Centrality, feedback loops, pathways and leverage"
            >
              {s.action.analyse}
            </button>
            <button
              className={`btn${panel === 'snapshots' ? ' active' : ''}`}
              onClick={() => setPanel(panel === 'snapshots' ? 'none' : 'snapshots')}
              title="Save this map as a timepoint and compare later"
            >
              {s.action.snapshots}
            </button>
          </div>
        </div>

        <div className="tb-col tb-right">
          <div className="tb-row">
            <button className="btn" onClick={() => fileInput.current?.click()} title="Load a saved file">
              Import
            </button>
            <button className="btn" onClick={() => setDialog({ kind: 'export' })} title="Save as image, PDF, JSON or CSV">
              Export
            </button>
            <button className="btn" onClick={() => setDialog({ kind: 'share' })} title="Get a link to this map">
              Share link
            </button>
            <button className="btn" onClick={() => setDialog({ kind: 'help' })} title="How to use this">
              Help
            </button>
            <button className="btn" onClick={() => setDialog({ kind: 'about' })}>
              About
            </button>
            <button
              className="btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? '☀ Light' : '☾ Dark'}
            </button>
          </div>
          <div className="tb-row">
            <button className="btn" onClick={() => setDialog({ kind: 'templates' })} title="Start from an example">
              Templates
            </button>
            <button className={`btn${guided ? ' active' : ''}`} onClick={() => setGuided(!guided)} title="Step-by-step build">
              {s.action.guided}
            </button>
          </div>
        </div>
      </div>

      <p className="tool-hint" role="status">
        {network.nodes.length === 0 && (
          <strong>Start with the event or situation this is about. Click anywhere. </strong>
        )}
        {highlight.length > 0 && (
          <>
            <button className="btn btn-small" onClick={() => setHighlight([])}>
              Show everything again
            </button>{' '}
            Focused on part of the network.{' '}
          </>
        )}
        {s.toolHint[tool]}
        {pendingSource && ` Source: ${nodeLabel(pendingSource)}. Now click the node it influences.`}

      </p>

      <main className="workspace">
        <ErrorBoundary
          fallbackTitle="The drawing canvas could not start"
          fallbackHint="This usually means graphics acceleration is unavailable on this machine. Your network is safe. Open List view to read and edit it as text, and Export to get it out."
        >
          <Graph
            theme={theme}
            showGrid={showGrid}
            selected={{ nodes: store.selectedNodes, edge: store.selectedEdge }}
            onCanvasClick={onCanvasClick}
            onNodeClick={onNodeClick}
            onNodeDoubleClick={(id) => {
              // A box being trialled opens its trial record instead of the
              // ordinary editor: while something is under test, "what happened
              // with this?" is the question you have.
              const n = network.nodes.find((x) => x.id === id);
              setDialog(n?.trial ? { kind: 'trial', elementKind: 'node', id } : { kind: 'editNode', id });
            }}
            onEdgeClick={onEdgeClick}
            onEdgeDoubleClick={(id) => {
              const e = network.edges.find((x) => x.id === id);
              setDialog(e?.trial ? { kind: 'trial', elementKind: 'edge', id } : { kind: 'editEdge', id });
            }}
            highlight={highlight}
            registerApi={registerApi}
          />
        </ErrorBoundary>

        {guided && <GuidedMode onClose={() => setGuided(false)} />}

        {panel !== 'none' && (
          <aside className="side-panel" aria-label={panel}>
            <div className="side-head">
              <h2>
                {panel === 'analysis' ? s.analysis.title : panel === 'snapshots' ? s.action.snapshots : 'List view'}
              </h2>
              <button className="icon-btn" onClick={() => setPanel('none')} aria-label="Close panel">
                ✕
              </button>
            </div>
            {panel === 'analysis' && <AnalysisPanel onHighlight={setHighlight} />}
            {panel === 'snapshots' && <SnapshotPanel />}
            {panel === 'structure' && (
              <StructurePanel
                onEditNode={(id) => setDialog({ kind: 'editNode', id })}
                onEditEdge={(id) => setDialog({ kind: 'editEdge', id })}
                onHighlight={setHighlight}
              />
            )}
          </aside>
        )}
      </main>

      <input
        ref={fileInput}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleImportFile(f);
          e.target.value = '';
        }}
      />

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}

      {dialog.kind === 'newNode' && (
        <NodeEditor
          title={nextCategory === 'context' ? 'New event or context' : 'New node'}
          initial={{ category: nextCategory }}
          onCancel={() => setDialog({ kind: 'none' })}
          onSave={(v) => {
            if (!CATEGORY_META[v.category].isContext && v.category !== 'uncategorised') {
              setLastDimension(v.category);
            }
            const id = store.addNode({
              label: v.label,
              category: v.category,
              position: dialog.position,
              trial: store.hypothesis ? ('proposed' as const) : undefined,
            });
            if (v.severity !== undefined || v.frequency !== undefined || v.notes) {
              store.updateNode(id, { severity: v.severity, frequency: v.frequency, notes: v.notes });
            }
            setDialog({ kind: 'none' });
          }}
        />
      )}

      {editingNode && (
        <NodeEditor
          title="Edit node"
          initial={editingNode}
          onCancel={() => setDialog({ kind: 'none' })}
          onSave={(v) => {
            store.updateNode(editingNode.id, v);
            setDialog({ kind: 'none' });
          }}
        />
      )}

      {dialog.kind === 'newEdge' && (
        <EdgeEditor
          sourceLabel={nodeLabel(dialog.source)}
          targetLabel={nodeLabel(dialog.target)}
          onCancel={() => setDialog({ kind: 'none' })}
          onSave={(v) => {
            store.addEdge(
              dialog.source,
              dialog.target,
              v.direction,
              v.strength,
              v.valence,
              store.hypothesis ? ('proposed' as const) : undefined,
            );
            setDialog({ kind: 'none' });
          }}
        />
      )}

      {editingEdge && (
        <EdgeEditor
          // Without a key tied to the edge id, switching to the alternate
          // direction (via the "Edit X -> Y" link below) reuses this same
          // component instance instead of remounting it. Its internal
          // direction/strength/valence state then keeps whatever was last
          // clicked on the *previous* edge instead of resetting to the new
          // edge's actual saved values — so the dialog silently shows and
          // can save the wrong direction's data. This is what made both
          // directions of a reciprocal link end up with the same strength.
          key={editingEdge.id}
          sourceLabel={nodeLabel(editingEdge.source)}
          targetLabel={nodeLabel(editingEdge.target)}
          initial={editingEdge}
          alternate={(() => {
            const back = network.edges.find(
              (x) => x.source === editingEdge.target && x.target === editingEdge.source,
            );
            return back
              ? { id: back.id, sourceLabel: nodeLabel(back.source), targetLabel: nodeLabel(back.target) }
              : undefined;
          })()}
          onSwitchTo={(id) => setDialog({ kind: 'editEdge', id })}
          onDelete={() => {
            store.deleteEdge(editingEdge.id);
            setDialog({ kind: 'none' });
          }}
          onCancel={() => setDialog({ kind: 'none' })}
          onSave={(v) => {
            store.updateEdge(editingEdge.id, v);
            setDialog({ kind: 'none' });
          }}
        />
      )}


      {dialog.kind === 'templates' && (
        <Modal title={s.action.templates} onClose={() => setDialog({ kind: 'none' })}>
          <p className="muted small">
            Starting points, not formulations. Replace the labels with the person's own words, and delete
            anything that does not fit. A template that goes unchallenged is worse than a blank canvas.
          </p>
          <ul className="template-list">
            {listTemplates().map((tpl) => (
              <li key={tpl.id}>
                <button
                  className="struct-item"
                  onClick={() => {
                    const net = buildTemplate(tpl.id);
                    if (net) store.replaceNetwork(net, 'Load template');
                    setDialog({ kind: 'none' });
                    setTimeout(() => graphApi.current?.fit(), 100);
                  }}
                >
                  <span className="struct-label">{tpl.name}</span>
                  <span className="muted small">{tpl.description}</span>
                </button>
              </li>
            ))}
          </ul>
        </Modal>
      )}

      {dialog.kind === 'export' && (
        <Modal title={s.action.export} onClose={() => setDialog({ kind: 'none' })}>
          <p className="muted small">
            The CSV formats load straight into R or Python. The adjacency matrix is what qgraph, igraph and
            networkx expect as input.
          </p>
          <div className="export-grid">
            {(
              [
                ['Network (JSON)', () => download(`${safeFilename(network.meta.title)}.json`, exportJson(network), 'application/json')],
                ['Edge list (CSV)', () => download(`${safeFilename(network.meta.title)}_edges.csv`, exportEdgeListCsv(network), 'text/csv')],
                ['Node list (CSV)', () => download(`${safeFilename(network.meta.title)}_nodes.csv`, exportNodeListCsv(network), 'text/csv')],
                ['Adjacency matrix (CSV)', () => download(`${safeFilename(network.meta.title)}_matrix.csv`, exportAdjacencyCsv(network), 'text/csv')],
                ['Analysis report (Markdown)', () => download(`${safeFilename(network.meta.title)}_report.md`, exportReportMarkdown(network), 'text/markdown')],
                ['Build log (CSV)', () => download(`${safeFilename(network.meta.title)}_events.csv`, exportEventsCsv(store.events), 'text/csv')],
                ['Image (PNG)', () => {
                  const url = graphApi.current?.pngDataUrl({ blackAndWhite: false, scale: 2 });
                  if (url) {
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${safeFilename(network.meta.title)}.png`;
                    a.click();
                  }
                }],
                ['Vector (SVG)', () => {
                  const svg = graphApi.current?.svg();
                  if (svg) download(`${safeFilename(network.meta.title)}.svg`, svg, 'image/svg+xml');
                }],
                ['Print / PDF', () => graphApi.current?.print(network.meta.title)],
              ] as [string, () => void][]
            ).map(([label, fn]) => (
              <button key={label} className="btn" onClick={fn}>
                {label}
              </button>
            ))}
          </div>
        </Modal>
      )}

      {dialog.kind === 'share' && <ShareDialog onClose={() => setDialog({ kind: 'none' })} />}

      {dialog.kind === 'clear' && (
        <Modal
          title="Clear this network?"
          onClose={() => setDialog({ kind: 'none' })}
          footer={
            <>
              <button className="btn" onClick={() => setDialog({ kind: 'none' })}>
                {s.action.cancel}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  store.clearNetwork();
                  setDialog({ kind: 'none' });
                }}
              >
                Clear everything
              </button>
            </>
          }
        >
          <p>
            This removes all {network.nodes.length} nodes and {network.edges.length} connections. You can undo
            it, and any saved timepoints are kept.
          </p>
        </Modal>
      )}

      {dialog.kind === 'trial' && (
        <TrialDialog
          label={
            dialog.elementKind === 'node'
              ? (network.nodes.find((n) => n.id === dialog.id)?.label ?? '')
              : (() => {
                  const e = network.edges.find((x) => x.id === dialog.id);
                  return e ? `${nodeLabel(e.source)} → ${nodeLabel(e.target)}` : '';
                })()
          }
          current={
            dialog.elementKind === 'node'
              ? network.nodes.find((n) => n.id === dialog.id)?.trial
              : network.edges.find((e) => e.id === dialog.id)?.trial
          }
          testedAt={
            dialog.elementKind === 'node'
              ? network.nodes.find((n) => n.id === dialog.id)?.testedAt
              : network.edges.find((e) => e.id === dialog.id)?.testedAt
          }
          onCancel={() => setDialog({ kind: 'none' })}
          onSave={(trial) => {
            store.setTrial(dialog.elementKind, dialog.id, trial);
            setDialog({ kind: 'none' });
          }}
        />
      )}

      {dialog.kind === 'kernel' && <KernelDialog onClose={() => setDialog({ kind: 'none' })} />}

      {dialog.kind === 'help' && (
        <HelpDialog
          onClose={() => setDialog({ kind: 'none' })}
          onOpenList={() => {
            setDialog({ kind: 'none' });
            setPanel('structure');
          }}
        />
      )}
      {dialog.kind === 'about' && <AboutDialog onClose={() => setDialog({ kind: 'none' })} />}
    </div>
  );
}

function ShareDialog({ onClose }: { onClose: () => void }) {
  const network = useStore((s) => s.network);
  const [copied, setCopied] = useState(false);
  // Compressing the payload is asynchronous (CompressionStream), so the link
  // arrives a tick after the dialog opens rather than during render.
  const [link, setLink] = useState<ShareLink | null>(null);
  useEffect(() => {
    let cancelled = false;
    buildShareLink(network).then((l) => {
      if (!cancelled) setLink(l);
    });
    return () => {
      cancelled = true;
    };
  }, [network]);

  return (
    <Modal title="Share link" onClose={onClose} wide>
      <p className="muted small">
        The whole network is encoded in the link itself. There is no server copy, and the part carrying your
        content is never sent in the web request, so nothing is stored or logged anywhere. Anyone with the
        link can open and edit their own copy.
      </p>
      {!link ? (
        <p className="muted small">Building the link…</p>
      ) : link.tooLong ? (
        <p className="warn-box">
          This network is too large for a link ({link.length} characters). Export it as JSON and send the file
          instead.
        </p>
      ) : (
        <>
          <textarea readOnly value={link.url} rows={4} className="share-box" onFocus={(e) => e.currentTarget.select()} />
          <button
            className="btn btn-primary"
            onClick={async () => {
              await navigator.clipboard?.writeText(link.url);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </>
      )}
    </Modal>
  );
}

function HelpDialog({ onClose, onOpenList }: { onClose: () => void; onOpenList: () => void }) {
  return (
    <Modal title="How to use this" onClose={onClose} wide>
      <h3>Building a map</h3>
      <ul>
        <li>
          <strong>Event / context</strong> — the situation this is about. Start here; on an empty canvas any
          click creates one. It gets a rounded box, because it is not something the person is doing.
        </li>
        <li>
          <strong>Add node</strong> — a process: a thought, feeling, urge, or action. Square box, coloured by
          its EEMM category.
        </li>
        <li>
          <strong>Connect</strong> — click the influencing box, then the one it influences. Then pick, in one
          click, whether it increases or decreases it and by how much.
        </li>
        <li>
          <strong>Delete</strong> — click any box or arrow. Or select something and press Delete.
        </li>
        <li>Double-click a box to edit it. Drag to move, in any mode.</li>
      </ul>

      <h3>Reading the picture</h3>
      <ul>
        <li>
          A <strong>filled</strong> arrowhead means increases; a <strong>hollow</strong> one means decreases.
          Thicker lines with bigger heads are stronger influences. No numbers, and no reliance on colour.
        </li>
        <li>A line with a head at both ends means the two influence each other.</li>
        <li>Square boxes are processes; rounded boxes are events or contexts.</li>
        <li>
          Arrows are black unless you have marked a link as helping (green) or not helping (red). Most links
          stay black: the marking is there for when you are testing whether something new breaks a loop.
        </li>
      </ul>

      <h3>Keyboard</h3>
      <ul>
        <li>
          <kbd>S</kbd> select · <kbd>E</kbd> event/context · <kbd>A</kbd> add node · <kbd>C</kbd> connect ·{' '}
          <kbd>D</kbd> delete
        </li>
        <li>
          Select a box then press <kbd>C</kbd> and your next click finishes the link.
        </li>
        <li>
          <kbd>Delete</kbd> or <kbd>Backspace</kbd> removes what is selected.
        </li>
        <li>
          <kbd>Esc</kbd> cancels what you are doing. Press it again to return to Select.
        </li>
        <li>
          <kbd>F</kbd> fit view · <kbd>O</kbd> organise · <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>Z</kbd> undo
        </li>
      </ul>

      <h3>Organise</h3>
      <p>
        Snaps the boxes into rows and columns that follow the arrows, with the main context at the leading
        edge. It tries the layout both across and down and keeps whichever fits your screen better. Feedback
        loops are ignored when deciding the order, so they read as loops rather than scrambling the sequence.
      </p>

      <h3>Without a mouse</h3>
      <p>
        List view shows the whole map as text you can move through with Tab and edit from the keyboard. It is
        also what a screen reader reads, since a canvas is invisible to one.
      </p>
      <button className="btn" onClick={onOpenList}>
        Open list view
      </button>

      <h3>A caution about the analysis</h3>
      <p>
        Centrality, loops and leverage describe the map that was drawn, not the person. They assume influence
        is linear and immediate, which it is not. They are a structured way to interrogate your own thinking,
        and they are worth exactly as much as the ratings they were built from.
      </p>
    </Modal>
  );
}

function TrialDialog({
  label,
  current,
  testedAt,
  onCancel,
  onSave,
}: {
  label: string;
  current?: TrialState;
  testedAt?: string;
  onCancel: () => void;
  onSave: (trial: TrialState | undefined) => void;
}) {
  const [choice, setChoice] = useState<TrialState>(current ?? 'proposed');
  return (
    <Modal
      title="What happened with this?"
      onClose={onCancel}
      footer={
        <>
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={() => onSave(choice)}>
            Save
          </button>
        </>
      }
    >
      <p className="sentence">
        <strong>{label}</strong>
      </p>
      {testedAt && <p className="muted small">Last recorded {new Date(testedAt).toLocaleString()}</p>}

      <fieldset className="field">
        <legend>Where has this got to?</legend>
        <div className="trial-options">
          {TRIAL_STATES.map((state) => (
            <label key={state} className={`trial-option${choice === state ? ' active' : ''}`}>
              <input type="radio" name="trial" checked={choice === state} onChange={() => setChoice(state)} />
              <span>
                <strong>{TRIAL_LABEL[state]}</strong>
                <small>
                  {state === 'proposed'
                    ? 'Still an idea. Drawn dashed, and left out of the baseline the comparison measures against.'
                    : state === 'adopted'
                      ? 'It worked. It becomes part of the map and is drawn like everything else.'
                      : 'It did not work. Kept but faded, so you can see what has already been tried.'}
                </small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <button className="btn btn-small" onClick={() => onSave(undefined)}>
        Not a trial at all — make it an ordinary part of the map
      </button>
    </Modal>
  );
}

function KernelDialog({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Treatment kernels" onClose={onClose}>
      <p className="warn-box">In development. Nothing behind this button yet.</p>
      <p>
        The plan is a vocabulary of treatment kernels: the smallest units of therapeutic change, in language
        consistent enough to attach to the processes on a map. Pick a process, and see which kernels are
        known to act on it.
      </p>
      <p>
        The hard part is deciding what counts as one kernel and how finely to split them, and that is not
        settled yet.
      </p>
      <p>
        If you have ideas about how this database should be organised, Kean would like to hear them:{' '}
        <a href="mailto:xiangtks@gmail.com">xiangtks@gmail.com</a>.
      </p>
    </Modal>
  );
}

function AboutDialog({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="About" onClose={onClose} wide>
      <p>
        A free, open-source tool for mapping process-based networks: the functional relationships between
        the processes that maintain psychological suffering and wellbeing.
      </p>

      <h3>Grounding</h3>
      <p>
        The categories and the way this tool thinks about processes come from the Extended Evolutionary
        Meta-Model set out in the process-based therapy work of <strong>Steven C. Hayes and Stefan G.
        Hofmann</strong>: affect, cognition, attention, self, motivation and overt behaviour, situated in
        biophysiological and sociocultural levels, and always read in context.
      </p>
      <p>
        The idea of doing this in a browser was inspired by Joseph Ciarrochi&apos;s{' '}
        <a href="https://plan9.netlify.app" target="_blank" rel="noreferrer">
          plan9.netlify.app
        </a>
        .
      </p>
      <h3>Who made this</h3>
      <p>
        Tan Kean Sian conceived this tool and directed its development; all the code was written with Claude,
        Anthropic&apos;s AI assistant. Questions, or suggestions for improving it, are welcome at{' '}
        <a href="mailto:xiangtks@gmail.com">xiangtks@gmail.com</a>.
      </p>

      <h3>Where your data lives</h3>
      <p>
        In your browser, and nowhere else. No account, no server, no analytics. Clearing your browser data
        deletes your maps, so export anything you want to keep. Share links carry the map inside the link
        itself rather than uploading it anywhere.
      </p>

      <p className="muted small">MIT licensed. Contributions welcome.</p>
    </Modal>
  );
}
