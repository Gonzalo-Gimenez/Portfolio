"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/lib/hooks/use-media";

export function XenonCursor() {
  const orb = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = orb.current;
    if (!el || reduced) return;

    const pos = { x: window.innerWidth * 0.55, y: window.innerHeight * 0.38 };
    const cur = { x: pos.x, y: pos.y };
    let raf = 0;
    let running = true;

    const onMove = (e: PointerEvent | MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    const tick = () => {
      if (!running) return;
      cur.x += (pos.x - cur.x) * 0.14;
      cur.y += (pos.y - cur.y) * 0.14;
      el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = window.requestAnimationFrame(tick);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduced]);

  if (reduced) return null;

  return <div ref={orb} aria-hidden className="xenon-mouse-orb" />;
}
