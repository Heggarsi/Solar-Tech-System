import React from 'react';
import { WHY_CHOOSE_ITEMS, SITE_INFO } from '../data/siteData';
import { HeroSvgPattern } from '../components/HeroSvgPattern';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full relative overflow-hidden">
      {/* PAGE HERO with High-Visibility SVG Pattern & Celestial Solar Arcs */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-50/90 via-white to-white border-b border-slate-200/60 overflow-hidden">
        {/* Soft, delicate Crystalline Photovoltaic SVG Pattern */}
        <HeroSvgPattern opacity={0.18} />

        {/* Layered Celestial Solar Arcs Background SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-35 overflow-hidden" aria-hidden="true">
          <svg className="absolute -top-10 -right-10 w-[700px] h-[500px]" viewBox="0 0 700 500">
            <defs>
              <linearGradient id="aboutArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fb7185" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <circle cx="550" cy="100" r="320" fill="none" stroke="url(#aboutArcGrad)" strokeWidth="1.2" strokeDasharray="10 8" />
            <circle cx="550" cy="100" r="240" fill="none" stroke="rgba(244, 63, 94, 0.3)" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="550" cy="100" r="160" fill="none" stroke="rgba(14, 165, 233, 0.25)" strokeWidth="1.5" />
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
            <span className="text-rose-600">About Us</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            About <span className="text-rose-600">Solartech Systems</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Since 2016, Solar Tech Systems has been a trusted provider of high-quality solar solutions, offering solar fencing, street lights, water heaters, irrigation pumps, and more across Karnataka.
          </p>
        </div>
      </section>

      {/* OVERVIEW PROSE SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto solar-glass-card p-8 sm:p-12 rounded-2xl space-y-6 relative z-10">
          <div className="inline-block px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold">
            Company Overview &amp; Heritage
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Solar Tech Systems, incorporated in the year 2011 have established ourselves as a leading supplier of quality assured range of solar products such as Solar Power Fencing, Solar Street Lights, Solar Water Heaters, Solar Irrigation Pump, Solar Power Plant and Roof structures etc. All these products are designed by our well-trained professionals using high grade material in accordance with the industry standards. We are the market leaders in delivering high quality technology Solar Products and Service to our esteemed clients pan Karnataka.
          </p>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Solar Tech Systems, incorporated in the year 2016 have established ourselves as a leading supplier of quality assured range of solar products.
          </p>
        </div>
      </section>

      {/* WHAT WE DO SPLIT SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70 border-y border-slate-200/60 relative overflow-hidden">
        {/* Background SVG Wave Accent */}
        <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <path d="M-100,100 C300,300 700,50 1300,250" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="8 6" />
            <path d="M-100,200 C400,50 800,350 1300,150" fill="none" stroke="#fb7185" strokeWidth="1.5" strokeDasharray="6 8" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-md solar-glass-card p-2">
              <img
                src="/images/hero-slider.png"
                alt="Solar Tech Systems solar installation"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold tracking-wider uppercase text-rose-600 font-sans">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Quality Assured Solar Products
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Solar Power Fencing, Solar Street Lights, Solar Water Heaters, Solar Irrigation Pump, Solar Power Plant and Roof structures - designed by our well-trained professionals using high grade material in accordance with the industry standards.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="solartechsystems.html#services"
                onClick={(e) => { e.preventDefault(); onNavigate('solartechsystems.html'); }}
                className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 shadow-sm transition-all"
              >
                <span>What We Offer &rarr;</span>
              </a>

              <a
                href="contact-us.html"
                onClick={(e) => { e.preventDefault(); onNavigate('contact-us.html'); }}
                className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all"
              >
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-sky-600 font-sans">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Why Choose <span className="text-rose-600">Solar Tech Systems</span> ?
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-rose-400 mx-auto rounded-full" />
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
            Let us build your solar solution
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Tell us about your requirement and our team will get back to you with the right approach.
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
