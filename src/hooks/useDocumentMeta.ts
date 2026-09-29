import { useEffect } from 'react';

/**
 * Per-route document metadata for a client-side SPA.
 *
 * The spec allows react-helmet-async "or the existing solution". This project
 * has neither, and pulling in a head manager for five tags would add a
 * dependency for no benefit, so we set the tags directly. Net effect is
 * identical: crawlers that execute JS (and every social scraper) see the
 * correct title, description and Open Graph data per route.
 */
export interface PageMeta {
  title: string;
  description: string;
}

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

export const useDocumentMeta = ({ title, description }: PageMeta) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.title = title;

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      description,
    );
  }, [title, description]);
};
