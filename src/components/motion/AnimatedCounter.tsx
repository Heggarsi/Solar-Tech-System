import React, { useRef, type ReactNode } from 'react';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useInView } from '../../hooks/useInView';
import { gsap } from '../../lib/motion/gsap';
import { EASE } from '../../lib/motion/tokens';

interface AnimatedCounterProps {
  value: number;
  /** Rendered verbatim instead of animating (e.g. "Pan-Karnataka"). */
  display?: string;
  prefix?: string;
  suffix?: string;
  label?: string;
  detail?: string;
  className?: string;
  duration?: number;
  /** Show the hairline progress ring. */
  ring?: boolean;
  id?: string;
}

const easeOutPower2 = (t: number) => 1 - Math.pow(1 - t, 2);

/**
 * Counts up once, on first entry into the viewport.
 *
 * Uses useInView (IntersectionObserver) rather than a ScrollTrigger so the
 * number still counts up when the motion system is disabled — the counter is
 * meaningful content, not decoration.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  display,
  prefix = '',
  suffix = '',
  label,
  detail,
  className = '',
  duration = 1.6,
  ring = true,
  id,
}) => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const numRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const reduced = useReducedMotion();

  useGsapContext(
    () => {
      if (!inView || display != null) return;

      const write = (n: number) => {
        if (numRef.current) {
          numRef.current.textContent = Math.round(n).toLocaleString('en-IN');
        }
        if (ringRef.current) {
          // 2πr for r=52 => 326.7
          const circumference = 2 * Math.PI * 52;
          ringRef.current.style.strokeDashoffset = String(
            circumference * (1 - n / (value || 1)),
          );
        }
      };

      if (reduced) {
        write(value);
        return;
      }

      const state = { n: 0 };
      write(0);
      gsap.to(state, {
        n: value,
        duration,
        ease: EASE.soft,
        onUpdate: () => write(state.n),
      });
    },
    { dependencies: [inView, value, duration, reduced, display] },
  );

  const ringEl = (
    <svg
      viewBox="0 0 120 120"
      className="absolute inset-0 -z-10 h-full w-full text-sun-400/25"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 6"
        opacity="0.5"
      />
      <circle
        ref={ringRef}
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={2 * Math.PI * 52}
        transform="rotate(-90 60 60)"
        style={{ strokeDashoffset: display != null ? 0 : 2 * Math.PI * 52 }}
      />
    </svg>
  );

  return (
    <div ref={ref} className={`relative ${className}`} id={id}>
      {ring ? ringEl : null}
      <div className="font-display text-4xl font-bold text-white sm:text-5xl tabular-nums">
        {display != null ? (
          <span>{display}</span>
        ) : (
          <>
            {prefix}
            <span ref={numRef}>0</span>
            {suffix}
          </>
        )}
      </div>
      {label ? (
        <div className="mono-label mt-2 text-sun-300">{label}</div>
      ) : null}
      {detail ? (
        <p className="mt-3 text-sm leading-relaxed text-dawn-200/70">{detail}</p>
      ) : null}
    </div>
  );
};

/** Small inline variant for stats embedded in prose. */
export const InlineCounter: React.FC<{
  value: number;
  suffix?: string;
  className?: string;
}> = ({ value, suffix = '', className = '' }) => {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const numRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useGsapContext(
    () => {
      if (!inView) return;
      if (reduced) {
        if (numRef.current) numRef.current.textContent = String(value);
        return;
      }
      const state = { n: 0 };
      gsap.to(state, {
        n: value,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => {
          if (numRef.current) {
            numRef.current.textContent = String(Math.round(state.n));
          }
        },
      });
    },
    { dependencies: [inView, value, reduced] },
  );

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span ref={numRef}>0</span>
      {suffix}
    </span>
  );
};

export { easeOutPower2 };
export type { ReactNode };
