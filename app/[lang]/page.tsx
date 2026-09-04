import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Capabilities } from "@/components/Capabilities";
import { DocumentLocale } from "@/components/DocumentLocale";
import { Nav } from "@/components/Nav";
import { SelectedWork } from "@/components/SelectedWork";
import { ImmersiveField } from "@/components/experience/ImmersiveField";
import { KineticHero } from "@/components/experience/KineticHero";
import { KineticPractice } from "@/components/experience/KineticPractice";
import { getContent, isLocale, locales, type Locale } from "@/lib/content";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  return {
    title: "AI Product Engineer & Design Engineer",
    description: lang === "en"
      ? "Denys Lopez builds intelligent digital products across Canada, the United States and El Salvador."
      : "Denys Lopez construye productos digitales inteligentes para Canadá, Estados Unidos y El Salvador.",
    alternates: { languages: { en: "/en", es: "/es" } },
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const c = getContent(locale);

  return (
    <main>
      <DocumentLocale locale={locale} />
      <ImmersiveField />
      <Nav locale={locale} labels={c.nav} />
      <KineticHero {...c.hero} />
      <KineticPractice {...c.identity} />

      <SelectedWork {...c.work} locale={locale} />
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
          {c.contact.title.map((line) => <span key={line}>{line}</span>)}
        </h2>
        <div className="contact-bottom">
          <p>{c.contact.body}</p>
          <span className="contact-cta">{c.contact.cta} ↗</span>
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
