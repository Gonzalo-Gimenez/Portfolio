import { ContactRow } from "@/components/hud/PortfolioHud";
import { BrandMark } from "@/components/brand/BrandMark";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="px-5 pb-12 pt-4 sm:px-8 sm:pb-16">
      <div className="mx-auto max-w-6xl border-t border-[var(--border)] pt-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2.5 text-sm text-[var(--text-muted)]">
            <BrandMark className="h-6 w-6" />
            {SITE.name}
            <span className="text-[var(--text-muted)]"> · </span>
            {SITE.role}
          </p>
          <nav
            aria-label="Pie de página"
            className="flex flex-nowrap items-center gap-x-5 text-sm"
          >
            <ContactRow />
          </nav>
        </div>
      </div>
    </footer>
  );
}
