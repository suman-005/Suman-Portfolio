import React from 'react';

interface SectionHeaderProps {
  number: string;
  category: string;
  headline?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  category,
  headline,
  className = '',
}) => {
  return (
    <div className={`section-header ${className}`}>
      <div className="section-header-top">
        <span className="section-number">{number}</span>
        <span className="section-label">{category}</span>
      </div>
      {headline && <h2 className="section-headline">{headline}</h2>}
    </div>
  );
};
