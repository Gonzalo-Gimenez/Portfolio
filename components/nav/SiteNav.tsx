"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

import { BrandMark } from "@/components/brand/BrandMark";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { SITE } from "@/lib/site";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const { locale, t, setLocale } = useLocale();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#inicio", label: t.nav.home },
    { href: "/#proyectos", label: t.nav.projects },
    { href: "/#perfil", label: t.nav.profile },
    { href: "/#habilidades", label: t.nav.skills },
  ] as const;

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
              <span className="xenon-text">{t.navRole}</span>
            </span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <nav
              aria-label={t.navAria}
              className="flex max-w-[min(100%,36rem)] flex-wrap items-center justify-end gap-x-4 gap-y-1 text-xs sm:gap-x-5 sm:text-sm"
            >
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[var(--text-secondary)] underline-offset-4 transition-colors hover:text-[var(--text-primary)] hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div
              role="group"
              aria-label={t.langAria}
              className="inline-flex shrink-0 rounded-full border border-[var(--border)] p-0.5"
            >
              <button
                type="button"
                onClick={() => setLocale("es")}
                aria-pressed={locale === "es"}
                className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide transition-colors ${
                  locale === "es"
                    ? "bg-[color-mix(in_oklab,var(--accent)_22%,transparent)] xenon-text"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {t.langEs}
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                aria-pressed={locale === "en"}
                className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide transition-colors ${
                  locale === "en"
                    ? "bg-[color-mix(in_oklab,var(--accent)_22%,transparent)] xenon-text"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {t.langEn}
              </button>
            </div>
            <Link
              href="/#contacto"
              className="xenon-fill ml-1 inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-[var(--accent)] px-3.5 py-1.5 text-xs font-medium text-[var(--accent-fg)] transition-transform hover:scale-[0.98] active:scale-[0.97] sm:ml-2 sm:px-4 sm:text-sm"
            >
              {t.talk}
              <ArrowRight size={14} weight="bold" aria-hidden />
            </Link>
          </div>
        </div>
      </header>
      <div className="h-14 sm:h-16" aria-hidden />
    </>
  );
}
