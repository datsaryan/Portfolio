import React, { useEffect, useRef } from 'react';
import { subscribeScroll } from '../hooks/scrollBus.js';

/** Thin accent-colored bar pinned to the very top, filling as the page scrolls. */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const pct = height > 0 ? scrollTop / height : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct})`;
    };
    return subscribeScroll(update);
  }, []);

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div className="scroll-progress-bar" ref={barRef} />
    </div>
  );
}
