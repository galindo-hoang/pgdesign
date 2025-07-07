import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = '#40674D',
  text = 'Đang tải...',
  className = ''
}) => {
  return (
    <div className={`loading-spinner-container ${size} ${className}`}>
      <div 
        className="loading-spinner" 
        style={{ borderColor: `${color}33`, borderTopColor: color }}
      />
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner; 