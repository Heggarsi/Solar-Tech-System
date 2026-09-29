import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';

/**
 * StrictMode is intentional: it double-invokes effects in development, which
 * is exactly the condition under which leaked ScrollTriggers and double-created
 * timelines show up. Every animation in this app is created inside a
 * gsap.context() and reverted on cleanup, so the double mount is clean.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
