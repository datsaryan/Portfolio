import React, { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';

// Maps a tool name to a Simple Icons slug + brand color, for a real recognizable
// mark next to each chip. Falls back to a plain chip (no icon) when unmapped.
const ICON_MAP = {
  'Java': { slug: 'openjdk', color: '000000', outline: true },
  'Spring Boot': { slug: 'springboot', color: '6DB33F' },
  'React': { slug: 'react', color: '61DAFB' },
  'PostgreSQL': { slug: 'postgresql', color: '4169E1' },
  'Flyway': { slug: 'flyway', color: 'CC0200' },
  'JWT / RBAC': { slug: 'jsonwebtokens', color: 'F5F5F5', outline: true },
  'Docker': { slug: 'docker', color: '2496ED' },
  'Maven': { slug: 'apachemaven', color: 'C71A36' },
  'JUnit / Mockito': { slug: 'junit5', color: '25A162' },
  'Python': { slug: 'python', color: '3776AB' },
  'OpenCV': { slug: 'opencv', color: '5C3EE8' },
};

function ToolIcon({ name }) {
  const meta = ICON_MAP[name];
  if (!meta) return null;
  return (
    <img
      className={`tool-icon${meta.outline ? ' tool-icon-outline' : ''}`}
      src={`https://cdn.simpleicons.org/${meta.slug}/${meta.color}`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      width={15}
      height={15}
    />
  );
}

function SkillBar({ skill }) {
  const ref = useRef(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-item" ref={ref}>
      <div className="skill-info">
        <span>{skill.name}</span>
        <span className="skill-pct">{skill.proficiency}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-fill" style={{ width: filled ? `${skill.proficiency}%` : 0 }} />
      </div>
    </div>
  );
}

export default function Skills({ skills, loading }) {
  const technical = skills.filter((s) => s.category === 'TECHNICAL');
  const tools = skills.filter((s) => s.category === 'TOOL');
  const soft = skills.filter((s) => s.category === 'SOFT');

  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="section-tag">what I know</span>
            <h2 className="section-title">My <span className="highlight">skills</span></h2>
          </div>
        </Reveal>

        {loading ? (
          <p className="github-loading">Loading skills…</p>
        ) : (
          <div className="skills-wrapper">
            <Reveal>
              <div className="skills-column">
                <h3 className="skills-col-title">Technical</h3>
                {technical.map((s) => (
                  <SkillBar key={s.id} skill={s} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="skills-column">
                <h3 className="skills-col-title">Soft skills</h3>
                <div className="soft-skills-grid">
                  {soft.map((s) => (
                    <div key={s.id} className="soft-card">{s.name}</div>
                  ))}
                </div>

                <h3 className="skills-col-title" style={{ marginTop: '2.2rem' }}>Tools &amp; platforms</h3>
                <div className="tools-grid">
                  {tools.map((s) => (
                    <div key={s.id} className="tool-chip">
                      <ToolIcon name={s.name} />
                      {s.name}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
