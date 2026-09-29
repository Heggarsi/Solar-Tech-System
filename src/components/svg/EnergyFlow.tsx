import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/motion/gsap';
import { prefersReducedMotion } from '../../lib/motion/utils';
import { EASE } from '../../lib/motion/tokens';

/**
 * Energy-flow diagram: the thin blue of the modules, the amber of the
 * conductor, the orange of the grid. Pure SVG, no canvas.
 */
export const EnergyFlow: React.FC<{ className?: string }> = ({ className = '' }) => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);

      // Panel planes light up in sequence.
      q('[data-cell]').forEach((cell, i) => {
        gsap.fromTo(
          cell,
          { opacity: 0.15, scaleY: 0.4 },
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.5,
            delay: i * 0.02,
            ease: EASE.out,
            scrollTrigger: { trigger: root.current, start: 'top 82%', once: true },
          },
        );
      });

      // The conductor draws itself left to right.
      gsap.fromTo(
        q('[data-flow]'),
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: EASE.inOut,
          scrollTrigger: { trigger: root.current, start: 'top 78%', once: true },
        },
      );

      // Load pulses travel the path.
      q('[data-pulse]').forEach((pulse, i) => {
        gsap.fromTo(
          pulse,
          { opacity: 0, offsetDistance: '0%' } as gsap.TweenVars,
          {
            opacity: 1,
            duration: 0.4,
            delay: 0.6 + i * 0.5,
            ease: EASE.out,
            onComplete: () => gsap.to(pulse, { opacity: 0, duration: 0.6 }),
            scrollTrigger: { trigger: root.current, start: 'top 78%', once: true },
          },
        );
      });
    },
    { scope: root, dependencies: [] },
  );

  return (
    <div ref={root} className={className} aria-hidden="true">
      <svg
        viewBox="0 0 1000 320"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        <defs>
          <linearGradient id="ef-blade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6FB7FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0A1524" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="ef-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6FB7FF" />
            <stop offset="55%" stopColor="#FFC24D" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>
          <filter id="ef-glow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Module bank: thin planes catching the first light */}
        <g>
          {Array.from({ length: 14 }).map((_, i) => (
            <rect
              key={i}
              data-cell=""
              x={40 + i * 26}
              y={210}
              width={18}
              height={62}
              rx={2}
              fill="url(#ef-blade)"
              stroke="#6FB7FF"
              strokeOpacity={0.35}
              strokeWidth={0.75}
              style={{ transformOrigin: `${49 + i * 26}px 241px` }}
            />
          ))}
        </g>

        {/* Base rail */}
        <line x1={30} y1={278} x2={420} y2={278} stroke="#6FB7FF" strokeOpacity={0.3} strokeWidth={1} />

        {/* Conductor path */}
        <path
          data-flow=""
          d="M420 241 C520 241 520 160 620 160 C720 160 720 120 820 120 L940 120"
          stroke="url(#ef-flow)"
          strokeWidth={2}
          strokeDasharray="1000"
          strokeDashoffset={1000}
          filter="url(#ef-glow)"
        />

        {/* Load pulses travelling the path */}
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            data-pulse=""
            r={4}
            fill="#FFD98A"
            opacity={0}
            style={{ offsetPath: 'path("M420 241 C520 241 520 160 620 160 C720 160 720 120 820 120 L940 120")' }}
          >
            <animateMotion
              dur="2.4s"
              begin={`${i * 0.8}s`}
              repeatCount="indefinite"
              path="M420 241 C520 241 520 160 620 160 C720 160 720 120 820 120 L940 120"
            />
          </circle>
        ))}

        {/* Grid destination */}
        <g>
          <circle cx={944} cy={120} r={16} stroke="#FF6B35" strokeWidth={1.5} opacity={0.7} />
          <circle cx={944} cy={120} r={26} stroke="#FF6B35" strokeWidth={1} opacity={0.35} />
          <circle cx={944} cy={120} r={38} stroke="#FF6B35" strokeWidth={0.75} opacity={0.18} />
          <circle cx={944} cy={120} r={5} fill="#FF9F1C" />
        </g>

        {/* Stage labels */}
        <text x={40} y={305} fill="#CFE8FF" fillOpacity={0.5} fontSize={11} fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">
          CAPTURE
        </text>
        <text x={430} y={305} fill="#FFD98A" fillOpacity={0.5} fontSize={11} fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">
          CONVERT
        </text>
        <text x={905} y={305} fill="#FF9F1C" fillOpacity={0.5} fontSize={11} fontFamily="JetBrains Mono, monospace" letterSpacing="1.6">
          DELIVER
        </text>
      </svg>
    </div>
  );
};
