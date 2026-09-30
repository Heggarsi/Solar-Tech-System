import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLenis } from '../lib/motion/lenis';
import { routePath } from '../content/site';

/**
 * Bridges the existing pages' `onNavigate(path)` contract onto React Router.
 *
 * Pages pass a route slug ("about-us") or an already-rooted path ("/"), and we
 * normalise both into a real router path. routePath() also tolerates a leading
 * slash, so callers may pass "/about-us" without producing a "//" path.
 *
 * Anchor targets ("#services") navigate first, then scroll once the new page
 * has mounted, honouring Lenis when it is active.
 */
export const useSiteNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (path: string) => {
      if (path.startsWith('#') || path.includes('#')) {
        const [page, targetId] = path.split('#');
        const targetPath = page ? routePath(page) : location.pathname;

        const scrollToTarget = () => {
          const el = document.getElementById(targetId);
          if (!el) return;
          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(el, { offset: -96, duration: 1.1 });
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        };

        if (page && targetPath !== location.pathname) {
          navigate(targetPath);
          // Wait for the new route to paint before scrolling to the anchor.
          window.setTimeout(scrollToTarget, 120);
        } else {
          scrollToTarget();
        }
        return;
      }

      navigate(routePath(path));
    },
    [navigate, location.pathname],
  );
};

/** Current route slug, e.g. "about-us"; "/" for the home page. */
export const useCurrentFile = (): string =>
  useLocation().pathname.replace(/^\//, '') || '/';
