"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

import { WORKS, type WorkItem } from "@/lib/projects";
import { usePrefersReducedMotion, useGalleryDensity, type GalleryDensity } from "@/lib/hooks/use-media";

const COUNT = WORKS.length;
const CARD_W = 3.85;
const CARD_H = 2.42;
const FRAME_W = CARD_W + 0.08;
const FRAME_H = CARD_H + 0.08;
const FRAME_CORE = 0.01;
const SCREEN_W = FRAME_W - FRAME_CORE * 2;
const SCREEN_H = FRAME_H - FRAME_CORE * 2;
const FRAME_RADIUS = 0.008;
const XENON_WHITE = "#fff8fb";
const XENON_ROSE = "#ffd9e8";

type Slot = {
  x: number;
  y: number;
  z: number;
  rotY: number;
  scale: number;
};

function signedOffset(cardIndex: number, activeIndex: number): number {
  let delta = cardIndex - activeIndex;
  const half = Math.floor(COUNT / 2);
  if (delta > half) delta -= COUNT;
  if (delta < -half) delta += COUNT;
  return delta;
}

function slotFromOffset(offset: number, density: GalleryDensity): Slot {
  const abs = Math.abs(offset);
  if (density === "phone") {
    const theta = offset * 0.36;
    const radius = 2.45;
    return {
      x: Math.sin(theta) * radius,
      y: 0.1,
      z: -(1 - Math.cos(theta)) * 1.55 + (abs === 0 ? 0.28 : 0),
      rotY: -theta * 0.78,
      scale: abs === 0 ? 0.72 : Math.max(0.46, 0.62 - abs * 0.12),
    };
  }
  if (density === "tablet") {
    const theta = offset * 0.4;
    const radius = 3.45;
    return {
      x: Math.sin(theta) * radius,
      y: 0.22,
      z: -(1 - Math.cos(theta)) * 2.05 + (abs === 0 ? 0.36 : 0),
      rotY: -theta * 0.82,
      scale: abs === 0 ? 0.86 : Math.max(0.46, 0.72 - abs * 0.12),
    };
  }
  const sign = Math.sign(offset);
  const thetaAbs =
    abs <= 1
      ? abs * 0.34
      : abs <= 2
        ? 0.34 + (abs - 1) * 0.27
        : abs <= 3
          ? 0.61 + (abs - 2) * 0.4
          : 1.01 + (abs - 3) * 0.26;
  const theta = sign * thetaAbs;
  const radius = 4.95;
  return {
    x: Math.sin(theta) * radius,
    y: 0.42,
    z: -(1 - Math.cos(theta)) * 2.2 + (abs === 0 ? 0.55 : 0),
    rotY: -theta * 0.74,
    scale: abs === 0 ? 1.08 : Math.max(0.44, 0.86 - abs * 0.1),
  };
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
      haloGeo: new THREE.TubeGeometry(path, 220, 0.028, 10, true),
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

let frameGlowTextureSoft: THREE.CanvasTexture | null = null;
let platformGlowTexture: THREE.CanvasTexture | null = null;

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

function getPlatformGlowTexture() {
  if (platformGlowTexture) return platformGlowTexture;
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    platformGlowTexture = new THREE.CanvasTexture(canvas);
    return platformGlowTexture;
  }

  const cx = size / 2;
  const cy = size / 2;
  ctx.clearRect(0, 0, size, size);

  const bloom = ctx.createRadialGradient(cx, cy, 4, cx, cy, size * 0.5);
  bloom.addColorStop(0, "rgba(255, 252, 255, 0.38)");
  bloom.addColorStop(0.12, "rgba(186, 232, 255, 0.22)");
  bloom.addColorStop(0.32, "rgba(122, 200, 255, 0.1)");
  bloom.addColorStop(0.55, "rgba(80, 170, 230, 0.04)");
  bloom.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = bloom;
  ctx.fillRect(0, 0, size, size);

  platformGlowTexture = new THREE.CanvasTexture(canvas);
  platformGlowTexture.colorSpace = THREE.SRGBColorSpace;
  platformGlowTexture.needsUpdate = true;
  return platformGlowTexture;
}

