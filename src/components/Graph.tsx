import { useEffect, useRef } from 'react';
import cytoscape, { type Core, type ElementDefinition, type NodeSingular } from 'cytoscape';
import { useStore } from '../state/store';
import { CATEGORY_META, VALENCE_COLOUR, categoryFill, categoryPrefix, valenceColour } from '../model/eemm';
import { useLocale } from '../i18n';
import { layeredPositions, separateOverlaps } from './layout';
import type { PbtNetwork, PbtNode } from '../model/types';
import { t } from '../i18n/strings';

/**
 * What the colour of an arrow is allowed to mean.
 *
 * Only ever one thing at a time. Colour is the single strongest channel on the
 * map, and letting it carry two meanings at once — helping-or-not *and*
 * up-or-down — makes every arrow ambiguous: a red line would mean "unhelpful"
 * on one map and "reduces" on another, with no way to tell which from looking.
 *
 *  valence   - the default and the textbook's: colour says whether the link is
 *              helping. Direction stays in the arrowhead fill.
 *  direction - colour says whether the source pushes the target up or down, for
 *              people who asked to see decreasing influences at a glance.
 *              Helpfulness is then not shown at all, which is the trade.
 */
export const EDGE_COLOUR_MODES = ['valence', 'direction'] as const;
export type EdgeColourMode = (typeof EDGE_COLOUR_MODES)[number];

/**
 * Colours for direction mode. Deliberately not the valence pair: green/red
 * there already means helping/not helping, and reusing it would suggest that
 * "reduces" is bad, which is often the exact opposite of the truth (reducing
 * avoidance is the goal). Blue up, orange down — a scale distinction, not a
 * moral one.
 */
const DIRECTION_COLOUR = {
  light: { increases: '#1f4f9c', decreases: '#c2521a' },
  dark: { increases: '#7fb0f5', decreases: '#f0a06a' },
} as const;

interface Props {
  theme: 'light' | 'dark';
  showGrid: boolean;
  edgeColour: EdgeColourMode;
  /** Print each node's severity and frequency ratings on the box. */
  showMetrics: boolean;
  selected: { nodes: string[]; edge: string | null };
  onCanvasClick: (position: { x: number; y: number }) => void;
  /** `additive` is true when Shift was held: add to the selection, do not replace it. */
  onNodeClick: (id: string, additive: boolean) => void;
  onNodeDoubleClick: (id: string) => void;
  onEdgeClick: (id: string) => void;
  onEdgeDoubleClick: (id: string) => void;
  highlight: string[];
  registerApi: (api: GraphApi) => void;
}

export interface GraphApi {
  fit: () => void;
  tidy: () => void;
  pngDataUrl: (opts: { blackAndWhite: boolean; scale: number }) => string;
  svg: () => string;
  print: (title: string) => void;
}

/**
 * Boxes and arrows in the textbook's visual language.
 *
 *  - Processes are square-cornered rectangles; Context/Event boxes are rounded,
 *    because a context is not something the person is doing.
 *  - Each box carries its EEMM category as a first line, so the classification
 *    is visible on the map rather than hidden in a dialog.
 *  - An arrowhead that is filled means "increases", hollow means "decreases".
 *    That is the whole sign encoding, and it survives black-and-white printing.
 *  - Line thickness carries the three strength levels. There are no numbers on
 *    the arrows: the textbook figures do not have them, and they were the single
 *    biggest source of visual clutter.
 *  - Colour is reserved for whether a link is helping. Unjudged links are black,
 *    which is what the textbook looks like.
 */
