"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { WorkIndexCanvas } from "@/components/index/WorkIndexCanvas";
import { WorkIndexFallback } from "@/components/index/WorkIndexFallback";
import { WORKS } from "@/lib/projects";
import {
  usePrefersReducedMotion,
  useWebGLAvailable,
} from "@/lib/hooks/use-media";

export function HomeIndex() {
  const router = useRouter();
  const reducedMotion = usePrefersReducedMotion();
  const webgl = useWebGLAvailable();
  const use3D = webgl === true && !reducedMotion;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      const index = Number(e.key) - 1;
      if (index >= 0 && index < WORKS.length) {
        router.push(`/trabajo/${WORKS[index].slug}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <main className="relative flex min-h-[min(55dvh,560px)] flex-1 flex-col">
      {webgl === null ? (
        <div
          className="flex flex-1 items-center justify-center text-sm text-[var(--text-muted)]"
          aria-live="polite"
        >
          Preparando índice…
        </div>
      ) : use3D ? (
        <WorkIndexCanvas />
      ) : (
        <WorkIndexFallback />
      )}
      {webgl === true && !use3D && reducedMotion ? (
        <p className="px-5 pb-6 text-xs text-[var(--text-muted)] sm:px-8">
          Vista 2D activa por preferencia de movimiento reducido. Los enlaces
          del panel izquierdo abren cada proyecto.
        </p>
      ) : null}
      {webgl === false ? (
        <p className="px-5 pb-6 text-xs text-[var(--text-muted)] sm:px-8">
          WebGL no disponible en este navegador. Usá la grilla o los enlaces del
          panel.
        </p>
      ) : null}
    </main>
  );
}
