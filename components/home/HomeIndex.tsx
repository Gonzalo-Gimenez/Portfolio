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
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
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
    <main className="absolute inset-0">
      {webgl === null ? (
        <div className="flex h-full items-center justify-center text-sm text-[var(--text-muted)]">
          Preparando índice
        </div>
      ) : use3D ? (
        <WorkIndexCanvas />
      ) : (
        <WorkIndexFallback />
      )}
    </main>
  );
}
