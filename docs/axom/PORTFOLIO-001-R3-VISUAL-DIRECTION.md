# PORTFOLIO-001 — R3 Visual Direction Synthesis

Status: DESIGN GATE / CANONICAL CANDIDATE
Project: PORTFOLIO-001
Branch: `feature/portfolio-001-edition-001-r3-design`
Authority: AXOM senior creative/product review
Implementation status: NOT AUTHORIZED BY THIS ARTIFACT

## 1. Purpose

R3 corrects a process failure discovered during R1/R2: implementation was allowed to resolve visual direction in code before a sufficiently explicit visual design gate existed.

R3 therefore freezes the creative system before the next implementation pass.

R2 remains the functional engineering baseline. R3 changes the visual layer only where the evidence below justifies it.

## 2. Evidence corpus

Visual and implementation references supplied by the project owner:

- Potu — Creative Agency / Portfolio
- Piku — Creative SaaS / Software
- Davies — Personal Portfolio
- Aigocy — AI Agency / Technology
- Osty — Creative Agency / Portfolio
- Liko — Creative Agency / Portfolio / Next.js
- Axis — Creative Digital Agency / Portfolio
- Casep car-community visual reference
- Axiom-style orange/red editorial reference
- Dynamic particle-wave motion reference
- Licensed asset/codebase access via Envato Elements and other authorized sources
- Original / AI-generated visual capability via ChatGPT, Adobe Firefly, Google Flow and other licensed generation surfaces

The references are evidence of preference and implementation technique. They are not design templates to copy.

## 3. Preference pattern extraction

### 3.1 Recurring preferences

The strongest repeated signals are:

1. **Controlled art direction rather than a named style.** The user is not simply a “dark-theme” or “brutalist” customer. The common denominator is intentional composition.
2. **Near-black / charcoal foundations** with tonal grays and off-white rather than pure black/white everywhere.
3. **A single saturated warm signal color** used with confidence. Multiple supplied codebases converge around orange-red / vermilion values: Potu `#FF6F0F`, Aigocy `#FD3A25`, Liko `#EB5939`, Axis `#FF4001`.
4. **Strong imagery integrated into the system** rather than screenshots floating above a layout. Grading, crop, shadows, masks and background merging matter.
5. **Contemporary sans typography as the rational voice**, with expressive typography used selectively.
6. **Large typography with discipline**, not typography as an autonomous visual stunt.
7. **Asymmetric / modular composition**, strong grids, deliberate whitespace and editorial pacing.
8. **Cinematic or atmospheric motion** that supports content. Motion is most convincing when it behaves like a field, signal, depth or transition rather than a decorative 3D object.
9. **UI details that feel engineered**: metadata, small technical labels, thin rules, modular blocks, precise interaction states.
10. **Variety is acceptable when identity remains coherent.** Light and dark references are both valid; the desired identity is stronger than any single color mode.

### 3.2 Anti-patterns identified from R1/R2

R3 rejects:

- oversized display typography whose lines compete with each other;
- intentionally offset words that look accidentally misplaced;
- full-screen flat fluorescent color fields as a default section treatment;
- ornamental 3D/orbit objects without semantic purpose;
- generic AI purple/blue neon gradients;
- template-like card soup;
- stacked animation libraries or multiple smooth-scroll engines;
- imagery that reads as raw screenshot placement;
- effects that reduce legibility or performance;
- “creative” behavior that requires the user to decode the interface.

## 4. R3 visual thesis

### CONTROLLED ENERGY

**Cinematic restraint × technical signal × editorial precision × contemporary product engineering.**

Denysoft should feel like a mature digital studio that understands visual culture, serious engineering and AI-native product work.

The experience should communicate:

- confidence, not noise;
- advanced technology, not technology theater;
- creativity, not chaos;
- commercial clarity, not portfolio self-indulgence.

## 5. Brand / product architecture implication

The current product remains:

**Flagship immersive one-page Home + multi-page platform architecture.**

The home is the signature experience. The platform must continue to support dedicated routes for Services, Work, Case Studies, Lab, About, Contact and, later, the AI Website Concierge.

