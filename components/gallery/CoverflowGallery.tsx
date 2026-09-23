"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

import { SceneErrorBoundary } from "@/components/index/SceneErrorBoundary";
import { CenterRule } from "@/components/layout/SectionMark";
import { WorkIndexFallback } from "@/components/index/WorkIndexFallback";
import { SkillChip } from "@/components/home/SkillIcon";
import { WORKS, localizeWork } from "@/lib/projects";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  usePrefersReducedMotion,
  useWebGLAvailable,
} from "@/lib/hooks/use-media";

function GalleryLoading() {
  const { t } = useLocale();
  return (
    <div className="flex min-h-[70dvh] items-center justify-center text-sm text-[var(--text-muted)]">
      {t.galleryLoading}
    </div>
  );
}

const CoverflowScene = dynamic(() => import("./CoverflowScene"), {
  ssr: false,
  loading: () => <GalleryLoading />,
});

function ProjectHud({ activeIndex }: { activeIndex: number }) {
  const { locale, t } = useLocale();
  const source = WORKS[activeIndex];
  if (!source) return null;
  const work = localizeWork(source, locale);

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
          {t.viewCase}
        </Link>
      </div>
    </div>
  );
}

const WORK_COUNT = WORKS.length;

export function CoverflowGallery() {
  const { t } = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
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
    if (!use3D || paused) return;
    const id = window.setInterval(goNext, 4200);
    return () => window.clearInterval(id);
  }, [use3D, paused, goNext, activeIndex]);

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
    setPaused(true);
  };

  const finishDrag = (clientX: number, clientY: number) => {
    if (dragStart.current === null) return;
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    dragStart.current = null;
    setPaused(false);
    if (Math.abs(dx) < 56) return;
    if (Math.abs(dy) >= Math.abs(dx) * 0.7) return;
    if (dx > 0) goPrev();
    else goNext();
  };

  return (
    <section id="proyectos" className="scroll-mt-16" aria-label={t.galleryTitle}>
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <CenterRule />
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {t.galleryTitle}
          </h2>
        </div>

        {webgl === null ? (
          <div className="mt-8 flex h-[38rem] items-center justify-center text-sm text-[var(--text-muted)] sm:mt-10 sm:h-[44rem]">
            {t.galleryPreparing}
          </div>
        ) : use3D ? (
          <div
            className="relative mt-8 h-[40rem] w-full touch-pan-y sm:mt-10 sm:h-[46rem] [mask-image:linear-gradient(to_bottom,#000_0%,#000_82%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_82%,transparent_100%)]"
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

        <div className="relative z-10 -mt-16 flex justify-center gap-16 pb-8 sm:-mt-20 sm:gap-24">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg-base)_40%,transparent)] text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
            aria-label={t.prevProject}
          >
            <CaretLeft size={22} weight="bold" aria-hidden />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg-base)_40%,transparent)] text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
            aria-label={t.nextProject}
          >
            <CaretRight size={22} weight="bold" aria-hidden />
          </button>
        </div>

        <div className="px-5 pb-20 pt-6 sm:px-8 sm:pb-28 sm:pt-8">
          <ProjectHud activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  );
}
