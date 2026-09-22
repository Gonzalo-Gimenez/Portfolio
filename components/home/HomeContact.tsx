"use client";

import { useState } from "react";

import { CenterRule } from "@/components/layout/SectionMark";
import { SITE } from "@/lib/site";

function mailtoHref(name: string, from: string, message: string) {
  const subject = encodeURIComponent(
    `Consulta portfolio${name ? ` — ${name}` : ""}`,
  );
  const body = encodeURIComponent(
    `Nombre: ${name}\nEmail: ${from}\n\n${message}`,
  );
  return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
}

export function HomeContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedEmail || trimmedMessage.length < 8) {
      return;
    }
    window.location.href = mailtoHref(trimmedName, trimmedEmail, trimmedMessage);
    setStatus("opened");
  };

  return (
    <section
      id="contacto"
      className="scroll-mt-16 px-5 pb-20 sm:px-8 sm:pb-28"
    >
      <div className="mx-auto max-w-6xl">
        <CenterRule />
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          Contacto
        </h2>
        <p className="mt-4 max-w-[40ch] text-[var(--text-secondary)]">
          Si buscás un AI Engineer, Data Analyst o Data Engineer, escribime.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid max-w-xl gap-5"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-sm text-[var(--text-secondary)]">
              Nombre
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
              placeholder="Tu nombre"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-sm text-[var(--text-secondary)]">
              Email
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
            <label htmlFor="contact-message" className="text-sm text-[var(--text-secondary)]">
              Mensaje
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
              placeholder="Contame en qué rol o proyecto estás pensando"
            />
          </div>
          <button
            type="submit"
            className="xenon-fill inline-flex w-fit rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-fg)] transition-transform hover:scale-[0.98] active:scale-[0.97]"
          >
            Enviar
          </button>
          {status === "opened" ? (
            <p className="text-sm text-[var(--text-secondary)]" role="status">
              Se abrió tu correo con el mensaje listo para{" "}
              <a className="underline" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              . Si no se abrió, tocá esa dirección.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
