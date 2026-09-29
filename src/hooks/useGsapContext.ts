import { useRef, type RefObject } from 'react';
import { useGSAP } from '../lib/motion/gsap';

/**
 * Thin wrapper around GSAP's useGSAP so every animation in the app is
 * created inside a gsap.context() and reverted on unmount.
 *
 * This is what guarantees rule 7: no leaked ScrollTriggers when navigating
 * between pages, and no double-creation under React StrictMode.
 */
export const useGsapContext = (
  callback: Parameters<typeof useGSAP>[0],
  config: Omit<NonNullable<Parameters<typeof useGSAP>[1]>, 'scope'> = {},
  scope?: RefObject<HTMLElement | null>,
) => {
  const fallbackScope = useRef<HTMLElement | null>(null);

  return useGSAP(callback, {
    revertOnUpdate: true,
    ...config,
    scope: (scope ?? fallbackScope) as RefObject<HTMLElement>,
  });
};
