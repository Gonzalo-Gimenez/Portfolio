"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/lib/hooks/use-media";

export function XenonCursor() {
  const orb = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = orb.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const pos = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35 };
    const cur = { x: pos.x, y: pos.y };
    let visible = 0;
    let target = 0;
    let raf = 0;
    let running = true;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      target = 1;
    };

    const onLeave = () => {
      target = 0;
    };

    const tick = () => {
      if (!running) return;
      cur.x += (pos.x - cur.x) * 0.11;
      cur.y += (pos.y - cur.y) * 0.11;
      visible += (target - visible) * 0.08;
      el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%)`;
      el.style.opacity = String(visible);
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = window.requestAnimationFrame(tick);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[18] overflow-hidden"
    >
      <div ref={orb} className="xenon-mouse-orb" />
    </div>
  );
}
