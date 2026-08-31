import { create } from 'zustand';
import { en, setActiveStrings, type PartialStrings, type Strings } from './strings';
import { LOCALE_CATALOGUE } from './locales';

export { fmt, plural, t } from './strings';
export type { Strings } from './strings';

export type LocaleCode = keyof typeof LOCALE_CATALOGUE;

export interface LocaleInfo {
  code: LocaleCode;
  /** What the picker shows: the language's name in itself. */
  nativeName: string;
  /** Secondary line, for someone who does not read the script. */
  englishName: string;
  dir: 'ltr' | 'rtl';
  /** False until a native speaker has signed the proofreading document off. */
  reviewed: boolean;
}

/**
 * Fill a partial locale from English.
 *
 * A locale in progress is more useful than no locale, and a missing key should
 * degrade to readable English rather than to an empty button. One level of
 * nesting is all the catalogue has, so a shallow merge per group is enough.
 */
function merge(partial: PartialStrings): Strings {
  const out = {} as Record<string, unknown>;
  for (const key of Object.keys(en) as (keyof Strings)[]) {
    const base = en[key];
    const over = partial[key];
    out[key] =
      over && typeof base === 'object' && base !== null && !Array.isArray(base)
        ? { ...base, ...(over as object) }
        : (over ?? base);
  }
  return out as Strings;
}

const RESOLVED = new Map<LocaleCode, Strings>();

export function strings(code: LocaleCode): Strings {
  const cached = RESOLVED.get(code);
  if (cached) return cached;
  const built = code === 'en' ? en : merge(LOCALE_CATALOGUE[code].strings);
  RESOLVED.set(code, built);
  return built;
}

export const LOCALES: LocaleInfo[] = (Object.keys(LOCALE_CATALOGUE) as LocaleCode[]).map((code) => {
  const entry = LOCALE_CATALOGUE[code];
  return {
    code,
    nativeName: entry.nativeName,
    englishName: entry.englishName,
    dir: entry.dir,
    reviewed: entry.reviewed,
  };
});

function isLocale(code: string): code is LocaleCode {
  return code in LOCALE_CATALOGUE;
}

/**
 * What language to open in.
 *
 * An explicit choice wins and is remembered. Otherwise follow the browser,
 * matching the full tag first (`pt-BR`) and then the base language (`pt`), so
 * someone whose machine is set to Portuguese gets Portuguese rather than
 * English just because the region does not match exactly.
 */
function initialLocale(): LocaleCode {
  try {
    const saved = localStorage.getItem('pbt-locale');
    if (saved && isLocale(saved)) return saved;
  } catch {
    /* storage blocked; fall through to the browser preference */
  }
  for (const tag of navigator.languages ?? [navigator.language]) {
    if (!tag) continue;
    if (isLocale(tag)) return tag;
    const base = tag.split('-')[0]!;
    if (isLocale(base)) return base;
    const regional = (Object.keys(LOCALE_CATALOGUE) as LocaleCode[]).find((c) => c.split('-')[0] === base);
    if (regional) return regional;
  }
  return 'en';
}

interface LocaleState {
  code: LocaleCode;
  setLocale: (code: LocaleCode) => void;
}

/**
 * The active language.
 *
 * Held in a store rather than a module variable because changing it has to
 * re-render every component that reads a string, and a plain variable would
 * change the text without React ever hearing about it.
 */
export const useLocale = create<LocaleState>((set) => {
  const code = initialLocale();
  applyLocale(code);
  return {
    code,
    setLocale: (next) => {
      applyLocale(next);
      try {
        localStorage.setItem('pbt-locale', next);
      } catch {
        /* storage blocked; the choice still applies for this session */
      }
      set({ code: next });
    },
  };
});

/**
 * Side effects that live outside React: the module-level `t()` used by the
 * exporters, and the document's own language and direction, which the browser
 * needs for hyphenation, quotation marks and screen-reader pronunciation.
 */
function applyLocale(code: LocaleCode): void {
  setActiveStrings(strings(code));
  if (typeof document !== 'undefined') {
    document.documentElement.lang = code;
    document.documentElement.dir = LOCALE_CATALOGUE[code].dir;
  }
}

/** The hook every component uses. Re-renders on a language change. */
export function useStrings(): Strings {
  return strings(useLocale((s) => s.code));
}
