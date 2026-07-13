---
type: system-doc
id: workspace
last_updated: '2026-07-13'
---

# Workspace

## เปรียบเทียบโปรเจกต์ (Project Comparison)

| ด้าน | truck | mcky.space | data.mcky.space | habby | collage | receipts-dms |
|--------|-------|------------|------|-------|---------|-------------|
| Framework | React 19 + Vite 8 + TS 6 | Astro 7 + Alpine.js | Vite 8 + React 19 | Vite 8 + Express 5 | Express 4 + vanilla HTML/CSS/JS | Vite 8 + React 19 + TS 7 |
| ฐานข้อมูล | Supabase (Postgres) | Supabase + ไฟล์ .md | **Cloudflare D1 (SQLite)** | Redis (Upstash) | ❌ | **Cloudflare D1 (SQLite)** |
| Storage | Supabase Storage | Supabase | **Cloudflare R2** | ไม่มี | **Cloudflare R2** | **Cloudflare R2** |
| State | tanstack/react-query v5 | Alpine.js x-data | Zustand | ไม่มี | ไม่มี | React hooks |
| Auth | Supabase Auth | SHA-256 header-based | รหัสผ่าน (admin/viewer) | SHA-256 | LINE Messaging API | รหัสผ่าน + HMAC-SHA256 |
| PWA | ❌ (ถูกลบ 2026-07-11) | ❌ | ✅ (SW v2, network-first) | ❌ | ❌ | ❌ |
| Testing | vitest (~101 tests) | ❌ | ❌ (health-check script) | ❌ | ❌ | ❌ |
| Theme | 16 themes, CSS vars | Aura dark terminal | Tailwind 4 + dark mode | 2 themes | ไม่มีธีม | shadcn/ui + Tailwind 4 |
| CI/CD | GitHub Actions | Vercel | **Cloudflare Pages** | Vercel | Render.com + Vercel | **Cloudflare Pages** |

> **Archived:** ~~clientdata~~ (Next.js 16, Neon Postgres, Vercel) — ย้ายไป data.mcky.space แล้ว

## คำสั่ง Dev ตามโปรเจกต์ (Dev Commands by Project)

### truck
- `node node_modules/.bin/vite` — dev
- `node node_modules/vite/bin/vite.js build` — build
- `node node_modules/.bin/vitest run` — test (~101 tests)
- `node node_modules/.bin/eslint src/` — lint

### mcky.space
- `npm run dev` — dev
- `npm run build` — build (astro build)

### data.mcky.space
- **Role:** Production deployment (ของ clientdata)
- **Framework:** Vite 8 + React 19 (ย้ายจาก Next.js)
- **Source:** `~/data.mcky.space`, ติดตาม `origin/main` ของ `ktypez/data.mcky.space`
- **DB:** Cloudflare D1 (SQLite) ผ่าน Drizzle ORM
- **Deploy:** Cloudflare Pages (project `data-mcky-space`), git auto-deploy **ปิด** → `pnpm exec wrangler pages deploy ./dist --project-name=data-mcky-space`
- `pnpm dev` — dev
- `pnpm run build` — build
- `node scripts/health-check.mjs` — ตรวจสภาพ production (หน้าขาว/refresh loop/SW v2/bare spec)

### habby
- `yarn dev` — dev (Express + Vite)
- `yarn build` — build (Vite)
- `node server.js` — local full-stack (port 3001)

### collage
- **Source:** `~/collage` (GitHub: `ktypez/collage`)
- **Stack:** Express 4 backend (Render.com) + vanilla frontend (Vercel) + LINE LIFF
- **Backend:** `cd backend && npm start` — collage generation API (Render.com)
- **Frontend:** `cd frontend && npx serve` — UI + LIFF integration (Vercel)
- **Image Storage:** Cloudflare R2
- **Deploy Backend:** push to GitHub → Render.com auto-deploy
- **Deploy Frontend:** push to GitHub → Vercel auto-deploy

### receipts-dms
- **Source:** `~/paper/receipts-dms` (GitHub: `ktypez/receipts-dms`)
- **Stack:** Vite 8 + React 19 + Cloudflare Pages Functions
- **Domain:** paper.mcky.space
- `npm run dev` — dev (Vite + Wrangler)
- `npm run build` — build
- **Deploy:** `npx wrangler pages deploy ./dist --project-name=receipts-dms`
- **Health:** ใช้ health-check script ตรวจ D1/R2 connectivity

## บุคลิกภาพ Agent (Agent Personalities)

workspace นี้ขับเคลื่อนโดยก๊อบลิน (goblins) แต่ละตัวมีความคลั่งไคล้เฉพาะทาง รายละเอียดเต็มใน [Personalities](./personalities.md)

| Agent | Personality | ความคลั่งไคล้ (Obsession) |
|-------|-------------|-----------|
| clientdata | data goblin | ~~schema สะอาด, CRM เป็นระเบียบ~~ (archived) |
| data.mcky.space | data goblin (stable) | ย้าย framework แบบระแวง, คงความทนทาน production clone ไว้ชัวร์ก่อน (ใช้ branch `main`) |
| collage | barista engineer | ความคมชัดรูป, ผลลัพธ์สวย (aesthetic) |
| habby | trophy goblin | streak, XP, ชมชัยเล็กๆ |
| mcky.space | terminal hipster | neobrutalism, CSS มินิมอล |
| truck | overtime enthusiast | ความถูกต้อง, ความมักง่ายในการ grind, invalidation contracts |
| writer | word goblin | เขียนกระชับ, Thai changelog |
| receipts-dms | paper goblin | เก็บกวาดใบเสร็จ, ทำความสะอาด D1/R2 |
