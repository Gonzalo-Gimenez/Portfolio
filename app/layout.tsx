import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { cookies } from "next/headers";

import "./globals.css";
import { SITE } from "@/lib/site";
import { LOCALE_COOKIE, parseLocale } from "@/lib/i18n";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { StarField } from "@/components/fx/StarField";
import { XenonCursor } from "@/components/fx/XenonCursor";
import { SiteNav } from "@/components/nav/SiteNav";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} · ${SITE.roles}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.subtitle,
  openGraph: {
    title: `${SITE.name} · ${SITE.roles}`,
    description: SITE.subtitle,
    locale: "es_AR",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jar = await cookies();
  const locale = parseLocale(jar.get(LOCALE_COOKIE)?.value);

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body
        className={`${display.variable} font-[family-name:var(--font-display)] antialiased`}
        suppressHydrationWarning
      >
        <LocaleProvider initialLocale={locale}>
          <StarField />
          <XenonCursor />
          <SiteNav />
          <div className="relative z-10">{children}</div>
        </LocaleProvider>
      </body>
    </html>
  );
}
