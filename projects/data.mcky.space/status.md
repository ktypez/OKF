---
type: project-status
id: data-mcky-space-status
project: data.mcky.space
last_updated: '2026-07-17'
status: active
freshness: '2026-07-17'
verified: '2026-07-13'
expires: null
superseded_by: null
anchors:
  - /home/data.mcky.space/
links:
  - type: relates-to
    target: data-mcky-space-profile
  - type: relates-to
    target: data-mcky-space-agent
  - type: relates-to
    target: clientdata-status
---

# สถานะโปรเจกต์ — data.mcky.space

## Stack

- **Framework**: Vite 7
- **UI Library**: React 19.2.7, TypeScript
- **Routing**: react-router-dom v7
- **Styling**: Tailwind CSS 4 + PostCSS
- **State**: Zustand
- **Database**: **Cloudflare D1 (SQLite)** ผ่าน Drizzle ORM (migrated from Neon)
- **Maps**: MapLibre GL JS (lazy-loaded chunk, เขียนใหม่ด้วยวิธี B)
- **Auth**: ใช้รหัสผ่าน, แบ่งบทบาท admin + viewer
- **Storage**: Cloudflare R2 ผ่าน @aws-sdk/client-s3
- **Deploy**: Cloudflare Pages (serverless) — `~/data.mcky.space` (branch `main`) → `data.mcky.space`

## Routes

มีชุดฟีเจอร์เหมือน clientdata (branch master), ย้ายมาเป็น Vite SPA

## การ deploy (Deployment)

| Detail | Value |
|--------|-------|
| Branch | `main` |
| Domain | `data.mcky.space` |
| Platform | Cloudflare Pages (project: `data-mcky-space`) |
| Source repo | `ktypez/data.mcky.space` |
| Auto-deploy (git) | **ปิด** (production_deployments_enabled:false) — deploy ด้วย `npx wrangler pages deploy ./dist --project-name=data-mcky-space` |

## การตรวจสภาพ (Health Check)

`node scripts/health-check.mjs` ตรวจ 4 จุดที่เคยพัง:
1. หน้าแรกโหลดได้ ไม่มี error ไม่ spam refresh
2. `/maps` SPA fallback 200 + map chunk ถูก serve
3. SW live = `v2` (ไม่มี auto-reload loop)
4. bundle ไม่มี bare specifier (สาเหตุหน้าขาว)

หมายเหตุ: WebGL error ใน headless เกิดจากเครื่องไม่มี GPU ไม่ใช่ bug

## บันทึกการเปลี่ยนแปลง (Changelog)

### 2026-07-17
- ✅ **แก้ "หน้าแรก" link ในเมนูไม่กลับหน้าหลัก**
- สาเหตุ: `NavDropdown` เรียก `navigate('/')` อย่างเดียวไม่ได้ reset `viewState` ใน Zustand — ถ้าผู้ใช้อยู่ใน detail view (URL ยังเป็น `/`), `viewState.view === 'detail'` ค้างอยู่ → ไม่แสดง list
- แก้: เพิ่ม `resetView()` จาก `useUIStore` ใน onClick handler ของปุ่ม "หน้าแรก" ก่อน `navigate('/')`

### 2026-07-13
- ✅ **แก้หน้าขาว + spam refresh (STABLE)**
- สาเหตุหน้าขาวที่แท้จริง: pnpm strict layout ทำ Rollup externalize dep (`maplibre-gl`, `clsx`, `class-variance-authority`, `tailwind-merge`) → แก้ด้วย `resolve.alias` ใน vite.config ให้ชี้ path จริง + dedupe + optimizeDeps.include
- สาเหตุ spam refresh: SW v1 สั่ง `triggerHeal()` → `ASSET_STALE` → hard-reload วนลูป (Cloudflare คืน HTML สำหรับ missing asset hash) → เขียน SW ใหม่ (`v2`) ทำแค่ cache app shell อย่างปลอดภัย, network-first, **ไม่มี auto-reload**
- `src/main.tsx` unregister SW เก่าก่อน register ใหม่ (เคลียร์ SW v1 ที่ผู้ใช้ติดอยู่)
- ✅ Deploy ขึ้น production ผ่าน `wrangler pages deploy` (git auto-deploy ปิดอยู่) — ตรวจสอบด้วย headless browser: ERRORS none, URL คงที่, หน้าเรนเดอร์ได้
- ✅ **เขียนหน้าแผนที่ใหม่หมด (Method B)**
- `InlineMap.tsx` เขียนใหม่แบบเบาๆ: แสดงจุดลูกค้า + cluster + กดดูรายละเอียด (navigate ไป `/c/:id`)
- เอาบรรทัด `'use client'` ออกจาก `InlineMap.tsx` (นี่คือตัวการที่ทำ build พังตอนแรก)
- `MapPage.tsx` lazy-load `InlineMap` ด้วย `React.lazy` + `Suspense` → maplibre (1MB) แยก chunk ต่างหาก ถ้าพังจะไม่กระทบหน้าอื่น
- Build สำเร็จ: entry bundle เหลือ 461 kB, maplibre ไปอยู่ chunk แยก (`useMapDarkMode-*.js` ~1MB), ไม่มี UNRESOLVED_IMPORT
- ✅ Deploy + ตรวจสอบ: `/maps` เปิดได้, URL คงที่, map chunk + maplibre chunk serve 200
- เพิ่ม `scripts/health-check.mjs` สำหรับรันย้อนหลังตรวจสภาพ production

### 2026-07-12
- ✅ **Migration Neon → D1 เสร็จสิ้น** (322 clients, 22 suggestions, 2 settings)
- แก้ไข 10 clients ที่มี base64 images ใหญ่เกินกว่า D1 limit:
- Upload รูปอัปโหลดซ้ำเป็นไฟล์ JPEG สำหรับ (2.5–3.4 MB → ~200–300 KB)
- อัปโหลดขึ้น R2 bucket `ezzylist` ภายใต้ `clients/{id}/{timestamp}.jpg`
- อัปเดต D1 ให้ชี้ไปที่ R2 URLs
- รูปเดิมที่มีอยู่ใน R2 คงไว้
- ✅ **Deployed to Cloudflare Pages** — https://618e5768.data-mcky-space.pages.dev
- (หมายเหตุ: Service Worker Kill Switch ที่เขียนไว้ในวันนี้ **ถูกเอาออกแล้ว** ในเปลี่ยนแปลงวันที่ 2026-07-13 — ดูรายละเอียดด้านบน)

### 2026-07-11
- ย้ายจาก Next.js มา Vite 7 + Cloudflare Pages
- เพิ่ม Zustand สำหรับจัดการ state (แทน React useState hooks)
- Fix: ฆ่า service worker เก่าตอนโหลดครั้งแรก
- Fix: trash restore/delete เรียก endpoint ผิด
- Fix: fallback สำหรับ trash items ที่ไม่มี deletedAt
- แสดงลูกค้า 20 รายต่อหน้า (จากเดิม 10/20)
- แสดง placeholder SVG เมื่อลูกค้าไม่มีรูป
- ลบ PWA entry เก่าจาก status.md (ไม่มี SW แล้ว)
