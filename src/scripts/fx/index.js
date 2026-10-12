/**
 * FX layer boot.
 *
 * Wires the two canvases (background effect + cursor trail) and the Tux
 * cursor head into a single animation loop, then exposes a tiny API on
 * `window.M3FX` so the theme dock can switch effects and toggle the cursor.
 *
 * Settings live in `localStorage` under `m3-fx-v1`
 * (`{ effect, cursor }`) and are also broadcast as a `m3-fx-change` custom
 * event on `document`; the layer listens for that event too, so callers can
 * drive it without touching the API. `m3-fx-ready` is fired once the layer
 * has booted, letting the dock sync its controls regardless of script order.
 *
 * Everything here is progressive enhancement: no canvas, no cursor, no
 * problem. Reduced-motion users get a single static background frame and a
 * cursor without the animated trail.
 */

import { readPalette, applyCursorTheme } from "./palette.js";
import { EFFECTS } from "./effects.js";
import { initCursor } from "./cursor.js";

const FX_KEY = "m3-fx-v1";
const DEFAULTS = { effect: "honeycomb", cursor: true };

const bg = document.getElementById("fx-bg");
const trail = document.getElementById("fx-trail");
const head = document.getElementById("fx-cursor");
const ring = document.getElementById("fx-cursor-ring");

if (bg && trail && head && ring) {
  boot();
}

function boot() {
  const fine = matchMedia("(pointer: fine)").matches;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = Object.assign({}, DEFAULTS, readSaved());

  const ctxBg = bg.getContext("2d");
  const cursor = initCursor({ head, ring, trail });
  const ptr = { x: -9999, y: -9999, active: false };

  let palette = readPalette();
  let effect = null;
  let effectName = null;
  let vw = 0;
  let vh = 0;
  let raf = 0;
  let last = 0;

  const ctxTrail = trail.getContext("2d");

  /* -- canvases ---------------------------------------------------------- */

  function resize() {
    vw = window.innerWidth;
    vh = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    for (const c of [bg, trail]) {
      c.width = Math.round(vw * dpr);
      c.height = Math.round(vh * dpr);
    }
    ctxBg.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxTrail.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (effect) {
      effect.resize(vw, vh, palette);
      if (reduced) renderStatic();
    }
  }

  function renderStatic() {
    if (!effect) return;
    ctxBg.clearRect(0, 0, vw, vh);
    effect.frame(ctxBg, 0, 0.016, vw, vh, palette, ptr);
  }

  function setEffect(name) {
    if (name !== "off" && !EFFECTS[name]) name = DEFAULTS.effect;
    effectName = name;
    bg.hidden = name === "off";
    effect = name === "off" ? null : EFFECTS[name]();
    if (effect) {
      effect.resize(vw || window.innerWidth, vh || window.innerHeight, palette);
    }
    if (reduced) renderStatic();
  }

  /* -- animation loop ----------------------------------------------------- */

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (document.hidden) {
      last = now;
      return;
    }
    const dt = Math.min(0.05, (now - last) / 1000) || 0.016;
    last = now;
    const t = now / 1000;
    if (effect) {
      ctxBg.clearRect(0, 0, vw, vh);
      effect.frame(ctxBg, t, dt, vw, vh, palette, ptr);
    }
    cursor.frame(t, dt, palette, vw, vh);
  }

  function updateLoop() {
    const busy = effectName !== "off" || (state.cursor && fine);
    if (busy && !reduced && !raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else if ((!busy || reduced) && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
      ctxBg.clearRect(0, 0, vw, vh);
      ctxTrail.clearRect(0, 0, vw, vh);
    }
  }

  /* -- state -------------------------------------------------------------- */

  function readSaved() {
    try {
      return JSON.parse(localStorage.getItem(FX_KEY)) || {};
    } catch {
      return {};
    }
  }

  function sync() {
    const cursorOn = !!state.cursor && fine;
    document.documentElement.classList.toggle("fx-cursor-on", cursorOn);
    cursor.setActive(cursorOn);
    setEffect(state.effect);
    updateLoop();
  }

  function apply(patch) {
    Object.assign(state, patch);
    try {
      localStorage.setItem(FX_KEY, JSON.stringify(state));
    } catch {
      /* private mode: keep the session-only state */
    }
    sync();
  }

  /* -- events ------------------------------------------------------------- */

  window.addEventListener(
    "pointermove",
    (e) => {
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      ptr.active = true;
    },
    { passive: true },
  );
  window.addEventListener(
    "pointerleave",
    () => {
      ptr.active = false;
    },
    { passive: true },
  );
  window.addEventListener(
    "pointerdown",
    (e) => {
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      ptr.active = true;
    },
    { passive: true },
  );

  // The theme dock (and anything else) can drive the layer without the API.
  document.addEventListener("m3-fx-change", (e) => apply(e.detail || {}));

  // Retint everything whenever the M3 theme changes.
  document.addEventListener("m3-theme-change", () => {
    palette = readPalette();
    applyCursorTheme();
    if (effect) {
      effect.resize(vw, vh, palette);
      if (reduced) renderStatic();
    }
  });

  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", () => {
    last = performance.now(); // swallow the gap so dt never spikes
  });

  /* -- go ----------------------------------------------------------------- */

  window.M3FX = {
    state,
    setEffect: (v) => apply({ effect: v }),
    setCursor: (v) => apply({ cursor: !!v }),
    refresh: () => {
      palette = readPalette();
      applyCursorTheme();
      if (effect) effect.resize(vw, vh, palette);
      if (reduced) renderStatic();
    },
  };

  applyCursorTheme();
  resize();
  sync();
  document.dispatchEvent(new CustomEvent("m3-fx-ready", { detail: Object.assign({}, state) }));
}
