import React, { useEffect, useRef } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolio';
import { gsap } from '../lib/gsap';

interface IntroProps {
  reducedMotion?: boolean;
}

export const Intro: React.FC<IntroProps> = ({ reducedMotion = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none play reverse',
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }
      ).fromTo(
        contentRef.current,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
        '-=0.45'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="intro-section site-container"
      aria-labelledby="intro-heading"
    >
      <SectionHeader
        number="01 / 07"
        category="PHILOSOPHY &amp; PERSPECTIVE"
      />

      <div className="intro-grid">
        <div>
          <h2 id="intro-heading" ref={headingRef} className="intro-heading-text">
            CODE IS MY MEDIUM.
            <br />
            EXPERIMENTATION
            <br />
            IS MY PROCESS.
          </h2>
        </div>

        <div ref={contentRef} className="intro-description-block">
          <p className="body-large">
            {portfolioData.personal.introParagraph}
          </p>

          <div className="intro-academic-badge">
            <span className="label-editorial" style={{ color: 'var(--text-primary)' }}>
              ACADEMIC FOUNDATION
            </span>
            <p className="body-small font-display" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {portfolioData.personal.education.degree}
            </p>
            <p className="body-small">
              {portfolioData.personal.education.institution} · {portfolioData.personal.education.period}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
