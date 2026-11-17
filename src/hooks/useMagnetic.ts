import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

interface MagneticOptions {
  strength?: number; // 0.1 to 0.5 (default 0.25)
  radius?: number; // trigger radius in px (default 80)
  disabled?: boolean;
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: MagneticOptions = {}
) {
  const elementRef = useRef<T | null>(null);
  const { strength = 0.28, radius = 90, disabled = false } = options;

  useEffect(() => {
    const el = elementRef.current;
    if (!el || disabled || typeof window === 'undefined') return;

    // Detect touch / coarse pointer
    const isTouch = !window.matchMedia('(pointer: fine)').matches || 'ontouchstart' in window;
    if (isTouch) return;

    let xTo: gsap.QuickToFunc;
    let yTo: gsap.QuickToFunc;

    const ctx = gsap.context(() => {
      xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power2.out' });
      yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power2.out' });
    }, el);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance < radius) {
        xTo(dx * strength);
        yTo(dy * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.35)',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      ctx.revert();
    };
  }, [strength, radius, disabled]);

  return elementRef;
}
