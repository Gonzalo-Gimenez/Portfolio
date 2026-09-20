import Image from "next/image";
import Link from "next/link";

import type { WorkItem } from "@/lib/projects";
import { SITE } from "@/lib/site";

export function CaseStudyBody({ work }: { work: WorkItem }) {
  return (
    <article className="mx-auto max-w-2xl flex-1 space-y-10 px-5 py-8 sm:px-8 sm:py-12">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={work.coverPath}
          alt=""
          fill
          sizes="(min-width: 768px) 42rem, 100vw"
          className="object-cover"
        />
      </div>
      <header className="space-y-4 border-b border-[var(--border)] pb-8">
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {work.title}
          </h1>
          {work.status === "proximo" ? (
            <span className="rounded-full border border-[var(--border)] px-3 py-0.5 text-xs text-[var(--text-muted)]">
              Próximo
            </span>
          ) : null}
        </div>
        <p className="text-lg text-[var(--accent)]">{work.roleLabel}</p>
        <p className="text-base leading-relaxed text-[var(--text-secondary)]">
          {work.why}
        </p>
        <p className="text-sm leading-relaxed text-[var(--text-muted)]">
          {work.architecture}
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-[var(--text-primary)]">
          Qué demuestra
        </h2>
        <ul className="space-y-3 text-[var(--text-secondary)]">
          {work.highlights.map((item) => (
            <li key={item} className="leading-relaxed pl-0">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-[var(--text-primary)]">
          Stack
        </h2>
        <ul className="flex flex-wrap gap-2">
          {work.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-lg border border-[var(--border)] px-3 py-1 text-sm text-[var(--text-secondary)]"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>

      {work.slug === "insightai" ? (
        <section className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
          <h2 className="text-lg font-medium text-[var(--text-primary)]">
            Demo pública
          </h2>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            InsightAI corre como aplicación aparte. Todavía no hay URL de demo
            pública en este sitio. Si necesitás ver el producto en acción,
            escribime y coordinamos acceso o revisión de código.
          </p>
          <a
            href={`mailto:${SITE.email}?subject=InsightAI%20-%20consulta`}
            className="inline-flex rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent-fg)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-primary)]"
          >
            Pedir acceso
          </a>
        </section>
      ) : null}

      {work.status === "proximo" ? (
        <section className="space-y-2 text-sm text-[var(--text-muted)]">
          <p>
            Este caso está planificado para sumarse al portfolio cuando el
            entregable esté listo. No hay demo ni métricas publicadas todavía.
          </p>
        </section>
      ) : null}

      <p className="text-sm text-[var(--text-muted)]">
        <Link
          href="/"
          className="text-[var(--accent)] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Volver al índice
        </Link>
      </p>
    </article>
  );
}
