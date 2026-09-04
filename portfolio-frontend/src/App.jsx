import React, { useEffect, useState } from 'react';
import { api } from './api.js';
import { useLenis } from './hooks/useLenis.js';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import TechMarquee from './components/TechMarquee.jsx';
import Metrics from './components/Metrics.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import GithubActivity from './components/GithubActivity.jsx';
import Experience from './components/Experience.jsx';
import Education from './components/Education.jsx';
import Certifications from './components/Certifications.jsx';
// import Testimonials from './components/Testimonials.jsx';
import Snowfall from './components/Snowfall.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import ParticleField from './components/ParticleField.jsx';
import { useSoundEffects } from './hooks/useSoundEffects.js';

export default function App() {
  useLenis();

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [certsLoading, setCertsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useSoundEffects();

  useEffect(() => {
    let cancelled = false;

    // Each resource fetches and resolves independently now — a slow or
    // cold-starting endpoint no longer holds back sections whose own
    // data already came back.
    api.getProjects()
      .then((data) => { if (!cancelled) setProjects(data); })
      .catch((err) => { if (!cancelled) setLoadError(err.message); })
      .finally(() => { if (!cancelled) setProjectsLoading(false); });

    api.getSkills()
      .then((data) => { if (!cancelled) setSkills(data); })
      .catch((err) => { if (!cancelled) setLoadError(err.message); })
      .finally(() => { if (!cancelled) setSkillsLoading(false); });

    api.getCertifications()
      .then((data) => { if (!cancelled) setCertifications(data); })
      .catch((err) => { if (!cancelled) setLoadError(err.message); })
      .finally(() => { if (!cancelled) setCertsLoading(false); });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Snowfall />
      <ParticleField />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <Hero />
      <TechMarquee />
      <Metrics />
      <About />
      <Skills skills={skills} loading={skillsLoading} />
      <Projects projects={projects} loading={projectsLoading} loadError={loadError} />
      <GithubActivity />
      <Experience />
      <Education />
      <Certifications certifications={certifications} loading={certsLoading} />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}
