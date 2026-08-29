import React, { useEffect, useState } from 'react';
import { api } from './api.js';

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
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import ParticleField from './components/ParticleField.jsx';
import { useSoundEffects } from './hooks/useSoundEffects.js';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useSoundEffects();

  useEffect(() => {
    let cancelled = false;

    Promise.all([api.getProjects(), api.getSkills(), api.getCertifications()])
      .then(([projectData, skillData, certData]) => {
        if (cancelled) return;
        setProjects(projectData);
        setSkills(skillData);
        setCertifications(certData);
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <ParticleField />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <Hero />
      <TechMarquee />
      <Metrics />
      <About />
      <Skills skills={skills} loading={loading} />
      <Projects projects={projects} loading={loading} loadError={loadError} />
      <GithubActivity />
      <Experience />
      <Education />
      <Certifications certifications={certifications} loading={loading} />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}
