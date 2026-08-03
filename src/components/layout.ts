import dagre from 'dagre';
import type { PbtNetwork } from '../model/types';
import { CATEGORY_META } from '../model/eemm';

/**
 * Layered layout for process networks.
 *
 * The complaint about existing tools is that everything ends up everywhere. That
 * is what force-directed layouts give you: they optimise for even spacing, not
 * for direction of influence, so a causal map comes out looking like a hairball.
 * The textbook figures are layered, and they read because of it.
 *
 * Dagre does layered layout well, but handing it a network full of feedback
 * loops does not work: its cycle-breaker reverses whichever edges it likes to
 * get an acyclic graph, and the ranks that come out are arbitrary. A map can end
 * up with the triggering event stranded in the middle, which is exactly the
 * disorganised result we are trying to avoid.
 *
 * So the cycle-breaking is done deliberately instead of being left to chance:
 *
 *  1. Context and Event nodes are seeded first. They are where the sequence
 *    starts, and every worked example in the literature draws them at the edge.
 *  2. A breadth-first pass from those seeds gives every node a depth.
 *  3. Only edges that run "forwards" (from lower depth to higher) are given to
 *    dagre for ranking. Feedback edges still get drawn, they just do not get a
 *    vote on what goes where.
 *
 * The result is that influence flows consistently down (or across) the page, and
 * feedback reads as what it is: something looping back.
 */

export interface LayoutOptions {
  rankDir: 'TB' | 'LR';
  nodeWidth: number;
  nodeHeights: Map<string, number>;
}

export function layeredPositions(
  net: PbtNetwork,
  opts: LayoutOptions,
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();
  if (net.nodes.length === 0) return positions;

  const backEdges = findBackEdges(net);

  const g = new dagre.graphlib.Graph({ multigraph: true });
  g.setGraph({
    rankdir: opts.rankDir,
    nodesep: opts.rankDir === 'TB' ? 55 : 40,
    ranksep: opts.rankDir === 'TB' ? 95 : 130,
    edgesep: 22,
    marginx: 40,
    marginy: 40,
    ranker: 'network-simplex',
  });
  g.setDefaultEdgeLabel(() => ({}));

  for (const n of net.nodes) {
    g.setNode(n.id, { width: opts.nodeWidth, height: opts.nodeHeights.get(n.id) ?? 60 });
  }

  /*
   * Pin all Context and Event boxes to the same earliest rank.
   *
   * Depth alone does not do this: a context that happens to feed a long chain
   * and one that feeds a single node both start at depth 0, but dagre is free to
   * place them wherever the ranking works out, so they scatter down the page.
   * A map reads much better when every context sits together at the left edge
   * and the processes flow away from them.
   *
   * Dagre has no per-node rank constraint, so the standard trick is used: a
   * temporary root above all of them, removed before positions are read.
   */
  /*
   * Anchor the *main* context, and let the others sit where they belong.
   *
   * Forcing every context into one column looked tidy on a small example and
   * fell apart on real maps: a context introduced late, feeding something deep
   * in the network, dragged a long empty corridor across the diagram and
   * stretched every process apart. The point of the layout is to show the
   * processes and which of them is central, so only the primary context (the one
   * that reaches the most of the network) is pinned to the leading edge. Later
   * contexts settle next to whatever they actually influence, which is where a
   * reader looks for them anyway.
   */
  const contextIds = net.nodes.filter((n) => CATEGORY_META[n.category].isContext).map((n) => n.id);
  const primaryContext = pickPrimaryContext(net, contextIds);
  const VIRTUAL_ROOT = '__layout_root__';
  if (primaryContext) {
    g.setNode(VIRTUAL_ROOT, { width: 1, height: 1 });
    g.setEdge(VIRTUAL_ROOT, primaryContext, { weight: 10, minlen: 1 }, `root-${primaryContext}`);

    // A process with nothing feeding it is also an entry point, and would
    // otherwise share the opening column with the main context. Holding it back
    // one rank keeps that first column unambiguous.
    const hasIncoming = new Set(net.edges.filter((e) => e.source !== e.target).map((e) => e.target));
    for (const n of net.nodes) {
      if (n.id === primaryContext) continue;
      if (CATEGORY_META[n.category].isContext) continue;
      if (hasIncoming.has(n.id)) continue;
      g.setEdge(VIRTUAL_ROOT, n.id, { weight: 1, minlen: 2 }, `root-src-${n.id}`);
    }
  }

  let forwardEdges = 0;
  for (const e of net.edges) {
    if (e.source === e.target) continue;
    // Everything except a genuine back edge shapes the ranking. Feedback still
    // gets drawn, it just does not get a vote on where things go.
    if (backEdges.has(e.id)) continue;
    g.setEdge(e.source, e.target, { weight: e.strength }, e.id);
    forwardEdges++;
  }

  // A network that is nothing but mutual loops has no forward edges at all.
  // Rather than let dagre pile every node into one rank, fall back to ranking
  // by the breadth-first depth we already computed.
  if (forwardEdges === 0 && !primaryContext && net.nodes.length > 1) {
    return depthOnlyPositions(net, computeDepths(net), opts);
  }

  dagre.layout(g);

  for (const n of net.nodes) {
    const node = g.node(n.id) as { x: number; y: number } | undefined;
    if (node) positions.set(n.id, { x: node.x, y: node.y });
  }

  // The temporary root occupied a rank of its own, which would otherwise leave a
  // blank gutter along the leading edge. Normalising against the real nodes
  // removes it without having to reason about where dagre put the phantom.
  const MARGIN = 60;
  const minX = Math.min(...[...positions.values()].map((p) => p.x));
  const minY = Math.min(...[...positions.values()].map((p) => p.y));
  for (const [id, p] of positions) {
    positions.set(id, { x: Math.round(p.x - minX + MARGIN), y: Math.round(p.y - minY + MARGIN) });
  }

  return positions;
}

