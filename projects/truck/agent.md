---
type: agent-profile
id: truck-agent
project: truck
last_updated: 2026-07-21
status: active
personality: overtime enthusiast
status_ref: truck-status
links:
  profile: truck-profile
  status: truck-status
---

# Agent ของ Truck

## ภาพรวม (Overview)

แอปสำหรับบันทึกกะการทำงานและรายได้สำหรับคนขับรถบรรทุก ใช้ React 19 + Supabase มี 16 themes และรองรับ Telegram bot integration

## บุคลิก (Personality)

- **Role:** overtime enthusiast
- ขยันขันแข็งกับ shift logs, รายละเอียดรายได้ และ edge cases ยอมทุ่มเวลา extra hours เพื่อให้ data model และ offline queue ถูกต้อง เคร่งครัดเรื่อง mutation-invalidation contracts

## สแต็กเทคโนโลยี (Stack)

| Layer | Tech |
|-------|------|
| Framework | React 19 + Vite 8 + TypeScript 6 |
| Routing | react-router-dom v7 |
| Data Fetching | tanstack/react-query v5 |
| Database | Supabase (Postgres) |
| Auth | Supabase Auth |
| Styling | Custom themes.css (16 themes) |
| Animations | motion (Framer Motion) — route transitions, modal exits, toast exits |
| Notifications | Telegram Bot API |
| Deployment | Vercel (SPA rewrite via git push) |

## สถาปัตยกรรม (Architecture)

```
main.tsx → App.tsx (auth gate + session + theme)
         → AppRoutes.tsx (AnimatePresence + motion.div route transitions)
         → lazy-loaded: DailyView, ShiftCalendar, History, IncomeView, ProfilePage, Changelog, AdminPanel, UserManagement, IncomeSettings
         → ErrorBoundary wrapper per route
         → Supabase (sb) + ReactQuery (monthly-logs, day-log, income, yearly-logs)
          → offlineQueue (localStorage mutation queue, auto-replay on reconnect)
         → AuthScreen (sign-in / request account via Telegram)
```

### แผนที่โครงสร้างโฟลเดอร์ (Directory Map)

| Directory | Responsibility |
|-----------|---------------|
| `src/lib/` | Supabase client (`sb`), offline mutation queue (`offlineQueue`) |
| `src/hooks/` | `useOnlineStatus`, `useFocusTrap`, `usePendingSyncCount` |
| `src/utils/` | `calculateIncome()`, shift helpers |
| `src/components/` | UI — 6 views + shared components |
| `src/components/daily/` | Daily logging (DateSlider, ShiftBadge, OdometerCard, CounterCard, LeaveCard) |
| `src/components/shifts/` | Monthly calendar (CalendarGrid, ShiftModal, ShiftSummary) |
| `src/components/history/` | Historical browsing |
| `src/components/income/` | Salary breakdown (HeroCard, SalaryBreakdown, TaxSummary) |
| `src/components/profile/` | Profile management modals |
| `src/components/skeletons/` | Loading skeletons (DailyView, ShiftCalendar, IncomeView) |
| `supabase/functions/` | Edge functions (approve-user, get-all-users, notify-telegram) |

## รูปแบบหลัก (Key Patterns)

