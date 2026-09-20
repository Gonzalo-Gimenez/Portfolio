import Image from "next/image";
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
      <header className="pointer-events-auto relative z-20 flex items-start gap-4 p-5 sm:p-8">
        <Image
          src={SITE.photoPath}
          alt=""
          width={56}
          height={72}
          className="h-[72px] w-14 shrink-0 object-cover object-top"
        />
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            <ArrowLeft size={18} weight="regular" aria-hidden />
            Índice
          </Link>
          <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {SITE.name}
          </p>
          <p className="text-[var(--accent)]">{SITE.role}</p>
          <nav aria-label="Contacto" className="flex flex-wrap gap-4 text-sm">
            <ContactRow />
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="pointer-events-none absolute inset-0 z-20">
      <div className="pointer-events-auto absolute left-5 top-5 flex max-w-[min(92vw,34rem)] items-start gap-4 sm:left-8 sm:top-8 sm:gap-5">
        <Image
          src={SITE.photoPath}
          alt={`Retrato de ${SITE.name}`}
          width={88}
          height={116}
          priority
          className="h-[5.4rem] w-16 shrink-0 object-cover object-top sm:h-[7.25rem] sm:w-[5.5rem]"
        />
        <div>
          <p className="text-[clamp(2.15rem,6.4vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-[var(--text-primary)]">
            {SITE.firstName}
            <br />
            {SITE.lastName}
          </p>
          <p className="mt-3 text-sm text-[var(--accent)] sm:text-base">
            {SITE.role}
          </p>
          <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-[var(--text-secondary)]">
            {SITE.subtitle}
          </p>
        </div>
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
        <ul className="flex flex-wrap gap-x-6 gap-y-1 text-base sm:text-lg">
          {WORKS.map((work) => (
            <li key={work.slug}>
              <Link
                href={`/trabajo/${work.slug}`}
                className="text-[var(--text-primary)] underline-offset-4 hover:underline"
              >
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
