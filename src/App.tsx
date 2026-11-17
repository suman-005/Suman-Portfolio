import React, { useState, useEffect, useCallback } from 'react';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Intro } from './sections/Intro';
import { KineticText } from './sections/KineticText';
import { SelectedWork } from './sections/SelectedWork';
import { TechStack } from './sections/TechStack';
import { Exploring } from './sections/Exploring';
import { Journey } from './sections/Journey';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useReducedMotion } from './hooks/useReducedMotion';
import { ScrollTrigger } from './lib/gsap';

export const App: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollTo } = useSmoothScroll(!reducedMotion);

  const handleLoaderComplete = useCallback(() => {
    setLoaderFinished(true);
    // Refresh ScrollTrigger calculations after loader overlay unmounts
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);
  }, []);

  const handleNavigate = useCallback(
    (targetId: string) => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        scrollTo(targetElement);
      }
    },
    [scrollTo]
  );

  // Observe active section for navbar indicator
  useEffect(() => {
    const sections = ['hero', 'intro', 'philosophy', 'work', 'tech', 'exploring', 'about', 'contact'];
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'intro' || id === 'philosophy') {
              setActiveSection('hero');
            } else if (id === 'exploring') {
              setActiveSection('tech');
            } else {
              setActiveSection(id);
            }
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="skip-to-content"
        style={{
          position: 'absolute',
          top: '-100px',
          left: '1rem',
          zIndex: 9999,
          padding: '0.5rem 1rem',
          background: 'var(--text-primary)',
          color: 'var(--bg)',
          borderRadius: '4px',
          transition: 'top 0.2s ease',
        }}
        onFocus={(e) => (e.currentTarget.style.top = '1rem')}
        onBlur={(e) => (e.currentTarget.style.top = '-100px')}
      >
        Skip to main content
      </a>

      {/* Intro Typographic Loader */}
      {!loaderFinished && (
        <Loader onComplete={handleLoaderComplete} reducedMotion={reducedMotion} />
      )}

      {/* Fixed Editorial Navigation */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Experience */}
      <main id="main-content">
        <Hero
          onScrollClick={() => handleNavigate('intro')}
          onNavigate={handleNavigate}
          reducedMotion={reducedMotion}
          isReady={loaderFinished}
        />
        <Intro reducedMotion={reducedMotion} />
        <KineticText reducedMotion={reducedMotion} />
        <SelectedWork reducedMotion={reducedMotion} />
        <TechStack reducedMotion={reducedMotion} />
        <Exploring reducedMotion={reducedMotion} />
        <Journey reducedMotion={reducedMotion} />
        <Contact reducedMotion={reducedMotion} />
      </main>

      {/* Editorial Colophon & Footer */}
      <Footer onBackToTop={() => handleNavigate('hero')} />
    </>
  );
};

export default App;
