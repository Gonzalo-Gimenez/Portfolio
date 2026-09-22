"use client";

import { Suspense, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

import { WORKS, type WorkItem } from "@/lib/projects";
import { usePrefersReducedMotion } from "@/lib/hooks/use-media";

const COUNT = WORKS.length;
const CARD_W = 4.4;
const CARD_H = 2.48;
const FRAME_W = CARD_W + 0.08;
const FRAME_H = CARD_H + 0.08;
const FRAME_CORE = 0.01;
const SCREEN_W = FRAME_W - FRAME_CORE * 2;
const SCREEN_H = FRAME_H - FRAME_CORE * 2;
const FRAME_RADIUS = 0.008;
const XENON_WHITE = "#fff8fb";
const XENON_ROSE = "#ffd9e8";

const SLOTS = [
  { x: 0, y: 0, z: 0.55, rotY: 0, scale: 1.18 },
  { x: 3.05, y: 0, z: -1.05, rotY: -0.58, scale: 0.78 },
  { x: 0, y: 0, z: -2.45, rotY: 0, scale: 0.52 },
  { x: -3.05, y: 0, z: -1.05, rotY: 0.58, scale: 0.78 },
] as const;

function relativeSlot(cardIndex: number, activeIndex: number): number {
  return (cardIndex - activeIndex + COUNT) % COUNT;
}

function roundedRectPath(
  width: number,
  height: number,
  radius: number,
): THREE.CatmullRomCurve3 {
  const hw = width / 2;
  const hh = height / 2;
  const r = radius;
  const pts: THREE.Vector3[] = [];
  const corner = (
    cx: number,
    cy: number,
    from: number,
    to: number,
    steps = 10,
  ) => {
    for (let i = 0; i <= steps; i += 1) {
      const a = from + ((to - from) * i) / steps;
      pts.push(
        new THREE.Vector3(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0.012),
      );
    }
  };
  corner(-hw + r, -hh + r, Math.PI, Math.PI * 1.5);
  corner(hw - r, -hh + r, Math.PI * 1.5, Math.PI * 2);
  corner(hw - r, hh - r, 0, Math.PI / 2);
  corner(-hw + r, hh - r, Math.PI / 2, Math.PI);
  return new THREE.CatmullRomCurve3(pts, true, "catmullrom", 0.02);
}

function XenonFrame({
  reduced,
  strength,
}: {
  reduced: boolean;
  strength: number;
}) {
  const core = useRef<THREE.MeshBasicMaterial>(null);
  const halo = useRef<THREE.MeshBasicMaterial>(null);
  const { coreGeo, haloGeo } = useMemo(() => {
    const path = roundedRectPath(FRAME_W, FRAME_H, FRAME_RADIUS);
    return {
      coreGeo: new THREE.TubeGeometry(path, 220, FRAME_CORE, 10, true),
      haloGeo: new THREE.TubeGeometry(path, 220, 0.026, 10, true),
    };
  }, []);

  useFrame(({ clock }) => {
    const wave = reduced
      ? 0.78
      : 0.66 + Math.sin(clock.elapsedTime * 1.45) * 0.12;
    const flash = wave * strength;
    if (core.current) core.current.opacity = 0.42 + flash * 0.22;
    if (halo.current) halo.current.opacity = 0.1 + flash * 0.1;
  });

  return (
    <>
      <mesh geometry={haloGeo} raycast={() => null}>
        <meshBasicMaterial
          ref={halo}
          color={XENON_ROSE}
          transparent
          opacity={0.28}
          toneMapped={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh geometry={coreGeo} raycast={() => null}>
        <meshBasicMaterial
          ref={core}
          color={XENON_WHITE}
          transparent
          opacity={0.9}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

let haloTexture: THREE.CanvasTexture | null = null;
let frameGlowTextureSoft: THREE.CanvasTexture | null = null;

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function getFrameGlowTexture() {
  if (frameGlowTextureSoft) return frameGlowTextureSoft;
  const w = 768;
  const h = 480;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    frameGlowTextureSoft = new THREE.CanvasTexture(canvas);
    return frameGlowTextureSoft;
  }

  ctx.clearRect(0, 0, w, h);
  const inset = 96;
  const rw = w - inset * 2;
  const rh = h - inset * 2;
  const r = 4;

  const paintOuter = (blur: number, color: string) => {
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.fillStyle = "#fff8fb";
    roundRectPath(ctx, inset, inset, rw, rh, r);
    ctx.fill();
    ctx.restore();
  };

  paintOuter(58, "rgba(255, 244, 248, 0.55)");
  paintOuter(26, "rgba(255, 232, 240, 0.7)");

  ctx.globalCompositeOperation = "destination-out";
  roundRectPath(ctx, inset - 1, inset - 1, rw + 2, rh + 2, r);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";

  frameGlowTextureSoft = new THREE.CanvasTexture(canvas);
  frameGlowTextureSoft.colorSpace = THREE.SRGBColorSpace;
  frameGlowTextureSoft.needsUpdate = true;
  return frameGlowTextureSoft;
}

function getHaloTexture() {
  if (haloTexture) return haloTexture;
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    haloTexture = new THREE.CanvasTexture(canvas);
    return haloTexture;
  }

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.24;

  ctx.clearRect(0, 0, size, size);

  const bloom = ctx.createRadialGradient(
    cx,
    cy,
    radius * 0.35,
    cx,
    cy,
    size * 0.48,
  );
  bloom.addColorStop(0, "rgba(255, 255, 255, 0)");
  bloom.addColorStop(0.38, "rgba(255, 248, 252, 0)");
  bloom.addColorStop(0.52, "rgba(255, 236, 244, 0.2)");
  bloom.addColorStop(0.6, "rgba(255, 246, 250, 0.42)");
  bloom.addColorStop(0.7, "rgba(255, 228, 238, 0.16)");
  bloom.addColorStop(0.86, "rgba(255, 255, 255, 0)");
  bloom.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = bloom;
  ctx.fillRect(0, 0, size, size);

  ctx.save();
  ctx.shadowColor = "rgba(255, 214, 230, 0.9)";
  ctx.shadowBlur = 28;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 232, 240, 0.55)";
  ctx.lineWidth = 18;
  ctx.stroke();

  ctx.shadowColor = "#ffffff";
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 252, 254, 0.95)";
  ctx.lineWidth = 4.5;
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, -0.5, 0.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, Math.PI - 0.5, Math.PI + 0.5);
  ctx.stroke();
  ctx.restore();

  haloTexture = new THREE.CanvasTexture(canvas);
  haloTexture.colorSpace = THREE.SRGBColorSpace;
  haloTexture.needsUpdate = true;
  return haloTexture;
}

