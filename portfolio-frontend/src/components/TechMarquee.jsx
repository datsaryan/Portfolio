import React from 'react';

const STACK = [
  'Java', 'Spring Boot', 'React', 'PostgreSQL', 'REST APIs',
  'JWT / RBAC', 'Docker', 'Python', 'OpenCV', 'Git', 'Tailwind CSS', 'SQL',
];

/**
 * Infinite horizontal marquee of the core stack — pure CSS animation
 * (translateX loop on a doubled track), so it costs nothing on the main
 * thread and pauses automatically for prefers-reduced-motion.
 */
export default function TechMarquee() {
  return (
    <div className="tech-marquee" aria-hidden="true">
      <div className="tech-marquee-track">
        {[...STACK, ...STACK].map((tech, i) => (
          <span className="tech-marquee-item" key={`${tech}-${i}`}>
            {tech}
            <span className="tech-marquee-dot">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
