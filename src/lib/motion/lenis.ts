import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

/**
 * One Lenis instance for the whole app, driven by the GSAP ticker.
 *
 *   lenis.on('scroll', ScrollTrigger.update)
 *   gsap.ticker.add(t => lenis.raf(t * 1000))
 *   gsap.ticker.lagSmoothing(0)
 *
 * Created once at the root layout (outside <Routes>) so smooth scrolling
 * persists across navigation. Fully skipped for prefers-reduced-motion.
 */

let instance: Lenis | null = null;
let rafHandler: ((time: number) => void) | null = null;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const getLenis = (): Lenis | null => instance;

export const initLenis = (): Lenis | null => {
  if (typeof window === 'undefined') return null;
  if (instance) return instance;
  if (prefersReducedMotion()) return null;

  instance = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Native touch scrolling on mobile — virtualised wheel scrolling fights
    // momentum on iOS and breaks scroll-snap on the horizontal product track.
    syncTouch: false,
    touchMultiplier: 1.4,
    wheelMultiplier: 1,
  });

  instance.on('scroll', ScrollTrigger.update);

  rafHandler = (time: number) => {
    instance?.raf(time * 1000);
  };
  gsap.ticker.add(rafHandler);
  gsap.ticker.lagSmoothing(0);

  return instance;
};

export const destroyLenis = () => {
  if (rafHandler) {
    gsap.ticker.remove(rafHandler);
    rafHandler = null;
  }
  instance?.destroy();
  instance = null;
};

/** Jump to top without animation — used on route change. */
export const scrollToTop = () => {
  if (instance) {
    instance.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
  ScrollTrigger.refresh();
};
