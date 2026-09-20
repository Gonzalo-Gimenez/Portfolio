"use client";

import Link from "next/link";

import { WORKS } from "@/lib/projects";

export function WorkIndexFallback() {
  return (
    <div className="flex min-h-[100dvh] flex-col justify-end px-5 pb-28 pt-48 sm:px-8">
      <ul className="mx-auto w-full max-w-5xl space-y-1" aria-label="Selección de proyectos">
        {WORKS.map((work) => (
          <li key={work.slug}>
            <Link
              href={`/trabajo/${work.slug}`}
              className="group flex items-baseline justify-between gap-6 border-t border-[var(--border)] py-6"
            >
              <span className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
                {work.title}
              </span>
              <span className="shrink-0 text-sm text-[var(--accent)]">
                {work.roleLabel}
                {work.status === "proximo" ? " · próximo" : ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
