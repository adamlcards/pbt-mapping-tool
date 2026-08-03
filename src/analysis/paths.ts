import { signOf, type EffectiveEdge, type GraphView } from './graph';
import type { NodeId } from '../model/types';

export interface CausalPath {
  nodes: NodeId[];
  labels: string[];
  edges: EffectiveEdge[];
  /** Product of normalised weights. Signed: negative means net decrease. */
  effect: number;
  /** 'increases' or 'decreases', the plain-language reading of the sign. */
  direction: 'increases' | 'decreases';
  length: number;
}

export interface PathResult {
  paths: CausalPath[];
  /** Sum of effects across all paths. The net story from source to target. */
  netEffect: number;
  /** Paths pushing the target up. */
  amplifying: number;
  /** Paths pushing the target down. */
  dampening: number;
  truncated: boolean;
}

const MAX_PATHS = 200;
const MAX_LENGTH = 6;

/**
 * All simple directed paths from source to target.
 *
 * This is what the tutorial asks the reader to do by eye in Step 3 (comparing a
 * direct route against an indirect one). Doing it by hand stops being possible
 * at about eight nodes, which is well below the size of a real clinical map.
 *
 * Effect along a path is the product of normalised weights. That treats
 * influence as multiplicative and is the same convention the tutorial uses when
 * it writes "+9 x +5". It is a heuristic, not a fitted model, and the UI says so.
 */
export function findPaths(
  g: GraphView,
  source: NodeId,
  target: NodeId,
  opts: { maxPaths?: number; maxLength?: number } = {},
): PathResult {
  const maxPaths = opts.maxPaths ?? MAX_PATHS;
  const maxLength = opts.maxLength ?? MAX_LENGTH;
  const paths: CausalPath[] = [];
  let truncated = false;

  if (!g.index.has(source) || !g.index.has(target)) {
    return { paths, netEffect: 0, amplifying: 0, dampening: 0, truncated: false };
  }

  const pathNodes: NodeId[] = [source];
  const pathEdges: EffectiveEdge[] = [];
  const visited = new Set<NodeId>([source]);

  const dfs = (current: NodeId): void => {
    if (paths.length >= maxPaths) {
      truncated = true;
      return;
    }
    for (const e of g.out.get(current) ?? []) {
      const next = e.target;
      if (next === target) {
        pathEdges.push(e);
        pathNodes.push(next);
        paths.push(makePath(g, [...pathNodes], [...pathEdges]));
        pathNodes.pop();
        pathEdges.pop();
        if (paths.length >= maxPaths) {
          truncated = true;
          return;
        }
        continue;
      }
      if (visited.has(next)) continue;
      if (pathEdges.length + 1 >= maxLength) {
        truncated = true;
        continue;
      }
      visited.add(next);
      pathNodes.push(next);
      pathEdges.push(e);
      dfs(next);
      pathEdges.pop();
      pathNodes.pop();
      visited.delete(next);
    }
  };

  dfs(source);

  // Strongest routes first.
  paths.sort((a, b) => Math.abs(b.effect) - Math.abs(a.effect));

  const netEffect = paths.reduce((acc, p) => acc + p.effect, 0);
  return {
    paths,
    netEffect: Math.round(netEffect * 1000) / 1000,
    amplifying: paths.filter((p) => p.effect > 0).length,
    dampening: paths.filter((p) => p.effect < 0).length,
    truncated,
  };
}

function makePath(g: GraphView, nodes: NodeId[], edges: EffectiveEdge[]): CausalPath {
  let effect = 1;
  for (const e of edges) effect *= e.w;
  return {
    nodes,
    labels: nodes.map((n) => g.labels.get(n) ?? n),
    edges,
    effect: Math.round(effect * 1000) / 1000,
    direction: signOf(effect) === -1 ? 'decreases' : 'increases',
    length: edges.length,
  };
}
