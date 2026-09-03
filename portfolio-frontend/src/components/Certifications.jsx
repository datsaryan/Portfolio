import React from 'react';
import Reveal from './Reveal.jsx';
import { useColorWash, WASH_COLORS } from '../hooks/useColorWash.js';

export default function Certifications({ certifications, loading }) {
  const { gridRef, washRef } = useColorWash([certifications]);

  return (
    <section id="certifications" className="section">
      <div className="scroll-color-wash" ref={washRef} aria-hidden="true" />
      <div className="container">
        <div className="section-header">
          <span className="section-tag">credentials</span>
          <h2 className="section-title">My <span className="highlight">certifications</span></h2>
        </div>

        {loading ? (
          <p className="github-loading">Loading certifications…</p>
        ) : (
          <div className="certs-grid" ref={gridRef}>
            {certifications.map((cert, i) => (
              <Reveal key={cert.id} delay={i * 0.08}>
                <div className="cert-card" data-wash-color={WASH_COLORS[i % WASH_COLORS.length]}>
                  <span className="cert-issuer">{cert.issuer}</span>
                  <div className="cert-body">
                    <h3>{cert.title}</h3>
                    <p>{cert.description}</p>
                    <div className="cert-skills">
                      {cert.skills?.map((s) => <span key={s}>{s}</span>)}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
