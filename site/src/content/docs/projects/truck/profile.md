---
title: 'โปรไฟล์โปรเจกต์: Truck'
description: project-profile from truck
---

# โปรไฟล์โปรเจกต์: Truck

## ข้อมูลตัวตน (Identity)
- **Name:** ezzy-truck
- **Display Name:** EzzyTruck
- **Description:** Shift logging & income PWA สำหรับคนขับรถบรรทุก
- **Purpose:** ช่วยคนขับรถบรรทุกบันทึกกะการทำงานและติดตามรายได้
- **Repository:** Unknown
- **Owner:** Unknown

## เทคโนโลยี (Technology)
- **Languages:** TypeScript
- **Frameworks:** React 19, Vite 8
- **Runtime:** Node.js
- **Package Manager:** npm
- **Build System:** Vite build
- **Deployment Targets:** PWA, Vercel

## Dependencies
- **Major Libraries:** `@supabase/supabase-js`, `@tanstack/react-query`, `react-router-dom`, `vite-plugin-pwa`, `@phosphor-icons/react`
- **External Services:** Supabase, Telegram Bot API
- **Databases:** Supabase (PostgreSQL)
- **Cloud Providers:** Supabase
- **APIs:** Supabase API, Telegram Bot API

## การพัฒนา (Development)
- **Setup:** `npm install`
- **Install:** `npm install`
- **Build:** `node node_modules/vite/bin/vite.js build`
- **Test:** `node node_modules/.bin/vitest run`
- **Lint:** `node node_modules/.bin/eslint src/`
- **Typecheck:** `node node_modules/.bin/tsc --noEmit`
- **Run:** `node node_modules/.bin/vite`

## สถาปัตยกรรม (Architecture)
- **Structure:** React SPA / PWA ที่ใช้ lazy-loaded routes
- **Entry Points:** `src/main.tsx`
- **Important Packages:** `vite-plugin-pwa` สำหรับ PWA, `@tanstack/react-query` สำหรับ data fetching

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
