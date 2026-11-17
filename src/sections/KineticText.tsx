import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolio';
import { gsap } from '../lib/gsap';
import { useScrollVelocity } from '../hooks/useScrollVelocity';

interface KineticTextProps {
  reducedMotion?: boolean;
}

// Pre-calculate line word chunks with global indices for stable refs
let staticGlobalIndex = 0;
const tokenizedLines = portfolioData.kineticStatement.map((line) => {
  const words = line.split(' ');
  return words.map((word) => {
    const idx = staticGlobalIndex++;
    const isKeyWord =
      word.includes('CODE') ||
      word.includes('EXPERIMENTS') ||
      word.includes('AI') ||
      word.includes('POSSIBILITIES');
    return { word, index: idx, isKeyWord };
  });
});

export const KineticText: React.FC<KineticTextProps> = ({ reducedMotion = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const velocity = useScrollVelocity(reducedMotion);

  // 1. Scroll-Driven Multi-Directional Word Assembly
  useEffect(() => {
    if (reducedMotion) return;

    const isMobile = window.innerWidth < 768;
    const validWords = wordsRef.current.filter(Boolean) as HTMLSpanElement[];

    const ctx = gsap.context(() => {
      // Assemble words from alternating lateral directions with GPU transforms
      gsap.fromTo(
        validWords,
        {
          opacity: 0.12,
          y: (i) => (i % 2 === 0 ? 42 : -36),
          x: (i) => (isMobile ? (i % 2 === 0 ? 18 : -18) : ((i % 3) - 1) * 48),
          filter: 'blur(4px)',
          letterSpacing: isMobile ? '0.01em' : '0.08em',
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          filter: 'blur(0px)',
          letterSpacing: '-0.035em',
          stagger: 0.035,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            end: 'bottom 45%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // 2. Subtle Scroll Velocity Reaction (Restrained Skew & Drift)
  useEffect(() => {
    if (reducedMotion || !textWrapRef.current) return;

    const wrap = textWrapRef.current;
    const clampedVelocity = Math.max(Math.min(velocity, 2.5), -2.5);

    if (Math.abs(clampedVelocity) > 0.05) {
      gsap.to(wrap, {
        skewX: clampedVelocity * -0.9,
        x: clampedVelocity * 5,
        duration: 0.2,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    } else {
      gsap.to(wrap, {
        skewX: 0,
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  }, [velocity, reducedMotion]);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="kinetic-section"
      aria-label="Kinetic manifesto statement"
    >
      <div className="site-container">
        <div className="kinetic-inner">
          <div className="label-editorial" style={{ color: '#888888', marginBottom: '2rem' }}>
            02 / 07 — KINETIC MANIFESTO
          </div>

          <div
            ref={textWrapRef}
            className="kinetic-text-wrap"
            role="region"
            aria-label="Statement"
            style={{ willChange: 'transform' }}
          >
            {tokenizedLines.map((tokens, lineIndex) => (
              <div key={lineIndex} className="kinetic-line">
                {tokens.map((token) => (
                  <span
                    key={token.index}
                    ref={(el) => {
                      wordsRef.current[token.index] = el;
                    }}
                    className={`kinetic-word ${token.isKeyWord ? 'highlight' : ''}`}
                  >
                    {token.word}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="kinetic-footer-note">
            <span>SCROLL ASSEMBLED TYPOGRAPHY</span>
            <span>BURDWAN UNIVERSITY · 2024–2027</span>
          </div>
        </div>
      </div>
    </section>
  );
};