export function Graph({
  theme,
  showGrid,
  edgeColour,
  showMetrics,
  selected,
  onCanvasClick,
  onNodeClick,
  onNodeDoubleClick,
  onEdgeClick,
  onEdgeDoubleClick,
  highlight,
  registerApi,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);
  const network = useStore((s) => s.network);
  const moveNode = useStore((s) => s.moveNode);
  const tool = useStore((s) => s.tool);
  const pendingSource = useStore((s) => s.pendingSource);
  // The category prefix is painted into the box, so a language change is a
  // reason to rebuild the elements just as much as a theme change is.
  const locale = useLocale((s) => s.code);

  const handlers = useRef({ onCanvasClick, onNodeClick, onNodeDoubleClick, onEdgeClick, onEdgeDoubleClick });
  handlers.current = { onCanvasClick, onNodeClick, onNodeDoubleClick, onEdgeClick, onEdgeDoubleClick };
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const gridPainter = useRef<(() => void) | null>(null);
  const showGridRef = useRef(showGrid);
  showGridRef.current = showGrid;
  const showMetricsRef = useRef(showMetrics);
  showMetricsRef.current = showMetrics;

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      style: makeStyle(themeRef.current),
      elements: [],
      minZoom: 0.15,
      maxZoom: 3,
      boxSelectionEnabled: false,
      autoungrabify: false,
    });
    cyRef.current = cy;

    cy.on('tap', (evt) => {
      if (evt.target === cy) handlers.current.onCanvasClick(evt.position);
    });
    cy.on('tap', 'node', (evt) =>
      handlers.current.onNodeClick(evt.target.id(), Boolean((evt.originalEvent as MouseEvent | undefined)?.shiftKey)),
    );
    cy.on('dbltap', 'node', (evt) => handlers.current.onNodeDoubleClick(evt.target.id()));
    cy.on('tap', 'edge', (evt) => handlers.current.onEdgeClick(evt.target.id()));
    cy.on('dbltap', 'edge', (evt) => handlers.current.onEdgeDoubleClick(evt.target.id()));

    cy.on('dragfree', 'node', (evt) => {
      const n = evt.target as NodeSingular;
      const p = n.position();
      // With the grid on, dropping a box lands it on the nearest intersection,
      // which is what makes a hand-arranged map look deliberate.
      const snapped = showGridRef.current
        ? { x: Math.round(p.x / GRID) * GRID, y: Math.round(p.y / GRID) * GRID }
        : { x: Math.round(p.x), y: Math.round(p.y) };
      n.position(snapped);
      moveNode(n.id(), snapped, true);
    });

    registerApi({
      fit: () => {
        const w = cy.container()?.clientWidth ?? 800;
        cy.animate({
          fit: { eles: cy.elements(), padding: Math.max(16, Math.min(60, Math.round(w * 0.05))) },
          duration: 250,
        });
      },
      tidy: () => runTidy(cy, showGridRef.current, showMetricsRef.current),
      pngDataUrl: ({ blackAndWhite, scale }) => {
        if (blackAndWhite) cy.container()?.classList.add('bw');
        cy.elements().removeClass('dim');
        const url = cy.png({ full: true, scale, bg: '#ffffff' });
        if (blackAndWhite) cy.container()?.classList.remove('bw');
        return url;
      },
      svg: () => buildSvg(useStore.getState().network),
      print: (title) => printMap(buildSvg(useStore.getState().network), title),
    });

    // The grid is painted as a CSS background on the container rather than as
    // graph elements, so it never becomes something you can select or export.
    // It has to be re-aligned whenever the view moves, or it slides off the
    // boxes it is supposed to be guiding.
    const paintGrid = () => {
      const el = cy.container();
      if (!el) return;
      if (!el.classList.contains('grid-on')) {
        el.style.backgroundImage = '';
        return;
      }
      const z = cy.zoom();
      const pan = cy.pan();
      const step = GRID * z;
      el.style.backgroundImage =
        'linear-gradient(to right, var(--grid-line) 1px, transparent 1px),' +
        'linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)';
      el.style.backgroundSize = `${step}px ${step}px`;
      el.style.backgroundPosition = `${pan.x}px ${pan.y}px`;
    };
    cy.on('pan zoom resize', paintGrid);
    gridPainter.current = paintGrid;

    const container = containerRef.current;
    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => cy.resize()) : null;
    if (container && observer) observer.observe(container);

    return () => {
      observer?.disconnect();
      cy.destroy();
      cyRef.current = null;
    };
  }, [moveNode, registerApi]);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    // Applying a new stylesheet has to happen OUTSIDE cy.batch(). Inside one,
    // the renderer's cached node textures are not invalidated, and the canvas
    // ends up painting stale bitmaps at the wrong scale: geometry and zoom stay
    // correct while the drawing turns to garbage.
    // The stylesheet must be replaced OUTSIDE cy.batch(): inside one, cached
    // node textures are not invalidated and the canvas paints stale bitmaps.
    cy.style(makeStyle(theme));
    cy.batch(() => {
      cy.elements().remove();
      cy.add(toElements(network, theme, edgeColour, showMetrics));
    });
    cy.forceRender();
  }, [network, theme, edgeColour, showMetrics, locale]);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.batch(() => {
      cy.elements().removeClass('dim highlighted');
      if (highlight.length > 0) {
        const set = new Set(highlight);
        cy.elements().forEach((el) => {
          el.addClass(set.has(el.id()) ? 'highlighted' : 'dim');
        });
      }
    });
  }, [highlight, network]);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.batch(() => {
      cy.elements().removeClass('pending');
      if (pendingSource) cy.getElementById(pendingSource).addClass('pending');
    });
  }, [pendingSource, network]);

  // Selection has to be visible, or Delete looks broken: you press it, nothing
  // happens, and there was never anything on screen saying what was selected.
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.batch(() => {
      cy.elements().removeClass('chosen');
      for (const id of selected.nodes) cy.getElementById(id).addClass('chosen');
      if (selected.edge) cy.getElementById(selected.edge).addClass('chosen');
    });
  }, [selected, network]);

  useEffect(() => {
    const el = cyRef.current?.container();
    if (!el) return;
    el.classList.toggle('grid-on', showGrid);
    gridPainter.current?.();
  }, [showGrid, network]);

  return (
    <div
      ref={containerRef}
      className={`graph tool-${tool}`}
      role="application"
      aria-label={t().a11y.canvas}
    />
  );
}

