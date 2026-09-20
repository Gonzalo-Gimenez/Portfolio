import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";

import "./globals.css";
import { SITE } from "@/lib/site";

const display = Bricolage_Grotesque({
  variable: "--font-display",
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
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${display.variable} font-[family-name:var(--font-display)] antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
