"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { getCurrentContent, type CurrentLocale, type CurrentPage } from "@/lib/denysoft-current-content";
import { getProject, getProjectSlugs } from "@/lib/projects";
import {
  AxomSystemMap,
  DecisionField,
  EvidenceMedia,
  FounderEditorial,
  PartnerIntegrationMap,
  ServiceJourney,
} from "./SignatureMedia";
import styles from "./denysoft-current.module.css";

const navOrder = ["solutions", "work", "axom", "partners", "about"] as const;

function routeFor(locale: CurrentLocale, page: CurrentPage) {
  return page === "home" ? `/${locale}` : `/${locale}/${page}`;
}

function LanguageSwitch({ locale }: { locale: CurrentLocale }) {
  const pathname = usePathname();
  const other = locale === "en" ? "es" : "en";
  const segments = pathname.split("/");
  segments[1] = other;
  const href = segments.join("/") || `/${other}`;
  return (
    <div className={styles.language} aria-label={locale === "en" ? "Language selector" : "Selector de idioma"}>
      <span aria-current="page">{locale.toUpperCase()}</span>
      <span aria-hidden="true">/</span>
      <Link href={href} hrefLang={other}>{other.toUpperCase()}</Link>
    </div>
  );
}

function SiteHeader({ locale, active }: { locale: CurrentLocale; active: CurrentPage }) {
  const t = getCurrentContent(locale);
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header} data-qa="site-header">
      <Link className={styles.wordmark} href={`/${locale}`} aria-label="Denysoft home">DENYSOFT</Link>
      <nav className={styles.desktopNav} aria-label={locale === "en" ? "Primary navigation" : "Navegación principal"}>
        {navOrder.map((item) => (
          <Link key={item} href={routeFor(locale, item)} aria-current={active === item ? "page" : undefined}>{t.nav[item]}</Link>
        ))}
      </nav>
      <div className={styles.headerSpacer} />
      <LanguageSwitch locale={locale} />
      <Link className={styles.primaryButton} href={routeFor(locale, "discuss")}>{t.nav.discuss}</Link>
      <button className={styles.menuButton} type="button" aria-expanded={open} aria-controls="denysoft-mobile-menu" onClick={() => setOpen((value) => !value)}>
        {open ? "CLOSE" : "MENU"}
      </button>
      {open && (
        <nav id="denysoft-mobile-menu" className={styles.mobileMenu} aria-label={locale === "en" ? "Mobile navigation" : "Navegación móvil"}>
          {navOrder.map((item) => (
            <Link key={item} href={routeFor(locale, item)} onClick={() => setOpen(false)}>{t.nav[item]}</Link>
          ))}
          <Link href={routeFor(locale, "discuss")} onClick={() => setOpen(false)}>{t.nav.discuss}</Link>
        </nav>
      )}
    </header>
  );
}

function Footer({ locale }: { locale: CurrentLocale }) {
  const t = getCurrentContent(locale);
  return (
    <footer className={styles.footer}>
      <div className={styles.footerRule} />
      <h2>{t.footer.prompt}</h2>
      <Link className={styles.primaryButton} href={routeFor(locale, "discuss")}>{t.nav.discuss}</Link>
      <div className={styles.footerMeta}>
        <strong>DENYSOFT</strong><span>{t.footer.descriptor}</span><a href="mailto:info@denysoft.net">info@denysoft.net</a><LanguageSwitch locale={locale} />
      </div>
    </footer>
  );
}

function PageHero({ kicker, title, body, locale, showSecondary = true }: { kicker: string; title: string; body: string; locale: CurrentLocale; showSecondary?: boolean }) {
  const t = getCurrentContent(locale);
  return (
    <section className={styles.pageHero} data-qa="page-hero">
      <p className={styles.kicker}>{kicker}</p>
      <h1>{title}</h1>
      <p className={styles.lead}>{body}</p>
      <div className={styles.actions}>
        <Link className={styles.primaryButton} href={routeFor(locale, "discuss")}>{t.nav.discuss}</Link>
        {showSecondary && <Link className={styles.secondaryButton} href={routeFor(locale, "work")}>{locale === "en" ? "See Selected Work" : "Ver trabajo seleccionado"}</Link>}
      </div>
    </section>
  );
}