/**
 * Organise: anchor the context, then let the processes settle.
 *
 * A purely layered layout was the wrong tool on its own. These maps are mostly
 * chains with loops hanging off them, and a layered algorithm renders a chain as
 * a single line: either a long row running off to the right or a tall thin
 * column. Both technically respect the arrows and both are useless for the thing
 * the map is actually for, which is seeing how the processes cluster and loop.
 *
 * So it runs in two passes. The layered pass fixes the reading order and puts
 * the primary context at the leading edge. Those context boxes are then locked,
 * and a force-directed pass is seeded from that arrangement to compact
 * everything else. Force-directed layouts are bad at overall direction and good
 * at exactly what is wanted here: cycles come out looking like cycles, and
 * tightly connected processes end up near each other.
 */
function runTidy(cy: Core, snapToGrid: boolean, showMetrics: boolean): void {
  const net = useStore.getState().network;
  if (net.nodes.length === 0) return;

  const heights = new Map(net.nodes.map((n) => [n.id, boxSize(n, showMetrics).h]));
  const seed = layeredPositions(net, { rankDir: 'LR', nodeWidth: NODE_W, nodeHeights: heights });
  if (seed.size === 0) return;

  cy.batch(() => {
    for (const [id, p] of seed) cy.getElementById(id).position(p);
  });

  // Two boxes are not worth relaxing, and force-directed layouts look silly on
  // them. Keep the layered result.
  if (net.nodes.length < 4) {
    persist(cy, 'Organise');
    fitSoon(cy);
    return;
  }

  const contexts = cy.nodes().filter((n) => n.hasClass('context'));
  contexts.lock();

  const layout = cy.layout({
    name: 'cose',
    animate: true,
    animationDuration: 500,
    randomize: false, // start from the layered arrangement, do not throw it away
    fit: true,
    padding: 50,
    nodeDimensionsIncludeLabels: true,
    idealEdgeLength: () => 170,
    nodeRepulsion: () => 20000,
    edgeElasticity: () => 90,
    gravity: 0.3,
    numIter: 1200,
    initialTemp: 120,
    coolingFactor: 0.95,
  } as cytoscape.LayoutOptions);

  layout.one('layoutstop', () => {
    contexts.unlock();

    // cose leaves boxes overlapping because it reasons about points, not
    // rectangles. Separate them using the real box sizes.
    const current = new Map(cy.nodes().map((n) => [n.id(), { ...n.position() }]));
    const sizes = new Map(net.nodes.map((n) => [n.id, { w: NODE_W, h: boxSize(n, showMetrics).h }]));
    let spread = separateOverlaps(current, sizes);
    if (snapToGrid) {
      spread = new Map(
        [...spread].map(([id, p]) => [
          id,
          { x: Math.round(p.x / GRID) * GRID, y: Math.round(p.y / GRID) * GRID },
        ]),
      );
    }

    cy.batch(() => {
      for (const [id, p] of spread) cy.getElementById(id).position(p);
    });
    persist(cy, 'Organise');
    fitSoon(cy);
  });
  layout.run();
}

