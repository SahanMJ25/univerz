"use client";

import { useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  UNIVERZ — Premium Constellation Network Background
//  Inspired by antigravity.com's sophisticated mesh aesthetic.
//  Nodes drift slowly; lines form between nearby nodes.
//  Mouse acts as a gravity well that attracts + connects.
// ═══════════════════════════════════════════════════════════════

// ─── Tuning knobs ──────────────────────────────────────────────
const NODE_DENSITY       = 0.00008;  // nodes per px² of viewport
const CONNECT_DIST       = 180;      // max dist (px) to draw an edge
const MOUSE_CONNECT_DIST = 250;      // cursor connects further than nodes
const MOUSE_ATTRACT      = 0.012;    // how strongly the cursor pulls nodes
const MOUSE_RADIUS       = 280;      // radius of cursor influence
const DRIFT_SPEED        = 0.15;     // ambient float velocity
const LERP_RETURN        = 0.03;     // smoothness of return after attraction
const NODE_MIN_R         = 1.0;      // smallest node radius
const NODE_MAX_R         = 2.2;      // largest  node radius

// ─── Premium colour palette ───────────────────────────────────
//  Muted silver / warm gold / brand accent – luxury, not playful
const NODE_COLOR       = "rgba(180, 180, 195, 0.7)";   // silver-grey nodes
const LINE_BASE_COLOR  = [160, 160, 175];               // silver edge RGB
const MOUSE_LINE_COLOR = [225, 112,  68];               // brand #e17044 edges near cursor
const MOUSE_NODE_GLOW  = "rgba(225, 112, 68, 0.35)";   // soft brand halo on cursor

// ─── Helpers ──────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function dist(ax: number, ay: number, bx: number, by: number) {
  const dx = ax - bx, dy = ay - by;
  return Math.sqrt(dx * dx + dy * dy);
}

// ─── Node type ────────────────────────────────────────────────
interface Node {
  x: number;   y: number;    // rendered position
  ox: number;  oy: number;   // origin (drift) position
  vx: number;  vy: number;   // drift velocity
  r: number;                  // radius
  phase: number;              // for subtle pulse
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    if (!ctx) return;

    let raf: number;
    let nodes: Node[] = [];
    let mouse = { x: -9999, y: -9999, active: false };
    let W = 0, H = 0;

    // ── Resize & seed nodes ──────────────────────────────────
    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width  = W;
      canvas!.height = H;
      seed();
    }

    function seed() {
      const area  = W * H;
      const count = Math.max(40, Math.floor(area * NODE_DENSITY));
      nodes = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        nodes.push({
          x, y, ox: x, oy: y,
          vx: (Math.random() - 0.5) * DRIFT_SPEED * 2,
          vy: (Math.random() - 0.5) * DRIFT_SPEED * 2,
          r:  NODE_MIN_R + Math.random() * (NODE_MAX_R - NODE_MIN_R),
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    // ── Main render loop ─────────────────────────────────────
    let t = 0; // frame counter for pulse
    function animate() {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      // ── 1. Update node positions ──────────────────────────
      for (const n of nodes) {
        // Drift the origin
        n.ox += n.vx;
        n.oy += n.vy;

        // Wrap edges seamlessly
        if (n.ox < -20) n.ox = W + 20;
        if (n.ox > W + 20) n.ox = -20;
        if (n.oy < -20) n.oy = H + 20;
        if (n.oy > H + 20) n.oy = -20;

        // Target = origin, unless mouse pulls it
        let tx = n.ox, ty = n.oy;

        if (mouse.active) {
          const d = dist(n.ox, n.oy, mouse.x, mouse.y);
          if (d < MOUSE_RADIUS && d > 0) {
            // Attract toward cursor (stronger when closer)
            const strength = (1 - d / MOUSE_RADIUS) * MOUSE_ATTRACT;
            tx = n.ox + (mouse.x - n.ox) * strength * 12;
            ty = n.oy + (mouse.y - n.oy) * strength * 12;
          }
        }

        // Smooth interpolation toward target
        n.x = lerp(n.x, tx, LERP_RETURN + 0.04);
        n.y = lerp(n.y, ty, LERP_RETURN + 0.04);
      }

      // ── 2. Draw edges (the "net") ─────────────────────────
      //  We iterate every unique pair (i, j) with j > i.
      //  Line opacity = 1 – (distance / max_distance)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = dist(a.x, a.y, b.x, b.y);
          if (d < CONNECT_DIST) {
            const opacity = (1 - d / CONNECT_DIST) * 0.35;
            const [r, g, bl] = LINE_BASE_COLOR;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${r},${g},${bl},${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // ── Cursor → node edges (brand-coloured) ────────────
        if (mouse.active) {
          const dm = dist(a.x, a.y, mouse.x, mouse.y);
          if (dm < MOUSE_CONNECT_DIST) {
            const opacity = (1 - dm / MOUSE_CONNECT_DIST) * 0.55;
            const [r, g, bl] = MOUSE_LINE_COLOR;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${r},${g},${bl},${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // ── 3. Draw nodes ─────────────────────────────────────
      for (const n of nodes) {
        // Subtle pulse: radius oscillates ±15%
        const pulse = 1 + Math.sin(t * 2 + n.phase) * 0.15;
        const r = n.r * pulse;

        // If near mouse → glow with brand colour
        let glow = false;
        if (mouse.active) {
          const dm = dist(n.x, n.y, mouse.x, mouse.y);
          if (dm < MOUSE_CONNECT_DIST * 0.6) glow = true;
        }

        if (glow) {
          // Radial gradient halo
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
          grad.addColorStop(0, "rgba(225,112,68,0.25)");
          grad.addColorStop(1, "rgba(225,112,68,0)");
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = glow ? "rgba(225,112,68,0.9)" : NODE_COLOR;
        ctx.fill();
      }

      // ── 4. Cursor glow hub ─────────────────────────────────
      if (mouse.active) {
        const grad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 8
        );
        grad.addColorStop(0, MOUSE_NODE_GLOW);
        grad.addColorStop(1, "rgba(225,112,68,0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      raf = requestAnimationFrame(animate);
    }

    // ── Event handlers ───────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }
    function onMouseLeave() { mouse.active = false; }
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    }
    function onTouchEnd() { mouse.active = false; }

    // ── Bind ─────────────────────────────────────────────────
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    resize();
    animate();

    // ── Teardown ─────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
