import Link from "next/link";
import styles from "./creative-burst-work-detail.module.css";

type Locale = "en" | "es";

type Decision = { readonly title: string; readonly body: string };
type SelectedItem = {
  readonly title: string;
  readonly category: string;
  readonly year: string;
  readonly statement: string;
  readonly summary: string;
  readonly challenge: string;
  readonly approach: string;
  readonly flow: readonly string[];
  readonly decisions: readonly Decision[];
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
  readonly liveUrl: string;
  readonly image?: string;
};

type ArchiveItem = {
  readonly title: string;
  readonly category: string;
  readonly summary: string;
  readonly image?: string;
  readonly url?: string;
  readonly exploration?: boolean;
};

const labels = {
  en: {
    nav: { work: "Work", capabilities: "Capabilities", navigator: "Navigator", contact: "Contact" },
    back: "Back to the Denysoft experience",
    selected: "SELECTED WORK / CASE STUDY",
    archive: "PORTFOLIO ARCHIVE / EVIDENCE RECORD",
    challenge: "The constraint",
    approach: "The response",
    flow: "Experience flow",
    decisions: "Key decisions",
    evidence: "What the work demonstrates",
    focus: "Focus / disciplines",
    live: "Visit live project",
    archiveNote: "Historical evidence is presented as a bounded record. No outcomes or project scope are invented beyond the preserved source material.",
    noMedia: "TEXT-ONLY EVIDENCE / NO VERIFIED MEDIA",
    exploration: "Exploration",
    historical: "Historical project",
    next: "Return to Selected Work",
  },
  es: {
    nav: { work: "Trabajo", capabilities: "Capacidades", navigator: "Navigator", contact: "Contacto" },
    back: "Volver a la experiencia Denysoft",
    selected: "TRABAJO SELECCIONADO / CASO",
    archive: "ARCHIVO DE PORTAFOLIO / REGISTRO DE EVIDENCIA",
    challenge: "La restricción",
    approach: "La respuesta",
    flow: "Flujo de experiencia",
    decisions: "Decisiones clave",
    evidence: "Lo que demuestra el trabajo",
    focus: "Enfoque / disciplinas",
    live: "Visitar proyecto en vivo",
    archiveNote: "La evidencia histórica se presenta como un registro acotado. No se inventan resultados ni alcance más allá del material preservado.",
    noMedia: "EVIDENCIA SOLO TEXTO / SIN MEDIA VERIFICADA",
    exploration: "Exploración",
    historical: "Proyecto histórico",
    next: "Volver a Trabajo Seleccionado",
  },
} as const;

export function CreativeBurstWorkDetail({
  locale,
  slug,
  kind,
  item,
}: {
  locale: Locale;
  slug: string;
  kind: "selected" | "archive";
  item: SelectedItem | ArchiveItem;
}) {
  const t = labels[locale];
  const otherLocale = locale === "en" ? "es" : "en";
  const selected = kind === "selected" ? (item as SelectedItem) : null;
  const archive = kind === "archive" ? (item as ArchiveItem) : null;
  const heroImage = selected?.image ?? archive?.image;

  return (
    <main className={styles.root} data-qa-surface="creative-burst-work-detail">
      <nav className={styles.nav} aria-label="Primary">
        <Link className={styles.brand} href={`/${locale}/creative-burst#top`}>denysoft<span>.</span></Link>
        <div className={styles.navLinks}>
          <Link href={`/${locale}/creative-burst#work`}>{t.nav.work}</Link>
          <Link href={`/${locale}/creative-burst#capabilities`}>{t.nav.capabilities}</Link>
          <Link href={`/${locale}/creative-burst#navigator`}>{t.nav.navigator}</Link>
          <Link href={`/${locale}/creative-burst#contact`}>{t.nav.contact}</Link>
        </div>
        <span className="locale-switch" style={{ justifySelf: "end" }}><Link className={styles.language} href={`/${otherLocale}/work/${slug}`}>{otherLocale.toUpperCase()}</Link></span>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <Link className={styles.back} href={`/${locale}/creative-burst#work`}>← {t.back}</Link>
          <p className={styles.eyebrow}>{kind === "selected" ? t.selected : t.archive}</p>
          <p className={styles.meta}>{item.category}{selected ? ` · ${selected.year}` : ` · ${archive?.exploration ? t.exploration : t.historical}`}</p>
          <h1>{item.title}</h1>
          {selected ? <p className={styles.statement}>{selected.statement}</p> : null}
          <p className={styles.summary}>{item.summary}</p>
        </div>
        <div className={styles.heroIndex} aria-hidden="true">
          <span>DENYSOFT / EVIDENCE</span>
          <strong>{kind === "selected" ? "CASE" : archive?.exploration ? "LAB" : "ARCHIVE"}</strong>
        </div>
      </header>

      <section className={`${styles.mediaStage} case-media`} aria-label={`${item.title} evidence`}>
        {heroImage ? (
          <div className={styles.mediaFrame}>
            <img src={heroImage} alt="" />
            <span className={styles.mediaLabel}>AUTHENTIC / PRESERVED PROJECT MEDIA</span>
          </div>
        ) : (
          <div className={styles.noMedia}>
            <span>{t.noMedia}</span>
            <strong>{item.title}</strong>
            <p>{t.archiveNote}</p>
          </div>
        )}
      </section>

      {selected ? (
        <>
          <section className={styles.splitSection}>
            <article>
              <p className={styles.sectionLabel}>01 / {t.challenge}</p>
              <p className={styles.largeBody}>{selected.challenge}</p>
            </article>
            <article>
              <p className={styles.sectionLabel}>02 / {t.approach}</p>
              <p className={styles.largeBody}>{selected.approach}</p>
            </article>
          </section>

          <section className={styles.flowSection}>
            <p className={styles.sectionLabel}>03 / {t.flow}</p>
            <ol className="case-flow">
              {selected.flow.map((step, index) => (
                <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>
              ))}
            </ol>
          </section>

          <section className={styles.decisionSection}>
            <p className={styles.sectionLabel}>04 / {t.decisions}</p>
            <div className={`${styles.decisionGrid} case-decision-grid`}>
              {selected.decisions.map((decision, index) => (
                <article key={decision.title}>
                  <span>D{String(index + 1).padStart(2, "0")}</span>
                  <h2>{decision.title}</h2>
                  <p>{decision.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.evidenceSection}>
            <div>
              <p className={styles.sectionLabel}>05 / {t.evidence}</p>
              <ul>{selected.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            </div>
            <div>
              <p className={styles.sectionLabel}>06 / {t.focus}</p>
              <ul>{selected.stack.map((focus) => <li key={focus}>{focus}</li>)}</ul>
            </div>
          </section>

          <section className={styles.liveSection}>
            <p>{selected.statement}</p>
            <a href={selected.liveUrl} target="_blank" rel="noreferrer">{t.live} ↗</a>
          </section>
        </>
      ) : (
        <section className={styles.archiveBody}>
          <div>
            <p className={styles.sectionLabel}>01 / EVIDENCE BOUNDARY</p>
            <p className={styles.largeBody}>{t.archiveNote}</p>
          </div>
          {archive?.url ? <a className={styles.archiveLive} href={archive.url} target="_blank" rel="noreferrer">{t.live} ↗</a> : null}
        </section>
      )}

      <footer className={styles.footer}>
        <Link href={`/${locale}/creative-burst#work`}>← {t.next}</Link>
        <span>DENYSOFT · STRATEGY × DESIGN × ENGINEERING × GROWTH × AI</span>
      </footer>
    </main>
  );
}
