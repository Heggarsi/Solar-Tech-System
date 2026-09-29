import React from 'react';
import { SITE_INFO } from '../data/siteData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Solar Tech Systems"
                className="h-10 sm:h-12 w-auto bg-white/95 rounded-lg px-2 py-1 object-contain"
              />
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md">
              Solar Tech Systems, incorporated in the year 2016 have established ourselves as a leading supplier of quality assured range of solar products.
            </p>
            <div className="pt-1 flex items-center gap-3 text-xs text-slate-400">
              <span className="px-3 py-1 rounded-full bg-slate-800/80 text-sky-300 border border-slate-700/60 font-medium">
                ISO Certified Company
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 text-rose-300 border border-slate-700/60 font-medium">
                CPRI Approved
              </span>
            </div>
          </div>

          {/* Quick Links / Our Products */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase font-sans">
              Our Products &amp; Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="solar-power-plant.html"
                  onClick={(e) => handleNavClick(e, 'solar-power-plant.html')}
                  className="hover:text-sky-300 transition-colors inline-block"
                >
                  Solar Power Plants
                </a>
              </li>
              <li>
                <a
                  href="solar-rooftop.html"
                  onClick={(e) => handleNavClick(e, 'solar-rooftop.html')}
                  className="hover:text-sky-300 transition-colors inline-block"
                >
                  Solar Rooftop
                </a>
              </li>
              <li>
                <a
                  href="33kv-transmission-line.html"
                  onClick={(e) => handleNavClick(e, '33kv-transmission-line.html')}
                  className="hover:text-sky-300 transition-colors inline-block"
                >
                  33 kV Transmission Line
                </a>
              </li>
              <li>
                <a
                  href="33-11kv-substation-uss.html"
                  onClick={(e) => handleNavClick(e, '33-11kv-substation-uss.html')}
                  className="hover:text-sky-300 transition-colors inline-block"
                >
                  33 / 11 kV Substation (USS)
                </a>
              </li>
              <li className="text-slate-400">Solar Street Light</li>
              <li className="text-slate-400">Solar Irrigation System</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase font-sans">
              Contact Information
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="text-slate-300">
                <div className="text-xs text-slate-400 uppercase tracking-wider">Phone</div>
                <div className="mt-0.5">
                  <a href={`tel:+918945361784`} className="hover:text-rose-300 font-medium transition-colors">
                    +91 8945361784
                  </a>
                  <span className="mx-2 text-slate-600">/</span>
                  <a href={SITE_INFO.phoneHref} className="hover:text-rose-300 transition-colors">
                    {SITE_INFO.phone}
                  </a>
                </div>
              </li>
              <li className="text-slate-300">
                <div className="text-xs text-slate-400 uppercase tracking-wider">Email</div>
                <div className="mt-0.5">
                  <a href="mailto:info@sts.in" className="hover:text-sky-300 transition-colors">
                    info@sts.in
                  </a>
                  <span className="mx-2 text-slate-600">/</span>
                  <a href={`mailto:${SITE_INFO.email}`} className="hover:text-sky-300 transition-colors">
                    {SITE_INFO.email}
                  </a>
                </div>
              </li>
              <li className="text-slate-300">
                <div className="text-xs text-slate-400 uppercase tracking-wider">Address</div>
                <p className="text-slate-300 mt-0.5">Bangalore, Karanataka, India</p>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; 2025 Solar Tech Systems. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>
              Designed By{' '}
              <a
                href="solartechsystems.html"
                onClick={(e) => handleNavClick(e, 'solartechsystems.html')}
                className="text-rose-400 hover:text-rose-300 hover:underline font-medium"
              >
                Taarruni
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
