import { t, type Strings } from '../i18n/strings';
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
  /** Keys into the catalogue, not text. Everything a user reads is translated. */
  nameKey: keyof Strings['templates'];
  descriptionKey: keyof Strings['templates'];
  nodes: [labelKey: keyof Strings['templateNodes'], category: EemmCategory, x: number, y: number][];
  edges: [
    sourceIndex: number,
    targetIndex: number,
    direction: 'increases' | 'decreases',
    strength: Strength,
    valence: LinkValence,
  ][];
}

const SPECS: Spec[] = [
  { id: 'blank', nameKey: 'blankName', descriptionKey: 'blankDescription', nodes: [], edges: [] },
  {
    id: 'abc',
    nameKey: 'abcName',
    descriptionKey: 'abcDescription',
    nodes: [
      ['abcTrigger', 'context', 120, 120],
      ['abcThought', 'cognition', 120, 300],
      ['abcAction', 'overtBehaviour', 120, 480],
    ],
    edges: [
      [0, 1, 'increases', 2, 'neutral'],
      [1, 2, 'increases', 2, 'neutral'],
    ],
  },
  {
    id: 'worry-sleep',
    nameKey: 'worryName',
    descriptionKey: 'worryDescription',
    nodes: [
      ['worryCriticism', 'context', 100, 60],
      ['worryJobSecurity', 'cognition', 360, 220],
      ['worrySleep', 'biophysiological', 620, 130],
      ['worryFatigue', 'biophysiological', 620, 360],
      ['worryExercise', 'overtBehaviour', 340, 480],
      ['worryWithdrawal', 'sociocultural', 100, 340],
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
    nameKey: 'moodName',
    descriptionKey: 'moodDescription',
    nodes: [
      ['moodLow', 'affect', 380, 120],
      ['moodStayingHome', 'overtBehaviour', 620, 280],
      ['moodFewerThings', 'motivation', 380, 440],
      ['moodBurden', 'self', 120, 280],
      ['moodContact', 'sociocultural', 620, 500],
      ['moodNoticing', 'attention', 120, 500],
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
    nameKey: 'painName',
    descriptionKey: 'painDescription',
    nodes: [
      ['painPain', 'biophysiological', 380, 110],
      ['painFear', 'affect', 120, 280],
      ['painAvoiding', 'overtBehaviour', 380, 440],
      ['painDeconditioning', 'biophysiological', 640, 280],
      ['painDoingAnyway', 'motivation', 640, 500],
      ['painWillingness', 'affect', 120, 500],
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
  const strings = t();
  return SPECS.map(({ id, nameKey, descriptionKey }) => ({
    id,
    name: strings.templates[nameKey],
    description: strings.templates[descriptionKey],
  }));
}

export function buildTemplate(id: string): PbtNetwork | null {
  const spec = SPECS.find((s) => s.id === id);
  if (!spec) return null;

  const strings = t();
  const net = createNetwork(strings.templates[spec.nameKey]);
  net.meta.description =
    spec.id === 'blank'
      ? undefined
      : `${strings.templates[spec.descriptionKey]} ${strings.templateNote}`;

  // The labels are snapshotted into the network at load time, in the language
  // that was active. They are ordinary editable content from that point on —
  // switching language later must not rewrite a map someone has started
  // working on.
  const nodes = spec.nodes.map(([labelKey, category, x, y]) =>
    createNode({ label: strings.templateNodes[labelKey], category, position: { x, y } }),
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
