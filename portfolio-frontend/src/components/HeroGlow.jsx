import React, { useEffect, useRef } from 'react';

/**
 * Soft drifting radial-gradient blobs on a canvas, in the accent/teal
 * palette — an approximation of a shader-driven hero background, cheap
 * enough to run continuously. Respects prefers-reduced-motion.
 */
export default function HeroGlow() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width, height, dpr;
    const resize = () => {
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue('--accent').trim() || '#2451B6';
    const teal = styles.getPropertyValue('--teal').trim() || '#0F9D8C';
    const amber = styles.getPropertyValue('--amber').trim() || '#B5730A';

    const blobs = [
      { color: accent, rx: 0.28, ry: 0.32, r: 0.42, speed: 0.00018, phase: 0 },
      { color: teal, rx: 0.72, ry: 0.55, r: 0.34, speed: 0.00014, phase: 2 },
      { color: amber, rx: 0.5, ry: 0.15, r: 0.26, speed: 0.00021, phase: 4 },
    ];

    let raf;
    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);
      blobs.forEach((b) => {
        const angle = t * b.speed + b.phase;
        const cx = (b.rx + Math.cos(angle) * 0.06) * width;
        const cy = (b.ry + Math.sin(angle * 0.8) * 0.06) * height;
        const radius = b.r * Math.max(width, height);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `${b.color}33`);
        grad.addColorStop(1, `${b.color}00`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    if (reduceMotion) draw(0);

    return () => {
      window.removeEventListener('resize', resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-glow-canvas" aria-hidden="true" />;
}
