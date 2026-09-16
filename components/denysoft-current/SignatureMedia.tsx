import type { CSSProperties } from "react";
import type { CurrentLocale } from "@/lib/denysoft-current-content";
import media from "./signature-media.module.css";

export type EvidenceMediaKind = "axom" | "taller" | "reveal" | "diaspora";

type LocaleProps = { locale: CurrentLocale };

const governanceNodes = [
  ["INTAKE", 90, 118],
  ["SPEC", 250, 88],
  ["ARCH", 410, 138],
  ["BUILD", 570, 92],
  ["EVAL", 710, 158],
  ["EVIDENCE", 565, 292],
  ["HUMAN", 320, 306],
] as const;

function AxomEvidenceMedia() {
  return (
    <div className={`${media.frame} ${media.axomFrame}`} data-signature-media="evidence-axom" role="img" aria-label="Governed AXOM product-manufacturing path from intake through evidence with Human authority">
      <div className={media.frameMeta}><span>SYSTEM PROFILE / ACTIVE</span><span>GOVERNED PATH</span></div>
      <svg className={media.systemSvg} viewBox="0 0 800 400" aria-hidden="true">
        <defs>
          <linearGradient id="axom-line" x1="0" x2="1">
            <stop offset="0" stopColor="#24b8a6" stopOpacity=".26"/>
            <stop offset=".48" stopColor="#315cff" stopOpacity=".9"/>
            <stop offset="1" stopColor="#24b8a6" stopOpacity=".38"/>
          </linearGradient>
          <radialGradient id="axom-halo">
            <stop offset="0" stopColor="#315cff" stopOpacity=".36"/>
            <stop offset="1" stopColor="#315cff" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="320" cy="306" r="118" fill="url(#axom-halo)"/>
        <path d="M90 118 C165 66 204 72 250 88 S356 110 410 138 S516 102 570 92 S672 112 710 158 C716 228 642 270 565 292 C485 330 402 328 320 306 C218 294 140 228 90 118Z" fill="none" stroke="url(#axom-line)" strokeWidth="2"/>
        <path d="M250 88 L320 306 M410 138 L320 306 M570 92 L565 292 M710 158 L565 292 M565 292 L320 306" fill="none" stroke="#8790a0" strokeOpacity=".25" strokeWidth="1" strokeDasharray="5 8"/>
        {governanceNodes.map(([label,x,y]) => (
          <g key={label} transform={`translate(${x} ${y})`}>
            <circle r={label === "HUMAN" ? 13 : label === "EVIDENCE" ? 9 : 7} fill={label === "HUMAN" ? "#315cff" : label === "EVIDENCE" ? "#24b8a6" : "#0d0f12"} stroke={label === "HUMAN" ? "#7892ff" : "#5e6672"} strokeWidth="1.5"/>
            <text x="0" y={label === "HUMAN" ? 34 : 28} textAnchor="middle">{label}</text>
          </g>
        ))}
      </svg>
      <div className={media.frameFooter}><span>AGENTS ADVISE</span><span>FACTORY GOVERNS</span><strong>HUMAN APPROVES</strong></div>
    </div>
  );
}

function TallerEvidenceMedia() {
  const stages = ["INTAKE", "OPERATOR", "SERVICE", "EVIDENCE"];
  return (
    <div className={`${media.frame} ${media.tallerFrame}`} data-signature-media="evidence-taller" role="img" aria-label="Taller Express service-operations route with operator authority and evidence">
      <div className={media.frameMeta}><span>PROJECT STORY / ACTIVE</span><span>SERVICE OPS</span></div>
      <div className={media.serviceCanvas}>
        <div className={media.serviceRoute} aria-hidden="true" />
        {stages.map((stage,index) => (
          <div className={media.serviceStage} key={stage} style={{ "--stage": index } as CSSProperties} data-active={stage === "OPERATOR"}>
            <span>{String(index + 1).padStart(2,"0")}</span><strong>{stage}</strong>
          </div>
        ))}
        <div className={media.contextRail}><span>CONTEXT</span><i/><i/><i/><strong>HUMAN AUTHORITY</strong></div>
      </div>
      <div className={media.frameFooter}><span>REQUEST</span><span>DECISION</span><span>WORKFLOW</span><strong>QA / SECURITY</strong></div>
    </div>
  );
}

