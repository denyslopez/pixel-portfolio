import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fontVariables } from "../fonts";
import "../globals.css";
import "../experience.css";
import "../accessibility.css";
import "../r1.css";
import { isLocale, locales } from "@/lib/content";

const title = "Denys Lopez — AI Product Engineer & Design Engineer";
const description = "AI Product Engineer and Design Engineer building intelligent digital products across Canada, the United States and El Salvador.";

function getMetadataBase() {
  const vercelUrl = process.env.VERCEL_URL;
  return new URL(vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: title,
    template: "%s — Denys Lopez",
  },
  description,
  applicationName: "Denys Lopez Portfolio",
  authors: [{ name: "Denys Lopez" }],
  creator: "Denys Lopez",
  publisher: "Denys Lopez",
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
      <body>{children}</body>
    </html>
  );
}