/**
 * Write the finished layout back to the store as a single undoable action.
 *
 * See `applyPositions` in the store for why this is not a loop of `moveNode`.
 */
function persist(cy: Core, label: string): void {
  const moves = cy.nodes().map((n) => {
    const p = n.position();
    return { id: n.id(), position: { x: Math.round(p.x), y: Math.round(p.y) } };
  });
  useStore.getState().applyPositions(moves, label);
}

function fitSoon(cy: Core): void {
  setTimeout(() => {
    const w = cy.container()?.clientWidth ?? 800;
    cy.animate({
      fit: { eles: cy.elements(), padding: Math.max(20, Math.min(60, Math.round(w * 0.05))) },
      duration: 300,
    });
  }, 60);
}

/** Grid pitch, in graph units. Also the snap distance. */
export const GRID = 40;

const NODE_W = 180;
const CHAR_W = 7.4;
const LINE_H = 17;

/**
 * The severity / frequency line, or nothing at all.
 *
 * Only rendered for ratings that were actually given. `undefined` and `0` are
 * different answers — "not rated" versus "rated, and none" — and printing 0 for
 * an unrated node would put a number on the map that nobody entered.
 */
function metricText(node: PbtNode): string | null {
  const strings = t().nodeEditor;
  const parts: string[] = [];
  if (node.severity !== undefined) parts.push(`${strings.severityShort} ${node.severity}`);
  if (node.frequency !== undefined) parts.push(`${strings.frequencyShort} ${node.frequency}`);
  return parts.length > 0 ? parts.join('  ·  ') : null;
}

/** Two-line minimum: the category line, then the wrapped content. */
function boxSize(node: PbtNode, showMetrics = false): { w: number; h: number; tw: number } {
  const width = NODE_W;
  const textWidth = width - 22;
  const perLine = Math.max(1, Math.floor(textWidth / CHAR_W));
  const contentLines = Math.min(4, Math.max(1, Math.ceil(node.label.length / perLine)));
  const prefixLines = categoryPrefix(node.category) ? 1 : 0;
  const metricLines = showMetrics && metricText(node) ? 1 : 0;
  return {
    w: width,
    h: Math.round((contentLines + prefixLines + metricLines) * LINE_H + 22),
    tw: textWidth,
  };
}

function nodeText(node: PbtNode, showMetrics = false): string {
  const prefix = categoryPrefix(node.category);
  const head = prefix ? `${prefix}:\n${node.label}` : node.label;
  const metrics = showMetrics ? metricText(node) : null;
  return metrics ? `${head}\n${metrics}` : head;
}

/**
 * Find A->B / B->A pairs. Two separate arrows between the same two boxes read as
 * clutter and take up twice the space; one line with a head at each end says the
 * same thing and is how reciprocal influence is drawn in the textbook figures.
 * Both edges stay in the data, so nothing is lost.
 */
function reciprocalPairs(net: PbtNetwork): Map<string, string> {
  const byPair = new Map<string, string>();
  const partner = new Map<string, string>();
  for (const e of net.edges) {
    if (e.source === e.target) continue;
    byPair.set(`${e.source}->${e.target}`, e.id);
  }
  for (const e of net.edges) {
    if (e.source === e.target) continue;
    const back = byPair.get(`${e.target}->${e.source}`);
    if (back && back !== e.id) partner.set(e.id, back);
  }
  return partner;
}

