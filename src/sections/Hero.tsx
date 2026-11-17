import React, { useEffect, useRef } from 'react';
import { ArrowDown, Compass } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useLocalTime } from '../hooks/useLocalTime';
import { gsap } from '../lib/gsap';
import { MagneticButton } from '../components/MagneticButton';

interface HeroProps {
  onScrollClick: () => void;
  onNavigate: (targetId: string) => void;
  reducedMotion?: boolean;
  isReady?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollClick,
  onNavigate,
  reducedMotion = false,
  isReady = true,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const titleContainerRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const metaTopRef = useRef<HTMLDivElement>(null);
  const metaBottomRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const compassRef = useRef<SVGSVGElement>(null);
  const localTime = useLocalTime('Asia/Kolkata');

  const firstName = portfolioData.personal.firstName.split('');
  const lastName = portfolioData.personal.lastName.split('');

  // 1. Initial Typographic Entrance Animation
  useEffect(() => {
    if (reducedMotion || !isReady) return;

    const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        letters,
        {
          yPercent: 125,
          opacity: 0,
          rotateZ: (i) => (i % 2 === 0 ? 4 : -4),
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 1.05,
          stagger: 0.035,
          ease: 'power4.out',
        }
      )
        .fromTo(
          statementRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.7'
        )
        .fromTo(
          actionsRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.55'
        )
        .fromTo(
          [metaTopRef.current, metaBottomRef.current],
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.5'
        );

      // Subtle ambient breathing rotation on compass
      if (compassRef.current) {
        gsap.to(compassRef.current, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'none',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion, isReady]);

  // 2. Mouse-Responsive 3D Depth Hierarchy
  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return;

    const isTouch = !window.matchMedia('(pointer: fine)').matches || 'ontouchstart' in window;
    if (isTouch) return;

    const titleEl = titleContainerRef.current;
    const actionsEl = actionsRef.current;
    const statementEl = statementRef.current;
    const metaTopEl = metaTopRef.current;
    const metaBottomEl = metaBottomRef.current;

    if (!titleEl) return;

    let titleXTo: gsap.QuickToFunc;
    let titleYTo: gsap.QuickToFunc;
    let titleRotXTo: gsap.QuickToFunc;
    let titleRotYTo: gsap.QuickToFunc;

    let mgXTo: gsap.QuickToFunc;
    let mgYTo: gsap.QuickToFunc;

    let bgXTo: gsap.QuickToFunc;
    let bgYTo: gsap.QuickToFunc;

    const ctx = gsap.context(() => {
      // Foreground: main title 3D tilt & translation
      titleXTo = gsap.quickTo(titleEl, 'x', { duration: 0.45, ease: 'power2.out' });
      titleYTo = gsap.quickTo(titleEl, 'y', { duration: 0.45, ease: 'power2.out' });
      titleRotXTo = gsap.quickTo(titleEl, 'rotationX', { duration: 0.5, ease: 'power2.out' });
      titleRotYTo = gsap.quickTo(titleEl, 'rotationY', { duration: 0.5, ease: 'power2.out' });

      // Midground: statement & buttons
      if (statementEl && actionsEl) {
        mgXTo = gsap.quickTo([statementEl, actionsEl], 'x', { duration: 0.4, ease: 'power2.out' });
        mgYTo = gsap.quickTo([statementEl, actionsEl], 'y', { duration: 0.4, ease: 'power2.out' });
      }

      // Background metadata (moves counter-intuitively for deep perspective parallax)
      if (metaTopEl && metaBottomEl) {
        bgXTo = gsap.quickTo([metaTopEl, metaBottomEl], 'x', { duration: 0.35, ease: 'power2.out' });
        bgYTo = gsap.quickTo([metaTopEl, metaBottomEl], 'y', { duration: 0.35, ease: 'power2.out' });
      }
    }, containerRef);

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const normY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

      // Foreground: title shifts 18px, tilts up to 4.5 degrees
      titleXTo?.(normX * 18);
      titleYTo?.(normY * 16);
      titleRotXTo?.(-normY * 4.5);
      titleRotYTo?.(normX * 4.5);

      // Midground: content shifts 9px
      mgXTo?.(normX * 9);
      mgYTo?.(normY * 8);

      // Background: metadata slightly drifts opposite direction (-6px)
      bgXTo?.(-normX * 6);
      bgYTo?.(-normY * 5);
    };

