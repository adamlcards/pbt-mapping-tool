import type { PbtNetwork } from '../model/types';
import { createEdge, createNetwork, createNode } from '../model/factory';
import type { EemmCategory, LinkValence, Strength } from '../model/eemm';

/**
 * Starter networks.
 *
 * Every link is left unjudged. A template is a prompt, not a formulation, and
 * pre-deciding which links are helping would put words in the clinician's mouth
 * about the one judgement that is genuinely theirs to make.
 *
 * A blank canvas is the single biggest barrier to a clinician trying this in a
 * real session. These are deliberately incomplete and slightly generic: they
 * exist to be argued with and edited, not adopted. Each one carries a note
 * saying so, because the risk of a template is that it becomes the formulation
 * instead of a prompt for one.
 */

interface Spec {
  id: string;
  name: string;
  description: string;
  nodes: [label: string, category: EemmCategory, x: number, y: number][];
  edges: [
    sourceIndex: number,
    targetIndex: number,
    direction: 'increases' | 'decreases',
    strength: Strength,
    valence: LinkValence,
  ][];
}

const SPECS: Spec[] = [
  { id: 'blank', name: 'Blank canvas', description: 'Start from nothing.', nodes: [], edges: [] },
  {
    id: 'abc',
    name: 'Three-term contingency',
    description: 'The starting scaffold: context, internal response, consequence. Build outward from here.',
    nodes: [
      ['Trigger or situation', 'context', 120, 120],
      ['Thought or feeling', 'cognition', 120, 300],
      ['What I do', 'overtBehaviour', 120, 480],
    ],
    edges: [
      [0, 1, 'increases', 2, 'neutral'],
      [1, 2, 'increases', 2, 'neutral'],
    ],
  },
  {
    id: 'worry-sleep',
    name: 'Worry and sleep cycle',
    description: 'A worked example. Useful for showing what a reinforcing loop looks like.',
    nodes: [
      ['Criticism at work', 'context', 100, 60],
      ['Worry about job security', 'cognition', 360, 220],
      ['Difficulty sleeping', 'biophysiological', 620, 130],
      ['Fatigue', 'biophysiological', 620, 360],
      ['Exercise', 'overtBehaviour', 340, 480],
      ['Social withdrawal', 'sociocultural', 100, 340],
    ],
    edges: [
      [0, 1, 'increases', 3, 'neutral'],
      [1, 2, 'increases', 3, 'neutral'],
      [2, 1, 'increases', 2, 'neutral'],
      [2, 3, 'increases', 3, 'neutral'],
      [3, 1, 'increases', 2, 'neutral'],
      [4, 3, 'decreases', 2, 'neutral'],
      [4, 1, 'decreases', 1, 'neutral'],
      [3, 4, 'decreases', 2, 'neutral'],
      [5, 1, 'increases', 2, 'neutral'],
      [5, 4, 'decreases', 2, 'neutral'],
    ],
  },
  {
    id: 'low-mood',
    name: 'Low mood and withdrawal',
    description: 'A common behavioural activation pattern. Put it in the person own words before using it.',
    nodes: [
      ['Low mood', 'affect', 380, 120],
      ['Staying home', 'overtBehaviour', 620, 280],
      ['Fewer things that matter to me', 'motivation', 380, 440],
      ['I am a burden', 'self', 120, 280],
      ['Contact with friends', 'sociocultural', 620, 500],
      ['Noticing small good moments', 'attention', 120, 500],
    ],
    edges: [
      [0, 1, 'increases', 3, 'neutral'],
      [1, 2, 'increases', 3, 'neutral'],
      [2, 0, 'increases', 3, 'neutral'],
      [0, 3, 'increases', 2, 'neutral'],
      [3, 1, 'increases', 2, 'neutral'],
      [1, 4, 'decreases', 3, 'neutral'],
      [4, 0, 'decreases', 2, 'neutral'],
      [5, 0, 'decreases', 2, 'neutral'],
      [0, 5, 'decreases', 2, 'neutral'],
    ],
  },
  {
    id: 'chronic-pain',
    name: 'Chronic pain and avoidance',
    description: 'A fear-avoidance pattern, with the deconditioning loop that usually maintains it.',
    nodes: [
      ['Pain', 'biophysiological', 380, 110],
      ['Fear of making it worse', 'affect', 120, 280],
      ['Avoiding activity', 'overtBehaviour', 380, 440],
      ['Deconditioning', 'biophysiological', 640, 280],
      ['Doing what matters anyway', 'motivation', 640, 500],
      ['Willingness to feel discomfort', 'affect', 120, 500],
    ],
    edges: [
      [0, 1, 'increases', 3, 'neutral'],
      [1, 2, 'increases', 3, 'neutral'],
      [2, 3, 'increases', 3, 'neutral'],
      [3, 0, 'increases', 2, 'neutral'],
      [5, 1, 'decreases', 3, 'neutral'],
      [5, 4, 'increases', 2, 'neutral'],
      [4, 2, 'decreases', 2, 'neutral'],
      [1, 4, 'decreases', 2, 'neutral'],
    ],
  },
];

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
}

export function listTemplates(): TemplateInfo[] {
  return SPECS.map(({ id, name, description }) => ({ id, name, description }));
}

export function buildTemplate(id: string): PbtNetwork | null {
  const spec = SPECS.find((s) => s.id === id);
  if (!spec) return null;

  const net = createNetwork(spec.name);
  net.meta.description =
    spec.id === 'blank'
      ? undefined
      : `${spec.description} This is a starting point, not a formulation. Replace the labels with the person's own words.`;

  const nodes = spec.nodes.map(([label, category, x, y]) =>
    createNode({ label, category, position: { x, y } }),
  );
  net.nodes = nodes;
  net.edges = spec.edges
    .map(([s, t, direction, strength, valence]) => {
      const source = nodes[s];
      const target = nodes[t];
      return source && target ? createEdge(source.id, target.id, direction, strength, valence) : null;
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);

  return net;
}
