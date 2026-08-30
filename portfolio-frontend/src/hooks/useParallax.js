import { useEffect, useRef } from 'react';

/**
 * Moves the ref'd element vertically as it travels through the viewport,
 * at a fraction of normal scroll speed. Different `speed` values on
 * different elements is what creates the "layered depth" parallax look
 * (background drifts slower, foreground drifts faster/normal).
 *
 * speed 0    -> pinned in place, ignores scroll entirely
 * speed 0.15 -> barely moves (good for big soft background blobs)
 * speed 0.4  -> noticeably drifts (good for mid-ground shapes/glyphs)
 * speed 1    -> moves at full scroll speed
 *
 * Respects prefers-reduced-motion by leaving the element static.
 */
export function useParallax(speed = 0.2) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || speed === 0) return undefined;

    let raf;
    const update = () => {
      const rect = el.getBoundingClientRect();
      // Offset of the element's center from the viewport's center.
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${centerOffset * -speed}px)`;
      raf = null;
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return ref;
}
