import React, { type ReactNode } from 'react';
import { Reveal, RevealFade } from './motion/Reveal';
import { RevealText } from './motion/RevealText';

export interface Crumb {
  label: string;
  /** Omit for the current page. */
  path?: string;
}

interface PageHeroProps {
  /** e.g. "Chapter 02 — The Studio" */
  chapter: string;
  crumbs: Crumb[];
  /** One entry per masked line. */
  titleLines: string[];
  /** Trailing phrase of the last line to tint with the sun colour. */
  accent?: string;
  lead?: string;
  onNavigate: (path: string) => void;
  /** Slot for page-specific controls that belong inside the hero. */
  children?: ReactNode;
}

/**
 * Shared inner-page hero.
 *
 * Every inner page opens with the same shape — a chapter number, a breadcrumb,
 * a masked title and a lead paragraph — so they read as chapters of one day
 * rather than five unrelated pages. Only the copy changes between pages.
 */
export const PageHero: React.FC<PageHeroProps> = ({
  chapter,
  crumbs,
  titleLines,
  accent,
  lead,
  onNavigate,
  children,
}) => {
  const renderTitle = () =>
    titleLines.map((line, i) => {
      const isLast = i === titleLines.length - 1;
      let plain = line;
      let accented: string | null = null;

      if (isLast && accent && line.includes(accent)) {
        const idx = line.indexOf(accent);
        plain = line.slice(0, idx);
        accented = line.slice(idx);
      }

      return (
        <span key={`l-${i}`} className="line-mask" data-line="true">
          <span>
            {plain}
            {accented ? <span className="text-sun-300">{accented}</span> : null}
          </span>
        </span>
      );
    });

  return (
    <section className="scene-ink relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-40 lg:px-8">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle, rgba(255,194,77,0.16) 0%, rgba(255,159,28,0.05) 45%, transparent 70%)',
        }}
      />
      {/* Fade into the paper body that follows. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--paper))' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl space-y-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-dawn-200/50">
          {crumbs.map((crumb, i) => (
            <React.Fragment key={crumb.label}>
              {i > 0 && <span aria-hidden="true">/</span>}
              {crumb.path ? (
                <a
                  href={crumb.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(crumb.path!);
                  }}
                  className="transition-colors hover:text-sun-300"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-sun-300" aria-current="page">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        <span className="mono-label block text-sun-300/70">{chapter}</span>

        <RevealText
          as="h1"
          trigger={false}
          className="max-w-4xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          {renderTitle()}
        </RevealText>

        {lead && (
          <RevealFade delay={0.15} className="max-w-3xl">
            <p className="text-base leading-relaxed text-dawn-200/70 sm:text-lg">{lead}</p>
          </RevealFade>
        )}

        {children && <Reveal delay={0.25}>{children}</Reveal>}
      </div>
    </section>
  );
};
