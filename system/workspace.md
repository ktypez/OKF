---
type: system-doc
id: workspace
last_updated: 2026-07-04
---

# Workspace

## Project Comparison

| Aspect | truck | mcky.space | clientdata | habby | cafe |
|--------|-------|------------|------------|-------|------|
| Framework | React 19 + Vite 8 + TS 6 | Astro 7.0.2 + Alpine.js | Next.js 16 (webpack) | Vite 6 + Express 5 | Next.js 15 (App Router) |
| Database | Supabase (Postgres) | Supabase + .md files | Neon Postgres (Drizzle) | Redis (Upstash) | Supabase (Postgres) |
| Storage | Supabase Storage | Supabase | Cloudflare R2 | None | Cloudflare R2 |
| State | tanstack/react-query v5 | Alpine.js x-data | custom fetch + React state | None | React state |
| Auth | Supabase Auth | SHA-256 header-based | scrypt + HMAC tokens | SHA-256 | jose JWT |
| PWA | ✅ (injectManifest) | ❌ | ✅ (cleanup-only sw) | ✅ (Service Worker) | ✅ (LIFF) |
| Testing | vitest (16 tests) | ❌ | Vitest (16 tests) | ❌ | ❌ |
| Theme | 16 themes, CSS vars | Aura dark terminal | Tailwind + 14 presets | 2 themes | Light (shadcn) |
| CI/CD | GitHub Actions | Vercel | Vercel | Vercel | Vercel |

## Dev Commands by Project

### truck
- `node node_modules/.bin/vite` — dev
- `node node_modules/vite/bin/vite.js build` — build
- `node node_modules/.bin/vitest run` — test (16 tests)
- `node node_modules/.bin/eslint src/` — lint

### mcky.space
- `npm run dev` — dev
- `npm run build` — build (prebuild + astro build)

### clientdata
- `npx next dev -H localhost` — dev (port 3002)
- `npm run build` — build
- `npm run lint` — ESLint
- `npm run db:push` — push Drizzle schema
- `npm run db:migrate` — run migration
- `pnpm test` — Vitest (16 tests)

### habby
- `yarn dev` — dev (Express + Vite)
- `yarn build` — build (Vite)
- `node server.js` — local full-stack (port 3001)

### cafe
- `npx next dev -H localhost` — dev
- `npm run build` — build
- `npm run lint` — ESLint
