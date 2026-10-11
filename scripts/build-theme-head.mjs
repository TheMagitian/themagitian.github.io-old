/**
 * Builds the `<head>`-inlinable theme script from the ESM engine.
 *
 * The engine (`src/scripts/theme/m3-engine.js`) must stay `import`-free so it
 * can be inlined verbatim to prevent a flash of unthemed content. Classic
 * `<script>` tags reject `export` keywords, so this script strips them, wraps
 * everything in an IIFE, and exposes a minimal `window.M3Theme` API plus
 * boot code that reads saved settings and paints `--md-sys-color-*` vars
 * before first paint.
 *
 * Run with: node scripts/build-theme-head.mjs (also runs as `prebuild`).
 */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const enginePath = join(root, "src/scripts/theme/m3-engine.js");
const outPath = join(root, "src/scripts/theme/m3-head.js");

const engine = await readFile(enginePath, "utf8");
const stripped = engine.replace(/^export\s+/gm, "");

const boot = `
var M3_KEY = "m3-theme-v1";
function m3Read() {
  try { return JSON.parse(localStorage.getItem(M3_KEY)) || {}; }
  catch (e) { return {}; }
}
var m3Saved = m3Read();
var m3PrefersDark = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
var m3State = {
  hue: m3Saved.hue != null ? m3Saved.hue : 260,
  chroma: m3Saved.chroma != null ? m3Saved.chroma : 48,
  variant: m3Saved.variant || "tonalSpot",
  dark: m3Saved.dark != null ? m3Saved.dark : !!m3PrefersDark,
  spec: m3Saved.spec || "2021"
};
function m3Kebab(s) { return s.replace(/([A-Z])/g, function (m) { return "-" + m.toLowerCase(); }); }
function m3Apply(st) {
  var colors = schemeColors({ hue: st.hue, chroma: st.chroma, variant: st.variant, isDark: st.dark, specVersion: st.spec });
  var root = document.documentElement;
  for (var k in colors) root.style.setProperty("--md-sys-color-" + m3Kebab(k), colors[k]);
  root.style.setProperty("color-scheme", st.dark ? "dark" : "light");
  root.setAttribute("data-m3-variant", st.variant);
  root.setAttribute("data-m3-dark", st.dark ? "1" : "0");
  try { localStorage.setItem(M3_KEY, JSON.stringify(st)); } catch (e) {}
  return colors;
}
window.M3Theme = {
  schemeColors: schemeColors, variantLabel: variantLabel, variants: variants,
  hctFromInt: hctFromInt, hctToHex: hctToHex, stateLayer: stateLayer,
  state: m3State, apply: m3Apply, kebab: m3Kebab
};
m3Apply(m3State);
`;

const out = `(()=>{\n"use strict";\n${stripped}\n${boot}\n})();\n`;
await writeFile(outPath, out);
const kb = (Buffer.byteLength(out) / 1024).toFixed(1);
console.log(`theme head written: src/scripts/theme/m3-head.js (${kb} kB)`);
