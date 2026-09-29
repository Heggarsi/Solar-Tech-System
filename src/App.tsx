import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollSun } from './components/ScrollSun';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { BackToTop } from './components/BackToTop';
import { AttractiveBackground } from './components/AttractiveBackground';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicePage } from './pages/ServicePage';
import { ClientsPage } from './pages/ClientsPage';
import { GalleryBlogPage } from './pages/GalleryBlogPage';
import { ContactPage } from './pages/ContactPage';

import { SERVICES } from './data/siteData';

export default function App() {
  // Normalize current path from window.location
  const getInitialPath = () => {
    if (typeof window === 'undefined') return 'solartechsystems.html';
    const path = window.location.pathname.replace(/^\//, '');
    if (!path || path === '' || path === 'index.html') return 'solartechsystems.html';
    return path;
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Raw Black Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('solartech_theme');
      if (stored === 'dark' || stored === 'light') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Apply dark theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('solartech_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('solartech_theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Synchronize with browser history (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname.replace(/^\//, '') || 'solartechsystems.html';
      setCurrentPath(p);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll tracking for Sun, Progress Bar, and Navbar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      const progress = totalHeight > 0 ? Math.min(Math.max(currentScroll / totalHeight, 0), 1) : 0;
      setScrollProgress(progress);
      setIsScrolled(currentScroll > 30);
      setShowBackToTop(currentScroll > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  // Navigate function with URL updates
  const handleNavigate = (path: string) => {
    // If it is an anchor link on home
    if (path.startsWith('#') || path.includes('#')) {
      const parts = path.split('#');
      const targetPage = parts[0] || 'solartechsystems.html';
      const targetId = parts[1];

      if (currentPath !== targetPage && (currentPath !== 'solartechsystems.html' || targetPage !== '')) {
        setCurrentPath(targetPage);
        window.history.pushState(null, '', `/${targetPage}`);
      }
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    setCurrentPath(path);
    window.history.pushState(null, '', `/${path}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resolve matching page view
  const renderCurrentPage = () => {
    // Check services
    const matchedService = SERVICES.find(s => currentPath.includes(s.file) || currentPath.includes(s.slug));
    if (matchedService) {
      return <ServicePage service={matchedService} onNavigate={handleNavigate} />;
    }

    if (currentPath.includes('about-us')) {
      return <AboutPage onNavigate={handleNavigate} />;
    }

    if (currentPath.includes('our-clients')) {
      return <ClientsPage onNavigate={handleNavigate} />;
    }

    if (currentPath.includes('gallery-blog')) {
      return <GalleryBlogPage onNavigate={handleNavigate} />;
    }

    if (currentPath.includes('contact-us')) {
      return <ContactPage onNavigate={handleNavigate} />;
    }

    // Default to Home
    return <HomePage onNavigate={handleNavigate} />;
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans selection:bg-rose-100 selection:text-rose-900 bg-canvas">
      {/* Continuous ambient moving gradient background mesh */}
      <div className="ambient-mesh-bg" aria-hidden="true" />

      {/* Attractive Multilayered SVG Animations (Waves, Solar Orbitals, Grid, Particles) */}
      <AttractiveBackground scrollProgress={scrollProgress} />

      {/* Top Scroll Progress Bar */}
      <ScrollProgressBar progress={scrollProgress} />

      {/* Scroll-Linked Travelling Sun Animation */}
      <ScrollSun scrollProgress={scrollProgress} />

      {/* Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        isScrolled={isScrolled}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Page Content - Hero section begins directly beneath top gradient bar with 0 gap */}
      <main id="main" className="flex-1 w-full relative z-10">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Back to Top Button */}
      <BackToTop show={showBackToTop} />
    </div>
  );
}
