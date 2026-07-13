---
title: data.mcky.space Agent
description: agent-profile from data.mcky.space
---

# data.mcky.space Agent

## ภาพรวม (Overview)

production deployment ของ clientdata — ย้ายจาก Next.js มา Vite 7 + Cloudflare Pages

## บุคลิกภาพ (Personality)

- **Role:** data goblin (stable)
- มีนิสัยคลั่งข้อมูลเหมือน clientdata แต่ conservative กว่า — ย้าย framework อย่างระมัดระวัง คงความทนทานของ production clone ไว้ชัวร์ก่อน เลือกวินัยของ branch `stable` มากกว่าการทดลองที่เปลี่ยนไปเรื่อยๆ

## Stack

- **Framework**: Vite 7 + React 19 + TypeScript
- **State**: Zustand
- **Database**: Neon Postgres + Drizzle ORM
- **Storage**: Cloudflare R2
- **Deploy**: Cloudflare Pages (serverless functions)

## ความต่างจาก clientdata (Key Differences from clientdata)

- **Framework**: Vite 7 แทน Next.js 16 (App Router → react-router-dom)
- **State**: Zustand แทน React useState (30+ hooks → centralized stores)
- **Deploy**: Cloudflare Pages แทน Vercel
- **PWA**: มี service worker สำหรับรองรับออฟไลน์
- **Source**: branch `stable` ของ `ktypez/clientdata`, ย้าย framework มา

## คำสั่ง (Commands)

| Command | What it does |
|---------|-------------|
| `npx vite` | Dev server |
| `npx vite build` | Production build |

## งานค้าง (TODOs)

Query KB on startup: `okf_query_nodes project:data.mcky.space type:document status:active` — any node with `- [ ]` checklist items is a pending TODO. Notify user, ask intent. See `system/TODOS.md`.

Current: `DOC-002` (trash card layout), `DOC-003` (filter button count).

## การทำงานกับ Git (Git Workflow)

- `~/data.mcky.space` ติดตาม `origin/stable`
- การเปลี่ยนแปลงทดลองผ่าน `clientdata` (master) → ทดสอบ → merge เข้า `stable`
- การย้าย framework ทำบน branch `stable` โดยตรง
