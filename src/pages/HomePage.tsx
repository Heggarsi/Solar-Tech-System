import React, { useState } from 'react';
import { SERVICES, WHY_CHOOSE_ITEMS, SITE_INFO } from '../data/siteData';
import { HOME_STATS } from '../content/site';
import { useSiteNav } from '../hooks/useSiteNav';
import { Reveal, RevealFade } from '../components/motion/Reveal';
import { RevealText, ScrubWords } from '../components/motion/RevealText';
import { ImageReveal } from '../components/motion/ImageReveal';
import { MagneticButton } from '../components/motion/MagneticButton';
import { InlineCounter } from '../components/motion/AnimatedCounter';
import { HorizontalScroll } from '../components/motion/HorizontalScroll';
import { SunriseHero } from '../components/hero/SunriseHero';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (formError) setFormError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim()) {
      setFormError('Please fill in all required fields (Name, Email, and Mobile Number).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormSubmitted(true);
  };

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* ================================================================
          DAWN — hero. Owns its own calm navy backdrop so the header stays
          legible; the global sky/sun layers are suppressed for this route.
          ================================================================ */}
      <SunriseHero onNavigate={onNavigate} />

      {/* ================================================================
          THE STUDIO — paper. The one light surface in the document, so the
          eye rests before the capabilities run.
          ================================================================ */}
      <section id="about" className="scene-paper relative scroll-mt-28 overflow-hidden py-24 sm:py-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-6 lg:col-span-6">
              <span className="mono-label text-ink-900/50">01 — About Solartech Systems</span>
              <RevealText
                as="h2"
                lines={['Leading the Clean', 'Energy Transition', 'Across Karnataka']}
                className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-ink-950 sm:text-4xl"
              />
              <ScrubWords
                as="p"
                text="Solar Tech Systems, incorporated in the year 2011 have established ourselves as a leading supplier of quality assured range of solar products such as Solar Power Fencing, Solar Street Lights, Solar Water Heaters, Solar Irrigation Pump, Solar Power Plant and Roof structures etc."
                className="text-sm leading-relaxed text-slate-700 sm:text-base"
              />
              <ScrubWords
                as="p"
                text="All these products are designed by our well-trained professionals using high grade material in accordance with the industry standards. We are the market leaders in delivering high quality technology Solar Products and Service to our esteemed clients pan Karnataka."
                className="text-sm leading-relaxed text-slate-700 sm:text-base"
              />
              <Reveal className="pt-2">
                <a
                  href="about-us.html"
                  onClick={(e) => { e.preventDefault(); onNavigate('about-us.html'); }}
                  className="hairline-btn inline-flex items-center gap-2 text-sm font-semibold text-ink-950"
                >
                  <span>Read More</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <ImageReveal
                src="/images/about-solar.jpg"
                alt="Solar Tech Systems solar installation and engineering team"
                wrapperClassName="relative overflow-hidden rounded-2xl border border-ink-950/10 shadow-2xl"
                from="left"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <RevealFade delay={0.15} className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>Certified Engineering Standards</span>
                <span className="font-medium text-ember-500">Pan-Karnataka Operations</span>
              </RevealFade>
            </div>
          </div>

          {/* Verified facts only — sourced from siteData, nothing invented.
              Colours follow the paper surface this section sits on. */}
          <Reveal
            stagger={0.08}
            className="mt-16 grid grid-cols-2 gap-8 border-t border-ink-950/10 pt-10 lg:grid-cols-4"
          >
            {HOME_STATS.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl font-bold text-ink-950 sm:text-4xl">
                  {stat.value == null ? (
                    stat.label
                  ) : (
                    <InlineCounter value={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                {stat.value != null && (
                  <div className="mt-1 text-sm font-medium text-ink-900/70">{stat.label}</div>
                )}
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{stat.detail}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          CAPABILITIES — pinned horizontal track on desktop, native
          scroll-snap carousel on touch.
          ================================================================ */}
      <section id="services" className="scene-ink relative scroll-mt-28 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="mono-label text-sun-300/70">02 — Our Capabilities</span>
            <RevealText
              as="h2"
              lines={['What We Offer']}
              className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />
            <RevealFade delay={0.1} className="mx-auto mt-4 max-w-2xl">
              <p className="text-sm text-dawn-200/70 sm:text-base">
                End-to-end solar solutions, commercial rooftops, high-voltage transmission
                lines, and compact substations.
              </p>
            </RevealFade>
          </div>
        </div>

        <HorizontalScroll
          length={0.5}
          className="mt-14"
          trackClassName="gap-5 py-4 px-6 sm:gap-6 lg:px-[max(3rem,calc((100vw-80rem)/2))]"
        >
          {SERVICES.map((service, index) => (
            <article
              key={service.slug}
              className="group relative flex w-[82vw] max-w-[30rem] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900/70 sm:w-[70vw]"
            >
              <div className="relative h-56 w-full overflow-hidden sm:h-64">
                <img
                  src={service.img}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                <span className="mono-label absolute left-5 top-5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-white/70 backdrop-blur-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-5 p-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-dawn-200/65">{service.desc}</p>
                </div>
                <MagneticButton
                  variant="ghost"
                  href={service.file}
                  onClick={(e) => { e.preventDefault(); onNavigate(service.file); }}
                  arrow
                >
                  Read More
                </MagneticButton>
              </div>
            </article>
          ))}
        </HorizontalScroll>
      </section>

      {/* ================================================================
          STANDARDS
          ================================================================ */}
      <section id="trust" className="scene-ink relative scroll-mt-28 overflow-hidden py-24 sm:py-32">
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mono-label text-sun-300/70">03 — Trust &amp; Certification</span>
            <RevealText
              as="h2"
              lines={['Why Choose', 'Solar Tech Systems ?']}
              className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl"
            />
            <RevealFade delay={0.1} className="mt-5">
              <p className="text-sm text-dawn-200/70 sm:text-base">
                At Solar Tech Systems, we are committed to delivering the highest standards of
                quality and service. Here is why you can trust us for your solar energy and power
                infrastructure solutions.
              </p>
            </RevealFade>
          </div>

          <Reveal stagger={0.12} className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {WHY_CHOOSE_ITEMS.map((item, i) => (
              <article
                key={item.id}
                className="group relative flex flex-col items-center space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center transition-colors duration-500 hover:border-sun-400/30 hover:bg-white/[0.06]"
              >
                <span className="crosshair absolute right-5 top-5 text-white/20" aria-hidden="true" />
                <div className="mono-label rounded-full border border-sun-400/25 bg-sun-400/10 px-3.5 py-1 text-sun-300">
                  {item.badge}
                </div>
                <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-dawn-200/65">{item.text}</p>
                <span className="mono-label absolute -bottom-px left-1/2 -translate-x-1/2 text-[0.6rem] text-white/15">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          DUSK — contact. The sun is low here; the sky layer has warmed
          to ember by the time this section arrives.
          ================================================================ */}
      <section id="contact" className="scene-ink relative scroll-mt-28 overflow-hidden py-24 sm:py-32">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-96"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(90% 100% at 50% 120%, rgba(255,107,53,0.18) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mono-label text-sun-300/70">04 — Contact</span>
            <RevealText
              as="h2"
              lines={['Get In Touch', 'With Us']}
              className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl"
            />
            <RevealFade delay={0.1} className="mt-5">
              <p className="text-sm text-dawn-200/70 sm:text-base">
                Reach out to us through the enquiry form or contact details provided below. We
                are here to assist with any questions or provide more information about our
                products and services.
              </p>
            </RevealFade>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Contact details */}
            <RevealFade className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-5 sm:p-8">
              <h3 className="border-b border-white/10 pb-3 text-lg font-bold text-white">
                Corporate Office &amp; Support
              </h3>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="mono-label text-dawn-200/40">Phone</h4>
                  <a href={SITE_INFO.phoneHref} className="mt-1 block text-base font-bold text-white transition-colors hover:text-sun-300">
                    {SITE_INFO.phone}
                  </a>
                  <div className="mt-0.5 text-xs text-dawn-200/50">Alt: +91 8945361784</div>
                </div>

                <div>
                  <h4 className="mono-label text-dawn-200/40">Email</h4>
                  <a href={`mailto:${SITE_INFO.email}`} className="mt-1 block text-base font-bold text-white transition-colors hover:text-sun-300">
                    {SITE_INFO.email}
                  </a>
                  <div className="mt-0.5 text-xs text-dawn-200/50">Alt: info@sts.in</div>
                </div>

                <div>
                  <h4 className="mono-label text-dawn-200/40">Location</h4>
                  <p className="mt-1 text-base font-bold text-white">Bangalore, Karnataka, India</p>
                  <p className="mt-0.5 text-xs text-dawn-200/50">Operations Pan Karnataka</p>
                </div>
              </div>
            </RevealFade>

            {/* Enquiry form */}
            <RevealFade delay={0.1} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-7 sm:p-8">
              {formSubmitted ? (
                <div className="space-y-4 p-8 text-center">
                  <div className="inline-block rounded-full border border-leaf-400/30 bg-leaf-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-leaf-400">
                    Confirmation Received
                  </div>
                  <h3 className="text-xl font-bold text-white">Enquiry Submitted Successfully</h3>
                  <p className="mx-auto max-w-md text-sm text-dawn-200/70">
                    Thank you, <span className="font-semibold text-white">{formData.name}</span>. Our
                    solar engineering team will review your project requirements and contact you
                    within one business day.
                  </p>
                  {/* TODO: confirm with client — there is no backend. This form is
                      local state only, exactly as it shipped. Wire to an endpoint or
                      a mailto: fallback when the destination is confirmed. */}
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', mobile: '', message: '' });
                    }}
                    className="mt-4 cursor-pointer rounded-full border border-white/15 px-6 py-2 text-xs font-semibold text-white/80 transition-colors hover:bg-white/5"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
                  {formError && (
                    <div
                      role="alert"
                      className="rounded-lg border border-ember-500/30 bg-ember-500/10 p-3 text-xs font-medium text-ember-500"
                    >
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="home-name" className="mono-label text-dawn-200/50">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="home-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        autoComplete="name"
                        className="field-dark"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="home-email" className="mono-label text-dawn-200/50">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="home-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        autoComplete="email"
                        className="field-dark"
                        placeholder="you@domain.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="home-mobile" className="mono-label text-dawn-200/50">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="home-mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      autoComplete="tel"
                      className="field-dark"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="home-message" className="mono-label text-dawn-200/50">
                      Message / Project Details
                    </label>
                    <textarea
                      id="home-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="field-dark resize-y"
                      placeholder="Please mention your required capacity, rooftop type, or location..."
                    />
                  </div>

                  <MagneticButton type="submit">Send Enquiry</MagneticButton>
                </form>
              )}
            </RevealFade>
          </div>

          {/* Map */}
          <Reveal className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <iframe
              title="Solar Tech Systems location - Bangalore, Karnataka"
              src={SITE_INFO.mapEmbed}
              className="h-80 w-full rounded-xl border-0 sm:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="flex flex-col items-center justify-between gap-2 px-2 pt-3 text-xs text-dawn-200/50 sm:flex-row">
              <span>
                Headquartered in Bangalore, serving commercial &amp; industrial clients across
                Karnataka.
              </span>
              <a
                href={SITE_INFO.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sun-300 transition-colors hover:text-sun-400"
              >
                Open in Google Maps &rarr;
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
