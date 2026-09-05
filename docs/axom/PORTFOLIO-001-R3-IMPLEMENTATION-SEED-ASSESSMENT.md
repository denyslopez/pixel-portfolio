# PORTFOLIO-001 — R3 Implementation Seed Assessment

Status: `PX-G3 CANDIDATE / HUMAN DECISION REQUIRED`

Project: `PORTFOLIO-001`

Branch assessed: `feature/portfolio-001-edition-001-r3-design`

Exact pre-assessment HEAD: `dbeb953ec50d72e9cf38d46f9e006512d97c61e8`

Exact pre-assessment TREE: `52cf6d875eccf2823c1efdc99312d00468f7c08d`

Visual direction: `CONTROLLED ENERGY`

R2 functional/runtime baseline: `PRESERVE`

Product implementation authority created by this assessment: `NONE`

Production authority: `NONE`

Merge authority: `NONE`

DNS authority: `NONE`

AI Concierge: `DEFERRED`

---

## 1. OPP-017 seed classification

Current implementation seed classification:

`PRODUCTION_CODE_CONNECTED_CANDIDATE`

Reason:

- the branch contains a functioning Next.js/React application rather than a visual-only prototype;
- bilingual routing, case-study routes, metadata, contact surfaces, QA scripts and Vercel preview integration already exist;
- the existing implementation was previously validated as the R2 functional/runtime baseline;
- R3 visual/content decisions were added on top of that runtime without yet implementing the approved R3 visual system.

Running code is treated as evidence of executability only. It is not treated as evidence that the existing visual composition should survive R3.

---

## 2. Candidate PX-G3 decision

Recommended outcome:

`PARTIAL_REUSE_ONLY`

Do NOT choose `REUSE_ALLOWED` for the existing experience as a whole.

Do NOT choose `REBUILD_FROM_CONTRACT` for the entire repository.

The correct boundary is:

> Preserve the proven application/runtime substrate and selected implementation mechanisms; rebuild the user-facing R3 composition from the approved Visual Contract.

---

## 3. Evidence supporting reuse

### 3.1 Framework/runtime substrate — REUSE

Current stack is coherent and already integrated:

- Next.js `16.3.3`;
- React `19.2.7`;
- TypeScript;
- App Router;
- Vercel preview integration;
- static locale generation;
- generated metadata/social surfaces.

No evidence currently justifies framework replacement merely for visual redesign.

### 3.2 Bilingual architecture — REUSE

Preserve:

- `/en` and `/es` first-class routes;
- locale-aware metadata;
- locale switch mechanics;
- localized content boundary;
- locale-preserving project routes.

Content itself requires R3 reconciliation, but the routing architecture should survive.

### 3.3 Case-study routing substrate — REUSE / REFACTOR

Preserve the dynamic route concept:

`/[lang]/work/[slug]`

The current content model must be refactored to support the canonical R3 Selected Work set:

1. Baltica Salon;
2. Taller Express;
3. MasterTax.

No case-study claims may be invented to fill missing content.

### 3.4 Metadata / social / contact infrastructure — REUSE

Preserve the existing infrastructure unless implementation review discovers a defect:

- page metadata;
- Open Graph / Twitter surfaces;
- public contact helpers;
- route semantics;
- not-found behavior.

Copy and positioning may change to match the approved R3 contract.

### 3.5 Accessibility primitives — REUSE / EXPAND

Existing useful controls include:

- visible `:focus-visible` treatment;
- reduced-motion checks in current animated components;
- semantic navigation and headings in major surfaces;
- scroll-margin support.

These are foundations only. R3 still requires full keyboard/focus/contrast/responsive verification after implementation.

### 3.6 GSAP — CONDITIONAL REUSE

GSAP is already present and the existing implementation demonstrates bounded reveal/scroll choreography with reduced-motion bypass.

Decision:

`KEEP AS CANDIDATE MECHANISM, NOT AS DESIGN REQUIREMENT`

