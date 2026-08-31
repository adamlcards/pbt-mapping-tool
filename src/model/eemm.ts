import { t } from '../i18n/strings';
/**
 * The Extended Evolutionary Meta-Model (EEMM) taxonomy, as set out in the
 * Process-Based Therapy literature (Hayes, Hofmann & Ciarrochi).
 *
 * Context is deliberately not treated as another dimension. In the textbook
 * figures it is drawn differently from everything else, because it is not a
 * process the person is doing: it is the situation the processes happen in.
 * That distinction is carried by `isContext`, and it drives both the box shape
 * and where the node sits in the layout.
 */

export const EEMM_CATEGORIES = [
  'uncategorised',
  'affect',
  'cognition',
  'attention',
  'self',
  'motivation',
  'overtBehaviour',
  'biophysiological',
  'sociocultural',
  'context',
] as const;

export type EemmCategory = (typeof EEMM_CATEGORIES)[number];

export interface CategoryMeta {
  id: EemmCategory;
  /**
   * English label, kept as the stable identity of the category for exports,
   * tests and debugging. What a *user* sees comes from `categoryLabel()`, which
   * reads the active language. Do not render this directly.
   */
  label: string;
  /**
   * English prefix printed in bold inside the box. Same rule as `label`: the
   * drawn text comes from `categoryPrefix()`.
   */
  prefix: string;
  group: 'dimension' | 'level' | 'other';
  colour: string;
  border: string;
  /** Context boxes get rounded corners; processes are square. */
  isContext: boolean;
  /** English hint. Rendered via `categoryHint()`. */
  hint: string;
}

/**
 * Soft, low-saturation fills with a darker border of the same hue, so black
 * label text sits comfortably on every one and the map stays calm rather than
 * looking like a warning sign. Every fill clears 12:1 against black text.
 */
export const CATEGORY_META: Record<EemmCategory, CategoryMeta> = {
  uncategorised: {
    id: 'uncategorised', label: 'Uncategorised', prefix: '', group: 'other',
    colour: '#ffffff', border: '#5f6672', isContext: false,
    hint: 'Not yet classified. Fine to leave while you are still thinking.',
  },
  affect: {
    id: 'affect', label: 'Affect', prefix: 'Affect', group: 'dimension',
    colour: '#fde4d3', border: '#b05a1f', isContext: false,
    hint: 'Emotions and feelings. Avoiding them, or being willing to have them.',
  },
  cognition: {
    id: 'cognition', label: 'Cognition', prefix: 'Cognition', group: 'dimension',
    colour: '#d8e6fb', border: '#245ba8', isContext: false,
    hint: 'Thoughts, beliefs, rules, rumination, defusion.',
  },
  attention: {
    id: 'attention', label: 'Attention', prefix: 'Attention', group: 'dimension',
    colour: '#d6ede0', border: '#1c7350', isContext: false,
    hint: 'What is being noticed, and what is not. Flexible or narrow focus.',
  },
  self: {
    id: 'self', label: 'Self', prefix: 'Self', group: 'dimension',
    colour: '#e6dcf5', border: '#6a3fa0', isContext: false,
    hint: 'Self-concept, identity, self-criticism, self-as-context.',
  },
  motivation: {
    id: 'motivation', label: 'Motivation', prefix: 'Motivation', group: 'dimension',
    colour: '#fbeec4', border: '#8a6a00', isContext: false,
    hint: 'Values, goals, what the person is moving toward or away from.',
  },
  overtBehaviour: {
    id: 'overtBehaviour', label: 'Overt behaviour', prefix: 'Overt behaviour', group: 'dimension',
    colour: '#fbdde8', border: '#a3255d', isContext: false,
    hint: 'Observable action. What the person actually does.',
  },
  biophysiological: {
    id: 'biophysiological', label: 'Biophysiological', prefix: 'Biophysiological', group: 'level',
    colour: '#dee0f7', border: '#3c46a2', isContext: false,
    hint: 'Sleep, pain, illness, medication, arousal, physiology.',
  },
  sociocultural: {
    id: 'sociocultural', label: 'Sociocultural', prefix: 'Sociocultural', group: 'level',
    colour: '#d2eeeb', border: '#12686d', isContext: false,
    hint: 'Relationships, family, culture, social support or pressure.',
  },
  context: {
    id: 'context', label: 'Context / event', prefix: 'Event', group: 'other',
    colour: '#ffffff', border: '#3d434d', isContext: true,
    hint: 'A situation or event, not something the person does. Drawn with rounded corners.',
  },
};

