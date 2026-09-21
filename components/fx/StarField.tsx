"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/lib/hooks/use-media";

type Star = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  tw: number;
  lit: boolean;
};

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let raf = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((window.innerWidth * window.innerHeight) / 4200);
      stars = Array.from({ length: Math.min(count, 280) }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.4 + 0.35,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.22,
        tw: Math.random() * Math.PI * 2,
        lit: Math.random() > 0.88,
      }));
    };

    const draw = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const s of stars) {
        if (!reduced) {
          s.x += s.vx;
          s.y += s.vy;
          s.tw += 0.028;
          if (s.x < 0) s.x = window.innerWidth;
          if (s.x > window.innerWidth) s.x = 0;
          if (s.y < 0) s.y = window.innerHeight;
          if (s.y > window.innerHeight) s.y = 0;
        }
        const pulse = reduced ? 0.7 : 0.45 + Math.sin(s.tw) * 0.35;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.lit
          ? `rgba(110, 200, 255, ${0.4 + pulse * 0.55})`
          : `rgba(176, 196, 214, ${0.16 + pulse * 0.28})`;
        ctx.fill();
      }
      if (!reduced) raf = window.requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    window.addEventListener("resize", resize);
    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
