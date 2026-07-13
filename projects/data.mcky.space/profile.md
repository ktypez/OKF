---
type: project-profile
id: data-mcky-space-profile
project: data.mcky.space
last_updated: '2026-07-13'
status: active
freshness: '2026-07-13'
verified: '2026-07-13'
expires: null
superseded_by: null
anchors:
  - /home/data.mcky.space/
links:
  - type: relates-to
    target: data-mcky-space-status
  - type: relates-to
    target: clientdata-profile
---


# ข้อมูลโปรเจกต์: data.mcky.space

## ข้อมูลจำเพาะ (Identity)
- **Name:** data.mcky.space
- **Display Name:** data.mcky.space (Production)
- **Description:** ระบบจัดการลูกค้า & CRM — production deployment
- **Purpose:** production deployment ของ clientdata, สร้างใหม่ด้วย Vite + Cloudflare Pages
- **Repository:** `ktypez/clientdata` (branch stable)

## เทคโนโลยี (Technology)
- **Languages:** TypeScript
- **Frameworks:** Vite 7, React 19, Tailwind CSS 4
- **Runtime:** Node.js
- **Package Manager:** npm
- **Build System:** Vite
- **Deployment Targets:** Cloudflare Pages

## Dependencies
- **Major Libraries:** `drizzle-orm`, `zustand`, `maplibre-gl`, `react-router-dom`
- **External Services:** Cloudflare D1, Cloudflare R2
- **Databases:** Cloudflare D1 (SQLite)
- **Cloud Providers:** Cloudflare

## การพัฒนา (Development)
- **Setup:** `git clone -b stable https://github.com/ktypez/clientdata ~/data.mcky.space`
- **Run:** `npx vite`

## สถาปัตยกรรม (Architecture)
- **Structure:** Vite SPA กับ Cloudflare Pages Functions backend
- **State:** Zustand
- **Source:** branch stable ของ ktypez/clientdata, ย้ายจาก Next.js มา Vite

## การ deploy (Deployment)
- **Branch:** `stable`
- **Domain:** `data.mcky.space`
- **Platform:** Cloudflare Pages (serverless functions)
- **Project:** data (Cloudflare Pages)

## สถานะ (Status)
- **State:** active
- **Role:** Production deployment
- **Source:** `clientdata` (branch master — ทดลอง), ย้ายมา Vite แล้ว

