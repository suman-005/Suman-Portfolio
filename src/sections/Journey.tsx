import React, { useEffect, useRef } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolio';
import { gsap } from '../lib/gsap';

interface JourneyProps {
  reducedMotion?: boolean;
}

export const Journey: React.FC<JourneyProps> = ({ reducedMotion = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reducedMotion) return;

    const validItems = itemsRef.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      validItems.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const milestones = portfolioData.journey;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="journey-section site-container"
      aria-labelledby="journey-heading"
    >
      <SectionHeader
        number="06 / 07"
        category="TIMELINE &amp; EVOLUTION"
        headline="A WORK IN PROGRESS."
      />

      <div className="journey-timeline">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.year}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="journey-item"
          >
            <div className="journey-year-col">
              <span className="journey-year">{milestone.year}</span>
              {milestone.highlight && (
                <span className="journey-highlight">{milestone.highlight}</span>
              )}
            </div>

            <div className="journey-content-col">
              <h3 className="journey-title">{milestone.title}</h3>
              <p className="journey-description">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