function RevealEvidenceMedia() {
  return (
    <div className={`${media.frame} ${media.revealFrame}`} data-signature-media="evidence-reveal" role="img" aria-label="Experimental Reveal Studio image experience composition">
      <div className={media.frameMeta}><span>LAB DEMO / EXPERIMENTAL</span><span>IMAGE EXPERIENCE</span></div>
      <div className={media.revealCanvas}>
        <div className={`${media.revealSheet} ${media.sheetOne}`}><span>INPUT</span><i/></div>
        <div className={`${media.revealSheet} ${media.sheetTwo}`}><span>COMPOSE</span><i/></div>
        <div className={`${media.revealSheet} ${media.sheetThree}`}><span>REVEAL</span><i/></div>
        <div className={media.languagePulse}><span>EN</span><i/><span>ES</span></div>
      </div>
      <div className={media.frameFooter}><span>IMAGE-DRIVEN</span><span>BILINGUAL</span><strong>EXPERIMENTAL</strong></div>
    </div>
  );
}

function DiasporaEvidenceMedia() {
  const nodes = [[18,58],[30,34],[41,55],[53,27],[65,47],[78,30],[84,65],[61,72],[37,76]] as const;
  return (
    <div className={`${media.frame} ${media.geoFrame}`} data-signature-media="evidence-diaspora" role="img" aria-label="Experimental geospatial information visualization field; conceptual visualization, not live data">
      <div className={media.frameMeta}><span>LAB DEMO / EXPERIMENTAL</span><span>GEO / DATA</span></div>
      <div className={media.geoCanvas}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path className={media.geoContour} d="M-6 68 C12 50 19 51 29 39 S49 15 64 28 S84 51 106 37"/>
          <path className={media.geoContourAlt} d="M-2 83 C18 72 22 58 39 63 S61 84 78 69 S93 56 104 62"/>
          <path className={media.geoRoute} d="M18 58 C30 34 36 50 41 55 S50 35 53 27 S61 39 65 47 S73 38 78 30 S78 57 84 65 S67 69 61 72 S47 80 37 76"/>
          {nodes.map(([x,y], index) => <circle key={`${x}-${y}`} cx={x} cy={y} r={index === 4 || index === 6 ? 2.7 : 1.4} className={index === 4 || index === 6 ? media.geoNodeHot : media.geoNode}/>) }
        </svg>
        <div className={media.geoLegend}><span>SYNTHETIC VISUAL</span><i/><span>CLUSTER SIGNAL</span></div>
      </div>
      <div className={media.frameFooter}><span>GEOSPATIAL</span><span>INFORMATION DESIGN</span><strong>NOT LIVE DATA</strong></div>
    </div>
  );
}

export function EvidenceMedia({ kind }: { kind: EvidenceMediaKind | string }) {
  if (kind === "axom") return <AxomEvidenceMedia/>;
  if (kind === "taller") return <TallerEvidenceMedia/>;
  if (kind === "reveal") return <RevealEvidenceMedia/>;
  return <DiasporaEvidenceMedia/>;
}

export function ServiceJourney({ compact = false }: { compact?: boolean }) {
  const labels = ["INTAKE", "REQUEST", "HUMAN", "WORKFLOW", "EVIDENCE"];
  return (
    <div className={`${media.journey} ${compact ? media.journeyCompact : ""}`} data-signature-media="taller-journey" role="img" aria-label="Taller Express evidence journey with Human authority">
      <style>{`@media (min-width:721px){[data-signature-media="taller-journey"] [data-journey-index="0"]{left:4%}[data-signature-media="taller-journey"] [data-journey-index="1"]{left:23.75%}[data-signature-media="taller-journey"] [data-journey-index="2"]{left:43.5%}[data-signature-media="taller-journey"] [data-journey-index="3"]{left:63.25%}[data-signature-media="taller-journey"] [data-journey-index="4"]{left:83%}}`}</style>
      <div className={media.journeyTrack} aria-hidden="true" />
      {labels.map((label,index) => <div key={label} className={media.journeyNode} data-journey-index={index} data-human={label === "HUMAN"} style={{ "--journey": index } as CSSProperties}><span>{String(index+1).padStart(2,"0")}</span><strong>{label}</strong></div>)}
      <p>REQUEST → OPERATOR DECISION → WORKFLOW → QA / SECURITY EVIDENCE</p>
    </div>
  );
}

