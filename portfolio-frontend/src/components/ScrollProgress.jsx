import React, { useEffect, useRef } from 'react';

/** Thin accent-colored bar pinned to the very top, filling as the page scrolls. */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let raf;
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const pct = height > 0 ? (scrollTop / height) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
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
  }, []);

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div className="scroll-progress-bar" ref={barRef} />
    </div>
  );
}
