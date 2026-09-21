import { CenterRule } from "@/components/layout/SectionMark";
import { SkillChip } from "@/components/home/SkillIcon";
import { SKILL_GROUPS } from "@/lib/skills";

export function HomeSkills() {
  return (
    <section
      id="habilidades"
      className="scroll-mt-16 px-5 pb-20 sm:px-8 sm:pb-28"
    >
      <div className="mx-auto max-w-6xl">
        <CenterRule />
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          Habilidades
        </h2>
        <p className="mt-4 max-w-[48ch] text-base text-[var(--text-secondary)]">
          Stack de software, datos e IA aplicada. Lo que uso para anclar
          respuestas a hechos, analizar y mover pipelines.
        </p>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id}>
              <h3 className="xenon-text text-lg font-medium">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
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
