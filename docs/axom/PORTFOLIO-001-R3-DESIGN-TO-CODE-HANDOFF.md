# PORTFOLIO-001 — R3 Governed Design-to-Code Handoff

**Project:** `PORTFOLIO-001`  
**Work package:** `R3-IMPLEMENTATION`  
**Status:** `READY_FOR_PRODUCT_GATE`  
**Current documentary branch:** `feature/portfolio-001-edition-001-r3-design`  
**Product mutation authority:** `ABSENT — STOP UNTIL SEPARATE HUMAN PRODUCT GATE`

## 1. Binding design context

The implementation must consume the current R3 design evidence as a governed set, not as loose inspiration.

Binding project-local references:

- `docs/axom/PORTFOLIO-001-R3-VISUAL-DIRECTION.md`
- `docs/axom/PORTFOLIO-001-R3-CONTENT-ATTRIBUTION.md`
- `docs/axom/PORTFOLIO-001-R3-KEY-SCREEN-SPEC.md`
- `docs/axom/PORTFOLIO-001-R3-KEY-SCREEN-DECISION.md`
- approved R3 Primary Visual Reference / first R3 composition board, with only the adopted Selected Work treatment from the later board
- the approved R3 Visual Contract from the Senior Creative Review / PX-G2 decision

Governing visual thesis:

`CONTROLLED ENERGY`

Cinematic restraint × technical signal × editorial precision × contemporary product engineering.

Locked hero statement:

`I BUILD INTELLIGENT DIGITAL PRODUCTS.`

Locked geographic narrative:

`Based in Canada. Operating from El Salvador and working across the United States and Latin America.`

Locked flagship Selected Work:

1. Baltica Salon
2. Taller Express
3. MasterTax

## 2. Implementation seed

- Seed present: `YES`
- Seed classification: `PRODUCTION_CODE_CONNECTED_CANDIDATE`
- Seed source: existing Next.js/React/TypeScript Edition 001 runtime
- Implementation Seed Assessment: `docs/axom/PORTFOLIO-001-R3-IMPLEMENTATION-SEED-ASSESSMENT.md`
- PX-G3 outcome: `PARTIAL_REUSE_ONLY`
- Human PX-G3 approval: `docs/axom/PORTFOLIO-001-R3-PX-G3-DECISION.md`

## 3. Reuse boundary

### May be reused if Product authority later permits

- Next.js 16 / React 19 / TypeScript runtime and App Router substrate;
- `EN / ES` route structure and locale-switching mechanics;
- metadata / Open Graph / social metadata infrastructure;
- contact-link infrastructure;
- case-study routing substrate;
- accessibility/focus primitives that remain valid;
- reduced-motion patterns;
- browser QA / structural QA concepts that can be updated to R3 expectations;
- Vercel-compatible build behavior;
- GSAP where it remains the minimum justified mechanism for approved motion.

### Must be replaced / refactored / hardened

- Home composition and section order;
- Hero visual implementation;
- navigation IA/presentation;
- capability/value rail;
- Selected Work content and cinematic presentation;
- Building AXOM section;
- AXOM product-evidence/status presentation;
- About / working-model narrative;
- final commercial CTA surface;
- R1/R2 visual CSS and any superseded visual-contract QA;
- responsive compositions, especially mobile;
- case-study visual presentation as required to align with R3;
- content data that conflicts with locked R3 attribution and project selection.

### Explicitly prohibited from automatic reuse

- global Three.js/WebGL `ImmersiveField`;
- R2 lime as brand signal;
- `KineticPractice` as governing R3 experience;
- Lab/Experiments as a primary Edition 001 section;
- any R1/R2 project ordering that displaces Baltica Salon / Taller Express / MasterTax;
- any generated imagery presented as delivered-client evidence;
- any AXOM status claim not supported by current public-safe evidence.

## 4. Proposed Product implementation authority

**This section is a candidate for the next Human gate. It is not yet authority.**

- Product repository: `denyslopez/pixel-portfolio`
- Proposed implementation branch: `feature/portfolio-001-edition-001-r3-implementation`
- Proposed branch point: exact current R3 design branch HEAD at the moment of Human implementation approval
- Authority scope: R3 visual/content reconstruction only, preserving the validated runtime baseline
- Merge authority: `NONE`
- Production deployment authority: `NONE`
- DNS authority: `NONE`
- AI Concierge authority: `NONE`

### Proposed authorized scope

1. Reconstruct Home to the approved R3 composition.
2. Preserve functional bilingual/runtime behavior.
3. Implement locked navigation, hero, capability rail and Selected Work.
4. Implement separate Building AXOM and public-safe AXOM product evidence with explicit statuses.
5. Implement About/working-model and commercial close.
6. Reconcile case-study presentation only where required by R3 visual continuity.
7. Update R3-specific responsive/accessibility/motion behavior.
8. Update QA scripts/workflow expectations so the implementation branch is actually validated.
9. Remove obsolete visual code/dependencies only when rendered unused by the approved reconstruction and verification proves no regression.

