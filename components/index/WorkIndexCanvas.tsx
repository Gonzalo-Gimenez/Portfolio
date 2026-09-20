"use client";

import dynamic from "next/dynamic";

const WorkIndexScene = dynamic(() => import("./WorkIndexScene"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-full min-h-[280px] items-center justify-center text-sm text-[var(--text-muted)]"
      aria-live="polite"
    >
      Cargando vista espacial…
    </div>
  ),
});

export function WorkIndexCanvas() {
  return (
    <div className="relative h-full min-h-[min(52dvh,520px)] w-full flex-1">
      <WorkIndexScene />
    </div>
  );
}
