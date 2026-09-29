import { REDUCED } from './tokens';

export const clamp = (min: number, value: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const lerp = (start: number, end: number, t: number) =>
  start + (end - start) * t;

/** Map v from [inMin,inMax] to [outMin,outMax], clamped. */
export const mapRange = (
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => {
  const t = clamp(0, (v - inMin) / (inMax - inMin || 1), 1);
  return lerp(outMin, outMax, t);
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True for devices with a precise pointer (mouse/trackpad), not touch. */
export const hasFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches;

/** Respects the user's Data Saver setting. */
export const hasDataSaver = () => {
  if (typeof navigator === 'undefined') return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  return Boolean(conn?.saveData);
};

export type DeviceTier = 'low' | 'mid' | 'high';

/**
 * Gates expensive work (WebGL, particles, pinned scenes).
 * Low tier never mounts the 3D scene at all.
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

export const canUseWebGL = (): boolean => {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    );
  } catch {
    return false;
  }
};

/**
 * Split text into words, each wrapped in a non-breaking span-friendly way.
 * We build the spans ourselves rather than using GSAP SplitText so that the
 * markup stays valid, screen-reader friendly and React-owned.
 * Words are separated by a real space text node for accessibility.
 */
export const splitIntoWords = (text: string): string[] =>
  text.split(/\s+/).filter(Boolean);

/** Interpolate between two hex colours. */
export const mixHex = (from: string, to: string, t: number) => {
  const parse = (hex: string) => {
    const h = hex.replace('#', '');
    const full =
      h.length === 3
        ? h
            .split('')
            .map((c) => c + c)
            .join('')
        : h;
    return {
      r: parseInt(full.slice(0, 2), 16),
      g: parseInt(full.slice(2, 4), 16),
      b: parseInt(full.slice(4, 6), 16),
    };
  };
  const a = parse(from);
  const b = parse(to);
  const r = Math.round(lerp(a.r, b.r, t));
  const g = Math.round(lerp(a.g, b.g, t));
  const bl = Math.round(lerp(a.b, b.b, t));
  return `rgb(${r}, ${g}, ${bl})`;
};

/** Motion values to use given the user's reduced-motion preference. */
export const motion = {
  distance: () => (prefersReducedMotion() ? REDUCED.distance : undefined),
  stagger: () => (prefersReducedMotion() ? REDUCED.stagger : undefined),
  fadeOnly: () => REDUCED.fadeOnly,
};