function toElements(
  net: PbtNetwork,
  theme: 'light' | 'dark',
  edgeColour: EdgeColourMode = 'valence',
  showMetrics = false,
): ElementDefinition[] {
  const els: ElementDefinition[] = [];

  for (const n of net.nodes) {
    const meta = CATEGORY_META[n.category];
    const skin = categoryFill(n.category, theme);
    const box = boxSize(n, showMetrics);
    els.push({
      group: 'nodes',
      data: {
        id: n.id,
        label: nodeText(n, showMetrics),
        colour: skin.fill,
        border: skin.border,
        textColour: skin.text,
        w: box.w,
        h: box.h,
        tw: `${box.tw}px`,
      },
      position: { x: n.position.x, y: n.position.y },
      classes: [meta.isContext ? 'context' : 'process', n.trial ? `trial-${n.trial}` : ''].filter(Boolean).join(' '),
    });
  }

  const partner = reciprocalPairs(net);
  const byId = new Map(net.edges.map((e) => [e.id, e]));
  const drawn = new Set<string>();
  const widthFor = (strength: number) => [1.5, 2.6, 4][strength - 1] ?? 2.6;
  // The head scales too. Line thickness alone is hard to judge at a glance,
  // especially on a printout; a bigger head reads as "stronger" immediately.
  const arrowFor = (strength: number) => [1, 1.5, 2.1][strength - 1] ?? 1.5;

  for (const e of net.edges) {
    const backId = partner.get(e.id);
    if (backId && drawn.has(backId)) continue;
    const back = backId ? byId.get(backId) : undefined;
    drawn.add(e.id);

    // When the two directions disagree about whether the link helps, neither
    // claim should win, so the shared line stays neutral. Each arrowhead's
    // fill (solid/hollow) still comes from its own direction, independently.
    const valence = back && back.valence !== e.valence ? 'neutral' : e.valence;
    // Direction mode has the same problem in the reciprocal case and takes the
    // same way out: a single stroke cannot be two colours, so a pair that runs
    // up one way and down the other falls back to the neutral line and lets the
    // two arrowheads carry the distinction on their own.
    const colour =
      edgeColour === 'direction'
        ? back && back.direction !== e.direction
          ? valenceColour('neutral', theme)
          : DIRECTION_COLOUR[theme][e.direction]
        : valenceColour(valence, theme);
    // The line's thickness takes the stronger of the two directions — a
    // single stroke can't taper along its length, so this is shared and
    // identical on both edges below, deliberately.
    const width = widthFor(Math.max(e.strength, back?.strength ?? 0));

    // Cytoscape gives an edge exactly one arrow-scale, applied to every
    // arrowhead shape defined on it, and there is no way to make a line
    // invisible without also zeroing its arrowheads' opacity (opacity and
    // line-opacity both multiply straight into arrow opacity in the
    // renderer — confirmed by reading Cytoscape's own drawing code, it isn't
    // a documented style option). So a reciprocal pair can't be one edge
    // with two heads, and it can't be a "real" edge plus an invisible
    // "carrier" edge either. It's rendered instead as two fully ordinary,
    // fully visible edges — sharing the same width, colour, and straight
    // path (so they land exactly on top of each other and read as one
    // line) — each carrying just one arrowhead, sized only by its own
    // direction's strength. Cytoscape does not auto-offset straight edges
    // that share the same two nodes, so they don't drift apart into a
    // curve.
    // Each line otherwise runs the full distance between the boxes, straight
    // through the *other* direction's arrowhead — most visibly on a hollow
    // head, where the opposing line is drawn across the white triangle. The
    // length an arrowhead reserves along its line is (width x arrow-scale x
    // 2), so pulling each line's tail back by exactly the partner's arrow
    // length makes both segments start and end at the same two points: they
    // still overlap perfectly and read as one line, but neither now crosses
    // the other's head.
    const arrowSpan = (strength: number) => width * arrowFor(strength) * 2;

    els.push({
      group: 'edges',
      data: {
        id: e.id,
        source: e.source,
        target: e.target,
        pairedWith: back?.id ?? null,
        width,
        arrowScale: arrowFor(e.strength),
        srcInset: back ? arrowSpan(back.strength) : 0,
        colour,
      },
      classes: [e.direction, e.trial ? `trial-${e.trial}` : '', back ? 'reciprocal' : ''].filter(Boolean).join(' '),
    });

    if (back) {
      els.push({
        group: 'edges',
        data: {
          id: back.id,
          source: back.source,
          target: back.target,
          width,
          arrowScale: arrowFor(back.strength),
          srcInset: arrowSpan(e.strength),
          colour,
        },
        classes: [back.direction, back.trial ? `trial-${back.trial}` : '', 'reciprocal'].filter(Boolean).join(' '),
      });
    }
  }

  return els;
}

