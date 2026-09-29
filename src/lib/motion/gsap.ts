import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CustomEase } from 'gsap/CustomEase';

/**
 * Register every GSAP plugin exactly once for the whole app.
 * Import gsap/ScrollTrigger/useGSAP from here — never from 'gsap' directly —
 * so plugins are guaranteed to be registered before first use.
 */

let registered = false;

if (typeof window !== 'undefined' && !registered) {
  gsap.registerPlugin(ScrollTrigger, useGSAP, CustomEase);
  gsap.ticker.lagSmoothing(0);
  registered = true;
}

export { gsap, ScrollTrigger, useGSAP, CustomEase };
export default gsap;
