"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, Html } from "@react-three/drei";
import type { Group, Mesh } from "three";

import { WORKS, type WorkItem } from "@/lib/projects";

const PLATES: {
  position: [number, number, number];
  color: string;
  rot: [number, number, number];
}[] = [
  { position: [-3.4, 0.15, 0.2], color: "#1c3d38", rot: [0, 0.22, -0.04] },
  { position: [0.05, 0.55, -0.6], color: "#3a2a18", rot: [0, -0.04, 0.02] },
  { position: [3.35, -0.05, 0.35], color: "#1a2a22", rot: [0, -0.28, 0.05] },
];

function WorkPlate({
  work,
  index,
}: {
  work: WorkItem;
  index: number;
}) {
  const router = useRouter();
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const plate = PLATES[index];

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = plate.position[1] + Math.sin(t * 0.55 + index) * 0.08;
  });

  return (
    <group
      ref={group}
      position={plate.position}
      rotation={plate.rot}
    >
      <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.12}>
        <mesh
          ref={mesh}
          onClick={() => router.push(`/trabajo/${work.slug}`)}
          onPointerOver={() => {
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
          scale={hovered ? 1.05 : 1}
        >
          <boxGeometry args={[2.35, 3.15, 0.08]} />
          <meshStandardMaterial
            color={hovered ? "#243830" : plate.color}
            roughness={0.38}
            metalness={0.35}
            emissive={hovered ? "#3d9a8a" : "#0b1210"}
            emissiveIntensity={hovered ? 0.28 : 0.08}
          />
        </mesh>
        <Html
          position={[0, 0, 0.08]}
          center
          distanceFactor={6.2}
          style={{ pointerEvents: "none", width: "220px" }}
        >
          <div className="select-none text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[#f2f4f3]">
              {work.title}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#8fd4c6]">
              {work.roleLabel}
            </p>
            {work.status === "proximo" ? (
              <p className="mt-2 text-xs text-[#9aa3a8]">próximo</p>
            ) : null}
          </div>
        </Html>
      </Float>
    </group>
  );
}

export default function WorkIndexScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 8.4], fov: 38 }}
      gl={{ antialias: true, alpha: false }}
      className="h-full w-full"
    >
      <color attach="background" args={["#0b0e10"]} />
      <fog attach="fog" args={["#0b0e10", 8, 16]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 4]} intensity={1.35} />
      <pointLight position={[-5, 3, 2]} intensity={0.55} color="#3d9a8a" />
      <Grid
        position={[0, -2.05, 0]}
        args={[18, 18]}
        cellSize={0.55}
        cellThickness={0.6}
        cellColor="#1c2522"
        sectionSize={2.2}
        sectionThickness={1.1}
        sectionColor="#2c4a42"
        fadeDistance={14}
        fadeStrength={1.2}
        infiniteGrid
      />
      {WORKS.map((work, i) => (
        <WorkPlate key={work.slug} work={work} index={i} />
      ))}
    </Canvas>
  );
}