/**
 * Find the edges that close a cycle, so they can be left out of the ranking.
 *
 * Depth comparison was the obvious approach and it is wrong: two nodes that sit
 * at the same breadth-first depth lose the edge between them, and in a network
 * where a loop is reachable from two different contexts that silently discards
 * the very links that give the middle of the map its shape.
 *
 * A depth-first search classifies edges properly. Only a back edge -- one
 * pointing at a node still open on the current path -- actually closes a cycle.
 * Forward and cross edges are ordinary structure and are kept.
 *
 * Traversal starts from context boxes, then from anything with no incoming
 * influence, so that the arrows chosen as "backwards" are the ones a reader
 * would also call backwards.
 */
function findBackEdges(net: PbtNetwork): Set<string> {
  const out = new Map<string, { id: string; target: string }[]>();
  const indegree = new Map<string, number>();
  for (const n of net.nodes) {
    out.set(n.id, []);
    indegree.set(n.id, 0);
  }
  for (const e of net.edges) {
    if (e.source === e.target) continue;
    out.get(e.source)?.push({ id: e.id, target: e.target });
    indegree.set(e.target, (indegree.get(e.target) ?? 0) + 1);
  }

  const order = [
    ...net.nodes.filter((n) => CATEGORY_META[n.category].isContext),
    ...net.nodes.filter((n) => !CATEGORY_META[n.category].isContext && (indegree.get(n.id) ?? 0) === 0),
    ...net.nodes,
  ];

  const back = new Set<string>();
  const state = new Map<string, 'open' | 'done'>();

  // Iterative, because a long chain would overflow the stack on a recursive one.
  for (const start of order) {
    if (state.has(start.id)) continue;
    const stack: { id: string; next: number }[] = [{ id: start.id, next: 0 }];
    state.set(start.id, 'open');

    while (stack.length > 0) {
      const frame = stack[stack.length - 1]!;
      const edges = out.get(frame.id) ?? [];
      if (frame.next >= edges.length) {
        state.set(frame.id, 'done');
        stack.pop();
        continue;
      }
      const edge = edges[frame.next++]!;
      const seen = state.get(edge.target);
      if (seen === 'open') {
        back.add(edge.id); // points back into the path we are still on
      } else if (seen === undefined) {
        state.set(edge.target, 'open');
        stack.push({ id: edge.target, next: 0 });
      }
    }
  }

  return back;
}

/**
 * Breadth-first depth, seeded from context nodes and then from anything with no
 * incoming influence. Only used for the degenerate all-cycles fallback.
 */
function computeDepths(net: PbtNetwork): Map<string, number> {
  const out = new Map<string, string[]>();
  const indegree = new Map<string, number>();
  for (const n of net.nodes) {
    out.set(n.id, []);
    indegree.set(n.id, 0);
  }
  for (const e of net.edges) {
    if (e.source === e.target) continue;
    out.get(e.source)?.push(e.target);
    indegree.set(e.target, (indegree.get(e.target) ?? 0) + 1);
  }

  const seeds = [
    ...new Set([
      ...net.nodes.filter((n) => CATEGORY_META[n.category].isContext).map((n) => n.id),
      ...net.nodes.filter((n) => (indegree.get(n.id) ?? 0) === 0).map((n) => n.id),
    ]),
  ];

  const depth = new Map<string, number>();
  const queue: string[] = [];
  for (const id of seeds) {
    depth.set(id, 0);
    queue.push(id);
  }
  let head = 0;
  while (head < queue.length) {
    const id = queue[head++]!;
    for (const next of out.get(id) ?? []) {
      if (!depth.has(next)) {
        depth.set(next, depth.get(id)! + 1);
        queue.push(next);
      }
    }
  }
  for (const n of net.nodes) if (!depth.has(n.id)) depth.set(n.id, 0);
  return depth;
}

