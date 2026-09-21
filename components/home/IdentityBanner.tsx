import Image from "next/image";

import { ContactRow } from "@/components/hud/PortfolioHud";
import { SITE } from "@/lib/site";

export function IdentityBanner() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex items-start gap-5 sm:gap-8">
          <Image
            src={SITE.photoPath}
            alt={`Retrato de ${SITE.name}`}
            width={280}
            height={360}
            priority
            className="aspect-[3/4] w-24 shrink-0 object-cover object-[center_18%] sm:w-36 lg:w-40"
          />
          <div className="min-w-0">
            <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              {SITE.firstName} {SITE.lastName}
            </h1>
            <p className="xenon-text mt-3 text-lg sm:text-xl">
              {SITE.role}
            </p>
            <p className="mt-1.5 text-lg text-[var(--text-secondary)] sm:text-xl">
              {SITE.coverLabel}
            </p>
            <nav aria-label="Contacto" className="mt-8 text-sm">
              <ContactRow />
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
