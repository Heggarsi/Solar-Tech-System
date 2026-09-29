import { useEffect } from 'react';
import type React from 'react';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

/**
 * Measures the real header (utility strip + nav row) and publishes the result
 * as --header-height so the hero can size itself without sliding under it.
 *
 * The header animates 88px -> 64px on scroll, so a naive measurement would
 * shrink the hero mid-scroll and reflow the layout. We therefore only ever
 * publish the LARGEST height seen: the hero always reserves the space the
 * header occupies at rest.
 *
 * This is a one-way read. The hero never mutates the header, so it cannot
 * fight the Navbar's own scroll behaviour.
 */
export const useHeaderHeight = (): void => {
  useGsapContext(
    () => {
      const header = document.querySelector<HTMLElement>('[data-site-header]');
      const root = document.documentElement;
      if (!header) return;

      const previous = root.style.getPropertyValue('--header-height');
      let max = 0;

      const measure = () => {
        const h = header.getBoundingClientRect().height;
        if (h <= 0) return;
        max = Math.max(max, h);
        const px = `${Math.round(max)}px`;
        if (root.style.getPropertyValue('--header-height') !== px) {
          root.style.setProperty('--header-height', px);
        }
      };

      measure();

      const ro = new ResizeObserver(measure);
      ro.observe(header);
      window.addEventListener('resize', measure);

      return () => {
        ro.disconnect();
        window.removeEventListener('resize', measure);
        if (previous) root.style.setProperty('--header-height', previous);
        else root.style.removeProperty('--header-height');
      };
    },
    { dependencies: [] },
  );
};

/** Shared fine-pointer + motion test for hero-only effects. */
export const useHeroFx = () => {
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery('isDesktop');
  const fine = useMediaQuery('isFinePointer');
  return {
    reduced,
    /** Desktop-only scroll choreography. */
    canScrub: !reduced && isDesktop,
    /** Desktop-only pointer interactions (tilt, magnetic). */
    canHover: !reduced && isDesktop && fine,
  };
};

/** Interpolates the pointer toward the element centre, GSAP-flavoured. */
export const followPointer = (
  el: HTMLElement,
  opts: { max: number; onMove: (dx: number, dy: number) => void; enabled: boolean },
) => {
  if (!opts.enabled) return () => {};

  const onMove = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    opts.onMove(
      Math.max(-opts.max, Math.min(opts.max, dx * 0.06)),
      Math.max(-opts.max, Math.min(opts.max, dy * 0.06)),
    );
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  return () => window.removeEventListener('pointermove', onMove);
};

/**
 * Magnetic pull for the hero CTAs, capped at 8px.
 *
 * MagneticButton's shared default is 10px. Rather than change a component
 * every other page renders, the hero runs its own clamp so the two buttons
 * here stay within the 8px budget without touching global behaviour.
 */
export const useMagneticCap = (ref: React.RefObject<HTMLElement | null>, max = 8) => {
  const isDesktop = useMediaQuery('isDesktop');
  const isFinePointer = useMediaQuery('isFinePointer');
  const reduced = useReducedMotion();
  const enabled = isDesktop && isFinePointer && !reduced;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const clamp = (v: number) => Math.max(-max, Math.min(max, v));

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate3d(${clamp((e.clientX - (r.left + r.width / 2)) * 0.3)}px, ${clamp(
        (e.clientY - (r.top + r.height / 2)) * 0.3,
      )}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = 'translate3d(0, 0, 0)';
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.style.transform = '';
    };
  }, [ref, enabled, max]);

  return enabled;
};
