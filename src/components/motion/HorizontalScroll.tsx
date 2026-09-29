import React, { useRef, type ReactNode } from 'react';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { gsap } from '../../lib/motion/gsap';

interface HorizontalScrollProps {
  children: ReactNode;
  /** Extra vh of scroll distance mapped onto the track. */
  length?: number;
  className?: string;
  trackClassName?: string;
  id?: string;
  /** Skip pinning (e.g. on tablet) and use a native swipe scroller instead. */
  allowNativeOnTablet?: boolean;
}

/**
 * Pinned horizontal track on desktop; native scroll-snap carousel everywhere
 * else. The mobile path carries zero JavaScript animation, which is what
 * prevents the horizontal overflow and jank the spec warns about.
 */
export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  length = 2,
  className = '',
  trackClassName = 'gap-6 px-6 lg:px-[max(3rem,calc((100vw-80rem)/2))]',
  id,
  allowNativeOnTablet = true,
}) => {
  const scope = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery('isDesktop');
  const shouldPin = !reduced && isDesktop;

  useGsapContext(
    () => {
      if (!shouldPin || !scope.current || !trackRef.current) return;

      const track = trackRef.current;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      // Pin the outer wrapper, translate the inner track.
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end: () => `+=${distance() + window.innerHeight * 0.5}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { x: 0 });
      };
    },
    { dependencies: [shouldPin, length] },
    scope,
  );

  if (!shouldPin) {
    return (
      <div ref={scope} className={className} id={id}>
        <div ref={trackRef} className={`snap-track ${trackClassName}`}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={scope} className={`overflow-hidden ${className}`} id={id}>
      <div ref={trackRef} className={`flex h-full ${trackClassName}`}>
        {children}
      </div>
    </div>
  );
};
