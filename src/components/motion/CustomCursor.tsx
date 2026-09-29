import React, { useEffect, useRef } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from '../../lib/motion/gsap';

type CursorMode = 'default' | 'link' | 'view' | 'drag';

/**
 * 8px dot + 36px lagging ring. Desktop with a fine pointer only.
 *
 * Interaction is declarative: any element opts in with a data attribute —
 *   data-cursor="link" | "view" | "drag"
 * so this component never needs to know about routes or card types.
 *
 * The native cursor is hidden via the .has-custom-cursor body class, which
 * explicitly opts real form controls back in (see index.css).
 */
export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const isDesktop = useMediaQuery('isDesktop');
  const isFinePointer = useMediaQuery('isFinePointer');
  const reduced = useReducedMotion();

  const enabled = isDesktop && isFinePointer && !reduced;

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.body.classList.add('has-custom-cursor');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let visible = false;

    const setMode = (mode: CursorMode) => {
      const isView = mode === 'view';
      const isDrag = mode === 'drag';
      const text = isView ? 'View' : isDrag ? 'Drag' : '';

      label.textContent = text;
      gsap.to(ring, {
        scale: isView || isDrag ? 1.55 : mode === 'link' ? 1.35 : 1,
        backgroundColor:
          isView || isDrag ? 'rgba(255,194,77,0.16)' : 'rgba(255,194,77,0)',
        duration: 0.3,
        ease: 'power3.out',
      });
      gsap.to(dot, { scale: isView || isDrag ? 0.5 : 1, duration: 0.3 });
      gsap.to(label, { opacity: text ? 1 : 0, duration: 0.2 });
    };

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;

      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      }

      const target = e.target as HTMLElement | null;
      const tagged = target?.closest<HTMLElement>('[data-cursor]');
      setMode((tagged?.dataset.cursor as CursorMode) ?? 'default');
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const onDown = () => gsap.to(ring, { scale: 0.85, duration: 0.15 });
    const onUp = () => setMode('default');

    // Ring lags the dot via the shared GSAP ticker — one rAF for both.
    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      gsap.set(dot, { x: pos.x, y: pos.y });
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
    };
    gsap.ticker.add(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span
          ref={labelRef}
          className="mono-label absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sun-300 opacity-0"
        />
      </div>
    </>
  );
};
