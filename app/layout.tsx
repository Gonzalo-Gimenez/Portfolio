import type { Metadata } from "next";
import { Syne } from "next/font/google";

import "./globals.css";
import { SITE } from "@/lib/site";
import { StarField } from "@/components/fx/StarField";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
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
        <StarField />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
