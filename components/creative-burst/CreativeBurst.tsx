"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./creative-burst.module.css";
import hardening from "./creative-burst-hardening.module.css";

type Locale = "en" | "es";
type WorkItem = { slug: string; title: string; category: string; summary: string; image?: string };
type ArchiveItem = WorkItem & { exploration: boolean };

const copy = {
  en: {
    nav: { work: "Work", capabilities: "Capabilities", navigator: "Navigator", contact: "Contact" },
    heroEyebrow: "STRATEGY × DESIGN × ENGINEERING × GROWTH × AI",
    heroTitleA: "From friction",
    heroTitleB: "to momentum.",
    heroBody: "We find what’s slowing growth down and build the digital systems that move the business forward.",
    heroPrimary: "Find the constraint",
    heroSecondary: "View selected work",
    heroNote: "Canada · USA · El Salvador · EN / ES",
    betterEyebrow: "01 / THE BETTER QUESTION",
    betterTitle: "Not “what should we build?”",
    betterLead: "First: what is actually preventing the business from moving?",
    betterBody: "A website, workflow, AI feature or platform is useful only when it addresses the right constraint. Denysoft starts there—before technology becomes the answer by default.",
    capabilityEyebrow: "02 / CONNECTED CAPABILITIES",
    capabilityTitle: "One problem. Multiple disciplines. One coherent system.",
    capabilities: [
      ["Strategy", "Clarify the constraint, audience, commercial objective and next meaningful move."],
      ["Experience", "Turn complexity into an understandable path people can trust and act on."],
      ["Engineering", "Build fast, resilient interfaces and systems without hiding unnecessary complexity."],
      ["Growth", "Connect positioning, conversion, measurement and iteration to the product itself."],
      ["Applied AI", "Use AI where it improves the system—with evidence, boundaries and human authority."],
    ],
    navigatorEyebrow: "03 / GROWTH NAVIGATOR",
    navigatorTitle: "Start with the symptom. Work toward the constraint.",
    navigatorIntro: "A diagnostic instrument, not a chatbot and not an oracle. Choose the pattern that feels closest to what is happening now.",
    workingHypothesis: "Working hypothesis—not a verdict",
    navigatorCta: "Turn this into a real diagnostic →",
    symptoms: [
      { label: "Traffic exists. Conversion stalls.", signal: "The bottleneck may be offer clarity, trust, proof or friction at the decision point.", move: "Inspect the journey from first impression to commitment before adding more traffic." },
      { label: "Leads arrive incomplete or unclear.", signal: "The constraint may be intake design, information architecture or an undefined handoff.", move: "Design the request path around the information needed to make the next decision well." },
      { label: "Operations depend too much on the owner.", signal: "The bottleneck may be workflow clarity, authority boundaries or missing operational systems.", move: "Model the work before automating it; separate guidance, decisions and authority explicitly." },
      { label: "AI exists, but nobody fully trusts it.", signal: "The constraint may be evidence, evaluation, scope control or unclear human authority.", move: "Define what AI may do, how it is evaluated and where human approval remains mandatory." },
    ],
    workEyebrow: "04 / SELECTED WORK",
    workTitle: "Proof before persuasion.",
    workLead: "Real project surfaces. Real business contexts. No invented outcomes.",
    viewCase: "View case",
    archiveEyebrow: "05 / PORTFOLIO ARCHIVE",
    archiveTitle: "A longer record of shipped work and exploration.",
    archiveNote: "Historical entries remain historical. Explorations remain explorations.",
    noMedia: "TEXT-ONLY EVIDENCE / NO VERIFIED MEDIA",
    productsEyebrow: "06 / PRODUCTS + LABS",
    productsTitle: "Building systems, not just pages.",
    products: [
      ["CARVIS", "Conversational automotive intake designed to guide customers without silently taking operational authority."],
      ["AXOM Client Hub", "A client collaboration surface shaped by real project needs instead of speculative feature expansion."],
      ["Growth Navigator", "A diagnostic product direction for finding the next growth constraint before prescribing a solution."],
    ],
    engageEyebrow: "07 / HOW WE ENGAGE",
    engageTitle: "Move from ambiguity to evidence.",
    process: [
      ["01", "Diagnose", "Understand the business problem, the user, the evidence and the actual constraint."],
      ["02", "Define", "Turn the diagnosis into a bounded product, experience and technical direction."],
      ["03", "Deliver", "Design and build the system with quality, performance, accessibility and security in the loop."],
      ["04", "Evolve", "Use real behavior and evidence to decide what deserves to change next."],
    ],
    marketEyebrow: "08 / MARKET POSITION",
    marketTitle: "North American standards. Salvadoran operating context. Built for businesses that need clarity and execution.",
    marketBody: "Based in Canada. Operating from El Salvador. Working across the United States and Latin America. English-first for North American credibility, with full Spanish support for regional business realities.",
    finalEyebrow: "09 / NEXT MOVE",
    finalTitle: "If growth is stuck, start by finding out why.",
    finalBody: "Bring the messy business problem. Denysoft will help turn it into a clearer system worth building.",
    finalCta: "Start a conversation",
    footer: "Denysoft · Strategy × Design × Engineering × Growth × AI",
  },
  es: {
    nav: { work: "Trabajo", capabilities: "Capacidades", navigator: "Navigator", contact: "Contacto" },
    heroEyebrow: "ESTRATEGIA × DISEÑO × INGENIERÍA × CRECIMIENTO × IA",
    heroTitleA: "De fricción",
    heroTitleB: "a impulso.",
    heroBody: "Encontramos qué está frenando el crecimiento y construimos los sistemas digitales que hacen avanzar el negocio.",
    heroPrimary: "Encontrar la restricción",
    heroSecondary: "Ver trabajo seleccionado",
    heroNote: "Canadá · EE. UU. · El Salvador · EN / ES",
    betterEyebrow: "01 / LA MEJOR PREGUNTA",
    betterTitle: "No “¿qué deberíamos construir?”",
    betterLead: "Primero: ¿qué está impidiendo realmente que el negocio avance?",
    betterBody: "Un website, workflow, función de IA o plataforma solo es útil cuando resuelve la restricción correcta. Denysoft comienza allí—antes de convertir la tecnología en la respuesta por defecto.",
    capabilityEyebrow: "02 / CAPACIDADES CONECTADAS",
    capabilityTitle: "Un problema. Varias disciplinas. Un sistema coherente.",
    capabilities: [
      ["Estrategia", "Aclarar la restricción, la audiencia, el objetivo comercial y el próximo movimiento significativo."],
      ["Experiencia", "Convertir complejidad en un recorrido comprensible en el que las personas puedan confiar y actuar."],
      ["Ingeniería", "Construir interfaces y sistemas rápidos y resilientes sin esconder complejidad innecesaria."],
      ["Crecimiento", "Conectar posicionamiento, conversión, medición e iteración directamente con el producto."],
      ["IA aplicada", "Usar IA donde mejora el sistema—con evidencia, límites y autoridad humana."],
    ],
    navigatorEyebrow: "03 / GROWTH NAVIGATOR",
    navigatorTitle: "Comienza con el síntoma. Trabaja hacia la restricción.",
    navigatorIntro: "Un instrumento de diagnóstico, no un chatbot ni un oráculo. Elige el patrón que más se parece a lo que está ocurriendo ahora.",
    workingHypothesis: "Hipótesis de trabajo—no un veredicto",
    navigatorCta: "Convertir esto en un diagnóstico real →",
    symptoms: [
      { label: "Hay tráfico. La conversión se estanca.", signal: "El cuello de botella puede estar en claridad de oferta, confianza, evidencia o fricción en el punto de decisión.", move: "Revisar el recorrido desde la primera impresión hasta el compromiso antes de agregar más tráfico." },
      { label: "Los leads llegan incompletos o poco claros.", signal: "La restricción puede estar en intake, arquitectura de información o un handoff indefinido.", move: "Diseñar la solicitud alrededor de la información necesaria para tomar bien la siguiente decisión." },
      { label: "La operación depende demasiado del dueño.", signal: "El cuello de botella puede estar en claridad de workflow, límites de autoridad o sistemas operativos faltantes.", move: "Modelar el trabajo antes de automatizarlo; separar explícitamente orientación, decisiones y autoridad." },
      { label: "Existe IA, pero nadie confía completamente en ella.", signal: "La restricción puede ser evidencia, evaluación, control de alcance o autoridad humana poco clara.", move: "Definir qué puede hacer la IA, cómo se evalúa y dónde la aprobación humana sigue siendo obligatoria." },
    ],
    workEyebrow: "04 / TRABAJO SELECCIONADO",
    workTitle: "Evidencia antes que persuasión.",
    workLead: "Superficies reales de proyecto. Contextos de negocio reales. Sin resultados inventados.",
    viewCase: "Ver caso",
    archiveEyebrow: "05 / ARCHIVO DE PORTAFOLIO",
    archiveTitle: "Una trayectoria más amplia de trabajo entregado y exploración.",
    archiveNote: "Los proyectos históricos siguen siendo históricos. Las exploraciones siguen siendo exploraciones.",
    noMedia: "EVIDENCIA SOLO TEXTO / SIN MEDIA VERIFICADA",
    productsEyebrow: "06 / PRODUCTOS + LABS",
    productsTitle: "Construyendo sistemas, no solo páginas.",
    products: [
      ["CARVIS", "Intake automotriz conversacional diseñado para orientar al cliente sin asumir silenciosamente autoridad operativa."],
      ["AXOM Client Hub", "Una superficie de colaboración con clientes guiada por necesidades reales de proyectos, no por expansión especulativa."],
      ["Growth Navigator", "Una dirección de producto diagnóstico para encontrar la siguiente restricción de crecimiento antes de prescribir una solución."],
    ],
    engageEyebrow: "07 / CÓMO TRABAJAMOS",
    engageTitle: "Moverse de ambigüedad a evidencia.",
    process: [
      ["01", "Diagnosticar", "Entender el problema de negocio, el usuario, la evidencia y la restricción real."],
      ["02", "Definir", "Convertir el diagnóstico en una dirección acotada de producto, experiencia y tecnología."],
      ["03", "Entregar", "Diseñar y construir el sistema con calidad, rendimiento, accesibilidad y seguridad dentro del proceso."],
      ["04", "Evolucionar", "Usar comportamiento real y evidencia para decidir qué merece cambiar después."],
    ],
    marketEyebrow: "08 / POSICIÓN DE MERCADO",
    marketTitle: "Estándares norteamericanos. Contexto operativo salvadoreño. Para negocios que necesitan claridad y ejecución.",
    marketBody: "Basado en Canadá. Operando desde El Salvador. Trabajando con Estados Unidos y Latinoamérica. Inglés primero para credibilidad norteamericana, con soporte completo en español para la realidad regional.",
    finalEyebrow: "09 / PRÓXIMO MOVIMIENTO",
    finalTitle: "Si el crecimiento está estancado, comienza descubriendo por qué.",
    finalBody: "Trae el problema de negocio desordenado. Denysoft ayuda a convertirlo en un sistema más claro que valga la pena construir.",
    finalCta: "Iniciar una conversación",
    footer: "Denysoft · Estrategia × Diseño × Ingeniería × Crecimiento × IA",
  },
} as const;

