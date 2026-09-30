import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicePage } from './pages/ServicePage';
import { ClientsPage } from './pages/ClientsPage';
import { GalleryBlogPage } from './pages/GalleryBlogPage';
import { ContactPage } from './pages/ContactPage';
import { SERVICES, ROUTES, routePath, LEGACY_REDIRECTS } from './content/site';
import { useSiteNav } from './hooks/useSiteNav';

/*
 * The existing pages all take the same `onNavigate(path)` callback and address
 * each other by route slug. These thin adapters keep that contract intact so
 * none of the page content had to be rewritten just to introduce a real router.
 */
const withNav =
  <P extends { onNavigate: (path: string) => void }>(
    Component: React.FC<P>,
  ): React.FC<Partial<P>> => {
    const Adapter: React.FC<Partial<P>> = (props) => {
      const navigate = useSiteNav();
      return <Component {...(props as P)} onNavigate={navigate} />;
    };
    return Adapter;
  };

const Home = withNav(HomePage);
const About = withNav(AboutPage);
const Clients = withNav(ClientsPage);
const GalleryBlog = withNav(GalleryBlogPage);
const Contact = withNav(ContactPage);

const ServiceRoute: React.FC<{ slug: string }> = ({ slug }) => {
  const navigate = useSiteNav();
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return <Navigate to={routePath(ROUTES.home)} replace />;
  return <ServicePage service={service} onNavigate={navigate} />;
};

/** Every path the site answers on, in canonical slash-free form. */
const CANONICAL_PATHS: string[] = [
  ROUTES.home,
  ROUTES.about,
  ROUTES.clients,
  ROUTES.galleryBlog,
  ROUTES.contact,
  ...SERVICES.map((s) => s.slug),
].map(routePath);

/**
 * Catches everything the explicit routes above did not match, and separates two
 * cases: a real page reached with a stray trailing slash (folded back to its
 * canonical form, so each URL has exactly one rendering and one canonical tag),
 * versus a genuinely unknown URL (sent home).
 */
const Fallback: React.FC = () => {
  const { pathname } = useLocation();
  const trimmed = pathname.replace(/\/+$/, '');
  const isKnown = CANONICAL_PATHS.includes(trimmed);
  return (
    <Navigate to={isKnown ? trimmed || '/' : routePath(ROUTES.home)} replace />
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={routePath(ROUTES.home)} element={<Home />} />
          <Route path={routePath(ROUTES.about)} element={<About />} />
          <Route path={routePath(ROUTES.clients)} element={<Clients />} />
          <Route path={routePath(ROUTES.galleryBlog)} element={<GalleryBlog />} />
          <Route path={routePath(ROUTES.contact)} element={<Contact />} />

          {SERVICES.map((s) => (
            <Route
              key={s.slug}
              path={routePath(s.slug)}
              element={<ServiceRoute slug={s.slug} />}
            />
          ))}

          {/*
           * Legacy .html paths. On a correctly configured host these never
           * reach the app (public/_redirects answers them with a real HTTP 301,
           * which is what Google requires). These in-app redirects are the
           * fallback for local dev and hosts without the redirect file, and they
           * redirect rather than render so no URL has two renderings.
           */}
          {LEGACY_REDIRECTS.map(([legacy, clean]) => (
            <Route
              key={legacy}
              path={legacy}
              element={<Navigate to={routePath(clean)} replace />}
            />
          ))}

          {/* "/about-us/" -> "/about-us"; unknown path -> home. */}
          <Route path="*" element={<Fallback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
