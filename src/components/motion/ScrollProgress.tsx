import React, { useRef } from 'react';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap, ScrollTrigger } from '../../lib/motion/gsap';

interface ScrollProgressProps {
  className?: string;
}

/**
 * 2px gradient bar pinned to the top of the viewport, scaled with document
 * scroll progress. Driven by ScrollTrigger (which Lenis keeps in sync), so it
 * stays correct even if the ticker runs ahead of the scroll event.
 */
export const ScrollProgress: React.FC<ScrollProgressProps> = ({ className = '' }) => {
  const scope = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGsapContext(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (reduced) {
      gsap.set(bar, { scaleX: 0 });
      return;
    }

    gsap.set(bar, { transformOrigin: 'left center', scaleX: 0 });

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });

    return () => st.kill();
  }, { dependencies: [reduced] }, scope);

  return (
    <div
      ref={scope}
      className={`fixed left-0 right-0 top-0 z-50 h-[2px] bg-ink-950/40 ${className}`}
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full"
        style={{
          background: 'linear-gradient(to right, #FFC24D, #FF6B35)',
          transform: 'scaleX(0)',
        }}
      />
    </div>
  );
};
