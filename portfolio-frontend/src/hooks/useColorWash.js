import { useEffect, useRef } from 'react';

/**
 * Scroll-driven ambient background wash — same idea as withhoney.com's
 * full-bleed panel color transitions, adapted to sit behind a card grid.
 *
 * Returns `gridRef` (attach to the card container) and `washRef` (attach
 * to a `.scroll-color-wash` element positioned behind it). Any descendant
 * of gridRef carrying a `data-wash-color="--some-css-var"` attribute is
 * watched; whichever one crosses the vertical center of the viewport
 * becomes the wash's new target color, eased over via the registered
 * `--wash-color` custom property (see styles.css) for a real color blend
 * instead of an instant swap.
 *
 * Re-runs whenever `deps` changes — pass the async-loaded list (e.g.
 * `[projects]`) so it re-observes once real cards have replaced any
 * loading state.
 */
export function useColorWash(deps = []) {
  const gridRef = useRef(null);
  const washRef = useRef(null);

  useEffect(() => {
    const gridEl = gridRef.current;
    const washEl = washRef.current;
    if (!gridEl || !washEl) return;

    const items = gridEl.querySelectorAll('[data-wash-color]');
    if (!items.length) return;

    const setColor = (varName) => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      if (hex) washEl.style.setProperty('--wash-color', hex);
    };
    setColor(items[0].dataset.washColor);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setColor(entry.target.dataset.washColor);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { gridRef, washRef };
}

/** Cycled per card — reuses the site's existing accent/teal/amber palette. */
export const WASH_COLORS = ['--accent', '--teal', '--amber'];
