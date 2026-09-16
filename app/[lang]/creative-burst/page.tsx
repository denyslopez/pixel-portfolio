import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { isCurrentLocale } from "@/lib/denysoft-current-content";

export const metadata: Metadata = {
  title: "Denysoft",
  description: "Denysoft digital products, systems and applied AI.",
  robots: { index: false, follow: false },
};

export default async function CreativeBurstPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isCurrentLocale(lang)) notFound();
  permanentRedirect(`/${lang}`);
}