function SignatureSignal() {
  return (
    <div className={styles.signalField} aria-label="Judgment to system to evidence signal field">
      <div className={styles.signalGrid} aria-hidden="true" />
      <div className={styles.signalFocus} aria-hidden="true" />
      <span className={styles.signalLive}>EVIDENCE FIELD / LIVE</span>
      <div className={styles.signalNodes} aria-hidden="true">
        {Array.from({ length: 7 }, (_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}
      </div>
      <span className={styles.signalSequence}>JUDGMENT → SYSTEM → EVIDENCE</span>
      <span className={styles.signalState}>06 / VERIFIED PATH</span>
    </div>
  );
}

function EvidenceGrid({ locale }: { locale: CurrentLocale }) {
  const t = getCurrentContent(locale);
  return (
    <div className={styles.evidenceGrid} data-qa="evidence-grid">
      {t.evidence.map((item) => (
        <article key={item.title} className={styles.evidenceCard} tabIndex={0}>
          <EvidenceMedia kind={item.visual} />
          <div className={styles.badges}><span className={styles.typeBadge}>{item.type}</span><span className={styles.maturityBadge} data-state={item.maturity.includes("EXPERIMENT") ? "experimental" : "active"}>{item.maturity}</span></div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <div className={styles.evidenceReveal} aria-hidden="true"><span>Evidence stays labeled</span><span>State remains explicit</span><span>Human authority preserved</span></div>
        </article>
      ))}
    </div>
  );
}

function SelectedWork({ locale, compact = false }: { locale: CurrentLocale; compact?: boolean }) {
  return (
    <section className={styles.section} data-qa="selected-client-work">
      <div className={styles.sectionIntro}>
        <div>
          <p className={styles.kicker}>{locale === "en" ? "SELECTED CLIENT / PRODUCT WORK" : "TRABAJO SELECCIONADO / CLIENTES Y PRODUCTO"}</p>
          <h2>{locale === "en" ? "Three projects. Three different business contexts." : "Tres proyectos. Tres contextos de negocio distintos."}</h2>
        </div>
        <p>{locale === "en" ? "Each case study stays bounded to the work and evidence we can actually support." : "Cada caso se mantiene limitado al trabajo y la evidencia que realmente podemos respaldar."}</p>
      </div>
      <div className={styles.cardGrid}>
        {getProjectSlugs().map((slug) => {
          const project = getProject(locale, slug);
          if (!project) return null;
          return (
            <article key={slug}>
              <span>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <Link className={styles.secondaryButton} href={`/${locale}/work/${slug}`}>{locale === "en" ? "View case study" : "Ver caso"}</Link>
            </article>
          );
        })}
      </div>
      {!compact && <p className={styles.monoNote}>{locale === "en" ? "LIVE PROJECT LINKS AND CLAIM BOUNDARIES REMAIN EXPLICIT INSIDE EACH CASE." : "LOS LINKS A PROYECTOS EN VIVO Y LOS LÍMITES DE EVIDENCIA PERMANECEN EXPLÍCITOS EN CADA CASO."}</p>}
    </section>
  );
}

function DeliveryProcess({ locale }: { locale: CurrentLocale }) {
  const steps = locale === "en"
    ? [
        ["01 / Frame", "Clarify the signal, user, business context, constraints and evidence before prescribing output."],
        ["02 / Specify", "Turn the challenge into explicit product behavior, boundaries, acceptance criteria and decision points."],
        ["03 / Build", "Design and implement the smallest justified system with architecture and authority kept visible."],
        ["04 / Evaluate", "Verify behavior, quality, accessibility, performance and evidence before release or handoff."],
      ]
    : [
        ["01 / Enmarcar", "Aclarar la señal, usuario, contexto de negocio, restricciones y evidencia antes de prescribir una salida."],
        ["02 / Especificar", "Convertir el reto en comportamiento explícito, límites, criterios de aceptación y puntos de decisión."],
        ["03 / Construir", "Diseñar e implementar el sistema mínimo justificado manteniendo visibles arquitectura y autoridad."],
        ["04 / Evaluar", "Verificar comportamiento, calidad, accesibilidad, performance y evidencia antes de release o handoff."],
      ];
  return (
    <section className={styles.section} data-qa="delivery-process">
      <p className={styles.kicker}>{locale === "en" ? "DELIVERY PROCESS" : "PROCESO DE ENTREGA"}</p>
      <h2 className={styles.sectionTitle}>{locale === "en" ? "A disciplined path from ambiguity to evidence." : "Un camino disciplinado desde la ambigüedad hasta la evidencia."}</h2>
      <div className={styles.cardGrid}>{steps.map(([title, body]) => <article key={title}><span>{title}</span><p>{body}</p></article>)}</div>
    </section>
  );
}

function Home({ locale }: { locale: CurrentLocale }) {
  const t = getCurrentContent(locale);
  return (
    <>
      <section className={styles.homeHero} data-qa="home-hero">
        <p className={styles.kicker}>{t.home.kicker}</p>
        <h1>{t.home.title.map((line) => <span key={line}>{line}</span>)}</h1>
        <div className={styles.heroSplit}>
          <div><p className={styles.lead}>{t.home.body}</p><div className={styles.actions}><Link className={styles.primaryButton} href={routeFor(locale, "discuss")}>{t.nav.discuss}</Link><Link className={styles.secondaryButton} href={routeFor(locale, "work")}>{locale === "en" ? "See Selected Work" : "Ver trabajo seleccionado"}</Link></div></div>
          <SignatureSignal />
        </div>
      </section>
      <section className={styles.darkThesis}><p className={styles.kickerAccent}>{t.home.thesisKicker}</p><h2>{t.home.thesis}</h2><p className={styles.monoNote}>{t.home.thesisNote}</p></section>
      <SelectedWork locale={locale} compact />
      <section className={styles.section}><div className={styles.sectionIntro}><div><p className={styles.kicker}>{t.home.evidenceKicker}</p><h2>{t.home.evidenceTitle}</h2></div><p>{t.home.evidenceBody}</p></div><EvidenceGrid locale={locale}/></section>
      <section className={styles.storySection}><div className={styles.badges}><span className={styles.typeBadge}>{locale === "en" ? "PROJECT STORY" : "HISTORIA DE PROYECTO"}</span><span className={styles.maturityBadge} data-state="active">{locale === "en" ? "ACTIVE" : "ACTIVO"}</span></div><p className={styles.kicker}>{t.home.projectStory.label}</p><h2>{t.home.projectStory.title}</h2><div className={styles.storySplit}><div><p>{t.home.projectStory.body}</p><hr/><p className={styles.kicker}>{locale === "en" ? "EVIDENCE PATH" : "RUTA DE EVIDENCIA"}</p><p className={styles.monoNote}>{t.home.projectStory.path}</p></div><ServiceJourney /></div></section>
      <section className={styles.axomSection}><p className={styles.kickerAccent}>{t.home.axom.kicker}</p><h2>{t.home.axom.title}</h2><p className={styles.axomLead}>{t.home.axom.body}</p><div className={styles.axomSplit}><AxomSystemMap locale={locale}/><div className={styles.capabilityNotes}>{t.home.axom.notes.map(([a,b]) => <div key={a}><span>{a}</span><p>{b}</p></div>)}</div></div></section>
      <section className={styles.section}><p className={styles.kicker}>{t.home.partners.kicker}</p><h2 className={styles.sectionTitle}>{t.home.partners.title}</h2><div className={styles.cardGrid}>{t.home.partners.cards.map(([a,b]) => <article key={a}><span>{a}</span><p>{b}</p></article>)}</div></section>
      <section className={styles.founderSection}><FounderEditorial locale={locale}/><div><p className={styles.kickerAccent}>{t.home.founder.kicker}</p><h2>{t.home.founder.title}</h2><p>{t.home.founder.body}</p><hr/><span className={styles.monoNote}>{t.home.founder.location}</span></div></section>
    </>
  );
}

function Solutions({ locale }: { locale: CurrentLocale }) {
  const t = getCurrentContent(locale);
  const [active, setActive] = useState(0);
  return <><PageHero locale={locale} kicker={t.solutions.kicker} title={t.solutions.title} body={t.solutions.body}/><section className={styles.section}><p className={styles.kicker}>{t.solutions.lensKicker}</p><h2 className={styles.sectionTitle}>{t.solutions.lensTitle}</h2><p className={styles.sectionLead}>{t.solutions.lensIntro}</p><DecisionField locale={locale}/><div className={styles.decisionLens}>{t.solutions.lens.map(([a,b,c], index) => <button type="button" key={a} className={active === index ? styles.activeLens : undefined} onClick={() => setActive(index)}><span>{a}</span><strong>{b}</strong><p>{c}</p></button>)}<div className={styles.lensOutput}><span>{locale === "en" ? "RECOMMENDED PATH" : "RUTA RECOMENDADA"}</span><strong>{t.solutions.lens[active][2]}</strong></div></div></section><section className={styles.section}><h2 className={styles.sectionTitle}>{t.solutions.pathwaysTitle}</h2><div className={styles.cardGrid}>{t.solutions.pathways.map(([a,b]) => <article key={a}><i/><h3>{a}</h3><p>{b}</p></article>)}</div></section><DeliveryProcess locale={locale}/><section className={styles.darkThesis}><p className={styles.kickerAccent}>{t.solutions.modelKicker}</p><h2>{t.solutions.modelTitle}</h2><p>{t.solutions.modelBody}</p></section></>;
}

function Work({ locale }: { locale: CurrentLocale }) {
  const t = getCurrentContent(locale);
  const story = t.home.projectStory;
  return <><PageHero locale={locale} kicker={t.work.kicker} title={t.work.title} body={t.work.body}/><SelectedWork locale={locale}/><section className={styles.section}><div className={styles.sectionIntro}><div><p className={styles.kicker}>{t.work.evidenceKicker}</p><h2>{t.work.evidenceTitle}</h2></div><p>{t.work.evidenceBody}</p></div><EvidenceGrid locale={locale}/></section><section className={styles.storySection}><div className={styles.badges}><span className={styles.typeBadge}>{locale === "en" ? "PROJECT STORY" : "HISTORIA DE PROYECTO"}</span><span className={styles.maturityBadge} data-state="active">{locale === "en" ? "ACTIVE" : "ACTIVO"}</span></div><p className={styles.kicker}>{story.label}</p><h2>{story.title}</h2><div className={styles.storySplit}><div><p>{story.body}</p><hr/><p className={styles.monoNote}>{story.path}</p></div><ServiceJourney/></div></section></>;
}

function Axom({ locale }: { locale: CurrentLocale }) {
  const t = getCurrentContent(locale);
  return <><PageHero locale={locale} kicker={t.axom.kicker} title={t.axom.title} body={t.axom.body}/><section className={styles.axomSection}><p className={styles.kickerAccent}>{t.axom.systemKicker}</p><h2>{t.axom.systemTitle}</h2><p className={styles.axomLead}>{t.axom.systemBody}</p><AxomSystemMap locale={locale}/></section><section className={styles.section}><h2 className={styles.sectionTitle}>{t.axom.principlesTitle}</h2><div className={styles.cardGrid}>{t.axom.principles.map(([a,b]) => <article key={a}><i/><h3>{a}</h3><p>{b}</p></article>)}</div></section></>;
}

function Partners({ locale }: { locale: CurrentLocale }) {
  const t = getCurrentContent(locale);
  return <><PageHero locale={locale} kicker={t.partners.kicker} title={t.partners.title} body={t.partners.body}/><section className={styles.section}><p className={styles.kicker}>{t.partners.capabilityKicker}</p><h2 className={styles.sectionTitle}>{t.partners.capabilityTitle}</h2><div className={styles.cardGrid}>{t.partners.capabilities.map(([a,b]) => <article key={a}><span>{a}</span><p>{b}</p></article>)}</div></section><section className={styles.section}><p className={styles.kicker}>{t.partners.engagementKicker}</p><h2 className={styles.sectionTitle}>{t.partners.engagementTitle}</h2><PartnerIntegrationMap locale={locale}/><div className={styles.integrationRail}>{t.partners.integration.map(([a,b], index) => <div key={a}><span>{String(index+1).padStart(2,"0")}</span><strong>{a}</strong><p>{b}</p></div>)}</div><div className={styles.cardGrid}>{t.partners.steps.map(([a,b]) => <article key={a}><h3>{a}</h3><p>{b}</p></article>)}</div></section></>;
}

function About({ locale }: { locale: CurrentLocale }) {
  const t = getCurrentContent(locale);
  return <><PageHero locale={locale} kicker={t.about.kicker} title={t.about.title} body={t.about.body}/><section className={styles.founderSection}><FounderEditorial locale={locale}/><div><p className={styles.kickerAccent}>{t.about.founderKicker}</p><h2>{t.about.founderTitle}</h2><p>{t.about.founderBody}</p><hr/><span className={styles.monoNote}>{locale === "en" ? "Canada · El Salvador · International collaboration" : "Canadá · El Salvador · Colaboración internacional"}</span></div></section><section className={styles.section}><p className={styles.kicker}>{t.about.accountabilityKicker}</p><h2 className={styles.sectionTitle}>{t.about.accountabilityTitle}</h2><div className={styles.trace}>{t.about.trace.map(([a,b]) => <div key={a}><span>{a}</span><p>{b}</p></div>)}</div></section><section className={styles.section}><h2 className={styles.sectionTitle}>{t.about.principlesTitle}</h2><div className={styles.cardGrid}>{t.about.principles.map(([a,b]) => <article key={a}><i/><h3>{a}</h3><p>{b}</p></article>)}</div></section></>;
}

function Discuss({ locale }: { locale: CurrentLocale }) {
  const t = getCurrentContent(locale);
  const disclosure = locale === "en"
    ? "This intake prepares an email in your email app. Denysoft receives it only after you send it."
    : "Este intake prepara un correo en tu aplicación de email. Denysoft lo recibe únicamente cuando tú lo envías.";
  return <><PageHero locale={locale} kicker={t.discuss.kicker} title={t.discuss.title} body={t.discuss.body} showSecondary={false}/><section className={styles.section}><p className={styles.kicker}>{t.discuss.lensKicker}</p><h2 className={styles.sectionTitle}>{t.discuss.lensTitle}</h2><div className={styles.framingLens}>{t.discuss.prompts.map(([a,b]) => <div key={a}><span>{a}</span><p>{b}</p></div>)}</div></section><section className={styles.storySection}><h2>{t.discuss.intakeTitle}</h2><form className={styles.intakeForm} onSubmit={(event) => event.preventDefault()}><label>{t.discuss.fields.name}<input name="name" required autoComplete="name" placeholder={locale === "en" ? "Your name" : "Tu nombre"}/></label><label>{t.discuss.fields.email}<input name="email" required type="email" autoComplete="email" placeholder="you@company.com"/></label><label>{t.discuss.fields.context}<input name="context" placeholder={locale === "en" ? "Company, organization or project" : "Empresa, organización o proyecto"}/></label><label>{t.discuss.fields.challenge}<textarea name="challenge" required rows={4} placeholder={locale === "en" ? "Describe the challenge, opportunity, product or system." : "Describe el reto, oportunidad, producto o sistema."}/></label><label>{t.discuss.fields.value}<textarea name="value" rows={3} placeholder={locale === "en" ? "Outcome, urgency, constraints or success signals." : "Resultado, urgencia, restricciones o señales de éxito."}/></label><button className={styles.primaryButton} type="submit">{locale === "en" ? "Prepare email" : "Preparar correo"}</button><p className={styles.previewNote}>{disclosure}</p></form></section><section className={styles.darkThesis}><p className={styles.kickerAccent}>{t.discuss.nextKicker}</p><h2>{t.discuss.nextTitle}</h2><p>{t.discuss.nextBody}</p></section></>;
}

export function DenysoftExperience({ locale, page }: { locale: CurrentLocale; page: CurrentPage }) {
  const body = useMemo(() => {
    if (page === "home") return <Home locale={locale}/>;
    if (page === "solutions") return <Solutions locale={locale}/>;
    if (page === "work") return <Work locale={locale}/>;
    if (page === "axom") return <Axom locale={locale}/>;
    if (page === "partners") return <Partners locale={locale}/>;
    if (page === "about") return <About locale={locale}/>;
    return <Discuss locale={locale}/>;
  }, [locale, page]);

  return (
    <main className={styles.root} data-design-authority="denysoft-run001" data-page={page}>
      <a className={styles.skipLink} href="#main-content">{locale === "en" ? "Skip to content" : "Saltar al contenido"}</a>
      <SiteHeader locale={locale} active={page}/>
      <div id="main-content">{body}</div>
      <Footer locale={locale}/>
    </main>
  );
}