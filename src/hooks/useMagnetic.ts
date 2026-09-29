import { useEffect, useRef, type RefObject } from 'react';
import { useMediaQuery } from './useMediaQuery';
import { useReducedMotion } from './useReducedMotion';
import { getDeviceTier, type DeviceTier } from '../lib/motion/utils';

export { getDeviceTier };
export type { DeviceTier };

/** Magnetic hover for buttons. Desktop + fine pointer only. */
export const useMagnetic = (
  ref: RefObject<HTMLElement | null>,
  strength = 0.32,
  max = 10,
) => {
  const isDesktop = useMediaQuery('isDesktop');
  const isFinePointer = useMediaQuery('isFinePointer');
  const reduced = useReducedMotion();
  const enabled = isDesktop && isFinePointer && !reduced;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const x = Math.max(-max, Math.min(max, relX * strength));
      const y = Math.max(-max, Math.min(max, relY * strength));
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
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
  }, [ref, enabled, strength, max]);

  return enabled;
};

/** Device tier, stable for the session (3D gating). */
export const useDeviceTier = (): DeviceTier => {
  const reduced = useReducedMotion();
  const ref = useRef<DeviceTier | null>(null);
  if (ref.current === null) ref.current = getDeviceTier();
  return reduced ? 'low' : ref.current;
};
