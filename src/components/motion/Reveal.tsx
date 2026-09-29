import React, { useRef, type ElementType, type ReactNode } from 'react';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from '../../lib/motion/gsap';
import { DURATION, EASE, REDUCED, REVEAL } from '../../lib/motion/tokens';

interface RevealProps {
  children: ReactNode;
  /** Element or component to render. Defaults to a div. */
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Travel distance in px. Ignored under reduced motion. */
  y?: number;
  /** Stagger direct children instead of the element itself. */
  stagger?: number;
  /** ScrollTrigger start string. */
  start?: string;
  duration?: number;
  /** Animate opacity only (no translate). */
  fadeOnly?: boolean;
  style?: React.CSSProperties;
  id?: string;
}

/**
 * Fade-up reveal on scroll. The single most reused primitive in the system.
 *
 * Under prefers-reduced-motion the element is rendered in its final state and
 * no ScrollTrigger is created at all, so nothing animates and nothing leaks.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  as = 'div',
  className = '',
  delay = 0,
  y = REVEAL.distance,
  stagger,
  start = REVEAL.start,
  duration = DURATION.base,
  fadeOnly = false,
  style,
  id,
}) => {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGsapContext(
    () => {
      const targets =
        stagger != null && scope.current
          ? Array.from(scope.current.children)
          : scope.current;

      if (!targets || (Array.isArray(targets) && targets.length === 0)) return;

      if (reduced) {
        gsap.set(targets, { clearProps: 'all', opacity: 1, y: 0 });
        return;
      }

      const distance = fadeOnly ? 0 : y;

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: distance },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: EASE.out,
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: scope.current,
            start,
            once: true,
          },
          // Only transform + opacity are animated (plus will-change during play)
          force3D: true,
        },
      );
    },
    { dependencies: [reduced, y, stagger, delay, duration, fadeOnly, start] },
    scope,
  );

  // `as` accepts any tag, so the prop bag is widened here and built through
  // createElement. This is the standard escape hatch for polymorphic JSX in
  // React's types — the union of every possible tag has no common prop type.
  const Tag = as as ElementType<Record<string, unknown>>;

  return React.createElement(
    Tag,
    { ref: scope, className, style, id },
    children,
  );
};

/**
 * Reduced-motion aware variant that just fades — used where a translate would
 * disorient (large paragraphs, form panels).
 */
export const RevealFade: React.FC<Omit<RevealProps, 'y' | 'fadeOnly'>> = (
  props,
) => <Reveal {...props} fadeOnly duration={REDUCED.fadeOnly * 3} />;
