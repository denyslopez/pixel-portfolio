import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Capabilities } from "@/components/Capabilities";
import { ClientArchive } from "@/components/ClientArchive";
import { Nav } from "@/components/Nav";
import { ProductLab } from "@/components/ProductLab";
import { SelectedWork } from "@/components/SelectedWork";
import { ImmersiveField } from "@/components/experience/ImmersiveField";
import { KineticHero } from "@/components/experience/KineticHero";
import { KineticPractice } from "@/components/experience/KineticPractice";
import { getContactLinks, publicContact } from "@/lib/contact";
import { getContent, isLocale, locales, type Locale } from "@/lib/content";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const title = "AI Product Engineer & Design Engineer";
  const description = lang === "en"
    ? "Denys Lopez builds intelligent digital products across Canada, the United States and El Salvador."
    : "Denys Lopez construye productos digitales inteligentes para Canadá, Estados Unidos y El Salvador.";

  return {
    title,
    description,
    alternates: { languages: { en: "/en", es: "/es" } },
    openGraph: {
      title: `${title} — Denys Lopez`,
      description,
      locale: lang === "en" ? "en_CA" : "es_SV",
      alternateLocale: [lang === "en" ? "es_SV" : "en_CA"],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Denys Lopez — AI Product Engineer & Design Engineer" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Denys Lopez`,
      description,
      images: ["/twitter-image"],
    },
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const c = getContent(locale);
  const contact = getContactLinks(locale);

  return (
    <main>
      <ImmersiveField />
      <Nav locale={locale} labels={c.nav} />
      <KineticHero {...c.hero} contactHref={contact.email} />
      <KineticPractice {...c.identity} />

      <SelectedWork {...c.work} locale={locale} />
      <ClientArchive {...c.archive} />
      <ProductLab {...c.lab} locale={locale} />
      <Capabilities {...c.capabilities} />

      <section className="section about" id="about">
        <div className="section-heading">
          <span className="label">{c.about.eyebrow}</span>
          <h2>{c.about.title}</h2>
        </div>
        <div className="about-grid">
          <p className="wide-copy">{c.about.body}</p>
          <div className="about-notes">
            <p>{c.about.denysoft}</p>
            <p>{c.about.axom}</p>
          </div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <span className="label">{c.contact.eyebrow}</span>
        <h2 className="contact-title">
          {c.contact.title.map((line) => {
            const lengthClass = line.length >= 10 && !/\s/.test(line)
              ? " contact-title-line--long"
              : line.length >= 8
                ? " contact-title-line--medium"
                : "";

            return (
              <span className={`contact-title-line${lengthClass}`} key={line}>
                {line}
              </span>
            );
          })}
        </h2>
        <div className="contact-bottom">
          <p>{c.contact.body}</p>
          <div
            className="contact-actions"
            aria-label={locale === "en" ? "Contact options" : "Opciones de contacto"}
            style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "flex-start" }}
          >
            <a className="contact-cta" href={contact.email}>
              Email · {publicContact.email} ↗
            </a>
            <a className="contact-cta" href={contact.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp · {publicContact.whatsappDisplay} ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 DENYS LOPEZ</span>
        <span>{c.footer}</span>
        <span>ENG / ESP</span>
      </footer>
    </main>
  );
}
