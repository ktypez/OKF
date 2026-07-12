---
type: project-profile
id: mcky-space-profile
project: mcky.space
last_updated: 2026-07-12
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: mcky-agent
  - type: relates-to
    target: mcky-status
  - type: relates-to
    target: mcky-structure
  - type: relates-to
    target: mcky-dependencies
  - type: relates-to
    target: mcky-commands
---

# โปรไฟล์โปรเจกต์: mcky.space

## ข้อมูลตัวตน
- **Name:** mcky.space
- **Display Name:** mcky.space
- **Description:** เว็บไซต์ส่วนตัวสไตล์ terminal
- **Purpose:** Portfolio และบล็อกส่วนตัว
- **Repository:** mcky.space
- **Owner:** ktypez (https://github.com/ktypez/mcky.space)

## เทคโนโลยี
- **Languages:** TypeScript, JavaScript
- **Frameworks:** Astro 7, Alpine.js
- **Runtime:** Node.js
- **Package Manager:** npm
- **Build System:** Astro build
- **Deployment Targets:** Vercel

## การพึ่งพา
- **Major Libraries:** `@supabase/supabase-js`, `marked`
- **External Services:** Supabase
- **Databases:** Supabase (PostgreSQL)
- **Cloud Providers:** Supabase, Vercel
- **APIs:** Supabase API

## การพัฒนา
- **Setup:** `npm install`
- **Install:** `npm install`
- **Build:** `npm run build`
- **Test:** ไม่ได้ตั้งค่า (ข้ามการเทส)
- **Lint:** ไม่ได้ตั้งค่า (pure CSS)
- **Run:** `npm run dev`

## สถาปัตยกรรม
- **Structure:** Astro SSR พร้อม Alpine.js client interactivity
- **Entry Points:** `src/pages/`
- **Important Packages:** `marked` สำหรับประมวลผล markdown

## เอกสาร
- **Agent Context:** [agent.md](./agent.md)
- **Status:** [status.md](./status.md)

## คุณภาพ
- **Tests:** ไม่มี (ข้ามไป)
- **CI:** Vercel CI
- **Linters:** ไม่มี (pure CSS)

## สถานะ
- **State:** active
- **Documentation Completeness:** สูง
- **Confidence Level:** สูง

**แหล่งที่มา:**
- `/home/mcky.space/package.json`
- `/home/OKF/projects/mcky.space/agent.md`
