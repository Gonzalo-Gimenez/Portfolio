"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useWebGLAvailable(): boolean | null {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
      setOk(Boolean(gl));
    } catch {
      setOk(false);
    }
  }, []);

  return ok;
}

export type GalleryDensity = "phone" | "tablet" | "desktop";

function densityFromWidth(width: number): GalleryDensity {
  if (width <= 639) return "phone";
  if (width <= 1023) return "tablet";
  return "desktop";
}

export function useGalleryDensity(): GalleryDensity {
  const [density, setDensity] = useState<GalleryDensity>(() =>
    typeof window === "undefined"
      ? "desktop"
      : densityFromWidth(window.innerWidth),
  );

  useEffect(() => {
    const phone = window.matchMedia("(max-width: 639px)");
    const tablet = window.matchMedia("(max-width: 1023px)");
    const update = () => setDensity(densityFromWidth(window.innerWidth));
    update();
    phone.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      phone.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);

  return density;
}
