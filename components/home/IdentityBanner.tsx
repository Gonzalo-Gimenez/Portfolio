"use client";

import Image from "next/image";

import { ContactRow } from "@/components/hud/PortfolioHud";
import { SITE } from "@/lib/site";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function IdentityBanner() {
  const { t } = useLocale();

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex items-center gap-6 sm:gap-10 lg:gap-14">
          <Image
            src={SITE.photoPath}
            alt={`${t.photoAlt} ${SITE.name}`}
            width={420}
            height={540}
            priority
            className="aspect-[3/4] w-40 shrink-0 object-cover object-[center_18%] sm:w-56 lg:w-72"
          />
          <div className="min-w-0">
            <h1 className="text-[clamp(2.4rem,5.4vw,4.35rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              {SITE.firstName} {SITE.lastName}
            </h1>
            <p className="xenon-text mt-4 text-lg leading-snug sm:text-xl">
              {SITE.roles}
            </p>
            <p className="mt-1.5 text-lg text-[var(--text-secondary)] sm:text-xl">
              {t.coverLabel}
            </p>
            <nav aria-label={t.nav.contact} className="mt-8 text-sm">
              <ContactRow />
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
