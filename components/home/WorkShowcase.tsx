import Link from "next/link";

import { CoverMedia } from "@/components/media/CoverMedia";
import { WORKS, type WorkItem } from "@/lib/projects";

function Stack({ work }: { work: WorkItem }) {
  return (
    <p className="mt-5 max-w-[52ch] text-sm text-[var(--text-muted)]">
      {work.stack.join(" · ")}
    </p>
  );
}

function WorkCopy({ work }: { work: WorkItem }) {
  return (
    <>
      <p className="text-sm text-[var(--accent)]">
        {work.roleLabel}
        {work.status === "proximo" ? " · próximo" : ""}
      </p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
        {work.title}
      </h2>
      <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-[var(--text-secondary)]">
        {work.why}
      </p>
      <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-[var(--text-muted)]">
        {work.architecture}
      </p>
      <Stack work={work} />
    </>
  );
}

export function WorkShowcase() {
  const [insight, energia, flota] = WORKS;

  return (
    <div>
      <Link
        href={`/trabajo/${insight.slug}`}
        className="group relative block min-h-[88dvh] overflow-hidden"
      >
        <CoverMedia src={insight.coverPath} alt="" motion="zoom" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(13,16,18,0.92)_88%)]"
        />
        <div className="relative z-10 flex min-h-[88dvh] items-end px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto w-full max-w-6xl">
            <WorkCopy work={insight} />
          </div>
        </div>
      </Link>

      <Link
        href={`/trabajo/${energia.slug}`}
        className="group grid overflow-hidden border-t border-[var(--border)] lg:grid-cols-2"
      >
        <div className="flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto w-full max-w-xl">
            <WorkCopy work={energia} />
          </div>
        </div>
        <div className="relative min-h-[52dvh] lg:min-h-[88dvh]">
          <CoverMedia
            src={energia.coverPath}
            alt=""
            motion="rise"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </Link>

      <Link
        href={`/trabajo/${flota.slug}`}
        className="group relative block min-h-[88dvh] overflow-hidden border-t border-[var(--border)]"
      >
        <CoverMedia src={flota.coverPath} alt="" motion="drift" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,16,18,0.55)_0%,rgba(13,16,18,0.2)_35%,rgba(13,16,18,0.9)_100%)]"
        />
        <div className="relative z-10 flex min-h-[88dvh] items-end px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto w-full max-w-6xl">
            <WorkCopy work={flota} />
          </div>
        </div>
      </Link>
    </div>
  );
}
