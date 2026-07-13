---
type: project-status
id: truck-status
project: truck
last_updated: 2026-07-13
status: active
freshness: 2026-07-13
verified: 2026-07-13
expires: null
superseded_by: null
anchors:
  - /home/truck/
links:
  - type: relates-to
    target: truck-profile
  - type: relates-to
    target: truck-agent
---

# สถานะโปรเจกต์ — Truck

## สแต็กเทคโนโลยี (Stack)

- **Framework**: React 19.2.7 + Vite 8 + TypeScript 6
- **Routing**: react-router-dom v7
- **Data**: TanStack React Query v5
- **UI**: Custom themes.css (16 themes: 5 light, 5 dark, 6 shinchan)
- **Auth**: Supabase Auth (email/password)
- **Database**: Supabase Postgres (timestamptz, Asia/Bangkok TZ)
- **Backend**: Supabase Edge Functions (Deno)
- **Deploy**: Vercel (SPA rewrite) + Supabase
- **Testing**: Vitest (101 tests), ESLint, Prettier
- **CI**: GitHub Actions
- **Integrations**: Telegram Bot API สำหรับคำขอสมัครบัญชี

## เส้นทาง (Routes)

| Path | View | Description |
|------|------|-------------|
| `/` or `/daily` | DailyView | บันทึกประจำวันพร้อมประเภทกะ ชั่วโมง รายได้ |
| `/shifts` | ShiftCalendar | ปฏิทินรายเดือนพร้อมประวัติกะ |
| `/income` | IncomeView | รายละเอียดรายได้: ฐาน OT วันหยุด รวม |
| `/history` | HistoryPage | ดูบันทึกทั้งหมดพร้อมตัวกรอง |
| `/profile` | ProfilePage | ข้อมูลผู้ใช้ การตั้งค่า แผง admin |
| `/changelog` | Changelog | บันทึกการเปลี่ยนแปลง |

## Changelog

### 2026-07-13
- **KB refresh**: อัปเดต dependencies (ลบ vite-plugin-pwa), อัปเดต test count (101 tests), แก้ไข frontmatter ซ้ำซ้อน
- Sync OKF knowledge base across all 8 projects
- Updated workspace index with current project inventory
- Refreshed documentation timestamps and freshness

### 2026-07-11
- ลบ PWA ทั้งหมด: ลบ vite-plugin-pwa, sw.js, SwUpdateToast, public/icons/
- เพิ่ม SVG truck favicon (public/favicon.svg)
- แทนที่ motorbike favicon ด้วย truck SVG (หัวรถ + หลังคาโหลด + ล้อ)

### 2026-07-08
- wrap-day: changelog + อัปเดตสถานะสำหรับ 8 กรกฎาคม
- คุณภาพโค้ด: typed interfaces, ลบ eslint-disable blocks, ตรวจสอบ env var, async cancellation flags
- ทำความสะอาด gitignore
- Admin user card: ลบ type badge, เรียง type + reset ซ้อนกัน
- แก้ไข: เงินวันหยุดถูกนับเป็นเงินเดือน (incomeBase), ช่วงสัปดาห์ จ.-อา.

### 2026-07-06
- Auth modal overlay (ModalWrapper) — สกัดการนำทางเมื่อ session หมดอายุ

## การออกแบบ (Design)

- 16 themes พร้อมพื้นหลังไล่ระดับ + ลวดลาย SVG noise
- ตัวแปร Neobrutalist (เงาแข็ง ขอบหนา)
- เอฟเฟกต์แก้วสำหรับธีม shinchan
- CSS custom properties ด้วยสเกล `--space-*` (2px ถึง 30px)
- `toBuddhistYear()` สำหรับแสดงปฏิทินไทย

## PWA

ถูกลบใน 2026-07-11 — เอา `vite-plugin-pwa`, `sw.js`, `SwUpdateToast`, `public/icons/` ออกทั้งหมด
Offline queue (localStorage mutation queue) ยังทำงานอิสระโดยไม่ต้องใช้ service worker

## ปัญหาที่ทราบ (Known Issues)

- ต้อง reauthentication ก่อน `sb.auth.updateUser()`
- Mutation invalidation: การ save ที่ mutates `logs` ต้อง invalidate ทั้งหมดของ: `monthly-logs`, `yearly-logs`, `income`
- Avatar upload: Supabase Storage `avatars/{userId}/avatar.{ext}`, ≤2MB
- ห้ามใช้ `@ts-ignore` หรือ `@ts-expect-error` (ใช้ `as Record<string, any>` แทน)

