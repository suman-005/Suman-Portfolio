import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

interface LoaderProps {
  onComplete: () => void;
  reducedMotion?: boolean;
}

const NAME_LETTERS = ['S', 'U', 'M', 'A', 'N', ' ', 'D', 'A', 'S'];

export const Loader: React.FC<LoaderProps> = ({ onComplete, reducedMotion = false }) => {
  const [counter, setCounter] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const topMetaRef = useRef<HTMLDivElement>(null);
  const bottomMetaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];

    const ctx = gsap.context(() => {
      // 1. Initial letter entrance animation
      gsap.fromTo(
        letters,
        {
          yPercent: 120,
          opacity: 0,
          rotateX: -45,
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power3.out',
        }
      );

      // 2. Subtle floating spatial drift on center container
      gsap.to('.loader-center', {
        y: -10,
        duration: 2.0,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, overlayRef);

    // 3. Counter progression (0 to 100) calibrated over 1.35s
    const startTime = performance.now();
    const duration = 1350; // ms

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentVal = Math.floor(progress * 100);
      setCounter(currentVal);

      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${currentVal}%`;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // 4. Cinematic Exit Timeline
        const exitCtx = gsap.context(() => {
          const tl = gsap.timeline();

          tl.to(letters, {
            yPercent: -130,
            opacity: 0,
            duration: 0.45,
            stagger: 0.02,
            ease: 'power3.in',
          })
            .to(
              [topMetaRef.current, bottomMetaRef.current],
              {
                opacity: 0,
                y: -20,
                duration: 0.35,
                ease: 'power2.in',
              },
              '-=0.3'
            )
            .to(
              overlayRef.current,
              {
                yPercent: -100,
                duration: 0.85,
                ease: 'expo.inOut',
                onStart: () => {
                  // Trigger hero entrance synchronously as curtain sweeps away
                  onComplete();
                },
              },
              '-=0.15'
            );
        }, overlayRef);

        return () => exitCtx.revert();
      }
    };

    const frameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameId);
      ctx.revert();
    };
  }, [onComplete, reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return (
    <aside
      ref={overlayRef}
      className="loader-overlay"
      aria-label="Loading Suman Das portfolio"
      aria-live="polite"
      role="status"
    >
      <div ref={topMetaRef} className="loader-top">
        <span>SD / 01 — ARCHITECTURAL ARCHIVE</span>
        <span>BURDWAN, WB, INDIA</span>
      </div>

      <div className="loader-center">
        <div className="loader-name" aria-label="Suman Das">
          <span className="loader-name-line" aria-hidden="true">
            {NAME_LETTERS.map((char, index) =>
              char === ' ' ? (
                <span key={index} className="loader-char-space">
                  &nbsp;
                </span>
              ) : (
                <span
                  key={index}
                  ref={(el) => {
                    letterRefs.current[index] = el;
                  }}
                  className="loader-char"
                >
                  {char}
                </span>
              )
            )}
          </span>
        </div>

        <div className="loader-progress-wrap">
          <div
            className="loader-bar-bg"
            role="progressbar"
            aria-valuenow={counter}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div ref={progressFillRef} className="loader-bar-fill" />
          </div>
        </div>
      </div>

      <div ref={bottomMetaRef} className="loader-bottom">
        <div>
          <span className="loader-counter">
            {counter < 10 ? `0${counter}` : counter}%
          </span>
        </div>
        <div className="loader-status">
          INITIALIZING CINEMATIC EXPERIENCE
        </div>
      </div>
    </aside>
  );
};
