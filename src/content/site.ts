/**
 * SINGLE SOURCE OF TRUTH for all site copy, navigation, stats and SEO.
 *
 * This module re-exports the existing content in src/data/siteData.ts rather
 * than duplicating it, so there is exactly one place a string is defined.
 * It adds only:
 *   - the navigation model (labels + order preserved from the live site)
 *   - statistics that are traceable to existing site content
 *   - per-route SEO metadata
 *
 * RULE: never invent a statistic, certification, award or client name.
 * Anything not traceable to existing content is marked TODO below.
 */

// ---------------------------------------------------------------------------
// Existing content (re-exported, unchanged)
// ---------------------------------------------------------------------------
export {
  SITE_INFO,
  SERVICES,
  WHY_CHOOSE_ITEMS,
  TESTIMONIALS,
  BLOG_POSTS,
  GALLERY_PHOTOS,
} from '../data/siteData';

export type {
  ServiceItem,
  TestimonialItem,
  GalleryPhoto,
  BlogPost,
} from '../types';

import {
  SITE_INFO,
  SERVICES,
  WHY_CHOOSE_ITEMS,
  TESTIMONIALS,
  BLOG_POSTS,
  GALLERY_PHOTOS,
} from '../data/siteData';

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
/**
 * Canonical origin. Single source of truth for absolute URLs, so the sitemap,
 * the per-route canonical tags and og:url can never drift apart.
 */
export const SITE_ORIGIN = 'https://solartechsystems.co.in';

/**
 * Clean, extension-less routes. The site used to ship real .html filenames;
 * those are now legacy paths that permanently redirect (see LEGACY_REDIRECTS
 * and public/_redirects), because a .html-looking path on a static host can be
 * served as a literal file and never boot the SPA at all.
 *
 * `home` is the bare root, so it reads correctly in hrefs.
 */
export const ROUTES = {
  home: '/',
  about: 'about-us',
  clients: 'our-clients',
  galleryBlog: 'gallery-blog',
  contact: 'contact-us',
} as const;

/** Route slug -> absolute router path. Tolerates '' , '/' and '/about-us'. */
export const routePath = (slug: string): string => {
  const trimmed = slug.replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}` : '/';
};

/**
 * Every .html path the site has ever shipped, mapped to its clean successor.
 * Kept here so the in-app fallback routes and public/_redirects stay in sync.
 */
export const LEGACY_REDIRECTS: ReadonlyArray<readonly [string, string]> = [
  ['/solartechsystems.html', ROUTES.home],
  ['/index.html', ROUTES.home],
  ['/about-us.html', ROUTES.about],
  ['/our-clients.html', ROUTES.clients],
  ['/gallery-blog.html', ROUTES.galleryBlog],
  ['/contact-us.html', ROUTES.contact],
  ['/solar-power-plant.html', 'solar-power-plant'],
  ['/solar-rooftop.html', 'solar-rooftop'],
  ['/33kv-transmission-line.html', '33kv-transmission-line'],
  ['/33-11kv-substation-uss.html', '33-11kv-substation-uss'],
];

interface NavLink {
  label: string;
  /** null = plain route, otherwise a service file */
  path: string | null;
}

/** Navbar order is unchanged: Home, About Us, Products / Services, Our Clients, Gallery / Blog */
export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: ROUTES.home },
  { label: 'About Us', path: ROUTES.about },
  { label: 'Products / Services', path: null },
  { label: 'Our Clients', path: ROUTES.clients },
  { label: 'Gallery / Blog', path: ROUTES.galleryBlog },
];

// ---------------------------------------------------------------------------
// Statistics
// ---------------------------------------------------------------------------
/**
 * Every figure below is derived from existing site content — no new claims.
 *  - 2016        : SITE_INFO.establishedYear
 *  - 4           : SERVICES.length (the four real service lines)
 *  - 33 kV       : voltage class stated in the 33 kV service specs
 *  - Karnataka   : SITE_INFO.location
 */
export interface Stat {
  value: number | null;
  suffix: string;
  prefix: string;
  label: string;
  detail: string;
  /** true when the tile is text-only rather than a counting number */
  textual?: boolean;
}

export const HOME_STATS: Stat[] = [
  {
    value: 2016,
    prefix: '',
    suffix: '',
    label: 'Established',
    detail: 'Incorporated and operating from Bangalore, Karnataka.',
  },
  {
    value: SERVICES.length,
    prefix: '',
    suffix: '',
    label: 'Service lines',
    detail: 'Design, manufacture, install and commission under one roof.',
  },
  {
    value: 33,
    prefix: '',
    suffix: ' kV',
    label: 'Transmission class',
    detail: 'Overhead lines, stringing and 33/11 kV unitized substations.',
  },
  {
    value: null,
    prefix: '',
    suffix: '',
    label: 'Pan-Karnataka',
    detail: 'Delivering commissioned plants across the state.',
    textual: true,
  },
];

// ---------------------------------------------------------------------------
// How solar works — energy flow stages (educational copy, no claims)
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// SEO — per route
// ---------------------------------------------------------------------------
interface RouteMeta {
  title: string;
  description: string;
}

const BASE = 'Solar Tech Systems';

export const ROUTE_META: Record<string, RouteMeta> = {
  [ROUTES.home]: {
    title: `${BASE} | Clean Energy, Rooftop Solar & Power Infrastructure`,
    description:
      'Renewable solar energy solutions, commercial rooftops, 33 kV transmission lines, and substation USS commissioning across Karnataka.',
  },
  [ROUTES.about]: {
    title: `About Us | ${BASE}`,
    description:
      'Solar Tech Systems, incorporated in 2016 — a leading supplier of quality assured solar products and turnkey power infrastructure across Karnataka.',
  },
  [ROUTES.clients]: {
    title: `Our Clients | ${BASE}`,
    description:
      'Residential, commercial, industrial and agricultural solar projects delivered by Solar Tech Systems across Karnataka.',
  },
  [ROUTES.galleryBlog]: {
    title: `Gallery & Blog | ${BASE}`,
    description:
      'Project photography and technical writing on solar power plants, rooftop systems, 33 kV transmission and substation engineering.',
  },
  [ROUTES.contact]: {
    title: `Contact Us | ${BASE}`,
    description: `Talk to Solar Tech Systems in Bangalore about solar plants, rooftop solar, transmission lines and substations. ${SITE_INFO.phone} · ${SITE_INFO.email}`,
  },
};

const serviceMeta = (title: string, desc: string): RouteMeta => ({
  title: `${title} | ${BASE}`,
  description: desc,
});

SERVICES.forEach((s) => {
  ROUTE_META[s.slug] = serviceMeta(s.title, s.desc);
});

// ---------------------------------------------------------------------------
// Business facts for structured data
// ---------------------------------------------------------------------------
export const BUSINESS = {
  name: BASE,
  legalName: BASE,
  telephone: SITE_INFO.phoneHref,
  email: SITE_INFO.email,
  addressLocality: 'Bangalore',
  addressRegion: 'Karnataka',
  addressCountry: 'IN',
  // The existing site only publishes the city/region, not a street address.
  // streetAddress is intentionally omitted rather than invented.
  // TODO: confirm with client — full street address for schema.org and Google Business Profile.
  areaServed: 'Karnataka',
  foundingDate: SITE_INFO.establishedYear,
  url: 'https://www.solartechsystems.co.in',
  logo: '/images/logo.png',
} as const;