function makeStyle(theme: 'light' | 'dark'): cytoscape.StylesheetStyle[] {
  const dimFill = theme === 'dark' ? '#262a31' : '#eceef1';
  const dimBorder = theme === 'dark' ? '#3d444e' : '#c2c8d0';
  const dimText = theme === 'dark' ? '#98a1ad' : '#5b626d';
  const dimLine = theme === 'dark' ? '#4a515b' : '#ccd2da';
  return [
    {
      selector: 'node',
      style: {
        'background-color': 'data(colour)',
        'border-color': 'data(border)',
        'border-width': 1.5,
        label: 'data(label)',
        'text-wrap': 'wrap',
        'text-max-width': 'data(tw)',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': '13.5px',
        'line-height': 1.3,
        'font-family': 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        color: 'data(textColour)',
        width: 'data(w)',
        height: 'data(h)',
        'transition-property': 'background-color, border-color',
        'transition-duration': 150,
      } as cytoscape.Css.Node,
    },
    // Square corners for a process, rounded for a context or event. This is the
    // distinction the textbook figures make, and it reads instantly.
    { selector: 'node.process', style: { shape: 'rectangle' } as cytoscape.Css.Node },
    { selector: 'node.context', style: { shape: 'round-rectangle' } as cytoscape.Css.Node },
    // A proposal is a sketch: dashed. Something tried and ruled out fades into
    // the background rather than being deleted, because knowing what was tried
    // and did not work is worth keeping.
    {
      selector: 'node.trial-proposed',
      style: { 'border-style': 'dashed', 'border-width': 2.5 } as cytoscape.Css.Node,
    },
    {
      selector: 'edge.trial-proposed',
      style: { 'line-style': 'dashed' } as cytoscape.Css.Edge,
    },
    {
      selector: 'node.trial-ruledOut',
      style: { 'border-style': 'dotted', opacity: 0.38 } as cytoscape.Css.Node,
    },
    {
      selector: 'edge.trial-ruledOut',
      style: { 'line-style': 'dotted', opacity: 0.3 } as cytoscape.Css.Edge,
    },
    {
      selector: 'node.chosen',
      style: { 'border-width': 4, 'border-color': '#0b6bcb' } as cytoscape.Css.Node,
    },
    {
      selector: 'edge.chosen',
      style: { 'line-color': '#0b6bcb', 'target-arrow-color': '#0b6bcb', 'source-arrow-color': '#0b6bcb' } as cytoscape.Css.Edge,
    },
    {
      selector: 'node.pending',
      style: { 'border-width': 4, 'border-color': '#0b6bcb' } as cytoscape.Css.Node,
    },
    {
      selector: 'node:selected',
      style: { 'border-width': 3, 'border-color': '#0b6bcb' } as cytoscape.Css.Node,
    },
    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        width: 'data(width)',
        'line-color': 'data(colour)',
        'target-arrow-color': 'data(colour)',
        'target-arrow-shape': 'triangle',
        'arrow-scale': 'data(arrowScale)' as unknown as number,
        'transition-property': 'line-color, opacity',
        'transition-duration': 150,
      } as cytoscape.Css.Edge,
    },
    // Sign lives entirely in the arrowhead: solid promotes, hollow inhibits.
    // No colour dependency, so it survives a black-and-white printout.
    { selector: 'edge.increases', style: { 'target-arrow-fill': 'filled' } as cytoscape.Css.Edge },
    { selector: 'edge.decreases', style: { 'target-arrow-fill': 'hollow' } as cytoscape.Css.Edge },
    // Reciprocal influence: two ordinary, fully visible edges — one per
    // direction, each with its own real id, own arrow-scale, own trial
    // state — sharing the same width, colour, and straight path so they
    // land exactly on top of each other and read as one line with a head at
    // each end. (See makeElements for why: Cytoscape ties an invisible
    // line's arrowhead opacity to the line's own opacity, so a "real edge +
    // invisible carrier edge" split cannot produce a visible head on an
    // invisible line — confirmed by reading the renderer source, not
    // documented anywhere.) Cytoscape does not auto-offset straight edges
    // between the same two nodes into a curve, so they stay stacked.
    {
      selector: 'edge.reciprocal',
      style: {
        'curve-style': 'straight',
        // Start after the opposing arrowhead, so neither line is drawn
        // through the other's head. See makeElements.
        'source-distance-from-node': 'data(srcInset)' as unknown as number,
      } as cytoscape.Css.Edge,
    },
    {
      selector: 'node.dim',
      style: {
        'background-color': dimFill,
        'border-color': dimBorder,
        color: dimText,
      } as cytoscape.Css.Node,
    },
    {
      selector: 'edge.dim',
      style: {
        'line-color': dimLine,
        'target-arrow-color': dimLine,
        'source-arrow-color': dimLine,
        opacity: 0.5,
      } as cytoscape.Css.Edge,
    },
    {
      selector: 'node.highlighted',
      style: { 'border-width': 3.5, 'border-color': '#b8860b' } as cytoscape.Css.Node,
    },
    {
      selector: 'edge.highlighted',
      style: { 'line-color': '#b8860b', 'target-arrow-color': '#b8860b', width: 4 } as cytoscape.Css.Edge,
    },
  ];
}

