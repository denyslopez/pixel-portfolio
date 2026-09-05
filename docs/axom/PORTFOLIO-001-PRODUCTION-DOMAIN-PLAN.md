# PORTFOLIO-001 — Future Production Domain Plan

Status: RECORDED / NO DNS ACTION AUTHORIZED

## Canonical future domain

`denysoft.net`

## Current DNS fact supplied by sponsor

A record currently points to:

`45.55.159.228`

This value is recorded as sponsor-provided and has not been independently changed or reconfigured by PORTFOLIO-001.

## Hosting / DNS principle

The current DNS zone is managed in AWS. The future Production cutover may point `denysoft.net` to Vercel once Edition 001 is approved for Production.

## Required pre-cutover gate

Before any DNS mutation:

1. Verify the current live service responding at `45.55.159.228` and identify rollback requirements.
2. Verify the exact Vercel custom-domain configuration required at the time of cutover.
3. Confirm `www` strategy and canonical redirect behavior.
4. Capture existing DNS records that must remain untouched (mail, SPF, DKIM, DMARC, verification records, subdomains).
5. Prepare rollback to the current A record.
6. Obtain explicit human approval for Production and DNS cutover.
7. Apply DNS change only after Production candidate is verified.
8. Verify HTTPS, canonical host, ENG/ESP routes, contact actions and post-launch runtime.

## Hard limits at R2

- NO DNS changes.
- NO Production deployment.
- NO merge authorization inferred from this document.
