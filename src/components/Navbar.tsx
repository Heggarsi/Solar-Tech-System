import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '../lib/motion/gsap';
import { useSiteNav } from '../hooks/useSiteNav';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import {
  NAV_LINKS,
  ROUTES,
  SERVICES,
  SITE_INFO,
} from '../content/site';
import { EASE } from '../lib/motion/tokens';

const NAV_TOP_H = 88;
const NAV_SCROLLED_H = 64;
const REVEAL_AT = 80;

interface NavbarProps {
  /** 'home' sits over the dark hero; inner pages use the smaller banner. */
  variant?: 'home' | 'inner';
}

/**
 * Cinematic navbar.
 *
 *  - transparent with white text at the top of a dark hero
 *  - after 80px it becomes a blurred ink panel, 88px -> 64px, logo scales down
 *  - auto-hides scrolling down, returns scrolling up
 *  - mobile: full-screen overlay that clips open from the top-right
 */
export const Navbar: React.FC<NavbarProps> = ({ variant = 'home' }) => {
  const navigate = useSiteNav();
  const location = useLocation();
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery('isDesktop');

  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const overlayTl = useRef<gsap.core.Timeline | null>(null);

  const currentFile = location.pathname.replace(/^\//, '') || ROUTES.home;

  const isActive = (path: string) =>
    path === ROUTES.home
      ? currentFile === ROUTES.home || currentFile === ''
      : currentFile.includes(path);

  const isServiceActive = SERVICES.some((s) => currentFile.includes(s.file));

  // ---- scroll state -------------------------------------------------------
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > REVEAL_AT);

      // Auto-hide only well past the top, and never while the menu is open.
      if (!menuOpen) {
        const delta = y - lastScrollY.current;
        if (y > 240 && delta > 6) setHidden(true);
        else if (delta < -6) setHidden(false);
      }
      lastScrollY.current = y;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  // ---- close the menu on navigation -------------------------------------
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  // ---- focus trap + Esc + scroll lock ------------------------------------
  useEffect(() => {
    if (!menuOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.classList.add('scroll-locked');

    const overlay = overlayRef.current;
    const focusables = () =>
      Array.from(
        overlay?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('scroll-locked');
      previouslyFocused?.focus?.();
    };
  }, [menuOpen]);

  // ---- overlay open/close animation --------------------------------------
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    overlayTl.current?.kill();

    if (reduced) {
      gsap.set(overlay, {
        clipPath: menuOpen ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
        opacity: menuOpen ? 1 : 0,
      });
      return;
    }

    const links = overlay.querySelectorAll('[data-menu-link]');

    if (menuOpen) {
      overlayTl.current = gsap
        .timeline()
        .set(overlay, { pointerEvents: 'auto' })
        .fromTo(
          overlay,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.6,
            ease: EASE.expo,
          },
        )
        .fromTo(
          links,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: EASE.out },
          '-=0.25',
        );
    } else {
      overlayTl.current = gsap
        .timeline()
        .to(overlay, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.45,
          ease: EASE.inOut,
        })
        .set(overlay, { pointerEvents: 'none' });
    }

    return () => {
      overlayTl.current?.kill();
    };
  }, [menuOpen, reduced]);

  const handleNav = useCallback(
    (e: React.MouseEvent, path: string) => {
      e.preventDefault();
      setServicesOpen(false);
      navigate(path);
    },
    [navigate],
  );

  // The overlay clip is animated in the effect above; these are the resting
  // states used for the first paint and for reduced motion.
  const clipClosed = 'polygon(0 0, 0 0, 0 100%, 0 100%)';

  return (
    <>
      <header
        ref={barRef}
        data-site-header=""
        className="fixed left-0 right-0 top-0 z-[60] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: hidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        {/* Utility strip — phone, email, location and the existing socials,
            kept because they ship today. Translucent so the sun shows through. */}
        <div
          className="hidden w-full border-b border-white/10 bg-ink-950/45 backdrop-blur-md md:block"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-1.5 text-xs lg:px-8">
            <div className="flex items-center gap-5 text-dawn-200/80">
              <a href={SITE_INFO.phoneHref} className="hover:text-sun-300">
                Tel: {SITE_INFO.phone}
              </a>
              <a
                href={`mailto:${SITE_INFO.email}`}
                className="hidden hover:text-sun-300 sm:inline"
              >
                {SITE_INFO.email}
              </a>
              <span className="hidden text-dawn-200/50 lg:inline">
                {SITE_INFO.location}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="mono-label hidden text-sun-300/80 lg:inline">
                ISO Certified Solar &amp; Power EPC
              </span>
              <div className="flex items-center gap-2">
                {[
                  {
                    label: 'Facebook',
                    d: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z',
                  },
                  {
                    label: 'X',
                    d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
                  },
                  {
                    label: 'YouTube',
                    d: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
                  },
                  {
                    label: 'LinkedIn',
                    d: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.67-.75 1.67-1.67A1.67 1.67 0 0 0 6.46 5.42a1.67 1.67 0 0 0-1.67 1.67c0 .92.75 1.67 1.67 1.67M5.07 18.5h2.79v-8.37H5.07v8.37z',
                  },
                ].map((icon) => (
                  <a
                    key={icon.label}
                    href="#"
                    aria-label={icon.label}
                    onClick={(e) => e.preventDefault()}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-sun-400 hover:text-sun-300"
                  >
                    <svg
                      className="h-3.5 w-3.5 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d={icon.d} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={`w-full transition-[height,background-color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled
              ? 'border-b border-white/10 bg-ink-950/80 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent'
          }`}
          style={{ height: isScrolled ? NAV_SCROLLED_H : NAV_TOP_H }}
        >
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Brand */}
            <a
              href={ROUTES.home}
              onClick={(e) => handleNav(e, ROUTES.home)}
              className="flex items-center gap-3"
              aria-label="Solar Tech Systems — home"
            >
              {/* The mark is a dark plate, so it needs the same white holder
                  the footer gives it — lighter and frosted here so the header
                  stays airy over the hero photograph. */}
              <img
                src="/images/logo.png"
                alt="Solar Tech Systems"
                width={160}
                height={48}
                className="w-auto rounded-lg border border-white/25 bg-white/75 object-contain px-2 py-1 shadow-[0_6px_20px_-10px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-500"
                style={{ height: isScrolled ? 34 : 44 }}
              />
            </a>

            {/* Desktop links */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
              {NAV_LINKS.map((link) =>
                link.path === null ? (
                  <div
                    key={link.label}
                    className="relative"
                    ref={servicesRef}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      onClick={() => setServicesOpen((v) => !v)}
                      className={`nav-link ${isServiceActive ? 'is-active' : ''}`}
                    >
                      {link.label}
                    </button>

                    {servicesOpen ? (
                      <div className="absolute left-0 top-full w-64 pt-3">
                        {/* Titles only: the one-line items keep the panel
                            compact enough to scan without opening it. */}
                        <div className="rounded-xl border border-white/10 bg-ink-900/95 p-2 shadow-2xl backdrop-blur-xl">
                          {SERVICES.map((s) => (
                            <a
                              key={s.slug}
                              href={s.file}
                              onClick={(e) => handleNav(e, s.file)}
                              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
                            >
                              {s.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.path}
                    onClick={(e) => handleNav(e, link.path as string)}
                    className={`nav-link ${isActive(link.path) ? 'is-active' : ''}`}
                    aria-current={isActive(link.path) ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                ),
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <a
                href={ROUTES.contact}
                onClick={(e) => handleNav(e, ROUTES.contact)}
                className="btn-sun hidden !min-h-[40px] !px-5 !py-2 text-sm sm:inline-flex"
              >
                <span>Contact Us</span>
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </a>

              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
              >
                <span className="sr-only">
                  {menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                </span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  {menuOpen ? (
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  ) : (
                    <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        id="mobile-menu"
        className="fixed inset-0 z-[55] bg-ink-950/98 backdrop-blur-2xl lg:hidden"
        style={{
          clipPath: menuOpen ? 'inset(0% 0% 0% 0%)' : clipClosed,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: 'none',
        }}
        aria-hidden={!menuOpen}
      >
        <nav
          className="flex h-full flex-col justify-center gap-1 px-6 pb-24 pt-28"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((link) =>
            link.path === null ? (
              <div key={link.label} className="py-1">
                <p className="mono-label px-3 pb-1 text-sun-300/70">
                  {link.label}
                </p>
                {SERVICES.map((s) => (
                  <a
                    key={s.slug}
                    data-menu-link
                    href={s.file}
                    onClick={(e) => handleNav(e, s.file)}
                    className="block rounded-lg px-3 py-2.5 text-base text-dawn-200/80"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            ) : (
              <a
                key={link.label}
                data-menu-link
                href={link.path}
                onClick={(e) => handleNav(e, link.path as string)}
                className={`block py-2 font-display text-3xl font-semibold ${
                  isActive(link.path) ? 'text-sun-300' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ),
          )}

          <a
            data-menu-link
            href={ROUTES.contact}
            onClick={(e) => handleNav(e, ROUTES.contact)}
            className="btn-sun mt-6 w-full"
          >
            <span>Contact Us</span>
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </a>

          <div className="mt-8 space-y-1 text-sm text-dawn-200/60">
            <a
              href={SITE_INFO.phoneHref}
              className="block hover:text-sun-300"
            >
              {SITE_INFO.phone}
            </a>
            <a
              href={`mailto:${SITE_INFO.email}`}
              className="block hover:text-sun-300"
            >
              {SITE_INFO.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};
