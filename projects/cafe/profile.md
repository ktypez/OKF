---
type: project-profile
id: cafe-profile
last_updated: 2026-07-04
---

# Project Profile: cafe

## Identity
- **Name:** cafe
- **Display Name:** Cafe
- **Description:** Cafe LIFF ordering & management platform.
- **Purpose:** Coffee shop ordering via LINE LIFF and admin dashboard.
- **Repository:** Unknown
- **Owner:** Unknown

## Technology
- **Languages:** TypeScript, JavaScript
- **Frameworks:** Next.js 15, React 19
- **Runtime:** Node.js
- **Package Manager:** npm
- **Build System:** Next.js build
- **Deployment Targets:** Vercel, LINE LIFF

## Dependencies
- **Major Libraries:** `@line/liff`, `@supabase/supabase-js`, `motion`, `lucide-react`, `tailwindcss`, `jose`, `playwright`
- **External Services:** Supabase, LINE Platform, Cloudflare R2
- **Databases:** Supabase (PostgreSQL)
- **Cloud Providers:** Cloudflare (R2)
- **APIs:** LINE Messaging API, Supabase API

## Development
- **Setup:** `npm install`
- **Install:** `npm install`
- **Build:** `npm run build`
- **Test:** Not configured
- **Lint:** `npm run lint`
- **Typecheck:** `npx tsc --noEmit`
- **Run:** `npx next dev -H localhost`

## Architecture
- **Structure:** Next.js App Router with admin SPA + LIFF customer flow
- **Entry Points:** `app/page.tsx` (admin), `app/liff/page.tsx` (customer)
- **Important Packages:** `@line/liff` for LINE integration, `@supabase/supabase-js` for database, `playwright` for receipt images

## Documentation
- **Agent Context:** [agent.md](./agent.md)
- **Status:** [status.md](./status.md)

## Quality
- **Tests:** Not configured
- **CI:** Vercel CI
- **Linters:** ESLint

## Status
- **State:** active
- **Documentation Completeness:** High
- **Confidence Level:** High

**Source:**
- `/home/cafe/package.json`
- `/home/OKF/projects/cafe/agent.md`
