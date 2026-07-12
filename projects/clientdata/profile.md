---
type: project-profile
id: clientdata-profile
project: clientdata
last_updated: 2026-07-12
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

# Profile ของโปรเจกต์: clientdata

## Identity (ข้อมูลตัวตน)

- **Name:** ezzydata
- **Display Name:** EzzyData
- **Description:** ระบบจัดการลูกค้าและ CRM
- **Purpose:** จัดการข้อมูลลูกค้าและ workflow ของ CRM
- **Repository:** ไม่ทราบ (Unknown)
- **Owner:** ไม่ทราบ (Unknown)

## Technology (เทคโนโลยี)

- **Languages:** TypeScript
- **Frameworks:** Next.js 16, React 19
- **Runtime:** Node.js
- **Package Manager:** npm
- **Build System:** Next.js build (webpack)
- **Deployment Targets:** Vercel

## Dependencies (การพึ่งพา)

- **Major Libraries:** `drizzle-orm`, `next-themes`, `tailwind-merge`, `@base-ui/react`, `maplibre-gl`
- **External Services:** Neon Database, Cloudflare R2
- **Databases:** Neon (PostgreSQL)
- **Cloud Providers:** Neon, Cloudflare
- **APIs:** Neon API, Cloudflare R2 API

## Development (การพัฒนา)

- **Setup:** `npm install`
- **Install:** `npm install`
- **Build:** `npm run build`
- **Test:** `pnpm test`
- **Lint:** `npm run lint`
- **Typecheck:** `npx tsc --noEmit`
- **Run:** `npx next dev -H localhost`

## Architecture (สถาปัตยกรรม)

- **Structure:** Next.js App Router SPA ใช้ History API routing
- **Entry Points:** `app/page.tsx`, `app/c/[id]/page.tsx`
- **Important Packages:** `drizzle-orm` สำหรับ database, `maplibre-gl` สำหรับ maps

## Documentation (เอกสาร)

- **Agent Context:** [agent.md](./agent.md)
- **Status:** [status.md](./status.md)

## Quality (คุณภาพ)

- **Tests:** Vitest (16 tests)
- **CI:** Vercel CI
- **Linters:** ESLint

## Status (สถานะ)

- **State:** experimental
- **Documentation Completeness:** สูง (High)
- **Confidence Level:** สูง (High)

**Source:**

- `/home/clientdata/package.json`
- `/home/OKF/projects/clientdata/agent.md`
