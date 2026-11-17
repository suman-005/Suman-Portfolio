import React, { useRef, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData } from '../data/portfolio';
import { gsap } from '../lib/gsap';

interface ExploringProps {
  reducedMotion?: boolean;
}

interface ExploringRowItemProps {
  item: { term: string; context: string };
  index: number;
  reducedMotion?: boolean;
}

const ExploringRowItem: React.FC<ExploringRowItemProps> = ({
  item,
  index,
  reducedMotion = false,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const xToRef = useRef<gsap.QuickToFunc | null>(null);
  const yToRef = useRef<gsap.QuickToFunc | null>(null);
  const arrowXToRef = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (reducedMotion || !termRef.current) return;

    // Disable physics on touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) return;

    xToRef.current = gsap.quickTo(termRef.current, 'x', {
      duration: 0.45,
      ease: 'power3.out',
    });
    yToRef.current = gsap.quickTo(termRef.current, 'y', {
      duration: 0.45,
      ease: 'power3.out',
    });

    if (arrowRef.current) {
      arrowXToRef.current = gsap.quickTo(arrowRef.current, 'x', {
        duration: 0.35,
        ease: 'power2.out',
      });
    }

    return () => {
      xToRef.current = null;
      yToRef.current = null;
      arrowXToRef.current = null;
    };
  }, [reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !rowRef.current || !xToRef.current || !yToRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    // Subtle, restrained displacement (max 16px horizontal, 5px vertical)
    const targetX = Math.max(-16, Math.min(16, relX * 16));
    const targetY = Math.max(-5, Math.min(5, relY * 5));

    xToRef.current(targetX);
    yToRef.current(targetY);
    if (arrowXToRef.current) {
      arrowXToRef.current(relX * 6);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (xToRef.current && yToRef.current) {
      xToRef.current(0);
      yToRef.current(0);
    }
    if (arrowXToRef.current) {
      arrowXToRef.current(0);
    }
  };

  return (
    <div
      ref={rowRef}
      className={`exploring-row ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsHovered(true)}
      onBlur={handleMouseLeave}
      tabIndex={0}
      role="region"
      aria-label={`Exploring ${item.term}`}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
        <span
          className="label-editorial"
          style={{ color: isHovered ? 'var(--accent)' : 'var(--text-muted)' }}
        >
          0{index + 1}
        </span>
        <span
          ref={termRef}
          className="exploring-term"
          style={{ willChange: 'transform' }}
        >
          {item.term}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <span className="exploring-context">{item.context}</span>
        <ArrowUpRight
          ref={arrowRef}
          size={20}
          color={isHovered ? 'var(--accent)' : 'var(--text-secondary)'}
          style={{
            transform: isHovered ? 'translate(3px, -3px)' : 'none',
            transition: 'transform 0.25s ease, color 0.25s ease',
            willChange: 'transform',
          }}
        />
      </div>
    </div>
  );
};

export const Exploring: React.FC<ExploringProps> = ({ reducedMotion = false }) => {
  const items = portfolioData.exploring;

  return (
    <section
      id="exploring"
      className="exploring-section site-container"
      aria-labelledby="exploring-heading"
    >
      <SectionHeader
        number="05 / 07"
        category="ACTIVE RESEARCH &amp; LEARNING"
        headline="CURRENTLY EXPLORING."
      />

      <div className="exploring-grid">
        {items.map((item, index) => (
          <ExploringRowItem
            key={item.term}
            item={item}
            index={index}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </section>
  );
};
