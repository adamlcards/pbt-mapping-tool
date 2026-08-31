# Translation

How the interface gets into another language, and how corrections get back in.

There is no i18n library. A locale is a plain TypeScript object; adding one is
copying a file and translating the values. That is a deliberate trade — it costs
a little duplication and saves a dependency, a build step, and a class of bug
where the framework's plural rules disagree with the ones the strings were
written for.

## The pieces

| Path | What it is |
|---|---|
| `src/i18n/strings.ts` | **The source of truth.** Every user-facing string in English. Nothing outside this file should contain a sentence a user reads. |
| `src/i18n/locales/<code>.ts` | One translation. A `PartialStrings` — anything missing falls back to English rather than rendering blank. |
| `src/i18n/locales.ts` | The registry. Native name, English name, direction, and whether a native speaker has signed it off. |
| `src/i18n/index.ts` | `useStrings()` for components, `t()` for everything else, and the picker's language list. |
| `src/i18n/catalogue.json` | Generated. The flattened English catalogue with per-section notes. |

## Reading a string in code

```tsx
const t = useStrings();          // in a component — re-renders on a language change
return <button>{t.action.save}</button>;
```

```ts
import { t } from '../i18n/strings';   // outside React — exporters, analysis
const label = t().category.affect.label;
```

Use `useStrings()` in components. `t()` does not subscribe to anything, so a
component that reads it will show stale text until something else re-renders it.

### Placeholders and plurals

```ts
fmt(t.toolHint.pendingSource, { label: node.label });
plural({ one: t.toast.pasted_one, other: t.toast.pasted_other }, count);
```

Never build a sentence by concatenating translated fragments. `'There are ' +
n + ' loops'` cannot be reordered, and German, Japanese, Korean and Turkish all
need it reordered. Write the whole sentence as one template with `{placeholders}`
and let the translator move them.

## Adding a language

1. Add the file:

   ```bash
   cp src/i18n/locales/es.ts src/i18n/locales/xx.ts
   ```

   Rename the export to `xx`, fix `meta`, and translate the values.

2. Register it in `src/i18n/locales.ts` with `reviewed: false`.

3. Check it:

   ```bash
   npm run i18n:check
   ```

   This catches the three things you cannot see by looking at the app in a
   language you do not read: missing keys (which silently fall back to English,
   so the interface is half-translated and nobody notices), unknown keys (a
   typo'd key is dead weight that never renders), and dropped or invented
   `{placeholders}` — the ones that actually break, printing a sentence with the
   number missing or a literal brace on screen.

## Getting a translation reviewed

The people who can judge whether "Overt behaviour" has been rendered correctly
are clinicians, not translators, and they are not going to read TypeScript. So
the review happens in Word.

```bash
npm run i18n:review
```

writes `build/translation-review/pbtmap-translation-review-<code>.docx`, one per
language. Each is landscape, four columns — key, English, the draft translation,
and an empty column for the reviewer — grouped by where the strings appear in
the app, with the clinical vocabulary first. That ordering is the point: a
reviewer who only has twenty minutes should spend them on the EEMM category
names, not on the export dialog.

Upload to Google Docs and share. Tracked changes, comments, or typing in the
fourth column all work.

When a document comes back:

```bash
npm run i18n:merge -- build/returned/pbtmap-translation-review-de.docx
```

This reads both the fourth column and any direct edits to the third, rejects
anything that has lost or gained a `{placeholder}`, and writes a patch to
`build/corrections-<code>.json`. It does **not** touch the locale file until you
have read the patch and re-run it with `--apply`. A returned document is other
people's work arriving from outside the repo; it gets read before it gets
written to source.

Once a native-speaking clinician has signed a language off, set `reviewed: true`
in `src/i18n/locales.ts`. Until then the picker marks it as a draft — a
confidently wrong translation of clinical terminology is worse than an obviously
incomplete one, and a clinician deserves to know which they are looking at.

## What is deliberately not translated

- **Keyboard letters.** `S`, `E`, `A`, `C`, `D`, `F`, `O`, `M`, `G`, and the
  Ctrl/Cmd combinations. These are physical keys, not words.
- **Node and connection labels on a map.** They are the client's own words. A
  template's labels are translated, but only at the moment the template is
  loaded — switching language afterwards must never rewrite a map someone has
  started working on.
- **`CATEGORY_META.label`, `TRIAL_LABEL`, and the other English constants in
  `model/`.** These are the stable identity of each category for CSV exports,
  tests and debugging. What a user sees comes from `categoryLabel()` and
  friends, which read the active language.

## The one thing that will bite you

`src/i18n/strings.ts` must not have `as const`. With it, every value is frozen
to its literal English type and a locale can only legally contain the exact
English text — the type error this produces is 400 lines long and says nothing
useful about the actual cause.
