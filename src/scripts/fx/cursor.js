/**
 * The fancy cursor: a Linux (Tux) head tinted with the seed colour, a
 * spring-lagged halo ring and an accent-coloured canvas trail.
 *
 * The head is plain DOM/SVG so it inherits `--md-sys-color-*` straight from
 * the theme engine (no re-painting needed when the accent changes); only the
 * trail lives on a canvas layered above the page.
 *
 * Motion notes:
 *   • the head tracks the pointer one-to-one - it must feel glued to it,
 *   • the halo ring chases with an exponential spring, giving the pair some
 *     depth, and blooms outward on click,
 *   • the trail is a short-lived ribbon of recent pointer samples drawn with
 *     a wide soft glow pass plus a tapering core, bead every few samples.
 */

import { rgba } from "./palette.js";

const TAU = Math.PI * 2;
const OFFSET = 12; // put the pointer tip on Tux's head contour (top-left)
const LIFE = 0.45; // trail lifetime, seconds

export function initCursor({ head, ring, trail }) {
  const ctx = trail.getContext("2d");
  const history = []; // { x, y, t }
  let active = false;
  let x = -200;
  let y = -200;
  let rx = -200; // ring position (lags)
  let ry = -200;
  let vw = 0; // last known viewport size (for clearing the trail canvas)
  let vh = 0;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function place(nx, ny) {
    x = nx;
    y = ny;
    head.style.transform = `translate3d(${nx - OFFSET}px, ${ny - OFFSET}px, 0)`;
  }

  /* -- input ------------------------------------------------------------ */

  function onMove(e) {
    if (!active || e.pointerType === "touch") return;
    place(e.clientX, e.clientY);
    head.classList.add("is-on");
  }

  function onLeave() {
    head.classList.remove("is-on");
    history.length = 0;
  }

  function onDown(e) {
    if (!active || e.pointerType === "touch") return;
    head.classList.add("is-down");
    ring.classList.remove("is-burst");
    void ring.offsetWidth; // restart the CSS animation
    ring.classList.add("is-burst");
  }

  function onUp() {
    head.classList.remove("is-down");
  }

  // The native pointer is hidden while the Tux head is on, so give links,
  // buttons and form fields their own affordance: the head swells and the
  // halo brightens over anything interactive.
  const HOVERABLE = "a, button, select, input, textarea, summary, label, [role=button], [onclick]";
  function onOver(e) {
    if (!active) return;
    const el = e.target instanceof Element ? e.target : null;
    const hover = !!(el && el.closest(HOVERABLE));
    head.classList.toggle("is-hover", hover);
    ring.classList.toggle("is-hover", hover);
  }

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerover", onOver, { passive: true });
  window.addEventListener("pointerdown", onDown, { passive: true });
  window.addEventListener("pointerup", onUp, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);

  /* -- painting --------------------------------------------------------- */

  function drawTrail(t, pal) {
    ctx.clearRect(0, 0, vw, vh);
    if (!active || reduced) return;

    // One sample per animation frame keeps the ribbon smooth and bounded.
    const last = history[history.length - 1];
    if (!last || Math.hypot(x - last.x, y - last.y) > 0.75) history.push({ x, y, t });
    while (history.length && t - history[0].t > LIFE) history.shift();
    if (history.length < 2) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Soft glow: a single stroke over the whole ribbon (one blurred op).
    ctx.beginPath();
    ctx.moveTo(history[0].x, history[0].y);
    for (let i = 1; i < history.length; i++) ctx.lineTo(history[i].x, history[i].y);
    ctx.strokeStyle = rgba(pal.primary, 0.15);
    ctx.lineWidth = 13;
    ctx.stroke();

    // Tapering core: per-segment width + alpha so the tail dissolves.
    for (let i = 1; i < history.length; i++) {
      const p0 = history[i - 1];
      const p1 = history[i];
      const k = 1 - (t - p1.t) / LIFE;
      if (k <= 0) continue;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineWidth = 1 + 6 * k * k;
      ctx.strokeStyle = rgba(pal.primary, 0.08 + 0.5 * k * k);
      ctx.stroke();
    }

    // Accent beads: tertiary sparks every few samples, primary in between.
    for (let i = 0; i < history.length; i += 3) {
      const p = history[i];
      const k = 1 - (t - p.t) / LIFE;
      if (k <= 0) continue;
      const r = 1 + 2.3 * k;
      ctx.beginPath();
      ctx.moveTo(p.x + r, p.y);
      ctx.arc(p.x, p.y, r, 0, TAU);
      ctx.fillStyle = rgba(i % 6 === 0 ? pal.tertiary : pal.primary, 0.5 * k);
      ctx.fill();
    }
  }

  function frame(t, dt, pal, w, h) {
    vw = w;
    vh = h;
    if (active && !reduced) {
      const ease = 1 - Math.exp(-dt * 16);
      rx += (x - rx) * ease;
      ry += (y - ry) * ease;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    }
    drawTrail(t, pal);
  }

  /* -- public ----------------------------------------------------------- */

  function setActive(on) {
    active = !!on;
    ring.classList.toggle("is-hidden", !active || reduced);
    if (!active) {
      head.classList.remove("is-on", "is-down", "is-hover");
      ring.classList.remove("is-hover");
      history.length = 0;
      ctx.clearRect(0, 0, vw, vh);
    }
  }

  return { frame, setActive, get active() { return active; } };
}
