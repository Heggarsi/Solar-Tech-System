import React, { useId } from 'react';

interface HeroSvgPatternProps {
  className?: string;
  opacity?: number;
  weight?: number;
}

/**
 * Reusable Crystalline Photovoltaic Silicon Wafer SVG Pattern
 * Consistent across all page hero sections with cyan & rose conductors.
 * `weight` scales every internal alpha so a single pattern can be tuned
 * from barely-there (inner pages) to more present (home hero).
 */
export const HeroSvgPattern: React.FC<HeroSvgPatternProps> = ({ 
  className = "absolute inset-0 w-full h-full pointer-events-none z-0",
  opacity = 0.65,
  weight = 1
}) => {
  const patternId = useId();
  const a = (value: number) => Math.round(value * Math.max(0, Math.min(weight, 1)) * 1000) / 1000;

  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id={patternId} width="64" height="64" patternUnits="userSpaceOnUse">
          {/* Primary Diamond Silicon Wafer Cell */}
          <polygon 
            points="32,0 64,32 32,64 0,32" 
            fill={`rgba(14, 165, 233, ${a(0.12)})`} 
            stroke={`rgba(14, 165, 233, ${a(0.45)})`} 
            strokeWidth="1.2" 
          />
          {/* Inner Concentric Anti-Reflective Ring */}
          <polygon 
            points="32,8 56,32 32,56 8,32" 
            fill={`rgba(244, 63, 94, ${a(0.06)})`} 
            stroke={`rgba(244, 63, 94, ${a(0.35)})`} 
            strokeWidth="0.9" 
            strokeDasharray="2 3" 
          />
          {/* High-Conductivity Busbar Conductors */}
          <line x1="0" y1="32" x2="64" y2="32" stroke={`rgba(2, 132, 199, ${a(0.38)})`} strokeWidth="1.2" />
          <line x1="32" y1="0" x2="32" y2="64" stroke={`rgba(2, 132, 199, ${a(0.38)})`} strokeWidth="1.2" />
          
          {/* Photovoltaic Micro-Nodes & Solder Junctions */}
          <circle cx="32" cy="32" r="3" fill="#0284c7" fillOpacity={a(0.75)} />
          <circle cx="32" cy="32" r="1.5" fill="#38bdf8" fillOpacity={a(1)} />
          
          <circle cx="0" cy="0" r="2.5" fill="#e11d48" fillOpacity={a(0.65)} />
          <circle cx="64" cy="0" r="2.5" fill="#e11d48" fillOpacity={a(0.65)} />
          <circle cx="0" cy="64" r="2.5" fill="#e11d48" fillOpacity={a(0.65)} />
          <circle cx="64" cy="64" r="2.5" fill="#e11d48" fillOpacity={a(0.65)} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} opacity={opacity} />
    </svg>
  );
};
