import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap, useGSAP } from '../../lib/motion/gsap';
import { SunOrb } from './SunOrb';
import { PanelArray } from './PanelArray';
import { EnergyParticles } from './EnergyParticles';


/**
 * Sun rig: one group, one scrubbed timeline. Scroll through the hero and the
 * sun travels dawn → noon, while the array tracks it.
 */
const SunRig: React.FC<{ hero: React.RefObject<HTMLElement | null> }> = ({ hero }) => {
  const rig = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  const { camera } = useThree();

  useGSAP(
    () => {
      if (!rig.current) return;
      // A plain object stands in for the light, because the live PointLight is
      // only available after the R3F commit.
      const lamp = { intensity: 0.7 };
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(
        rig.current.position,
        { x: -5.2, y: 1.1, z: -4 },
        { x: 0.4, y: 7.2, z: -13, ease: 'none', duration: 1 },
        0,
      )
        .fromTo(rig.current.scale, { x: 0.7, y: 0.7, z: 0.7 }, { x: 1.05, y: 1.05, z: 1.05, ease: 'none', duration: 1 }, 0)
        .fromTo(
          lamp,
          { intensity: 0.7 },
          {
            intensity: 1.6,
            ease: 'none',
            duration: 1,
            onUpdate: () => {
              if (light.current) light.current.intensity = lamp.intensity;
            },
          },
          0,
        );
      // Ease the camera back as the sun climbs so the field stays in frame.
      tl.fromTo(camera.position, { z: 12, y: 2.2 }, { z: 17, y: 4.2, ease: 'none', duration: 1 }, 0);
    },
    { dependencies: [], scope: rig },
  );

  return (
    <>
      <group ref={rig}>
        <SunOrb />
        <pointLight ref={light} intensity={0.7} distance={40} color="#FFC24D" />
      </group>
      <ambientLight intensity={0.42} color="#CFE8FF" />
      <directionalLight position={[-4, 7, -6]} intensity={0.6} color="#FFD98A" />
      <EnergyParticles />
    </>
  );
};

const Scene: React.FC<{ hero: React.RefObject<HTMLElement | null> }> = ({ hero }) => {
  const { scene } = useThree();
  useEffect(() => {
    // Transparent canvas: the CSS sky gradient is the backdrop, so the scene
    // composites over it instead of painting its own sky.
    scene.background = null;
    scene.fog = new THREE.FogExp2(0x0a1524, 0.021);
  }, [scene]);

  return (
    <>
      <SunRig hero={hero} />
      <PanelArray tilt={-0.46} />
    </>
  );
};

/**
 * Hero solar scene. Lazy-loaded by the caller.
 *
 * Gating (per the brief): no WebGL context, a coarse pointer, or
 * `prefers-reduced-motion` → render nothing and let the CSS sun layer be the
 * sun. When it does mount it sets `data-webgl="sun"` so the CSS sun stands
 * down, so there is never more than one sun on screen.
 */
export const SolarScene: React.FC<{ hero: React.RefObject<HTMLElement | null> }> = ({ hero }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.webgl = 'sun';
    return () => {
      delete document.documentElement.dataset.webgl;
    };
  }, []);

  useEffect(() => {
    const el = hero.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '100px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hero]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
      data-solar-scene=""
    >
      <Canvas
        dpr={[1, 1.6]}
        frameloop={visible ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 2.2, 12], fov: 45, near: 0.1, far: 90 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping;
        }}
      >
        <Scene hero={hero} />
      </Canvas>
    </div>
  );
};

export default SolarScene;
