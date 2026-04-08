import React from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'control';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'secondary', 
  size = 'md', 
  loading, 
  className = '', 
  ...props 
}) => {
  return (
    <button 
      className={`btn-root btn-variant-${variant} btn-size-${size} ${className} ${loading ? 'btn-loading' : ''}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <span className="btn-spinner" /> : children}
    </button>
  );
};
