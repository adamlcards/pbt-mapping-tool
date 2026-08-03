# Changelog

All notable changes to this project are recorded here. A returning user should
be able to see at a glance that the tool is maintained.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and
this project uses [semantic versioning](https://semver.org/).

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
