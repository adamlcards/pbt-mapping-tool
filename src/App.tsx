import { useCallback, useEffect, useRef, useState } from 'react';
import { Graph, type GraphApi, type EdgeColourMode } from './components/Graph';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Modal } from './components/Modal';
import { NodeEditor, EdgeEditor } from './components/Editors';
import { AnalysisPanel } from './components/AnalysisPanel';
import { GuidedMode } from './components/GuidedMode';
import { StructurePanel } from './components/StructurePanel';
import { SnapshotPanel } from './components/SnapshotPanel';
import { useStore, type Tool } from './state/store';
import { CATEGORY_META, type EemmCategory } from './model/eemm';
import { TRIAL_STATES, trialHint, trialLabel, type TrialState } from './model/types';
import { fmt, plural } from './i18n/strings';
import { useStrings, useLocale, LOCALES, type LocaleCode } from './i18n';
import { LanguageDialog } from './components/LanguageDialog';
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
  | { kind: 'kernel' }
  | { kind: 'language' };

type SidePanel = 'none' | 'analysis' | 'structure' | 'snapshots';

const studyCtx = readStudyContext();

/**
 * Shown in every tooltip so the shortcuts get learned by use, not by reading
 * Help. The letters are the physical keys and are the same in every language;
 * Delete's longer explanation is translated at the point of use.
 */
