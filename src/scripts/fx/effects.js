/**
 * Background animation effects for the FX layer.
 *
 * Every factory is called with no arguments and returns
 * `{ resize(w, h, pal), frame(ctx, t, dt, w, h, pal, ptr) }`:
 *
 *   • `resize` rebuilds geometry whenever the viewport *or* the accent
 *     palette changes - grids, lattices and pre-built paths all depend on
 *     both (paths hold no colour, but several effects memoise "static"
 *     strokes that are cheaper to rebuild than to re-tint).
 *   • `frame` paints one frame. `t` is seconds since boot, `dt` the frame
 *     delta in seconds, and `ptr` the pointer in CSS pixels
 *     (`{ x, y, active }`).
 *
 * The canvas sits behind the page (see the FX styles in global.css), so the
 * effects stay deliberately faint: thin outline-coloured structures with
 * accents picked out in the seed-derived `primary` / `tertiary` roles. Text
 * is painted on top and must stay readable.
 */

import { rgba } from "./palette.js";

const TAU = Math.PI * 2;
const rnd = (a, b) => a + Math.random() * (b - a);
const clampN = (lo, hi, x) => (x < lo ? lo : x > hi ? hi : x);

/* ---------------------------------------------------------------------------
 * Path helpers (all centred on 0,0 so they can be placed with one transform)
 * ------------------------------------------------------------------------- */

/** Pointy-top hexagon of circumradius `r` at (x, y). */
function hexPath(x, y, r) {
  const p = new Path2D();
  for (let k = 0; k < 6; k++) {
    const a = -Math.PI / 2 + (k * Math.PI) / 3;
    const vx = x + Math.cos(a) * r;
    const vy = y + Math.sin(a) * r;
    k ? p.lineTo(vx, vy) : p.moveTo(vx, vy);
  }
  p.closePath();
  return p;
}

/** Regular polygon helper (triangle, diamond…). */
function polyPath(x, y, r, sides, rot) {
  const p = new Path2D();
  for (let k = 0; k < sides; k++) {
    const a = rot + (k * TAU) / sides;
    const vx = x + Math.cos(a) * r;
    const vy = y + Math.sin(a) * r;
    k ? p.lineTo(vx, vy) : p.moveTo(vx, vy);
  }
  p.closePath();
  return p;
}

/** Five-pointed star (Material's "star" shape). */
function starPath(x, y, r) {
  const p = new Path2D();
  const inner = r * 0.46;
  for (let k = 0; k < 10; k++) {
    const rad = k % 2 ? inner : r;
    const a = -Math.PI / 2 + (k * Math.PI) / 5;
    const vx = x + Math.cos(a) * rad;
    const vy = y + Math.sin(a) * rad;
    k ? p.lineTo(vx, vy) : p.moveTo(vx, vy);
  }
  p.closePath();
  return p;
}

/** Rounded rect with per-corner radii (the M3 Expressive morphing shape). */
function roundRectPath(p, x, y, w, h, radii) {
  const [tl, tr, br, bl] = Array.isArray(radii) ? radii : [radii, radii, radii, radii];
  const max = Math.min(w, h) / 2;
  const [a, b, c, d] = [tl, tr, br, bl].map((r) => clampN(0, max, r || 0));
  p.moveTo(x + a, y);
  p.lineTo(x + w - b, y);
  p.arcTo(x + w, y, x + w, y + b, b);
  p.lineTo(x + w, y + h - c);
  p.arcTo(x + w, y + h, x + w - c, y + h, c);
  p.lineTo(x + d, y + h);
  p.arcTo(x, y + h, x, y + h - d, d);
  p.lineTo(x, y + a);
  p.arcTo(x, y, x + a, y, a);
  p.closePath();
  return p;
}

/* ---------------------------------------------------------------------------
 * 1. Spinning honeycomb - a slowly rotating lattice that shimmers
 * ------------------------------------------------------------------------- */

const HEX_R = 48; // cell circumradius in px

