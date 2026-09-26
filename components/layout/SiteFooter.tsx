"use client";

import { ContactRow } from "@/components/hud/PortfolioHud";
import { BrandMark } from "@/components/brand/BrandMark";
import { SITE } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="px-5 pb-12 pt-4 sm:px-8 sm:pb-16">
      <div className="mx-auto max-w-6xl border-t border-[var(--border)] pt-8">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm text-[var(--text-muted)] md:justify-start">
            <BrandMark className="h-6 w-6" />
            <span>{SITE.name}</span>
            <span aria-hidden>·</span>
            <span>{t.navRole}</span>
          </p>
          <nav
            aria-label={t.footerAria}
            className="flex w-full justify-center text-sm md:w-auto md:justify-end"
          >
            <ContactRow />
          </nav>
        </div>
      </div>
    </footer>
  );
}
