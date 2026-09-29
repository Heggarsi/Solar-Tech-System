import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicePage } from './pages/ServicePage';
import { ClientsPage } from './pages/ClientsPage';
import { GalleryBlogPage } from './pages/GalleryBlogPage';
import { ContactPage } from './pages/ContactPage';
import { SERVICES, ROUTES } from './content/site';
import { useSiteNav } from './hooks/useSiteNav';

/*
 * The existing pages all take the same `onNavigate(path)` callback and address
 * each other by their shipped filename. These thin adapters keep that contract
 * intact so none of the page content had to be rewritten just to introduce a
 * real router.
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
  if (!service) return <Navigate to={`/${ROUTES.home}`} replace />;
  return <ServicePage service={service} onNavigate={navigate} />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to={`/${ROUTES.home}`} replace />} />
          <Route path={`/${ROUTES.home}`} element={<Home />} />
          <Route path={`/${ROUTES.about}`} element={<About />} />
          <Route path={`/${ROUTES.clients}`} element={<Clients />} />
          <Route path={`/${ROUTES.galleryBlog}`} element={<GalleryBlog />} />
          <Route path={`/${ROUTES.contact}`} element={<Contact />} />

          {SERVICES.map((s) => (
            <Route
              key={s.slug}
              path={`/${s.file}`}
              element={<ServiceRoute slug={s.slug} />}
            />
          ))}

          {/* Deep links without the .html suffix still resolve. */}
          <Route path="/index.html" element={<Navigate to={`/${ROUTES.home}`} replace />} />

          <Route
            path="*"
            element={<Navigate to={`/${ROUTES.home}`} replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