export function createHoneycomb() {
  let cells = [];
  let lattice = null;
  let cx = 0;
  let cy = 0;

  function resize(w, h) {
    cx = w / 2;
    cy = h / 2;
    // Reach far enough that rotating the lattice never reveals its edges.
    const reach = Math.hypot(w, h) / 2 + HEX_R * 2;
    const stepX = Math.sqrt(3) * HEX_R;
    const stepY = 1.5 * HEX_R;
    const cols = Math.ceil(reach / stepX) + 1;
    const rows = Math.ceil(reach / stepY) + 1;
    lattice = new Path2D();
    cells = [];
    for (let j = -rows; j <= rows; j++) {
      for (let i = -cols; i <= cols; i++) {
        const x = cx + i * stepX + (j & 1 ? stepX / 2 : 0);
        const y = cy + j * stepY;
        const path = hexPath(x, y, HEX_R - 1.6);
        lattice.addPath(path);
        cells.push({ x, y, path, phase: Math.random() * TAU });
      }
    }
  }

  function frame(ctx, t, dt, w, h, pal, ptr) {
    if (!lattice) return;
    const spin = t * 0.05; // one turn every ~2 minutes
    // Compare the pointer against the *un-rotated* lattice, so invert it.
    let px = -1e5;
    let py = -1e5;
    if (ptr.active) {
      const dx = ptr.x - cx;
      const dy = ptr.y - cy;
      const c = Math.cos(-spin);
      const s = Math.sin(-spin);
      px = cx + dx * c - dy * s;
      py = cy + dx * s + dy * c;
    }
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(spin);
    ctx.translate(-cx, -cy);
    ctx.lineWidth = 1.1;
    ctx.strokeStyle = rgba(pal.outlineVariant, 0.5);
    ctx.stroke(lattice);
    for (const cell of cells) {
      const near = ptr.active ? clampN(0, 1, 1 - Math.hypot(cell.x - px, cell.y - py) / 175) : 0;
      const pulse = Math.sin(t * 0.9 + cell.phase);
      const shimmer = pulse > 0.9 ? (pulse - 0.9) * 4 : 0; // sparse wave
      const a = shimmer * 0.16 + near * near * 0.4;
      if (a < 0.03) continue;
      ctx.fillStyle = rgba(pal.primary, a);
      ctx.fill(cell.path);
    }
    ctx.restore();
  }

  return { resize, frame };
}

/* ---------------------------------------------------------------------------
 * 2. Dot matrix - a grid of dots that ripples where the cursor is
 * ------------------------------------------------------------------------- */

const RIPPLE_PERIOD = 2.2; // s for a ring to travel from the pointer to the rim
const RIPPLE_REACH = 470; // px - how far the wavefront travels
const RIPPLE_PUSH = 6; // px max radial displacement of the dots
const RIPPLE_RINGS = 3; // staggered rings, so the ripple flows without restarting
const RIPPLE_IDLE = 1; // s of quiet before the ripple has died away
const RIPPLE_TAIL = 0.35; // s of fade-out at the end of that quiet second

export function createDots() {
  let sp = 20;
  let cols = 0;
  let rows = 0;
  let lastX = NaN;
  let lastY = NaN;
  let lastMove = -Infinity;
  let energy = 0; // 1 while the pointer is moving, 0 once it has been still

  const emitters = [
    { x: 0.22, y: 0.3, period: 3.4, phase: 0, push: 4 },
    { x: 0.78, y: 0.72, period: 3.4, phase: 1.7, push: 4 },
  ];

  function resize(w, h) {
    sp = clampN(14, 40, Math.round(Math.sqrt((w * h) / 4800)));
    cols = Math.ceil(w / sp) + 1;
    rows = Math.ceil(h / sp) + 1;
  }

  function frame(ctx, t, dt, w, h, pal, ptr) {
    const hot = new Path2D();
    const glow = new Path2D();
    const cold = new Path2D();

    if (ptr.active && (ptr.x !== lastX || ptr.y !== lastY)) {
      lastX = ptr.x;
      lastY = ptr.y;
      lastMove = t;
    }
    const idle = ptr.active ? t - lastMove : Infinity;
    const target = clampN(0, 1, (RIPPLE_IDLE - idle) / RIPPLE_TAIL);
    energy = target >= energy ? Math.min(target, energy + dt * 6) : target;

    const sources = [];
    if (energy > 0.002) {
      if (ptr.active) {
        const rings = [];
        for (let k = 0; k < RIPPLE_RINGS; k++) {
          const p = (t / RIPPLE_PERIOD + k / RIPPLE_RINGS) % 1;
          const fade = Math.sin(Math.PI * p);
          const width = 52 - k * 6;
          rings.push({
            r: p * RIPPLE_REACH,
            a: 0.92 * fade * energy,
            width,
            edge: width * 2.6,
            push: RIPPLE_PUSH * fade * energy * (1 - k * 0.22),
          });
        }
        sources.push({ x: ptr.x, y: ptr.y, rings });
      }
      for (const e of emitters) {
        const p = ((t + e.phase) % e.period) / e.period;
        const fade = Math.sin(Math.PI * p); 
        sources.push({
          x: e.x * w,
          y: e.y * h,
          rings: [
            { r: p * 560, a: 0.3 * fade * energy, width: 60, edge: 60 * 2.6, push: e.push * fade * energy },
          ],
        });
      }
    }

    for (let j = 0; j < rows; j++) {
      const y = j * sp;
      for (let i = 0; i < cols; i++) {
        const x = i * sp;
        let v = (0.5 + 0.5 * Math.sin(t * 0.5 + x * 0.013 - y * 0.019)) * 0.28;
        let dx = 0;
        let dy = 0;
        for (const src of sources) {
          const ox = x - src.x;
          const oy = y - src.y;
          const d = Math.sqrt(ox * ox + oy * oy) || 1;
          for (const tr of src.rings) {
            if (d - tr.r > tr.edge || tr.r - d > tr.edge) continue;
            const q = d - tr.r;
            const g = Math.exp(-(q * q) / (2 * tr.width * tr.width));
            v += g * tr.a;
            if (g > 0.03) {
              const push = (g * tr.push) / d;
              dx += ox * push;
              dy += oy * push;
            }
          }
        }
        if (v > 1) v = 1;
        const m = Math.sqrt(dx * dx + dy * dy);
        if (m > RIPPLE_PUSH) {
          dx = (dx / m) * RIPPLE_PUSH;
          dy = (dy / m) * RIPPLE_PUSH;
        }
        const xd = x + dx;
        const yd = y + dy;
        const bucket = v > 0.78 ? glow : v > 0.42 ? hot : cold;
        const r = v > 0.42 ? 1.05 + (v - 0.42) * 5.2 : 1.05;
        bucket.moveTo(xd + r, yd);
        bucket.arc(xd, yd, r, 0, TAU);
      }
    }

    ctx.fillStyle = rgba(pal.outlineVariant, 0.42);
    ctx.fill(cold);
    ctx.fillStyle = rgba(pal.primary, 0.24);
    ctx.fill(hot);
    ctx.fillStyle = rgba(pal.primary, 0.66);
    ctx.fill(glow);
  }

  return { resize, frame };
}

