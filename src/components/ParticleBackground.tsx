"use client";

import { useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  UNIVERZ — Interactive Grid Net Background
//  A clean grid of squares. Near the cursor, grid lines glow
//  with the brand colour and intersections light up — creating
//  a "net that follows the mouse" effect. Premium & minimal.
// ═══════════════════════════════════════════════════════════════

const CELL        = 50;          // grid cell size (matches CSS grid-bg)
const GLOW_RADIUS = 220;         // how far the cursor influence reaches (px)
const DOT_RADIUS  = 2;           // intersection dot size

// Smoothed mouse position for fluid feel
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    if (!ctx) return;

    let raf: number;
    let W = 0, H = 0;
    // Raw mouse (set by events) and smooth mouse (lerped each frame)
    let rawMouse  = { x: -9999, y: -9999 };
    let mouse     = { x: -9999, y: -9999 };
    let mouseActive = false;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width  = W;
      canvas!.height = H;
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);

      // Smoothly interpolate toward raw mouse for fluid movement
      mouse.x = lerp(mouse.x, rawMouse.x, 0.12);
      mouse.y = lerp(mouse.y, rawMouse.y, 0.12);

      if (!mouseActive) {
        // Fade out by moving smooth mouse off-screen gradually
        mouse.x = lerp(mouse.x, -9999, 0.05);
        mouse.y = lerp(mouse.y, -9999, 0.05);
      }

      const cols = Math.ceil(W / CELL) + 1;
      const rows = Math.ceil(H / CELL) + 1;

      // ── Draw vertical grid lines ──────────────────────────
      for (let c = 0; c <= cols; c++) {
        const x = c * CELL;

        // Check distance from this line to cursor (horizontal dist)
        // Sample a few points along the line to see if any part is near cursor
        // For efficiency, just check the closest vertical point
        const closestY = Math.max(0, Math.min(H, mouse.y));
        const dLine = Math.abs(x - mouse.x);

        if (dLine < GLOW_RADIUS) {
          // Draw the line with a gradient that glows near the cursor
          const segments = 40;
          const segH = H / segments;

          for (let s = 0; s < segments; s++) {
            const y1 = s * segH;
            const y2 = (s + 1) * segH;
            const midY = (y1 + y2) / 2;

            const dx = x - mouse.x;
            const dy = midY - mouse.y;
            const d = Math.sqrt(dx * dx + dy * dy);

            if (d < GLOW_RADIUS) {
              const intensity = 1 - d / GLOW_RADIUS;
              // Brand orange glow — stronger closer to cursor
              const alpha = intensity * intensity * 0.5;
              ctx.beginPath();
              ctx.moveTo(x, y1);
              ctx.lineTo(x, y2);
              ctx.strokeStyle = `rgba(225, 112, 68, ${alpha})`;
              ctx.lineWidth = 0.8 + intensity * 0.8;
              ctx.stroke();
            }
          }
        }
      }

      // ── Draw horizontal grid lines ─────────────────────────
      for (let r = 0; r <= rows; r++) {
        const y = r * CELL;
        const dLine = Math.abs(y - mouse.y);

        if (dLine < GLOW_RADIUS) {
          const segments = 40;
          const segW = W / segments;

          for (let s = 0; s < segments; s++) {
            const x1 = s * segW;
            const x2 = (s + 1) * segW;
            const midX = (x1 + x2) / 2;

            const dx = midX - mouse.x;
            const dy = y - mouse.y;
            const d = Math.sqrt(dx * dx + dy * dy);

            if (d < GLOW_RADIUS) {
              const intensity = 1 - d / GLOW_RADIUS;
              const alpha = intensity * intensity * 0.5;
              ctx.beginPath();
              ctx.moveTo(x1, y);
              ctx.lineTo(x2, y);
              ctx.strokeStyle = `rgba(225, 112, 68, ${alpha})`;
              ctx.lineWidth = 0.8 + intensity * 0.8;
              ctx.stroke();
            }
          }
        }
      }

      // ── Draw glowing dots at grid intersections ────────────
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const ix = c * CELL;
          const iy = r * CELL;

          const dx = ix - mouse.x;
          const dy = iy - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < GLOW_RADIUS) {
            const intensity = 1 - d / GLOW_RADIUS;
            const alpha = intensity * intensity * 0.7;
            const radius = DOT_RADIUS + intensity * 1.5;

            // Outer glow
            if (intensity > 0.3) {
              const grad = ctx.createRadialGradient(ix, iy, 0, ix, iy, radius * 4);
              grad.addColorStop(0, `rgba(225, 112, 68, ${alpha * 0.4})`);
              grad.addColorStop(1, "rgba(225, 112, 68, 0)");
              ctx.beginPath();
              ctx.arc(ix, iy, radius * 4, 0, Math.PI * 2);
              ctx.fillStyle = grad;
              ctx.fill();
            }

            // Core dot
            ctx.beginPath();
            ctx.arc(ix, iy, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(225, 112, 68, ${alpha})`;
            ctx.fill();
          }
        }
      }

      // ── Soft cursor glow hub ───────────────────────────────
      if (mouseActive || mouse.x > -5000) {
        const grad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, GLOW_RADIUS * 0.3
        );
        grad.addColorStop(0, "rgba(225, 112, 68, 0.06)");
        grad.addColorStop(1, "rgba(225, 112, 68, 0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, GLOW_RADIUS * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      raf = requestAnimationFrame(animate);
    }

    // ── Events ───────────────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      rawMouse.x = e.clientX;
      rawMouse.y = e.clientY;
      mouseActive = true;
    }
    function onMouseLeave() {
      mouseActive = false;
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length) {
        rawMouse.x = e.touches[0].clientX;
        rawMouse.y = e.touches[0].clientY;
        mouseActive = true;
      }
    }
    function onTouchEnd() { mouseActive = false; }

    // ── Bind ─────────────────────────────────────────────────
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    resize();
    animate();

    // ── Cleanup ──────────────────────────────────────────────
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
