import React from 'react';
import Reveal from './Reveal.jsx';

const TIMELINE = [
  {
    tagLabel: 'internship', title: 'Web Development Intern — InAmigos', date: 'Apr 2026 – May 2026',
    body: `Worked as an AI Web Development Intern at InAmigos, building a series of task-based
    frontend projects with HTML, CSS, and JavaScript — each task documented and shipped
    to a public repo as the internship progressed.`,
    points: [
      'Built responsive web pages from scratch across multiple task-based projects',
      'Implemented semantic HTML5 structure and modern CSS3 (Flexbox, Grid)',
      'Collaborated using Git and GitHub for version control and task delivery',
    ],
    link: { url: 'https://github.com/datsaryan/InAmigos-Projects', label: 'View internship repo →' },
  },
  {
    tagLabel: 'workshop', title: 'AI & Machine Learning Workshop', date: 'Feb 2026',
    body: `Participated in hands-on workshops focused on practical implementation of
    Artificial Intelligence and Machine Learning concepts, including model building,
    data preprocessing, and emerging technologies.`,
    points: ['Practical ML model implementation', 'AI emerging technologies overview', 'Hands-on coding sessions'],
  },
  {
    tagLabel: 'workshop', title: 'IT & Software Development Workshop', date: 'Jan 2026',
    body: `Attended a comprehensive workshop covering programming fundamentals, software
    development life cycle, and industry-standard tools used by professional developers.`,
    points: ['Programming fundamentals deep-dive', 'Industry tools and best practices', 'Software development methodologies'],
  },
  {
    tagLabel: 'self-initiated', title: 'Self-learning: DSA & web development', date: 'Ongoing',
    body: `Continuously sharpening problem-solving skills through structured coursework in
    Data Structures & Algorithms and Web Development, alongside building full-stack
    projects like HireTrack end-to-end.`,
    points: ['Regular LeetCode practice sessions', 'Algorithmic problem solving with C++', 'Building production-style full-stack projects'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">training &amp; learning</span>
          <h2 className="section-title">My <span className="highlight">experience</span></h2>
        </div>

        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="timeline-item">
                <div className="tl-dot"></div>
                <div className="tl-content">
                  <div className="tl-header">
                    <h3>{item.title}</h3>
                    <span className="tl-date">{item.date}</span>
                  </div>
                  <div className="tl-tag">{item.tagLabel}</div>
                  <p>{item.body}</p>
                  <ul className="tl-points">
                    {item.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                  {item.link && (
                    <a href={item.link.url} target="_blank" rel="noreferrer" className="tl-link">
                      {item.link.label}
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
