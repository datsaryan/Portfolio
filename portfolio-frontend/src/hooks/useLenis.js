import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance = null;

/** Access the site-wide Lenis instance from anywhere (e.g. a "back to
 *  top" button). Returns null before <App> has mounted useLenis(). */
export function getLenis() {
  return lenisInstance;
}

/**
 * Initializes site-wide smooth scrolling and drives its animation loop.
 * Call once, at the top of the app (see App.jsx) — everything else
 * (parallax, scroll progress, the color wash, sticky nav) keeps working
 * unchanged, since Lenis moves the browser's real scroll position rather
 * than faking one, and native `scroll` listeners keep firing normally.
 *
 * Automatically respects prefers-reduced-motion (Lenis's own behavior):
 * smoothing drops out and scrolling tracks the input device 1:1.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,            // lower = smoother/heavier trailing, higher = snappier
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      anchors: true,        // let Lenis animate nav "#section" jumps too
    });
    lenisInstance = lenis;

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
