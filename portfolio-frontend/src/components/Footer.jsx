import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">AS<span>{'{}'}</span></div>
            <p>Full-stack engineering student building end-to-end products, one commit at a time.</p>
          </div>
          <div className="footer-links">
            <h4>Quick links</h4>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
              <a href="https://github.com/datsaryan" className="social-icon" target="_blank" rel="noreferrer" aria-label="GitHub">gh</a>
              <a href="mailto:aryansobdh@gmail.com" className="social-icon" aria-label="Email">@</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {year} Aryan Singh. Built with React &amp; Spring Boot.</p>
          <p className="footer-tagline">status: open_to_opportunities</p>
        </div>
      </div>
    </footer>
  );
}
