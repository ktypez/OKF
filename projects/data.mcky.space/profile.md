---
type: project-profile
id: data-mcky-space-profile
project: data.mcky.space
last_updated: '2026-07-17'
status: active
freshness: '2026-07-17'
verified: '2026-07-14'
expires: null
superseded_by: null
anchors:
  - /home/data.mcky.space/
links:
  - type: relates-to
    target: data-mcky-space-status
  - type: relates-to
    target: clientdata-profile
---

# ข้อมูลโปรเจกต์: data.mcky.space

## ข้อมูลจำเพาะ (Identity)
- **Name:** data.mcky.space
- **Display Name:** data.mcky.space (Production)
- **Description:** ระบบจัดการลูกค้า & CRM — production deployment
- **Purpose:** production deployment ของ clientdata, สร้างใหม่ด้วย Vite + Cloudflare Pages
- **Repository:** `ktypez/data.mcky.space` (branch main)

## เทคโนโลยี (Technology)
- **Languages:** TypeScript
- **Frameworks:** Vite 8, React 19, Tailwind CSS 4
- **Animation:** Motion (Framer Motion) v12
- **Runtime:** Node.js
- **Package Manager:** pnpm
- **Build System:** Vite
- **Deployment Targets:** Cloudflare Pages

## Dependencies
- **Major Libraries:** `motion`, `drizzle-orm`, `zustand`, `maplibre-gl`, `react-router-dom`, `@phosphor-icons/react`
- **External Services:** Cloudflare D1, Cloudflare R2
- **Databases:** Cloudflare D1 (SQLite)
- **Cloud Providers:** Cloudflare

## การพัฒนา (Development)
- **Setup:** `git clone https://github.com/ktypez/data.mcky.space ~/data.mcky.space`
- **Run:** `pnpm dev`
- **Build:** `pnpm run build`
- **Health check:** `node scripts/health-check.mjs`

## สถาปัตยกรรม (Architecture)
- **Structure:** Vite SPA กับ Cloudflare Pages Functions backend
- **Animation:** Motion (Framer Motion) — AnimatePresence for mount/unmount, spring transitions, stagger containers, shared variants in `src/lib/motion.ts`
- **State:** Zustand
- **Source:** `ktypez/data.mcky.space` (branch main), ย้ายจาก Next.js มา Vite
- **Maps:** MapLibre GL JS — `InlineMap.tsx` lazy-loaded แยก chunk (`React.lazy` + `Suspense`) ถ้าพังจะไม่กระทบหน้าอื่น
- **PWA/SW:** มี service worker (`public/sw.js` v2) ทำแค่ cache app shell อย่างปลอดภัย, network-first, **ไม่มี auto-reload**
- **Auth:** `LoginModal.tsx` → POST `/api/auth` (`functions/api/auth.ts`) ตรวจรหัสผ่านจาก D1 (`admin_pw_hash`) → เก็บ token ใน `localStorage['ezzylist_admin_token']` — ดู `DOC-004` สำหรับ default password

## การ deploy (Deployment)
- **Branch:** `main`
- **Domain:** `data.mcky.space`
- **Platform:** Cloudflare Pages (project: `data-mcky-space`)
- **Auto-deploy (git):** ปิด (production_deployments_enabled:false)
- **Deploy command:** `pnpm exec wrangler pages deploy ./dist --project-name=data-mcky-space` (ไม่ใช้ --branch)

## สถานะ (Status)
- **State:** active (STABLE — 2026-07-17 เพิ่ม Motion animations)
- **Role:** Production deployment
- **Source:** `clientdata` (branch master — ทดลอง), ย้ายมา Vite แล้ว