/**
 * Print by rendering the vector into a hidden frame, rather than printing the
 * page.
 *
 * Printing the page directly does not work: the map lives in a <canvas> drawn
 * at screen resolution and at the size of the browser window, so on a sheet of
 * A4 it comes out clipped, scaled wrong, and with a grey background where the
 * canvas ends. Any open dialog printed along with it too.
 *
 * The SVG is already generated for export, is resolution-independent, and
 * contains only the map. An iframe is used rather than a popup window because
 * popup blockers routinely eat window.open even from a click.
 */
function printMap(svg: string, title: string): void {
  const existing = document.getElementById('print-frame');
  existing?.remove();

  const frame = document.createElement('iframe');
  frame.id = 'print-frame';
  frame.setAttribute('aria-hidden', 'true');
  frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
  document.body.appendChild(frame);

  const doc = frame.contentDocument;
  if (!doc) return;

  doc.open();
  doc.write(
    `<!doctype html><html><head><meta charset="utf-8"><title>${escapeXml(title)}</title>` +
      `<style>` +
      `@page { margin: 14mm; }` +
      `body { font-family: system-ui, -apple-system, sans-serif; margin: 0; color: #15181c; }` +
      `h1 { font-size: 16pt; margin: 0 0 2mm; }` +
      `p.meta { font-size: 9pt; color: #5f6672; margin: 0 0 6mm; }` +
      `svg { max-width: 100%; height: auto; }` +
      `</style></head><body>` +
      `<h1>${escapeXml(title)}</h1>` +
      `<p class="meta">${escapeXml(new Date().toLocaleString())}</p>` +
      svg +
      `</body></html>`,
  );
  doc.close();

  // Give the frame a moment to lay the SVG out before opening the dialog.
  setTimeout(() => {
    frame.contentWindow?.focus();
    frame.contentWindow?.print();
  }, 250);
}

