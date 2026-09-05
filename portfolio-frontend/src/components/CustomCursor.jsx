import React, { useEffect, useRef, useState } from 'react';

/**
 * A small accent-colored dot that follows the pointer with easing, and
 * expands over interactive elements (links, buttons, cards). Over elements
 * carrying a `data-cursor-label`, it instead grows into a filled circle
 * showing that label (e.g. "VIEW") — used on project cards. Disabled
 * automatically on touch devices. Purely decorative — never blocks clicks.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [label, setLabel] = useState('');

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    document.body.classList.add('has-custom-cursor');

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let raf;
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVisibilityChange = () => {
      if (!document.hidden && raf == null) raf = requestAnimationFrame(tick);
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const interactiveSelector = 'a, button, .about-card, input, textarea, .tool-chip';
    const onOver = (e) => {
      const labelEl = e.target.closest('[data-cursor-label]');
      if (labelEl) {
        setLabel(labelEl.dataset.cursorLabel);
        document.body.classList.add('cursor-label-active');
        return;
      }
      if (e.target.closest(interactiveSelector)) {
        document.body.classList.add('cursor-active');
      }
    };
    const onOut = (e) => {
      if (e.target.closest('[data-cursor-label]')) {
        document.body.classList.remove('cursor-label-active');
      }
      if (e.target.closest(interactiveSelector)) {
        document.body.classList.remove('cursor-active');
      }
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(raf);
      document.body.classList.remove('has-custom-cursor', 'cursor-active', 'cursor-label-active');
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true">
        {label && <span className="cursor-ring-label">{label}</span>}
      </div>
    </>
  );
}
