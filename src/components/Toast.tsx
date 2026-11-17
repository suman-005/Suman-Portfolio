import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite" aria-atomic="true">
      <Check size={16} strokeWidth={2.5} color="var(--status-live)" />
      <span>{message}</span>
    </div>
  );
};