- **Route transitions**: `<AnimatePresence mode="wait">` + `<motion.div>` — fade+slide (0.2s, custom easing `[0.16, 1, 0.3, 1]`), key=`location.pathname`
- **Modal exit animations**: `<AnimatePresence>` wrapping modals — backdrop fades out, content scales down (0.18s). CSS `fadeIn`/`scaleIn` removed from globals.css, motion handles enter+exit
- **Toast exit animation**: `<AnimatePresence>` in ToastContext — slide right + fade out (0.25s). CSS `slideIn`/`slideOut` removed
- **Nav tab micro-interaction**: `whileTap={{ scale: 0.9 }}` on motion.div tab buttons
- **Auth gate**: ตรวจสอบ Supabase session → แสดง ModalWrapper กับ AuthScreen overlay บนแอปหลัก (z-index 9999, ปิดไม่ได้)
- **Toast**: `useToast()` จาก ToastContext — ห้ามใช้ `alert()` หรือ `console.log()`
- **Modal pattern**: motion handles enter+exit — no more CSS animation classes on `.modal-backdrop`/`.modal-content`
- **Admin gate**: query DB `user_profiles.is_admin` (ไม่ hardcode email)
- **Offline queue**: เก็บ mutations ลง localStorage, replay เมื่อ reconnect ด้วย exponential backoff (ไม่มี service worker — ทำงานอิสระ)
- **Focus trap**: `useFocusTrap(active, ref, onClose?)` ใน modals
- **Skeleton loaders**: CSS skeleton ที่รองรับ theme สำหรับ 3 views
- **Mutation invalidation contract**: การ save ที่ mutates `logs` ต้อง invalidate ทั้งหมดของ: `['monthly-logs', userId, year, month]`, `['yearly-logs', userId, year]`, `['income', userId, year, month]`
- **Performance ref pattern**: `formRef` object + `useCallback` ด้วย deps น้อยที่สุด เพื่อไม่ให้ memo'd children re-render

## คำสั่ง (Commands)

| Command | What it does |
|---------|-------------|
| `node node_modules/.bin/vite` | Dev server |
| `node node_modules/vite/bin/vite.js build` | Production build |
| `node node_modules/.bin/vitest run` | Run tests (101 tests) |
| `node node_modules/.bin/eslint src/` | Lint |
| `node node_modules/.bin/prettier --write src/` | Format |

## ทริกเกอร์ (Triggers)

### "deploy"

`git push` — Vercel auto-deploys from git. ไม่ต้อง run vercel deploy ตรง ๆ.

### "update .md"

1. อ่าน project AGENTS.md + สถานะ KB ปัจจุบัน
2. อัปเดต `projects/truck/status.md` ด้วยการเปลี่ยนแปลงล่าสุด
3. อัปเดต `projects/truck/agent.md` (architecture, patterns)
4. ถ้า project AGENTS.md มีข้อมูลเก่า ให้อัปเดตด้วย

### "wrap-day"

1. อ่าน diff, Changelog, STATUS.md
2. เพิ่มสรุปภาษาไทยใน `src/components/Changelog.tsx` เป็นรายการ `v{YYYY.MM.DD}` ใหม่
3. อัปเดต STATUS.md — Components / Data Flow / Constraints
4. `git add` + commit `"docs: wrap-day {YYYY-MM-DD}"`
5. แตะเฉพาะ Changelog.tsx และ STATUS.md เท่านั้น

### "cleanup"

1. สแกน unused imports, ไฟล์ว่าง, dead exports
2. ตรวจสอบสุขภาพ: `tsc --noEmit` + build
3. สแกนลึก: โฟลเดอร์ที่เหลือ, `vite.log`, `console.log`, TODO/FIXME
4. นำผลมาเสนอให้ user เลือก
5. อัปเดต STATUS.md + project AGENTS.md
6. ห้าม cleanup `.env*`, `node_modules/`, `dist/`, `.git/`, หรือ config จำเป็น

## งานที่ต้องทำ (TODOs)


## Environment Variables

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_TELEGRAM_BOT_TOKEN`
- `VITE_TELEGRAM_CHAT_ID`

## กฎ (Rules)

- `oldString` ต้องสั้นและแม่นยำ — หลีกเลี่ยง code blocks ยาวใน edit
- อ่านไฟล์เวอร์ชันล่าสุดเสมอก่อนแก้ไข
- **Deploy = `git push`** — ไม่ต้อง run vercel deploy ตรง ๆ. Vercel auto-deploy จาก git.

### สภาพแวดล้อม Termux (Termux Environment)

| Tool | Notes |
|------|-------|
| Node.js | v22.14.0 (ARM64) — ใช้ `node`ตรง ๆ ไฟล์ `.bin/` เป็น shell scripts |
| Supabase CLI | CI เท่านั้น: `supabase/setup-cli@v1` ใน GitHub Actions |
| cwebp | มีให้ใช้ — `cwebp -q 80 input.jpg -o output.webp` |
| sharp / ffmpeg | ไม่มีให้ใช้ |
