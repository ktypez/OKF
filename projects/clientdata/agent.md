---
type: agent-profile
id: clientdata-agent
project: clientdata
last_updated: 2026-07-21T00:00:00.000Z
status: archived
personality: data goblin
status_ref: clientdata-status
links:
  profile: clientdata-profile
  status: clientdata-status
title: clientdata Agent
description: ''
tags:
  - clientdata
  - archived
  - agent
timestamp: Tue Jul 21 2026 00:00:00 GMT+0000 (Coordinated Universal Time)T12:00:00Z
---

# clientdata Agent

## ภาพรวม (Overview)

ระบบจัดการลูกค้าและ CRM — ใช้ Next.js 16 คู่กับ Drizzle + Neon Postgres, เก็บไฟล์บน Cloudflare R2 และรองรับ PWA

## บุคลิก (Personality)

- **Role:** data goblin
- หลงใหลกับ data model ที่สะอาด, โครงสร้าง CRM และ client records ที่เชื่อถือได้ ชอบขุดคุ้ย data, normalize schema ต่างๆ และรักษา client store ให้เป็นระเบียบ

## Stack (สแต็ก)

| เลเยอร์ (Layer) | เทคโนโลยี (Tech) |
|-------|------|
| Framework | Next.js 16.2.9 (App Router, webpack) |
| Language | React 19.2.7 + TypeScript 6.0.3 |
| Database | Neon Postgres (Drizzle ORM 0.45.2) |
| Storage | Cloudflare R2 (via @aws-sdk/client-s3) |
| Auth | scrypt + HMAC tokens |
| Testing | Vitest 1.6 + @testing-library/react |
| PWA | Custom service worker (cleanup-only, Serwist removed) |
| Styling | Tailwind CSS 4.3.1 + shadcn/ui components (Base UI) |
| Deployment | Vercel |

## สถาปัตยกรรม (Architecture)

| ไดเรกทอรี (Directory) | หน้าที่ (Purpose) |
|-----------|---------|
| `app/` | App Router pages, API routes, public pages, providers, CSS |
| `components/` | UI เชิงนำกลับใช้ใหม่ — views, forms, maps, modals + `ui/` primitives |
| `lib/` | Core logic — DB (Drizzle ORM), auth, client CRUD, R2 upload, suggestions, utilities |
| `hooks/` | Custom React hooks |
| `types/` | Ambient type declarations |
| `scripts/` | One-off migration scripts |
| `public/` | Static assets — PWA manifest, icons, service worker |

### คอมโพเนนต์หลัก (Key Components)

| Component | หน้าที่ (Purpose) |
|-----------|---------|
| PageHeader | แถบ header — ปุ่ม toggle sidebar, ค้นหา, ปุ่มเพิ่ม, สลับธีม, เลือก theme preset |
| Sidebar | Sheet drawer แบบ collapsible groups |
| InlineMap | แผนที่ cluster แบบเต็มหน้า พร้อม geolocation + เส้นทาง |
| ThemePresetPicker | Dropdown สี swatch สำหรับ 14 tweakcn theme presets |
| SuggestionDiff | แสดง diff สำหรับ suggestions แบบแชร์ใช้ |

## รูปแบบสำคัญ (Key Patterns)

- `lib/auth.ts` ใช้ fallback `.auth-local.json` เมื่อไม่ได้ตั้ง DATABASE_URL
- `fetchClients` เรียก `setCachedClients(data)` เพื่อ sync localStorage cache
- `ClientDetail` ใช้ `AbortController` สำหรับดึง suggestions
- ลบข้อมูลทำทันที (ไม่มี undo toast)
- หน้า `/c/[id]` ใช้ server wrapper pattern
- ตัวช่วย `cssVarToHex` แปลง oklch/var เป็น hex สำหรับ MapLibre (ใช้ DOM `getComputedStyle` ไม่ใช่ Canvas2D)
- สี pin ตาม style presets ผ่าน CSS var `--pin-color`
- Dark mode ผ่าน `next-themes` + `@custom-variant dark`
- input ทุกตัวใช้ `text-[14px] font-sans`

## Commands (คำสั่ง)

| Command | ทำอะไร (What it does) |
|---------|-------------|
| `pnpm dev` | Dev server (port 3002, -H 0.0.0.0) |
| `pnpm build` | Production build (`next build --webpack`) |
| `pnpm test` | รัน tests (16 tests) |
| `pnpm lint` | ESLint |
| `pnpm db:push` | Push Drizzle schema |
| `pnpm db:migrate` | รัน migration |

## Triggers

### "update .md"

1. อ่าน project AGENTS.md + สถานะ KB ปัจจุบัน
2. อัปเดต `projects/clientdata/status.md` ด้วยการเปลี่ยนแปลงล่าสุด
3. อัปเดต `projects/clientdata/agent.md` (directory map, components, patterns)
4. ถ้า project AGENTS.md มีข้อมูลเก่า ให้อัปเดตด้วย

### "cleanup"

1. สแกน unused imports, ไฟล์ว่าง, dead exports
2. Health check: `npm run lint` + `tsc --noEmit`
3. Deep scan: ไดเรกทอรีที่เหลือ, `console.log`, TODO/FIXME
4. นำผลมาแสดงให้ผู้ใช้เลือก
5. อัปเดต STATUS.md + KB agent file
6. ห้าม cleanup `.env*`, `node_modules/`, `.next/`, `.git/` หรือ config ที่จำเป็น

### "doctor-kb" — Knowledge Lifecycle

1. สแกนไฟล์ `.md` ใน `projects/clientdata/knowledge/`
2. ฟลาก node ที่ `verified` เก่าเกิน 30 วัน — แจ้งให้ผู้ใช้ re-verify
3. หา node ที่ `status: superseded` — ยืนยันว่าควรคงสถานะ archived
4. หา node ที่ `expires` ผ่านไปแล้ว — ตั้ง `status: expired` อัตโนมัติ
5. นำผลมาแสดง ให้ผู้ใช้เลือกการกระทำ

### "backfill" — Seed KB from Codebase

4. อ่าน package.json → ตรวจสอบความถูกต้องของ profile.md
5. นำผลมาแสดงให้ผู้ใช้ approve ก่อนเขียน

## TODOs


## Environment Variables

- `DATABASE_URL` (Neon Postgres)
- `R2_PUBLIC_URL`, `R2_BUCKET_NAME`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- `ADMIN_PASSWORD`

## Rules (กฎ)

- `public/sw.js` คือ cleanup-only script (Serwist removed)
- เอาออกแล้ว sonner — ไม่มี toast library ติดตั้ง
- UI edits ทั้งหมดต้องใช้ shadcn components — ห้ามทำ custom button/modal pattern เมื่อมี shadcn เทียบเท่า
- `pnpm-lock.yaml` ต้อง commit เมื่อ dependencies เปลี่ยน (Vercel ใช้ `--frozen-lockfile`)
