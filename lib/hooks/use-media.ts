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
