---
type: project-profile
id: clientdata-profile
project: clientdata
last_updated: 2026-07-04
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors:
  - /home/clientdata/package.json
  - /home/clientdata/next.config.ts
links:
  - type: relates-to
    target: clientdata-agent
  - type: relates-to
    target: clientdata-status
  - type: relates-to
    target: clientdata-structure
  - type: relates-to
    target: clientdata-dependencies
  - type: relates-to
    target: clientdata-commands
---

# Project Profile: clientdata

## Identity
- **Name:** ezzydata
- **Display Name:** EzzyData
- **Description:** Client management & CRM system.
- **Purpose:** Manage client data and CRM workflows.
- **Repository:** Unknown
- **Owner:** Unknown

## Technology
- **Languages:** TypeScript
- **Frameworks:** Next.js 16, React 19
- **Runtime:** Node.js
- **Package Manager:** npm
- **Build System:** Next.js build (webpack)
- **Deployment Targets:** Vercel

## Dependencies
- **Major Libraries:** `drizzle-orm`, `next-themes`, `tailwind-merge`, `@base-ui/react`, `maplibre-gl`
- **External Services:** Neon Database, Cloudflare R2
- **Databases:** Neon (PostgreSQL)
- **Cloud Providers:** Neon, Cloudflare
- **APIs:** Neon API, Cloudflare R2 API

## Development
- **Setup:** `npm install`
- **Install:** `npm install`
- **Build:** `npm run build`
- **Test:** `pnpm test`
- **Lint:** `npm run lint`
- **Typecheck:** `npx tsc --noEmit`
- **Run:** `npx next dev -H localhost`

## Architecture
- **Structure:** Next.js App Router SPA with History API routing
- **Entry Points:** `app/page.tsx`, `app/c/[id]/page.tsx`
- **Important Packages:** `drizzle-orm` for database, `maplibre-gl` for maps

## Documentation
- **Agent Context:** [agent.md](./agent.md)
- **Status:** [status.md](./status.md)

## Quality
- **Tests:** Vitest (16 tests)
- **CI:** Vercel CI
- **Linters:** ESLint

## Status
- **State:** experimental
- **Documentation Completeness:** High
- **Confidence Level:** High

**Source:**
- `/home/clientdata/package.json`
- `/home/OKF/projects/clientdata/agent.md`
