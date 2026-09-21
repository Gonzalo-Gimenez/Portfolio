"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

import { DataField } from "@/components/index/DataField";
import { WORKS, type WorkItem } from "@/lib/projects";

const STELES: {
  position: [number, number, number];
  rotY: number;
  height: number;
  color: string;
}[] = [
  { position: [-2.05, 0, 0.3], rotY: 0.18, height: 3.35, color: "#1b322e" },
  { position: [0, 0, -0.35], rotY: -0.03, height: 4.05, color: "#2d261c" },
  { position: [2.05, 0, 0.22], rotY: -0.2, height: 3.2, color: "#1c2624" },
];

function Rig() {
  useFrame((state) => {
    const x = state.pointer.x * 1.15;
    const y = 0.42 + state.pointer.y * 0.38;
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      x,
      0.04,
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      y,
      0.04,
    );
    state.camera.lookAt(0, 0.2, 0);
  });
  return null;
}

function WorkStele({
  work,
  index,
  dimmed,
  onHover,
}: {
  work: WorkItem;
  index: number;
  dimmed: boolean;
  onHover: (value: number | null) => void;
}) {
  const router = useRouter();
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const stele = STELES[index];
  const target = useMemo(
    () => ({
      y: stele.height / 2 - 1.62,
      scale: hovered ? 1.045 : 1,
    }),
    [hovered, stele.height],
  );

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const restY = target.y + Math.sin(t * 0.45 + index * 1.3) * 0.05;
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      restY,
      0.08,
    );
    const s = THREE.MathUtils.lerp(group.current.scale.x, target.scale, 0.12);
    group.current.scale.setScalar(s);
  });

  return (
    <group
      ref={group}
      position={[stele.position[0], target.y, stele.position[2]]}
      rotation={[0, stele.rotY, 0]}
    >
      <RoundedBox
        args={[1.72, stele.height, 0.2]}
        radius={0.03}
        smoothness={4}
        onClick={() => router.push(`/trabajo/${work.slug}`)}
        onPointerOver={() => {
          setHovered(true);
          onHover(index);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
          document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial
          color={stele.color}
          roughness={0.32}
          metalness={0.45}
          emissive={hovered ? "#6ec8ff" : "#0b1016"}
          emissiveIntensity={hovered ? 0.22 : 0.04}
          transparent
          opacity={dimmed ? 0.42 : 1}
        />
      </RoundedBox>
    </group>
  );
}

export default function WorkIndexScene() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Canvas
      camera={{ position: [0, 0.5, 7.4], fov: 36 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", display: "block" }}
      eventPrefix="client"
    >
      <color attach="background" args={["#0d1012"]} />
      <fog attach="fog" args={["#0d1012", 7, 20]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 4]} intensity={1.4} />
      <pointLight position={[-4, 3, 2]} intensity={0.55} color="#6ec8ff" />
      <DataField />
      {WORKS.map((work, i) => (
        <WorkStele
          key={work.slug}
          work={work}
          index={i}
          dimmed={hovered !== null && hovered !== i}
          onHover={setHovered}
        />
      ))}
      <Rig />
    </Canvas>
  );
}
