import React, { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import { subscribeScroll } from '../hooks/scrollBus.js';

const LINKS = [
  ['#hero', 'Home'],
  ['#about', 'About'],
  ['#skills', 'Skills'],
  ['#projects', 'Projects'],
  ['#experience', 'Experience'],
  ['#education', 'Education'],
  ['#contact', 'Contact'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    return subscribeScroll(update);
  }, []);

  useEffect(() => {
    const sections = LINKS.map(([href]) => document.querySelector(href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-logo">AS<span className="dot">{'{}'}</span></div>
        <ul className="nav-links">
          {LINKS.map(([href, label]) => (
            <li key={href}>
              <a href={href} className={active === href.slice(1) ? 'active' : ''}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <ThemeToggle />
          <div className="nav-cta"><a href="#contact">Contact</a></div>
          <button
            className={`nav-toggle${menuOpen ? ' open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <ul className="mobile-links">
          {LINKS.map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={closeMenu} className={active === href.slice(1) ? 'active' : ''}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
