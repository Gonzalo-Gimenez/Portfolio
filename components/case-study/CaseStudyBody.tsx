"use client";

import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

import type { WorkItem } from "@/lib/projects";
import { localizeWork } from "@/lib/projects";
import { SkillChip } from "@/components/home/SkillIcon";
import { XenonCover } from "@/components/media/XenonCover";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function CaseStudyBody({ work }: { work: WorkItem }) {
  const { locale, t } = useLocale();
  const copy = localizeWork(work, locale);

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <Link
        href="/#proyectos"
        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <ArrowLeft size={16} weight="regular" aria-hidden />
        {t.caseBack}
      </Link>

      <div className="mt-8">
        <XenonCover src={copy.coverPath} alt={copy.title} />
      </div>

      <header className="mt-8">
        <p className="xenon-text text-sm">{copy.roleLabel}</p>
        <div className="mt-2 flex flex-wrap items-baseline gap-3">
          <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-semibold tracking-[-0.03em]">
            {copy.title}
          </h1>
          {copy.status === "proximo" ? (
            <span className="rounded-full border border-[var(--border)] px-3 py-0.5 text-xs text-[var(--text-muted)]">
              {t.caseUpcoming}
            </span>
          ) : null}
        </div>
        <p className="mt-3 max-w-[52ch] text-base text-[var(--text-secondary)]">
          {copy.tagline}
        </p>
      </header>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <section>
          <h2 className="text-sm text-[var(--text-muted)]">{t.caseWhy}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {copy.why}
          </p>
          {copy.siteUrl ? (
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              {t.caseLanding}:{" "}
              <a
                href={copy.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] underline underline-offset-4 hover:text-[var(--text-primary)]"
              >
                {copy.siteUrl.replace(/^https?:\/\//, "")}
              </a>
            </p>
          ) : null}
        </section>
        <section>
          <h2 className="text-sm text-[var(--text-muted)]">{t.caseHow}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {copy.architecture}
          </p>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="text-sm text-[var(--text-muted)]">{t.caseShows}</h2>
        <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
          {copy.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-sm text-[var(--text-muted)]">{t.caseStack}</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {copy.stack.map((tech) => (
            <li key={tech}>
              <SkillChip name={tech} />
            </li>
          ))}
        </ul>
      </section>

      {copy.status === "proximo" ? (
        <p className="mt-8 text-sm text-[var(--text-muted)]">{t.caseSoon}</p>
      ) : null}
    </article>
  );
}