Use it only where it is the least-complex mechanism for approved R3 motion. Do not preserve an animation merely because GSAP already implements it.

---

## 4. Evidence requiring rebuild/refactor

### 4.1 Hero composition — REBUILD FROM VISUAL CONTRACT

The current `KineticHero` is a typography-dominant full-width composition with scroll-driven type deformation.

R3 requires:

- cinematic integrated imagery;
- disciplined left-aligned headline composition;
- immediate geographic narrative;
- CTA hierarchy;
- Signal Vermilion emphasis;
- no typography-as-spectacle behavior.

The hero component may reuse small technical patterns, but its composition is not an eligible R3 seed.

### 4.2 Global Three.js immersive field — DO NOT PRESERVE BY DEFAULT

The current `ImmersiveField`:

- runs a continuous `requestAnimationFrame` WebGL shader;
- responds continuously to pointer and scroll;
- is coupled to staged practice-section events;
- uses the retired R2 lime signal color;
- exists as a full-page atmospheric layer.

R3 explicitly prefers cinematic imagery and peripheral/atmospheric motion under hard performance constraints.

Decision:

`RETIRE FROM DEFAULT R3 SURFACE / REINTRODUCE ONLY IF A LATER NARROW EVIDENCE-BASED NEED JUSTIFIES IT`

Three.js must not survive merely because it is technically impressive.

### 4.3 Kinetic Practice sequence — REMOVE FROM R3 HOME ARCHITECTURE

The current Design / Build / AI / Growth scroll sequence is not part of the approved final R3 page architecture.

Its business meaning is better expressed by the approved capability/value rail and About working-model narrative.

Decision:

`DO NOT REUSE AS A HOME SECTION`

### 4.4 Selected Work implementation — REBUILD PRESENTATION

Current implementation is a row/index list with hover preview.

R3 requires the later-board cinematic Selected Work treatment:

- Baltica Salon;
- Taller Express;
- MasterTax;
- integrated cinematic imagery;
- compact metadata;
- restrained rules/borders;
- clear role/business context;
- no generic card soup.

The existing route/link logic may be reused, but the presentation component should be rebuilt.

### 4.5 Current flagship content — REPLACE

Current flagship data still identifies:

- Reveal Studio;
- Taller Express;
- Villas de San Luis.

This conflicts with the approved R3 set.

Decision:

`CONTENT MODEL RECONCILIATION REQUIRED BEFORE VISUAL ACCEPTANCE`

Reveal Studio and Villas de San Luis must not silently remain flagship work.

### 4.6 Client Archive / Lab structure — DO NOT CARRY FORWARD AUTOMATICALLY

The current Home renders both `ClientArchive` and `ProductLab`.

Final R3 architecture defers Lab / Experiments from Edition 001 and does not require a broad client archive in the primary persuasion path.

Decision:

- `ProductLab` as current Lab section: `DEFER / REMOVE FROM R3 HOME`;
- `ClientArchive`: `REMOVE FROM PRIMARY R3 HOME UNLESS LATER COMMERCIAL EVIDENCE JUSTIFIES A COMPACT SECONDARY SURFACE`.

Do not preserve sections merely to avoid deleting code.

### 4.7 Capabilities section — TRANSFORM

The current grouped capability inventory mixes business-readable disciplines with technology labels.

R3 requires the post-hero value rail first:

- Product Strategy;
- Experience Design;
- AI-Enabled Products;
- Frontend Engineering;
- Growth & Conversion.

Detailed stack belongs in secondary evidence, not the primary persuasion path.

### 4.8 Navigation — REBUILD INFORMATION ARCHITECTURE

Current navigation includes Practice and Lab.

R3 candidate navigation is intentionally reduced to:

- Work;
- AXOM;
- About;
- Contact;
- EN / ES;
- commercial CTA when composition permits.

Existing locale-switch mechanics may survive; the information architecture must change.

---

## 5. Dependency assessment

