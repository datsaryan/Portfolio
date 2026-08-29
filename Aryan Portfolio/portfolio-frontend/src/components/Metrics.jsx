import React, { useEffect, useRef, useState } from 'react';

const METRICS = [
  { value: 7.8, suffix: '', decimals: 1, label: 'CGPA / 10' },
  { value: 3, suffix: '+', decimals: 0, label: 'Full-stack projects shipped' },
  { value: 25, suffix: '+', decimals: 0, label: 'REST endpoints in HireTrack' },
  { value: 300, suffix: '+', decimals: 0, label: 'Students tracked (attendance system)' },
];

function Counter({ value, suffix, decimals }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1100;
    const startTime = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);

  return (
    <span className="metric-num" ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Metrics() {
  return (
    <section className="metrics-bar">
      <div className="container">
        <div className="metrics-grid">
          {METRICS.map((m) => (
            <div className="metric-item" key={m.label}>
              <Counter value={m.value} suffix={m.suffix} decimals={m.decimals} />
              <div className="metric-label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
