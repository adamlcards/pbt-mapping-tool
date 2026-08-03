/**
 * Produces one self-contained HTML file that runs by double-clicking, with no
 * server, no install and no internet.
 *
 * Two post-processing steps matter and neither is optional:
 *  1. Strip type="module". Module scripts are blocked from file:// origins in
 *     some browsers, which is exactly where this file is meant to be opened.
 *  2. Move the script to the end of <body>. Without the module type it is a
 *     blocking script, so left in <head> it executes before the mount point
 *     exists and renders a blank page with no error to explain it.
 */
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const outDir = mkdtempSync(join(tmpdir(), 'pbt-standalone-'));

await build({
  configFile: false,
  plugins: [react(), viteSingleFile()],
  build: {
    outDir,
    emptyOutDir: true,
    sourcemap: false,
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    rollupOptions: { output: { format: 'iife', inlineDynamicImports: true } },
  },
});

const file = join(outDir, 'index.html');
let html = readFileSync(file, 'utf8');

const scriptMatch = html.match(/<script[^>]*>[\s\S]*?<\/script>/);
if (!scriptMatch) throw new Error('No inline bundle found in build output.');

const script = scriptMatch[0].replace(/<script type="module"([^>]*)>/, '<script$1>');

// Replacement must be a function. The bundle contains $& and $' sequences from
// regex code inside dependencies, and String.replace would interpret those as
// substitution patterns and silently corrupt the JavaScript.
html = html.replace(scriptMatch[0], () => '').replace('</body>', () => `  ${script}\n  </body>`);

if (html.includes('type="module"')) throw new Error('A module script survived post-processing.');
if (html.indexOf('<script') < html.indexOf('<div id="root">')) {
  throw new Error('Script still precedes the mount point.');
}

const dest = process.argv[2] ?? 'PBT-Mapping-Tool.html';
writeFileSync(dest, html);
console.log(`Wrote ${dest} (${(html.length / 1024).toFixed(0)} kB)`);
