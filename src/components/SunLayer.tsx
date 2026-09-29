import React, { useRef } from 'react';
import { useGsapContext } from '../hooks/useGsapContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { gsap } from '../lib/motion/gsap';
import { SKY_PHASES, SUN, type SkyPhase } from '../lib/motion/tokens';

/**
 * Sun travel across the viewport, keyed to scroll progress.
 * Rises bottom-left, arcs across the upper area, sets bottom-right.
 */
const SUN_PATH: { at: number; x: number; y: number }[] = [
  { at: 0, x: 0.16, y: 0.78 },
  { at: 0.18, x: 0.26, y: 0.6 },
  { at: 0.42, x: 0.5, y: 0.2 },
  { at: 0.66, x: 0.76, y: 0.28 },
  { at: 0.84, x: 0.87, y: 0.6 },
  { at: 1, x: 0.9, y: 0.76 },
];

interface SunLayerProps {
  /** 'home' is large and prominent; 'inner' is a calmer, smaller version. */
  variant?: 'home' | 'inner';
  /** Skip the ScrollTrigger entirely and render the static default. */
  static?: boolean;
}

/**
 * THE signature global system.
 *
 * A single fixed layer behind the whole document holds the sky gradient and
 * the sun. One master ScrollTrigger on <html> (scrub 0.6) tweens a plain
 * proxy object; its onUpdate writes CSS custom properties, which the styles
 * in index.css consume. Nothing else in the app is allowed to own these
 * properties, so there is exactly one source of truth for the "time of day".
 *
 * Because the sun and sky are plain CSS, the whole effect still renders
 * correctly with JavaScript disabled and under reduced motion (it simply
 * stays at its pre-dawn default).
 */
export const SunLayer: React.FC<SunLayerProps> = ({
  variant = 'home',
  static: isStatic = false,
}) => {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const scaleBase = variant === 'home' ? SUN.desktopScale : SUN.innerScale;
  const opacityBase = variant === 'home' ? 1 : SUN.innerOpacity;

  useGsapContext(
    () => {
      if (reduced || isStatic) return;

      const root = document.documentElement;
      const first = SKY_PHASES[0];
      const last = SKY_PHASES[SKY_PHASES.length - 1];
      const firstPath = SUN_PATH[0];

      const state = {
        top: first.top,
        bottom: first.bottom,
        disc: first.sun,
        glow: first.glow * opacityBase,
        x: firstPath.x,
        y: firstPath.y,
        scale: scaleBase,
      };

      const write = () => {
        root.style.setProperty('--sky-top', state.top);
        root.style.setProperty('--sky-bottom', state.bottom);
        root.style.setProperty('--sun-disc', state.disc);
        root.style.setProperty('--sun-glow-strength', String(state.glow));
        root.style.setProperty('--sun-x', String(state.x));
        root.style.setProperty('--sun-y', String(state.y));
        root.style.setProperty('--sun-scale', String(state.scale));
      };

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: SUN.scrub,
          invalidateOnRefresh: true,
          onUpdate: write,
        },
        onComplete: write,
      });

      // Sky gradient + light temperature.
      SKY_PHASES.forEach((phase: SkyPhase, i) => {
        if (i === 0) return;
        const prev = SKY_PHASES[i - 1];
        tl.to(
          state,
          {
            top: phase.top,
            bottom: phase.bottom,
            disc: phase.sun,
            glow: phase.glow * opacityBase,
            duration: phase.at - prev.at,
          },
          phase.at,
        );
      });

      // Sun position along its arc.
      SUN_PATH.forEach((point, i) => {
        if (i === 0) return;
        const prev = SUN_PATH[i - 1];
        tl.to(
          state,
          {
            x: point.x,
            y: point.y,
            duration: point.at - prev.at,
          },
          point.at,
        );
      });

      // Footer beat: the sun "sets" into a warm horizon.
      tl.to(state, { scale: scaleBase * 1.15, duration: 0.16 }, 0.84);
      tl.to(state, { glow: last.glow * opacityBase, duration: 0.16 }, 0.84);

      write();

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        // Leave the document on its night default rather than a mid-scrub value.
        root.style.removeProperty('--sky-top');
        root.style.removeProperty('--sky-bottom');
        root.style.removeProperty('--sun-disc');
        root.style.removeProperty('--sun-glow-strength');
        root.style.removeProperty('--sun-x');
        root.style.removeProperty('--sun-y');
        root.style.removeProperty('--sun-scale');
      };
    },
    { dependencies: [reduced, isStatic, variant, scaleBase, opacityBase] },
    scope,
  );

  return (
    <div ref={scope} aria-hidden="true">
      <div className="sky-layer" />
      <div className="sun-layer">
        <div className="sun-rays" />
        <div className="sun-orb" />
      </div>
    </div>
  );
};
