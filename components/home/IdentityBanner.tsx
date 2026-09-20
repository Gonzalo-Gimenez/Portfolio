import Image from "next/image";

import { ContactRow } from "@/components/hud/PortfolioHud";
import { CoverMedia } from "@/components/media/CoverMedia";
import { SITE } from "@/lib/site";

export function IdentityBanner() {
  return (
    <section className="group relative min-h-[62dvh] overflow-hidden border-b border-[var(--border)]">
      <CoverMedia
        src="/covers/banner-data.png"
        alt=""
        motion="drift"
        priority
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,16,18,0.92)_0%,rgba(13,16,18,0.72)_48%,rgba(13,16,18,0.4)_100%)]"
      />
      <div className="relative z-10 mx-auto flex min-h-[62dvh] max-w-6xl flex-col justify-end gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-3xl items-end gap-5 sm:gap-8">
          <Image
            src={SITE.photoPath}
            alt={`Retrato de ${SITE.name}`}
            width={220}
            height={280}
            priority
            className="aspect-[3/4] w-20 object-cover object-top sm:w-36"
          />
          <div>
            <p className="text-[clamp(2.4rem,7vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.035em]">
              {SITE.firstName} {SITE.lastName}
            </p>
            <p className="mt-4 text-lg text-[var(--accent)]">{SITE.role}</p>
            <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-[var(--text-secondary)]">
              {SITE.subtitle}
            </p>
            <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-[var(--text-muted)]">
              {SITE.education} {SITE.location}.
            </p>
          </div>
        </div>
        <nav
          aria-label="Contacto"
          className="flex flex-wrap gap-x-5 gap-y-2 text-sm"
        >
          <ContactRow />
        </nav>
      </div>
    </section>
  );
}
