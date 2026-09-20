"use client";

import Link from "next/link";

import { WORKS } from "@/lib/projects";

export function WorkIndexFallback() {
  return (
    <div className="flex h-full flex-col justify-center px-5 sm:px-8">
      <ul className="w-full" aria-label="Selección de proyectos">
        {WORKS.map((work) => (
          <li key={work.slug}>
            <Link
              href={`/trabajo/${work.slug}`}
              className="flex items-baseline justify-between gap-6 border-t border-[var(--border)] py-5"
            >
              <span className="text-2xl font-semibold tracking-tight sm:text-4xl">
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
