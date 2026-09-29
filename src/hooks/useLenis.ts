import { useEffect, useState } from 'react';
import { initLenis, destroyLenis } from '../lib/motion/lenis';
import type Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';

/**
 * Mounts the single Lenis instance for the app lifetime.
 * Mount this once, in the root layout, OUTSIDE <Routes>.
 *
 * Returns the instance (or null under reduced motion) plus a live
 * scroll-progress value in 0..1.
 */
export const useLenis = () => {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) {
      destroyLenis();
      setLenis(null);
      return;
    }

    const instance = initLenis();
    setLenis(instance);

    const onScroll = (e: { progress: number }) => setProgress(e.progress);
    instance?.on('scroll', onScroll);

    return () => {
      instance?.off('scroll', onScroll);
      destroyLenis();
    };
  }, [reduced]);

  return { lenis, progress };
};
