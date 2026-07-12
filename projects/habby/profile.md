---
type: project-profile
id: habby-profile
project: habby
last_updated: 2026-07-12
status: active
freshness: 2026-07-12
verified: 2026-07-04
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
- **Description:** แอปติดตาม habit แบบ gamified
- **Purpose:** ติดตาม habit พร้อมระบบ gamification แบบ XP/leveling
- **Repository:** ไม่ทราบ
- **Owner:** ไม่ทราบ

## เทคโนโลยี (Technology)

- **Languages:** JavaScript
- **Frameworks:** Vite 6, Express 5
- **Runtime:** Node.js
- **Package Manager:** yarn
- **Build System:** Vite build
- **Deployment Targets:** Vercel (static + serverless)

## ความพึ่งพา (Dependencies)

- **Major Libraries:** `express`, `ioredis`, `cors`
- **External Services:** Redis (Upstash)
- **Databases:** Redis
- **Cloud Providers:** Upstash, Vercel
- **APIs:** Redis API

## การพัฒนา (Development)

- **Setup:** `yarn install`
- **Install:** `yarn install`
- **Build:** `yarn build`
- **Test:** ยังไม่ได้ตั้งค่า
- **Lint:** ยังไม่ได้ตั้งค่า
- **Run:** `yarn dev`

## สถาปัตยกรรม (Architecture)

- **Structure:** Vite frontend + Express backend
- **Entry Points:** `index.html` (Vite), `server.js` (Express)
- **Important Packages:** `ioredis` สำหรับเชื่อมต่อ Redis

## เอกสาร (Documentation)

- **Agent Context:** [agent.md](./agent.md)
- **Status:** [status.md](./status.md)

## คุณภาพ (Quality)

- **Tests:** ยังไม่ได้ตั้งค่า
- **CI:** Vercel CI
- **Linters:** ยังไม่ได้ตั้งค่า

## สถานะ (Status)

- **State:** active
- **Documentation Completeness:** ปานกลาง (Medium)
- **Confidence Level:** สูง (High)

**Source:**

- `/home/habby/package.json`
- `/home/OKF/projects/habby/agent.md`
