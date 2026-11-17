import { useState, useEffect } from 'react';

export function useScrollVelocity(disabled = false) {
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    let rafId: number;
    let lastScrollY = window.scrollY;
    let currentVelocity = 0;

    const checkVelocity = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Normalize delta into a clamped velocity factor
      const targetVelocity = Math.max(Math.min(delta / 30, 2.5), -2.5);
      currentVelocity += (targetVelocity - currentVelocity) * 0.18;

      if (Math.abs(currentVelocity) > 0.02) {
        setVelocity(currentVelocity);
      } else if (velocity !== 0) {
        setVelocity(0);
      }

      rafId = requestAnimationFrame(checkVelocity);
    };

    rafId = requestAnimationFrame(checkVelocity);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [disabled, velocity]);

  return velocity;
}
