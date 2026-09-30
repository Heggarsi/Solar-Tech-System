/**
 * Single source of truth for every motion constant in the project.
 * No magic numbers elsewhere — import from here.
 */

export const DURATION = {
  fast: 0.25,
  base: 0.6,
  slow: 1.0,
  hero: 1.4,
} as const;

export const EASE = {
  out: 'power3.out',
  inOut: 'power3.inOut',
  expo: 'expo.out',
  soft: 'power2.out',
} as const;

export const REVEAL = {
  distance: 48,
  stagger: 0.08,
  start: 'top 85%',
} as const;

export const PARALLAX = {
  bg: 0.15,
  mid: 0.3,
  fg: 0.5,
} as const;

export const PAGE_TRANSITION = {
  out: 0.35,
  in: 0.5,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

/** Reduced-motion fallbacks — shorter, opacity-only. */
export const REDUCED = {
  distance: 0,
  stagger: 0,
  fadeOnly: 0.2,
  scrubDisabled: true,
} as const;

/** Master scrub for the scroll-linked sun. */
export const SUN = {
  scrub: 0.6,
  desktopScale: 1,
  innerScale: 0.55,
  innerOpacity: 0.55,
} as const;

/**
 * "One day of sunlight" — the sky gradient is a scrubbed timeline of stops.
 * Each phase is a full-viewport gradient the page background tweens through.
 * Colours are duplicated in index.css as --ink / --sun / --sky tokens.
 */
export type SkyPhase = {
  /** 0..1 position along the master scroll timeline */
  at: number;
  /** Top and bottom gradient stops for this phase */
  top: string;
  bottom: string;
  /** Sun disc colour and glow strength at this phase */
  sun: string;
  glow: number;
  label: string;
};

export const SKY_PHASES: SkyPhase[] = [
  {
    at: 0,
    top: '#050B14',
    bottom: '#0F2238',
    sun: '#FFC24D',
    glow: 0.35,
    label: 'Pre-dawn',
  },
  {
    at: 0.18,
    top: '#1B2A44',
    bottom: '#FF6B35',
    sun: '#FF9F1C',
    glow: 0.7,
    label: 'Sunrise',
  },
  {
    at: 0.42,
    top: '#6FB7FF',
    bottom: '#CFE8FF',
    sun: '#FFD98A',
    glow: 0.95,
    label: 'Morning',
  },
  {
    at: 0.66,
    top: '#CFE8FF',
    bottom: '#FF9F1C',
    sun: '#FFC24D',
    glow: 1,
    label: 'Golden hour',
  },
  {
    at: 0.84,
    top: '#0F2238',
    bottom: '#050B14',
    sun: '#FF6B35',
    glow: 0.5,
    label: 'Dusk',
  },
  {
    at: 1,
    top: '#050B14',
    bottom: '#0A1524',
    sun: '#FF6B35',
    glow: 0.6,
    label: 'Night',
  },
];

/** Breakpoint helpers (px) */
export const isDesktop = () =>
  typeof window !== 'undefined' && window.innerWidth >= BREAKPOINTS.lg;

export const isTablet = () =>
  typeof window !== 'undefined' &&
  window.innerWidth >= BREAKPOINTS.md &&
  window.innerWidth < BREAKPOINTS.lg;

export const isMobile = () =>
  typeof window !== 'undefined' && window.innerWidth < BREAKPOINTS.md;
