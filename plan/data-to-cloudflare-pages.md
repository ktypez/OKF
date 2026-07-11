---
id: plan-data-to-cloudflare-pages
version: 2
status: completed
created: 2026-07-10
updated: 2026-07-10
---

# Plan: Migrate Data Project to Cloudflare Pages

## Goal
ย้าย data project (CRM client management) จาก Vercel (Next.js 16) ไป Cloudflare Pages — ใช้ Vite SPA + Pages Functions, DB คงเป็น Neon HTTP (ไม่เปลี่ยน), ไม่มี PWA

## Architecture
```
data.mcky.space
├── /app/*            — Vite SPA (React 19 + React Router)
├── /api/*            — Cloudflare Pages Functions (Neon, Auth, R2)
└── /assets/*         — Static assets
```

- DB: Neon (คงเดิม) ผ่าน `@neondatabase/serverless` HTTP + `drizzle-orm/neon-http`
- API: Cloudflare Pages Functions (Workers)
- Auth: `crypto.scryptSync` → Web Crypto API (`crypto.subtle.pbkdf2`)
- Storage: AWS SDK S3 → Workers R2 binding
- No PWA component

## Schema — ไม่เปลี่ยนแปลง
| Table | Action |
|-------|--------|
| `clients` | คงเดิม — `pgTable`, `jsonb`, `bigint`, `real` |
| `suggestions` | คงเดิม |
| `settings` | คงเดิม |

## Phase 1 — Scaffold Vite + React + TS Project

- [ ] สร้าง Vite project ด้วย `npm create vite@latest`
- [ ] ติดตั้ง dependencies: React Router, Tailwind CSS, shadcn/ui
- [ ] ตั้งค่า `wrangler.toml` สำหรับ Cloudflare Pages
- [ ] คัดลอก `tsconfig.json` + ปรับ paths
- [ ] ตั้งค่า `vite.config.ts`

## Phase 2 — Port Client-Side Layer (copy + path tweaks)

- [ ] Components (ทั้งหมด 41 ไฟล์, ไม่รวม ui/)
  - `next/image` → `<img>` (AppImage.tsx)
  - `next/link` → React Router `<Link>`
  - `useRouter` → `useNavigate()`
- [ ] Hooks (6 ไฟล์) — copy as-is
- [ ] Stores (5 Zustand) — copy as-is
- [ ] Types (2 ไฟล์) — copy as-is
- [ ] Design tokens (`lib/design/`) — copy as-is
- [ ] Client libs (`lib/utils.ts`, `lib/storage.ts`, `lib/compressImage.ts`, `lib/offline-db.ts`) — copy as-is
- [ ] Pages: port `app/page-client.tsx` → `src/pages/Clients.tsx`
- [ ] Pages: port `app/c/[id]/client-page.tsx` → `src/pages/ClientDetail.tsx`
- [ ] `app/layout.tsx` → port to `src/App.tsx` + `src/main.tsx`
- [ ] `app/providers.tsx` — port, remove `next-themes`
- [ ] `app/globals.css` — copy as-is

## Phase 3 — Rewrite Server Layer

- [ ] `lib/auth.ts` — rewrite `crypto.scryptSync`/`createHmac`/`fs` → Web Crypto API (PBKDF2 + HMAC) + KV for local fallback
- [ ] `lib/r2.ts` — rewrite AWS SDK v3 `S3Client` → Workers R2 binding (`env.BUCKET.put()`/`delete()`)
- [ ] `lib/db/index.ts` — ปรับเล็กน้อย (Neon HTTP ใช้ได้แล้วบน Workers)

## Phase 4 — Port API Routes

- [ ] `app/api/auth/route.ts` → `functions/api/auth.ts`
- [ ] `app/api/clients/route.ts` → `functions/api/clients.ts`
- [ ] `app/api/clients/[id]/route.ts` → `functions/api/clients/[id].ts`
- [ ] `app/api/clients/search/route.ts` → `functions/api/clients/search.ts`
- [ ] `app/api/clients/count/route.ts` → `functions/api/clients/count.ts`
- [ ] `app/api/clients/trash/route.ts` → `functions/api/clients/trash.ts`
- [ ] `app/api/cleanup-trash/route.ts` → `functions/api/cleanup-trash.ts` (cron trigger)
- [ ] `app/api/photo-request/route.ts` → `functions/api/photo-request.ts`
- [ ] `app/api/suggestions/route.ts` → `functions/api/suggestions.ts`
- [ ] `app/api/suggestions/[id]/route.ts` → `functions/api/suggestions/[id].ts`

## Phase 5 — Deploy Config

- [ ] `wrangler.toml` — build commands, env vars, cron trigger
- [ ] env secrets (DATABASE_URL, R2 binding, TOKEN_SECRET, ADMIN_PASSWORD)
- [ ] Domain: `data.mcky.space` → Cloudflare
- [ ] Smoke test: CRUD, auth, search, suggestions, R2 uploads

## Files Impacted (summary)

| File | Action |
|------|--------|
| `app/api/*` (10 routes) | Rewrite → `functions/api/*` |
| `lib/auth.ts` | Rewrite — Web Crypto + KV |
| `lib/r2.ts` | Rewrite — R2 binding |
| `lib/clients.ts` | Copy, drop `isAuthorized` (moved to functions) |
| `components/*` (41) | Copy + replace Next.js APIs |
| `hooks/*`, `stores/*`, `types/*` | Copy as-is |
| `lib/db/index.ts` | Minor tweak |
| `app/page.tsx` + page-client | Rewrite → `src/pages/Clients.tsx` |
| `app/c/[id]/page.tsx` + client | Rewrite → `src/pages/ClientDetail.tsx` |
| `app/layout.tsx` | Rewrite → `src/App.tsx` |
| `app/providers.tsx` | Adapt (remove next-themes) |
| `next.config.ts` | Remove |
| `vercel.json` | Remove |
| `package.json` | Replace scripts |

## Verification

- [ ] `pnpm build` — Vite build + Functions build
- [ ] Dev: `pnpm dev` — Vite dev server + Functions local
- [ ] Auth: login/logout/change password
- [ ] CRUD: create/view/edit/delete client
- [ ] Search: name/shop name
- [ ] Suggestions: approve/reject
- [ ] R2: upload client images
- [ ] Lightbox, map, offline-db
