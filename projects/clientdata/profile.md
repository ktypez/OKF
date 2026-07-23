---
type: project-profile
id: clientdata-profile
project: clientdata
last_updated: 2026-07-21T00:00:00.000Z
status: archived
stack:
  language: TypeScript
  framework: Next.js 16 + React 19
  ui: Tailwind CSS
  database: Neon (PostgreSQL)
  storage: Supabase Storage
  state: React hooks
  auth: Supabase Auth
  testing: none
  deployment: Vercel
  ci: none
agent_personality: data goblin (archived)
links:
  agent: clientdata-agent
  status: clientdata-status
title: 'Profile ของโปรเจกต์: clientdata'
description: ''
tags:
  - clientdata
  - archived
  - profile
timestamp: Tue Jul 21 2026 00:00:00 GMT+0000 (Coordinated Universal Time)T12:00:00Z
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

- **Major Libraries:** `drizzle-orm` (^0.45.2), `next-themes`, `tailwind-merge`, `@base-ui/react`, `maplibre-gl`
- **External Services:** Neon Database, Cloudflare R2
- **Databases:** Neon (PostgreSQL)
- **Cloud Providers:** Neon, Cloudflare
- **APIs:** Neon API, Cloudflare R2 API
- **Core:** next 16.2.9, react 19.2.7, drizzle-orm ^0.45.2, @neondatabase/serverless ^1.1.0, @aws-sdk/client-s3 ^3.1075.0, tailwindcss ^4.3.1
- **Dev Tools:** drizzle-kit ^0.31.10, tsx ^4.22.4, typescript ^6.0.3, eslint ^9

## Development (การพัฒนา)

- **Setup:** `npm install`
- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Database:** `npm run db:push` (push schema to Neon), `npm run db:migrate` (run Redis-to-Neon migration)
- **Test:** `pnpm test`
- **Lint:** `npm run lint`
- **Typecheck:** `npx tsc --noEmit`

## Architecture (สถาปัตยกรรม)

- **Structure:** Next.js App Router SPA ใช้ History API routing
- **Directory:**
  - `app/`: Next.js App Router (`api/` สำหรับ API routes)
  - `components/`: React components (`ui/` สำหรับ Base UI)
  - `hooks/`: Custom hooks (`useClients`, `useGeolocation`)
  - `lib/`: Core logic (`db/`, `auth.ts`, `storage.ts`)
  - `scripts/`: Maintenance scripts (`migrate-redis-to-neon.ts`)
  - `types/`: TypeScript type definitions
  - `public/`: PWA manifest และ icons
- **Key Files:** `app/page.tsx` (entry), `app/c/[id]/page.tsx` (public client page), `drizzle.config.ts`, `next.config.ts

## Documentation (เอกสาร)

- **Agent Context:** [agent.md](./agent.md)
- **Status:** [status.md](./status.md)

## Quality (คุณภาพ)

- **Tests:** Vitest (16 tests)
- **CI:** Vercel CI
- **Linters:** ESLint

## Status (สถานะ)

- **State:** archived
- **Documentation Completeness:** สูง (High)
- **Confidence Level:** สูง (High)

**Source:**

- `/home/clientdata/package.json`
- `/home/OKF/projects/clientdata/agent.md`

## Cross-links

- [Clientdata Agent](agent.md)
- [Clientdata Status](status.md)
