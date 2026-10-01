import React, { useRef, type ReactNode } from 'react';
import { InlineCounter } from '../motion/AnimatedCounter';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useHeaderHeight, useHeroFx, useMagneticCap } from './heroUtils';
import { gsap } from '../../lib/motion/gsap';

interface HeroCtaProps {
  children: ReactNode;
  href: string;
  onNavigate: (path: string) => void;
  variant?: 'sun' | 'ghost';
  className?: string;
}

/**
 * Hero CTA. Reuses the site's .btn-sun / .btn-ghost classes so it looks
 * identical to every other button, but carries the hero's own 8px magnetic
 * clamp instead of the shared 10px default.
 */
const HeroCta: React.FC<HeroCtaProps> = ({
  children,
  href,
  onNavigate,
  variant = 'sun',
  className = '',
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagneticCap(ref, 8);

  return (
    <a
      ref={ref}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(href);
      }}
      className={`${variant === 'sun' ? 'btn-sun' : 'btn-ghost'} ${className}`}
    >
      {children}
    </a>
  );
};

interface SunriseHeroProps {
  onNavigate: (path: string) => void;
}

/**
 * HERO — "Sunrise over the array".
 *
 * One full-bleed project photograph sits behind the whole section as its
 * backdrop; the message is layered over it on the left, with the stats
 * anchored to a strip along the bottom. The photograph carries a navy scrim so
 * the copy and the header keep their contrast whatever the image is doing.
 *
 * Everything decorative here is aria-hidden and pointer-events-none. All motion
 * is transform/opacity only, lives in one gsap.context() via useGsapContext,
 * and is skipped entirely under prefers-reduced-motion.
 */
