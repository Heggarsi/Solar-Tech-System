import React, { useRef, type ImgHTMLAttributes } from 'react';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from '../../lib/motion/gsap';
import { DURATION, EASE, REVEAL } from '../../lib/motion/tokens';

interface ImageRevealProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'ref'> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  /** Direction the clip opens from. */
  from?: 'bottom' | 'top' | 'left' | 'right';
  delay?: number;
  duration?: number;
  start?: string;
  /** Inner image scale-down as the clip opens (1.1 -> 1). */
  scale?: number;
  eager?: boolean;
  sizes?: string;
}

/**
 * clip-path reveal. Only clip-path and transform are animated, so this never
 * triggers layout. Explicit width/height are forwarded to reserve space and
 * keep CLS at zero.
 */
export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  from = 'bottom',
  delay = 0,
  duration = DURATION.slow,
  start = REVEAL.start,
  scale = 1.1,
  eager = false,
  sizes,
  width,
  height,
  style,
  ...rest
}) => {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const initialClip: Record<string, string> = {
    bottom: 'inset(0% 0% 100% 0%)',
    top: 'inset(100% 0% 0% 0%)',
    left: 'inset(0% 100% 0% 0%)',
    right: 'inset(0% 0% 0% 100%)',
  };
  const finalClip = 'inset(0% 0% 0% 0%)';

  useGsapContext(
    () => {
      if (!scope.current) return;
      const media = scope.current.querySelector('img');
      if (!media) return;

      if (reduced) {
        gsap.set(scope.current, { clipPath: finalClip });
        gsap.set(media, { scale: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope.current, start, once: true },
      });

      tl.fromTo(
        scope.current,
        { clipPath: initialClip[from] },
        { clipPath: finalClip, duration, delay, ease: EASE.expo },
      ).fromTo(media, { scale }, { scale: 1, duration, delay, ease: EASE.out }, 0);
    },
    { dependencies: [reduced, from, delay, duration, start, scale] },
    scope,
  );

  return (
    <div ref={scope} className={`relative overflow-hidden ${wrapperClassName}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'auto'}
        className={`h-full w-full object-cover ${className}`}
        style={style}
        {...rest}
      />
    </div>
  );
};
