---
title: สถานะโปรเจกต์ — data.mcky.space
description: project-status from data.mcky.space
---

---
type: project-status
id: data-mcky-space-status
project: data.mcky.space
last_updated: 2026-07-13
status: active
freshness: 2026-07-13
verified: 2026-07-13
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
- **State**: Zustand
- **Database**: **Cloudflare D1 (SQLite)** ผ่าน Drizzle ORM (migrated from Neon)
- **Maps**: MapLibre GL JS
- **Auth**: ใช้รหัสผ่าน, แบ่งบทบาท admin + viewer
- **Storage**: Cloudflare R2 ผ่าน @aws-sdk/client-s3
- **Deploy**: Cloudflare Pages (serverless) — `stable` → `data.mcky.space`

## Routes

มีชุดฟีเจอร์เหมือน clientdata (branch master), ย้ายมาเป็น Vite SPA

## การ deploy (Deployment)

| Detail | Value |
|--------|-------|
| Branch | `stable` |
| Domain | `data.mcky.space` |
| Platform | Cloudflare Pages |
| Source repo | `ktypez/clientdata` |

## บันทึกการเปลี่ยนแปลง (Changelog)

### 2026-07-13
- Sync OKF knowledge base across all 8 projects
- Updated workspace index with current project inventory
- Refreshed documentation timestamps and freshness

### 2026-07-12
- ✅ **Migration Neon → D1 เสร็จสิ้น** (322 clients, 22 suggestions, 2 settings)
- แก้ไข 10 clients ที่มี base64 images ใหญ่เกินกว่า D1 limit:
- Upload รูปอัปโหลดซ้ำเป็นไฟล์ JPEG สำหรับ (2.5–3.4 MB → ~200–300 KB)
- อัปโหลดขึ้น R2 bucket `ezzylist` ภายใต้ `clients/{id}/{timestamp}.jpg`
- อัปเดต D1 ให้ชี้ไปที่ R2 URLs
- รูปเดิมที่มีอยู่ใน R2 คงไว้
- ✅ **Deployed to Cloudflare Pages** — https://618e5768.data-mcky-space.pages.dev
- เพิ่ม **Service Worker Kill Switch** (SW):
- /sw.js รองรับ kill switch ผ่าน `?sw_kill` URL param หรือ `localStorage.setItem('sw:kill-switch', '1')`
- ลบ SW registration + คลีย์ทุก caches + force reload
- Stale asset detection (ASSET_STALE message) → hard reload
- กด register SKIP_WAITING / KILL_SW ผ่าน postMessage ได้

### 2026-07-11
- ย้ายจาก Next.js มา Vite 7 + Cloudflare Pages
- เพิ่ม Zustand สำหรับจัดการ state (แทน React useState hooks)
- Fix: ฆ่า service worker เก่าตอนโหลดครั้งแรก
- Fix: trash restore/delete เรียก endpoint ผิด
- Fix: fallback สำหรับ trash items ที่ไม่มี deletedAt
- แสดงลูกค้า 20 รายต่อหน้า (จากเดิม 10/20)
- แสดง placeholder SVG เมื่อลูกค้าไม่มีรูป
- ลบ PWA entry เก่าจาก status.md (ไม่มี SW แล้ว)
