import React, { useState } from 'react';
import { SERVICES, SITE_INFO } from '../data/siteData';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isScrolled: boolean;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, isScrolled, theme = 'light', onToggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === 'solartechsystems.html' && (currentPath === 'solartechsystems.html' || currentPath === '/' || currentPath === '')) {
      return true;
    }
    return currentPath.includes(path);
  };

  const isServiceActive = SERVICES.some(s => currentPath.includes(s.file));

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Utility Bar - Fresh Solar Gradient & Crisp Social Media SVG Icons */}
      <div className={`w-full bg-gradient-to-r from-sky-600 via-sky-700 to-rose-600 text-white transition-all duration-300 border-b border-white/15 shadow-xs ${isScrolled ? 'py-1 text-xs' : 'py-2 text-xs md:text-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sky-50 font-medium">
            <a 
              href={SITE_INFO.phoneHref} 
              className="hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded px-1"
            >
              <span>Tel: {SITE_INFO.phone}</span>
            </a>
            <a 
              href={`mailto:${SITE_INFO.email}`} 
              className="hidden sm:inline-block hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded px-1"
            >
              <span>{SITE_INFO.email}</span>
            </a>
            <div className="hidden lg:inline-block text-sky-100/90">
              <span>{SITE_INFO.location}</span>
            </div>
          </div>

          {/* Social Links & Trust Tag */}
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline-block text-sky-100 font-medium tracking-wide">
              ISO Certified Solar &amp; Power EPC
            </span>
            <div className="flex items-center gap-2.5 text-white/90">
              {/* Facebook */}
              <a 
                href="#" 
                aria-label="Facebook" 
                className="w-7 h-7 rounded-full flex items-center justify-center bg-white/15 hover:bg-white hover:text-sky-700 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a 
                href="#" 
                aria-label="X (Twitter)" 
                className="w-7 h-7 rounded-full flex items-center justify-center bg-white/15 hover:bg-white hover:text-slate-900 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="#" 
                aria-label="YouTube" 
                className="w-7 h-7 rounded-full flex items-center justify-center bg-white/15 hover:bg-white hover:text-rose-600 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="#" 
                aria-label="LinkedIn" 
                className="w-7 h-7 rounded-full flex items-center justify-center bg-white/15 hover:bg-white hover:text-sky-700 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.67-.75 1.67-1.67A1.67 1.67 0 0 0 6.46 5.42a1.67 1.67 0 0 0-1.67 1.67c0 .92.75 1.67 1.67 1.67M5.07 18.5h2.79v-8.37H5.07v8.37z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Completely transparent when unscrolled, sits directly beneath the top gradient bar over the hero section */}
      <div 
        className={`w-full transition-all duration-300 absolute top-full left-0 right-0 ${
          isScrolled || mobileMenuOpen
            ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200/80 dark:border-slate-800' 
            : 'bg-transparent py-3 sm:py-4 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark / Logo */}
          <a
            href="solartechsystems.html"
            onClick={(e) => handleNavClick(e, 'solartechsystems.html')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded-lg p-1"
          >
            <div className="relative flex items-center p-1 rounded-lg dark:bg-white/10 transition-colors">
              <img
                src="/images/logo.png"
                alt="Solar Tech Systems"
                className={`w-auto object-contain transition-all duration-300 dark:brightness-125 dark:contrast-115 ${isScrolled ? 'h-9 sm:h-10' : 'h-11 sm:h-12'}`}
              />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <a
              href="solartechsystems.html"
              onClick={(e) => handleNavClick(e, 'solartechsystems.html')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                isActive('solartechsystems.html')
                  ? 'text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/50 font-semibold shadow-2xs'
                  : 'text-slate-700 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
              }`}
            >
              Home
            </a>

            <a
              href="about-us.html"
              onClick={(e) => handleNavClick(e, 'about-us.html')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                isActive('about-us.html')
                  ? 'text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/50 font-semibold shadow-2xs'
                  : 'text-slate-700 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
              }`}
            >
              About Us
            </a>

            {/* Products / Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                aria-expanded={servicesDropdownOpen}
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isServiceActive
                    ? 'text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/50 font-semibold shadow-2xs'
                    : 'text-slate-700 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                }`}
              >
                <span>Products / Services</span>
              </button>

              {/* Sub-menu panel */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-72 pt-2 z-50">
                  <div className="p-2 bg-white dark:bg-black rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 ring-1 ring-black/5 dark:ring-white/10 animate-in fade-in slide-in-from-top-2 duration-150">
                    {SERVICES.map((s) => (
                      <a
                        key={s.slug}
                        href={s.file}
                        onClick={(e) => handleNavClick(e, s.file)}
                        className={`flex flex-col p-2.5 rounded-lg text-sm transition-colors ${
                          currentPath.includes(s.file)
                            ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 font-medium'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-sky-950/50 hover:text-sky-900 dark:hover:text-sky-200'
                        }`}
                      >
                        <span className="font-medium text-slate-800 dark:text-slate-100">{s.title}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{s.desc}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a
              href="our-clients.html"
              onClick={(e) => handleNavClick(e, 'our-clients.html')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                isActive('our-clients.html')
                  ? 'text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/50 font-semibold shadow-2xs'
                  : 'text-slate-700 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
              }`}
            >
              Our Clients
            </a>

            <a
              href="gallery-blog.html"
              onClick={(e) => handleNavClick(e, 'gallery-blog.html')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                isActive('gallery-blog.html')
                  ? 'text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/50 font-semibold shadow-2xs'
                  : 'text-slate-700 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
              }`}
            >
              Gallery / Blog
            </a>
          </nav>

          {/* Action Zone: Primary CTA, Raw Black Theme Toggle & Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Raw Black / Light Theme Toggle */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to raw black dark mode"}
                title={theme === 'dark' ? "Light Mode" : "Raw Black Dark Mode"}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-300/80 dark:border-sky-400/40 bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-sky-300 shadow-xs hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5 text-amber-400 animate-in spin-in-180 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                ) : (
                  <svg className="w-4.5 h-4.5 text-slate-800 animate-in spin-in-180 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" fillOpacity="0.15" />
                  </svg>
                )}
              </button>
            )}

            <a
              href="contact-us.html"
              onClick={(e) => handleNavClick(e, 'contact-us.html')}
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 whitespace-nowrap"
            >
              <span>Contact Us</span>
            </a>

            {/* Mobile menu text button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-black/70 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 dark:bg-black/98 backdrop-blur-xl border-t border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Theme Mode
              </span>
              {onToggleTheme && (
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-sky-300 border border-slate-200 dark:border-slate-800"
                >
                  {theme === 'dark' ? '☀️ Switch to Light' : '🌙 Switch to Raw Black'}
                </button>
              )}
            </div>
            <nav className="flex flex-col space-y-1">
              <a
                href="solartechsystems.html"
                onClick={(e) => handleNavClick(e, 'solartechsystems.html')}
                className={`px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive('solartechsystems.html') ? 'bg-rose-50 text-rose-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Home
              </a>
              <a
                href="about-us.html"
                onClick={(e) => handleNavClick(e, 'about-us.html')}
                className={`px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive('about-us.html') ? 'bg-rose-50 text-rose-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                About Us
              </a>

              {/* Mobile Submenu for Services */}
              <div className="pt-2 pb-1 border-y border-slate-100">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Products / Services
                </div>
                <div className="pl-2 space-y-1">
                  {SERVICES.map((s) => (
                    <a
                      key={s.slug}
                      href={s.file}
                      onClick={(e) => handleNavClick(e, s.file)}
                      className={`block px-3 py-2 rounded-lg text-sm ${
                        currentPath.includes(s.file)
                          ? 'bg-rose-50 text-rose-600 font-medium'
                          : 'text-slate-600 hover:bg-sky-50 hover:text-sky-900'
                      }`}
                    >
                      {s.title}
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="our-clients.html"
                onClick={(e) => handleNavClick(e, 'our-clients.html')}
                className={`px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive('our-clients.html') ? 'bg-rose-50 text-rose-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Our Clients
              </a>
              <a
                href="gallery-blog.html"
                onClick={(e) => handleNavClick(e, 'gallery-blog.html')}
                className={`px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive('gallery-blog.html') ? 'bg-rose-50 text-rose-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Gallery / Blog
              </a>
              <a
                href="contact-us.html"
                onClick={(e) => handleNavClick(e, 'contact-us.html')}
                className={`px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive('contact-us.html') ? 'bg-rose-50 text-rose-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Contact Us
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
