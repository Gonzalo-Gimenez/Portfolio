import Link from "next/link";
import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  ArrowLeft,
  FilePdf,
} from "@phosphor-icons/react/dist/ssr";

import { SITE } from "@/lib/site";
import { WORKS } from "@/lib/projects";

type PortfolioHudProps = {
  showBack?: boolean;
};

export function PortfolioHud({ showBack = false }: PortfolioHudProps) {
  if (showBack) {
    return (
      <header className="pointer-events-auto relative z-20 flex flex-col gap-6 p-5 sm:p-8 lg:max-w-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
        >
          <ArrowLeft size={18} weight="regular" aria-hidden />
          Índice
        </Link>
        <p className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
          {SITE.name}
        </p>
        <p className="text-[var(--accent)]">{SITE.role}</p>
        <nav aria-label="Contacto" className="flex flex-wrap gap-4 text-sm">
          <ContactRow />
        </nav>
      </header>
    );
  }

  return (
    <header className="pointer-events-none absolute inset-0 z-20">
      <div className="pointer-events-auto absolute left-5 top-5 max-w-[min(92vw,28rem)] sm:left-8 sm:top-8">
        <p className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-tight text-[var(--text-primary)]">
          {SITE.name}
        </p>
        <p className="mt-4 text-base text-[var(--accent)] sm:text-lg">
          {SITE.role}
        </p>
        <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[15px]">
          {SITE.subtitle}
        </p>
      </div>

      <nav
        aria-label="Contacto"
        className="pointer-events-auto absolute right-5 top-5 flex flex-col items-end gap-2 text-sm sm:right-8 sm:top-8 sm:flex-row sm:items-center sm:gap-5"
      >
        <ContactRow />
      </nav>

      <nav
        aria-label="Proyectos"
        className="pointer-events-auto absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4 sm:bottom-8 sm:left-8 sm:right-8"
      >
        <p className="text-xs text-[var(--text-muted)]">{SITE.location}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {WORKS.map((work, index) => (
            <li key={work.slug}>
              <Link
                href={`/trabajo/${work.slug}`}
                className="text-[var(--text-primary)] underline-offset-4 hover:underline"
              >
                <span className="text-[var(--text-muted)]">{index + 1} </span>
                {work.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function ContactRow() {
  return (
    <>
      <a
        href={SITE.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <GithubLogo size={18} weight="regular" aria-hidden />
        GitHub
      </a>
      <a
        href={SITE.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <LinkedinLogo size={18} weight="regular" aria-hidden />
        LinkedIn
      </a>
      <a
        href={`mailto:${SITE.email}`}
        className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <EnvelopeSimple size={18} weight="regular" aria-hidden />
        Mail
      </a>
      <a
        href={SITE.cvPath}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <FilePdf size={18} weight="regular" aria-hidden />
        CV
      </a>
    </>
  );
}