/** Plain grid by depth, for the degenerate all-cycles case. */
function depthOnlyPositions(
  net: PbtNetwork,
  depth: Map<string, number>,
  opts: LayoutOptions,
): Map<string, { x: number; y: number }> {
  const byDepth = new Map<number, string[]>();
  for (const n of net.nodes) {
    const d = depth.get(n.id) ?? 0;
    byDepth.set(d, [...(byDepth.get(d) ?? []), n.id]);
  }
  const positions = new Map<string, { x: number; y: number }>();
  const across = opts.nodeWidth + 60;
  const down = 150;
  for (const [d, ids] of byDepth) {
    ids.forEach((id, i) => {
      const offset = (i - (ids.length - 1) / 2) * across;
      positions.set(
        id,
        opts.rankDir === 'TB' ? { x: 400 + offset, y: 100 + d * down } : { x: 100 + d * across, y: 300 + offset },
      );
    });
  }
  return positions;
}


/**
 * The primary context is the one whose influence reaches furthest. On a map with
 * a single context that is trivially it; on a map with several it picks the one
 * the formulation actually hangs off, rather than whichever happened to be typed
 * first.
 */
function pickPrimaryContext(net: PbtNetwork, contextIds: string[]): string | null {
  if (contextIds.length === 0) return null;
  if (contextIds.length === 1) return contextIds[0]!;

  const out = new Map<string, string[]>();
  for (const n of net.nodes) out.set(n.id, []);
  for (const e of net.edges) if (e.source !== e.target) out.get(e.source)?.push(e.target);

  let best = contextIds[0]!;
  let bestReach = -1;
  for (const id of contextIds) {
    const seen = new Set<string>([id]);
    const queue = [id];
    let head = 0;
    while (head < queue.length) {
      for (const next of out.get(queue[head++]!) ?? []) {
        if (!seen.has(next)) {
          seen.add(next);
          queue.push(next);
        }
      }
    }
    if (seen.size > bestReach) {
      bestReach = seen.size;
      best = id;
    }
  }
  return best;
}

export interface Box {
  w: number;
  h: number;
}

/**
 * Push overlapping boxes apart.
 *
 * Force-directed layouts treat nodes as points with a repulsion radius, so with
 * rectangles of different sizes they routinely leave boxes sitting on top of
 * each other. Rather than fight the physics with ever-larger repulsion values
 * (which just inflates the whole diagram), overlaps are removed afterwards.
 *
 * Each pass finds overlapping pairs and separates them along whichever axis
 * needs the smaller push, which preserves the arrangement the layout worked out
 * instead of scattering it. It converges quickly because every pass strictly
 * reduces total overlap; the iteration cap is only there so a pathological case
 * cannot spin.
 */
export function separateOverlaps(
  positions: Map<string, { x: number; y: number }>,
  sizes: Map<string, Box>,
  gap = 26,
  maxPasses = 60,
): Map<string, { x: number; y: number }> {
  const ids = [...positions.keys()];
  const pos = new Map([...positions].map(([id, p]) => [id, { ...p }]));

  for (let pass = 0; pass < maxPasses; pass++) {
    let moved = false;

    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = ids[i]!;
        const b = ids[j]!;
        const pa = pos.get(a)!;
        const pb = pos.get(b)!;
        const sa = sizes.get(a) ?? { w: 180, h: 60 };
        const sb = sizes.get(b) ?? { w: 180, h: 60 };

        const minX = (sa.w + sb.w) / 2 + gap;
        const minY = (sa.h + sb.h) / 2 + gap;
        const dx = pb.x - pa.x;
        const dy = pb.y - pa.y;
        const overlapX = minX - Math.abs(dx);
        const overlapY = minY - Math.abs(dy);
        if (overlapX <= 0 || overlapY <= 0) continue;

        moved = true;
        // Separate along the axis needing the smaller correction.
        if (overlapX < overlapY) {
          const push = (overlapX / 2) * (dx === 0 ? 1 : Math.sign(dx) || 1);
          pa.x -= push;
          pb.x += push;
        } else {
          const push = (overlapY / 2) * (dy === 0 ? 1 : Math.sign(dy) || 1);
          pa.y -= push;
          pb.y += push;
        }
      }
    }

    if (!moved) break;
  }

  for (const [id, p] of pos) pos.set(id, { x: Math.round(p.x), y: Math.round(p.y) });
  return pos;
}
