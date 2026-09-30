import React from 'react';
import { PageHero } from '../components/PageHero';
import { SERVICES, WHY_CHOOSE_ITEMS, SITE_INFO } from '../data/siteData';
import { routePath, ROUTES } from '../content/site';
import { ServiceItem } from '../types';

interface ServicePageProps {
  service: ServiceItem;
  onNavigate: (path: string) => void;
}

export const ServicePage: React.FC<ServicePageProps> = ({ service, onNavigate }) => {
  const otherServices = SERVICES.filter(s => s.slug !== service.slug);

  return (
    <div className="relative w-full overflow-x-hidden bg-paper">
      {/* SERVICE PAGE HERO with High-Visibility SVG Pattern & Vectors */}
      <PageHero
        chapter="Chapter 03 — Capabilities"
        crumbs={[
          { label: 'Home', path: ROUTES.home },
          { label: 'Products / Services' },
          { label: service.title },
        ]}
        titleLines={[service.title]}
        lead={service.desc}
        onNavigate={onNavigate}
      />

      {/* OVERVIEW & HIGHLIGHTS — photograph on the left, capabilities on the right */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          <div className="lg:col-span-4">
            <div className="rounded-2xl overflow-hidden shadow-md solar-glass-card p-2">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-80 sm:h-96 object-cover rounded-xl"
              />
            </div>
          </div>

          <div className="lg:col-span-8 solar-glass-card p-8 sm:p-12 rounded-2xl space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold">
              Technical Capabilities
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Overview
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {service.desc}
            </p>

            {/* Feature Checklist */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 font-sans">
                Key Engineering Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="text-sm text-slate-700 pl-4 border-l-2 border-sky-400">
                    {feat}
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 font-sans">
                Specifications &amp; Compliance Standards
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {service.specs.map((sp, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl solar-glass-card">
                    <div className="text-xs text-slate-500">{sp.label}</div>
                    <div className="text-sm font-bold text-slate-800 mt-1">{sp.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER PRODUCTS AND SERVICES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70 border-y border-slate-200/60 relative overflow-hidden">
        {/* Subtle Background SVG Accents */}
        <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
            <path d="M0,150 Q250,50 500,200 T1000,100" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 6" />
            <path d="M0,250 Q250,150 500,300 T1000,200" fill="none" stroke="#fb7185" strokeWidth="1.2" strokeDasharray="8 8" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="space-y-6 max-w-3xl">
            <span className="text-xs font-semibold tracking-wider uppercase text-sky-600 font-sans">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Other Products and Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore our full suite of renewable energy solutions and turnkey medium/high-voltage electrical power infrastructure.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {otherServices.map((other) => (
                <a
                  key={other.slug}
                  href={routePath(other.slug)}
                  onClick={(e) => { e.preventDefault(); onNavigate(other.slug); }}
                  className="inline-flex items-center px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-slate-800 bg-white border border-slate-200 hover:border-rose-400 hover:text-rose-600 shadow-sm transition-all"
                >
                  <span>{other.title} &rarr;</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SOLAR TECH SYSTEMS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-rose-600 font-sans">
              Certified Assurance
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Why Choose <span className="text-sky-600">Solar Tech Systems</span> ?
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-rose-400 to-sky-400 mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-slate-600">
              At Solar Tech Systems, we are committed to delivering the highest standards of quality and service. Here is why you can trust us for your solar energy and power infrastructure solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHY_CHOOSE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="solar-glass-card p-8 rounded-2xl transition-all text-center flex flex-col items-center space-y-4"
              >
                <div className="px-3.5 py-1 rounded-full text-xs font-bold text-sky-700 bg-sky-50 border border-sky-100 uppercase tracking-wider">
                  {item.badge}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
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
            Enquire about {service.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Share your project details and our team will respond with design and delivery options.
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
