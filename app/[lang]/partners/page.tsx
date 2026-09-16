import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DenysoftExperience } from "@/components/denysoft-current/DenysoftExperience";
import { isCurrentLocale } from "@/lib/denysoft-current-content";
import { currentMetadata } from "@/lib/denysoft-current-seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return isCurrentLocale(lang) ? currentMetadata(lang, "partners") : {};
}

export default async function PartnersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isCurrentLocale(lang)) notFound();
  return <DenysoftExperience locale={lang} page="partners" />;
}
