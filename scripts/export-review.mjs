/**
 * Dump the English catalogue plus every locale into one JSON, for building the
 * per-language proofreading documents.
 *
 *   node scripts/export-review.mjs [outfile]
 */
import { build } from 'esbuild';
import { mkdtempSync, rmSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const OUT = process.argv[2] ?? join(ROOT, 'build/review-data.json');
const tmp = mkdtempSync(join(tmpdir(), 'pbt-review-'));

const flatten = (obj, into = new Map(), prefix = '') => {
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') into.set(prefix + k, v);
    else if (v && typeof v === 'object') flatten(v, into, `${prefix}${k}.`);
  }
  return into;
};

async function load(entry, name) {
  const outfile = join(tmp, `${name}.mjs`);
  await build({ entryPoints: [entry], outfile, bundle: true, format: 'esm', platform: 'neutral', logLevel: 'silent' });
  return import(pathToFileURL(outfile).href);
}

/** Pull the translator's own note out of the locale file's leading JSDoc. */
function translatorNote(source) {
  const block = source.match(/\/\*\*([\s\S]*?)\*\//);
  if (!block) return '';
  return block[1]
    .split('\n')
    .map((l) => l.replace(/^\s*\*ted?\s?/, '').replace(/^\s*\*\s?/, '').trim())
    .filter(Boolean)
    .slice(1)
    .join(' ')
    .trim();
}

try {
  const { en } = await load(join(ROOT, 'src/i18n/strings.ts'), 'en');
  const catalogue = JSON.parse(readFileSync(join(ROOT, 'src/i18n/catalogue.json'), 'utf8'));
  const source = flatten(en);

  const locales = {};
  for (const file of readdirSync(join(ROOT, 'src/i18n/locales')).filter((f) => f.endsWith('.ts')).sort()) {
    const code = file.replace(/\.ts$/, '');
    const path = join(ROOT, 'src/i18n/locales', file);
    const mod = await load(path, code.replace(/-/g, '_'));
    const obj = Object.values(mod)[0] ?? {};
    const flat = flatten(obj);
    locales[code] = {
      code,
      nativeName: flat.get('meta.nativeName') ?? code,
      englishName: flat.get('meta.name') ?? code,
      dir: flat.get('meta.dir') ?? 'ltr',
      note: translatorNote(readFileSync(path, 'utf8')),
      strings: Object.fromEntries(flat),
      translated: [...source.keys()].filter((k) => flat.has(k)).length,
      total: source.size,
    };
  }

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(
    OUT,
    JSON.stringify({ generatedAt: catalogue.generatedAt, sections: catalogue.sections, entries: catalogue.entries, locales }, null, 2),
  );
  console.log(`${Object.keys(locales).length} locales → ${OUT}`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
