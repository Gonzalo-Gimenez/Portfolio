"use client";

import { useState } from "react";

import { CenterRule } from "@/components/layout/SectionMark";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { SITE } from "@/lib/site";

function mailtoHref(
  name: string,
  from: string,
  message: string,
  subjectLabel: string,
  nameLabel: string,
) {
  const subject = encodeURIComponent(
    `${subjectLabel}${name ? ` - ${name}` : ""}`,
  );
  const body = encodeURIComponent(
    `${nameLabel}: ${name}\nEmail: ${from}\n\n${message}`,
  );
  return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
}

export function HomeContact() {
  const { t } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [human, setHuman] = useState(false);
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedEmail || trimmedMessage.length < 8 || !human) {
      return;
    }
    window.location.href = mailtoHref(
      trimmedName,
      trimmedEmail,
      trimmedMessage,
      t.mailSubject,
      t.mailName,
    );
    setStatus("opened");
  };

  return (
    <section id="contacto" className="scroll-mt-16 px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-6xl text-center md:text-left">
        <CenterRule />
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          {t.contactTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-[var(--text-secondary)] md:mx-0">
          {t.contactLead}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 grid w-full max-w-xl gap-5 text-left md:mx-0"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-name"
              className="text-sm text-[var(--text-secondary)]"
            >
              {t.contactName}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-base)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
              placeholder={t.contactNamePh}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-email"
              className="text-sm text-[var(--text-secondary)]"
            >
              {t.contactEmail}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-base)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
              placeholder="tu@email.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-message"
              className="text-sm text-[var(--text-secondary)]"
            >
              {t.contactMessage}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              minLength={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-y rounded-lg border border-[var(--border)] bg-[var(--bg-base)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
              placeholder={t.contactMessagePh}
            />
          </div>

          <label
            className="not-robot mx-auto flex w-full max-w-[304px] cursor-pointer items-center gap-3 rounded-sm border border-[#d3d3d3] bg-[#f9f9f9] px-3 py-3 text-[#222]"
            htmlFor="contact-human"
          >
            <input
              id="contact-human"
              name="human"
              type="checkbox"
              required
              checked={human}
              onChange={(e) => setHuman(e.target.checked)}
              className="h-6 w-6 shrink-0 cursor-pointer accent-[#1a73e8]"
              aria-label={t.notRobotAria}
            />
            <span className="flex-1 text-sm leading-tight">{t.notRobot}</span>
            <img
              src="/not-robot.svg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0"
            />
          </label>

          <button
            type="submit"
            className="xenon-fill inline-flex w-fit cursor-pointer justify-self-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-fg)] transition-transform hover:scale-[0.98] active:scale-[0.97]"
          >
            {t.contactSend}
          </button>
          {status === "opened" ? (
            <p className="text-sm text-[var(--text-secondary)]" role="status">
              {t.contactOpened}{" "}
              <a className="underline" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
