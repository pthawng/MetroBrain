import React from 'react';
import './Badge.css';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'meta' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className = '', dot }) => {
  return (
    <span className={`badge-root badge-variant-${variant} ${className}`}>
      {dot && <span className="badge-dot" />}
      {children}
    </span>
  );
};
