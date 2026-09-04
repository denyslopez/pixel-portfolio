# PORTFOLIO-001 — Visual Edition 001 R1

Status: AUTHORIZED / IMPLEMENTATION IN PROGRESS

Base checkpoint: `a6fa6115c723ee26cc9a6bce9ad07f70560cbba1`

Working branch: `feature/portfolio-001-edition-001-r1`

## Objective

Apply the approved post-Preview corrective edition without redesigning the portfolio from scratch. Preserve the strong editorial shell while fixing semantic, UX and proof gaps and restoring the intended immersive/creative-technology ambition.

## Authorized scope

### R1-A — Bilingual Semantics & Mobile UX
- Render the correct document language server-side for `/en` and `/es`.
- Preserve localized metadata and route behavior.
- Add a compact mobile navigation surface for Work / Practice / About / Contact.

### R1-B — Signature Typography System
- Replace prototype system stacks with a deliberate three-voice system: editorial display, contemporary grotesk and technical mono.
- Maintain performance, accessibility and bilingual fit.
- Recalibrate hero, practice, case studies and commercial CTA around the new type system.

### R1-C — Immersive Interaction Polish
- Strengthen the visible relationship between kinetic narrative state and the GPU field.
- Preserve restraint: no gratuitous 3D, no gaming/cyberpunk treatment, no essential information dependent on motion.
- Keep reduced-motion fallback.

### R1-D — Proof Architecture
- Strengthen Reveal Studio, Taller Express and Villas de San Luis case studies with additional public-safe evidence and clearer product/design/engineering decisions.
- No fabricated metrics, outcomes or client claims.

### R1-E — Professional Breadth
- Add a compact Selected Client Work archive.
- Add a bounded AI & Product Lab section using public-safe evidence.
- Do not turn secondary work into full case studies in R1.

### R1-F — Production Readiness
- Reconcile Open Graph/social image integration.
- Preserve Preview noindex behavior until Production authorization.
- Expand automated QA to cover server-rendered locale semantics and mobile navigation.
- Run technical QA, interactive visual QA and commercial review as separate gates.

## Explicitly excluded
- Production deployment.
- Merge of PR #1.
- Domain/DNS changes.
- AI Website Concierge implementation.
- CMS/blog/dashboard.
- New backend or database infrastructure.
- Unverified/fabricated metrics.
- Redesigning the site from zero.

## Acceptance gates

### R1-G1 — Implementation
PASS only when all authorized P0/P1 items are implemented on the R1 branch.

### R1-G2 — Technical QA
- dependency install
- TypeScript
- production build
- server-rendered `lang` assertions for EN/ES
- route/i18n checks
- desktop/mobile layout checks
- GPU runtime checks
- reduced-motion checks
- mobile navigation checks
- case-study route/media checks

### R1-G3 — Interactive Visual QA
Human review on a real Preview with motion enabled. Evaluate pacing, typography, shader/kinetic relationship, pointer/scroll behavior, desktop/mobile composition and case-study proof.

### R1-G4 — Commercial QA
Review positioning, ENG/ESP language quality, evidence credibility, CTA/contact paths and portfolio breadth.

### R1-G5 — Edition Closure Decision
Only after G1–G4 PASS may Visual Edition 001 be proposed for closure. Merge and Production remain separate human-authorized actions.

## Governance rule

A green CI run does not constitute creative or commercial approval. Technical QA, Visual/Interaction QA and Commercial QA remain separate gates.
