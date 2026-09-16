import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fontVariables } from "../fonts";
import "../globals.css";
import "../experience.css";
import "../accessibility.css";
import "../r1.css";
import "../r1-expansion.css";
import "../r3.css";
import "../r3-responsive-fixes.css";
import "../r4.css";
import "../denysoft-browser-elevation.css";
import "../denysoft-browser-elevation-fix.css";
import "../denysoft-browser-review-remediation.css";
import "../denysoft-spanish-localization-fit.css";
import { BrowserExperience } from "@/components/denysoft-current/BrowserExperience";
import { getSiteUrl } from "@/lib/site-url";
import { isLocale, locales } from "@/lib/content";

const title = "Denysoft — Digital Products, Systems & Applied AI";
const description = "Denysoft builds digital products and AI-enabled business systems with product judgment, design, software and governed implementation.";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: title,
    template: "%s — Denysoft",
  },
  description,
  applicationName: "Denysoft",
  authors: [{ name: "Denys Lopez" }],
  creator: "Denys Lopez",
  publisher: "Denysoft",
  category: "technology",
  robots: {
    index: true,
    follow: true,
  },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={fontVariables}>
      <body data-measurement-foundation="vercel-native-run001">
        <BrowserExperience />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
