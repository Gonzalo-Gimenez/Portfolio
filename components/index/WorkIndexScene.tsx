"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Html,
  MeshReflectorMaterial,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

import { WORKS, type WorkItem } from "@/lib/projects";

const STELES: {
  position: [number, number, number];
  rotY: number;
  height: number;
  color: string;
}[] = [
  { position: [-2.55, 0, 0.35], rotY: 0.22, height: 3.35, color: "#1b322e" },
  { position: [0.05, 0, -0.45], rotY: -0.04, height: 4.05, color: "#2d261c" },
  { position: [2.55, 0, 0.28], rotY: -0.24, height: 3.2, color: "#1c2624" },
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
    const s = THREE.MathUtils.lerp(
      group.current.scale.x,
      target.scale,
      0.12,
    );
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
        <meshPhysicalMaterial
          color={stele.color}
          roughness={0.22}
          metalness={0.72}
          clearcoat={1}
          clearcoatRoughness={0.18}
          emissive={hovered ? "#3d9a8a" : "#0c1211"}
          emissiveIntensity={hovered ? 0.22 : 0.04}
          transparent
          opacity={dimmed ? 0.38 : 1}
          envMapIntensity={1.15}
        />
      </RoundedBox>
      <Html
        transform
        position={[0, 0.05, 0.12]}
        style={{ pointerEvents: "none", width: "190px" }}
      >
        <div className="select-none text-center">
          <p
            className="text-[22px] font-semibold tracking-tight text-[#f1f2f0]"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            {work.title}
          </p>
          <p
            className="mt-1 text-[11px] text-[#8fd4c6]"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            {work.roleLabel}
            {work.status === "proximo" ? " · próximo" : ""}
          </p>
        </div>
      </Html>
    </group>
  );
}

function Floor() {
  const resolution = typeof window === "undefined" ? 256 : window.innerWidth < 768 ? 192 : 384;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.72, 0]}>
      <planeGeometry args={[28, 28]} />
      <MeshReflectorMaterial
        blur={[200, 60]}
        resolution={resolution}
        mixBlur={0.85}
        mixStrength={28}
        roughness={0.95}
        depthScale={1.1}
        minDepthThreshold={0.35}
        maxDepthThreshold={1.35}
        color="#141618"
        metalness={0.55}
        mirror={0.35}
      />
    </mesh>
  );
}

export default function WorkIndexScene() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Canvas
      camera={{ position: [0, 0.45, 7.6], fov: 36 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      className="h-full w-full"
    >
      <color attach="background" args={["#121416"]} />
      <fog attach="fog" args={["#121416", 7.5, 16]} />
      <ambientLight intensity={0.18} />
      <spotLight
        position={[6, 9, 5]}
        angle={0.42}
        penumbra={0.9}
        intensity={48}
        color="#d7ddd8"
      />
      <spotLight
        position={[-5, 6, 3]}
        angle={0.5}
        penumbra={1}
        intensity={16}
        color="#3d9a8a"
      />
      <Environment preset="city" environmentIntensity={0.55} />
      <Floor />
      <ContactShadows
        position={[0, -1.71, 0]}
        opacity={0.42}
        scale={16}
        blur={2.6}
        far={5}
      />
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
