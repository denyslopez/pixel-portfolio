import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { SelectedWork } from "@/components/SelectedWork";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { RangeSection } from "@/components/RangeSection";
import { Capabilities } from "@/components/Capabilities";
import { KineticHero } from "@/components/experience/KineticHero";
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
    ? "Denys Lopez builds intelligent digital products across Canada, the United States, El Salvador and Latin America."
    : "Denys Lopez construye productos digitales inteligentes para Canadá, Estados Unidos, El Salvador y Latinoamérica.";
  const canonicalPath = `/${lang}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: { en: "/en", es: "/es" },
    },
    openGraph: {
      title: `${title} — Denys Lopez`,
      description,
      url: canonicalPath,
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
    <main className="r3-site">
      <Nav locale={locale} labels={c.nav} />
      <KineticHero {...c.hero} contactHref={contact.email} />

      <section className="r3-capability-rail" aria-label={locale === "en" ? "Core capabilities" : "Capacidades principales"}>
        {c.capabilityRail.map((item) => (
          <div className="r3-capability-item" key={item}>{item}</div>
        ))}
      </section>

      <SelectedWork {...c.work} locale={locale} />

      <PortfolioGrid {...c.portfolio} locale={locale} />

      <RangeSection {...c.range} />

      <Capabilities {...c.capabilities} />

      <section className="r3-axom" id="axom">
        <div className="r3-axom-grid">
          <div className="r3-axom-copy">
            <span className="label">{c.axom.eyebrow}</span>
            <h2>{c.axom.title}</h2>
            <p>{c.axom.body}</p>

            <ul className="r3-axom-principles">
              {c.axom.principles.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="r3-system-panel" aria-hidden="true">
            <span className="r3-orbit">
              <span className="r3-orbit-node" />
            </span>
            <span className="r3-orbit r3-orbit--inner">
              <span className="r3-orbit-node" />
            </span>
          </div>
        </div>
      </section>

      <section className="r3-products" aria-labelledby="axom-products-title">
        <div className="r3-products-heading">
          <span className="label">{c.axom.productsEyebrow}</span>
          <h2 id="axom-products-title">{c.axom.productsTitle}</h2>
        </div>

        <div className="r3-products-grid">
          {c.axom.products.map((product) => (
            <article className="r3-product" key={product.title}>
              <span className="r3-status">{product.status}</span>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="r3-about" id="about">
        <div className="r3-about-copy">
          <span className="label">{c.about.eyebrow}</span>
          <h2>{c.about.title}</h2>
          <p>{c.about.body}</p>
        </div>

        <div className="r3-about-disciplines" aria-label={locale === "en" ? "Disciplines" : "Disciplinas"}>
          {c.about.disciplines.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="r3-close" id="contact">
        <div className="r3-close-content">
          <span className="label">{c.contact.eyebrow}</span>
          <h2>{c.contact.title}</h2>
        </div>

        <div className="r3-close-actions">
          <p>{c.contact.body}</p>
          <div className="r3-contact-links" aria-label={locale === "en" ? "Contact options" : "Opciones de contacto"}>
            <a className="r3-link r3-link--signal" href={contact.email}>
              {c.contact.email} · {publicContact.email} ↗
            </a>
            <a className="r3-link" href={contact.whatsapp} target="_blank" rel="noreferrer">
              {c.contact.whatsapp} · {publicContact.whatsappDisplay} ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="r3-footer">
        <span>© 2026 DENYS LOPEZ</span>
        <span>{c.footer}</span>
        <span>ENG / ESP</span>
      </footer>
    </main>
  );
}
