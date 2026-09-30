import React from 'react';
import { PageHero } from '../components/PageHero';
import { SITE_INFO } from '../data/siteData';
import { ROUTES, routePath } from '../content/site';

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
    <div className="relative w-full overflow-x-hidden bg-paper">
      {/* PAGE HERO with Concentric Solar Arcs & High-Visibility SVG Pattern */}
      <PageHero
        chapter="Chapter 04 — The People"
        crumbs={[
          { label: 'Home', path: ROUTES.home },
          { label: 'Our Clients' },
        ]}
        titleLines={['Our Clients']}
        accent="Clients"
        lead="Solar Tech Systems delivers reliable solar solutions, earning the trust and satisfaction of clients across commercial, industrial, and agricultural sectors."
        onNavigate={onNavigate}
      />

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
              href={routePath(ROUTES.contact)}
              onClick={(e) => { e.preventDefault(); onNavigate(ROUTES.contact); }}
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
