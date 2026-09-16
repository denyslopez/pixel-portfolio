# Denysoft Launch Operations + Measurement Foundation — Validation

Candidate HEAD: `c6ac19165649f2ed75471479947d933cab380b25`

## Automated validation

GitHub Actions run `35102297447` completed successfully on the exact candidate HEAD.

Validated steps:

- dependency install
- TypeScript
- production build
- standalone QA build
- Chromium installation
- browser visual QA
- browser QA artifact upload

Artifacts:

- browser QA: `10449036885`
  - digest: `sha256:6125fa06fb674cc7e2d8948f150f0a37ecea8339b45334fd1673e7af2bc10583`
- standalone build: `10448413878`
  - digest: `sha256:beae2b572d53cde7b4e28445e77a3d332f9b8e2ea081282a5ea97513db9f3fa8`

## Vercel Preview

Exact-head Preview deployment:

- deployment: `dpl_DiSZCNVbPxvVWB9ftvVxhJFRqUx9`
- URL: `https://pixel-portfolio-3q7j8h8f6-denysoft.vercel.app`
- target: Preview
- state: READY
- branch alias: `pixel-portfolio-git-feature-denysoft-launch-ope-a42d9f-denysoft.vercel.app`

Verified on Preview:

- measurement foundation marker is present;
- `@vercel/analytics` and `@vercel/speed-insights` are part of the rendered application;
- `/robots.txt` returns 200;
- `/sitemap.xml` returns 200 and contains the principal EN/ES commercial routes plus selected work;
- Vercel Analytics and Speed Insights script endpoints are available;
- Preview remains protected from indexing by Vercel's `x-robots-tag: noindex` header.

## Production baseline

Production was not changed by this run.

At validation time the Vercel project reported no runtime errors in the prior 24 hours.

## Remaining activation boundary

The code foundation does not by itself authorize a paid add-on or any new spend.

Vercel Web Analytics has included usage on supported plans, but usage beyond included allowances can be billable depending on plan. Web Analytics Plus is not required and is not authorized. No paid Google Search Console intermediary is authorized.

Any external dashboard activation that could change billing/spend behavior remains separately gated.
