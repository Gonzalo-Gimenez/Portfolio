"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function cloudGeometry(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const dim = new THREE.Color("#61706a");
  const lit = new THREE.Color("#3d9a8a");
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 28;
    positions[i * 3 + 1] = Math.random() * 10 - 1.8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 28;
    const c = Math.random() > 0.9 ? lit : dim;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function latticeGeometry(step: number, extent: number, y: number) {
  const pts: number[] = [];
  const cols: number[] = [];
  const c = new THREE.Color("#3f4a46");
  for (let x = -extent; x <= extent; x += step) {
    for (let z = -extent; z <= extent; z += step) {
      pts.push(x, y, z);
      cols.push(c.r, c.g, c.b);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(pts), 3),
  );
  geometry.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array(cols), 3),
  );
  return geometry;
}

export function DataField() {
  const cloudGeom = useMemo(() => cloudGeometry(1400), []);
  const latticeGeom = useMemo(() => latticeGeometry(0.85, 14, -1.86), []);
  const cloudRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!cloudRef.current) return;
    cloudRef.current.rotation.y = state.clock.elapsedTime * 0.016;
  });

  return (
    <group>
      <points ref={cloudRef} geometry={cloudGeom}>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.72}
          sizeAttenuation
          depthWrite={false}
          toneMapped={false}
        />
      </points>
      <points geometry={latticeGeom}>
        <pointsMaterial
          size={0.018}
          vertexColors
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
          toneMapped={false}
        />
      </points>
    </group>
  );
}
