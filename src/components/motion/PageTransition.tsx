import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '../../lib/motion/gsap';
import { EASE, PAGE_TRANSITION } from '../../lib/motion/tokens';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { scrollToTop } from '../../lib/motion/lenis';

/**
 * Route-change transition.
 *
 * React Router unmounts the outgoing route the instant the location changes,
 * so instead of fighting the router to keep it alive, an opaque sun-gradient
 * sheet covers the viewport while the swap happens underneath. The read is
 * the same as a true cross-fade, with none of the double-routing complexity.
 *
 * - Exit  PAGE_TRANSITION.out (0.35s): sheet wipes up from the bottom
 * - Enter PAGE_TRANSITION.in  (0.50s): sheet wipes off the top, content rises
 *
 * The sheet is pointer-events-none, so it can never swallow a click, and the
 * whole sequence is skipped entirely under prefers-reduced-motion.
 */
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const sheetRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Land at the top of the new page and rebuild every trigger position.
    scrollToTop();

    if (reduced) return;

    const sheet = sheetRef.current;
    if (!sheet) return;

    // The freshly mounted page root lives directly inside <main>.
    const page = document.querySelector<HTMLElement>('#main > *');

    const tl = gsap.timeline();

    tl.fromTo(
      sheet,
      { scaleY: 0, transformOrigin: 'bottom center' },
      { scaleY: 1, duration: PAGE_TRANSITION.out, ease: EASE.inOut },
    );

    if (page) {
      tl.set(page, { opacity: 0, y: 24 }).set(sheet, {
        scaleY: 1,
        transformOrigin: 'top center',
      });
    }

    tl.to(sheet, {
      scaleY: 0,
      duration: PAGE_TRANSITION.in,
      ease: EASE.inOut,
    });

    if (page) {
      tl.to(
        page,
        { opacity: 1, y: 0, duration: 0.5, ease: EASE.out },
        '-=0.28',
      );
    }

    return () => {
      tl.kill();
      // Guarantee the next page is never left invisible if we unmount mid-flight.
      if (page) gsap.set(page, { clearProps: 'opacity,transform' });
    };
  }, [location.pathname, reduced]);

  return (
    <>
      <div
        ref={sheetRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] origin-bottom"
        style={{
          transform: 'scaleY(0)',
          background:
            'linear-gradient(to top, #FF9F1C 0%, #FF6B35 55%, #FFD98A 100%)',
        }}
      />
      {children}
    </>
  );
};
