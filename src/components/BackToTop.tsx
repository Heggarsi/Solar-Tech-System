import React from 'react';

interface BackToTopProps {
  show: boolean;
}

export const BackToTop: React.FC<BackToTopProps> = ({ show }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center bg-white/40 hover:bg-rose-50/80 text-slate-800 hover:text-rose-600 shadow-md hover:shadow-lg border border-white/60 hover:border-rose-300 backdrop-blur-md transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 cursor-pointer"
    >
      <span className="text-xl font-bold leading-none select-none" aria-hidden="true">&uarr;</span>
    </button>
  );
};
