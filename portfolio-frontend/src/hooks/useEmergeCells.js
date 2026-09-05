import { useEffect } from 'react';

/**
 * Measures each `selector` descendant of `containerRef` and sets
 * `--ex`/`--ey` CSS custom properties on it, equal to the offset needed
 * to pull that cell to the container's center point.
 *
 * Pairs with CSS like:
 *   .grid:not(.is-emerged) .cell { transform: translate(var(--ex), var(--ey)) scale(0.3); opacity: 0; }
 *   .grid.is-emerged .cell       { transform: translate(0, 0) scale(1); opacity: 1; }
 *
 * ...so every cell visually converges to one shared point in the
 * "not emerged" state, then bursts outward to its real grid position
 * once `.is-emerged` is toggled (e.g. by an IntersectionObserver in the
 * component using this hook). Re-measures on resize.
 */
export function useEmergeCells(containerRef, selector = '[data-emerge-cell]', deps = []) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const measure = () => {
      const cells = container.querySelectorAll(selector);
      const cx = container.clientWidth / 2;
      const cy = container.clientHeight / 2;
      cells.forEach((el) => {
        const ex = cx - (el.offsetLeft + el.offsetWidth / 2);
        const ey = cy - (el.offsetTop + el.offsetHeight / 2);
        el.style.setProperty('--ex', `${ex}px`);
        el.style.setProperty('--ey', `${ey}px`);
      });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
