import React, { useRef, useState } from 'react';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { gsap, ScrollTrigger } from '../../lib/motion/gsap';

export interface IndicatorSection {
  id: string;
  label: string;
}

interface SectionIndicatorProps {
  sections: IndicatorSection[];
  className?: string;
}

/**
 * Right-edge section dots with mono labels. Desktop only, per the spec.
 *
 * One ScrollTrigger per section, all created inside gsap.context() so they are
 * killed on unmount (rule 7). The active index is mirrored into React state
 * so the labels can cross-fade with CSS.
 */
export const SectionIndicator: React.FC<SectionIndicatorProps> = ({
  sections,
  className = '',
}) => {
  const scope = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery('isDesktop');
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useGsapContext(
    () => {
      if (reduced) return;

      sections.forEach((section, index) => {
        const el = document.getElementById(section.id);
        if (!el) return;

        const dot = scope.current?.querySelector<HTMLElement>(
          `[data-dot-mark="${section.id}"]`,
        );
        if (!dot) return;

        const activate = () => {
          gsap.to(dot, {
            scale: 1.9,
            backgroundColor: '#FFC24D',
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
          setActive(index);
        };

        const deactivate = () => {
          gsap.to(dot, {
            scale: 1,
            backgroundColor: 'rgba(207,232,255,0.45)',
            opacity: 0.7,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: activate,
          onEnterBack: activate,
          onLeave: deactivate,
          onLeaveBack: deactivate,
        });
      });
    },
    { dependencies: [sections, reduced] },
    scope,
  );

  if (!isDesktop) return null;

  return (
    <nav
      ref={scope}
      aria-label="Page sections"
      className={`fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex ${className}`}
    >
      {sections.map((section, index) => {
        const isActive = active === index;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-3"
            aria-current={isActive ? 'true' : undefined}
            aria-label={`Go to ${section.label}`}
          >
            <span
              className={`mono-label whitespace-nowrap transition-opacity duration-300 ${
                isActive
                  ? 'text-sun-300 opacity-100'
                  : 'text-dawn-200/50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
              }`}
            >
              {section.label}
            </span>
            <span
              data-dot-mark={section.id}
              aria-hidden="true"
              className="block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: 'rgba(207,232,255,0.45)', opacity: 0.7 }}
            />
          </a>
        );
      })}
    </nav>
  );
};
