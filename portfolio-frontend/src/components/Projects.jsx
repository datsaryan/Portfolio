import React, { useState } from 'react';
import Reveal from './Reveal.jsx';
import { useMagnetic } from '../hooks/useMagnetic.js';
import { useParallax } from '../hooks/useParallax.js';
import { useColorWash, WASH_COLORS } from '../hooks/useColorWash.js';

/* Abstract, code-native preview graphics per project — no fake screenshots,
   just a browser-chrome frame with a small illustrative motif matching
   what each project actually does. Each motif carries a little bit of
   looping motion so the preview reads as "live" rather than a static
   screenshot — a scanning line, a pulsing status chip, a shimmering
   skeleton row — all respecting prefers-reduced-motion globally. */
function KanbanMotif() {
  return (
    <svg viewBox="0 0 320 150" className="proj-motif-svg">
      {[24, 122, 220].map((x, i) => (
        <g key={x}>
          <rect x={x} y="14" width="76" height="122" rx="6" className="motif-col" />
          <rect
            x={x + 10}
            y="28"
            width="56"
            height="16"
            rx="3"
            className={`motif-chip motif-chip-${i} motif-anim-pulse`}
            style={{ animationDelay: `${i * 0.25}s` }}
          />
          <rect
            x={x + 10}
            y="52"
            width="40"
            height="16"
            rx="3"
            className="motif-chip-ghost motif-anim-shimmer"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
          {i !== 1 && (
            <rect
              x={x + 10}
              y="76"
              width="50"
              height="16"
              rx="3"
              className="motif-chip-ghost motif-anim-shimmer"
              style={{ animationDelay: `${i * 0.18 + 0.35}s` }}
            />
          )}
        </g>
      ))}
    </svg>
  );
}

function GridSiteMotif() {
  return (
    <svg viewBox="0 0 320 150" className="proj-motif-svg">
      <rect x="20" y="16" width="280" height="34" rx="6" className="motif-col" />
      <circle cx="40" cy="33" r="7" className="motif-chip motif-chip-2 motif-anim-pulse" />
      <rect x="58" y="27" width="70" height="12" rx="3" className="motif-chip-ghost" />
      <rect
        x="230"
        y="24"
        width="52"
        height="18"
        rx="9"
        className="motif-chip motif-chip-1 motif-anim-glow"
      />
      {[20, 118, 216].map((x) => (
        <rect key={x} x={x} y="62" width="84" height="74" rx="6" className="motif-col" />
      ))}
      {[20, 118, 216].map((x, i) => (
        <g key={`bars-${x}`}>
          <rect
            x={x + 14}
            y="76"
            width="56"
            height="10"
            rx="3"
            className="motif-chip-ghost motif-anim-shimmer"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
          <rect
            x={x + 14}
            y="94"
            width="40"
            height="10"
            rx="3"
            className="motif-chip-ghost motif-anim-shimmer"
            style={{ animationDelay: `${i * 0.2 + 0.3}s` }}
          />
        </g>
      ))}
    </svg>
  );
}

function ScanMotif() {
  return (
    <svg viewBox="0 0 320 150" className="proj-motif-svg">
      <rect x="110" y="20" width="100" height="110" rx="10" className="motif-col" />
      {/* corner brackets, like a detection frame */}
      {[
        [118, 30, 'M0 12 V0 H12'],
        [190, 30, 'M0 0 H12 V12'],
        [118, 110, 'M0 0 V12 H12'],
        [190, 110, 'M12 0 V12 H0'],
      ].map(([x, y, d], idx) => (
        <path
          key={idx}
          d={d}
          transform={`translate(${x} ${y})`}
          className="motif-bracket motif-anim-glow"
          style={{ animationDelay: `${idx * 0.15}s` }}
        />
      ))}
      <circle cx="160" cy="70" r="26" className="motif-chip-ghost-fill motif-anim-spin" />
      <line x1="112" y1="30" x2="208" y2="30" className="motif-scanline motif-anim-scan" />
    </svg>
  );
}

