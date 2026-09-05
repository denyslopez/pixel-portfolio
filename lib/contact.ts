import type { Locale } from "./content";

export const publicContact = {
  email: "info@denysoft.net",
  whatsappDisplay: "+503 7231 0476",
  whatsappNumber: "50372310476",
} as const;

export function getContactLinks(locale: Locale) {
  const subject = locale === "en"
    ? "Project inquiry — Denys Lopez portfolio"
    : "Consulta de proyecto — Portafolio Denys Lopez";
  const whatsappMessage = locale === "en"
    ? "Hi Denys, I visited your portfolio and would like to talk about a project."
    : "Hola Denys, visité tu portafolio y me gustaría conversar sobre un proyecto.";

  return {
    email: `mailto:${publicContact.email}?subject=${encodeURIComponent(subject)}`,
    whatsapp: `https://wa.me/${publicContact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  } as const;
}
