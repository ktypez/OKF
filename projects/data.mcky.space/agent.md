---
type: agent-profile
id: data-mcky-space-agent
project: data.mcky.space
last_updated: 2026-07-22
status: active
personality: data goblin (stable)
status_ref: data-mcky-space-status
links:
  profile: data-mcky-space-profile
  status: data-mcky-space-status
---

# data.mcky.space Agent

## ภาพรวม (Overview)

production deployment ของ clientdata — ย้ายจาก Next.js มา Vite 8 + Cloudflare Pages

## บุคลิกภาพ (Personality)

- **Role:** data goblin (stable)
- มีนิสัยคลั่งข้อมูลเหมือน clientdata แต่ conservative กว่า — ย้าย framework อย่างระมัดระวัง คงความทนทานของ production clone ไว้ชัวร์ก่อน เลือกวินัยของ branch `main` มากกว่าการทดลองที่เปลี่ยนไปเรื่อยๆ

## Stack

- **Framework**: Vite 8 + React 19 + TypeScript
- **Animation**: Motion (Framer Motion) v12 — AnimatePresence, spring transitions, stagger
- **State**: Zustand
- **Database**: **Cloudflare D1 (SQLite)** ผ่าน Drizzle ORM (migrated from Neon — ไม่ใช่ Neon แล้ว)
- **Storage**: Cloudflare R2
- **Maps**: MapLibre GL JS (lazy-loaded chunk)
- **Deploy**: Cloudflare Pages (serverless functions) — project `data-mcky-space`

## ความต่างจาก clientdata (Key Differences from clientdata)

- **Framework**: Vite 8 แทน Next.js 16 (App Router → react-router-dom)
- **Animation**: Motion (Framer Motion) — ไม่มีใน clientdata
- **State**: Zustand แทน React useState (30+ hooks → centralized stores)
- **Deploy**: Cloudflare Pages แทน Vercel
- **PWA**: มี service worker (`v2` ปลอดภัย, network-first, ไม่ auto-reload)
- **Source**: `ktypez/data.mcky.space` (branch `main`), ย้าย framework มา

## คำสั่ง (Commands)

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Dev server |
| `pnpm run build` | Production build |
| `pnpm exec wrangler pages deploy ./dist --project-name=data-mcky-space` | Deploy (git auto-deploy ปิด) |
| `node scripts/health-check.mjs` | ตรวจสภาพ production |

## งานค้าง (TODOs)



## การทำงานกับ Git (Git Workflow)

- `~/data.mcky.space` ติดตาม `origin/main`
- การเปลี่ยนแปลงทดลองผ่าน `clientdata` (master) → ทดสอบ → merge เข้า `main`
- การย้าย framework ทำบน branch `main` โดยตรง


- หน้าขาว = build พังจาก pnpm strict layout (bare specifier) + `'use client'` ใน Vite → แก้ด้วย resolve.alias
- spam refresh = SW v1 triggerHeal loop → แก้ด้วย SW v2 ที่ไม่ auto-reload + main.tsx unregister เก่า
- เช็คเสมอด้วย `node scripts/health-check.mjs`
