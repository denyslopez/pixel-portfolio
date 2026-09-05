import type { Locale } from "./content";
import { getProject, getProjectSlugs } from "./projects";

type Text = Record<Locale, string>;
type Entry = { slug: string; title: string; category: Text; summary: Text; image?: string; url?: string; exploration?: boolean };

// Attribution and publication limits: docs/portfolio-001/r3-1-evidence-inventory.md.
const entries: readonly Entry[] = [
  { slug: "all-star-restoration", title: "All Star Restoration / ASR Services", category: { en: "Service website", es: "Sitio de servicios" }, summary: { en: "A web presence for restoration services, with service information and a consultation path.", es: "Una presencia web de servicios de restauración, con información de servicios y una vía de consulta." }, image: "all-star-restoration", url: "https://asrservices.ca" },
  { slug: "lost-connection-games", title: "Lost Connection Games", category: { en: "Educational games / Website", es: "Juegos educativos / Sitio web" }, summary: { en: "A website introducing an educational game, its instructions and promotional material.", es: "Un sitio que presenta un juego educativo, sus instrucciones y material promocional." }, image: "lost-connection-games", url: "https://lostconnectiongames.com" },
  { slug: "rina-group", title: "Rina Group", category: { en: "Home services / Website", es: "Servicios para el hogar / Sitio web" }, summary: { en: "A renovation-services website presenting the business and its contact paths.", es: "Un sitio de servicios de renovación que presenta el negocio y sus vías de contacto." }, image: "rina-group", url: "https://rinagroup.ca" },
  { slug: "cerka-marketing", title: "CerKa Marketing", category: { en: "Bilingual marketing website", es: "Sitio bilingüe de marketing" }, summary: { en: "A bilingual web presence presenting a digital marketing agency and its services.", es: "Una presencia web bilingüe que presenta una agencia de marketing digital y sus servicios." }, image: "cerka-marketing", url: "https://cerkamarketing.com" },
  { slug: "canaroots", title: "CanaRoots", category: { en: "Renovation / Website", es: "Renovación / Sitio web" }, summary: { en: "A renovation website recorded in the earlier portfolio. Preserved here as a historical project entry.", es: "Un sitio de renovación registrado en el portafolio anterior. Se conserva aquí como entrada histórica." } },
  { slug: "seed-of-hope-miami", title: "Seed of Hope Miami", category: { en: "Nonprofit / Community website", es: "Organización social / Sitio comunitario" }, summary: { en: "A web presence for Seed of Hope Ministries, presenting its community activities and ways to get involved.", es: "Una presencia web de Seed of Hope Ministries que presenta sus actividades comunitarias y formas de participar." }, image: "seed-of-hope-miami", url: "https://seedofhopemiami.org" },
  { slug: "reduzca-talla-y-peso", title: "Reduzca Talla y Peso", category: { en: "Website archive", es: "Archivo web" }, summary: { en: "A historical website project. Its recorded address now presents Triple Terapia; this entry preserves the original project name.", es: "Un proyecto web histórico. Su dirección registrada presenta ahora Triple Terapia; esta entrada conserva el nombre original del proyecto." } },
  { slug: "villas-de-san-luis", title: "Villas de San Luis", category: { en: "Real estate / Website", es: "Bienes raíces / Sitio web" }, summary: { en: "A real-estate web project recorded in the earlier portfolio. Preserved as an archive entry.", es: "Un proyecto web inmobiliario registrado en el portafolio anterior. Se conserva como entrada del archivo." } },
  { slug: "triple-terapia", title: "Triple Terapia", category: { en: "Website archive", es: "Archivo web" }, summary: { en: "A website project preserved in the portfolio archive. This entry documents the project, without making treatment or results claims.", es: "Un proyecto web conservado en el archivo del portafolio. Esta entrada documenta el proyecto, sin afirmar resultados ni beneficios de tratamientos." } },
  { slug: "reveal-studio", title: "Reveal Studio / Virtual Hair Style", category: { en: "Beauty tech / Exploration", es: "Tecnología de belleza / Exploración" }, summary: { en: "An exploratory interface for previewing a hairstyle before an appointment. Presented as a product exploration.", es: "Una interfaz exploratoria para visualizar un estilo de cabello antes de una cita. Se presenta como exploración de producto." }, image: "reveal-studio", url: "https://virtual-hair-style.vercel.app", exploration: true },
  { slug: "diaspora-heat-map", title: "Diaspora Heat Map", category: { en: "Geospatial / Exploration", es: "Geoespacial / Exploración" }, summary: { en: "An exploratory interface for viewing diaspora concentration and community points of contact on a map. The recorded demo currently has a map-provider limitation.", es: "Una interfaz exploratoria para visualizar en un mapa la concentración de la diáspora y puntos de contacto comunitarios. La demo registrada presenta actualmente una limitación del proveedor del mapa." }, exploration: true },
];

export const archiveLabels = {
  en: { title: "Work / Portfolio", intro: "Selected projects, a longer record of client work, and product explorations.", selected: "Selected work", historical: "Project archive", experiments: "Explorations", entry: "Portfolio entry", case: "Case study", view: "View project", back: "Back to all work", home: "Back to home", scope: "A brief project record from the portfolio archive.", capture: "Website captured September 5, 2026. The live site may change.", visit: "Visit website", noImage: "Historical project record" },
  es: { title: "Trabajo / Portafolio", intro: "Proyectos seleccionados, una trayectoria de trabajo para clientes y exploraciones de producto.", selected: "Trabajo seleccionado", historical: "Archivo de proyectos", experiments: "Exploraciones", entry: "Entrada de portafolio", case: "Caso de estudio", view: "Ver proyecto", back: "Volver a todos los trabajos", home: "Volver al inicio", scope: "Una ficha breve del archivo de proyectos del portafolio.", capture: "Sitio capturado el 5 de septiembre de 2026. El sitio en vivo puede cambiar.", visit: "Visitar sitio web", noImage: "Registro histórico del proyecto" },
} as const;

export function getArchiveEntries(locale: Locale) {
  return entries.map(entry => ({ ...entry, category: entry.category[locale], summary: entry.summary[locale], image: entry.image ? `/work/${entry.image}.jpg` : undefined }));
}

export function getArchiveEntry(locale: Locale, slug: string) {
  return getArchiveEntries(locale).find(entry => entry.slug === slug);
}

export function getWorkItems(locale: Locale) {
  const selected = getProjectSlugs().map(slug => {
    const project = getProject(locale, slug)!;
    return { slug, title: project.title, category: project.category, summary: project.summary, image: slug === "taller-express" ? undefined : `/work/${slug}.jpg`, exploration: false, selected: true };
  });
  return [...selected, ...getArchiveEntries(locale).map(entry => ({ ...entry, selected: false }))];
}
