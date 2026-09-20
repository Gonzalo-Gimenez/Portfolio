import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";

import "./globals.css";
import { SITE } from "@/lib/site";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} · ${SITE.role}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.subtitle,
  openGraph: {
    title: `${SITE.name} · ${SITE.role}`,
    description: SITE.subtitle,
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${display.variable} ${body.variable} font-[family-name:var(--font-body)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
