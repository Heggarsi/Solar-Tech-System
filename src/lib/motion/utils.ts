import { REDUCED } from './tokens';

export const clamp = (min: number, value: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Respects the user's Data Saver setting. */
const hasDataSaver = () => {
  if (typeof navigator === 'undefined') return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  return Boolean(conn?.saveData);
};

export type DeviceTier = 'low' | 'mid' | 'high';

/**
 * Gates expensive work (particles, pinned scenes, long scroll choreography).
 */
export const getDeviceTier = (): DeviceTier => {
  if (typeof window === 'undefined') return 'mid';
  if (prefersReducedMotion() || hasDataSaver()) return 'low';

  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const width = window.innerWidth;

  if (cores >= 8 && mem >= 8 && width >= 1024) return 'high';
  if (cores >= 4 && mem >= 4) return 'mid';
  return 'low';
};

/**
 * Split text into words, each wrapped in a non-breaking span-friendly way.
 * We build the spans ourselves rather than using GSAP SplitText so that the
 * markup stays valid, screen-reader friendly and React-owned.
 * Words are separated by a real space text node for accessibility.
 */
export const splitIntoWords = (text: string): string[] =>
  text.split(/\s+/).filter(Boolean);

/** Motion values to use given the user's reduced-motion preference. */
export const motion = {
  distance: () => (prefersReducedMotion() ? REDUCED.distance : undefined),
  stagger: () => (prefersReducedMotion() ? REDUCED.stagger : undefined),
  fadeOnly: () => REDUCED.fadeOnly,
};
