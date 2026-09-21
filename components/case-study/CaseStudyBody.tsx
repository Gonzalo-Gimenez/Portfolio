import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

import type { WorkItem } from "@/lib/projects";
import { SkillChip } from "@/components/home/SkillIcon";
import { XenonCover } from "@/components/media/XenonCover";

export function CaseStudyBody({ work }: { work: WorkItem }) {
  const hasLiveLinks = Boolean(work.demoUrl || work.repoUrl);

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <Link
        href="/#proyectos"
        className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <ArrowLeft size={16} weight="regular" aria-hidden />
        Volver
      </Link>

      <div className="mt-8">
        <XenonCover src={work.coverPath} alt={work.title} />
      </div>

      <header className="mt-8">
        <p className="xenon-text text-sm">{work.roleLabel}</p>
        <div className="mt-2 flex flex-wrap items-baseline gap-3">
          <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-semibold tracking-[-0.03em]">
            {work.title}
          </h1>
          {work.status === "proximo" ? (
            <span className="rounded-full border border-[var(--border)] px-3 py-0.5 text-xs text-[var(--text-muted)]">
              Próximo
            </span>
          ) : null}
        </div>
        <p className="mt-3 max-w-[52ch] text-base text-[var(--text-secondary)]">
          {work.tagline}
        </p>
        {hasLiveLinks ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {work.demoUrl ? (
              <a
                href={work.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="xenon-fill inline-flex rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-fg)] hover:opacity-90"
              >
                Demo
              </a>
            ) : null}
            {work.repoUrl ? (
              <a
                href={work.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
              >
                GitHub
              </a>
            ) : null}
          </div>
        ) : null}
      </header>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <section>
          <h2 className="text-sm text-[var(--text-muted)]">Por qué</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {work.why}
          </p>
        </section>
        <section>
          <h2 className="text-sm text-[var(--text-muted)]">Cómo está armado</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {work.architecture}
          </p>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="text-sm text-[var(--text-muted)]">Qué demuestra</h2>
        <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
          {work.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-sm text-[var(--text-muted)]">Stack</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {work.stack.map((tech) => (
            <li key={tech}>
              <SkillChip name={tech} />
            </li>
          ))}
        </ul>
      </section>

      {work.status === "proximo" ? (
        <p className="mt-8 text-sm text-[var(--text-muted)]">
          Este caso se suma al portfolio cuando el entregable esté listo. No hay
          demo ni métricas publicadas todavía.
        </p>
      ) : null}
    </article>
  );
}
