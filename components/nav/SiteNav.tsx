"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, List, X } from "@phosphor-icons/react";

import { BrandMark } from "@/components/brand/BrandMark";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { SITE } from "@/lib/site";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, t, setLocale } = useLocale();
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  const links = [
    { href: "/#inicio", label: t.nav.home },
    { href: "/#proyectos", label: t.nav.projects },
    { href: "/#perfil", label: t.nav.profile },
    { href: "/#habilidades", label: t.nav.skills },
  ] as const;

  const closeMenu = () => setMenuOpen(false);

  const langToggle = (
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
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ${
          scrolled || menuOpen
            ? "border-[var(--border)] bg-[color-mix(in_oklab,var(--bg-base)_90%,transparent)] backdrop-blur-md"
            : "border-transparent bg-[color-mix(in_oklab,var(--bg-base)_12%,transparent)] backdrop-blur-[2px]"
        }`}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-5 sm:h-16 sm:px-8">
          <div className="flex min-w-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              className="-ml-2 inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--text-primary)] lg:hidden"
              aria-label={menuOpen ? t.menuClose : t.menuOpen}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
            <Link
              href="/#inicio"
              onClick={closeMenu}
              className="flex min-w-0 items-center gap-2.5 text-sm font-medium tracking-tight text-[var(--text-primary)] sm:text-base"
            >
              <BrandMark className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
              <span className="truncate">
                {SITE.firstName}
                <span className="hidden text-[var(--text-muted)] sm:inline">
                  {" "}
                  ·{" "}
                </span>
                <span className="xenon-text hidden sm:inline">{t.navRole}</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <nav
              aria-label={t.navAria}
              className="hidden items-center gap-x-5 text-sm lg:flex"
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
            {langToggle}
            <Link
              href="/#contacto"
              className="xenon-fill ml-1 hidden shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-1.5 text-sm font-medium text-[var(--accent-fg)] transition-transform hover:scale-[0.98] active:scale-[0.97] lg:inline-flex"
            >
              {t.talk}
              <ArrowRight size={14} weight="bold" aria-hidden />
            </Link>
          </div>
        </div>
        {menuOpen ? (
          <div
            id={menuId}
            className="border-t border-[var(--border)] bg-[color-mix(in_oklab,var(--bg-base)_96%,transparent)] px-5 py-5 backdrop-blur-md sm:px-8 lg:hidden"
          >
            <nav aria-label={t.navAria} className="flex flex-col">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="border-b border-[var(--border)] py-3.5 text-base text-[var(--text-primary)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/#contacto"
              onClick={closeMenu}
              className="xenon-fill mt-5 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-fg)]"
            >
              {t.talk}
              <ArrowRight size={14} weight="bold" aria-hidden />
            </Link>
          </div>
        ) : null}
      </header>
      <div className="h-14 sm:h-16" aria-hidden />
    </>
  );
}
