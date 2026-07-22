---
type: project-profile
id: truck-profile
project: truck
last_updated: 2026-07-21
status: active
stack:
  language: TypeScript
  framework: React 19 + Vite 8
  ui: Tailwind CSS
  database: Supabase (PostgreSQL)
  storage: Supabase Storage
  state: TanStack Query v5
  auth: Supabase Auth
  testing: Vitest
  deployment: Vercel
  ci: GitHub Actions
agent_personality: overtime enthusiast
links:
  agent: truck-agent
  status: truck-status
---

# โปรไฟล์โปรเจกต์: Truck

## ข้อมูลตัวตน (Identity)
- **Name:** ezzy-truck
- **Display Name:** EzzyTruck
- **Description:** Shift logging & income app สำหรับคนขับรถบรรทุก
- **Purpose:** ช่วยคนขับรถบรรทุกบันทึกกะการทำงานและติดตามรายได้
- **Repository:** https://github.com/ktypez/truck
- **Owner:** ktypez

## เทคโนโลยี (Technology)
- **Languages:** TypeScript
- **Frameworks:** React 19, Vite 8
- **Runtime:** Node.js
- **Package Manager:** npm
- **Build System:** Vite build
- **Deployment Targets:** Vercel

## Dependencies
- `react`: 19.2.7
- `react-dom`: 19.2.7
- `react-router-dom`: ^7.18.0
- `@supabase/supabase-js`: ^2.108.2
- `@tanstack/react-query`: ^5.101.1
- `motion`: ^12.42.2
- `@phosphor-icons/react`: ^2.1.10

### Dev Tools
- `vite`: ^8.0.16
- `vitest`: ^3.2.6
- `typescript`: ^6.0.3
- `eslint`: ^10.4.1
- `prettier`: ^3.8.4
- `@vitejs/plugin-react`: ^6.0.2
- `@testing-library/react`: ^16.3.2
- `@testing-library/dom`: ^10.4.1
- `@testing-library/jest-dom`: ^6.9.1
- `@testing-library/user-event`: ^14.6.1
- `jsdom`: ^29.1.1
- `typescript-eslint`: ^8.61.1

### External Services
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Auth:** Supabase Auth
- **Integrations:** Telegram Bot API

## การพัฒนา (Development)
- `npm install` — ติดตั้ง dependencies
- `npm run dev` — เริ่ม Vite dev server
- `npm run build` — build สำหรับ production
- `npm run preview` — ดูตัวอย่าง production build
- `npm run test` — รัน Vitest tests
- `npm run test:watch` — รัน tests แบบ watch mode
- `npm run lint` — รัน ESLint
- `npm run typecheck` — ตรวจสอบ TypeScript type
- `npm run format` — จัดรูปแบบโค้ดด้วย Prettier

## สถาปัตยกรรม (Architecture)
- **Structure:** React SPA ที่ใช้ lazy-loaded routes
- **Entry Points:** `src/main.tsx`
- **Key Files:**
  - `src/main.tsx` — จุดเริ่มต้นแอป
  - `src/App.tsx` — Root component
  - `vite.config.ts` — การตั้งค่า Vite
  - `vitest.config.ts` — การตั้งค่า test

### Directory Layout
- `src/` — โค้ด React source
  - `components/` — UI components (25 files)
  - `hooks/` — Custom React hooks
  - `lib/` — Utility และ API logic
  - `utils/` — Helper functions
  - `styles/` — CSS และไฟล์ theme
  - `themes/` — 16 theme files (dynamic loading)
  - `test/` — Vitest tests
- `public/` — Static assets (favicon.svg, files/)
- `supabase/` — Supabase functions และ migrations
- `api/` — External API integrations (เช่น `telegram.ts`)

## เอกสาร (Documentation)
- **Agent Context:** [agent.md](./agent.md)
- **Status:** [status.md](./status.md)

## คุณภาพ (Quality)
- **Tests:** Vitest, Testing Library
- **CI:** GitHub Actions (deploy edge functions)
- **Linters:** ESLint, Prettier

## สถานะ (Status)
- **State:** active
- **Documentation Completeness:** High
- **Confidence Level:** High

**Source:**
- `/home/truck/package.json`
- `/home/OKF/projects/truck/agent.md`