R3 must not create a visual system that only works for a single portfolio page.

## 6. Color system

### Core neutrals

- Carbon: `#101010`
- Deep graphite: `#171717`
- Soft graphite: `#2A2A28`
- Warm paper: `#F2F0EA`
- Muted text: `#A6A39D`
- Structural line light: `rgba(242,240,234,.14)`

### Signature signal

Candidate: **Signal Vermilion `#FF4A1C`**

Rationale:

- lies inside the warm orange-red family repeatedly present in supplied references;
- has strong contrast on the near-black foundation;
- communicates energy and contemporary creative technology without defaulting to AI-neon clichés.

Usage rules:

- signal color is a material, not a page background default;
- use for activation, hover, selected states, small fields, image treatment, motion energy, progress and key visual masses;
- on light surfaces it must not be used for small body text without contrast verification;
- large warm-color fields are allowed only when compositionally justified and brief.

The R2 lime is retired as the primary brand signal for R3. It may survive only as historical Edition 001 evidence, not as the R3 signature.

## 7. Typography system

R3 preserves the engineering-safe self-hosted strategy and changes hierarchy rather than accumulating new font runtimes.

### Primary — contemporary grotesk

**Manrope** or an equivalently licensed/self-hostable contemporary grotesk.

Role:

- hero headline;
- navigation;
- major section titles;
- commercial statements;
- interface copy.

### Expressive accent

**Newsreader** or another approved editorial serif.

Role:

- no longer the dominant hero voice;
- selective phrase, quotation, case-study statement or moment of contrast;
- never allowed to destabilize the composition.

### Technical metadata

**IBM Plex Mono**.

Role:

- labels;
- edition information;
- system states;
- project metadata;
- technical coordinates / disciplines.

### Typography rules

- headline hierarchy must be readable before it is expressive;
- intentional overlap is exceptional, not default;
- no clipped glyphs;
- ENG/ESP must be designed independently for line length;
- optical alignment beats mathematical centering;
- mobile is a separate composition, not a scaled desktop.

## 8. Hero direction

The R2 hero composition is not the R3 hero.

The message remains:

**I BUILD INTELLIGENT DIGITAL PRODUCTS.**

But the composition changes.

### Proposed desktop architecture

12-column grid.

- Left / primary 7–8 columns: disciplined grotesk headline, aligned to a common axis.
- Right / supporting 4–5 columns: a living visual aperture using cinematic media / generated imagery / GPU signal field.
- Technical eyebrow remains small and precise.
- Supporting positioning copy sits below the headline, not squeezed into the headline field.
- CTA pair remains immediately visible.
- No free-floating `INTELLIGENT` line.
- No ornamental orbit.

`INTELLIGENT` may receive signal treatment, mask, motion or image interaction, but must remain part of the same compositional system.

### Mobile architecture

- title occupies full available width with conservative line breaks;
- living visual aperture moves below or behind the statement without reducing readability;
- primary CTA remains visible in first interaction range;
- persistent navigation must not cover conversion surfaces.

## 9. Positioning narrative

Geographic narrative is canonically revised while preserving the previously approved full story.

### English

**Based in Canada. Operating from El Salvador and working across the United States and Latin America.**

The broader positioning narrative remains centered on product strategy, design, engineering and AI.

### Spanish

**Basado en Canadá. Operando desde El Salvador y trabajando con mercados en Estados Unidos y Latinoamérica.**

Localization should remain commercially natural rather than mechanically literal.

## 10. Imagery language

R3 expands the visual system beyond typography.

### Evidence imagery

Real product/client evidence remains mandatory for case studies.

Treatment may include:

- cinematic crop;
- monochrome / low saturation;
- controlled contrast;
- background integration;
- mask reveals;
- depth planes;
- responsive reframing;
- editorial captions and metadata.

Generated imagery must never masquerade as evidence of a delivered client/product interface.

### Original / licensed imagery

Authorized sources include original generation, licensed Envato assets, licensed footage, ChatGPT-generated imagery, Adobe Firefly, Google Flow and other explicitly licensed generation tools.

