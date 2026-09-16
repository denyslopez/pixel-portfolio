import type { Metadata } from "next";
import type { CurrentLocale, CurrentPage } from "./denysoft-current-content";

const routeMeta: Record<CurrentPage, Record<CurrentLocale, { title: string; description: string }>> = {
  home: {
    en: { title: "Denysoft — Digital Products, Systems & Applied AI", description: "Digital products and AI-enabled business systems, built with judgment — from product strategy and design through software and governed implementation." },
    es: { title: "Denysoft — Productos Digitales, Sistemas e IA Aplicada", description: "Productos digitales y sistemas de negocio con IA, construidos con criterio — desde estrategia y diseño de producto hasta software e implementación gobernada." },
  },
  solutions: {
    en: { title: "Solutions — Denysoft", description: "Product, systems and applied-AI capability organized around the real business challenge, not a predetermined deliverable." },
    es: { title: "Soluciones — Denysoft", description: "Capacidad de producto, sistemas e IA aplicada organizada alrededor del reto real de negocio, no de un entregable predeterminado." },
  },
  work: {
    en: { title: "Work — Denysoft", description: "Active systems, product stories and experiments presented with explicit evidence type and maturity." },
    es: { title: "Trabajo — Denysoft", description: "Sistemas activos, historias de producto y experimentos presentados con tipo de evidencia y madurez explícitos." },
  },
  axom: {
    en: { title: "AXOM — Denysoft", description: "The governed AI-native system behind disciplined product delivery, evidence and explicit Human authority." },
    es: { title: "AXOM — Denysoft", description: "El sistema gobernado y nativo de IA detrás de una entrega disciplinada, evidencia y autoridad humana explícita." },
  },
  partners: {
    en: { title: "Partners — Denysoft", description: "Product, technical and AI-native capability that integrates quietly into agency and consultancy delivery." },
    es: { title: "Partners — Denysoft", description: "Capacidad de producto, técnica y nativa de IA que se integra discretamente en la entrega de agencias y consultoras." },
  },
  about: {
    en: { title: "About / Founder — Denysoft", description: "Founder-led accountability with company-level ambition: product judgment, design, software and AI-native systems." },
    es: { title: "Perfil / Founder — Denysoft", description: "Responsabilidad founder-led con ambición a nivel de compañía: criterio de producto, diseño, software y sistemas nativos de IA." },
  },
  discuss: {
    en: { title: "Discuss a Challenge — Denysoft", description: "Bring the business, product, system or AI challenge. Denysoft helps frame what should happen next." },
    es: { title: "Hablar de un Reto — Denysoft", description: "Trae el reto de negocio, producto, sistema o IA. Denysoft ayuda a enmarcar qué debería pasar después." },
  },
};

export function currentMetadata(locale: CurrentLocale, page: CurrentPage): Metadata {
  const meta = routeMeta[page][locale];
  const path = page === "home" ? `/${locale}` : `/${locale}/${page}`;
  const enPath = page === "home" ? "/en" : `/en/${page}`;
  const esPath = page === "home" ? "/es" : `/es/${page}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path, languages: { en: enPath, es: esPath } },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      locale: locale === "en" ? "en_CA" : "es_SV",
      alternateLocale: [locale === "en" ? "es_SV" : "en_CA"],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Denysoft" }],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: ["/twitter-image"] },
  };
}
