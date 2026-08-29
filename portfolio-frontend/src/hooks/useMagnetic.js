import { useEffect, useRef } from 'react';

/**
 * Attaches a subtle "magnetic" pull toward the cursor on hover, and a
 * gentle 3D tilt if `tilt` is true. Returns a ref to attach to the element.
 * No-op on touch devices and when the user prefers reduced motion.
 */
export function useMagnetic({ strength = 14, tilt = false } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      const tx = relX * strength;
      const ty = relY * strength;
      if (tilt) {
        const rx = (-relY * 6).toFixed(2);
        const ry = (relX * 6).toFixed(2);
        el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(${tx * 0.3}px, ${ty * 0.3}px, 0)`;
      } else {
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }
    };
    const onLeave = () => {
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength, tilt]);

  return ref;
}