const TOOL_KEY: Record<Tool, string> = {
  select: 'S',
  add: 'A',
  connect: 'C',
  delete: 'D',
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
  const s = useStrings();
  const locale = useLocale((st) => st.code);
  const setLocale = useLocale((st) => st.setLocale);
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
  /**
   * What arrow colour means, and whether ratings are printed on the boxes.
   * Both are display preferences, not data, so they live in localStorage rather
   * than in the network: two people opening the same shared map should each see
   * it the way they set their own tool up.
   */
  const [edgeColour, setEdgeColour] = useState<EdgeColourMode>(() => {
    try {
      return localStorage.getItem('pbt-edge-colour') === 'direction' ? 'direction' : 'valence';
    } catch {
      return 'valence';
    }
  });
  const [showMetrics, setShowMetrics] = useState(() => {
    try {
      return localStorage.getItem('pbt-metrics') === 'on';
    } catch {
      return false;
    }
  });
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
    try {
      localStorage.setItem('pbt-edge-colour', edgeColour);
      localStorage.setItem('pbt-metrics', showMetrics ? 'on' : 'off');
    } catch {
      /* storage blocked; the settings still apply for this session */
    }
  }, [edgeColour, showMetrics]);

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
        notify(s.toast.sharedOpened);
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
      } else if (meta && e.key.toLowerCase() === 'c') {
        // Only intercept when boxes are actually selected. Otherwise Ctrl+C has
        // to keep meaning "copy the text I have highlighted", which is what
        // someone reading the analysis panel expects it to do.
        if (useStore.getState().selectedNodes.length === 0) return;
        e.preventDefault();
        const n = store.copySelection();
        notify(plural({ one: s.toast.copied_one, other: s.toast.copied_other }, n));
      } else if (meta && e.key.toLowerCase() === 'v') {
        if (!useStore.getState().clipboard) return;
        e.preventDefault();
        const pasted = store.pasteClipboard();
        if (pasted.length > 0) {
          setTool('select');
          setHighlight([]);
          notify(plural({ one: s.toast.pasted_one, other: s.toast.pasted_other }, pasted.length));
        }
      } else if (meta && e.key.toLowerCase() === 'd') {
        // Duplicate in place: copy and paste in one keystroke, which is the
        // actual gesture most of the time.
        if (useStore.getState().selectedNodes.length === 0) return;
        e.preventDefault();
        if (store.copySelection() === 0) return;
        const pasted = store.pasteClipboard();
        notify(plural({ one: s.toast.duplicated_one, other: s.toast.duplicated_other }, pasted.length));
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
        if (key === 'm') {
          setShowMetrics((v) => !v);
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
  }, [store, setTool, setPendingSource, lastDimension, pendingSource, highlight.length, tool, notify]);

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

  const onNodeClick = (id: string, additive = false) => {
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
    // Shift builds a set instead of replacing one, which is what makes copy
    // worth having: a formulation is copied a cluster at a time, not a box at
    // a time. Clicking an already-selected box with Shift removes it, so a
    // mis-click costs one click rather than starting the selection over.
    if (additive) {
      const current = useStore.getState().selectedNodes;
      const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
      store.select(next);
      // Explore-focus is a single-node idea. With several boxes chosen it would
      // grey out most of the map for no benefit, so multi-select drops it.
      setHighlight([]);
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
        notify(parsed.error ?? s.toast.importUnreadable);
        return;
      }
      store.replaceNetwork(parsed.network, 'Import');
      notify(parsed.warnings.length > 0 ? parsed.warnings.join(' ') : s.toast.imported);
    } catch {
      notify(s.toast.importNotJson);
    }
  };

  const editingNode = dialog.kind === 'editNode' ? network.nodes.find((n) => n.id === dialog.id) : undefined;
  const editingEdge = dialog.kind === 'editEdge' ? network.edges.find((e) => e.id === dialog.id) : undefined;

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <strong>{s.app.short}</strong>
          <input
            className="title-input"
            value={network.meta.title}
            onChange={(e) => store.setTitle(e.target.value)}
            aria-label={s.app.networkTitleLabel}
          />
        </div>

        {storage === 'unavailable' ? (
          <div
            className="privacy-badge danger"
            title={s.privacy.autosaveUnavailableLong}
          >
            ⚠ {s.privacy.autosaveUnavailable}
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
      <div className="toolbar" role="toolbar" aria-label={s.a11y.toolbar}>
        <div className="tb-col tb-left">
          <div className="tb-row">
            <button className="btn" onClick={store.undo} disabled={!store.canUndo()} title={s.tooltip.undo}>
              ↶ {s.action.undo}
            </button>
            <button className="btn" onClick={store.redo} disabled={!store.canRedo()} title={s.tooltip.redo}>
              ↷ {s.action.redo}
            </button>
            <button className="btn" onClick={() => graphApi.current?.tidy()} title={s.tooltip.organise}>
              {s.action.organise}
            </button>
            <button className="btn" onClick={() => setDialog({ kind: 'clear' })} title={s.tooltip.clear}>
              {s.action.clear}
            </button>
          </div>
          {/* Everything here changes only how the map is displayed to you, not
              the map itself — which is why Fit view sits with the toggles and
              not with Undo/Organise/Clear above. Splitting the two rows by that
              rule also happens to balance their widths, and an unbalanced pair
              is what made the toolbar sprawl once the labels were translated:
              a column is as wide as its widest row, so slack in the short row
              is wasted space. */}
          <div className="tb-row">
            <button className="btn" onClick={() => graphApi.current?.fit()} title={s.tooltip.fit}>
              {s.action.fit}
            </button>
            <button
              className={`btn${showGrid ? ' active' : ''}`}
              onClick={() => setShowGrid(!showGrid)}
              title={s.tooltip.grid}
            >
              # {s.action.grid}
            </button>
            <button
              className={`btn${edgeColour === 'direction' ? ' active' : ''}`}
              onClick={() => setEdgeColour(edgeColour === 'direction' ? 'valence' : 'direction')}
              aria-pressed={edgeColour === 'direction'}
              title={edgeColour === 'direction' ? s.tooltip.colourIsDirection : s.tooltip.colourIsValence}
            >
              ⇅ {edgeColour === 'direction' ? s.action.colourByDirection : s.action.colourByValence}
            </button>
            <button
              className={`btn${showMetrics ? ' active' : ''}`}
              onClick={() => setShowMetrics(!showMetrics)}
              aria-pressed={showMetrics}
              title={s.tooltip.ratings}
            >
              ⊞ {s.action.ratings}
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
              title={fmt(s.tooltip.toolWithKey, { tool: s.tool.select, key: TOOL_KEY.select })}
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
              title={fmt(s.tooltip.toolWithKey, { tool: s.tooltip.addEvent, key: 'E' })}
            >
              {s.tool.event}
            </button>
            <button
              className={`btn tool-btn${tool === 'add' && nextCategory !== 'context' ? ' active' : ''}`}
              onClick={() => {
                setTool('add');
                setNextCategory(lastDimension);
                setHighlight([]);
              }}
              aria-pressed={tool === 'add' && nextCategory !== 'context'}
              title={fmt(s.tooltip.toolWithKey, { tool: s.tooltip.addProcess, key: TOOL_KEY.add })}
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
                title={fmt(s.tooltip.toolWithKey, {
                  tool: s.tool[tl],
                  key: tl === 'delete' ? s.tooltip.deleteKeyHint : TOOL_KEY[tl],
                })}
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
                  notify(s.toast.hypothesisOn);
                }
              }}
              aria-pressed={store.hypothesis}
              title={s.tooltip.hypothesis}
            >
              ⌕ {s.action.hypothesis}
            </button>
            <button className="btn" onClick={() => setDialog({ kind: 'kernel' })} title={s.tooltip.kernel}>
              ⬡ {s.action.kernel}
            </button>
            <button
              className={`btn${panel === 'analysis' ? ' active' : ''}`}
              onClick={() => setPanel(panel === 'analysis' ? 'none' : 'analysis')}
              title={s.tooltip.analyse}
            >
              {s.action.analyse}
            </button>
            <button
              className={`btn${panel === 'snapshots' ? ' active' : ''}`}
              onClick={() => setPanel(panel === 'snapshots' ? 'none' : 'snapshots')}
              title={s.tooltip.snapshots}
            >
              {s.action.snapshots}
            </button>
          </div>
        </div>

        <div className="tb-col tb-right">
          {/* Where a map comes from and where it goes: load one, save one, send
              one, or start from a worked example. */}
          <div className="tb-row">
            <button className="btn" onClick={() => fileInput.current?.click()} title={s.tooltip.import}>
              {s.action.import}
            </button>
            <button className="btn" onClick={() => setDialog({ kind: 'export' })} title={s.tooltip.export}>
              {s.action.export}
            </button>
            <button className="btn" onClick={() => setDialog({ kind: 'share' })} title={s.tooltip.share}>
              {s.action.share}
            </button>
            <button className="btn" onClick={() => setDialog({ kind: 'templates' })} title={s.tooltip.templates}>
              {s.action.templates}
            </button>
          </div>
          {/* Learning the tool, then setting it up. Six buttons against three
              was what made this column the widest of the three in every
              language whose labels run longer than English's. */}
          <div className="tb-row">
            <button
              className={`btn${guided ? ' active' : ''}`}
              onClick={() => setGuided(!guided)}
              title={s.tooltip.guided}
            >
              {s.action.guided}
            </button>
            <button className="btn" onClick={() => setDialog({ kind: 'help' })} title={s.tooltip.help}>
              {s.action.help}
            </button>
            <button className="btn" onClick={() => setDialog({ kind: 'about' })}>
              {s.action.about}
            </button>
            <button
              className="btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={theme === 'dark' ? s.tooltip.themeToLight : s.tooltip.themeToDark}
            >
              {theme === 'dark' ? `☀ ${s.action.themeLight}` : `☾ ${s.action.themeDark}`}
            </button>
            {/* The picker sits with the other whole-app settings rather than in
                a dialog behind Help: someone who cannot read the interface
                needs to find this without reading anything. */}
            <button className="btn" onClick={() => setDialog({ kind: 'language' })} title={s.tooltip.language}>
              🌐 {LOCALES.find((l) => l.code === locale)?.nativeName ?? s.action.language}
            </button>
          </div>
        </div>
      </div>

      <p className="tool-hint" role="status">
        {network.nodes.length === 0 && <strong>{s.toolHint.start} </strong>}
        {highlight.length > 0 && (
          <>
            <button className="btn btn-small" onClick={() => setHighlight([])}>
              {s.toolHint.showEverything}
            </button>{' '}
            {s.toolHint.focused}{' '}
          </>
        )}
        {s.toolHint[tool]}
        {pendingSource && ` ${fmt(s.toolHint.pendingSource, { label: nodeLabel(pendingSource) })}`}

      </p>

      <main className="workspace">
        <ErrorBoundary
          fallbackTitle={s.error.canvasTitle}
          fallbackHint={s.error.canvasHint}
        >
          <Graph
            theme={theme}
            showGrid={showGrid}
            edgeColour={edgeColour}
            showMetrics={showMetrics}
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
                {panel === 'analysis'
                  ? s.panel.analysis
                  : panel === 'snapshots'
                    ? s.panel.snapshots
                    : s.panel.listView}
              </h2>
              <button className="icon-btn" onClick={() => setPanel('none')} aria-label={s.tooltip.closePanel}>
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
          title={nextCategory === 'context' ? s.nodeEditor.newEvent : s.nodeEditor.newNode}
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
          title={s.nodeEditor.edit}
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
          <p className="muted small">{s.templates.intro}</p>
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
          <p className="muted small">{s.exportDialog.intro}</p>
          <div className="export-grid">
            {(
              [
                [s.exportDialog.json, () => download(`${safeFilename(network.meta.title)}.json`, exportJson(network), 'application/json')],
                [s.exportDialog.edges, () => download(`${safeFilename(network.meta.title)}_edges.csv`, exportEdgeListCsv(network), 'text/csv')],
                [s.exportDialog.nodes, () => download(`${safeFilename(network.meta.title)}_nodes.csv`, exportNodeListCsv(network), 'text/csv')],
                [s.exportDialog.matrix, () => download(`${safeFilename(network.meta.title)}_matrix.csv`, exportAdjacencyCsv(network), 'text/csv')],
                [s.exportDialog.report, () => download(`${safeFilename(network.meta.title)}_report.md`, exportReportMarkdown(network), 'text/markdown')],
                [s.exportDialog.events, () => download(`${safeFilename(network.meta.title)}_events.csv`, exportEventsCsv(store.events), 'text/csv')],
                [s.exportDialog.png, () => {
                  const url = graphApi.current?.pngDataUrl({ blackAndWhite: false, scale: 2 });
                  if (url) {
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${safeFilename(network.meta.title)}.png`;
                    a.click();
                  }
                }],
                [s.exportDialog.svg, () => {
                  const svg = graphApi.current?.svg();
                  if (svg) download(`${safeFilename(network.meta.title)}.svg`, svg, 'image/svg+xml');
                }],
                [s.exportDialog.print, () => graphApi.current?.print(network.meta.title)],
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
          title={s.clearDialog.title}
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
                {s.clearDialog.confirm}
              </button>
            </>
          }
        >
          <p>{fmt(s.clearDialog.body, { nodes: network.nodes.length, edges: network.edges.length })}</p>
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

      {dialog.kind === 'language' && (
        <LanguageDialog
          current={locale}
          onChoose={(code: LocaleCode) => {
            setLocale(code);
            setDialog({ kind: 'none' });
          }}
          onClose={() => setDialog({ kind: 'none' })}
        />
      )}

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
  const s = useStrings();
  const network = useStore((st) => st.network);
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
    <Modal title={s.share.title} onClose={onClose} wide>
      <p className="muted small">{s.share.intro}</p>
      {!link ? (
        <p className="muted small">{s.share.building}</p>
      ) : link.tooLong ? (
        <p className="warn-box">{fmt(s.share.tooLong, { length: link.length })}</p>
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
            {copied ? s.action.copied : s.action.copy}
          </button>
        </>
      )}
    </Modal>
  );
}

function HelpDialog({ onClose, onOpenList }: { onClose: () => void; onOpenList: () => void }) {
  const s = useStrings();
  return (
    <Modal title={s.help.title} onClose={onClose} wide>
      <h3>{s.help.buildingHeading}</h3>
      <ul>
        <li>
          <strong>{s.tool.event}</strong> — {s.help.buildingEvent}
        </li>
        <li>
          <strong>{s.tool.add}</strong> — {s.help.buildingAdd}
        </li>
        <li>
          <strong>{s.tool.connect}</strong> — {s.help.buildingConnect}
        </li>
        <li>
          <strong>{s.tool.delete}</strong> — {s.help.buildingDelete}
        </li>
        <li>{s.help.buildingDoubleClick}</li>
      </ul>

      <h3>{s.help.readingHeading}</h3>
      <ul>
        {/* Bold is carried inside the string as **markers** rather than as JSX
            around a fragment: which words need emphasis differs by language,
            and splitting the sentence into English-shaped pieces would force
            every translation into English word order. */}
        <li dangerouslySetInnerHTML={{ __html: emphasis(s.help.readingArrowheads) }} />
        <li>{s.help.readingReciprocal}</li>
        <li>{s.help.readingShapes}</li>
        <li>{s.help.readingColour}</li>
        <li>{s.help.readingColourMode}</li>
      </ul>

      <h3>{s.help.keyboardHeading}</h3>
      <ul>
        <li>
          <kbd>S</kbd> <kbd>E</kbd> <kbd>A</kbd> <kbd>C</kbd> <kbd>D</kbd> — {s.help.keyboardTools}
        </li>
        <li>{s.help.keyboardConnectFromSelection}</li>
        <li>{s.help.keyboardDelete}</li>
        <li>{s.help.keyboardEscape}</li>
        <li>{s.help.keyboardView}</li>
        <li>{s.help.keyboardEditing}</li>
      </ul>

      <h3>{s.help.organiseHeading}</h3>
      <p>{s.help.organiseBody}</p>

      <h3>{s.help.mouselessHeading}</h3>
      <p>{s.help.mouselessBody}</p>
      <button className="btn" onClick={onOpenList}>
        {s.help.openListView}
      </button>

      <h3>{s.help.cautionHeading}</h3>
      <p>{s.help.cautionBody}</p>
    </Modal>
  );
}

/** Render the **bold** markers the long-form strings use. Text is escaped first. */
function emphasis(text: string): string {
  const escaped = text.replace(
    /[<>&"']/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
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
  const s = useStrings();
  const [choice, setChoice] = useState<TrialState>(current ?? 'proposed');
  return (
    <Modal
      title={s.trial.dialogTitle}
      onClose={onCancel}
      footer={
        <>
          <button className="btn" onClick={onCancel}>
            {s.action.cancel}
          </button>
          <button className="btn btn-primary" onClick={() => onSave(choice)}>
            {s.action.save}
          </button>
        </>
      }
    >
      <p className="sentence">
        <strong>{label}</strong>
      </p>
      {testedAt && (
        <p className="muted small">
          {fmt(s.trial.lastRecorded, { when: new Date(testedAt).toLocaleString() })}
        </p>
      )}

      <fieldset className="field">
        <legend>{s.trial.legend}</legend>
        <div className="trial-options">
          {TRIAL_STATES.map((state) => (
            <label key={state} className={`trial-option${choice === state ? ' active' : ''}`}>
              <input type="radio" name="trial" checked={choice === state} onChange={() => setChoice(state)} />
              <span>
                <strong>{trialLabel(state)}</strong>
                <small>{trialHint(state)}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <button className="btn btn-small" onClick={() => onSave(undefined)}>
        {s.trial.notATrial}
      </button>
    </Modal>
  );
}

function KernelDialog({ onClose }: { onClose: () => void }) {
  const s = useStrings();
  return (
    <Modal title={s.kernel.title} onClose={onClose}>
      <p className="warn-box">{s.kernel.warning}</p>
      <p>{s.kernel.p1}</p>
      <p>{s.kernel.p2}</p>
      <p>
        {s.kernel.p3} <a href="mailto:xiangtks@gmail.com">xiangtks@gmail.com</a>.
      </p>
    </Modal>
  );
}

function AboutDialog({ onClose }: { onClose: () => void }) {
  const s = useStrings();
  return (
    <Modal title={s.about.title} onClose={onClose} wide>
      <p>{s.about.intro}</p>

      <h3>{s.about.groundingHeading}</h3>
      <p dangerouslySetInnerHTML={{ __html: emphasis(s.about.groundingBody) }} />
      <p>
        {s.about.inspiration}{' '}
        <a href="https://plan9.netlify.app" target="_blank" rel="noreferrer">
          plan9.netlify.app
        </a>
        .
      </p>

      <h3>{s.about.madeByHeading}</h3>
      <p>
        {s.about.madeByBody} <a href="mailto:xiangtks@gmail.com">xiangtks@gmail.com</a>.
      </p>

      <h3>{s.about.dataHeading}</h3>
      <p>{s.about.dataBody}</p>

      <p className="muted small">{s.about.licence}</p>
    </Modal>
  );
}
