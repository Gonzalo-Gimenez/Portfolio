"use client";

import Link from "next/link";

import { WORKS } from "@/lib/projects";

export function WorkIndexFallback() {
  return (
    <div
      className="grid flex-1 gap-4 p-5 sm:grid-cols-3 sm:gap-5 sm:p-8 lg:items-end lg:pb-12"
      role="list"
      aria-label="Selección de proyectos"
    >
      {WORKS.map((work) => (
        <article
          key={work.slug}
          role="listitem"
          className="flex min-h-[140px] flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 transition-[transform,background-color] duration-300 hover:bg-[var(--surface-hover)] active:scale-[0.99] sm:min-h-[200px]"
        >
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              {work.title}
            </h2>
            <p className="text-sm text-[var(--accent)]">{work.roleLabel}</p>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {work.tagline}
            </p>
          </div>
          <Link
            href={`/trabajo/${work.slug}`}
            className="mt-4 inline-flex w-fit rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-fg)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-primary)]"
          >
            Ver caso
          </Link>
        </article>
      ))}
    </div>
  );
}