function FrameGlow({
  strength,
  reduced,
}: {
  strength: number;
  reduced: boolean;
}) {
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const texture = useMemo(() => getFrameGlowTexture(), []);

  useFrame(({ clock }) => {
    if (!mat.current) return;
    const pulse = reduced
      ? 0.72
      : 0.62 + Math.sin(clock.elapsedTime * 1.15) * 0.1;
    mat.current.opacity = pulse * strength;
  });

  return (
    <mesh position={[0, 0, -0.02]} raycast={() => null}>
      <planeGeometry args={[CARD_W * 1.2, CARD_H * 1.28]} />
      <meshBasicMaterial
        ref={mat}
        map={texture}
        transparent
        opacity={0.7}
        depthWrite={false}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function BottomWash({
  strength,
  reduced,
}: {
  strength: number;
  reduced: boolean;
}) {
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const texture = useMemo(() => getHaloTexture(), []);

  useFrame(({ clock }) => {
    if (!mat.current) return;
    const pulse = reduced
      ? 0.62
      : 0.5 + Math.sin(clock.elapsedTime * 1.2) * 0.12;
    mat.current.opacity = pulse * strength;
  });

  return (
    <>
      <pointLight
        position={[0, -FRAME_H / 2 - 0.22, 0.1]}
        intensity={1.15 * strength}
        color="#fff5f8"
        distance={1.7}
        decay={2}
      />
      <mesh
        position={[0, -FRAME_H / 2 - 0.16, -0.02]}
        rotation={[-Math.PI / 2 + 0.16, 0, 0]}
        raycast={() => null}
      >
        <planeGeometry args={[CARD_W * 1.06, CARD_W * 0.36]} />
        <meshBasicMaterial
          ref={mat}
          map={texture}
          transparent
          opacity={0.58}
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

function ProjectCard({
  work,
  cardIndex,
  activeIndex,
  textures,
  onSelectSide,
  reduced,
}: {
  work: WorkItem;
  cardIndex: number;
  activeIndex: number;
  textures: THREE.Texture[];
  onSelectSide: (index: number) => void;
  reduced: boolean;
}) {
  const router = useRouter();
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const texture = textures[cardIndex];
  const rel = relativeSlot(cardIndex, activeIndex);
  const isFront = rel === 0;
  const slot = SLOTS[rel] ?? SLOTS[0];
  const targetPos = useRef(new THREE.Vector3(slot.x, slot.y, slot.z));
  const rimStrength = isFront ? 1 : hovered ? 0.85 : 0.45;
  const washStrength = isFront ? 1 : hovered ? 0.7 : 0.4;

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  useFrame(() => {
    if (!group.current) return;
    targetPos.current.set(slot.x, slot.y, slot.z);
    group.current.position.lerp(targetPos.current, 0.14);
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      slot.rotY,
      0.14,
    );
    const hoverBoost = hovered ? (isFront ? 1.03 : 1.14) : 1;
    const s = THREE.MathUtils.lerp(
      group.current.scale.x,
      slot.scale * hoverBoost,
      0.16,
    );
    group.current.scale.setScalar(s);
  });

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (isFront) {
      router.push(`/trabajo/${work.slug}`);
      return;
    }
    onSelectSide(cardIndex);
  };

  const onOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const onOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  return (
    <group ref={group}>
      <BottomWash strength={washStrength} reduced={reduced} />
      <FrameGlow strength={rimStrength} reduced={reduced} />
      <mesh position={[0, 0, -0.02]} raycast={() => null}>
        <planeGeometry args={[FRAME_W, FRAME_H]} />
        <meshStandardMaterial
          color="#0a0c0d"
          roughness={0.35}
          metalness={0.5}
        />
      </mesh>
      <mesh
        position={[0, 0, 0.002]}
        onClick={onClick}
        onPointerOver={onOver}
        onPointerOut={onOut}
      >
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.3}
          metalness={0.1}
          toneMapped={false}
        />
      </mesh>
      <XenonFrame reduced={reduced} strength={rimStrength} />
    </group>
  );
}

function CoverflowRig({
  activeIndex,
  onSelectSide,
  reduced,
}: {
  activeIndex: number;
  onSelectSide: (index: number) => void;
  reduced: boolean;
}) {
  const textures = useTexture(WORKS.map((w) => w.coverPath));

  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  }, [textures]);

  return (
    <>
      <fog attach="fog" args={["#0c0f11", 14, 28]} />
      <ambientLight intensity={0.38} />
      <directionalLight position={[4, 5, 6]} intensity={1.2} />
      <spotLight
        position={[0, 3, 6]}
        angle={0.55}
        penumbra={0.7}
        intensity={1.6}
        color="#e8f4ff"
      />
      {WORKS.map((work, i) => (
        <ProjectCard
          key={work.slug}
          work={work}
          cardIndex={i}
          activeIndex={activeIndex}
          textures={textures}
          onSelectSide={onSelectSide}
          reduced={reduced}
        />
      ))}
    </>
  );
}

export default function CoverflowScene({
  activeIndex,
  onSelectSide,
}: {
  activeIndex: number;
  onSelectSide: (index: number) => void;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.05, 7.6], fov: 34 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          background: "transparent",
        }}
        eventSource={wrap as RefObject<HTMLElement>}
        eventPrefix="offset"
      >
        <Suspense fallback={null}>
          <CoverflowRig
            activeIndex={activeIndex}
            onSelectSide={onSelectSide}
            reduced={reduced}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