Use these for atmosphere, conceptual visuals, backgrounds, branded compositions and motion layers when they improve the experience.

## 11. Motion language

The supplied particle-wave reference establishes the preferred motion behavior:

**peripheral energy + calm reading zone + intelligent response.**

Preferred vocabulary:

- particle waves;
- flow fields;
- image masks;
- displacement;
- depth / parallax with restraint;
- signal pulses;
- chromatic or light diffusion used sparingly;
- project-media transitions;
- typography responding to state, not constantly performing.

Avoid:

- central decorative 3D sculptures;
- orbit motifs without meaning;
- perpetual high-amplitude motion;
- cursor tricks that obstruct normal use.

## 12. Technology decision

Reference codebases may be mined for patterns but are NOT approved as runtime foundations.

R3 keeps the current product stack lean:

- Next.js
- React
- TypeScript
- GSAP where choreography requires it
- Three.js / WebGL only for perceptible immersive value
- CSS/native browser capabilities where sufficient

Do not import jQuery, Bootstrap, Slick, multiple smooth-scroll engines, AOS/WOW or equivalent template dependency stacks simply because a reference uses them.

Spline, additional 3D runtimes and heavy motion libraries require an explicit performance/value gate before inclusion.

## 13. Performance, accessibility and security laws

Creative ambition does not override AXOM engineering principles.

### Performance targets

- Core Web Vitals remain product acceptance criteria.
- LCP target: < 2.5 s at p75 on production-realistic conditions.
- CLS target: < 0.1.
- INP target: < 200 ms.
- GPU experience must initialize progressively and must not block first meaningful content.
- Hero video/animation requires poster/static fallback and an explicit byte budget.
- Images use responsive AVIF/WebP where suitable.
- Mobile GPU complexity is reduced independently from desktop.

### Accessibility

- `prefers-reduced-motion` provides a fully composed static experience.
- animation cannot contain essential information unavailable statically;
- minimum contrast is verified per usage;
- keyboard and touch navigation remain first-class;
- ENG/ESP semantic rendering remains server-correct.

### Security / privacy

- no unreviewed third-party runtime scripts;
- no asset hotlinking from unknown hosts;
- licensed assets are stored/served under controlled project infrastructure where permitted;
- AI/generated asset provenance and licensing should be retained in project records;
- AI Concierge remains outside Edition 001 and requires its own threat/privacy/grounding design.

## 14. Key-screen design gate

No R3 production implementation starts until the following design surfaces exist and receive Senior Creative Review:

1. **Desktop Home Key Screen** — hero + first transition.
2. **Desktop Work Key Screen** — selected project / image treatment.
3. **Mobile Home Key Screen** — hero + nav + first CTA.
4. **Contact / conversion key treatment**.
5. **Mini visual system** — color, typography, spacing, imagery and motion notes.

The key screens may be built in Figma or another reviewable high-fidelity design surface. They are design evidence, not production code.

## 15. R3 acceptance test

A senior review should be able to answer YES to all of the following:

- Does the first screen feel composed rather than merely animated?
- Can the headline be understood instantly in ENG and ESP?
- Does the imagery feel native to the brand rather than dropped into a template?
- Does the warm signal color feel intentional and ownable?
- Does motion suggest advanced capability without becoming the subject?
- Does the design feel credible for Canada / U.S. / Latin American commercial work?
- Can the system expand from portfolio to official Denysoft platform?
- Could every visible effect be delivered to a paying client without apologizing for performance or accessibility?

If any answer is NO, implementation remains blocked.

## 16. Current gate state

- R2 Functional/Engineering Baseline: PRESERVED
- R3 Reference Intake: CLOSED
- R3 Preference Pattern Extraction: CLOSED
- R3 Visual Direction Synthesis: CLOSED / CANDIDATE
- R3 Key Screens: NEXT
- R3 Senior Creative Review: PENDING
- R3 Implementation: BLOCKED
- Production: BLOCKED
- DNS (`denysoft.net`): NO CHANGE
- AI Website Concierge: DEFERRED