/**
 * Strength, at three levels. Not ten, and not twenty-one.
 *
 * In the perceived-causal-network reliability work, edge ratings are the least
 * reproducible part of the method (test-retest around r = .28-.53, against
 * .53-.81 for node centrality). Finer gradations measure a precision that is
 * demonstrably not there, and they cost a slider and an argument about whether
 * it is a six or a seven on every single arrow.
 *
 * Kept numeric so loop gain, path products and every export work unchanged.
 */
export const STRENGTHS = [1, 2, 3] as const;
export type Strength = (typeof STRENGTHS)[number];

export const STRENGTH_LABEL: Record<Strength, string> = {
  1: 'A little',
  2: 'Moderately',
  3: 'A lot',
};

/**
 * Whether a link is helping the person or not.
 *
 * A property of the *link*, not the node. No process is inherently good or bad:
 * rumination and reflection are both thinking, and which is in play depends on
 * what it connects to and when. The judgement only becomes possible once two
 * things are put together, so that is where it is asked.
 */
export const LINK_VALENCES = ['neutral', 'helpful', 'unhelpful'] as const;
export type LinkValence = (typeof LINK_VALENCES)[number];

export const VALENCE_LABEL: Record<LinkValence, string> = {
  neutral: 'Not judged',
  helpful: 'Helping',
  unhelpful: 'Not helping',
};

/**
 * Near-black by default, exactly as the textbook draws it. Colour is opt-in.
 *
 * Theme-aware, and not merely for looks: the neutral colour is the default for
 * every unmarked link, and a near-black arrow on a near-black canvas is an
 * invisible arrow.
 */
export function valenceColour(valence: LinkValence, theme: 'light' | 'dark' = 'light'): string {
  if (theme === 'dark') {
    // Arrows cross the dark canvas between boxes, so the default has to be
    // light. Black-on-black was the previous bug.
    return { neutral: '#dde2e9', helpful: '#68cf95', unhelpful: '#ff958b' }[valence];
  }
  return { neutral: '#22262c', helpful: '#1f6f3f', unhelpful: '#b3261e' }[valence];
}

/** Light-theme values, for exports which are always on white. */
export const VALENCE_COLOUR: Record<LinkValence, string> = {
  neutral: '#22262c',
  helpful: '#1f6f3f',
  unhelpful: '#b3261e',
};

/**
 * Box colours in each theme.
 *
 * Dark mode keeps the *same hues* rather than inverting them. The category
 * colours are learned by repetition, so a scheme that changed between themes
 * would have to be learned twice, and a map would look unlike its own printout.
 * The fills are only taken down a notch so they do not glare against a dark
 * canvas, and the label stays dark because it sits on a pale box either way.
 */
export function categoryFill(id: EemmCategory, theme: 'light' | 'dark' = 'light') {
  const m = CATEGORY_META[id];
  if (theme === 'light') return { fill: m.colour, border: m.border, text: '#15181c' };
  return { fill: dim(m.colour, 0.82), border: m.border, text: '#15181c' };
}

/** Mix a colour towards black by `amount`, keeping its hue. */
function dim(hex: string, amount: number): string {
  const n = hex.replace('#', '');
  const to = (i: number) => Math.round(parseInt(n.slice(i, i + 2), 16) * amount);
  return `#${[0, 2, 4].map((i) => to(i).toString(16).padStart(2, '0')).join('')}`;
}

/**
 * The user-facing words for a category, in whatever language is active.
 *
 * Split from `CATEGORY_META` rather than translated in place because the
 * colours, shapes and grouping are the same in every language and only the
 * words change — and because exports and tests need a stable English name to
 * key on regardless of what the interface is currently showing.
 */
export function categoryLabel(id: EemmCategory): string {
  return t().category[id].label;
}

export function categoryPrefix(id: EemmCategory): string {
  return t().category[id].prefix;
}

export function categoryHint(id: EemmCategory): string {
  return t().category[id].hint;
}

export function strengthLabel(s: Strength): string {
  return t().strength[s];
}

export function valenceLabelOf(v: LinkValence): string {
  return t().valence[v];
}

export function categoriesByGroup(): { group: string; items: CategoryMeta[] }[] {
  const order: CategoryMeta['group'][] = ['other', 'dimension', 'level'];
  return order.map((g) => ({
    group: t().categoryGroup[g],
    items: EEMM_CATEGORIES.map((c) => CATEGORY_META[c]).filter((m) => m.group === g),
  }));
}
