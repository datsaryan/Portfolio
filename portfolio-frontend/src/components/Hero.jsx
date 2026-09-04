import React, { useEffect, useRef, useState } from 'react';
import HeroGlow from './HeroGlow.jsx';
import { useMagnetic } from '../hooks/useMagnetic.js';
import { useParallax } from '../hooks/useParallax.js';
import { subscribeScroll } from '../hooks/scrollBus.js';

const RESPONSE_LINES = [
  { key: '"name"', value: '"Aryan Singh"', type: 'str' },
  { key: '"role"', value: '"Full Stack Engineer"', type: 'str' },
  { key: '"stack"', value: '["Java", "Spring Boot", "React", "PostgreSQL"]', type: 'raw' },
  { key: '"cgpa"', value: '7.8', type: 'num' },
  { key: '"projects_shipped"', value: '3', type: 'num' },
  { key: '"status"', value: '"open_to_internships"', type: 'str' },
];

/** Renders `{ "key": value, ... }` with a typewriter effect, once in view. */
function JsonTypewriter() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || lineIndex >= RESPONSE_LINES.length) return;
    const fullLine = `${RESPONSE_LINES[lineIndex].key}: ${RESPONSE_LINES[lineIndex].value}`;
    if (charIndex < fullLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 14);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, 150);
    return () => clearTimeout(t);
  }, [started, charIndex, lineIndex]);

  const currentFullLine =
    lineIndex < RESPONSE_LINES.length
      ? `${RESPONSE_LINES[lineIndex].key}: ${RESPONSE_LINES[lineIndex].value}`
      : '';

  return (
    <div className="console-body" ref={ref}>
      <span className="console-req">GET /api/profile</span>
      <span className="json-punc">{'{'}</span>
      {'\n'}
      {RESPONSE_LINES.slice(0, lineIndex).map((line) => (
        <React.Fragment key={line.key}>
          {'  '}
          <span className="json-key">{line.key}</span>
          <span className="json-punc">: </span>
          <span className={line.type === 'num' ? 'json-num' : line.type === 'str' ? 'json-str' : ''}>
            {line.value}
          </span>
          <span className="json-punc">,</span>
          {'\n'}
        </React.Fragment>
      ))}
      {started && lineIndex < RESPONSE_LINES.length && (
        <>
          {'  '}
          {currentFullLine.slice(0, charIndex)}
          <span className="console-cursor" />
          {'\n'}
        </>
      )}
      {lineIndex >= RESPONSE_LINES.length && (
        <>
          <span className="json-punc">{'}'}</span>
          <span className="console-cursor" />
        </>
      )}
    </div>
  );
}

export default function Hero() {
  const contentRef = useRef(null);
  const sectionRef = useRef(null);
  const magneticRef = useMagnetic({ strength: 10 });

  // Layered depth: background drifts slowest, glyphs drift at a mid speed
  // each slightly different, foreground content moves fastest of all —
  // that speed mismatch between layers is what reads as parallax.
  const glowRef = useParallax(0.08);
  const glyph1Ref = useParallax(0.22);
  const glyph2Ref = useParallax(0.32);
  const glyph3Ref = useParallax(0.26);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    // Fade distance scales with the section's own height (with a sane
    // floor) instead of a fixed px value, so it doesn't fade out before
    // the user has scrolled past the content on tall mobile layouts.
    // Recomputed every tick (cheap) so it stays correct across resizes
    // and mobile address-bar collapse/expand without a dedicated listener.
    const update = () => {
      const h = sectionRef.current?.offsetHeight || window.innerHeight;
      const fadeDistance = Math.max(h * 0.9, 400);
      const y = window.scrollY;
      if (contentRef.current && y < fadeDistance) {
        contentRef.current.style.transform = `translateY(${y * 0.12}px)`;
        contentRef.current.style.opacity = String(Math.max(1 - y / fadeDistance, 0));
      } else if (contentRef.current) {
        contentRef.current.style.opacity = '0';
      }
    };

    window.visualViewport?.addEventListener('resize', update);
    const unsubscribe = subscribeScroll(update);

    return () => {
      window.visualViewport?.removeEventListener('resize', update);
      unsubscribe();
    };
  }, []);

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="hero-glow-parallax" ref={glowRef}><HeroGlow /></div>
      <span className="hero-glyph hero-glyph-1" ref={glyph1Ref} aria-hidden="true">{'</>'}</span>
      <span className="hero-glyph hero-glyph-2" ref={glyph2Ref} aria-hidden="true">{'{ }'}</span>
      <span className="hero-glyph hero-glyph-3" ref={glyph3Ref} aria-hidden="true">{'#!/'}</span>
      <div className="hero-content" ref={contentRef}>
        <div className="hero-text">
          <span className="hero-badge">
            <span className="dot-live" /> Open to internships
          </span>
          <h1 className="hero-title">
            Aryan Singh builds <span className="accent">backend systems</span> that hold up.
          </h1>
          <p className="hero-intro">
            A full-stack engineering student building end-to-end web applications spanning
            REST APIs, relational databases, and modern JavaScript frontends — with hands-on
            experience in authentication, authorization, and multi-tenant systems.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary btn-magnetic" ref={magneticRef}>Get in touch</a>
            <a href="/Aryan_Resume.pdf" className="btn btn-outline" download>Download résumé</a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">7.8</span>
              <span className="stat-label">CGPA / 10</span>
            </div>
            <div className="stat">
              <span className="stat-num">25+</span>
              <span className="stat-label">REST endpoints shipped</span>
            </div>
            <div className="stat">
              <span className="stat-num">80%+</span>
              <span className="stat-label">test coverage</span>
            </div>
          </div>
        </div>

        <div className="hero-console">
          <div className="console-titlebar">
            <span className="console-dot red" />
            <span className="console-dot yellow" />
            <span className="console-dot green" />
            <span className="console-path">profile.json</span>
          </div>
          <JsonTypewriter />
        </div>
      </div>

      <div className="scroll-hint">
        <span>SCROLL</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
}
