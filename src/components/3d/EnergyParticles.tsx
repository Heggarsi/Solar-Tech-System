import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Seed {
  offset: number;
  lane: number;
  depth: number;
  speed: number;
}

/**
 * Energy travelling from the array up the conductors and out to the grid.
 * One `points` object, positions rewritten per frame — no per-particle meshes.
 */
export const EnergyParticles: React.FC<{ count?: number }> = ({ count = 160 }) => {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const seeds = useMemo<Seed[]>(
    () =>
      Array.from({ length: count }, () => ({
        offset: Math.random(),
        lane: (Math.random() - 0.5) * 2.4,
        depth: (Math.random() - 0.5) * 3.2,
        speed: 0.07 + Math.random() * 0.11,
      })),
    [count],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      const p = (s.offset + t * s.speed) % 1;
      // Rise from the field, converge toward the feeder, exit to the grid.
      const converge = p * p;
      positions[i * 3] = s.lane * (1 - converge) + converge * 1.1;
      positions[i * 3 + 1] = -0.2 + p * 5.4;
      positions[i * 3 + 2] = s.depth * (1 - converge) + converge * -4.5;
    }
    if (points.current) {
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#FFC24D"
        size={0.075}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
};
