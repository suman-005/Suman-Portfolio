import React from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.28,
  radius = 80,
  disabled = false,
  className = '',
}) => {
  const ref = useMagnetic<HTMLDivElement>({ strength, radius, disabled });

  return (
    <div
      ref={ref}
      className={`magnetic-wrapper ${className}`}
    >
      {children}
    </div>
  );
};
