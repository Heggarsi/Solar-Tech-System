import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COLS = 16;
const ROWS = 8;
const SPACING = 1.55;
const TOTAL = COLS * ROWS;

/**
 * The field of modules the sun tracks across. Instanced in a single draw call —
 * one mesh, one material, `TOTAL` matrices.
 */
export const PanelArray: React.FC<{ tilt?: number }> = ({ tilt = -0.5 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const rig = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geometry = useMemo(() => new THREE.PlaneGeometry(1.32, 0.94), []);

  useLayoutEffect(() => {
    const instanced = mesh.current;
    if (!instanced) return;
    let i = 0;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        dummy.position.set(
          (col - (COLS - 1) / 2) * SPACING,
          // Gentle terrain so the field is not a perfect plane.
          Math.sin(col * 0.7) * 0.06 + Math.cos(row * 0.9) * 0.05,
          (row - (ROWS - 1) / 2) * SPACING,
        );
        dummy.updateMatrix();
        instanced.setMatrixAt(i, dummy.matrix);
        i++;
      }
    }
    instanced.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  useFrame((state) => {
    if (!rig.current) return;
    // The whole field eases toward the sun as it climbs.
    const t = state.clock.elapsedTime;
    rig.current.rotation.y = Math.sin(t * 0.06) * 0.05;
  });

  return (
    <group ref={rig} rotation={[tilt, 0, 0]}>
      <instancedMesh ref={mesh} args={[geometry, undefined, TOTAL]} frustumCulled={false}>
        <meshStandardMaterial
          color="#0B2036"
          metalness={0.72}
          roughness={0.28}
          emissive="#0A2E4A"
          emissiveIntensity={0.35}
        />
      </instancedMesh>

      {/* Sub-ground haze so the array sits in atmosphere rather than in a void. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
        <planeGeometry args={[70, 70]} />
        <meshBasicMaterial color="#061220" transparent opacity={0.55} toneMapped={false} />
      </mesh>
    </group>
  );
};
