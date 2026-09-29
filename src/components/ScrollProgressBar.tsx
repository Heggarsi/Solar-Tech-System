import React from 'react';

interface ScrollProgressBarProps {
  progress: number; // 0 to 1
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ progress }) => {
  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-slate-100/60"
      aria-hidden="true"
    >
      <div 
        className="h-full bg-gradient-to-r from-sky-400 via-rose-400 to-rose-500 transition-all duration-150 ease-out"
        style={{ width: `${Math.min(Math.max(progress * 100, 0), 100)}%` }}
      />
    </div>
  );
};
