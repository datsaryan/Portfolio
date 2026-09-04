import React, { useEffect, useState } from 'react';
import { getLenis } from '../hooks/useLenis.js';
import { subscribeScroll } from '../hooks/scrollBus.js';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 500);
    return subscribeScroll(update);
  }, []);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`back-to-top${visible ? ' visible' : ''}`}
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
}
