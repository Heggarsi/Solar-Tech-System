import React, { useCallback, useEffect, useState } from 'react';
import { getLenis } from '../lib/motion/lenis';

/**
 * Fixed bottom-right "back to top" control. Symbol only, no text label.
 *
 * Mounted once in the root layout, so it is present on every route.
 *
 * - Scrolls through Lenis rather than window.scrollTo, so the ride up matches
 *   the rest of the site. Falls back to a native smooth scroll under reduced
 *   motion, where Lenis is never created.
 * - Visibility rides Lenis' own scroll events, not a second scroll listener,
 *   and only flips state when the threshold is crossed, so scrolling itself
 *   costs no React re-renders.
 * - Sits above the navbar (z-[60]) but below the route-change sheet (z-[90])
 *   and the loader (z-[120]), so it can never swallow a transition click.
 */
export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const lenis = getLenis();

    if (!lenis) {
      const onNativeScroll = () => setVisible(window.scrollY > 400);
      onNativeScroll();
      window.addEventListener('scroll', onNativeScroll, { passive: true });
      return () => window.removeEventListener('scroll', onNativeScroll);
    }

    // The unsubscribe function returned by on() removes the exact same ref.
    return lenis.on('scroll', (e: { scroll: number }) => {
      setVisible(e.scroll > 400);
    });
  }, []);

  const scrollUp = useCallback(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Scroll back to top"
      data-cursor="link"
      // Keep the hidden state out of the tab order and the a11y tree.
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-ink-950/70 text-sun-300 backdrop-blur-md transition-[opacity,transform,background-color,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-sun-400/70 hover:bg-sun-400 hover:text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-400/70 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg
        className="h-5 w-5 fill-none stroke-current"
        viewBox="0 0 24 24"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
};
