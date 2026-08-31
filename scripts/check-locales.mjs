/**
 * Verify every locale against the English catalogue.
 *
 * Three failure modes worth catching automatically, because none of them is
 * visible by looking at the app in a language you do not read:
 *
 *  1. Missing keys — the locale silently falls back to English, so the
 *     interface is half-translated and nobody notices.
 *  2. Unknown keys — a typo'd key is dead weight that never renders.
 *  3. Dropped or invented {placeholders} — these are the ones that actually
 *     break: a lost {count} prints a sentence with the number missing, and an
 *     invented one prints a literal brace to the user.
 *
 *   node scripts/check-locales.mjs
 */
import { build } from 'esbuild';
import { mkdtempSync, rmSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const tmp = mkdtempSync(join(tmpdir(), 'pbt-check-'));

/**
 * Fully recursive: `category.affect.label` is two levels deep, and a one-level
 * walk compared object against object, which is always unequal and always
 * "present" — so a locale that had translated none of the category names still
 * scored 100%.
 */
const flatten = (obj, out = new Map(), prefix = '') => {
  for (const [k, value] of Object.entries(obj)) {
    const key = prefix + k;
    if (value && typeof value === 'object') flatten(value, out, `${key}.`);
    else out.set(key, value);
  }
  return out;
};
const placeholders = (text) => [...String(text).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

async function load(entry, name) {
  const outfile = join(tmp, `${name}.mjs`);
  await build({ entryPoints: [entry], outfile, bundle: true, format: 'esm', platform: 'neutral', logLevel: 'silent' });
  return import(pathToFileURL(outfile).href);
}

try {
  const { en } = await load(join(ROOT, 'src/i18n/strings.ts'), 'en');
  const source = flatten(en);

  const files = readdirSync(join(ROOT, 'src/i18n/locales')).filter((f) => f.endsWith('.ts'));
  let failures = 0;

  for (const file of files.sort()) {
    const code = file.replace(/\.ts$/, '');
    const mod = await load(join(ROOT, 'src/i18n/locales', file), code.replace(/-/g, '_'));
    const locale = flatten(Object.values(mod)[0] ?? {});

    const missing = [...source.keys()].filter((k) => !locale.has(k));
    const unknown = [...locale.keys()].filter((k) => !source.has(k));
    const untranslated = [...locale.entries()].filter(
      ([k, v]) => source.get(k) === v && !k.startsWith('meta.') && String(v).length > 3,
    );
    const badPlaceholders = [...locale.entries()].filter(([k, v]) => {
      const want = placeholders(source.get(k) ?? '');
      return want.join('|') !== placeholders(v).join('|');
    });

    const done = source.size - missing.length;
    const pct = Math.round((done / source.size) * 100);
    const bad = unknown.length + badPlaceholders.length;
    const status = missing.length === 0 && bad === 0 ? 'ok  ' : bad > 0 ? 'FAIL' : 'part';
    if (status === 'FAIL') failures++;

    console.log(
      `${status} ${code.padEnd(6)} ${String(pct).padStart(3)}%  ${done}/${source.size}` +
        (missing.length ? `  missing:${missing.length}` : '') +
        (unknown.length ? `  UNKNOWN:${unknown.length}` : '') +
        (badPlaceholders.length ? `  PLACEHOLDERS:${badPlaceholders.length}` : '') +
        (untranslated.length ? `  same-as-english:${untranslated.length}` : ''),
    );
    for (const k of unknown.slice(0, 5)) console.log(`       unknown key: ${k}`);
    for (const [k, v] of badPlaceholders.slice(0, 5)) {
      console.log(`       ${k}: expected {${placeholders(source.get(k)).join('} {')}} got "${String(v).slice(0, 70)}"`);
    }
    if (missing.length > 0 && missing.length <= 8) {
      for (const k of missing) console.log(`       missing: ${k}`);
    }
  }
  process.exit(failures > 0 ? 1 : 0);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
