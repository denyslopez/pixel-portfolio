# PORTFOLIO-001 — R3 PX-G3 Implementation Seed Eligibility Decision

**Project:** `PORTFOLIO-001`  
**Branch:** `feature/portfolio-001-edition-001-r3-design`  
**Decision:** `PARTIAL_REUSE_ONLY`  
**Human approval:** `APPROVED`  
**Approval statement:** `APROBADO — PX-G3 PARTIAL_REUSE_ONLY`  
**Product implementation authority created by this record:** `NONE`

## 1. Governing basis

This decision applies the AXOM Product / Web Experience Delivery Standard (`OPP-017`) after the approved R3 visual direction and the project-local Implementation Seed Assessment.

The current seed is a real Next.js/React/TypeScript product implementation and is therefore treated as a production-connected implementation candidate whose reusable portions must be bounded explicitly.

## 2. Decision

`PX-G3 = PARTIAL_REUSE_ONLY`

The existing R2/R3 codebase is **not** eligible for wholesale visual reuse and is **not** to be discarded wholesale.

The governing implementation strategy is:

> Preserve the validated runtime/product substrate. Rebuild the R3-facing experience from the approved Visual Contract. Reuse visual/runtime mechanisms only when they remain the minimum justified implementation and preserve accessibility, performance and fidelity.

## 3. Reusable substrate

Subject to later Product implementation authority, the following are eligible for reuse:

- Next.js 16 / React 19 / TypeScript application substrate;
- bilingual `EN / ES` routing and locale model;
- generated metadata / social metadata infrastructure;
- contact-link infrastructure;
- case-study route substrate;
- existing semantic/accessibility primitives that remain compatible with R3;
- reduced-motion detection patterns;
- existing QA scripts and browser-validation structure where still applicable;
- Vercel-compatible build configuration;
- GSAP as a candidate mechanism when justified by the approved R3 motion contract.

## 4. Must be replaced, refactored or revalidated

- Hero composition and its R2 kinetic assumptions;
- global visual styling and R1/R2 presentation CSS;
- navigation IA and presentation;
- current `SelectedWork` content/model and presentation;
- current `KineticPractice` experience;
- current `ProductLab` role in the primary persuasion path;
- `ClientArchive` placement in the primary Home narrative;
- current capabilities/services presentation;
- current Home content order;
- case-study presentation styling where it conflicts with the R3 Visual Contract;
- typography hierarchy and color tokens to R3 Controlled Energy;
- responsive compositions, especially mobile;
- all visual QA expectations tied to superseded R1/R2 design behavior.

## 5. Explicitly non-binding / no automatic reuse

- the global Three.js/WebGL `ImmersiveField`;
- the R2 lime signal system;
- decorative or continuous motion merely because an existing dependency supports it;
- Lab/Experiments as an Edition 001 primary section;
- any current project ordering or copy that conflicts with the locked R3 Selected Work set;
- any AXOM wording that implies unsupported production/launch status.

Three.js may only return through a later bounded implementation decision if a specific R3 experience requirement demonstrates that GPU rendering is the minimum justified mechanism.

## 6. Locked R3 Selected Work

The flagship Selected Work surface is exactly:

1. `Baltica Salon`
2. `Taller Express`
3. `MasterTax`

No implementation executor may substitute projects or expand this set without reopening the relevant design/content gate.

## 7. Brand / attribution invariant

- Denys/Denysoft attributable work remains distinct from AXOM product evidence.
- `Building AXOM` is a separate strategic section.
- AXOM-related products may appear only with public-safe, factually correct status.
- In-progress AXOM products are evidence of momentum/capability, not Denysoft client trophies.

## 8. Authority boundary

This PX-G3 decision approves only the reuse classification.

It does **not** authorize:

- Product code mutation;
- dependency addition/removal;
- branch creation for implementation;
- provider/coding-agent invocation;
- merge;
- Production deployment;
- DNS changes;
- AI Concierge implementation.

The next required control is a separate Product Implementation Gate consuming the Design-to-Code Handoff.