### Proposed explicit non-goals

- no Production deployment;
- no merge to `master` or the Edition 001 candidate branch;
- no DNS change;
- no AI Concierge;
- no new backend/auth/database capability;
- no new analytics/tracking without separate approval;
- no new third-party runtime dependency unless a specific implementation obstacle demonstrates need and AXOM separately approves it;
- no scope expansion into Services, Blog, Lab or additional flagship projects;
- no fabricated claims, metrics, testimonials or product states.

## 5. Technical constraints already established

- Framework/runtime: Next.js 16.3.3, React 19.2.7, TypeScript 5.9 line.
- Existing animation dependency: GSAP 3.15.0.
- Existing GPU dependency: Three.js 0.185.1; reuse is **not** approved by PX-G3 and requires explicit justification if retained.
- Accessibility: keyboard/focus and `prefers-reduced-motion` remain hard constraints.
- Localization: ENG/ESP are first-class routes and must remain equivalent experiences.
- Deployment target: Vercel-compatible, but only Preview may be considered after later implementation/QA gates.
- Security/truthfulness: no secrets, fabricated evidence or unsupported claims in client code/content.

## 6. Implementation behavior required

| Requirement | Governing intent | Verification |
|---|---|---|
| Hero matches R3 visual identity | first R3 board + R3 key-screen spec | desktop/mobile visual comparison |
| Flagship work is exactly Baltica/Taller Express/MasterTax | PX-G2/PX-G3 + key-screen decision | content/route assertions + visual QA |
| Capability rail uses business-readable value language | R3 Senior Creative Review | content + responsive QA |
| AXOM remains separate from Denysoft client work | content-attribution artifact | content review + status assertions |
| ENG/ESP remain complete | bilingual contract | route/content QA |
| Reduced motion preserves comprehension | accessibility contract | browser reduced-motion run |
| Motion remains peripheral and performant | Controlled Energy | browser/performance review |
| No unauthorized section/scope expansion | Product gate | diff review |
| Case studies preserve factual evidence | truthfulness invariant | content/evidence review |

## 7. Required visual verification

- desktop Home against Primary Visual Reference;
- dedicated mobile composition, not scaled desktop;
- EN and ES hero line-length/fold behavior;
- Selected Work imagery/copy/focus states;
- AXOM separation and explicit status labels;
- keyboard/focus operation;
- reduced-motion behavior;
- overflow/media behavior at representative breakpoints;
- case-study continuity;
- no visual regression caused by removed R1/R2 mechanisms;
- no unauthorized technology-logo strip under hero;
- no full-screen fluorescent fields or decorative orbit treatment;
- no raw screenshot/card-soup regression.

## 8. Evidence outputs expected

- exact implementation branch and starting SHA;
- implementation commits/diff;
- typecheck result;
- production build result;
- browser QA evidence;
- desktop/mobile EN/ES screenshots;
- reduced-motion evidence;
- implementation adaptation/defect classification;
- later `PX-G4` decision;
- Preview deployment reference only if separately authorized after implementation QA.

## 9. Executor selection recommendation

### Primary recommendation: Claude Code

Current task-fit favors Claude Code for the first implementation pass because R3 is a repository-aware, multi-file frontend refactor that must preserve working runtime behavior while restructuring composition, content and styling. This matches AXOM's current canonical role for Claude Code: codebase exploration, refactoring, structured implementation and precise multi-file edits.

### Secondary bounded use: Codex

Codex is well suited for later narrow fixes, test/QA updates or explicitly scoped implementation slices after the main restructuring is coherent.

### ChatGPT / AXOM role

ChatGPT remains the governing/orchestration/review surface: scope, constraints, evidence review, visual reconciliation and gate decisions. It should not become the preferred implementation executor merely because it can edit GitHub.

### Antigravity / other executors

No automatic preference is granted. They may replace the recommended executor if a fresh task-fit/evidence check demonstrates stronger capability while preserving the same authority/evidence envelope.

Tool selection is replaceable. The Visual Contract, Product authority and evidence requirements are not.

## 10. Stop conditions for the implementation executor

STOP and return to AXOM if any of the following occurs:

- design requirement is ambiguous in a way that materially affects composition;
- a new dependency appears necessary;
- implementation would require changing Product architecture beyond the approved visual/content reconstruction;
- a factual client/AXOM status cannot be verified;
- the approved board cannot be reproduced without a material design change;
- accessibility/performance requires a material visual tradeoff;
- a proposed change touches Production, DNS, merge authority or AI Concierge;
- the implementation branch/baseline differs from the exact Human-approved gate binding.

## 11. Authority invariant

This handoff is documentary only until a separate Human Product Implementation Gate explicitly authorizes mutation.

`VISUAL APPROVAL != PRODUCT IMPLEMENTATION AUTHORITY`

`PX-G3 PARTIAL_REUSE_ONLY != PERMISSION TO CODE`
