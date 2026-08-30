import React from 'react';
import Reveal from './Reveal.jsx';
import { useParallax } from '../hooks/useParallax.js';

const CARDS = [
  {
    label: 'intro',
    title: 'Introduction',
    body: `I'm a B.Tech Computer Science student at OP Jindal University, Raigarh, comfortable
    owning a feature from schema design through UI. I build end-to-end web applications —
    REST APIs, relational databases, and modern JavaScript frontends.`,
  },
  {
    label: 'goal',
    title: 'Career objective',
    body: `Seeking a full-stack developer internship where I can apply my experience with
    Java/Spring Boot, React, and relational databases, and keep sharpening my engineering
    skills on production-grade projects.`,
  },
];

export default function About() {
  const blobRef = useParallax(0.15);

  return (
    <section id="about" className="section">
      <div className="section-parallax-blob about-blob" ref={blobRef} aria-hidden="true" />
      <div className="container">
        <div className="section-header">
          <span className="section-tag">who I am</span>
          <h2 className="section-title">About <span className="highlight">me</span></h2>
        </div>

        <div className="about-layout">
          <Reveal>
            <div className="about-photo-frame">
              <div className="photo-titlebar">
                <span className="console-dot red" />
                <span className="console-dot yellow" />
                <span className="console-dot green" />
                <span className="console-path">headshot.jpg</span>
              </div>
              <div className="about-photo-wrap">
                <img src="/profile-headshot.jpg" alt="Aryan Singh" className="about-photo" />
              </div>
            </div>
          </Reveal>

          <div className="about-grid">
        {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="about-card">
                <span className="card-label">{c.label}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.16}>
            <div className="about-card">
              <span className="card-label">education</span>
              <h3>B.Tech, Computer Science Engineering</h3>
              <p>
                OP Jindal University, Raigarh — expected graduation June 2027.
                Current CGPA: 7.8 / 10.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="about-card">
              <span className="card-label">strengths</span>
              <h3>How I work</h3>
              <ul className="strengths-list">
                <li>Quick learner</li>
                <li>Team collaboration</li>
                <li>Analytical thinking</li>
                <li>Problem solving</li>
                <li>Communication</li>
                <li>Adaptability</li>
              </ul>
            </div>
          </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
