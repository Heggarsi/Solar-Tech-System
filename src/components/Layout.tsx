import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SunLayer } from './SunLayer';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollProgress } from './motion/ScrollProgress';
import { CustomCursor } from './motion/CustomCursor';
import { RaysLoader } from './motion/RaysLoader';
import { PageTransition } from './motion/PageTransition';
import { useLenis } from '../hooks/useLenis';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ROUTES, ROUTE_META } from '../content/site';
import { ScrollTrigger } from '../lib/motion/gsap';

const HOME_PATH = `/${ROUTES.home}`;

/**
 * Root shell. Lenis and the sun layer are mounted HERE, above <Outlet />, so
 * both survive every route change and their ScrollTriggers are never torn down
 * and rebuilt on navigation.
 */
export const Layout: React.FC = () => {
  const location = useLocation();
  useLenis();

  const isHome = location.pathname === HOME_PATH || location.pathname === '/';
  const meta =
    ROUTE_META[location.pathname.replace(/^\//, '')] ?? ROUTE_META[ROUTES.home];

  useDocumentMeta(meta);

  // Trigger positions depend on image + font metrics, so rebuild once the
  // document has actually settled. Also handles bfcache restores.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    if (document.readyState === 'complete') {
      refresh();
    } else {
      window.addEventListener('load', refresh, { once: true });
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    window.addEventListener('popstate', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      window.removeEventListener('popstate', refresh);
    };
  }, [location.pathname]);

  // A route change swaps the whole <Outlet /> subtree, so every ScrollTrigger
  // created inside the outgoing page is now detached from the document. Refresh
  // on the next frame to recompute start/end positions against the new DOM.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col bg-ink-950 font-sans text-slate-100 antialiased">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* Scroll-linked sky + sun. Fixed, behind everything, persists across routes. */}
      <SunLayer variant={isHome ? 'home' : 'inner'} />

      <RaysLoader />
      <ScrollProgress />
      <CustomCursor />

      <Navbar />

      <PageTransition>
        <main id="main" className="relative z-10 w-full flex-1">
          <Outlet />
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};
