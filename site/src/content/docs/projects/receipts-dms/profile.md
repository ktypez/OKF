---
title: receipts-dms
description: project-profile from receipts-dms
---

# receipts-dms

**Role:** production
**Framework:** Vite 6 + React 19 + TypeScript
**Backend:** Cloudflare Pages Functions (D1 + R2)
**Deployment:** Cloudflare Pages (paper.mcky.space)
**Stack:** shadcn/ui, Tailwind v3, lucide-react, react-router v7

## คำอธิบาย

ระบบจัดการเอกสารใบเสร็จ สำหรับจัดระเบียบและจัดการรูปภาพใบเสร็จ รองรับการอัปโหลดพร้อมบีบอัดรูปภาพ (WebP 2048px / 80%), จัดการหมวดหมู่, บันทึกโน้ต, ค้นหาแบบเต็มข้อความ, และ auth แบบรหัสผ่านเดียว

## เทคโนโลยี

| เลเยอร์ | เทคโนโลยี |
|-------|-----------|
| Frontend | Vite 6, React 19, TypeScript 7, Tailwind 3 |
| UI | shadcn/ui (Radix primitives), lucide-react |
| Routing | react-router v7 |
| Auth | รหัสผ่านเดียว (env var) + HMAC-SHA256 cookie |
| Backend | Cloudflare Pages Functions (Workers runtime) |
| Database | Cloudflare D1 (receipts_db) |
| Storage | Cloudflare R2 (BUCKET) |
| Image Processing | Client-side WebP via Canvas API |

## สถาปัตยกรรม

SPA พร้อม Cloudflare Pages Functions เป็น backend เส้นทาง API ทั้งหมดใต้ `/api/*` ถูกป้องกันโดย `_middleware.js` ยกเว้น `/api/auth/*` Auth ใช้ HttpOnly cookie ที่เซ็นด้วย HMAC

## จุดเริ่มต้น (Entry Points)

| ไฟล์ | หน้าที่ |
|------|---------|
| `src/main.tsx` | App bootstrap |
| `src/App.tsx` | Root component, routing, auth guard |
| `src/lib/auth-context.tsx` | Auth state management |
| `src/lib/api.ts` | API client (fetch helper) |
| `functions/api/_middleware.js` | Auth middleware สำหรับเส้นทาง `/api/*` ทั้งหมด |

## การจัดการสถานะ

React state ผ่าน hooks (`useReceipts`, `useCategories`) Theme ผ่าน React context Auth ผ่าน `AuthProvider` context

## การตัดสินใจหลัก

- auth แบบรหัสผ่านเดียว (ไม่มีลงทะเบียนผู้ใช้) สำหรับใช้ส่วนตัว
- บีบอัดรูปภาพฝั่ง client เป็น WebP ก่อนอัปโหลด (ลดการใช้พื้นที่)
- HttpOnly cookie ที่เซ็นด้วย HMAC สำหรับรักษาสถานะ session
- bottom nav บนมือถือ, sidebar บนเดสก์ท็อป

## ที่เกี่ยวข้อง

| ประเภท | ลิงก์ |
|------|------|
| Status | [status.md](./status.md) |
| Structure | [structure.md](./structure.md) |
| Dependencies | [dependencies.md](./dependencies.md) |
| Commands | [commands.md](./commands.md) |

## หลักฐาน

- `package.json`
- `wrangler.toml`
- `vite.config.ts`
- `schema.sql`
- `src/lib/auth-context.tsx`
