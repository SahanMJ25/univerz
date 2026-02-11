"use client";

import { useEffect, useRef } from "react";

// ─── Color palette ───
const COLORS = [
  "#0A192F", // Deep Blue
  "#FDE047", // Electric Yellow
  "#A855F7", // Soft Purple
  "#e17044", // Brand Orange (Univerz)
];

// ─── Configuration ───
const PARTICLE_COUNT_FACTOR = 80; // particles per 1000px of screen width
const MOUSE_RADIUS = 150;         // repulsion radius in px
const REPULSION_STRENGTH = 8;     // how hard particles get pushed
const LERP_SPEED = 0.04;          // how fast particles return (0–1, lower = smoother)
const DRIFT_SPEED = 0.3;          // max floating drift speed

// ─── Lerp: Linear interpolation ───
// Smoothly moves `start` toward `end` by fraction `t` each frame.
// Formula: result = start + (end - start) * t
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

interface Particle {
  // Current rendered position
  x: number;
  y: number;
  // "Home" position on the natural drift path
  baseX: number;
  baseY: number;
  // Drift velocity (slow floating motion)
  vx: number;
  vy: number;
  // Visual properties
  radius: number;
  color: string;
  alpha: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999 }; // start offscreen
    let width = 0;
    let height = 0;

    // ─── Resize handler: match canvas to window ───
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
      initParticles();
    }

    // ─── Create particles with random positions & drift vectors ───
    function initParticles() {
      const count = Math.floor((width / 1000) * PARTICLE_COUNT_FACTOR);
      particles = [];

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          // Random drift velocity in range [-DRIFT_SPEED, +DRIFT_SPEED]
          vx: (Math.random() - 0.5) * DRIFT_SPEED * 2,
          vy: (Math.random() - 0.5) * DRIFT_SPEED * 2,
          radius: Math.random() * 2.5 + 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: Math.random() * 0.6 + 0.2,
        });
      }
    }

    // ─── Animation loop (runs at ~60fps via requestAnimationFrame) ───
    function animate() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        // 1. Update the "home" position with natural drift
        p.baseX += p.vx;
        p.baseY += p.vy;

        // Wrap around screen edges so particles loop infinitely
        if (p.baseX < -10) p.baseX = width + 10;
        if (p.baseX > width + 10) p.baseX = -10;
        if (p.baseY < -10) p.baseY = height + 10;
        if (p.baseY > height + 10) p.baseY = -10;

        // 2. Calculate vector from mouse to particle
        //    dx, dy = direction FROM mouse TO particle
        const dx = p.baseX - mouse.x;
        const dy = p.baseY - mouse.y;

        // Distance between mouse and particle's home position
        // Using Euclidean distance: √(dx² + dy²)
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 3. Apply mouse repulsion if within radius
        let targetX = p.baseX;
        let targetY = p.baseY;

        if (dist < MOUSE_RADIUS && dist > 0) {
          // Normalize the direction vector (make it unit length)
          // by dividing by distance, then scale by repulsion force.
          //
          // Force is inversely proportional to distance:
          //   closer to mouse → stronger push
          //   force = (1 - dist/radius) * strength
          //
          // The normalized vector (dx/dist, dy/dist) gives us
          // the direction away from the mouse.
          const force = (1 - dist / MOUSE_RADIUS) * REPULSION_STRENGTH;
          const pushX = (dx / dist) * force * MOUSE_RADIUS * 0.1;
          const pushY = (dy / dist) * force * MOUSE_RADIUS * 0.1;

          targetX = p.baseX + pushX;
          targetY = p.baseY + pushY;
        }

        // 4. Lerp the rendered position toward the target
        //    This creates smooth push-away AND smooth return
        //    when mouse moves away (spring-like behavior)
        p.x = lerp(p.x, targetX, LERP_SPEED);
        p.y = lerp(p.y, targetY, LERP_SPEED);

        // 5. Draw the particle
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.alpha;
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    }

    // ─── Mouse tracking ───
    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function handleMouseLeave() {
      // Move mouse offscreen so particles return to natural drift
      mouse.x = -9999;
      mouse.y = -9999;
    }

    // ─── Touch support for mobile ───
    function handleTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    }

    function handleTouchEnd() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    // ─── Initialize ───
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    resize();
    animate();

    // ─── Cleanup: prevent memory leaks ───
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
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
