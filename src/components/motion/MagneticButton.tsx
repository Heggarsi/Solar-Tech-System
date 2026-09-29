import React, { useRef, type ReactNode } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: 'sun' | 'ghost';
  className?: string;
  /** Show the arrow that shifts 8px on hover. */
  arrow?: boolean;
  ariaLabel?: string;
  target?: string;
  rel?: string;
  /** Only meaningful when rendering a <button>. */
  type?: 'button' | 'submit';
}

/**
 * Primary / secondary CTA.
 *
 * Magnetic pull is capped at 10px and only runs on desktop with a fine
 * pointer (see useMagnetic) — touch and reduced-motion get a plain button.
 * Touch targets are never below 44px (see .btn-sun / .btn-ghost in index.css).
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'sun',
  className = '',
  arrow = true,
  ariaLabel,
  target,
  rel,
  type = 'button',
}) => {
  const ref = useRef<HTMLElement>(null);
  useMagnetic(ref, 0.3, 10);
  const reduced = useReducedMotion();

  const base = variant === 'sun' ? 'btn-sun' : 'btn-ghost';
  const cls = `${base} ${className}`;

  const inner: ReactNode = (
    <>
      <span>{children}</span>
      {arrow ? (
        <span className="btn-arrow" aria-hidden="true">
          →
        </span>
      ) : null}
    </>
  );

  // Reduced motion: drop the magnetic transform entirely.
  if (reduced) {
    return href ? (
      <a
        href={href}
        onClick={onClick}
        className={cls}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
      >
        {inner}
      </a>
    ) : (
      <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
        {inner}
      </button>
    );
  }

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        className={cls}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={cls}
      aria-label={ariaLabel}
    >
      {inner}
    </button>
  );
};
