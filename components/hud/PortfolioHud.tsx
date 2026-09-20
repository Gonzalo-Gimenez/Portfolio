import Link from "next/link";
import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  ArrowLeft,
} from "@phosphor-icons/react/dist/ssr";

import { SITE } from "@/lib/site";
import { WORKS } from "@/lib/projects";

type PortfolioHudProps = {
  showBack?: boolean;
};

export function PortfolioHud({ showBack = false }: PortfolioHudProps) {
  return (
    <header
      className="pointer-events-auto relative z-20 flex flex-col gap-6 p-5 sm:p-8 lg:max-w-md"
    >
      <div className="space-y-3">
        {showBack ? (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <ArrowLeft size={18} weight="regular" aria-hidden />
            Índice
          </Link>
        ) : null}
        <p className="text-[var(--text-primary)] text-3xl font-semibold tracking-tight sm:text-4xl">
          {SITE.name}
        </p>
        <p className="text-lg font-medium text-[var(--accent)]">{SITE.role}</p>
        <p className="max-w-[38ch] text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[15px]">
          {SITE.subtitle}
        </p>
        <p className="text-xs text-[var(--text-muted)]">{SITE.location}</p>
      </div>

      <nav
        aria-label="Contacto"
        className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
      >
        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] underline-offset-4 transition-colors hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <GithubLogo size={18} weight="regular" aria-hidden />
          GitHub
        </a>
        <a
          href={SITE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] underline-offset-4 transition-colors hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <LinkedinLogo size={18} weight="regular" aria-hidden />
          LinkedIn
        </a>
        <a
          href={`mailto:${SITE.email}`}
          className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] underline-offset-4 transition-colors hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <EnvelopeSimple size={18} weight="regular" aria-hidden />
          {SITE.email}
        </a>
      </nav>

      {!showBack ? (
        <nav aria-label="Proyectos" className="border-t border-[var(--border)] pt-5">
          <p className="mb-3 text-sm font-medium text-[var(--text-primary)]">
            Trabajos en este índice
          </p>
          <ul className="flex flex-col gap-2">
            {WORKS.map((work, index) => (
              <li key={work.slug}>
                <Link
                  href={`/trabajo/${work.slug}`}
                  className="group flex items-baseline justify-between gap-3 rounded-lg px-2 py-1.5 -mx-2 text-sm transition-colors hover:bg-[var(--surface-elevated)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  <span className="text-[var(--text-primary)]">
                    <span className="sr-only">Proyecto {index + 1}: </span>
                    {work.title}
                    <span className="text-[var(--text-muted)]">
                      {" "}
                      · {work.roleLabel}
                    </span>
                  </span>
                  {work.status === "proximo" ? (
                    <span className="shrink-0 text-xs text-[var(--text-muted)]">
                      próximo
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
