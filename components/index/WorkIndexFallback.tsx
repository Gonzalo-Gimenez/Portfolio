"use client";

import Image from "next/image";
import Link from "next/link";

import { WORKS } from "@/lib/projects";
import { SITE } from "@/lib/site";

export function WorkIndexFallback() {
  return (
    <div className="flex min-h-[100dvh] flex-col justify-end px-5 pb-28 pt-52 sm:px-8">
      <div className="mx-auto flex w-full max-w-5xl items-end gap-6 pb-8">
        <Image
          src={SITE.photoPath}
          alt=""
          width={72}
          height={96}
          className="hidden h-24 w-[4.5rem] object-cover object-top sm:block"
        />
        <p className="max-w-[40ch] text-sm text-[var(--text-secondary)]">
          {SITE.subtitle}
        </p>
      </div>
      <ul
        className="mx-auto w-full max-w-5xl"
        aria-label="Selección de proyectos"
      >
        {WORKS.map((work) => (
          <li key={work.slug}>
            <Link
              href={`/trabajo/${work.slug}`}
              className="flex items-baseline justify-between gap-6 border-t border-[var(--border)] py-6"
            >
              <span className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
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
