# Denysoft Launch Operations + Measurement Foundation — Run 001

## Authority

Human-approved run:

`APROBADO — DENYSOFT LAUNCH OPERATIONS + MEASUREMENT FOUNDATION RUN 001`

Base production checkpoint at run entry:

`0de30a72d182cf7197d9aea99b3b5bdba95bd0a4`

Implementation branch:

`feature/denysoft-launch-operations-measurement-run001`

This run is Preview-first. Merge to `master` is not authorized by the run approval because `master` is connected to Vercel Production.

## Constraints

- Preserve the approved Denysoft visual authority.
- No redesign.
- No fabricated analytics, traffic, conversion or evidence claims.
- No new paid plugin or intermediary analytics/search product.
- No visitor form-field values may be sent to analytics.
- Measurement failure must never block the user journey.

## Commercial intake operations

The existing governed email handoff remains the commercial intake mechanism for this run.

The destination is the operational Denysoft role inbox:

`info@denysoft.net`

Incoming delivery to this address was verified before implementation. The site still does not claim that an email has been sent until the visitor explicitly sends it from their own mail application.

## Measurement foundation

Native Vercel measurement packages are pinned to exact versions:

- `@vercel/analytics@2.0.1`
- `@vercel/speed-insights@2.0.0`

The application mounts both at the localized root layout.

Commercial custom events are intentionally minimal:

- `commercial_cta_click`
  - `locale`
  - `source_path`
- `commercial_email_prepare`
  - `locale`
  - `source_path`

No name, email address, company/context text, challenge text or value text is included in analytics event data.

Page views provide the rest of the funnel:

`visit -> work/solutions -> discuss -> commercial_email_prepare`

## SEO discovery foundation

The run adds:

- `/robots.txt`
- `/sitemap.xml`

The sitemap focuses on the principal EN/ES commercial routes and the three selected-work stories. Historical archive entries remain reachable through the experience but are not promoted through the launch sitemap.

## Evidence / credibility

No new project metrics or outcome claims are introduced. Existing evidence labeling remains binding. Founder photography remains a separate asset task and is not fabricated in this run.

## Cost policy

GSC Wizard was explicitly rejected because the Human does not want a paid intermediary for Google Search Console data.

Google Search Console remains a direct/optional integration track. Native Vercel Web Analytics and Speed Insights are the selected measurement foundation; no third-party paid analytics plugin is introduced.

## Release gate

Before any merge:

1. TypeScript must pass.
2. Production build must pass.
3. Existing EN/ES browser QA must remain green.
4. Spanish visual-fit guards must remain green.
5. Commercial intake must target `info@denysoft.net`.
6. `robots.txt` and `sitemap.xml` must be generated and validated.
7. Measurement marker and commercial event instrumentation must be present.
8. Vercel Preview must be READY on the exact candidate HEAD.
9. Human must explicitly authorize merge of that exact HEAD.
