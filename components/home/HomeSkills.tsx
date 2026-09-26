"use client";

import { CenterRule } from "@/components/layout/SectionMark";
import { SkillChip } from "@/components/home/SkillIcon";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { skillGroups } from "@/lib/skills";

export function HomeSkills() {
  const { locale, t } = useLocale();
  const groups = skillGroups(locale);

  return (
    <section
      id="habilidades"
      className="scroll-mt-16 px-5 pb-20 sm:px-8 sm:pb-28"
    >
      <div className="mx-auto max-w-6xl text-center md:text-left">
        <CenterRule />
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          {t.skillsTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-[48ch] text-base text-[var(--text-secondary)] md:mx-0">
          {t.skillsLead}
        </p>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group.id}>
              <h3 className="xenon-text text-lg font-medium">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                {group.items.map((item) => (
                  <li key={item}>
                    <SkillChip name={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