/* ---------------------------------------------------------------------------
 * 3. M3 shape confetti - Material Expressive shapes drifting up the page
 * ------------------------------------------------------------------------- */

const SHAPE_TYPES = ["squircle", "pill", "circle", "star", "hex", "triangle", "ring", "diamond"];

function makeShape(type, s) {
  const h = s / 2;
  const p = new Path2D();
  switch (type) {
    case "circle":
      p.arc(0, 0, h, 0, TAU);
      break;
    case "ring":
      p.arc(0, 0, h, 0, TAU);
      break;
    case "pill": {
      const w = s * 1.5;
      const hh = s * 0.72;
      roundRectPath(p, -w / 2, -hh / 2, w, hh, hh / 2);
      break;
    }
    case "squircle":
      // The Expressive morphing radius: two squishy, two generous.
      roundRectPath(p, -h, -h, s, s, [s * 0.22, s * 0.42, s * 0.22, s * 0.42]);
      break;
    case "hex":
      p.addPath(hexPath(0, 0, h));
      break;
    case "star":
      p.addPath(starPath(0, 0, h));
      break;
    case "triangle":
      p.addPath(polyPath(0, 0, h, 3, -Math.PI / 2));
      break;
    default:
      p.addPath(polyPath(0, 0, h, 4, 0));
      break;
  }
  return p;
}

export function createShapes() {
  let items = [];

  const roles = [
    "primary",
    "secondary",
    "tertiary",
    "primaryContainer",
    "secondaryContainer",
    "tertiaryContainer",
    "outlineVariant",
  ];

  function resize(w, h, pal) {
    const n = Math.round(clampN(14, 26, (w * h) / 72000));
    items = [];
    for (let i = 0; i < n; i++) {
      const type = SHAPE_TYPES[i % SHAPE_TYPES.length];
      const s = rnd(16, 46);
      items.push({
        x: rnd(0, w),
        y: rnd(0, h),
        size: s,
        path: makeShape(type, s),
        ring: type === "ring",
        rot: rnd(0, TAU),
        vr: rnd(-0.35, 0.35),
        vy: -rnd(5, 15), // px/s, upward drift
        sway: rnd(0, TAU),
        color: pal[roles[i % roles.length]],
        alpha: rnd(0.1, 0.2),
      });
    }
  }

  function frame(ctx, t, dt, w, h, pal, ptr) {
    ctx.lineJoin = "round";
    for (const it of items) {
      it.y += it.vy * dt;
      it.x += Math.sin(t * 0.5 + it.sway) * 9 * dt;
      it.rot += it.vr * dt;
      if (it.y < -it.size * 1.6) {
        it.y = h + it.size;
        it.x = rnd(0, w);
      }
      ctx.save();
      ctx.translate(it.x, it.y);
      ctx.rotate(it.rot);
      if (it.ring) {
        ctx.lineWidth = 2.6;
        ctx.strokeStyle = rgba(it.color, it.alpha + 0.1);
        ctx.stroke(it.path);
      } else {
        ctx.fillStyle = rgba(it.color, it.alpha);
        ctx.fill(it.path);
      }
      ctx.restore();
    }
  }

  return { resize, frame };
}