/** Vector export. Cytoscape only produces raster, and journals want vector. */
function buildSvg(net: PbtNetwork): string {
  if (net.nodes.length === 0) return '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"></svg>';

  const pad = 70;
  const sizes = new Map(net.nodes.map((n) => [n.id, boxSize(n)]));
  const xs = net.nodes.map((n) => n.position.x);
  const ys = net.nodes.map((n) => n.position.y);
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const width = Math.max(...xs) - minX + pad + NODE_W;
  const height = Math.max(...ys) - minY + pad + 90;
  const pos = new Map(net.nodes.map((n) => [n.id, { x: n.position.x - minX, y: n.position.y - minY }]));

  const parts: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(width)}" height="${Math.round(height)}" viewBox="0 0 ${Math.round(width)} ${Math.round(height)}" font-family="system-ui, sans-serif">`,
    '<rect width="100%" height="100%" fill="#ffffff"/>',
    '<defs>',
  ];
  // The marker's rendered size (markerWidth/markerHeight) scales with
  // strength; the path inside stays on the same 0-10 viewBox, so it just
  // grows or shrinks as a whole rather than needing three separate drawings.
  // This used to be a fixed 7x7 for every edge regardless of strength, so a
  // 1-strength and a 3-strength link had identical arrowheads in every
  // exported SVG/PDF, only differing in line thickness.
  const markerSizeFor = (strength: number) => [5, 7, 9.5][strength - 1] ?? 7;
  for (const [name, colour] of Object.entries(VALENCE_COLOUR)) {
    for (const strength of [1, 2, 3]) {
      const size = markerSizeFor(strength);
      parts.push(
        `<marker id="f-${name}-${strength}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="${size}" markerHeight="${size}" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${colour}"/></marker>`,
        `<marker id="h-${name}-${strength}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="${size}" markerHeight="${size}" orient="auto-start-reverse"><path d="M 0.5 0.5 L 9.5 5 L 0.5 9.5 z" fill="#ffffff" stroke="${colour}" stroke-width="1.4"/></marker>`,
      );
    }
  }
  parts.push('</defs>');

  for (const e of net.edges) {
    const s = pos.get(e.source);
    const t = pos.get(e.target);
    if (!s || !t) continue;
    const colour = VALENCE_COLOUR[e.valence];
    const w = [1.4, 2.4, 3.8][e.strength - 1] ?? 2;
    const marker = e.direction === 'increases' ? `f-${e.valence}-${e.strength}` : `h-${e.valence}-${e.strength}`;
    parts.push(
      `<line x1="${s.x}" y1="${s.y}" x2="${t.x}" y2="${t.y}" stroke="${colour}" stroke-width="${w}" marker-end="url(#${marker})"/>`,
    );
  }

  for (const n of net.nodes) {
    const p = pos.get(n.id)!;
    const box = sizes.get(n.id)!;
    const meta = CATEGORY_META[n.category];
    const rx = meta.isContext ? 12 : 0;
    const dash = n.trial === 'proposed' ? ' stroke-dasharray="7,4"' : n.trial === 'ruledOut' ? ' stroke-dasharray="2,3"' : '';
    const fade = n.trial === 'ruledOut' ? ' opacity="0.4"' : '';
    parts.push(
      `<rect x="${p.x - box.w / 2}" y="${p.y - box.h / 2}" width="${box.w}" height="${box.h}" rx="${rx}" fill="${meta.colour}" stroke="${meta.border}" stroke-width="1.5"${dash}${fade}/>`,
    );
    const prefix = categoryPrefix(n.category);
    const lines = prefix ? [`${prefix}:`, ...wrap(n.label, 24)] : wrap(n.label, 24);
    const startY = p.y - ((lines.length - 1) * LINE_H) / 2 + 4;
    lines.forEach((line, i) => {
      const bold = prefix && i === 0 ? ' font-weight="700"' : '';
      parts.push(
        `<text x="${p.x}" y="${startY + i * LINE_H}" font-size="11.5" text-anchor="middle" fill="#15181c"${bold}>${escapeXml(line)}</text>`,
      );
    });
  }

  parts.push('</svg>');
  return parts.join('\n');
}

function wrap(text: string, max: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 4);
}

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);
}