### Next / React / TypeScript

`REUSE`

No replacement justified.

### GSAP

`CONDITIONAL REUSE`

Keep if it remains proportionate and improves fidelity without excessive JS/motion cost.

### Three.js

`REMOVE FROM REQUIRED R3 DEPENDENCY SURFACE`

If no surviving narrowly justified feature requires Three.js after implementation, remove the dependency rather than keeping dead capability.

### Fonts

Current font infrastructure already includes:

- Manrope;
- Newsreader;
- IBM Plex Mono.

This maps closely to the R3 typography direction.

`REUSE / REBALANCE ROLES`

The R3 grotesk becomes primary; serif remains controlled accent; mono remains metadata.

---

## 6. QA / CI assessment

The repository contains useful browser QA, structure QA and visual-contract QA infrastructure.

Preserve the QA concept and rewrite assertions where old R1/R2 composition assumptions conflict with R3.

Important current gap:

The workflow trigger currently enumerates earlier feature/R1/R2 branches and does not explicitly list `feature/portfolio-001-edition-001-r3-design` for push-triggered CI.

Do not claim R3 CI PASS merely from Vercel deployment success.

The current R3 HEAD has a successful Vercel deployment status, which proves the preview deployment completed, not that the new R3 design has been implemented or that the R3 CI suite passed.

---

## 7. Performance assessment

R3 should reduce rather than increase ambient runtime cost.

Primary performance actions for later implementation:

- prefer optimized cinematic still imagery over default hero video where equivalent;
- remove continuous global WebGL when not materially justified;
- avoid preserving scroll animation solely for spectacle;
- prefer transform/opacity motion;
- review remote image strategy and loading behavior;
- measure final JS/client-component surface after the R3 rebuild;
- preserve progressive rendering and reduced-motion behavior.

---

## 8. Security / truthfulness / provenance

Preserve the current public-safe principle.

R3 implementation must not:

- invent metrics;
- invent client outcomes;
- misrepresent generated imagery as delivered interface evidence;
- relabel AXOM products as Denysoft client work;
- imply production status for in-development AXOM products;
- re-enable the deferred AI Concierge.

External project imagery and generated presentation assets require provenance review before Production.

---

## 9. Proposed implementation boundary after PX-G3 approval

If Human chooses `PARTIAL_REUSE_ONLY`, the later Product implementation gate should authorize a bounded R3 rebuild that:

### Preserve

- Next.js / React / TypeScript runtime;
- bilingual route architecture;
- route metadata/social infrastructure;
- contact helpers;
- dynamic work-route substrate;
- useful accessibility primitives;
- QA infrastructure concept;
- GSAP only where specifically justified.

### Rebuild / replace

- Home composition;
- Hero;
- navigation IA/presentation;
- capability rail;
- Selected Work presentation and canonical data;
- Building AXOM section;
- AXOM product-status evidence section;
- About presentation;
- commercial closing section;
- R3 visual tokens and layout system;
- responsive composition;
- visual QA assertions.

### Remove / defer unless separately justified

- global Three.js field;
- Kinetic Practice section;
- Lab / Experiments home section;
- broad client archive from primary Home;
- old R1/R2 visual assumptions;
- technology-logo-first persuasion.

---

## 10. PX-G3 candidate verdict

Recommended Human decision:

`PX-G3 — PARTIAL_REUSE_ONLY`

Meaning:

> Reuse the proven Product/runtime substrate selectively. Rebuild the visible R3 experience from the approved Visual Contract. No existing visual component receives automatic reuse eligibility.

This assessment creates no Product mutation authority.

Next step after explicit Human PX-G3 approval:

`R3 PRODUCT IMPLEMENTATION GATE DESIGN / DESIGN-TO-CODE HANDOFF`

That later gate must bind exact repository/branch, allowed mutation surface, preserved invariants, prohibited scope, executor selection basis, QA evidence and Preview-only boundary before implementation begins.
