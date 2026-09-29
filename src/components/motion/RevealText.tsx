import React, { useRef } from 'react';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from '../../lib/motion/gsap';
import { DURATION, EASE, REVEAL } from '../../lib/motion/tokens';
import { splitIntoWords } from '../../lib/motion/utils';

interface RevealTextProps {
  /** Single string — split into words automatically. */
  text?: string;
  /** Explicit lines. Each line gets its own overflow mask. */
  lines?: string[];
  children?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  /** Per-unit stagger. */
  stagger?: number;
  delay?: number;
  duration?: number;
  start?: string;
  /** Use a ScrollTrigger instead of playing on mount. */
  trigger?: boolean;
  id?: string;
}

const UNIT = 'line-mask';

/**
 * Masked text reveal built from real HTML — no canvas, no SVG, so the copy
 * stays selectable, indexable and readable by screen readers.
 *
 * The inter-word spaces live OUTSIDE the overflow mask, otherwise the mask
 * clips the word gap and every word renders on its own line.
 */
export const RevealText: React.FC<RevealTextProps> = ({
  text,
  lines,
  children,
  as: Tag = 'h2',
  className = '',
  stagger = 0.08,
  delay = 0,
  duration = DURATION.slow,
  start = REVEAL.start,
  trigger = true,
  id,
}) => {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGsapContext(
    () => {
      if (!scope.current) return;
      const units = scope.current.querySelectorAll(`.${UNIT} > span`);
      if (units.length === 0) return;

      if (reduced) {
        gsap.set(units, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.fromTo(
        units,
        { yPercent: 108 },
        {
          yPercent: 0,
          duration,
          delay,
          ease: EASE.expo,
          stagger,
          scrollTrigger: trigger
            ? { trigger: scope.current, start, once: true }
            : undefined,
        },
      );
    },
    { dependencies: [reduced, stagger, delay, duration, trigger, start] },
    scope,
  );

  const renderLine = (line: string, key: string) => {
    const words = splitIntoWords(line);
    return (
      <span key={key} className={UNIT} data-line="true">
        <span>
          {words.map((word, i) => (
            <React.Fragment key={`${key}-${i}`}>
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
        </span>
      </span>
    );
  };

  const renderWords = (content: string) => {
    const words = splitIntoWords(content);
    return words.map((word, i) => (
      <React.Fragment key={`w-${i}`}>
        <span className={UNIT}>
          <span>{word}</span>
        </span>
        {i < words.length - 1 ? ' ' : ''}
      </React.Fragment>
    ));
  };

  return (
    <Tag ref={scope as React.RefObject<HTMLDivElement>} className={className} id={id}>
      {lines
        ? lines.map((line, i) => renderLine(line, `line-${i}`))
        : text
          ? renderWords(text)
          : children}
    </Tag>
  );
};

/**
 * Scrubbed word-by-word opacity for the intro statement: each word goes from
 * 20% to 100% opacity as the reader scrolls through the paragraph.
 */
export const ScrubWords: React.FC<{
  text: string;
  className?: string;
  as?: 'p' | 'h2';
  id?: string;
}> = ({ text, className = '', as: Tag = 'p', id }) => {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const words = splitIntoWords(text);

  useGsapContext(
    () => {
      if (!scope.current) return;
      const targets = scope.current.querySelectorAll('.word');
      if (targets.length === 0) return;

      if (reduced) {
        gsap.set(targets, { opacity: 1 });
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0.2 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.4 / targets.length,
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 80%',
            end: 'bottom 55%',
            scrub: true,
          },
        },
      );
    },
    { dependencies: [reduced] },
    scope,
  );

  return (
    <Tag ref={scope as React.RefObject<HTMLDivElement>} className={className} id={id}>
      {words.map((word, i) => (
        <React.Fragment key={`sw-${i}`}>
          <span className="word">{word}</span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </Tag>
  );
};