export const SunriseHero: React.FC<SunriseHeroProps> = ({ onNavigate }) => {
  const rootRef = useRef<HTMLElement>(null);
  const { reduced, canScrub } = useHeroFx();
  useHeaderHeight();

  useGsapContext(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const q = gsap.utils.selector(root);

      // ---- Reduced motion: everything is simply visible. ----------------
      if (reduced) {
        gsap.set(
          q('[data-hero-anim]'),
          { clearProps: 'all', opacity: 1, x: 0, y: 0, rotate: 0, clipPath: 'none' },
        );
        gsap.set(q('[data-line-inner]'), { yPercent: 0 });
        gsap.set(q('[data-hero-bg]'), { clearProps: 'all', opacity: 1, scale: 1 });
        gsap.set(q('[data-hero-bg-img]'), { clearProps: 'all', scale: 1 });
        return;
      }

      // ---- Load timeline, ~1.4s total, played once. ---------------------
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // 1. Eyebrow.
      tl.fromTo(
        q('[data-eyebrow]'),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.1,
      )
        // 2. Headline, one mask per line, no per-character splitting.
        .fromTo(
          q('[data-line-inner]'),
          { yPercent: 100 },
          { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1 },
          0.2,
        )
        // 3. Paragraph + CTAs + trust line.
        .fromTo(
          q('[data-copy]'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 },
          0.6,
        )
        // 4. Backdrop: fade the frame in while the photograph settles.
        .fromTo(
          q('[data-hero-bg]'),
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
          0,
        )
        .fromTo(
          q('[data-hero-bg-img]'),
          { scale: 1.12 },
          { scale: 1, duration: 1.8, ease: 'power3.out' },
          0,
        )
        // 5. Stats strip, then the counters count up via InlineCounter.
        .fromTo(
          q('[data-stats]'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          1.2,
        );

      // The photograph breathes forever, drifting only a few percent so no
      // edge of the frame is ever exposed.
      gsap.to(q('[data-hero-bg-img]'), {
        scale: 1.06,
        duration: 18,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.8,
      });

      // Scroll cue micro-loop.
      gsap.to(q('[data-scroll-dot]'), {
        yPercent: 320,
        duration: 1.9,
        ease: 'power1.inOut',
        repeat: -1,
        repeatDelay: 0.5,
      });

      // ---- Scroll choreography, desktop only, scrubbed. -----------------
      if (canScrub) {
        const st = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        st.fromTo(
          q('[data-hero-bg]'),
          { yPercent: 0 },
          { yPercent: -5, ease: 'none', duration: 1 },
          0,
        )
          .fromTo(
            q('[data-hero-copy]'),
            { y: 0, opacity: 1 },
            { y: -30, opacity: 0.35, ease: 'none', duration: 1 },
            0,
          );
      }
    },
    { dependencies: [reduced, canScrub] },
    rootRef,
  );

  return (
    <section
      id="hero"
      ref={rootRef}
      aria-labelledby="hero-heading"
      className="hero relative isolate flex w-full flex-col overflow-hidden"
    >
      {/* ---------- background: the photograph, then its scrims ---------- */}
      {/* The frame is deliberately taller than the section so the scrubbed
          parallax can travel without ever exposing an edge. */}
      <div
        data-hero-bg
        className="pointer-events-none absolute inset-x-0 -top-[8%] -z-10 h-[116%] overflow-hidden"
        aria-hidden="true"
      >
        <picture className="block h-full w-full">
          <img
            data-hero-bg-img
            src="/images/heroimage1.png"
            alt=""
            width={1671}
            height={941}
            fetchPriority="high"
            decoding="async"
            className="block h-full w-full object-cover object-[center_10%] will-change-transform"
          />
        </picture>
      </div>
      {/* Navy scrims: strongest under the header and the copy on the left,
          lifting toward the right so the photograph still reads as a photo. */}
      <div className="hero-photo-scrim pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="hero-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      {/* ---------- content --------------------------------------------- */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 sm:px-6 lg:px-8">
        <div className="flex flex-1 flex-col items-start justify-center pt-[calc(var(--header-height,5.5rem)+1.5rem)] pb-6 lg:pb-4">
          {/* The message */}
          <div data-hero-copy className="hero-copy flex w-full max-w-3xl flex-col items-start">
            {/* Eyebrow */}
            <p
              data-eyebrow
              data-hero-anim
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[0.7rem] font-medium tracking-wide text-dawn-200 backdrop-blur-sm sm:text-xs"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sun-400" aria-hidden="true" />
              Leading Renewable &amp; Power Infrastructure EPC
            </p>

            {/* H1 — the only h1 on the page.
                The cap is 2.5rem (40px) rather than 5rem on purpose: measured
                in-browser, anything above 40px pushes "Powering a Sustainable
                Future" onto a third line, and the oversized value also pushed
                the hero past one viewport at 1366x768. Two lines and one
                screen win over the larger type. */}
            <h1
              id="hero-heading"
              className="mt-5 font-display font-bold leading-[1.05] tracking-[-0.02em] text-white"
              style={{ fontSize: 'clamp(1.875rem, 2.92vw, 2.5rem)' }}
            >
              <span className="hero-line block overflow-hidden pb-[0.08em]">
                <span data-line-inner className="block will-change-transform">
                  Powering a{' '}
                  <span className="bg-gradient-to-r from-sun-400 via-sun-500 to-ember-500 bg-clip-text text-transparent">
                    Sustainable Future
                  </span>
                </span>
              </span>
              <span className="hero-line block overflow-hidden pb-[0.08em]">
                <span data-line-inner className="block will-change-transform">
                  with Solar Innovation
                </span>
              </span>
            </h1>

            {/* Paragraph */}
            <p
              data-copy
              data-hero-anim
              className="mt-5 max-w-[52ch] text-[0.95rem] leading-[1.65] text-dawn-200/75 sm:text-base"
            >
              Since 2016, Solar Tech Systems has been a trusted provider of high-quality solar
              solutions, offering solar fencing, street lights, water heaters, irrigation pumps,
              and turnkey megawatt plants across Karnataka.
            </p>

            {/* CTAs — same .btn-sun / .btn-ghost classes as the rest of the
                site, but with the hero's own 8px magnetic clamp. */}
            <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <div data-copy data-hero-anim className="w-full sm:w-auto">
                <HeroCta
                  href="contact-us.html"
                  onNavigate={onNavigate}
                  className="w-full sm:w-auto"
                >
                  Enquire Now
                </HeroCta>
              </div>
              <div data-copy data-hero-anim className="w-full sm:w-auto">
                <HeroCta
                  variant="ghost"
                  href="#services"
                  onNavigate={onNavigate}
                  className="w-full sm:w-auto"
                >
                  What We Offer
                </HeroCta>
              </div>
            </div>
            {/* Trust line — reuses the ISO wording already in the navbar */}
            <p
              data-copy
              data-hero-anim
              className="mt-5 inline-flex items-center gap-2 text-xs text-dawn-200/60"
            >
              <svg
                className="h-3.5 w-3.5 shrink-0 text-leaf-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
                  clipRule="evenodd"
                />
              </svg>
              ISO Certified · Solar &amp; Power EPC
            </p>
          </div>
        </div>

        {/* ---------- stats strip: anchored, never overlapping -------------- */}
        <div
          data-stats
          data-hero-anim
          className="relative flex items-center gap-4 border-t border-white/10 py-4 sm:gap-6"
        >
          <dl className="grid flex-1 grid-cols-3 gap-3 sm:gap-6">
            <div className="min-w-0">
              <dt className="sr-only">Established</dt>
              <dd>
                <span className="block font-display text-xl font-bold text-white sm:text-2xl">
                  <InlineCounter value={2016} />
                </span>
                <span className="mono-label mt-0.5 block text-[0.6rem] text-dawn-200/70 sm:text-[0.68rem]">
                  Established In
                </span>
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="sr-only">Grid substation EPC</dt>
              <dd>
                <span className="block font-display text-xl font-bold text-sky-400 sm:text-2xl">
                  <InlineCounter value={33} suffix=" kV" />
                </span>
                <span className="mono-label mt-0.5 block text-[0.6rem] text-dawn-200/70 sm:text-[0.68rem]">
                  Grid Substation EPC
                </span>
              </dd>
            </div>
            <div className="min-w-0">
              <dt className="sr-only">Quality certified</dt>
              <dd>
                <span className="block font-display text-xl font-bold text-sun-400 sm:text-2xl">
                  ISO
                </span>
                <span className="mono-label mt-0.5 block text-[0.6rem] text-dawn-200/70 sm:text-[0.68rem]">
                  Certified Quality
                </span>
              </dd>
            </div>
          </dl>

          {/* Scroll hint: far right of the strip, own column, cannot collide */}
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#about');
            }}
            aria-label="Scroll to next section"
            className="group relative hidden h-11 w-6 shrink-0 items-center justify-center sm:flex"
          >
            <span className="relative block h-9 w-px overflow-hidden bg-white/12">
              <span
                data-scroll-dot
                className="absolute inset-x-0 top-0 block h-1.5 bg-sun-400"
                aria-hidden="true"
              />
            </span>
            <span className="mono-label pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 text-[0.55rem] text-dawn-200/0 transition-colors group-hover:text-dawn-200/60">
              Scroll
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
