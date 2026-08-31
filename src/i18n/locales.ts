import type { PartialStrings } from './strings';
import { es } from './locales/es';
import { pt_BR } from './locales/pt-BR';
import { fr } from './locales/fr';
import { de } from './locales/de';
import { it } from './locales/it';
import { nl } from './locales/nl';
import { pl } from './locales/pl';
import { sv } from './locales/sv';
import { ru } from './locales/ru';
import { zh_CN } from './locales/zh-CN';
import { ja } from './locales/ja';
import { ms } from './locales/ms';
import { ko } from './locales/ko';
import { tr } from './locales/tr';

interface LocaleEntry {
  strings: PartialStrings;
  nativeName: string;
  englishName: string;
  dir: 'ltr' | 'rtl';
  /**
   * True once a native-speaking clinician has signed off the proofreading
   * document for this language. Until then the picker marks it as a draft, so
   * nobody mistakes an unreviewed translation of clinical terminology for a
   * settled one.
   */
  reviewed: boolean;
}

/**
 * Every language the tool ships with.
 *
 * English is the source and is always complete. The rest are partial by
 * design — see `merge` in `./index.ts`, which fills gaps from English so a
 * half-finished locale degrades to readable English rather than to blanks.
 *
 * Locales are imported statically rather than lazily on purpose: the standalone
 * `npm run standalone` build inlines everything into one HTML file that has to
 * work from a local disk with no network, and a dynamically imported chunk
 * cannot be fetched there.
 */
export const LOCALE_CATALOGUE = {
  en: { strings: {}, nativeName: 'English', englishName: 'English', dir: 'ltr', reviewed: true },
  'es': { strings: es, nativeName: 'Español', englishName: 'Spanish', dir: 'ltr', reviewed: false },
  'pt-BR': { strings: pt_BR, nativeName: 'Português (Brasil)', englishName: 'Portuguese (Brazil)', dir: 'ltr', reviewed: false },
  'fr': { strings: fr, nativeName: 'Français', englishName: 'French', dir: 'ltr', reviewed: false },
  'de': { strings: de, nativeName: 'Deutsch', englishName: 'German', dir: 'ltr', reviewed: false },
  'it': { strings: it, nativeName: 'Italiano', englishName: 'Italian', dir: 'ltr', reviewed: false },
  'nl': { strings: nl, nativeName: 'Nederlands', englishName: 'Dutch', dir: 'ltr', reviewed: false },
  'pl': { strings: pl, nativeName: 'Polski', englishName: 'Polish', dir: 'ltr', reviewed: false },
  'sv': { strings: sv, nativeName: 'Svenska', englishName: 'Swedish', dir: 'ltr', reviewed: false },
  'ru': { strings: ru, nativeName: 'Русский', englishName: 'Russian', dir: 'ltr', reviewed: false },
  'zh-CN': { strings: zh_CN, nativeName: '简体中文', englishName: 'Chinese (Simplified)', dir: 'ltr', reviewed: false },
  'ja': { strings: ja, nativeName: '日本語', englishName: 'Japanese', dir: 'ltr', reviewed: false },
  'ms': { strings: ms, nativeName: 'Bahasa Melayu', englishName: 'Malay', dir: 'ltr', reviewed: false },
  'ko': { strings: ko, nativeName: '한국어', englishName: 'Korean', dir: 'ltr', reviewed: false },
  'tr': { strings: tr, nativeName: 'Türkçe', englishName: 'Turkish', dir: 'ltr', reviewed: false },
} as const satisfies Record<string, LocaleEntry>;
