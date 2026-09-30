import React from 'react';
import { useSiteNav } from '../hooks/useSiteNav';
import { Reveal } from './motion/Reveal';
import { RevealText } from './motion/RevealText';
import { MagneticButton } from './motion/MagneticButton';
import { ROUTES, SERVICES, SITE_INFO } from '../content/site';

/**
 * Footer with the giant masked CTA, staggered content, and the sun "set" into
 * a warm horizon with heat shimmer behind it.
 *
 * `showCta` drives the giant "Let's power what's next." band at the top. The
 * inner pages each end with their own dark CTA band, so the footer band is
 * redundant there and the route decides whether it renders.
 *
 * Every link, phone number and email that ships today is preserved.
 */
export const Footer: React.FC<{ showCta?: boolean }> = ({ showCta = true }) => {
  const navigate = useSiteNav();

  const handle = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-ink-950">
      {/* Set sun horizon + heat shimmer */}
      <div
        className="heat-shimmer pointer-events-none absolute inset-x-0 bottom-0 h-64"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-80"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 130%, rgba(255,107,53,0.28) 0%, rgba(255,194,77,0.10) 40%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Giant CTA */}
        {showCta && (
          <div className="border-b border-white/10 py-20 sm:py-28">
            <RevealText
              as="h2"
              lines={["Let's power", "what's next."]}
              className="font-display text-[clamp(2.75rem,9vw,7rem)] font-bold leading-[0.92] tracking-tight text-white"
            />
            <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href={ROUTES.contact} onClick={(e) => handle(e, ROUTES.contact)}>
                Get a Free Quote
              </MagneticButton>
              <MagneticButton
                variant="ghost"
                href={`tel:${SITE_INFO.phoneHref.replace('tel:', '')}`}
              >
                {SITE_INFO.phone}
              </MagneticButton>
            </Reveal>
          </div>
        )}

        {/* Footer columns */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <img
              src="/images/logo.png"
              alt="Solar Tech Systems"
              width={160}
              height={48}
              loading="lazy"
              className="h-11 w-auto rounded-lg bg-white/95 object-contain px-2 py-1"
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-dawn-200/70">
              Solar Tech Systems, incorporated in the year 2016 have established
              ourselves as a leading supplier of quality assured range of solar
              products.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-dawn-200/80">
                ISO Certified Company
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-dawn-200/80">
                CPRI Approved
              </span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="mono-label text-sun-300/80">Our Products &amp; Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <a
                    href={s.file}
                    onClick={(e) => handle(e, s.file)}
                    className="text-dawn-200/70 transition-colors hover:text-sun-300"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
              {/* Listed but not yet published as pages — kept exactly as shipped. */}
              <li className="text-dawn-200/35">Solar Street Light</li>
              <li className="text-dawn-200/35">Solar Irrigation System</li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mono-label text-sun-300/80">Contact Information</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <div className="mono-label text-dawn-200/40">Phone</div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <a
                    href={SITE_INFO.altPhoneHref}
                    className="text-dawn-200/80 transition-colors hover:text-sun-300"
                  >
                    {SITE_INFO.altPhone}
                  </a>
                  <span className="text-white/20">/</span>
                  <a
                    href={SITE_INFO.phoneHref}
                    className="text-dawn-200/80 transition-colors hover:text-sun-300"
                  >
                    {SITE_INFO.phone}
                  </a>
                </div>
              </li>
              <li>
                <div className="mono-label text-dawn-200/40">Email</div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <a
                    href="mailto:info@sts.in"
                    className="text-dawn-200/80 transition-colors hover:text-sun-300"
                  >
                    info@sts.in
                  </a>
                  <span className="text-white/20">/</span>
                  <a
                    href={`mailto:${SITE_INFO.email}`}
                    className="text-dawn-200/80 transition-colors hover:text-sun-300"
                  >
                    {SITE_INFO.email}
                  </a>
                </div>
              </li>
              <li>
                <div className="mono-label text-dawn-200/40">Address</div>
                <p className="mt-1 text-dawn-200/80">Bangalore, Karnataka, India</p>
                <p className="mt-1 text-xs text-dawn-200/50">{SITE_INFO.hours}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <Reveal
          stagger={0.08}
          className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-dawn-200/50 sm:flex-row"
        >
          <p>&copy; {new Date().getFullYear()} Solar Tech Systems. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href={ROUTES.home}
              onClick={(e) => handle(e, ROUTES.home)}
              className="transition-colors hover:text-sun-300"
            >
              Solar Tech Systems
            </a>
            <span>
              Designed By{' '}
              <span className="text-sun-400">{SITE_INFO.designerCredit}</span>
            </span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};
