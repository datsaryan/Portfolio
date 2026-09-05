import React, { useEffect, useRef } from 'react';

const NODE_COUNT = 46;
const MAX_LINK_DIST = 150;
const SPEED = 0.18;

/**
 * A fixed, full-viewport canvas of small nodes that drift continuously and
 * link to nearby nodes with a live-redrawn line — an actual moving system,
 * not a one-time drawn schematic. Sits behind all page content (z-index 0,
 * pointer-events: none) so it reads as ambient motion rather than a hero
 * effect. Respects prefers-reduced-motion by rendering one static frame.
 */
export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width, height, dpr;
    let nodes = [];

    const seedNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: Math.random() * 1.4 + 0.8,
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
      seedNodes();
    };
    resize();
    window.addEventListener('resize', resize);

    const getColors = () => {
      const styles = getComputedStyle(document.documentElement);
      return {
        dot: styles.getPropertyValue('--ink-mute').trim() || '#8891A0',
        line: styles.getPropertyValue('--accent').trim() || '#2451B6',
      };
    };

    let raf;
    const step = () => {
      const { dot, line } = getColors();
      ctx.clearRect(0, 0, width, height);

      // move
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      });

      // links between nearby nodes, faded by distance
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_LINK_DIST) {
            const alpha = (1 - dist / MAX_LINK_DIST) * 0.16;
            ctx.strokeStyle = `${line}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // nodes on top
      ctx.fillStyle = `${dot}55`;
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduceMotion && !document.hidden) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    if (reduceMotion) step();

    const onVisibilityChange = () => {
      if (!document.hidden && !reduceMotion && raf == null) raf = requestAnimationFrame(step);
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field-canvas" aria-hidden="true" />;
}
