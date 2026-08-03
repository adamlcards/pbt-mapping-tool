# Contributing

Thanks for looking. Issues and pull requests are both welcome.

## Reporting something

Open a GitHub issue. The most useful reports say what you did, what you
expected, and what happened instead, plus your browser. If the map itself is
involved, **Export → Network (JSON)** and attach the file — but please check it
first, since a real formulation is clinical data and this is a public tracker.

## Working on it

```bash
npm install
npm run dev
npm test
npm run standalone   # rebuild the single-file version
```

Please run `npm test` and `npx tsc --noEmit` before opening a pull request.
Both are fast.

## Things worth knowing before changing the analysis

The analysis code is the part where a plausible-looking change can quietly make
the tool wrong, so a few conventions matter:

- **Strength is three levels, not more.** Edge ratings are the least reproducible
  part of this method in the reliability literature. Offering finer gradations
  would claim a precision that is not there.
- **The top strength maps to 0.8, not 1.0.** A coefficient of 1.0 would say an
  influence transmits perfectly, and a chain of them makes the propagation model
  diverge on ordinary clinical maps.
- **Loop parity is the mechanism.** An even number of decreasing links is
  reinforcing, an odd number is balancing. This is easy to get backwards, and
  there are tests pinning both directions.
- **Steady pressure is not failure.** A one-way influence into a loop changes the
  level, not the dynamics. An earlier version called that "no effect", which was
  wrong and clinically misleading.
- **Keep the caveats.** Wherever leverage or amplification numbers appear, the
  interface says they describe the map and not the person. That text is part of
  the feature.

If you change any of the above, please change the tests that pin it and say why
in the pull request.

## Translations

`src/i18n/strings.ts` holds the application chrome. Dialog prose is still inline
English; lifting it is a good first contribution if you want to translate the
tool properly.

## Licence

By contributing you agree your work is MIT licensed, like the rest of the
project.
