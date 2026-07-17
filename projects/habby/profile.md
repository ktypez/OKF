---
type: project-profile
id: habby-profile
project: habby
last_updated: '2026-07-17'
status: active
freshness: '2026-07-17'
verified: '2026-07-13'
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: habby-agent
  - type: relates-to
    target: habby-status
  - type: relates-to
    target: habby-structure
  - type: relates-to
    target: habby-dependencies
  - type: relates-to
    target: habby-commands
---

# โปรไฟล์โปรเจกต์: habby

## ข้อมูลตัวตน (Identity)

- **Name:** habby
- **Display Name:** Habby
- **Description:** แอปติดตาม habit แบบ gamified — public mode พร้อม localStorage + owner mode พร้อม Redis
- **Purpose:** ติดตาม habit พร้อมระบบ gamification แบบ XP/leveling
- **Repository:** https://github.com/ktypez/habby
- **Owner:** ktypez

## เทคโนโลยี (Technology)

- **Languages:** JavaScript
- **Frameworks:** Vite 8, Express 5
- **Runtime:** Node.js
- **Package Manager:** yarn
- **Build System:** Vite build
- **Deployment Targets:** Vercel (static + serverless)

## ความพึ่งพา (Dependencies)

- **Major Libraries:** `express`, `ioredis`, `cors`
- **External Services:** Redis (ioredis → Upstash)
- **Databases:** Redis (owner mode), localStorage (guest mode)
- **Cloud Providers:** Vercel
- **APIs:** Redis API

## การพัฒนา (Development)

- **Setup:** `yarn install`
- **Install:** `yarn install`
- **Build:** `yarn build`
- **Test:** Vitest (21 tests)
- **Lint:** ยังไม่ได้ตั้งค่า
- **Run:** `yarn dev`

## สถาปัตยกรรม (Architecture)

- **Structure:** Vite frontend + Express backend
- **Entry Points:** `index.html` (Vite), `server.js` (Express)
- **Storage:** Dual-mode — localStorage (public guests) + Redis API (owner)
- **Important Packages:** `ioredis` สำหรับเชื่อมต่อ Redis

## เอกสาร (Documentation)

- **Agent Context:** [agent.md](./agent.md)
- **Status:** [status.md](./status.md)

## คุณภาพ (Quality)

- **Tests:** Vitest + testing-library (21 tests)
- **CI:** Vercel CI
- **Linters:** ยังไม่ได้ตั้งค่า

## สถานะ (Status)

- **State:** active
- **Documentation Completeness:** สูง (High)
- **Confidence Level:** สูง (High)

**Source:**

- `/home/habby/package.json`
- `/home/OKF/projects/habby/agent.md`