function PlatformBase({
  strength,
  reduced,
}: {
  strength: number;
  reduced: boolean;
}) {
  const wash = useRef<THREE.MeshBasicMaterial>(null);
  const glow = useRef<THREE.MeshBasicMaterial>(null);
  const glowMap = useMemo(() => getPlatformGlowTexture(), []);
  const y = -CARD_H / 2 - 0.38;

  useFrame(({ clock }) => {
    const pulse = reduced
      ? 0.72
      : 0.64 + Math.sin(clock.elapsedTime * 0.85) * 0.08;
    const k = pulse * strength;
    if (wash.current) wash.current.opacity = 0.38 * k;
    if (glow.current) glow.current.opacity = 0.28 * k;
  });

  return (
    <group position={[0, y, 0.06]}>
      <pointLight
        position={[0, 0.18, 0.1]}
        intensity={0.55 * strength}
        color="#d7f3ff"
        distance={3.4}
        decay={2}
      />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, 0]}
        raycast={() => null}
      >
        <planeGeometry args={[CARD_W * 3.4, CARD_W * 2.4]} />
        <meshBasicMaterial
          ref={wash}
          map={glowMap}
          transparent
          opacity={0.35}
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} raycast={() => null}>
        <planeGeometry args={[CARD_W * 2.1, CARD_W * 1.55]} />
        <meshBasicMaterial
          ref={glow}
          map={glowMap}
          transparent
          opacity={0.26}
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function ProjectCard({
  work,
  cardIndex,
  activeIndex,
  textures,
  onSelectSide,
  reduced,
  density,
}: {
  work: WorkItem;
  cardIndex: number;
  activeIndex: number;
  textures: THREE.Texture[];
  onSelectSide: (index: number) => void;
  reduced: boolean;
  density: GalleryDensity;
}) {
  const router = useRouter();
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const texture = textures[cardIndex];
  const offset = signedOffset(cardIndex, activeIndex);
  const isFront = offset === 0;
  const slot = slotFromOffset(offset, density);
  const targetPos = useRef(new THREE.Vector3(slot.x, slot.y, slot.z));
  const rimStrength = isFront ? 1 : hovered ? 0.85 : 0.45;
  const platformStrength = isFront
    ? 1
    : hovered
      ? 0.45
      : Math.max(0.12, 0.28 - Math.abs(offset) * 0.06);

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
    const hoverBoost = hovered ? (isFront ? 1.03 : 1.1) : 1;
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
      <PlatformBase strength={platformStrength} reduced={reduced} />
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
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <XenonFrame reduced={reduced} strength={rimStrength} />
    </group>
  );
}

function SceneCamera({ density }: { density: GalleryDensity }) {
  const camera = useThree((s) => s.camera as THREE.PerspectiveCamera);
  useLayoutEffect(() => {
    const cfg =
      density === "phone"
        ? { pos: [0, 0.12, 6.65] as const, fov: 36 }
        : density === "tablet"
          ? { pos: [0, 0.2, 7.55] as const, fov: 34 }
          : { pos: [0, 0.28, 8.35] as const, fov: 34 };
    camera.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
    camera.fov = cfg.fov;
    camera.updateProjectionMatrix();
  }, [camera, density]);
  return null;
}

function CoverflowRig({
  activeIndex,
  onSelectSide,
  reduced,
  density,
}: {
  activeIndex: number;
  onSelectSide: (index: number) => void;
  reduced: boolean;
  density: GalleryDensity;
}) {
  const textures = useTexture(WORKS.map((w) => w.coverPath));
  const maxOffset =
    density === "phone" ? 1 : density === "tablet" ? 2 : Number.POSITIVE_INFINITY;

  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  }, [textures]);

  return (
    <>
      <SceneCamera density={density} />
      <fog attach="fog" args={["#101318", 18, 32]} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 5, 6]} intensity={0.55} />
      <spotLight
        position={[0, 3, 6]}
        angle={0.55}
        penumbra={0.7}
        intensity={0.9}
        color="#e8f4ff"
      />
      {WORKS.map((work, i) =>
        Math.abs(signedOffset(i, activeIndex)) > maxOffset ? null : (
          <ProjectCard
            key={work.slug}
            work={work}
            cardIndex={i}
            activeIndex={activeIndex}
            textures={textures}
            onSelectSide={onSelectSide}
            reduced={reduced}
            density={density}
          />
        ),
      )}
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
  const density = useGalleryDensity();

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.28, 8.35], fov: 34 }}
        dpr={[1, density === "phone" ? 1.5 : 1.75]}
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
            density={density}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