const MOTIF_BY_KEYWORD = [
  { test: /hiretrack|ats/i, Motif: KanbanMotif },
  { test: /ngo|awareness|inamigos/i, Motif: GridSiteMotif },
  { test: /face|attendance|recognition/i, Motif: ScanMotif },
];

function pickMotif(title = '') {
  const found = MOTIF_BY_KEYWORD.find((m) => m.test.test(title));
  return found ? found.Motif : KanbanMotif;
}

function ProjectPreview({ title }) {
  const Motif = pickMotif(title);
  return (
    <div className="project-preview">
      <div className="project-preview-chrome">
        <span className="console-dot red" />
        <span className="console-dot yellow" />
        <span className="console-dot green" />
      </div>
      <div className="project-preview-body">
        <Motif />
      </div>
    </div>
  );
}

function ProjectCard({ p, delay, washColor }) {
  const tiltRef = useMagnetic({ strength: 6, tilt: true });
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => setFlipped((v) => !v);
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip();
    }
  };
  // Links live on the back face — don't let a click on them also toggle the flip.
  const stop = (e) => e.stopPropagation();

  return (
    <Reveal delay={delay}>
      <div
        className="project-card project-card-tilt"
        ref={tiltRef}
        data-wash-color={washColor}
      >
        <div className={`flip-card-inner${flipped ? ' is-flipped' : ''}`}>
          {/* FRONT */}
          <div
            className="flip-card-face flip-card-front"
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label={`Show more details about ${p.title}`}
            data-cursor-label="FLIP"
            onClick={toggleFlip}
            onKeyDown={onKeyDown}
          >
            <ProjectPreview title={p.title} />
            <div className="project-header">
              <span className="project-icon">{'{ }'}</span>
              <span className="project-date">{p.dateRange}</span>
            </div>
            <div className="project-body">
              <h3>{p.title}</h3>
              <p>{p.description}</p>

              {p.highlights?.length > 0 && (
                <div className="project-highlights">
                  {p.highlights.slice(0, 2).map((h) => (
                    <span key={h}>{h}</span>
                  ))}
                </div>
              )}

              <span className="flip-hint">
                Tap for details <span className="flip-hint-icon">⟲</span>
              </span>
            </div>
          </div>

          {/* BACK */}
          <div
            className="flip-card-face flip-card-back"
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label={`Hide details about ${p.title}`}
            onClick={toggleFlip}
            onKeyDown={onKeyDown}
          >
            <div className="project-body project-body-back">
              <h3>{p.title}</h3>
              <span className="project-date">{p.dateRange}</span>
              <p>{p.description}</p>

              {p.highlights?.length > 0 && (
                <div className="project-highlights">
                  {p.highlights.map((h) => (
                    <span key={h}>{h}</span>
                  ))}
                </div>
              )}

              {p.techTags?.length > 0 && (
                <div className="tech-tags">
                  {p.techTags.map((t) => (
                    <span className="tech-tag" key={t}>{t}</span>
                  ))}
                </div>
              )}

              <div className="project-links" onClick={stop}>
                {p.githubUrl && (
                  <a href={p.githubUrl} className="proj-btn" target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl} className="proj-btn" target="_blank" rel="noreferrer">
                    Live demo ↗
                  </a>
                )}
              </div>

              <span className="flip-hint">
                Back <span className="flip-hint-icon">⟲</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects({ projects, loading, loadError }) {
  const blobRef = useParallax(0.15);
  const { gridRef, washRef } = useColorWash([projects]);

  return (
    <section id="projects" className="section">
      <div className="scroll-color-wash" ref={washRef} aria-hidden="true" />
      <div className="section-parallax-blob projects-blob" ref={blobRef} aria-hidden="true" />
      <div className="container">
        <div className="section-header">
          <span className="section-tag">what I've built</span>
          <h2 className="section-title">Selected <span className="highlight">projects</span></h2>
        </div>

        {loading && <p className="github-loading">Loading projects…</p>}
        {loadError && (
          <p className="github-error">
            Couldn't load projects from the API ({loadError}). Is the backend running?
          </p>
        )}

        <div className="projects-grid" ref={gridRef}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} delay={(i % 3) * 0.08} washColor={WASH_COLORS[i % WASH_COLORS.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}
