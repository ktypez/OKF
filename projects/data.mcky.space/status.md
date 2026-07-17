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
- **Animation**: Motion (Framer Motion) v12 — AnimatePresence, springs, stagger
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
- ✅ **เพิ่ม Motion animations** — dialog/sheet exit, dropdowns, card stagger, route transitions, view transitions, micro-interactions
  - ติดตั้ง `motion` v12.42.2 (Framer Motion)
  - สร้าง `src/lib/motion.ts` — shared variants (fadeIn, slideUp, scaleIn, staggerContainer), transitions (spring, smooth, snappy), useReducedMotion hook
  - **Dialog/Sheet**: AnimatePresence + motion.div — backdrop fade + panel scale-in/slide-in, exit animation ทำงานแล้ว
  - **Dropdowns (4 ตัว)**: NavDropdown, FilterDropdown, ThemePresetPicker, CopyDropdown — scale-in menu + fade backdrop
  - **Card stagger**: DesktopCardView (0.03s), DesktopTableView (0.02s), MobileCardList (0.02s) — fade-up entrance
  - **Route transitions**: AnimatePresence mode="wait" — slide-up on enter, fade on exit
  - **View transitions**: List ↔ Detail slide-left/right
  - **Micro-interactions**: FAB spring entrance, SW toast motion, button CSS active state
  - **Accessibility**: `prefers-reduced-motion: reduce` CSS media query + useReducedMotion() hook
  - **Performance tuning**: stiffness 400/damping 30 (crisp springs), 180ms smooth, 25ms stagger, reduced travel distance (6-16px)
  - 16 files modified, ~580 lines added
- ✅ **แก้ "หน้าแรก" link ในเมนูไม่กลับหน้าหลัก**
- สาเหตุ: `NavDropdown` เรียก `navigate('/')` อย่างเดียวไม่ได้ reset `viewState` ใน Zustand — ถ้าผู้ใช้อยู่ใน detail view (URL ยังเป็น `/`), `viewState.view === 'detail'` ค้างอยู่ → ไม่แสดง list
- แก้: เพิ่ม `resetView()` จาก `useUIStore` ใน onClick handler ของปุ่ม "หน้าแรก" ก่อน `navigate('/')`

### 2026-07-13
