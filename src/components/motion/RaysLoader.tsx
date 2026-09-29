import React, { useEffect, useState } from 'react';
import { gsap } from '../../lib/motion/gsap';
import { EASE } from '../../lib/motion/tokens';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const SESSION_KEY = 'sts_loader_seen';

interface RaysLoaderProps {
  /** Only show if first paint took longer than this (ms). */
  threshold?: number;
  onDone?: () => void;
}

/**
 * Sun-ray loader. Per the spec this only appears when first paint is actually
 * slow (>600ms by default), is skipped on repeat visits within the session,
 * and is skipped entirely for reduced motion.
 */
export const RaysLoader: React.FC<RaysLoaderProps> = ({
  threshold = 600,
  onDone,
}) => {
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (reduced) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      seen = false;
    }
    if (seen) return;

    const elapsed = performance.now();
    if (elapsed <= threshold) {
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* private mode — just skip marking */
      }
      return;
    }

    setActive(true);
    document.body.classList.add('scroll-locked');

    // Backstop. The overlay below is opaque and covers the viewport, and
    // scroll-locked sets `overflow: hidden; touch-action: none` on <body>. If
    // the timeline is ever killed before onComplete, both stay put and the user
    // gets a frozen page behind an opaque sheet. Nothing here should ever take
    // this long, so a generous ceiling is a safe way to guarantee release.
    const bail = window.setTimeout(() => {
      document.body.classList.remove('scroll-locked');
      setActive(false);
    }, 4000);

    return () => {
      window.clearTimeout(bail);
      document.body.classList.remove('scroll-locked');
    };
  }, [threshold, reduced]);

  useEffect(() => {
    if (!active) return;

    const ray = document.querySelector('.loader-ray');
    const counter = document.querySelector('[data-loader-count]');

    const state = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setActive(false);
        try {
          sessionStorage.setItem(SESSION_KEY, '1');
        } catch {
          /* ignore */
        }
        document.body.classList.remove('scroll-locked');
        onDone?.();
      },
      // A killed timeline never fires onComplete, so release the scroll lock
      // here too rather than waiting for the backstop timeout.
      onInterrupt: () => {
        setActive(false);
        document.body.classList.remove('scroll-locked');
      },
    });

    if (ray) {
      tl.fromTo(ray, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: EASE.inOut });
    }
    if (counter) {
      tl.to(
        state,
        {
          n: 100,
          duration: 0.85,
          ease: 'power1.inOut',
          onUpdate: () => {
            counter.textContent = String(Math.round(state.n));
          },
        },
        0,
      );
    }
    tl.to({}, { duration: 0.2 }).to(
      '[data-loader-root]',
      { opacity: 0, duration: 0.35, ease: EASE.out },
      '+=0.1',
    );

    return () => {
      tl.kill();
    };
  }, [active, onDone]);

  if (!active) return null;

  return (
    <div
      data-loader-root
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-6 bg-ink-950"
      role="status"
      aria-live="polite"
    >
      <div className="h-2 w-64 max-w-[70vw] overflow-hidden">
        <div className="loader-ray w-full" />
      </div>
      <div className="mono-label text-sun-300">
        <span data-loader-count>0</span>
      </div>
    </div>
  );
};
