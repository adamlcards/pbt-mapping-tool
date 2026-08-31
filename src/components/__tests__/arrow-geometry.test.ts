import { describe, expect, it } from 'vitest';
import { arrowHeadLength } from '../Graph';

/**
 * Pins the arrowhead geometry against Cytoscape's own.
 *
 * `arrowHeadLength` reproduces a formula that lives inside Cytoscape and is not
 * part of its public API, so the risk is a silent upgrade changing it under us.
 * These cases restate both the formula and — more importantly — the *reason* it
 * has to be bigger than the gap Cytoscape leaves for the line. If a future
 * version makes them agree, the last test here fails and the override in
 * `correctArrowGap` can be deleted.
 */

/** Cytoscape's `standardGap`: where it actually stops drawing the line. */
const standardGap = (width: number, scale: number) => width * scale * 2;

/** The three line widths and arrow scales the map uses, by strength. */
const WIDTHS = [1.5, 2.6, 4];
const SCALES = [1, 1.5, 2.1];

describe('arrowHeadLength', () => {
  it('matches Cytoscape: 0.3 x max((width x 13.37)^0.9, 29) x scale', () => {
    expect(arrowHeadLength(4, 2.1)).toBeCloseTo(Math.pow(4 * 13.37, 0.9) * 2.1 * 0.3, 6);
  });

  it('applies the floor of 29 that keeps thin arrowheads from vanishing', () => {
    // A 1.5-wide line is under the floor: (1.5 x 13.37)^0.9 is about 15, so 29 wins.
    expect(Math.pow(1.5 * 13.37, 0.9)).toBeLessThan(29);
    expect(arrowHeadLength(1.5, 1)).toBeCloseTo(29 * 0.3, 6);
  });

  it('scales linearly with arrow-scale', () => {
    expect(arrowHeadLength(2.6, 3)).toBeCloseTo(arrowHeadLength(2.6, 1) * 3, 6);
  });

  it('is longer than the gap at every strength the map uses', () => {
    // This is the bug. Cytoscape stops the line at `standardGap` but draws the
    // head `arrowHeadLength` long, so the line runs into the head — invisible
    // on a filled head, a black line across a hollow one.
    for (let i = 0; i < WIDTHS.length; i++) {
      const width = WIDTHS[i]!;
      const scale = SCALES[i]!;
      expect(arrowHeadLength(width, scale)).toBeGreaterThan(standardGap(width, scale));
    }
  });

  it('is worst, proportionally, on the thinnest line', () => {
    const overlap = (w: number, s: number) => arrowHeadLength(w, s) / standardGap(w, s);
    expect(overlap(WIDTHS[0]!, SCALES[0]!)).toBeGreaterThan(overlap(WIDTHS[2]!, SCALES[2]!));
  });
});
