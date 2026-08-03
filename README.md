# PBT Mapping Tool

A free, open-source tool for mapping process-based networks: the functional
relationships between the processes that maintain psychological suffering and
wellbeing.

Draw the map, find the loops that keep it going, and test what would break them.

**Everything stays in your browser.** No account, no server, no analytics.

---

## Why this exists

Existing browser tools let you draw a network and then leave you to read it by
eye. The questions clinicians actually want answered — *what is central here?
what loops is this person stuck in? if we changed one thing, would the cycle
break?* — stop being answerable by eye at about eight boxes, well below the size
of a real formulation.

This computes them.

## What it does

**Mapping, in the textbook's visual language**

- Square boxes for processes, rounded for events and contexts, each showing its
  EEMM category
- Filled arrowhead means *increases*, hollow means *decreases*; thicker lines
  with larger heads are stronger. No numbers on the arrows, and no reliance on
  colour, so it survives a black-and-white printout
- Three strength levels, not ten. Edge ratings are the least reproducible part
  of this method in the reliability literature, and finer gradations measure a
  precision that is not there
- Reciprocal influence draws as one line with a head at each end
- Whether a link is *helping* is a property of the link, not the process,
  because no process is helpful or harmful on its own

**Analysis**

- Centrality: in/out strength, expected influence, directed betweenness
- Feedback loops, classified reinforcing or balancing and ranked by loop gain
- Path tracing between any two boxes with cumulative signed effect
- Leverage: what reducing each process would do, including which protective
  processes it would suppress
- Every result is also rendered as plain sentences, not just tables

**Hypothesis mode** — mark what you are considering as a proposal, and compare
the map with and without it. It distinguishes two mechanisms that are genuinely
different:

- *Steady pressure* — one-way influence into a loop. Changes the level the cycle
  runs at, not its dynamics. Often enough, but nothing sustains it, so it lasts
  as long as the person keeps it up.
- *Self-correcting* — the loop feeds the new process and it pushes back. Changes
  the dynamics, and holds without effort.

**Trial tracking** — record what was tried and how it went. Something that
helped becomes part of the map; something that did not is kept but faded, so
nobody tries it again in six months having forgotten.

**Timepoints** — save the map at intake, redraw at session six, and see exactly
what was added, removed, re-rated and re-tried.

**Guided build** — six steps following the progression that gave these
interviews usable reliability, starting from the context.

**Exports** — JSON, edge list CSV, node list CSV with centrality, adjacency
matrix CSV (loads straight into qgraph, igraph or networkx), Markdown report,
PNG, SVG, print/PDF, and a timestamped build log.

**Accessibility** — full keyboard control, a List view giving the whole map as
screen-reader-navigable text, focus-trapped dialogs, and no meaning carried by
colour alone.

## Privacy

Stored in your browser's IndexedDB. No account, no server, no analytics, and no
webfont request. Share links encode the map in the URL fragment, which browsers
never transmit, so shared clinical content never reaches a server log.

The deployed site ships a Content-Security-Policy with `connect-src 'none'`, so
the page *cannot* make a network request even if a future change tried to. That
is worth more than the promise.

If the browser blocks storage — which happens when the HTML file is opened
directly from disk, or in some private windows — the app says so plainly and
warns before you close the tab.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # 78 tests
npm run build      # static output in dist/
npm run standalone # one self-contained HTML file
```

`npm run standalone` produces a single file that runs by double-clicking, with
no server and no internet. Useful on a locked-down machine, and it makes the
privacy claim visible rather than something to take on trust.

## Deploying

The build is fully static. See [DEPLOY.md](DEPLOY.md).

## Study mode

For research, deploy a *separate* instance with `VITE_STUDY_ENDPOINT` set, then:

```
https://your-study-deployment/?pid=PARTICIPANT_ID&wave=1
```

It autosaves the map and a timestamped event log to your endpoint and flushes on
tab close via `sendBeacon`. Local storage stays the source of truth until a save
is acknowledged, so a network hiccup never costs a participant their session.
Your endpoint needs one route: `POST /networks`.

Leave `VITE_STUDY_ENDPOINT` unset on the public deployment. With no endpoint,
study mode cannot activate at all.

## Project layout

```
src/
  model/       types, EEMM taxonomy, validation, import migration
  analysis/    centrality, loops, paths, leverage, hypothesis  (+ tests)
  state/       zustand store with undo/redo and event log
  persistence/ IndexedDB autosave, URL share encoding
  export/      CSV, JSON, SVG, Markdown exporters
  components/  canvas, layout, panels, dialogs
  templates/   starter maps
  i18n/        chrome strings (dialog prose is not yet externalised)
  study/       research instrumentation (inert unless configured)
```

## A caution about the analysis

Centrality, loops and leverage describe **the map that was drawn, not the
person**. The leverage and amplification figures assume influence is linear and
instantaneous, which it is not. They are a structured way to interrogate your own
formulation, and worth exactly as much as the judgements they were built from.
The interface says so wherever the numbers appear, and that should stay.

## Credit

The categories and the way this tool thinks about processes come from the
Extended Evolutionary Meta-Model in the process-based therapy work of **Steven C.
Hayes and Stefan G. Hofmann**.

The idea of doing this in a browser was inspired by Joseph Ciarrochi's
[plan9.netlify.app](https://plan9.netlify.app).

Tan Kean Sian conceived this tool and directed its development; all the code was
written with Claude, Anthropic's AI assistant. Questions and suggestions:
<xiangtks@gmail.com>.

## Licence

MIT.
