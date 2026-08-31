# Changelog

All notable changes to this project are recorded here. A returning user should
be able to see at a glance that the tool is maintained.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and
this project uses [semantic versioning](https://semver.org/).

## [Unreleased]

### Added
- **Languages.** The interface is available in 14 languages besides English:
  Spanish, Portuguese (Brazil), French, German, Italian, Dutch, Polish,
  Swedish, Russian, Simplified Chinese, Japanese, Malay, Korean and Turkish.
  Every one is marked as a draft in the picker until a native-speaking
  clinician has signed off its clinical vocabulary — see `docs/TRANSLATION.md`.
- **Copy and paste.** Shift-click builds a selection, Ctrl/Cmd+C copies it with
  the arrows that run between the copied boxes, Ctrl/Cmd+V pastes, Ctrl/Cmd+D
  duplicates in one step. Successive pastes cascade rather than stacking.
- **Adaptive and maladaptive centrality.** "Most connected" now splits three
  ways: all connections, only the ones marked as not helping, and only the ones
  marked as helping. A process can top the combined table on unhelpful links
  alone, which the combined figure cannot show.
- **Arrow colour by direction.** A toolbar toggle switches arrow colour from
  helping/not-helping to increases (blue) and decreases (orange), for reading a
  map for the direction of influence rather than its helpfulness.
- **Ratings on the map.** Severity and frequency can be printed on each box
  (toolbar, or M). Only ratings that were actually given are shown.

### Fixed
- **The toolbar survives translation.** Its three groups are sized to their
  content, and the longer labels in German, Dutch, Malay, Spanish and Russian
  pushed the third group onto a row of its own. The rows within each group are
  now balanced by meaning — what changes the map against what changes only the
  view; where a map comes from against how you learn and configure the tool —
  so no group is twice the width of its neighbour. Every language now renders
  in the same two rows English does.
- **Organise is now undoable.** It wrote the new positions without recording an
  undo step at all, so Ctrl+Z after Organise reverted whatever you did *before*
  it — and brought the old layout back with it. It is now one undo step, and
  running it on an already-tidy map no longer costs a wasted Ctrl+Z.

## [1.0.0] — 2026-08-04

First public release.

### Mapping
- Square boxes for processes and rounded boxes for events and contexts, each
  labelled with its EEMM category
- Filled arrowheads for *increases*, hollow for *decreases*, with three line
  widths and matching head sizes for strength
- Reciprocal influence drawn as a single double-headed arrow
- Helpfulness recorded on the link rather than the process
- Optional grid with snapping

### Analysis
- Centrality, feedback loop detection, path tracing and leverage estimation
- Hypothesis mode, distinguishing steady pressure from a self-correcting loop
- Trial tracking: proposed, adopted, or tried and ruled out
- Timepoints with a change comparison

### Practical
- Local-first storage with honest reporting when the browser blocks it
- Guided build, starter templates, full keyboard control and a List view for
  screen readers
- Exports: JSON, CSV edge list, CSV node list, adjacency matrix, Markdown
  report, PNG, SVG, print
- Share links that encode the map in the URL fragment
- Study mode for research deployments, inert unless configured
