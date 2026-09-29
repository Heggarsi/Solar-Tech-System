import { useEffect, useState } from 'react';
import { BREAKPOINTS } from '../lib/motion/tokens';

export type MediaQueryName = 'isDesktop' | 'isTablet' | 'isMobile' | 'isFinePointer';

const QUERIES: Record<MediaQueryName, string> = {
  isDesktop: `(min-width: ${BREAKPOINTS.lg}px)`,
  isTablet: `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`,
  isMobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
  isFinePointer: '(pointer: fine)',
};

const initial = (name: MediaQueryName): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(QUERIES[name]).matches;
};

/** Live media query with proper cleanup. */
export const useMediaQuery = (name: MediaQueryName): boolean => {
  const [matches, setMatches] = useState(() => initial(name));

  useEffect(() => {
    const mq = window.matchMedia(QUERIES[name]);
    setMatches(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [name]);

  return matches;
};
