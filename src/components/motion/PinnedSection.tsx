import React, { useRef, type ReactNode } from 'react';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { gsap } from '../../lib/motion/gsap';

interface PinnedSectionProps {
  children: ReactNode;
  /** How many viewport heights the section is pinned for. */
  length?: number;
  className?: string;
  /** Pin on mobile too. Off by default — long pins on phones are hostile. */
  pinOnMobile?: boolean;
  id?: string;
  start?: string;
  end?: string;
}

/**
 * Pins its children for `length` viewport heights and scrubs an optional
 * timeline onto the pinned content.
 *
 * Mobile and reduced-motion skip pinning entirely: the content is simply
 * stacked and visible, which is what the accessibility rules require.
 */
export const PinnedSection: React.FC<PinnedSectionProps> = ({
  children,
  length = 2,
  className = '',
  pinOnMobile = false,
  id,
  start = 'top top',
  end,
}) => {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery('isDesktop');
  const isTablet = useMediaQuery('isTablet');
  const shouldPin = !reduced && !!(isDesktop || (isTablet && pinOnMobile));

  useGsapContext(
    () => {
      if (!shouldPin || !scope.current) return;

      const st = gsap.to(scope.current, {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: scope.current,
          start,
          end: end ?? `+=${window.innerHeight * length}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        st.scrollTrigger?.kill();
        st.kill();
      };
    },
    { dependencies: [shouldPin, length, start, end] },
    scope,
  );

  return (
    <div ref={scope} className={className} id={id}>
      {children}
    </div>
  );
};
