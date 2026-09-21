import Image from "next/image";
import {
  GraduationCap,
  MapPin,
  Translate,
} from "@phosphor-icons/react/dist/ssr";

import { CenterRule } from "@/components/layout/SectionMark";
import { SITE } from "@/lib/site";

const FACTS = [
  {
    icon: MapPin,
    label: SITE.location,
  },
  {
    icon: Translate,
    label: SITE.languages.replace(/\.$/, ""),
  },
  {
    icon: GraduationCap,
    label: SITE.education,
  },
] as const;

export function HomeAbout() {
  return (
    <section id="sobre-mi" className="scroll-mt-16 px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-6xl">
        <CenterRule />
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
          <div className="relative mx-auto w-full max-w-xs lg:mx-0">
            <Image
              src={SITE.photoPath}
              alt={`Retrato de ${SITE.name}`}
              width={400}
              height={500}
              className="aspect-[4/5] w-full object-cover object-[center_18%]"
            />
          </div>
          <div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              {SITE.manifesto}
            </h2>
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-[var(--text-secondary)]">
              {SITE.about}
            </p>
            <ul className="mt-8 max-w-[52ch] space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
              {FACTS.map((fact) => (
                <li key={fact.label} className="flex items-start gap-2.5">
                  <fact.icon
                    size={18}
                    weight="regular"
                    className="mt-0.5 shrink-0 text-[var(--accent)]"
                    aria-hidden
                  />
                  <span>{fact.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
