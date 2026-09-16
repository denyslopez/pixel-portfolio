import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DenysoftExperience } from "@/components/denysoft-current/DenysoftExperience";
import { isCurrentLocale, type CurrentLocale } from "@/lib/denysoft-current-content";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isCurrentLocale(lang)) return {};
  const title = lang === "en"
    ? "Denysoft — Digital Products, Systems & Applied AI"
    : "Denysoft — Productos Digitales, Sistemas e IA Aplicada";
  const description = lang === "en"
    ? "Digital products and AI-enabled business systems, built with judgment — from product strategy and design through software and governed implementation."
    : "Productos digitales y sistemas de negocio con IA, construidos con criterio — desde estrategia y diseño de producto hasta software e implementación gobernada.";
  const canonicalPath = `/${lang}`;
  return {
    title,
    description,
    alternates: { canonical: canonicalPath, languages: { en: "/en", es: "/es" } },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      locale: lang === "en" ? "en_CA" : "es_SV",
      alternateLocale: [lang === "en" ? "es_SV" : "en_CA"],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Denysoft" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isCurrentLocale(lang)) notFound();
  return <DenysoftExperience locale={lang as CurrentLocale} page="home" />;
}
