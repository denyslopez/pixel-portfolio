# PORTFOLIO-001 / R3.1 validation

Base: `1c5cf437be4b98e264aaf91bb7e5849e34e104ff` (`master`). Branch: `codex/portfolio-001-r3-1-evidence`.

## Local verification — PASS

- Existing dependencies installed without manifest or lockfile changes; npm reported zero vulnerabilities.
- `npm run typecheck`: PASS.
- `npm run build`: PASS; archive pages and 28 bilingual project routes statically generated. No deployment is performed by this command.
- `npm run qa:browser`: PASS (homepage, current cases, structure, visual contract, social metadata, keyboard focus). Existing checks run without weakening assertions.
- `QA_BASE_URL=http://127.0.0.1:3102 node scripts/r3-1-archive-qa.mjs`: PASS after tablet correction, 14 entries x 2 locales x 3 widths (390, 768, 1440). Checks homepage selection preservation, archive discovery, individual routes, locale switching, canonicals/hreflang, image loading, horizontal overflow, return paths, visible keyboard focus and unknown-route 404. Zero page errors.
- Browser screenshots reviewed separately from automated assertions: desktop/tablet archive and mobile entry/Spanish archive. Agent-browser verified rendered archive navigation. Local evidence: `qa/r3-1/local/`, with the existing suite in `qa/browser/`.
- `git diff --check`: PASS. Next-generated config formatting/import changes excluded. No dependencies, homepage copy, selected project data, motion, AXOM or infrastructure changes.
- React review: new content is statically rendered server content; existing locale-switch client component reused. No new client state, effects, animation dependencies or fetching waterfalls. Semantic headings, links, local images with alt text and dimensions, responsive grid and focus outlines.

## Deployment boundary

Only an explicit `--target preview` deployment to Vercel project `prj_hOP8bnVIALI6mY1sxVb75LIz89Iz` in team `denysoft` is authorized. Dry-run inspected source inputs. `.vercelignore` excludes QA artifacts, secrets patterns and generated files. Production, DNS and merge to master remain prohibited.

Preview status and deployed QA will be recorded after deployment; local PASS is not Preview approval.

## Evidence limits

See `r3-1-evidence-inventory.md` for all 15 corpus names and `r3-1-asset-provenance.json` for screenshot sources and hashes. Fourteen projects represented, with three existing cases retained. Dr. Casa remains evidence-insufficient. Reduzca's address currently presents Triple Terapia. Diaspora has a map-provider limitation. Villas external CTA remains withheld. No new full case studies, responsibilities, metrics or commercial outcomes invented.