    const handleMouseLeave = () => {
      titleXTo?.(0);
      titleYTo?.(0);
      titleRotXTo?.(0);
      titleRotYTo?.(0);

      mgXTo?.(0);
      mgYTo?.(0);

      bgXTo?.(0);
      bgYTo?.(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="hero-section site-container hero-spatial-container"
      aria-label="Introduction and Overview"
    >
      {/* Top Metadata Bar (Background Depth Layer) */}
      <div ref={metaTopRef} className="hero-meta-top hero-layer-bg">
        <div className="status-indicator">
          <span className="status-dot" />
          <span>BURDWAN, WB, INDIA</span>
        </div>
        <div className="label-editorial">
          <span>{portfolioData.personal.coordinates}</span>
        </div>
        <div className="label-editorial">
          <span>LOCAL IST: {localTime.time}</span>
        </div>
      </div>

      {/* Main Center Content */}
      <div className="hero-content">
        {/* Foreground Layer: 3D Animated Headline */}
        <div className="hero-title-wrap hero-layer-fg">
          <h1
            ref={titleContainerRef}
            className="hero-title"
            aria-label="Suman Das"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="hero-title-line" aria-hidden="true">
              {firstName.map((char, index) => (
                <span
                  key={`first-${index}`}
                  ref={(el) => {
                    letterRefs.current[index] = el;
                  }}
                  className="hero-title-letter"
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="hero-title-line" aria-hidden="true">
              {lastName.map((char, index) => (
                <span
                  key={`last-${index}`}
                  ref={(el) => {
                    letterRefs.current[firstName.length + index] = el;
                  }}
                  className="hero-title-letter"
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Midground Layer: Subtitle & Magnetic Action CTAs */}
        <div className="hero-statement-grid hero-layer-mg">
          <div>
            <div className="label-editorial" style={{ marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              WEB DEVELOPER · AI ENTHUSIAST · BCA STUDENT
            </div>
            <p ref={statementRef} className="hero-main-statement">
              "{portfolioData.personal.heroStatement}"
            </p>
          </div>

          <div ref={actionsRef} className="hero-quick-actions">
            <MagneticButton strength={0.3} radius={90} disabled={reducedMotion}>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  onScrollClick();
                }}
                className="btn-editorial"
              >
                <span>Explore Work</span>
                <ArrowDown size={16} />
              </a>
            </MagneticButton>

            <MagneticButton strength={0.25} radius={80} disabled={reducedMotion}>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                }}
                className="btn-editorial-ghost"
              >
                <span>Journey</span>
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Bottom Metadata Bar (Background Depth Layer) */}
      <div ref={metaBottomRef} className="hero-bottom-bar hero-layer-bg">
        <div className="hero-meta-item">
          <span className="label-editorial">DISCIPLINE</span>
          <span className="body-small font-display" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            WEB &amp; AI SYSTEMS
          </span>
        </div>

        <div className="hero-meta-item">
          <span className="label-editorial">LOCATION</span>
          <span className="body-small">
            BURDWAN, INDIA
          </span>
        </div>

        <div className="hero-meta-item">
          <span className="label-editorial">EDUCATION</span>
          <span className="body-small">
            BCA — Burdwan University (2024–2027)
          </span>
        </div>

        <button
          type="button"
          className="hero-scroll-indicator"
          onClick={onScrollClick}
          aria-label="Scroll to introduction"
        >
          <span>SCROLL DOWN</span>
          <Compass ref={compassRef} size={16} className="hero-scroll-arrow" />
        </button>
      </div>
    </section>
  );
};
