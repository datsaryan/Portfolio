import React, { useEffect, useRef } from 'react';

const MIN_FLAKES = 60;
const MAX_FLAKES = 90;
// Fewer flakes on small/low-power screens keeps this cheap on mobile.
const flakeCountForWidth = (w) => {
  if (w < 480) return MIN_FLAKES;
  if (w < 1024) return 90;
  return MAX_FLAKES;
};

/**
 * A fixed, full-viewport canvas of falling snowflakes rendered above all
 * page content (z-index above content, pointer-events: none) so it reads
 * as ambient atmosphere without ever blocking clicks or scroll.
 *
 * - Canvas + requestAnimationFrame (one draw call per frame, not 100 DOM
 *   nodes) so it stays smooth even with 120 flakes.
 * - Each flake has its own size, opacity, fall speed, and horizontal drift
 *   (a slow sine wave) so the field doesn't look mechanical.
 * - ~30% of flakes get a soft canvas shadow-blur for a sense of depth
 *   (near/far flakes), which is far cheaper than a per-flake CSS filter.
 * - A gentle scroll-linked offset nudges flakes as the page scrolls, for a
 *   subtle parallax feel, without the canvas itself needing to scroll.
 * - Respects prefers-reduced-motion by rendering one static frame.
 * - Mount it once anywhere in the tree — <Snowfall /> — and it covers the
 *   whole viewport regardless of which section/route is showing.
 */
export default function Snowfall() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let flakes = [];
    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    let scrollOffset = 0;

    const seedFlakes = () => {
      const count = flakeCountForWidth(width);
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 5 + 2, // 2px - 10px
        speed: Math.random() * 0.3 + 0.25, // vertical fall speed
        drift: Math.random() * 0.3 + 0.15, // amplitude of horizontal sway
        driftSpeed: Math.random() * 0.015 + 0.005, // how fast it sways
        phase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0. + 0.35, // 0.35 - 0.85
        blurred: Math.random() < 0.3, // ~30% of flakes get a soft blur
        parallax: Math.random() * 0.15 + 0.02,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedFlakes();
    };
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let raf;
    const step = () => {
      // Smoothly chase the real scroll position so the parallax nudge
      // eases in/out instead of snapping on every scroll event.
      scrollOffset += (scrollY - lastScrollY) * 0.5;
      lastScrollY = scrollY;
      // Gently decay the offset back toward 0 so it doesn't accumulate
      // into a permanent drift over a long scroll session.
      scrollOffset *= 0.94;

      ctx.clearRect(0, 0, width, height);

      flakes.forEach((f) => {
        f.phase += f.driftSpeed;
        f.y += f.speed + scrollOffset * f.parallax;
        f.x += Math.sin(f.phase) * f.drift * 0.05;

        // Wrap seamlessly: recycle to the opposite edge instead of
        // resetting visibly, so the loop never looks like a restart.
        if (f.y > height + 10) {
          f.y = -10;
          f.x = Math.random() * width;
        }
        if (f.x > width + 10) f.x = -10;
        if (f.x < -10) f.x = width + 10;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        if (f.blurred) {
          ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
          ctx.shadowBlur = f.r * 1.5;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.arc(f.x, f.y, f.r / 2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // Don't keep scheduling frames while the tab is backgrounded —
      // there's nothing to see, just wasted CPU/GPU work.
      if (!reduceMotion && !document.hidden) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    if (reduceMotion) step(); // draw a single static frame, no loop

    const onVisibilityChange = () => {
      if (!document.hidden && !reduceMotion && raf == null) raf = requestAnimationFrame(step);
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="snowfall-canvas" aria-hidden="true" />;
}
