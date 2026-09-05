# PORTFOLIO-001 / R3.1 evidence inventory

Date: 2026-09-05. Base: `1c5cf437be4b98e264aaf91bb7e5849e34e104ff` on `master`, verified against origin. Clean starting tree. Branch: `codex/portfolio-001-r3-1-evidence`.

## Sources and limits

- Current `lib/projects.ts`: the three approved cases and their public URLs. Preserve their narratives; no new results or responsibility claims.
- Git `aff5e87:lib/content.ts`: eight historical client entries, categories, URLs, and experiment descriptions. `aff5e87:lib/projects.ts`: earlier Reveal Studio/Villas presentation references. These records establish portfolio attribution, not measured outcomes.
- Vercel read-only project inventory: `reduzca-talla-peso` and `triple-terapia`, linked to matching `denyslopez` GitHub repositories; confirms project identity, not commercial results or a full case-study narrative.
- Local `C:/DEV/Code/CerKa/cerka-web/public/cerka-white-logo.png`, used by its Navbar/Footer: verified branding available. Local source is read-only.
- Public source-site captures are evaluated separately before use; screenshots represent the site as observed on this date, not a claim that its current version is wholly authored by Denys. Runtime assets will be local, with no new hotlinks.
- Initial `33f737c:index.html` and `screenshot.png` belong to a Jacob Lett template, not Denys's work. Excluded.
- Adjacent Denysoft HTML concepts and their testimonials/metrics are reference material, not factual evidence; excluded. Existing `hero-cinematic.svg` is explicitly decorative and excluded as project evidence.

## Corpus disposition (reported before implementation)

| Project | Verified record / URL | R3.1 treatment |
| --- | --- | --- |
| All Star Restoration / ASR Services | R1 archive; https://asrservices.ca | Bounded service-website entry |
| Lost Connection Games | R1 archive; https://lostconnectiongames.com | Bounded educational-game website entry |
| MasterTax | Current case; https://mastertax.ca | Preserve case and homepage selection |
| Rina Group | R1 archive; https://rinagroup.ca | Bounded home-services entry |
| Baltica Salon | Current case; https://balticasalon.ca | Preserve case and homepage selection |
| CerKa Marketing | R1 archive and local source/branding; https://cerkamarketing.com | Bounded bilingual marketing-site entry |
| CanaRoots | R1 archive; http://wordpress-1412553-5987634.cloudwaysapps.com/ | Bounded renovation-site entry; no staging-site exit |
| Seed of Hope Miami | R1 archive; https://seedofhopemiami.org | Bounded nonprofit-site entry |
| Reduzca Talla y Peso | Vercel/GitHub project identity | Bounded website entry; no medical claims |
| Dr. Casa | User-provided corpus name only; no matching source/asset found in inspected repository/history, adjacent source inventory or GitHub repository-name inventory | Evidence-insufficient; report here, no speculative public detail |
| Villas de San Luis | Earlier case; docs/PORTFOLIO-001-G4-CLOSURE.md | Bounded real-estate entry; preserve withheld external CTA due to prior placeholder finding |
| Taller Express | Current case; https://tallerexpress.one | Preserve case and homepage selection |
| Reveal Studio / Virtual Hair Style | Earlier case and R1 Lab; https://virtual-hair-style.vercel.app | Bounded exploration, not restored as flagship/completed commercial work |
| Triple Terapia | Vercel/GitHub project identity | Bounded website entry; no medical claims |
| Diaspora Heat Map | R1 Lab; https://diaspora-heat-map.netlify.app | Bounded geospatial exploration |

## Implementation boundary

Add `/en/work` and `/es/work`, a View all work link after existing Selected Work, and localized bounded entries using the existing `/[lang]/work/[slug]` route. Reuse navigation and language switching. Keep all three Selected Work projects and homepage architecture. New archive content uses only project identity, established category, verified visual material and explicit exploration/archive status. No invented dates, roles, stack, metrics, outcomes, new case-study narratives, R4, motion, AXOM expansion, production, DNS or merge.

## Capture review and implementation findings

- Eight screenshots accepted after browser/image review: ASR, Lost Connection Games, MasterTax, Baltica, Rina, Seed of Hope, CerKa and Reveal Studio. Source URLs, capture date, viewport and SHA-256 are in `r3-1-asset-provenance.json`. Screenshots total less than 1 MB. No generated project visuals.
- Lost Connection capture is limited to the actual homepage header (1440x650), excluding broken third-party video thumbnails below it.
- Reduzca's recorded Vercel address renders Triple Terapia. Keep the original project name and explicitly explain this identity change; no misattributed screenshot or external exit.
- Diaspora returns a real interface but displays map-provider API-key-required tiles. Exclude its screenshot and external exit; disclose the demo limitation.
- Triple Terapia identity is confirmed, but screenshot copy contains treatment/result claims. Keep a bounded text entry without reproducing these claims.
- The existing MasterTax case title overflowed at tablet width (768px) under loaded fonts. R3.1 adds a tablet-only title-size correction; no homepage visual system change.
