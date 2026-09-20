import { SITE } from "@/lib/site";

export function HomeStory() {
  return (
    <div className="relative z-20 bg-[var(--bg-base)]">
      <section className="story-dots border-t border-[var(--border)] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-[16ch] text-[clamp(2.1rem,5.5vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {SITE.manifesto}
          </h2>
          <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-[var(--text-secondary)]">
            {SITE.about}
          </p>
        </div>
      </section>

      <section className="story-dots border-t border-[var(--border)] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-[12ch] text-[clamp(2.2rem,6vw,4.8rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            ¿Hablamos?
          </h2>
          <p className="mt-5 max-w-[40ch] text-[var(--text-secondary)]">
            Si buscás un Applied AI Engineer que ancla las respuestas a datos
            reales, escribime.
          </p>
          <a
            href={`mailto:${SITE.email}?subject=Consulta%20portfolio`}
            className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-fg)] transition-transform hover:scale-[0.98] active:scale-[0.97]"
          >
            Escribime
          </a>
        </div>
      </section>
    </div>
  );
}
