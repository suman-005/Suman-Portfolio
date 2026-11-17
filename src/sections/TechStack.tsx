import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolio';

interface TechStackProps {
  reducedMotion?: boolean;
}

export const TechStack: React.FC<TechStackProps> = () => {
  const skillGroups = portfolioData.skills;

  return (
    <section
      id="tech"
      className="tech-section site-container"
      aria-labelledby="tech-heading"
    >
      <SectionHeader
        number="04 / 07"
        category="TECHNICAL CAPABILITIES"
        headline="WHAT I WORK WITH."
      />

      <div className="tech-grid" role="list">
        {skillGroups.map((group) => (
          <div key={group.category} className="tech-group" role="listitem">
            <div className="tech-group-header">
              <h3 className="tech-category-title">{group.category}</h3>
              <span className="label-editorial" style={{ fontSize: '0.7rem' }}>
                {group.skills.length} TECHNOLOGIES
              </span>
            </div>

            {group.description && (
              <p className="body-small">{group.description}</p>
            )}

            <div className="tech-items-wrap">
              {group.skills.map((skill) => (
                <span key={skill} className="tech-item-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="tech-disclaimer">
        <span>NOTE: TECHNICAL PROFICIENCY REFLECTS ACTIVE HANDS-ON LEARNING, PRACTICAL PROJECTS, AND ACADEMIC STUDY AT BURDWAN UNIVERSITY.</span>
      </div>
    </section>
  );
};
