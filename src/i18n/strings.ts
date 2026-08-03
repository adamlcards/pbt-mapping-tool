/**
 * User-facing text for the application chrome.
 *
 * **Scope, stated honestly:** this covers the toolbar, tool hints, the analysis
 * panel headings and the privacy banner. The prose inside dialogs (Help, About,
 * the node and link editors, the guided build steps) is still written inline in
 * English. Translating the tool properly means lifting those too; this file is
 * the pattern to follow, not the finished job.
 *
 * No i18n library, deliberately. Adding a locale means copying the `en` object,
 * translating the values, and calling `setLocale`. Nothing else changes.
 */

export const en = {
  appName: 'Process-Based Network Mapping Tool',
  appShort: 'PBT Mapping Tool',

  tool: {
    select: 'Select',
    add: 'Add node',
    connect: 'Connect',
    delete: 'Delete',
  },
  toolHint: {
    select: 'Click to select and see what it connects to. Drag to move.',
    add: 'Click anywhere on the canvas to add a node.',
    connect: 'Click the influencing node, then the one it influences.',
    delete: 'Click a node or connection to remove it.',
  },

  action: {
    undo: 'Undo',
    redo: 'Redo',
    analyse: 'Analysis',
    guided: 'Guided build',
    snapshots: 'Timepoints',
    templates: 'Templates',
    export: 'Export',
    cancel: 'Cancel',
  },

  analysis: {
    title: 'Analysis',
    summary: 'What this network shows',
    central: 'Most connected',
    loops: 'Feedback loops',
    leverage: 'Where change might spread furthest',
    paths: 'Trace a pathway',
    reinforcing: 'Reinforcing',
    balancing: 'Balancing',
    reinforcingHelp:
      'Self-sustaining. An increase anywhere in the loop comes back around as a further increase, which is why the problem keeps going after the trigger has passed.',
    balancingHelp: 'Self-correcting. Something in this loop pushes back, which usually means a natural brake.',
    heuristicWarning:
      'These figures describe the map you drew, not the person. They assume influence is linear and immediate, which it is not. Use them to think with, never as a prediction.',
    empty: 'Add nodes and connections to see an analysis.',
  },

  privacy: {
    localOnly: 'Everything stays on this device',
    localOnlyLong:
      'Your map is saved in this browser and is never sent anywhere. Closing the tab is safe. Clearing your browser data will remove it, so export anything you want to keep.',
    studyMode: 'Study mode',
    studyModeLong:
      'You are taking part in a research study. Your map and the order you built it in are saved to the study server.',
  },
} as const;

export type Strings = typeof en;

let current: Strings = en;

export function t(): Strings {
  return current;
}

export function setLocale(strings: Strings): void {
  current = strings;
}
