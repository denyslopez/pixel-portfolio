# PORTFOLIO-001 — AI Website Concierge

Status: BACKLOG / POST-PREVIEW

## Product intent

Replace the temporary dependence on static contact channels with a bilingual AI-native website concierge that demonstrates the same product and agentic capabilities the portfolio sells.

The concierge is not part of the initial G4 client-ready gate or first G5 Preview deployment.

## Target behavior

The concierge should:

- operate in English and Spanish;
- answer questions about Denys Lopez, capabilities, selected work, Denysoft and public-safe AXOM context;
- explain relevant case studies and help a visitor understand which capability fits their problem;
- ask bounded qualification questions when useful;
- preserve a concise conversation context during the visit;
- offer handoff to `info@denysoft.net` or the temporary WhatsApp channel when a human conversation is appropriate;
- clearly disclose that it is an AI assistant;
- fail closed when requested information is not supported by the approved portfolio knowledge base.

## Guardrails

The concierge must not:

- invent client results, metrics, permissions or project claims;
- expose non-public AXOM/client information;
- autonomously send outreach or messages without explicit user action;
- imply that a human has reviewed a conversation when they have not;
- become a generic decorative chatbot disconnected from the portfolio experience.

## Experience principle

The concierge should feel like a native part of Visual Edition 001, not a third-party widget pasted onto the site.

Potential interaction model:

`portfolio context → visitor intent → bounded AI conversation → relevant proof/case study → qualified handoff`

## Architecture direction

Prefer a provider-agnostic, server-side AI integration with:

- curated portfolio knowledge/context;
- structured outputs for intent and handoff state;
- rate limits and abuse controls;
- ephemeral server-side secrets;
- observable failures;
- explicit fallback to email/WhatsApp;
- progressive enhancement so the portfolio remains fully usable if AI is unavailable.

Detailed provider/model selection, persistence, analytics and production authority are intentionally deferred until after the first Preview is reviewed.
