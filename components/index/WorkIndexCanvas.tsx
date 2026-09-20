"use client";

import dynamic from "next/dynamic";

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
    <div className="h-full min-h-[100dvh] w-full">
      <WorkIndexScene />
    </div>
  );
}
