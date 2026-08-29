import React from 'react';
import Reveal from './Reveal.jsx';

const COURSES = [
  'Data Structures', 'Machine Learning', 'Deep Learning', 'Computer Vision',
  'NLP', 'Artificial Intelligence', 'Computer Networks', 'DBMS',
  'Operating Systems', 'Programming Language Principles',
];

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">academic journey</span>
          <h2 className="section-title">My <span className="highlight">education</span></h2>
        </div>

        <div className="edu-grid">
          <Reveal>
            <div className="edu-card">
              <div className="edu-info">
                <span className="edu-degree">Bachelor of Technology (B.Tech)</span>
                <h3>Computer Science Engineering</h3>
                <p className="edu-college">OP Jindal University, Raigarh</p>
                <div className="edu-meta">
                  <span className="edu-year">2023 – Expected June 2027</span>
                  <span className="edu-cgpa">CGPA: 7.8 / 10</span>
                </div>
              </div>
              <div className="edu-ribbon">Current</div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="edu-courses">
              <h3>Key coursework</h3>
              <div className="course-chips">
                {COURSES.map((name) => (
                  <span className="course-chip" key={name}>{name}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
