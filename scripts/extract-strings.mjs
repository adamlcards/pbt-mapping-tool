/**
 * Flatten the English catalogue into JSON, for the translation workflow.
 *
 * The catalogue is TypeScript, so it is transpiled with the esbuild that vite
 * already depends on rather than adding a runner. Output is ordered exactly as
 * the source is, which is what makes the proofreading documents readable: keys
 * that appear together in the interface stay together on the page.
 *
 *   node scripts/extract-strings.mjs [outfile]
 */
import { build } from 'esbuild';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const OUT = process.argv[2] ?? join(ROOT, 'src/i18n/catalogue.json');

/**
 * Where each group of keys is seen in the running app.
 *
 * This is the single most useful column for a proofreader: "Analysis" alone is
 * ambiguous, "Analysis panel → Most connected table" is not, and a translator
 * who can picture the screen picks a different word from one who cannot.
 */
const SECTIONS = {
  meta: 'Language metadata — not shown to users. Do not translate the code or dir.',
  app: 'Application name, shown in the top-left, and the network title field.',
  tool: 'The four drawing modes, on the centre of the toolbar. Very short.',
  toolHint: 'The single line under the toolbar that says what the current mode does.',
  action: 'Button labels throughout the app. Keep short — these sit in a crowded toolbar.',
  tooltip: 'Hover tooltips. Longer than the button they describe; this is where users learn the shortcuts.',
  privacy: 'The badge in the top-right saying where the data is stored, and its tooltip.',
  panel: 'Headings for the side panels (Analysis, Timepoints, List view).',
  nodeEditor: 'The dialog for creating and editing a box on the map.',
  edgeEditor: 'The dialog for creating and editing an arrow between two boxes.',
  category: 'EEMM category names. CLINICAL TERMINOLOGY — follow the published PBT/ACT translation in your language if one exists. "prefix" is printed on the box itself and must stay short.',
  categoryGroup: 'Headings above the category buttons in the node editor.',
  strength: 'How strong an influence is. Three levels only.',
  valence: 'Whether a link helps the person. CLINICAL TERMINOLOGY.',
  trial: 'Recording what happened when an intervention was tried.',
  analysis: 'The Analysis side panel: tab names, table column headings and explanatory notes.',
  summary: 'The written, plain-language summary of the network in the Analysis panel. Whole sentences assembled at runtime — keep every {placeholder}.',
  guided: 'The step-by-step guided build panel. Long-form teaching text.',
  snapshots: 'The Timepoints panel: saving the map at a point in time and comparing two.',
  structure: 'The List view — the keyboard- and screen-reader-accessible version of the map.',
  templates: 'Names and descriptions of the starting-point maps in the Templates dialog.',
  templateNodes: 'The box labels inside each template. Everyday clinical phrasing, not technical terms — say it the way a clinician in your language would.',
  templateNote: 'Appended to a template description when it is loaded.',
  exportDialog: 'The Export dialog. File format names — keep JSON, CSV, PNG, SVG, PDF as they are.',
  share: 'The Share link dialog.',
  clearDialog: 'The confirmation dialog for clearing the whole map.',
  kernel: 'The Treatment kernels dialog (a feature still in development).',
  help: 'The Help dialog. The most-read text in the tool.',
  about: 'The About dialog: credits, grounding in the literature, and the privacy statement.',
  error: 'Shown only when the drawing canvas fails to start.',
  toast: 'Brief messages that appear at the bottom of the screen and fade after a few seconds.',
  language: 'The language picker itself.',
  a11y: 'Screen-reader labels. Never visible on screen, but read aloud.',
};

/** Keys a translator must leave exactly as they are. */
const DO_NOT_TRANSLATE = new Set(['meta.code', 'meta.dir']);

const tmp = mkdtempSync(join(tmpdir(), 'pbt-i18n-'));
try {
  const bundle = join(tmp, 'strings.mjs');
  await build({
    entryPoints: [join(ROOT, 'src/i18n/strings.ts')],
    outfile: bundle,
    bundle: true,
    format: 'esm',
    platform: 'neutral',
    logLevel: 'silent',
  });
  const { en } = await import(pathToFileURL(bundle).href);

  // Recursive, not one level: `category.affect.label` and `strength.1` are two
  // deep, and a shallow walk silently emitted "[object Object]" as the English
  // for every category — which then shipped to translators as the text to
  // translate.
  const entries = [];
  const walk = (obj, prefix, group) => {
    for (const [k, value] of Object.entries(obj)) {
      const key = prefix ? `${prefix}.${k}` : k;
      const top = group ?? k;
      if (value && typeof value === 'object') {
        walk(value, key, top);
        continue;
      }
      entries.push({
        key,
        group: top,
        english: value,
        section: SECTIONS[top] ?? top,
        placeholders: [...String(value).matchAll(/\{(\w+)\}/g)].map((m) => m[1]),
        fixed: DO_NOT_TRANSLATE.has(key),
      });
    }
  };
  walk(en, '', null);

  const payload = {
    generatedAt: new Date().toISOString().slice(0, 10),
    sourceLanguage: 'en',
    count: entries.length,
    words: entries.reduce((n, e) => n + String(e.english).split(/\s+/).filter(Boolean).length, 0),
    sections: SECTIONS,
    entries,
  };
  writeFileSync(OUT, JSON.stringify(payload, null, 2));
  console.log(`${entries.length} strings, ${payload.words} words → ${OUT}`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
