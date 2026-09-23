"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { BrandMark } from "@/components/brand/BrandMark";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#habilidades", label: "Habilidades" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ${
          scrolled
            ? "border-[var(--border)] bg-[color-mix(in_oklab,var(--bg-base)_90%,transparent)] backdrop-blur-md"
            : "border-transparent bg-[color-mix(in_oklab,var(--bg-base)_12%,transparent)] backdrop-blur-[2px]"
        }`}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
          <Link
            href="/#inicio"
            className="flex shrink-0 items-center gap-2.5 text-sm font-medium tracking-tight text-[var(--text-primary)] sm:text-base"
          >
            <BrandMark className="h-8 w-8 sm:h-9 sm:w-9" />
            <span>
              {SITE.firstName}
              <span className="text-[var(--text-muted)]"> · </span>
              <span className="xenon-text">{SITE.role}</span>
            </span>
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
      <div className="h-14 sm:h-16" aria-hidden />
    </>
  );
}
