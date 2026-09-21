import { NextResponse } from "next/server";

import { SITE } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: { name?: unknown; email?: unknown; message?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (!name || !EMAIL_RE.test(email) || message.length < 8) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }
  if (name.length > 120 || email.length > 200 || message.length > 4000) {
    return NextResponse.json({ ok: false, error: "too_long" }, { status: 400 });
  }

  const text = `Nombre: ${name}\nEmail: ${email}\n\n${message}`;
  const subject = `Consulta portfolio - ${name}`;
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [SITE.email],
        reply_to: email,
        subject,
        text,
      }),
    });
    if (sent.ok) {
      return NextResponse.json({ ok: true });
    }
  }

  const submit = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: subject,
      }),
    },
  );

  if (submit.ok) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, fallback: true }, { status: 502 });
}
