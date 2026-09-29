import React, { useId, memo } from 'react';

interface AttractiveBackgroundProps {
  scrollProgress?: number;
}

/**
 * Highly performant SVG background system featuring attractive solar-related big SVG artwork:
 * 1. Big 3D Photovoltaic Solar Farm Array with silicon cells & reflective busbars
 * 2. Big 33 kV Electrical Transmission Tower & Clean Power Grid Evacuation
 * 3. Big Eco-Architecture Rooftop Solar Array capturing incident sunlight
 * 4. Big Radiant Celestial Solar Flare & Concentric Orbitals
 * 
 * All heavy transformations are offloaded to GPU compositor layers (translate3d, will-change, contain:strict).
 */
export const AttractiveBackground: React.FC<AttractiveBackgroundProps> = memo(({ scrollProgress = 0 }) => {
  const maskId = useId();

  // Quantized & smoothed scroll parallax offsets
  const parallaxY1 = Math.round(scrollProgress * 110);
  const parallaxY2 = Math.round(-scrollProgress * 95);
  const parallaxY3 = Math.round(scrollProgress * 60);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-[-8] [contain:strict] [isolation:isolate] [backface-visibility:hidden] [transform:translate3d(0,0,0)]"
      aria-hidden="true"
    >
      {/* 1. Static Clean-Energy Grid Pattern (Cached as static GPU layer) */}
      <div className="absolute inset-0 w-full h-full opacity-30 [contain:strict] [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="solarGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(14, 165, 233, 0.12)"
                strokeWidth="0.8"
              />
              <circle cx="60" cy="0" r="1.5" fill="rgba(244, 63, 94, 0.25)" />
              <circle cx="0" cy="60" r="1.5" fill="rgba(14, 165, 233, 0.25)" />
              <path
                d="M 0 30 L 60 30 M 30 0 L 30 60"
                fill="none"
                stroke="rgba(244, 63, 94, 0.05)"
                strokeWidth="0.5"
                strokeDasharray="2, 4"
              />
            </pattern>
            <radialGradient id="gridMaskGrad" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
            </radialGradient>
            <mask id={maskId}>
              <rect width="100%" height="100%" fill="url(#gridMaskGrad)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#solarGrid)" mask={`url(#${maskId})`} />
        </svg>
      </div>

      {/* 2. BIG SOLAR SVG IMAGE: 3D Photovoltaic Solar Farm Array (Mid-Right Background) */}
      <div 
        className="absolute top-[28%] -right-16 md:right-8 w-[580px] lg:w-[820px] h-[340px] lg:h-[460px] opacity-35 transition-transform duration-700 ease-out will-change-transform [contain:paint]"
        style={{
          transform: `translate3d(0, ${parallaxY2 * 0.7}px, 0)`,
        }}
      >
        <svg viewBox="0 0 800 450" className="w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pvCellGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="pvCellGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="solarGlintGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Ground Mount Foundation & Structural Racking */}
          <g stroke="rgba(14, 165, 233, 0.35)" strokeWidth="1.8" fill="none">
            {/* Front Leg Posts */}
            <line x1="160" y1="360" x2="160" y2="410" />
            <line x1="360" y1="360" x2="360" y2="410" />
            <line x1="560" y1="360" x2="560" y2="410" />
            <line x1="740" y1="360" x2="740" y2="410" />
            {/* Back Leg Posts */}
            <line x1="240" y1="210" x2="240" y2="400" strokeDasharray="4 4" opacity="0.5" />
            <line x1="440" y1="210" x2="440" y2="400" strokeDasharray="4 4" opacity="0.5" />
            <line x1="640" y1="210" x2="640" y2="400" strokeDasharray="4 4" opacity="0.5" />
            {/* Diagonal Cross Struts */}
            <line x1="160" y1="410" x2="240" y2="280" />
            <line x1="360" y1="410" x2="440" y2="280" />
            <line x1="560" y1="410" x2="640" y2="280" />
            {/* Ground Baseline */}
            <line x1="80" y1="410" x2="780" y2="410" stroke="rgba(244, 63, 94, 0.25)" strokeDasharray="8 6" />
          </g>

          {/* Large Solar PV Table 1 (Left String) */}
          <polygon
            points="120,340 320,340 400,200 200,200"
            fill="url(#pvCellGrad1)"
            stroke="#38bdf8"
            strokeWidth="1.8"
          />
          {/* Solar Silicon Wafer Grid Lines - Table 1 */}
          <g stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8">
            {/* Vertical busbars */}
            <line x1="170" y1="340" x2="250" y2="200" />
            <line x1="220" y1="340" x2="300" y2="200" />
            <line x1="270" y1="340" x2="350" y2="200" />
            {/* Horizontal interconnects */}
            <line x1="140" y1="305" x2="340" y2="305" />
            <line x1="160" y1="270" x2="360" y2="270" />
            <line x1="180" y1="235" x2="380" y2="235" />
          </g>

          {/* Large Solar PV Table 2 (Center String) */}
          <polygon
            points="340,340 540,340 620,200 420,200"
            fill="url(#pvCellGrad2)"
            stroke="#fb7185"
            strokeWidth="1.8"
          />
          {/* Solar Silicon Wafer Grid Lines - Table 2 */}
          <g stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8">
            <line x1="390" y1="340" x2="470" y2="200" />
            <line x1="440" y1="340" x2="520" y2="200" />
            <line x1="490" y1="340" x2="570" y2="200" />
            <line x1="360" y1="305" x2="560" y2="305" />
            <line x1="380" y1="270" x2="580" y2="270" />
            <line x1="400" y1="235" x2="600" y2="235" />
          </g>

          {/* Large Solar PV Table 3 (Right String) */}
          <polygon
            points="560,340 750,340 820,200 640,200"
            fill="url(#pvCellGrad1)"
            stroke="#0ea5e9"
            strokeWidth="1.8"
          />
          <g stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8">
            <line x1="610" y1="340" x2="690" y2="200" />
            <line x1="660" y1="340" x2="740" y2="200" />
            <line x1="710" y1="340" x2="790" y2="200" />
            <line x1="580" y1="305" x2="770" y2="305" />
            <line x1="600" y1="270" x2="790" y2="270" />
            <line x1="620" y1="235" x2="810" y2="235" />
          </g>

          {/* Sunlight Glint Flash Across Modules */}
          <polygon
            points="260,340 380,340 480,200 360,200"
            fill="url(#solarGlintGrad)"
            opacity="0.35"
          />

          {/* High-Yield Power Evacuation Arrow Line */}
          <path
            d="M 320 375 L 440 375 L 530 420"
            fill="none"
            stroke="#fb7185"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <circle cx="530" cy="420" r="4.5" fill="#f43f5e" />
          <circle cx="320" cy="375" r="4" fill="#38bdf8" />
        </svg>
      </div>

      {/* 3. BIG SOLAR SVG IMAGE: 33 kV Transmission Line Tower & Grid Pylon (Top-Left Background) */}
      <div 
        className="absolute top-12 -left-12 sm:left-4 w-[380px] lg:w-[500px] h-[520px] lg:h-[680px] opacity-30 transition-transform duration-700 ease-out will-change-transform [contain:paint]"
        style={{
          transform: `translate3d(0, ${parallaxY1 * 0.5}px, 0)`,
        }}
      >
        <svg viewBox="0 0 500 700" className="w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pylonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="lineEnergyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fb7185" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Central Steel Lattice Pylon Mast */}
          <g stroke="url(#pylonGrad)" strokeWidth="1.6" fill="none">
            {/* Main Outer Legs */}
            <line x1="250" y1="60" x2="140" y2="650" />
            <line x1="250" y1="60" x2="360" y2="650" />
            {/* Internal Lattice Bracing */}
            <line x1="230" y1="140" x2="270" y2="140" />
            <line x1="210" y1="230" x2="290" y2="230" />
            <line x1="185" y1="340" x2="315" y2="340" />
            <line x1="160" y1="480" x2="340" y2="480" />
            {/* Diagonal Cross Members */}
            <line x1="230" y1="140" x2="290" y2="230" />
            <line x1="270" y1="140" x2="210" y2="230" />
            <line x1="210" y1="230" x2="315" y2="340" />
            <line x1="290" y1="230" x2="185" y2="340" />
            <line x1="185" y1="340" x2="340" y2="480" />
            <line x1="315" y1="340" x2="160" y2="480" />
            <line x1="160" y1="480" x2="360" y2="650" />
            <line x1="340" y1="480" x2="140" y2="650" />
          </g>

          {/* Upper Crossarm (Transmission Line Cat-head) */}
          <g stroke="#38bdf8" strokeWidth="2" fill="none">
            <line x1="120" y1="160" x2="380" y2="160" />
            <line x1="120" y1="160" x2="240" y2="100" />
            <line x1="380" y1="160" x2="260" y2="100" />
          </g>
          {/* Middle Crossarm */}
          <g stroke="#0ea5e9" strokeWidth="2" fill="none">
            <line x1="80" y1="250" x2="420" y2="250" />
            <line x1="80" y1="250" x2="220" y2="180" />
            <line x1="420" y1="250" x2="280" y2="180" />
          </g>
          {/* Lower Crossarm */}
          <g stroke="#fb7185" strokeWidth="2" fill="none">
            <line x1="50" y1="360" x2="450" y2="360" />
            <line x1="50" y1="360" x2="200" y2="280" />
            <line x1="450" y1="360" x2="300" y2="280" />
          </g>

          {/* Insulator Disc Strings */}
          <g fill="#fb7185" opacity="0.9">
            <circle cx="120" cy="180" r="4.5" />
            <circle cx="380" cy="180" r="4.5" />
            <circle cx="80" cy="275" r="4.5" />
            <circle cx="420" cy="275" r="4.5" />
            <circle cx="50" cy="385" r="4.5" />
            <circle cx="450" cy="385" r="4.5" />
          </g>

          {/* Catenary High-Voltage Transmission Line Cables */}
          <path
            d="M -100 240 Q 50 200 120 180 T 380 180 T 600 220"
            fill="none"
            stroke="url(#lineEnergyGrad)"
            strokeWidth="2.2"
            strokeDasharray="6 4"
          />
          <path
            d="M -100 340 Q 20 300 80 275 T 420 275 T 600 320"
            fill="none"
            stroke="url(#lineEnergyGrad)"
            strokeWidth="2"
          />
          <path
            d="M -100 460 Q 0 410 50 385 T 450 385 T 600 430"
            fill="none"
            stroke="url(#lineEnergyGrad)"
            strokeWidth="1.8"
            strokeDasharray="8 6"
          />

          {/* Substation Transformer Bus Symbol at Base */}
          <rect x="220" y="610" width="60" height="50" rx="6" fill="rgba(14, 165, 233, 0.15)" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="240" cy="635" r="8" fill="none" stroke="#fb7185" strokeWidth="1.5" />
          <circle cx="260" cy="635" r="8" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 4. BIG SOLAR SVG IMAGE: Modern Solar Rooftop Architecture (Lower Background) */}
      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[700px] lg:w-[960px] h-[360px] lg:h-[480px] opacity-25 transition-transform duration-700 ease-out will-change-transform [contain:paint]"
        style={{
          transform: `translate3d(-50%, ${parallaxY3 * 0.4}px, 0)`,
        }}
      >
        <svg viewBox="0 0 960 480" className="w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="roofArrayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="sunBeamGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Incident Sunbeams Streaming onto Rooftop */}
          <polygon points="480,20 340,240 620,240" fill="url(#sunBeamGrad)" opacity="0.6" />

          {/* Eco-Building Contour */}
          <polygon
            points="240,380 480,220 720,380 720,460 240,460"
            fill="rgba(240, 249, 255, 0.2)"
            stroke="rgba(14, 165, 233, 0.3)"
            strokeWidth="1.5"
          />

          {/* Pitch Rooftop Left Plane (Equipped with Solar PV Array) */}
          <polygon
            points="240,380 480,220 480,310 240,430"
            fill="url(#roofArrayGrad)"
            stroke="#0ea5e9"
            strokeWidth="2"
          />

          {/* Rooftop Solar PV Modules (Grid Matrix on Left Slope) */}
          <g stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1">
            <line x1="300" y1="392" x2="480" y2="272" />
            <line x1="360" y1="405" x2="480" y2="295" />
            <line x1="420" y1="418" x2="480" y2="310" />
            {/* Cross module separations */}
            <line x1="320" y1="325" x2="320" y2="390" />
            <line x1="375" y1="288" x2="375" y2="370" />
            <line x1="430" y1="252" x2="430" y2="340" />
          </g>

          {/* Pitch Rooftop Right Plane */}
          <polygon
            points="480,220 720,380 720,430 480,310"
            fill="rgba(254, 205, 211, 0.2)"
            stroke="#fb7185"
            strokeWidth="1.5"
          />

          {/* Inverter & Power Flow Conduit Lines */}
          <path
            d="M 480 310 L 480 440 L 520 440"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <circle cx="520" cy="440" r="5" fill="#f43f5e" />
        </svg>
      </div>

      {/* 5. Top-Right Ambient Celestial Solar Orbital (GPU-Offloaded Spin & Parallax) */}
      <div 
        className="absolute -top-24 -right-24 w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] opacity-40 transition-transform duration-500 ease-out will-change-transform [contain:paint]"
        style={{
          transform: `translate3d(0, ${parallaxY2 * 0.4}px, 0)`,
        }}
      >
        <div className="w-full h-full animate-slow-spin will-change-transform [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
          <svg viewBox="0 0 500 500" className="w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fb7185" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="orbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.7" />
                <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#fb7185" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Outer dashed solar track */}
            <circle cx="250" cy="250" r="230" fill="none" stroke="url(#orbitGrad1)" strokeWidth="1.2" strokeDasharray="6 8" />
            {/* Middle harmonic circle */}
            <circle cx="250" cy="250" r="180" fill="none" stroke="url(#orbitGrad2)" strokeWidth="1.5" strokeDasharray="16 12" />
            {/* Inner solar flux ring */}
            <circle cx="250" cy="250" r="130" fill="none" stroke="url(#orbitGrad1)" strokeWidth="0.8" />
            
            {/* Radial axis lines */}
            <line x1="250" y1="10" x2="250" y2="490" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" strokeDasharray="3 6" />
            <line x1="10" y1="250" x2="490" y2="250" stroke="rgba(244, 63, 94, 0.2)" strokeWidth="1" strokeDasharray="3 6" />

            {/* Orbital nodes */}
            <circle cx="250" cy="20" r="4" fill="#38bdf8" />
            <circle cx="430" cy="250" r="5" fill="#fb7185" />
            <circle cx="70" cy="250" r="3.5" fill="#0284c7" />
            <circle cx="250" cy="430" r="4" fill="#f43f5e" />
          </svg>
        </div>
      </div>

      {/* 6. Multilayered Flowing Harmonic SVG Energy Wave Ribbons (GPU Layered) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-35 [contain:strict] [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
        <div className="w-full h-full animate-float-wave will-change-transform [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
          <svg 
            viewBox="0 0 1440 900" 
            preserveAspectRatio="none" 
            className="w-full h-full pointer-events-none"
          >
            <defs>
              <linearGradient id="waveGradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
                <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#7dd3fc" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.05" />
              </linearGradient>

              <linearGradient id="waveGradCoral" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.05" />
                <stop offset="40%" stopColor="#fb7185" stopOpacity="0.4" />
                <stop offset="75%" stopColor="#fda4af" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#fecdd3" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Wave Layer 1: Flowing Sky Blue Harmonic Ribbon */}
            <g className="animate-wave-pulse-1 will-change-opacity">
              <path
                d="M -100 240 C 260 120, 520 380, 880 220 C 1180 100, 1380 320, 1600 210"
                fill="none"
                stroke="url(#waveGradBlue)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>

            {/* Wave Layer 2: Flowing Soft Coral / Rose Ribbon */}
            <g className="animate-wave-pulse-2 will-change-opacity">
              <path
                d="M -100 360 C 220 480, 600 200, 960 410 C 1220 540, 1420 310, 1600 420"
                fill="none"
                stroke="url(#waveGradCoral)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* 7. Floating Solar Photons & Energy Sparkles */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden [contain:strict]">
        {/* Sky Blue Pulse */}
        <div className="absolute top-[18%] left-[12%] animate-float-slow will-change-transform [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <span className="absolute w-5 h-5 rounded-full bg-sky-400 opacity-60 animate-ping will-change-transform" />
            <span className="relative w-2.5 h-2.5 rounded-full bg-sky-600 shadow-sm" />
          </div>
        </div>

        {/* Soft Rose Pulse */}
        <div className="absolute top-[32%] right-[16%] animate-float-medium will-change-transform [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
          <div className="relative w-7 h-7 flex items-center justify-center">
            <span className="absolute w-6 h-6 rounded-full bg-rose-400 opacity-55 animate-ping will-change-transform" />
            <span className="relative w-3 h-3 rounded-full bg-rose-600 shadow-sm" />
          </div>
        </div>

        {/* Specular Sparkle */}
        <div className="absolute top-[48%] left-[48%] animate-pulse will-change-opacity [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
          <svg width="28" height="28" viewBox="0 0 28 28" className="pointer-events-none">
            <path 
              d="M14 2 L17 11 L26 14 L17 17 L14 26 L11 17 L2 14 L11 11 Z" 
              fill="#38bdf8" 
              opacity="0.45" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
});
