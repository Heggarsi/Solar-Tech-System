import React from 'react';
import { TESTIMONIALS, SITE_INFO } from '../data/siteData';
import { HeroSvgPattern } from '../components/HeroSvgPattern';

interface ClientsPageProps {
  onNavigate: (path: string) => void;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({ onNavigate }) => {
  const segments = [
    {
      label: 'Industrial',
      title: 'Industrial Manufacturing',
      desc: 'High-voltage captive power plants and 33 kV evacuation lines for foundries, textile mills, and PEB factories in Hoskote, Peenya, and Tumakuru.'
    },
    {
      label: 'Commercial',
      title: 'Commercial Establishments',
      desc: 'Bespoke rooftop net-metered arrays for retail showrooms, corporate offices, institutions, and healthcare centers across Bengaluru.'
    },
    {
      label: 'Agriculture',
      title: 'Agricultural Irrigation',
      desc: 'Solar water pumping stations and variable frequency drive systems empowering farmers in Davangere, Chitradurga, and Bagalkote.'
    },
    {
      label: 'Residential',
      title: 'Residential & Villa Enclaves',
      desc: 'High-yield rooftop solar arrays with integrated surge protection and intelligent remote monitoring in Mysuru and surrounding regions.'
    }
  ];

  return (
    <div className="w-full relative overflow-hidden">
      {/* PAGE HERO with Concentric Solar Arcs & High-Visibility SVG Pattern */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-50 via-white to-white border-b border-slate-200/60 overflow-hidden">
        {/* Soft, delicate Crystalline Photovoltaic SVG Pattern */}
        <HeroSvgPattern opacity={0.18} />

        {/* Concentric Solar Ripple SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden" aria-hidden="true">
          <svg className="absolute -top-16 -right-16 w-[750px] h-[550px]" viewBox="0 0 750 550">
            <circle cx="600" cy="150" r="380" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="12 8" />
            <circle cx="600" cy="150" r="280" fill="none" stroke="#fb7185" strokeWidth="1.2" strokeDasharray="8 6" />
            <circle cx="600" cy="150" r="180" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
            <circle cx="600" cy="150" r="90" fill="none" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="4 4" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <a
              href="solartechsystems.html"
              onClick={(e) => { e.preventDefault(); onNavigate('solartechsystems.html'); }}
              className="hover:text-rose-600 transition-colors"
            >
              Home
            </a>
            <span>/</span>
            <span className="text-rose-600">Our Clients</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our <span className="text-rose-600">Clients</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Solar Tech Systems delivers reliable solar solutions, earning the trust and satisfaction of clients across commercial, industrial, and agricultural sectors.
          </p>
        </div>
      </section>

      {/* SECTOR COVERAGE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold tracking-wider uppercase text-sky-600 font-sans">
              Market Segments
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Delivered Projects Across Key Sectors
            </h2>
            <p className="text-sm text-slate-600">
              Custom power engineering designed to meet demanding operational profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {segments.map((seg, idx) => (
              <div
                key={idx}
                className="solar-glass-card p-6 rounded-2xl space-y-3 transition-all"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded">
                  {seg.label}
                </span>
                <h3 className="text-base font-bold text-slate-900">{seg.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{seg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70 border-y border-slate-200/60 relative overflow-hidden">
        {/* Subtle Background Waves SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <path d="M0,200 C300,50 600,350 900,100 T1200,200" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="8 6" />
            <path d="M0,250 C300,100 600,400 900,150 T1200,250" fill="none" stroke="#fb7185" strokeWidth="1.2" strokeDasharray="6 8" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-rose-600 font-sans">
              Client Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Customer Feedback &amp; Shared Experiences
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-rose-400 to-sky-400 mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-slate-600">
              A few words from the businesses and homeowners we have worked with across Karnataka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="solar-glass-card p-8 rounded-2xl flex flex-col justify-between space-y-6 transition-all"
              >
                <div className="space-y-3">
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    Verified Project Delivery
                  </div>
                  <blockquote className="text-sm sm:text-base text-slate-700 italic leading-relaxed">
                    "{t.quote}"
                  </blockquote>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full border border-slate-200"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background SVG Sun Flare Accent */}
        <div className="absolute inset-0 pointer-events-none opacity-25" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
            <path d="M 0 150 Q 400 0 800 150" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M 0 200 Q 400 50 800 200" fill="none" stroke="#fb7185" strokeWidth="1.5" strokeDasharray="8 8" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Want to see our work?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Get in touch and we will share details of completed projects in your segment.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="contact-us.html"
              onClick={(e) => { e.preventDefault(); onNavigate('contact-us.html'); }}
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-md transition-all"
            >
              <span>Enquire Now &rarr;</span>
            </a>
            <a
              href={SITE_INFO.phoneHref}
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold text-slate-200 border border-slate-600 hover:bg-slate-800 transition-all"
            >
              <span>Call: {SITE_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
