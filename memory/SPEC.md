# NWIS / eRTMAC-NWIS Frontend Spec

## Current product

This frontend is a role-aware drilling intelligence workstation. It has a clearly labelled local demo-auth boundary and two separate application experiences:

- **DRILLING_ENGINEER**: operational intelligence shell with current-well context, map-ready well investigation, nearby/similar wells, events, risk evidence drawer, AI investigation, documents and provenance regions.
- **SYSTEM_ADMIN**: platform-only shell with API transport check, system health, users/roles, access policies, ingestion, database and audit placeholders. Operational drilling intelligence is hidden.

## Confirmed backend contract

The running FastAPI OpenAPI schema currently exposes only:

- `GET /api/` → `{ message: string }`
- `GET /api/status` → `StatusCheck[]`
- `POST /api/status` → `StatusCheck` from `{ client_name: string }`

The NWIS well, event, risk, query, document, health and administration routes from the product brief are not present in the running backend. The frontend does not fabricate their response fields or records; affected panels are explicitly labelled `Future endpoint`.

`frontend/src/api/nwis.ts` is the contract-gated capability registry for those routes. It records method, endpoint and workspace only; it intentionally has no NWIS response interfaces until the backend OpenAPI schema is available. `frontend/src/api/evidence.ts` provides the typed unavailable state consumed by the evidence drawer, ready to be replaced by a mapper when the risk-alert response schema is confirmed.

## Auth and role model

Auth is demo-only and persisted in browser localStorage for preview continuity. The login screen offers Engineer and System Administrator role buttons; no credentials are validated. Frontend permissions are for UX only and are not a backend security boundary. Replace with organizational SSO/JWT before production (`TODO(auth)` in `src/auth/authService.ts`).

## Key flows

1. `/login` → select demo role → enter role workspace.
2. Engineer navigation remains restricted to operational workspace routes; risk categories open an honest evidence drawer with no invented alert content.
3. Admin navigation remains restricted to system workspace routes; the confirmed API check is manually triggered and uses TanStack Query against `/api/` and `/api/status`.
4. Role switcher in the header changes the workspace and clears the role boundary visually.