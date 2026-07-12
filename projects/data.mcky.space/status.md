---
type: project-status
id: data-mcky-space-status
project: data.mcky.space
last_updated: 2026-07-12
status: active
freshness: 2026-07-12
verified: 2026-07-11
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
- **Database**: Neon (Postgres) ผ่าน Drizzle ORM
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

### 2026-07-11
- ย้ายจาก Next.js มา Vite 7 + Cloudflare Pages
- เพิ่ม Zustand สำหรับจัดการ state (แทน React useState hooks)
- Fix: ฆ่า service worker เก่าตอนโหลดครั้งแรก
- Fix: trash restore/delete เรียก endpoint ผิด
- Fix: fallback สำหรับ trash items ที่ไม่มี deletedAt
- แสดงลูกค้า 20 รายต่อหน้า (จากเดิม 10/20)
- แสดง placeholder SVG เมื่อลูกค้าไม่มีรูป
- ลบ PWA entry เก่าจาก status.md (ไม่มี SW แล้ว)
