"use client";

import Link from "next/link";

import { SITE } from "@/lib/site";

const LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#contacto", label: "Contacto" },
] as const;

export function SiteNav() {
  return (
    <header
      className="sticky top-0 z-40 bg-[color-mix(in_oklab,var(--bg-base)_22%,transparent)] backdrop-blur-[3px]"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
        <Link
          href="#inicio"
          className="shrink-0 text-sm font-medium tracking-tight text-[var(--text-primary)] sm:text-base"
        >
          {SITE.firstName}
          <span className="text-[var(--text-muted)]"> · </span>
          <span className="xenon-text">{SITE.role}</span>
        </Link>
        <nav
          aria-label="Secciones del sitio"
          className="flex max-w-[min(100%,42rem)] flex-wrap items-center justify-end gap-x-4 gap-y-1 text-xs sm:gap-x-5 sm:text-sm"
        >
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--text-secondary)] underline-offset-4 transition-colors hover:text-[var(--text-primary)] hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
