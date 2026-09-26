"use client";

import Link from "next/link";

import { WORKS, localizeWork } from "@/lib/projects";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function WorkIndexFallback() {
  const { locale, t } = useLocale();

  return (
    <div className="flex h-full flex-col justify-center px-5 sm:px-8">
      <ul className="w-full" aria-label={t.galleryTitle}>
        {WORKS.map((item) => {
          const work = localizeWork(item, locale);
          return (
            <li key={work.slug}>
              <Link
                href={`/trabajo/${work.slug}`}
                className="flex items-baseline justify-between gap-6 border-t border-[var(--border)] py-5"
              >
                <span className="truncate text-xl font-semibold tracking-tight sm:text-2xl md:text-4xl">
                  {work.title}
                </span>
                <span className="shrink-0 text-sm text-[var(--accent)]">
                  {work.roleLabel}
                  {work.status === "proximo" ? ` · ${t.caseUpcoming}` : ""}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
