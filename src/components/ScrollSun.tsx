import React, { useEffect, useState } from 'react';

interface ScrollSunProps {
  scrollProgress: number; // 0 to 1
}

export const ScrollSun: React.FC<ScrollSunProps> = ({ scrollProgress }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div 
        className="fixed top-24 right-10 z-0 pointer-events-none opacity-40"
        aria-hidden="true"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-300 via-rose-300 to-sky-300 blur-sm" />
      </div>
    );
  }

  // Calculate sun trajectory:
  // Starts on the left edge around 18% down at progress 0
  // Arcs high across the center around 35-50%
  // Sets towards the right edge near bottom around progress 0.95
  const t = Math.min(Math.max(scrollProgress, 0), 1);

  // Parabolic path: x from 6% to 92vw, y arcs down and up and down
  const xPercent = 6 + t * 84; // 6vw to 90vw
  // Arch formula: y peaks near top (8vh) in mid-scroll, stays visible
  const yPercent = 14 + Math.sin(t * Math.PI) * 12 + t * 58; // 14vh -> 26vh -> 72vh

  // Color shifting: Dawn cyan-gold -> midday radiant solar -> dusk soft coral & rose
  const hue = 190 + (355 - 190) * t; // cyan-blue towards coral-rose
  const glowScale = 0.8 + Math.sin(t * Math.PI) * 0.45;
  const rayAngle = (t * 720) % 360;

  // Background atmosphere tint based on sun position
  const dawnToSunset = t < 0.5 
    ? `rgba(14, 165, 233, ${0.03 + (1 - t * 2) * 0.05})` 
    : `rgba(244, 63, 94, ${0.03 + (t - 0.5) * 2 * 0.06})`;

  return (
    <>
      {/* Sky atmospheric shift overlay linked to sun */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-5] transition-colors duration-700"
        style={{
          background: `radial-gradient(circle at ${xPercent}% ${yPercent}%, ${dawnToSunset} 0%, transparent 60%)`
        }}
        aria-hidden="true"
      />

      {/* Travelling Sun Graphic - GPU Compositor Promoted */}
      <div
        className="fixed top-0 left-0 z-0 pointer-events-none will-change-transform transition-transform duration-300 ease-out [contain:layout_style] [backface-visibility:hidden]"
        style={{
          transform: `translate3d(calc(${xPercent}vw - 50%), calc(${yPercent}vh - 50%), 0)`,
        }}
        aria-hidden="true"
      >
        <div 
          className="relative flex items-center justify-center will-change-transform [backface-visibility:hidden]"
          style={{
            transform: `scale3d(${glowScale}, ${glowScale}, 1)`,
            transition: 'transform 0.4s ease'
          }}
        >
          {/* Outer glowing halo */}
          <div
            className="absolute rounded-full blur-2xl animate-sun-glow pointer-events-none"
            style={{
              width: '180px',
              height: '180px',
              background: t < 0.5 
                ? 'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(254, 205, 211, 0.35) 60%, transparent 80%)'
                : 'radial-gradient(circle, rgba(244, 63, 94, 0.45) 0%, rgba(251, 191, 36, 0.4) 60%, transparent 80%)'
            }}
          />

          {/* SVG Sun with rotating rays and multi-stop celestial core */}
          <svg
            width="96"
            height="96"
            viewBox="0 0 100 100"
            className="relative drop-shadow-md"
          >
            <defs>
              <linearGradient id="sunCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={t < 0.5 ? '#bae6fd' : '#fecdd3'} />
                <stop offset="45%" stopColor={t < 0.5 ? '#38bdf8' : '#fb7185'} />
                <stop offset="100%" stopColor={t < 0.5 ? '#f43f5e' : '#e11d48'} />
              </linearGradient>
              <linearGradient id="rayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#fb7185" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Rotating Corona Rays */}
            <g
              style={{
                transform: `rotate(${rayAngle}deg)`,
                transformOrigin: '50px 50px',
                transition: 'transform 0.2s linear',
                willChange: 'transform'
              }}
            >
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
                <line
                  key={idx}
                  x1="50"
                  y1={idx % 2 === 0 ? "14" : "20"}
                  x2="50"
                  y2="28"
                  transform={`rotate(${angle} 50 50)`}
                  stroke="url(#rayGrad)"
                  strokeWidth={idx % 2 === 0 ? "3" : "2"}
                  strokeLinecap="round"
                />
              ))}
            </g>

            {/* Pulsing Sun Orb */}
            <circle
              cx="50"
              cy="50"
              r="22"
              fill="url(#sunCoreGrad)"
              className="filter drop-shadow-sm"
            />

            {/* Inner highlight specular ring */}
            <circle
              cx="44"
              cy="44"
              r="7"
              fill="#ffffff"
              opacity={0.45}
            />
          </svg>
        </div>
      </div>
    </>
  );
};