export function CreativeBurst({ locale, selected, archive }: { locale: Locale; selected: WorkItem[]; archive: ArchiveItem[] }) {
  const t = copy[locale];
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [symptomIndex, setSymptomIndex] = useState(0);
  const activeSymptom = t.symptoms[symptomIndex];
  const languageHref = `/${locale === "en" ? "es" : "en"}/creative-burst`;
  const archiveItems = useMemo(() => archive.slice(0, 11), [archive]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!reduced) gsap.from("[data-hero-reveal]", { opacity: 0, y: 36, duration: 1.05, stagger: 0.08, ease: "power3.out" });
    }, root);

    const revealNodes = Array.from(root.querySelectorAll<HTMLElement>("[data-burst-reveal]"));
    let observer: IntersectionObserver | null = null;
    if (!reduced && "IntersectionObserver" in window) {
      revealNodes.forEach((node) => gsap.set(node, { opacity: 0, y: 28 }));
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.14 });
      revealNodes.forEach((node) => observer?.observe(node));
    }

    return () => { observer?.disconnect(); ctx.revert(); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let pointerX = 0;
    let pointerY = 0;
    let visible = true;
    const particles = Array.from({ length: 30 }, (_, index) => ({ seed: index * 0.731 + 0.17, size: 1.2 + (index % 4) * 0.8, speed: 0.00008 + (index % 5) * 0.000018 }));

    const polygon = (points: Array<[number, number]>, fill: string, stroke: string) => {
      context.beginPath();
      context.moveTo(points[0][0], points[0][1]);
      points.slice(1).forEach(([x, y]) => context.lineTo(x, y));
      context.closePath();
      context.fillStyle = fill;
      context.fill();
      context.strokeStyle = stroke;
      context.lineWidth = 1;
      context.stroke();
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const px = pointerX * 10;
      const py = pointerY * 6;
      const seamX = width * 0.69 + px;
      const seamY = height * 0.48 + py;
      const breathe = reduced ? 0 : Math.sin(time * 0.00055) * 5;
      const glow = context.createRadialGradient(seamX, seamY, 8, seamX, seamY, Math.max(width, height) * 0.42);
      glow.addColorStop(0, "rgba(254,81,47,0.38)");
      glow.addColorStop(0.18, "rgba(242,174,92,0.18)");
      glow.addColorStop(0.55, "rgba(244,241,234,0.045)");
      glow.addColorStop(1, "rgba(5,6,5,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      const slabStroke = "rgba(244,241,234,0.09)";
      polygon([[width * 0.48, height * 0.12], [seamX - 84 + breathe, height * 0.08], [seamX - 34, seamY - 18], [width * 0.54, height * 0.58]], "rgba(14,16,14,0.96)", slabStroke);
      polygon([[width * 0.5, height * 0.62], [seamX - 28, seamY + 12], [seamX - 72 - breathe, height * 0.92], [width * 0.44, height * 0.88]], "rgba(9,11,9,0.98)", slabStroke);
      polygon([[seamX + 26, height * 0.17], [width * 0.86, height * 0.24], [width * 0.9, height * 0.52], [seamX + 46, seamY - 16]], "rgba(25,24,21,0.88)", slabStroke);
      polygon([[seamX + 44, seamY + 28], [width * 0.92, height * 0.57], [width * 0.82, height * 0.84], [seamX + 24, height * 0.78]], "rgba(19,20,18,0.92)", slabStroke);
      context.save();
      context.shadowColor = "rgba(254,81,47,0.9)";
      context.shadowBlur = 22;
      context.strokeStyle = "rgba(254,81,47,0.88)";
      context.lineWidth = 2.2;
      context.beginPath();
      context.moveTo(seamX - 42, height * 0.1);
      context.bezierCurveTo(seamX + 8, height * 0.25, seamX - 18, height * 0.39, seamX + 2, seamY);
      context.bezierCurveTo(seamX + 24, height * 0.61, seamX - 10, height * 0.72, seamX + 36, height * 0.9);
      context.stroke();
      context.restore();
      context.strokeStyle = "rgba(244,241,234,0.16)";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(width * 0.52, height * 0.91);
      context.lineTo(width * 0.96, height * 0.91);
      context.stroke();
      particles.forEach((particle, index) => {
        const progress = reduced ? particle.seed % 1 : (particle.seed + time * particle.speed) % 1;
        const x = seamX + width * (0.035 + progress * 0.25);
        const y = seamY + Math.sin(index * 1.73 + progress * 6.28) * height * 0.25;
        const alpha = Math.max(0, 0.55 - progress * 0.42);
        context.save();
        context.translate(x, y);
        context.rotate(index * 0.57 + progress);
        context.fillStyle = index % 5 === 0 ? `rgba(254,81,47,${alpha})` : `rgba(235,228,213,${alpha * 0.72})`;
        context.fillRect(-particle.size, -particle.size * 0.6, particle.size * 2, particle.size * 1.2);
        context.restore();
      });
      if (!reduced && visible) raf = window.requestAnimationFrame(draw);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(performance.now());
    };
    const onPointer = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
      pointerY = (event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;
    };
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !reduced) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
    };

    resize();
    draw(0);
    if (!reduced) raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    root.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      root.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <main className={styles.root} ref={rootRef}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <nav className={styles.nav} aria-label="Primary">
        <a className={styles.brand} href="#top" aria-label="Denysoft home">denysoft<span>.</span></a>
        <div className={styles.navLinks}>
          <a href="#work">{t.nav.work}</a><a href="#capabilities">{t.nav.capabilities}</a><a href="#navigator">{t.nav.navigator}</a><a href="#contact">{t.nav.contact}</a>
        </div>
        <a className={styles.language} href={languageHref}>{locale === "en" ? "ES" : "EN"}</a>
      </nav>

      <section className={styles.hero} id="top" data-qa-section="hero">
        <canvas className={styles.fractureCanvas} ref={canvasRef} aria-hidden="true" />
        <div className={styles.heroGrid} id="main-content">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow} data-hero-reveal>{t.heroEyebrow}</p>
            <h1 className={styles.heroTitle} data-hero-reveal><span>{t.heroTitleA}</span><span className={styles.heroTitleSignal}>{t.heroTitleB}</span></h1>
            <p className={styles.heroBody} data-hero-reveal>{t.heroBody}</p>
            <div className={styles.heroActions} data-hero-reveal><a className={styles.primaryButton} href="#navigator">{t.heroPrimary} <span>↗</span></a><a className={styles.textLink} href="#work">{t.heroSecondary} <span>↓</span></a></div>
          </div>
          <div className={styles.heroSignal} aria-hidden="true"><span className={styles.signalIndex}>01</span><span className={styles.signalRule} /><span>CONSTRAINT</span><span>DIAGNOSIS</span><span>MOVEMENT</span></div>
        </div>
        <div className={styles.heroFooter} data-hero-reveal><span>{t.heroNote}</span><span className={styles.scrollMark}>SCROLL ↓</span></div>
      </section>

      <section className={styles.betterQuestion} data-burst-reveal data-qa-section="better-question"><div><p className={styles.darkEyebrow}>{t.betterEyebrow}</p><h2>{t.betterTitle}</h2></div><div className={styles.betterAnswer}><p className={styles.betterLead}>{t.betterLead}</p><p>{t.betterBody}</p></div></section>

      <section className={styles.capabilities} id="capabilities" data-qa-section="capabilities">
        <div className={styles.sectionIntro} data-burst-reveal><p className={styles.eyebrow}>{t.capabilityEyebrow}</p><h2>{t.capabilityTitle}</h2></div>
        <div className={styles.capabilityList}>{t.capabilities.map(([title, body], index) => <article className={styles.capabilityRow} key={title} data-burst-reveal><span className={styles.rowIndex}>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p><span className={styles.rowArrow} aria-hidden="true">↗</span></article>)}</div>
      </section>

      <section className={styles.navigator} id="navigator" data-qa-section="navigator">
        <div className={styles.navigatorIntro} data-burst-reveal><p className={styles.darkEyebrow}>{t.navigatorEyebrow}</p><h2>{t.navigatorTitle}</h2><p>{t.navigatorIntro}</p></div>
        <div className={styles.navigatorInstrument} data-burst-reveal>
          <div className={styles.symptomList} role="list" aria-label={locale === "en" ? "Growth symptoms" : "Síntomas de crecimiento"}>{t.symptoms.map((symptom, index) => <button className={`${styles.symptomButton} ${index === symptomIndex ? styles.symptomButtonActive : ""}`} type="button" onClick={() => setSymptomIndex(index)} key={symptom.label} aria-pressed={index === symptomIndex}><span>{String(index + 1).padStart(2, "0")}</span>{symptom.label}</button>)}</div>
          <div className={styles.hypothesis} aria-live="polite"><p className={styles.hypothesisLabel}>{t.workingHypothesis}</p><h3>{activeSymptom.signal}</h3><p>{activeSymptom.move}</p><a href="#contact">{t.navigatorCta}</a></div>
        </div>
      </section>

      <section className={styles.selectedWork} id="work" data-qa-section="selected-work">
        <div className={styles.workHeading} data-burst-reveal><p className={styles.eyebrow}>{t.workEyebrow}</p><h2>{t.workTitle}</h2><p>{t.workLead}</p></div>
        <div className={styles.workStack}>{selected.map((item, index) => <article className={styles.workCase} key={item.slug} data-burst-reveal><div className={styles.workMedia}>{item.image ? <img src={item.image} alt="" loading={index === 0 ? "eager" : "lazy"} /> : null}<span className={styles.mediaWash} aria-hidden="true" /><span className={styles.workNumber}>0{index + 1}</span></div><div className={styles.workCopy}><p className={styles.workCategory}>{item.category}</p><h3>{item.title}</h3><p>{item.summary}</p><a href={`/${locale}/work/${item.slug}`}>{t.viewCase} ↗</a></div></article>)}</div>
      </section>

      <section className={styles.archiveSection} data-qa-section="archive">
        <div className={styles.archiveHeading} data-burst-reveal><div><p className={styles.darkEyebrow}>{t.archiveEyebrow}</p><h2>{t.archiveTitle}</h2></div><p>{t.archiveNote}</p></div>
        <div className={styles.archiveGrid}>{archiveItems.map((item, index) => <a className={styles.archiveCard} href={`/${locale}/work/${item.slug}`} key={item.slug} data-burst-reveal><div className={styles.archiveTopline}><span>{String(index + 1).padStart(2, "0")}</span><span>{item.exploration ? "LAB" : "ARCHIVE"}</span></div>{item.image ? <img src={item.image} alt="" loading="lazy" /> : <span className={`${styles.archiveTexture} ${hardening.archiveNoMedia}`}><b>{t.noMedia}</b></span>}<div><p>{item.category}</p><h3>{item.title}</h3></div></a>)}</div>
      </section>

      <section className={styles.products} data-qa-section="products-labs">
        <div className={styles.sectionIntro} data-burst-reveal><p className={styles.eyebrow}>{t.productsEyebrow}</p><h2>{t.productsTitle}</h2></div>
        <div className={styles.productGrid}>{t.products.map(([title, body], index) => <article className={styles.productPanel} key={title} data-burst-reveal><span>LAB / 0{index + 1}</span><h3>{title}</h3><p>{body}</p><div className={`${hardening.productTrace} ${hardening[`trace${index + 1}`]}`} aria-hidden="true"><i /><i /><i /><i /><i /></div></article>)}</div>
      </section>

      <section className={styles.engage} data-qa-section="engage"><div className={styles.engageHeading} data-burst-reveal><p className={styles.eyebrow}>{t.engageEyebrow}</p><h2>{t.engageTitle}</h2></div><div className={styles.processList}>{t.process.map(([number, title, body]) => <article key={number} data-burst-reveal><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>

      <section className={styles.market} data-burst-reveal data-qa-section="market"><p className={styles.darkEyebrow}>{t.marketEyebrow}</p><h2>{t.marketTitle}</h2><p>{t.marketBody}</p><div className={styles.marketLine} aria-hidden="true"><span /><span /><span /></div></section>
      <section className={styles.finalCta} id="contact" data-qa-section="final-cta"><div data-burst-reveal><p>{t.finalEyebrow}</p><h2>{t.finalTitle}</h2></div><div className={styles.finalAction} data-burst-reveal><p>{t.finalBody}</p><a href="mailto:hello@denysoft.net">{t.finalCta} <span>↗</span></a></div></section>
      <footer className={styles.footer}><a className={styles.brand} href="#top">denysoft<span>.</span></a><span>{t.footer}</span><span>ENG / ESP</span></footer>
    </main>
  );
}
