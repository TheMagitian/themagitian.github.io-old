/**
 * Accent palette reader for the FX layer.
 *
 * Everything the fancy cursor and the background animations paint is a
 * `--md-sys-color-*` role written onto `:root` by the M3 theme engine, so
 * re-reading this map whenever `m3-theme-change` fires is all it takes to
 * re-tint the whole layer to the current accent (hue, variant and light /
 * dark included).
 */

/** Material roles the effects may paint with, in kebab-case. */
const ROLES = [
  "primary",
  "on-primary",
  "primary-container",
  "on-primary-container",
  "secondary",
  "secondary-container",
  "tertiary",
  "tertiary-container",
  "surface",
  "surface-container-low",
  "surface-container-high",
  "surface-container-highest",
  "on-surface",
  "on-surface-variant",
  "outline",
  "outline-variant",
];

/** `"outline-variant"` -> `"outlineVariant"` (matches the engine's naming). */
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

/** Used only if the theme engine has not painted yet (first paint race). */
const FALLBACK = "#808080";

/**
 * Snapshot the current accent palette as a plain `{ primary, outlineVariant,
 * … }` object of hex strings.
 */
export function readPalette(root = document.documentElement) {
  const cs = getComputedStyle(root);
  const pal = {};
  for (const role of ROLES) {
    pal[camel(role)] = cs.getPropertyValue("--md-sys-color-" + role).trim() || FALLBACK;
  }
  return pal;
}

/**
 * Pin the cursor mascot's two tones as `--fx-tux-body` / `--fx-tux-belly`.
 *
 * Tux keeps one look in both modes - the light-mode duotone (accent plumage
 * over a container belly), i.e. the same dark penguin everywhere - so we ask
 * the theme engine for the *light* scheme on every theme change instead of
 * following the mode-dependent roles. Falls back to the live roles when the
 * engine has not booted yet, so the head is never uncoloured.
 */
export function applyCursorTheme(root = document.documentElement) {
  const fallback = readPalette(root);
  let body = fallback.primary;
  let belly = fallback.primaryContainer;
  try {
    const m3 = window.M3Theme;
    const st = m3 && m3.state;
    if (m3 && st && typeof m3.schemeColors === "function") {
      const light = m3.schemeColors({
        hue: st.hue,
        chroma: st.chroma,
        variant: st.variant,
        isDark: false,
        specVersion: st.spec,
      });
      if (light && light.primary) body = light.primary;
      if (light && light.primaryContainer) belly = light.primaryContainer;
    }
  } catch {
    /* keep the live-role fallback */
  }
  root.style.setProperty("--fx-tux-body", body);
  root.style.setProperty("--fx-tux-belly", belly);
}

/**
 * `rgba("#6750a4", 0.4)` -> `"rgba(103, 80, 164, 0.4)"`.
 * Canvas wants explicit `rgba()` so alpha can animate per shape / per frame.
 */
export function rgba(hex, a) {
  let h = String(hex).trim().replace("#", "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  // Sanitise alpha: a NaN here would build an invalid colour string, which
  // canvas silently rejects - leaving whatever the last fillStyle was (black).
  const alpha = Number.isFinite(a) ? Math.max(0, Math.min(1, a)) : 0;
  if (Number.isNaN(n)) return `rgba(128, 128, 128, ${alpha})`;
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