export function AxomSystemMap({ locale }: LocaleProps) {
  const labels = locale === "en" ? ["INTAKE", "SPEC", "ARCH", "PLAN", "BUILD", "EVAL", "EVIDENCE", "HUMAN"] : ["INTAKE", "SPEC", "ARQ", "PLAN", "BUILD", "EVAL", "EVIDENCIA", "HUMANO"];
  return (
    <div className={media.machine} data-signature-media="axom-system-map" data-qa="machine-room" role="img" aria-label="AXOM governed system map with evidence and Human authority">
      <div className={media.machineGrid} aria-hidden="true"/>
      <div className={media.machineOrbit} aria-hidden="true"/>
      <div className={media.machineNodes}>
        {labels.map((label,index) => <div key={label} style={{ "--node": index } as CSSProperties} data-human={label === "HUMAN" || label === "HUMANO"} data-evidence={label === "EVIDENCE" || label === "EVIDENCIA"}><span>{String(index+1).padStart(2,"0")}</span><strong>{label}</strong></div>)}
      </div>
      <div className={media.machineAuthority}><span>BOUNDARY</span><strong>{locale === "en" ? "HUMAN AUTHORITY" : "AUTORIDAD HUMANA"}</strong><i/></div>
      <p>AGENTS ADVISE · THE FACTORY GOVERNS · HUMAN AUTHORITY REMAINS EXPLICIT</p>
    </div>
  );
}

export function DecisionField({ locale }: LocaleProps) {
  const labels = locale === "en" ? ["PRODUCT", "SYSTEM", "AI", "OPERATIONS"] : ["PRODUCTO", "SISTEMA", "IA", "OPERACIONES"];
  return (
    <div className={media.decisionField} data-signature-media="solutions-decision-field" role="img" aria-label="Decision field showing judgment between product, systems, AI and operations">
      <div className={media.decisionCore}><span>01</span><strong>{locale === "en" ? "JUDGMENT" : "CRITERIO"}</strong><small>{locale === "en" ? "before build" : "antes de construir"}</small></div>
      {labels.map((label,index) => <div className={media.decisionSatellite} key={label} style={{ "--decision": index } as CSSProperties}><span>{String(index+2).padStart(2,"0")}</span><strong>{label}</strong></div>)}
      <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="34"/><circle cx="50" cy="50" r="23"/><path d="M50 10V90M10 50H90"/></svg>
    </div>
  );
}

export function PartnerIntegrationMap({ locale }: LocaleProps) {
  const left = locale === "en" ? "PARTNER CORE" : "NÚCLEO PARTNER";
  const right = locale === "en" ? "CLIENT OUTCOME" : "RESULTADO CLIENTE";
  return (
    <div className={media.partnerMap} data-signature-media="partners-integration-map" role="img" aria-label="Quiet integration model showing Denysoft capability between partner core and client outcome">
      <div className={media.partnerNode}><span>01</span><strong>{left}</strong></div>
      <div className={media.partnerBridge}><small>{locale === "en" ? "QUIET CAPABILITY LAYER" : "CAPA DE CAPACIDAD DISCRETA"}</small><strong>DENYSOFT</strong><i/><i/><i/></div>
      <div className={media.partnerNode}><span>03</span><strong>{right}</strong></div>
    </div>
  );
}

export function FounderEditorial({ locale }: LocaleProps) {
  return (
    <div className={media.founderEditorial} data-signature-media="founder-editorial" role="img" aria-label="Editorial founder accountability identity for Denys Lopez">
      <div className={media.founderIndex}><span>FOUNDER / ACCOUNTABILITY</span><span>DENYS LOPEZ</span></div>
      <div className={media.founderMonogram} aria-hidden="true"><span>D</span><span>L</span></div>
      <div className={media.founderTrace}><i/><i/><i/><i/></div>
      <div className={media.founderNote}><span>{locale === "en" ? "FOUNDER-LED / VISIBLE ACCOUNTABILITY" : "FOUNDER-LED / RESPONSABILIDAD VISIBLE"}</span><strong>{locale === "en" ? "Judgment stays accountable." : "El criterio mantiene responsable visible."}</strong></div>
    </div>
  );
}