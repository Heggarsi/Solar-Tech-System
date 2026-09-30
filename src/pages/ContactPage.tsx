import React, { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { SITE_INFO } from '../data/siteData';
import { ROUTES } from '../content/site';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim()) {
      setError('Please fill out all required fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-paper">
      {/* PAGE HERO with Regional Grid Node & High-Visibility SVG Pattern */}
      <PageHero
        chapter="Chapter 07 — Dusk"
        crumbs={[
          { label: 'Home', path: ROUTES.home },
          { label: 'Contact Us' },
        ]}
        titleLines={['Get In Touch With Us']}
        accent="With Us"
        lead="Reach out to us through the enquiry form or contact details provided below. We are here to assist with any questions or provide more information about our products and services."
        onNavigate={onNavigate}
      />

      {/* CONTACT INFO & FORM SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Contact Details List */}
          <div className="lg:col-span-5 space-y-6">
            <div className="solar-glass-card p-8 rounded-2xl space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                Headquarters &amp; Direct Enquiries
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</h3>
                  <a href={SITE_INFO.phoneHref} className="text-lg font-bold text-slate-900 hover:text-rose-600 transition-colors block mt-0.5">
                    {SITE_INFO.phone}
                  </a>
                  <div className="text-xs text-slate-500 mt-1">
                    Alternate: <a href="tel:+918945361784" className="hover:text-slate-800">+91 8945361784</a>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</h3>
                  <a href={`mailto:${SITE_INFO.email}`} className="text-lg font-bold text-slate-900 hover:text-sky-600 transition-colors block mt-0.5">
                    {SITE_INFO.email}
                  </a>
                  <div className="text-xs text-slate-500 mt-1">
                    Desk: <a href="mailto:info@sts.in" className="hover:text-slate-800">info@sts.in</a>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</h3>
                  <p className="text-lg font-bold text-slate-900 mt-0.5">
                    Bangalore Karanataka
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Karnataka, India</p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Working Hours</h3>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">{SITE_INFO.hours}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Emergency grid support available 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 solar-glass-card p-8 sm:p-10 rounded-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                  Confirmation Received
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Sent Successfully</h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out, <span className="font-semibold text-slate-800">{formData.name}</span>. A Solar Tech Systems engineering consultant will review your specifications and contact you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', mobile: '', message: '' });
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Project Enquiry &amp; Technical Support
                </h2>

                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm text-slate-900 bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@domain.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm text-slate-900 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-mobile" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="contact-mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    placeholder="+91 77607 77162"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm text-slate-900 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your site details, power demand (kW/MW), or transmission line requirement..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm text-slate-900 bg-white resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-md transition-all cursor-pointer"
                >
                  <span>Send Message &rarr;</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Google Map Section */}
        <div className="max-w-7xl mx-auto mt-16 solar-glass-card p-3 rounded-2xl relative z-10">
          <iframe
            title="Solar Tech Systems location - Bangalore, Karnataka"
            src={SITE_INFO.mapEmbed}
            className="w-full h-80 sm:h-96 rounded-xl border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="pt-3 px-2 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
            <span>Corporate office in Bangalore, Karnataka. Serving projects state-wide.</span>
            <a
              href={SITE_INFO.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:text-rose-700 font-medium"
            >
              View on Google Maps &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
