"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, RoundedBox, Text } from "@react-three/drei";
import type { Group, Mesh } from "three";

import { WORKS, type WorkSlug } from "@/lib/projects";

const POSITIONS: [number, number, number][] = [
  [-2.8, 0.1, 0.4],
  [0, 0.45, -0.2],
  [2.8, 0, 0.5],
];

const ACCENT = "#3d9a8a";

function WorkOrb({
  slug,
  title,
  roleLabel,
  status,
  position,
  index,
}: {
  slug: WorkSlug;
  title: string;
  roleLabel: string;
  status: "shipped" | "proximo";
  position: [number, number, number];
  index: number;
}) {
  const router = useRouter();
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.15 + index) * 0.08;
  });

  const active = hovered;

  return (
    <group position={position} ref={group}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
        <RoundedBox
          ref={mesh}
          args={[1.65, 2.05, 0.12]}
          radius={0.08}
          smoothness={4}
          onClick={() => router.push(`/trabajo/${slug}`)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={active ? 1.06 : 1}
        >
          <MeshDistortMaterial
            color={active ? "#1a2428" : "#12181c"}
            emissive={ACCENT}
            emissiveIntensity={active ? 0.35 : 0.12}
            roughness={0.45}
            metalness={0.2}
            distort={active ? 0.18 : 0.08}
            speed={1.5}
          />
        </RoundedBox>
        <Text
          position={[0, 0.35, 0.08]}
          fontSize={0.22}
          color="#e8ecef"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.4}
        >
          {title}
        </Text>
        <Text
          position={[0, 0.05, 0.08]}
          fontSize={0.14}
          color={ACCENT}
          anchorX="center"
          anchorY="middle"
        >
          {roleLabel}
        </Text>
        {status === "proximo" ? (
          <Text
            position={[0, -0.28, 0.08]}
            fontSize={0.11}
            color="#8a9399"
            anchorX="center"
            anchorY="middle"
          >
            próximo
          </Text>
        ) : null}
      </Float>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} />
      <pointLight position={[-4, 2, -2]} intensity={0.4} color={ACCENT} />
    </>
  );
}

export default function WorkIndexScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 7.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className="touch-none"
      style={{ background: "transparent" }}
    >
      <SceneLights />
      {WORKS.map((work, i) => (
        <WorkOrb
          key={work.slug}
          slug={work.slug}
          title={work.title}
          roleLabel={work.roleLabel}
          status={work.status}
          position={POSITIONS[i]}
          index={i}
        />
      ))}
    </Canvas>
  );
}
