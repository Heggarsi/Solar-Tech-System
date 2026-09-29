import React, { useRef, type ReactNode } from 'react';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { gsap } from '../../lib/motion/gsap';

interface HorizontalScrollProps {
  children: ReactNode;
  /** Extra vh of scroll distance past the track's own width. */
  length?: number;
  className?: string;
  trackClassName?: string;
  id?: string;
}

/**
 * Pinned horizontal track on desktop; native scroll-snap carousel everywhere
 * else. The mobile path carries zero JavaScript animation, which is what
 * prevents the horizontal overflow and jank the spec warns about.
 *
 * Pinning requires that no ancestor of the pinned wrapper is transformed. If
 * one is, ScrollTrigger silently switches pinType from "fixed" to "transform"
 * and the pin lands in the wrong place. See PageTransition for how that is
 * guarded against.
 */
export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  length = 0.5,
  className = '',
  trackClassName = 'gap-6 px-6 lg:px-[max(3rem,calc((100vw-80rem)/2))]',
  id,
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
      // clientWidth excludes the scrollbar; innerWidth does not, which left the
      // last card short by the scrollbar width on every platform.
      const viewportWidth = () => document.documentElement.clientWidth;
      const distance = () => Math.max(0, track.scrollWidth - viewportWidth());

      // Pin the outer wrapper, translate the inner track.
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end: () => `+=${distance() + window.innerHeight * length}`,
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
      {/* No h-full: the wrapper is auto-height, so 100% would resolve to auto
          anyway. Height comes from the cards. */}
      <div ref={trackRef} className={`flex ${trackClassName}`}>
        {children}
      </div>
    </div>
  );
};
