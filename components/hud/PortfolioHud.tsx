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

export function IdentityRail() {
  return (
    <aside className="flex flex-col justify-between gap-8 border-b border-[var(--border)] bg-[var(--bg-base)] px-5 py-6 sm:px-8 sm:py-8 lg:border-b-0 lg:border-r">
      <div>
        <Image
          src={SITE.photoPath}
          alt={`Retrato de ${SITE.name}`}
          width={280}
          height={360}
          priority
          className="aspect-[3/4] w-28 object-cover object-top sm:w-36 lg:w-44"
        />
        <p className="mt-5 text-[clamp(1.85rem,3.4vw,3.1rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
          {SITE.firstName}
          <br />
          {SITE.lastName}
        </p>
        <p className="mt-3 text-[var(--accent)]">{SITE.role}</p>
        <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-[var(--text-secondary)]">
          {SITE.subtitle}
        </p>
        <p className="mt-3 text-xs text-[var(--text-muted)]">{SITE.location}</p>
      </div>

      <div className="space-y-6">
        <nav aria-label="Proyectos" className="flex flex-col gap-2 text-base">
          {WORKS.map((work) => (
            <Link
              key={work.slug}
              href={`/trabajo/${work.slug}`}
              className="text-[var(--text-primary)] underline-offset-4 hover:underline"
            >
              {work.title}
              {work.status === "proximo" ? (
                <span className="text-[var(--text-muted)]"> · próximo</span>
              ) : null}
            </Link>
          ))}
        </nav>
        <nav aria-label="Contacto" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <ContactRow />
        </nav>
      </div>
    </aside>
  );
}

export function PortfolioHud({ showBack = false }: { showBack?: boolean }) {
  if (!showBack) return null;

  return (
    <header className="relative z-20 flex items-start gap-4 p-5 sm:p-8">
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

export function ContactRow() {
  return (
    <span className="inline-flex flex-nowrap items-center gap-x-5">
      <a
        href={SITE.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <GithubLogo size={18} weight="regular" aria-hidden />
        GitHub
      </a>
      <a
        href={SITE.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <LinkedinLogo size={18} weight="regular" aria-hidden />
        LinkedIn
      </a>
      <a
        href={`mailto:${SITE.email}`}
        className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <EnvelopeSimple size={18} weight="regular" aria-hidden />
        Mail
      </a>
      <a
        href={SITE.cvPath}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <FilePdf size={18} weight="regular" aria-hidden />
        CV
      </a>
    </span>
  );
}
