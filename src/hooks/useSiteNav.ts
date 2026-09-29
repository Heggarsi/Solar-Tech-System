import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLenis } from '../lib/motion/lenis';

/**
 * Bridges the existing pages' `onNavigate(path)` contract onto React Router.
 *
 * The whole site historically addressed pages by their shipped filenames
 * ("about-us.html"), so that shape is preserved: callers pass the same strings
 * they always have and we resolve them to real router paths.
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
        const targetPath = page ? `/${page}` : location.pathname;

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

      navigate(`/${path}`);
    },
    [navigate, location.pathname],
  );
};

/** Current route filename, e.g. "about-us.html". */
export const useCurrentFile = (): string =>
  useLocation().pathname.replace(/^\//, '') || 'solartechsystems.html';
