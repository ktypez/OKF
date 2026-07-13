---
type: system-doc
id: workspace
last_updated: '2026-07-13'
---

# Workspace

## เปรียบเทียบโปรเจกต์ (Project Comparison)

| ด้าน | truck | mcky.space | clientdata | data.mcky.space | habby |
|--------|-------|------------|------------|------|-------|
| Framework | React 19 + Vite 8 + TS 6 | Astro 7.0.2 + Alpine.js | Next.js 16 (webpack) | Vite 7 + React 19 | Vite 6 + Express 5 |
| ฐานข้อมูล | Supabase (Postgres) | Supabase + ไฟล์ .md | Neon Postgres (Drizzle) | **Cloudflare D1 (SQLite)** | Redis (Upstash) |
| Storage | Supabase Storage | Supabase | Cloudflare R2 | **Cloudflare R2** | ไม่มี |
| State | tanstack/react-query v5 | Alpine.js x-data | custom fetch + React state | Zustand | ไม่มี |
| Auth | Supabase Auth | SHA-256 แบบ header-based | scrypt + HMAC tokens | รหัสผ่าน (admin/viewer) | SHA-256 |
| PWA | ❌ | ❌ | ✅ (cleanup-only sw) | ✅ (SW v2 ปลอดภัย, network-first) | ❌ |
| Testing | vitest (90 tests) | ❌ | Vitest (16 tests) | ❌ (มี health-check script) | ❌ |
| Theme | 16 themes, CSS vars | Aura dark terminal | Tailwind + 14 presets | Tailwind 4 + dark mode | 2 themes |
| CI/CD | GitHub Actions | Vercel | Vercel | **Cloudflare Pages** | Vercel |

## คำสั่ง Dev ตามโปรเจกต์ (Dev Commands by Project)

### truck
- `node node_modules/.bin/vite` — dev
- `node node_modules/vite/bin/vite.js build` — build
- `node node_modules/.bin/vitest run` — test (90 tests)
- `node node_modules/.bin/eslint src/` — lint

### mcky.space
- `npm run dev` — dev
- `npm run build` — build (prebuild + astro build)

### clientdata
- **Role:** Experimental / dev branch
- `npx next dev -H localhost` — dev (port 3002)
- `npm run build` — build
- `npm run lint` — ESLint
- `npm run db:push` — push schema Drizzle
- `npm run db:migrate` — รัน migration
- `pnpm test` — Vitest (16 tests)

### data.mcky.space
- **Role:** Production deployment (ของ clientdata)
- **Framework:** Vite 7 + React 19 (ย้ายจาก Next.js)
- **Source:** `~/data.mcky.space`, ติดตาม `origin/main` ของ `ktypez/data.mcky.space`
- **DB:** Cloudflare D1 (SQLite) ผ่าน Drizzle ORM
- **Deploy:** Cloudflare Pages (project `data-mcky-space`), git auto-deploy **ปิด** → `npx wrangler pages deploy ./dist --project-name=data-mcky-space`
- `npx vite` — dev
- `npm run build` — build
- `node scripts/health-check.mjs` — ตรวจสภาพ production (หน้าขาว/refresh loop/SW v2/bare spec)

### habby
- `yarn dev` — dev (Express + Vite)
- `yarn build` — build (Vite)
- `node server.js` — local full-stack (port 3001)

## บุคลิกภาพ Agent (Agent Personalities)

workspace นี้ขับเคลื่อนโดยก๊อบลิน (goblins) แต่ละตัวมีความคลั่งไคล้เฉพาะทาง รายละเอียดเต็มใน [Personalities](./personalities.md)

| Agent | Personality | ความคลั่งไคล้ (Obsession) |
|-------|-------------|-----------|
| clientdata | data goblin | schema สะอาด, CRM เป็นระเบียบ |
| data.mcky.space | data goblin (stable) | ย้าย framework แบบระแวง, คงความทนทาน production clone ไว้ชัวร์ก่อน (ใช้ branch `main`) |
| collage | barista engineer | ความคมชัดรูป, ผลลัพธ์สวย (aesthetic) |
| habby | trophy goblin | streak, XP, ชมชัยเล็กๆ |
| mcky.space | terminal hipster | neobrutalism, CSS มินิมอล |
| truck | overtime enthusiast | ความถูกต้อง, ความมักง่ายในการ grind, invalidation contracts |
| writer | word goblin | เขียนกระชับ, Thai changelog |
| receipts-dms | paper goblin | เก็บกวาดใบเสร็จ, ทำความสะอาด D1/R2 |
