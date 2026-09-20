"use client";

import dynamic from "next/dynamic";

import { SceneErrorBoundary } from "@/components/index/SceneErrorBoundary";

const WorkIndexScene = dynamic(() => import("./WorkIndexScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-[var(--text-muted)]">
      Cargando escena
    </div>
  ),
});

export function WorkIndexCanvas() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <SceneErrorBoundary>
        <WorkIndexScene />
      </SceneErrorBoundary>
    </div>
  );
}
