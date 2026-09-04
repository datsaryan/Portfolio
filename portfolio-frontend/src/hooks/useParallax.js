import { useEffect, useRef } from 'react';
import { subscribeScroll } from './scrollBus.js';

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
 * Updates run on the shared scroll bus (see scrollBus.js) — one
 * listener/rAF loop shared across every parallax element on the page,
 * rather than each instance running its own.
 */
export function useParallax(speed = 0.2) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || speed === 0) return undefined;

    const update = () => {
      const rect = el.getBoundingClientRect();
      // Offset of the element's center from the viewport's center.
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${centerOffset * -speed}px)`;
    };

    return subscribeScroll(update);
  }, [speed]);

  return ref;
}
