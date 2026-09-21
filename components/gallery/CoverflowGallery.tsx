"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

import { SceneErrorBoundary } from "@/components/index/SceneErrorBoundary";
import { CenterRule } from "@/components/layout/SectionMark";
import { WorkIndexFallback } from "@/components/index/WorkIndexFallback";
import { SkillChip } from "@/components/home/SkillIcon";
import { WORKS } from "@/lib/projects";
import {
  usePrefersReducedMotion,
  useWebGLAvailable,
} from "@/lib/hooks/use-media";

const CoverflowScene = dynamic(() => import("./CoverflowScene"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[70dvh] items-center justify-center text-sm text-[var(--text-muted)]">
      Cargando galería
    </div>
  ),
});

function ProjectHud({ activeIndex }: { activeIndex: number }) {
  const work = WORKS[activeIndex];

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 text-center">
      <p className="xenon-text text-sm">{work.roleLabel}</p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {work.title}
      </h2>
      <p className="text-base leading-relaxed text-[var(--text-secondary)]">
        {work.tagline}
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {work.stack.map((tech) => (
          <li key={tech}>
            <SkillChip name={tech} />
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href={`/trabajo/${work.slug}`}
          className="xenon-fill inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-fg)] transition-transform hover:scale-[0.98] active:scale-[0.97]"
        >
          Ver caso
        </Link>
        {work.demoUrl ? (
          <a
            href={work.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-[var(--border)] px-5 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
          >
            Demo
          </a>
        ) : null}
        {work.repoUrl ? (
          <a
            href={work.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-[var(--border)] px-5 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
          >
            GitHub
          </a>
        ) : null}
      </div>
    </div>
  );
}

const WORK_COUNT = WORKS.length;

export function CoverflowGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const webgl = useWebGLAvailable();
  const use3D = webgl === true && !reducedMotion;
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + WORK_COUNT) % WORK_COUNT);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % WORK_COUNT);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const onPointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const finishDrag = (clientX: number, clientY: number) => {
    if (dragStart.current === null) return;
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    dragStart.current = null;
    if (Math.abs(dx) < 56) return;
    if (Math.abs(dy) >= Math.abs(dx) * 0.7) return;
    if (dx > 0) goPrev();
    else goNext();
  };

  return (
    <section id="proyectos" className="scroll-mt-16" aria-label="Proyectos">
      <div className="relative">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <CenterRule />
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Proyectos
          </h2>
        </div>

        {webgl === null ? (
          <div className="flex h-[34rem] items-center justify-center text-sm text-[var(--text-muted)] sm:h-[40rem]">
            Preparando galería
          </div>
        ) : use3D ? (
          <div
            className="relative h-[34rem] w-full touch-pan-y sm:h-[40rem]"
            onPointerDown={onPointerDown}
            onPointerUp={(e) => finishDrag(e.clientX, e.clientY)}
            onPointerCancel={() => {
              dragStart.current = null;
            }}
            onPointerLeave={() => {
              dragStart.current = null;
            }}
          >
            <SceneErrorBoundary>
              <CoverflowScene
                activeIndex={activeIndex}
                onSelectSide={setActiveIndex}
              />
            </SceneErrorBoundary>
          </div>
        ) : (
          <div className="min-h-[50dvh] px-5 py-16 sm:px-8">
            <WorkIndexFallback />
          </div>
        )}

        <div className="flex justify-center gap-6 pb-6">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg-base)_40%,transparent)] text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
            aria-label="Proyecto anterior"
          >
            <CaretLeft size={22} weight="bold" aria-hidden />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg-base)_40%,transparent)] text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
            aria-label="Proyecto siguiente"
          >
            <CaretRight size={22} weight="bold" aria-hidden />
          </button>
        </div>

        <div className="px-5 pb-20 pt-2 sm:px-8 sm:pb-28">
          <ProjectHud activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  );
}
