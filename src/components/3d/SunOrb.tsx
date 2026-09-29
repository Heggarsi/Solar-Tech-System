import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { prefersReducedMotion } from '../../lib/motion/utils';

/**
 * The physical sun for the hero scene.
 *
 * Deliberately built from unlit + additive materials: the disc is meant to read
 * as a light *source*, not as a shaded ball, and additive blending lets the CSS
 * sky gradient behind the transparent canvas bleed through the glow.
 */
const makeGlowTexture = () => {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255, 245, 220, 1)');
  g.addColorStop(0.18, 'rgba(255, 214, 130, 0.72)');
  g.addColorStop(0.45, 'rgba(255, 159, 28, 0.22)');
  g.addColorStop(1, 'rgba(255, 107, 53, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

export const SunOrb: React.FC<{ radius?: number }> = ({ radius = 1.1 }) => {
  const glow = useMemo(makeGlowTexture, []);
  const sprite = useRef<THREE.Sprite>(null);

  useFrame((state) => {
    if (prefersReducedMotion()) return;
    const t = state.clock.elapsedTime;
    if (sprite.current) {
      // Slow atmospheric breathing rather than a fast pulse.
      const s = radius * (6.6 + Math.sin(t * 0.55) * 0.3);
      sprite.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial color="#FFEFCC" toneMapped={false} />
      </mesh>
      {/* Inner corona */}
      <mesh scale={1.9}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color="#FFC24D"
          transparent
          opacity={0.16}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {glow && (
        <sprite ref={sprite} scale={radius * 6.6}>
          <spriteMaterial
            map={glow}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </sprite>
      )}
    </group>
  );
};
