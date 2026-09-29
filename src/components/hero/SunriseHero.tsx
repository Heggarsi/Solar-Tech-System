import React, { useRef, type ReactNode } from 'react';
import { InlineCounter } from '../motion/AnimatedCounter';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useHeaderHeight, useHeroFx, useMagneticCap, followPointer, MOTES } from './heroUtils';
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
 * Split layout: message on the left, one real project photograph in an arch
 * frame on the right with the sun rising behind it, stats anchored to a strip
 * along the bottom.
 *
 * Everything decorative here is aria-hidden and pointer-events-none. All motion
 * is transform/opacity/clip-path only, lives in one gsap.context() via
 * useGsapContext, and is skipped entirely under prefers-reduced-motion.
 */
export const SunriseHero: React.FC<SunriseHeroProps> = ({ onNavigate }) => {
  const rootRef = useRef<HTMLElement>(null);
  const { reduced, canScrub, canHover } = useHeroFx();
  useHeaderHeight();

  // Hand the global CSS sun off while the hero is on screen, then give it
  // back. The hero has its own localized sun, so two would otherwise show.
  useGsapContext(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const setHidden = (hidden: boolean) => {
        if (hidden) document.documentElement.setAttribute('data-hero-sun', 'local');
        else document.documentElement.removeAttribute('data-hero-sun');
      };

      setHidden(true);

      const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
        rootMargin: '0px 0px -10% 0px',
      });
      io.observe(root);

      // Park the sun on the arch's horizontal centre, its top edge level with
      // the arch's top edge. Hard-coded percentages drift as the copy column
      // changes height, so the sun would slide off the photograph.
      const arch = root.querySelector<HTMLElement>('[data-arch]');
      const field = root.querySelector<HTMLElement>('[data-sun]');
      if (arch && field) {
        const place = () => {
          const heroBox = root.getBoundingClientRect();
          const archBox = arch.getBoundingClientRect();
          if (heroBox.width < 1) return;
          const x = ((archBox.left + archBox.width / 2 - heroBox.left) / heroBox.width) * 100;
          const y = archBox.top - heroBox.top;
          root.style.setProperty('--sun-x', `${x.toFixed(2)}%`);
          root.style.setProperty('--sun-y', `${Math.round(y)}px`);
        };
        place();
        const ro = new ResizeObserver(place);
        ro.observe(arch);
        ro.observe(root);
        window.addEventListener('resize', place);
        // The arch settles from scale 1.15 -> 1 after the load timeline; re-place
        // once that has finished so the sun ends up truly centred.
        const t = window.setTimeout(place, 1800);
        return () => {
          io.disconnect();
          setHidden(false);
          ro.disconnect();
          window.removeEventListener('resize', place);
          window.clearTimeout(t);
        };
      }

      return () => {
        io.disconnect();
        setHidden(false);
      };
    },
    { dependencies: [] },
    rootRef,
  );

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
        gsap.set(q('[data-arch-clip]'), { clipPath: 'inset(0% 0% 0% 0%)' });
        return;
      }

      // ---- Load timeline, ~1.4s total, played once. ---------------------
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // 1. Sun fades and scales in from nothing.
      tl.fromTo(
        q('[data-sun]'),
        { opacity: 0, scale: 0.72 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'expo.out' },
        0,
      )
        // 2. Eyebrow.
        .fromTo(
          q('[data-eyebrow]'),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          0.1,
        )
        // 3. Headline, one mask per line, no per-character splitting.
        .fromTo(
          q('[data-line-inner]'),
          { yPercent: 100 },
          { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1 },
          0.2,
        )
        // 4. Paragraph + CTAs + trust line.
        .fromTo(
          q('[data-copy]'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 },
          0.6,
        )
        // 5. Arch: clip from the bottom up while the photo settles from 1.15.
        .fromTo(
          q('[data-arch-clip]'),
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.inOut' },
          0.3,
        )
        .fromTo(
          q('[data-arch-img]'),
          { scale: 1.15 },
          { scale: 1, duration: 1.2, ease: 'power3.out' },
          0.3,
        )
        // 6. Floating cards.
        .fromTo(
          q('[data-float-card]'),
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
          1,
        )
        // 7. Stats strip, then the counters count up via InlineCounter.
        .fromTo(
          q('[data-stats]'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          1.2,
        );

      // Cards drift forever, offset from each other and out of phase.
      q('[data-float-card]').forEach((card, i) => {
        gsap.to(card, {
          y: i === 0 ? -8 : 8,
          duration: i === 0 ? 4.2 : 5.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.6,
        });
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
          q('[data-arch-img]'),
          { yPercent: 0 },
          { yPercent: -6, ease: 'none', duration: 1 },
          0,
        )
          .fromTo(
            q('[data-sun]'),
            { yPercent: 0, scale: 1, filter: 'brightness(1)' },
            { yPercent: -14, scale: 1.16, filter: 'brightness(1.22)', ease: 'none', duration: 1 },
            0,
          )
          .fromTo(
            q('[data-hero-copy]'),
            { y: 0, opacity: 1 },
            { y: -30, opacity: 0.35, ease: 'none', duration: 1 },
            0,
          )
          // Cards separate as the hero leaves.
          .to(q('[data-float-card]'), { y: '+=6', ease: 'none', duration: 1 }, 0);
      }

      // ---- Pointer interactions, fine pointer only. ---------------------
      if (canHover) {
        const arch = root.querySelector<HTMLElement>('[data-arch]');
        const sun = root.querySelector<HTMLElement>('[data-sun]');

        const stopArch = followPointer(arch!, {
          max: 40,
          enabled: true,
          onMove: (dx, dy) => {
            // Up to 3 degrees of tilt, as specified.
            gsap.to(arch, { rotateY: (dx / 40) * 3, rotateX: (-dy / 40) * 3, duration: 0.5, ease: 'power2.out' });
          },
        });
        const stopSun = followPointer(root, {
          max: 10,
          enabled: true,
          onMove: (dx, dy) => {
            gsap.to(sun, { x: dx, y: dy, duration: 0.8, ease: 'power2.out' });
          },
        });

        return () => {
          stopArch();
          stopSun();
        };
      }
    },
    { dependencies: [reduced, canScrub, canHover] },
    rootRef,
  );

  return (
    <section
      id="hero"
      ref={rootRef}
      aria-labelledby="hero-heading"
      className="hero relative isolate flex w-full flex-col overflow-hidden"
    >
      {/* ---------- background: navy gradient + blueprint, edge-masked ---- */}
      <div className="hero-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      {/* Warm radial bloom sitting behind the arch, where the sun will be. */}
      <div className="hero-bloom pointer-events-none absolute -z-10" aria-hidden="true" />

      {/* ---------- sun ------------------------------------------------
          The field starts exactly at the header's bottom edge and is
          overflow-hidden, so no part of the sun can ever render behind the
          navbar. The mask eases it in over the first 3rem, which reads as the
          sun cresting the arch rather than being sliced off. --sun-x / --sun-y
          are measured from the arch so it stays welded to the photograph. */}
      <div className="hero-sun-field" aria-hidden="true">
        <div data-sun className="hero-sun">
          {/* Pulsing glow */}
          <div className="hero-sun-glow" />
          {/* Rotating thin rays, 60s per turn */}
          <svg
            className="hero-sun-rays"
            viewBox="0 0 200 200"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <g stroke="url(#heroRayFade)" strokeWidth="1.1">
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="16"
                  x2="100"
                  y2={i % 2 === 0 ? 40 : 31}
                  transform={`rotate(${(360 / 24) * i} 100 100)`}
                />
              ))}
            </g>
            <defs>
              <linearGradient id="heroRayFade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFC24D" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
          {/* The disc itself */}
          <div className="hero-sun-disc" />
        </div>
      </div>

      {/* ---------- content --------------------------------------------- */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 sm:px-6 lg:px-8">
        <div className="grid flex-1 grid-cols-1 items-center gap-10 pt-[calc(var(--header-height,5.5rem)+1.5rem)] pb-6 lg:grid-cols-12 lg:gap-8 lg:pb-4">
          {/* LEFT: message, cols 1-6 */}
          <div className="hero-copy flex flex-col items-start lg:col-span-6">
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
                Future" onto a third line inside a 6-column split, and the
                oversized value also pushed the hero past one viewport at
                1366x768. Two lines and one screen win over the larger type. */}
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

          {/* RIGHT: the photograph in an arch frame, cols 7-12 */}
          <div className="relative flex w-full justify-center lg:col-span-6">
            {/* Dust: 40 CSS motes, absolutely positioned inside this
                column only, so nothing can ever drift over the headline or
                behind the header. No canvas, no Three.js, no extra bundle. */}
            {canHover && (
              <div
                className="hero-motes pointer-events-none absolute inset-0 overflow-hidden"
                aria-hidden="true"
              >
                {MOTES.map((mote, i) => (
                  <span
                    key={i}
                    className="hero-mote"
                    style={{
                      left: `${mote.x}%`,
                      top: `${mote.y}%`,
                      width: mote.size,
                      height: mote.size,
                      animationDelay: `${mote.delay}s`,
                      animationDuration: `${mote.duration}s`,
                    }}
                  />
                ))}
              </div>
            )}

            <div
              data-arch
              className="hero-arch relative w-full max-w-[26rem] lg:max-w-none"
              style={{ perspective: '1000px' }}
            >
              {/* Sun is behind this frame; the frame's own arch radius keeps
                  the sun peeking above the curve. */}
              <div
                data-arch-clip
                className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-2xl border border-sun-400/25 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)]"
              >
                <picture>
                  <source
                    type="image/avif"
                    srcSet="/images/hero-array-640.avif 640w, /images/hero-array-1024.avif 1024w, /images/hero-array-1600.avif 1600w"
                    sizes="(min-width: 1024px) 46vw, (min-width: 640px) 80vw, 100vw"
                  />
                  <source
                    type="image/webp"
                    srcSet="/images/hero-array-640.webp 640w, /images/hero-array-1024.webp 1024w, /images/hero-array-1600.webp 1600w"
                    sizes="(min-width: 1024px) 46vw, (min-width: 640px) 80vw, 100vw"
                  />
                  {/* Original JPEG is the fallback. 478 kB; the AVIF at the
                      same width is 180 kB and the 640w variant is 28.5 kB. */}
                  <img
                    data-arch-img
                    src="/images/service-solar-power-plant.jpg"
                    alt="Rooftop solar power plant installed by Solar Tech Systems"
                    width={1600}
                    height={901}
                    fetchPriority="high"
                    decoding="async"
                    className="block aspect-[4/5] h-full w-full object-cover will-change-transform sm:aspect-[16/13] lg:aspect-auto"
                  />
                </picture>
                {/* Navy scrim so the floating cards stay legible over any photo */}
                <div
                  className="pointer-events-none absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(5,11,20,0.92) 0%, rgba(5,11,20,0.35) 32%, transparent 62%)',
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background:
                      'radial-gradient(120% 80% at 50% 0%, rgba(255,194,77,0.10) 0%, transparent 55%)',
                  }}
                />
              </div>

              {/* Floating card: top-left, overlapping the frame edge.
                  Visible on every breakpoint — the spec keeps exactly one
                  card on mobile, so this is the survivor and the second is
                  hidden below sm. */}
              <div
                data-float-card
                data-hero-anim
                className="absolute left-0 top-[14%] w-[12rem] rounded-xl border border-white/12 bg-ink-900/95 p-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] sm:top-[18%] sm:w-[13.5rem] sm:p-3.5 lg:-left-6"
              >
                <div className="flex items-center gap-2.5">
                  <svg
                    className="h-4 w-4 shrink-0 text-sun-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M13 2L4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5z" strokeLinejoin="round" />
                  </svg>
                  <p className="text-[0.8rem] font-semibold leading-tight text-white">
                    33 kV Grid Substation EPC
                  </p>
                </div>
              </div>

              {/* Floating card: bottom-right, offset in the opposite direction */}
              <div
                data-float-card
                data-hero-anim
                className="absolute bottom-[12%] right-0 hidden w-[12.5rem] rounded-xl border border-white/12 bg-ink-900/95 p-3.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] sm:block lg:-right-4"              >
                <div className="flex items-center gap-2.5">
                  <svg
                    className="h-4 w-4 shrink-0 text-sky-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3.5 2" strokeLinecap="round" />
                  </svg>
                  <p className="text-[0.8rem] font-semibold leading-tight text-white">
                    Since 2016 · Bangalore
                  </p>
                </div>
              </div>
            </div>
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
            href="#brief"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#brief');
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
