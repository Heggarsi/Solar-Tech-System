import React, { useRef, type ReactNode } from 'react';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { gsap } from '../../lib/motion/gsap';
import { PARALLAX, REVEAL } from '../../lib/motion/tokens';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Which token to use, or an explicit 0..1 speed. */
  layer?: 'bg' | 'mid' | 'fg';
  speed?: number;
  /** Mobile/tablet are damped to 50% rather than disabled outright. */
  tabletFactor?: number;
}

/**
 * Scroll-linked translate on a single element. Transform only, so it stays
 * on the compositor. Desktop uses the full speed; tablet is damped; mobile and
 * reduced motion get nothing at all (which avoids the horizontal overflow and
 * jank the spec calls out).
 */
export const Parallax: React.FC<ParallaxProps> = ({
  children,
  className = '',
  layer = 'mid',
  speed,
  tabletFactor = 0.5,
}) => {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery('isDesktop');
  const isTablet = useMediaQuery('isTablet');

  const base = speed ?? PARALLAX[layer];

  useGsapContext(
    () => {
      if (!scope.current) return;
      if (reduced) {
        gsap.set(scope.current, { y: 0 });
        return;
      }

      const factor = isDesktop ? 1 : isTablet ? tabletFactor : 0;
      if (factor === 0) {
        gsap.set(scope.current, { y: 0 });
        return;
      }

      const distance = () => scope.current!.offsetHeight * base * factor;

      gsap.fromTo(
        scope.current,
        { y: -distance() },
        {
          y: distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: REVEAL.start,
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { dependencies: [reduced, isDesktop, isTablet, base, tabletFactor] },
    scope,
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
};
