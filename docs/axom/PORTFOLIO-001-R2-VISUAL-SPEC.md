# PORTFOLIO-001 — Visual Edition 001 R2 Visual Correction Spec

Status: APPROVED FOR IMPLEMENTATION
Branch: `feature/portfolio-001-edition-001-r2`
Base: `e4cd5ab488e9ebd237f08fa6421156a375f77b26`

## Purpose

R2 is a bounded visual correction pass. It does not redesign the portfolio or expand product scope. It corrects issues observed in the R1 Preview while preserving the approved Monochrome Kinetic direction.

## Visual goals

1. **Typography must remain monumental without clipping.**
   - No title may collide with another title line.
   - Hero and contact headlines must preserve readable line rhythm in ENG and ESP.
   - Editorial scale is preserved through responsive fitting, not overflow masking.

2. **Signal lime is an accent material, not a flat full-screen paint bucket.**
   - Keep `#c8ff1a` as the Edition 001 signal color.
   - Replace full lime contact background with near-black + controlled lime field / halo / edge accents.
   - Lime may still appear at high intensity in text, interaction and GPU response.

3. **Immersive field must communicate system intelligence, not decorative 3D.**
   - Reduce literal orbital/spiral symbolism.
   - The GPU layer should feel like a signal field / flowing system state.
   - Kinetic stages DESIGN / BUILD / AI / GROWTH continue to modulate the GPU field.
   - No gratuitous 3D object is added.

4. **Commercial clarity remains above spectacle.**
   - CTA remains unmistakable.
   - Navigation and language switch remain legible.
   - Mobile must not inherit desktop-only composition.

## Architecture decision

Edition 001 keeps a flagship one-page home, but the product architecture is considered **multi-page capable**. Current case-study routes are retained. Future Denysoft expansion may add Services, Work, Lab, About, Contact and AI Concierge routes without rebuilding the core.

## R2 acceptance criteria

- ENG desktop hero: no clipping/collision.
- ESP desktop hero: no clipping/collision.
- ENG/ESP mobile hero: no clipping/collision.
- Contact CTA: no flat full-screen lime background; contrast remains WCAG-appropriate.
- GPU/kinetic bridge remains functional.
- Mobile navigation remains visible only on mobile and never covers primary CTA/case-study summary.
- No horizontal document overflow.
- TypeScript, production build, Browser QA and visual-contract QA PASS.
- Preview-only deployment before any merge/Production decision.

## Explicit exclusions

- No Production deployment.
- No DNS changes.
- No PR merge.
- No AI Concierge implementation.
- No new CMS, analytics stack or backend.
- No redesign of information architecture beyond visual correction.
