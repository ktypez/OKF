---
type: project-status
id: data-mcky-space-status
project: data.mcky.space
last_updated: 2026-07-22
status: active
links:
  profile: data-mcky-space-profile
  agent: data-mcky-space-agent
---


# สถานะโปรเจกต์ — data.mcky.space

## Routes

มีชุดฟีเจอร์เหมือน clientdata (branch master), ย้ายมาเป็น Vite SPA

## การ deploy (Deployment)

| Detail | Value |
|--------|-------|
| Branch | `main` |
| Domain | `data.mcky.space` |
| Platform | Cloudflare Pages (project: `data-mcky-space`) |
| Source repo | `ktypez/data.mcky.space` |
| Auto-deploy (git) | **ปิด** (production_deployments_enabled:false) — deploy ด้วย `pnpm exec wrangler pages deploy ./dist --project-name=data-mcky-space` |

## การตรวจสภาพ (Health Check)

`node scripts/health-check.mjs` ตรวจ 4 จุดที่เคยพัง:
1. หน้าแรกโหลดได้ ไม่มี error ไม่ spam refresh
2. `/maps` SPA fallback 200 + map chunk ถูก serve
3. SW live = `v2` (ไม่มี auto-reload loop)
4. bundle ไม่มี bare specifier (สาเหตุหน้าขาว)

หมายเหตุ: WebGL error ใน headless เกิดจากเครื่องไม่มี GPU ไม่ใช่ bug

## บันทึกการเปลี่ยนแปลง (Changelog)

### 2026-07-22
- ✅ **Motion: แก้ route exit animation + wire useReducedMotion()**
  - `PageTransition` ใน `App.tsx` — เพิ่ม `exit="hidden"` ที่หายไป ทำให้ route exit animation ทำงาน (ก่อนหน้าหมดวูบ)
  - เพิ่ม `useMotion()` hook ใน `motion.ts` — ส่ง variants + transitions กลับมาโดยนับ reduced motion อัตโนมัติ
  - ถ้า user เปิด reduced motion: transitions กลายเป็น `instant` (duration 0), variants เป็น `{hidden: {}, visible: {}}` (ไม่ขยับ)
  - อัปเดต `App.tsx`, `Dialog`, `Sheet` ให้ใช้ `useMotion()` แทน constant imports
  - 4 ไฟล์ modified
- ✅ **Location search: รองรับหลายรูปแบบ + feedback ชัดเจน**
  - แยก `parseCoords()` helper — รองรับ DMS (`13°45'23"N 100°29'31"E`), hemisphere suffix (`13.7563 N, 100.5018 E`), และ decimal degrees
  - เพิ่ม `locFeedback` state — success message 🟢 (clear input + `📍 lat, lng`) หรือ error 🔴 เมื่อไม่รู้จักพิกัด
  - อัปเดต placeholder เป็น "ละติจูด, ลองจิจูด หรือ Plus Code"
  - feedback หายอัตโนมัติเมื่อ user พิมพ์ใหม่
  - 1 ไฟล์ modified

### 2026-07-19
- ❌ **ลบ Void theme ออกทั้งหมด** — หลังจากสร้างและปรับแต่ง frosted glass + atmosphere layers (orbs, grid, noise texture)
  - ลบ liquid-glass dependency, CSS atmosphere layers, theme definition, theme-provider references
  - กลับไป 11 themes (obsidian, ivory, meridian, synthwave, frost, ember, moss, neo-brutalism, slate, coral, bubblegum)

### 2026-07-18
- ✅ **Void theme: frosted glass + atmosphere layers** (ถูกลบ 2026-07-19)
- ✅ **เพิ่ม Void theme preset** (ถูกลบ 2026-07-19)

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
