"use client";

import Image from "next/image";
import {
  GraduationCap,
  MapPin,
  Translate,
} from "@phosphor-icons/react/dist/ssr";

import { SITE } from "@/lib/site";
import { CenterRule } from "@/components/layout/SectionMark";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function HomeAbout() {
  const { t } = useLocale();
  const facts = [
    { icon: MapPin, label: SITE.location },
    { icon: Translate, label: t.languages },
    { icon: GraduationCap, label: t.education },
  ] as const;

  return (
    <section id="perfil" className="scroll-mt-16 pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <CenterRule />
      </div>
      <div className="relative min-h-[36rem] overflow-hidden sm:min-h-[42rem]">
        <Image
          src={SITE.aboutImagePath}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,19,24,0.94)_0%,rgba(16,19,24,0.78)_42%,rgba(16,19,24,0.28)_72%,rgba(16,19,24,0.12)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,19,24,0.35)_0%,transparent_22%,transparent_78%,rgba(16,19,24,0.72)_100%)]"
        />
        <div className="relative z-10 mx-auto flex min-h-[36rem] max-w-6xl items-end px-5 py-16 sm:min-h-[42rem] sm:px-8 sm:py-24">
          <div className="max-w-[40rem]">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              {t.profileTitle}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--text-primary)] sm:text-xl">
              {t.aboutLead}
            </p>
            <div className="mt-4 max-w-[52ch] space-y-4 text-base leading-relaxed text-[var(--text-secondary)]">
              {t.aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-8 max-w-[52ch] space-y-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              {facts.map((fact) => (
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