/* ---------------------------------------------------------------------------
 * 4. Circuit board traces - PCB paths with accent pulses running along them
 * ------------------------------------------------------------------------- */

// 8-way directions (45° increments), snapped to the trace grid.
const DIR_X = [1, 1, 0, -1, -1, -1, 0, 1];
const DIR_Y = [0, 1, 1, 1, 0, -1, -1, -1];

function pointAt(trace, dist) {
  const { pts, cum } = trace;
  for (let i = 1; i < cum.length; i++) {
    if (dist <= cum[i]) {
      const seg = cum[i] - cum[i - 1] || 1;
      const u = (dist - cum[i - 1]) / seg;
      const a = pts[i - 1];
      const b = pts[i];
      return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
    }
  }
  const last = pts[pts.length - 1];
  return [last[0], last[1]];
}

export function createCircuit() {
  const GRID = 32;
  let traces = [];
  let wire = null;
  let pads = null;
  let padInners = null;

  function resize(w, h) {
    const n = Math.round(clampN(14, 30, (w * h) / 72000));
    traces = [];
    wire = new Path2D();
    pads = new Path2D();
    padInners = new Path2D();

    for (let i = 0; i < n; i++) {
      let x = Math.round(rnd(0, w) / GRID) * GRID;
      let y = Math.round(rnd(0, h) / GRID) * GRID;
      const pts = [[x, y]];
      let dir = Math.floor(rnd(0, 8));
      const steps = 3 + Math.floor(rnd(0, 6));
      for (let s = 0; s < steps; s++) {
        // Mostly carry straight on; occasionally bend 45° or fork-ish turns.
        const roll = Math.random();
        if (roll > 0.55) dir = (dir + (Math.random() < 0.5 ? 1 : 7)) % 8;
        const len = (1 + Math.floor(rnd(0, 4))) * GRID;
        x = clampN(0, w, x + DIR_X[dir] * len);
        y = clampN(0, h, y + DIR_Y[dir] * len);
        const prev = pts[pts.length - 1];
        if (prev[0] === x && prev[1] === y) continue; // clamped edge, skip
        pts.push([x, y]);
      }
      if (pts.length < 2) continue;

      const cum = [0];
      for (let k = 1; k < pts.length; k++) {
        cum.push(cum[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]));
      }
      traces.push({
        pts,
        cum,
        total: cum[cum.length - 1],
        speed: rnd(0.05, 0.14), // full-length runs per second
        offset: Math.random(),
        pulses: 1 + (i % 2),
      });

      wire.moveTo(pts[0][0], pts[0][1]);
      for (let k = 1; k < pts.length; k++) wire.lineTo(pts[k][0], pts[k][1]);
      for (const [ex, ey] of [pts[0], pts[pts.length - 1]]) {
        pads.moveTo(ex + 5, ey);
        pads.arc(ex, ey, 5, 0, TAU);
        padInners.moveTo(ex + 2, ey);
        padInners.arc(ex, ey, 2, 0, TAU);
      }
    }
  }

  function frame(ctx, t, dt, w, h, pal, ptr) {
    if (!wire) return;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = rgba(pal.outlineVariant, 0.55);
    ctx.stroke(wire);
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = rgba(pal.outlineVariant, 0.8);
    ctx.stroke(pads);
    ctx.fillStyle = rgba(pal.outlineVariant, 0.95);
    ctx.fill(padInners);

    for (const tr of traces) {
      for (let k = 0; k < tr.pulses; k++) {
        const p = ((t * tr.speed + tr.offset + k / tr.pulses) % 1 + 1) % 1;
        const at = p * tr.total;
        const [x, y] = pointAt(tr, at);
        const [tx, ty] = pointAt(tr, Math.max(0, at - 16));
        // Fading tail along the wire.
        ctx.lineWidth = 2.4;
        ctx.strokeStyle = rgba(pal.primary, 0.3);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        // Three-layer glow dot (cheaper than canvas shadowBlur).
        for (const [r, a] of [
          [7, 0.1],
          [3.8, 0.3],
          [1.8, 0.9],
        ]) {
          ctx.beginPath();
          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, TAU);
          ctx.fillStyle = rgba(pal.primary, a);
          ctx.fill();
        }
      }
    }
  }

  return { resize, frame };
}

/** Registry keyed by the `m3-fx-v1` effect id. */
export const EFFECTS = {
  honeycomb: createHoneycomb,
  dots: createDots,
  shapes: createShapes,
  circuit: createCircuit,
};
