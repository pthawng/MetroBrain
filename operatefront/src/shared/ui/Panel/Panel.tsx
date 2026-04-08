import React from 'react';
import './Panel.css';

interface PanelProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'overlay';
  style?: React.CSSProperties;
}

export const Panel: React.FC<PanelProps> = ({ children, title, className = '', variant = 'primary', style }) => {
  return (
    <div 
      className={`panel-root panel-variant-${variant} ${className}`}
      style={style}
    >
      {title && (
        <div className="panel-header">
          <h3 className="panel-title">{title}</h3>
        </div>
      )}
      <div className="panel-content">
        {children}
      </div>
    </div>
  );
};
