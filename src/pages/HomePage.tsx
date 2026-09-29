import React, { useState } from 'react';
import { SERVICES, WHY_CHOOSE_ITEMS, TESTIMONIALS, SITE_INFO } from '../data/siteData';
import { HeroSvgPattern } from '../components/HeroSvgPattern';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };
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
    <div className="relative w-full overflow-hidden">
      {/* HERO SECTION - Extends seamlessly under transparent logo & menu bar */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* High-Visibility Solar Geometric SVG Pattern & Radiant Burst Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden [contain:paint]" aria-hidden="true">
          {/* Distinct Crystalline Photovoltaic Pattern for Hero - Highly Visible */}
          <HeroSvgPattern opacity={0.65} />

          {/* Radiant Solar Burst Glow */}
          <svg className="absolute -top-12 left-1/2 w-[1100px] h-[750px] opacity-40 animate-pulse will-change-opacity [transform:translate3d(-50%,0,0)] [backface-visibility:hidden]" viewBox="0 0 1000 700">
            <defs>
              <radialGradient id="heroSunGlow" cx="50%" cy="20%" r="65%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                <stop offset="45%" stopColor="#fb7185" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="500" cy="140" r="420" fill="url(#heroSunGlow)" />
            {/* Radiant Solar Arcs */}
            <path d="M 150 550 Q 500 50 850 550" fill="none" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="1.5" strokeDasharray="8 6" />
            <path d="M 220 580 Q 500 120 780 580" fill="none" stroke="rgba(244, 63, 94, 0.25)" strokeWidth="1.2" strokeDasharray="6 8" />
            <path d="M 290 610 Q 500 190 710 610" fill="none" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto w-full text-center flex flex-col items-center space-y-8 relative z-10">
          
          <div className="inline-block px-4 py-1.5 rounded-full bg-rose-50/90 border border-rose-200/80 text-rose-700 text-xs sm:text-sm font-medium backdrop-blur-sm shadow-xs">
            Leading Renewable &amp; Power Infrastructure EPC
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-3xl">
            Powering a Sustainable Future with{' '}
            <span className="bg-gradient-to-r from-sky-600 via-rose-500 to-rose-600 bg-clip-text text-transparent">
              Solar Innovation
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
            Since 2016, Solar Tech Systems has been a trusted provider of high-quality solar solutions, offering solar fencing, street lights, water heaters, irrigation pumps, and turnkey megawatt plants across Karnataka.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="contact-us.html"
              onClick={(e) => { e.preventDefault(); onNavigate('contact-us.html'); }}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Enquire Now &rarr;</span>
            </a>

            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-semibold text-slate-700 bg-white/90 hover:bg-sky-50 hover:text-sky-700 border border-slate-200 shadow-sm transition-all duration-200"
            >
              <span>What We Offer</span>
            </a>
          </div>

          {/* Micro stats banner */}
          <div className="pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-6 max-w-xl mx-auto w-full text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">2016</div>
              <div className="text-xs sm:text-sm text-slate-500">Established In</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-sky-600 font-display">33 kV</div>
              <div className="text-xs sm:text-sm text-slate-500">Grid Substation EPC</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-rose-600 font-display">100%</div>
              <div className="text-xs sm:text-sm text-slate-500">Quality Certified</div>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/80 border-y border-slate-200/60 relative overflow-hidden scroll-mt-28">
        {/* Subtle Background SVG Wave Accents */}
        <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <path d="M0,80 C300,160 600,20 900,120 C1050,170 1150,100 1200,90" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 6" />
            <path d="M0,180 C350,260 700,110 1000,210 C1120,250 1180,200 1200,190" fill="none" stroke="#fb7185" strokeWidth="1.2" strokeDasharray="8 8" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold tracking-wider uppercase text-rose-600 font-sans">
              About Solartech Systems
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Leading the Clean Energy Transition Across Karnataka
            </h2>
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Solar Tech Systems, incorporated in the year 2011 have established ourselves as a leading supplier of quality assured range of solar products such as Solar Power Fencing, Solar Street Lights, Solar Water Heaters, Solar Irrigation Pump, Solar Power Plant and Roof structures etc.
              </p>
              <p>
                All these products are designed by our well-trained professionals using high grade material in accordance with the industry standards. We are the market leaders in delivering high quality technology Solar Products and Service to our esteemed clients pan Karnataka.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="about-us.html"
                onClick={(e) => { e.preventDefault(); onNavigate('about-us.html'); }}
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <span>Read More &rarr;</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg solar-glass-card p-2">
              <img
                src="/images/about-solar.jpg"
                alt="Solar Tech Systems solar installation and engineering team"
                className="w-full h-auto object-cover rounded-xl"
              />
              <div className="p-4 bg-slate-50/90 rounded-lg mt-2 text-xs text-slate-500 flex items-center justify-between">
                <span>Certified Engineering Standards</span>
                <span className="text-rose-600 font-medium">Pan-Karnataka Operations</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* WHAT WE OFFER / PRODUCTS & SERVICES */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-28">
        {/* Background SVG Geometric Energy Wave */}
        <div className="absolute inset-0 pointer-events-none opacity-25" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <path d="M-50,300 Q300,50 600,320 T1250,280" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="10 8" />
            <path d="M-50,380 Q350,150 700,420 T1250,360" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="8 6" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-sky-600 font-sans">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              What <span className="text-rose-600">We Offer</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-rose-400 mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-slate-600">
              End-to-end solar solutions, commercial rooftops, high-voltage transmission lines, and compact substations.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {SERVICES.map((service, index) => (
              <div
                key={service.slug}
                className="group relative flex flex-col solar-glass-card rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white px-2.5 py-1 rounded bg-black/40 backdrop-blur-sm">
                    0{index + 1}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href={service.file}
                      onClick={(e) => { e.preventDefault(); onNavigate(service.file); }}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                    >
                      Read More &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY CHOOSE SOLAR TECH SYSTEMS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70 border-y border-slate-200/60 relative overflow-hidden">
        {/* Background SVG Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="whyPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.2" fill="#0284c7" />
                <path d="M 0 20 L 40 20 M 20 0 L 20 40" stroke="rgba(244, 63, 94, 0.15)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#whyPattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-rose-600 font-sans">
              Trust &amp; Certification
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
                <h3 className="text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Ripple Arcs SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center" aria-hidden="true">
          <svg width="800" height="400" viewBox="0 0 800 400">
            <ellipse cx="400" cy="200" rx="350" ry="160" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="8 8" />
            <ellipse cx="400" cy="200" rx="250" ry="110" fill="none" stroke="#fb7185" strokeWidth="1" strokeDasharray="6 6" />
            <ellipse cx="400" cy="200" rx="150" ry="65" fill="none" stroke="#0ea5e9" strokeWidth="1" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto space-y-10 relative z-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold tracking-wider uppercase text-sky-600 font-sans">
              Feedback &amp; Reputation
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Customer Feedback &amp; Shared Experiences
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              A few words from the businesses and homeowners we have worked with across Karnataka.
            </p>
          </div>

          {/* Carousel Layout with Left / Right Navigation */}
          <div className="relative flex items-center justify-center gap-3 sm:gap-6">
            {/* Left Carousel Navigation Button */}
            <button
              type="button"
              onClick={prevTestimonial}
              aria-label="Previous customer feedback"
              className="z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center solar-glass-card text-slate-700 hover:text-rose-600 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer shrink-0"
            >
              <span className="text-xl sm:text-2xl font-bold leading-none select-none" aria-hidden="true">&larr;</span>
            </button>

            {/* Main Carousel Card */}
            <div className="flex-1 max-w-3xl relative solar-glass-card rounded-2xl p-6 sm:p-10 shadow-lg overflow-hidden transition-all duration-300">
              {/* Carousel Slide Header / Counter */}
              <div className="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-100/70 mb-6">
                <span className="font-semibold text-rose-600 uppercase tracking-wider">
                  Verified Client Review
                </span>
                <span className="font-mono text-slate-500 font-medium">
                  {String(activeTestimonial + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
                </span>
              </div>

              <blockquote className="text-base sm:text-lg text-slate-800 italic leading-relaxed text-center min-h-[110px] flex items-center justify-center px-2 sm:px-6">
                "{TESTIMONIALS[activeTestimonial].quote}"
              </blockquote>

              <div className="mt-8 pt-6 border-t border-slate-100/70 flex items-center justify-center gap-4">
                <img
                  src={TESTIMONIALS[activeTestimonial].avatar}
                  alt={TESTIMONIALS[activeTestimonial].name}
                  className="w-12 h-12 rounded-full border-2 border-rose-300 shadow-sm object-cover"
                />
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-sm sm:text-base">
                    {TESTIMONIALS[activeTestimonial].name}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500">
                    {TESTIMONIALS[activeTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Carousel Navigation Button */}
            <button
              type="button"
              onClick={nextTestimonial}
              aria-label="Next customer feedback"
              className="z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center solar-glass-card text-slate-700 hover:text-rose-600 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer shrink-0"
            >
              <span className="text-xl sm:text-2xl font-bold leading-none select-none" aria-hidden="true">&rarr;</span>
            </button>
          </div>

          {/* Bottom Dot Indicators */}
          <div className="flex justify-center items-center gap-2 pt-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Go to feedback slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeTestimonial 
                    ? 'w-8 bg-gradient-to-r from-sky-500 to-rose-500 shadow-xs' 
                    : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* GET IN TOUCH / CONTACT SECTION */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50 dark:from-[#0b0c10] dark:via-[#070709] dark:to-black border-t border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden scroll-mt-28">
        {/* Decorative Grid & Contour SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <path d="M0,50 Q250,200 500,80 T1000,180" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="6 6" />
            <path d="M0,250 Q300,100 600,280 T1000,220" fill="none" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="8 8" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-rose-600 font-sans">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Get In Touch <span className="text-sky-600">With Us</span>
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-rose-400 to-sky-400 mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-slate-600">
              Reach out to us through the enquiry form or contact details provided below. We are here to assist with any questions or provide more information about our products and services.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Contact Details List */}
            <div className="lg:col-span-5 space-y-6 solar-glass-card p-6 sm:p-8 rounded-2xl">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Corporate Office &amp; Support
              </h3>

              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</h4>
                  <a href={SITE_INFO.phoneHref} className="text-base font-bold text-slate-800 hover:text-rose-600 transition-colors">
                    {SITE_INFO.phone}
                  </a>
                  <div className="text-xs text-slate-500 mt-0.5">Alt: +91 8945361784</div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</h4>
                  <a href={`mailto:${SITE_INFO.email}`} className="text-base font-bold text-slate-800 hover:text-sky-600 transition-colors">
                    {SITE_INFO.email}
                  </a>
                  <div className="text-xs text-slate-500 mt-0.5">Alt: info@sts.in</div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</h4>
                  <p className="text-base font-bold text-slate-800">
                    Bangalore, Karnataka, India
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Operations Pan Karnataka</p>
                </div>
              </div>
            </div>

            {/* Interactive Enquiry Form */}
            <div className="lg:col-span-7 solar-glass-card p-6 sm:p-8 rounded-2xl">
              {formSubmitted ? (
                <div className="p-8 text-center space-y-4">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                    Confirmation Received
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Enquiry Submitted Successfully</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <span className="font-semibold">{formData.name}</span>. Our solar engineering team will review your project requirements and contact you within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', mobile: '', message: '' });
                    }}
                    className="mt-4 px-6 py-2 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="home-name" className="text-xs font-medium text-slate-700 uppercase tracking-wider">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="home-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm text-slate-800"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="home-email" className="text-xs font-medium text-slate-700 uppercase tracking-wider">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="home-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm text-slate-800"
                        placeholder="you@domain.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="home-mobile" className="text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="home-mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm text-slate-800"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="home-message" className="text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Message / Project Details
                    </label>
                    <textarea
                      id="home-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm text-slate-800 resize-y"
                      placeholder="Please mention your required capacity, rooftop type, or location..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    Send Enquiry &rarr;
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Embedded Map */}
          <div className="rounded-2xl overflow-hidden solar-glass-card p-3">
            <iframe
              title="Solar Tech Systems location - Bangalore, Karnataka"
              src={SITE_INFO.mapEmbed}
              className="w-full h-80 sm:h-96 rounded-xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="pt-3 px-2 flex justify-between items-center text-xs text-slate-500">
              <span>Headquartered in Bangalore, serving commercial &amp; industrial clients across Karnataka.</span>
              <a
                href={SITE_INFO.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-600 hover:text-rose-700 font-medium"
              >
                Open in Google Maps &rarr;
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
