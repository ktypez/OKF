---
type: agent-profile
id: habby-agent
project: habby
last_updated: 2026-07-21T00:00:00.000Z
status: active
personality: trophy goblin
status_ref: habby-status
links:
  profile: habby-profile
  status: habby-status
title: Habby Agent
description: ''
tags:
  - habby
  - react
  - golang
  - game
  - agent
timestamp: Tue Jul 21 2026 00:00:00 GMT+0000 (Coordinated Universal Time)T12:00:00Z
---

# Habby Agent

## ภาพรวม

แอปติดตาม habit แบบ gamified — frontend ใช้ Vite 8 + vanilla HTML/CSS/JS, backend ใช้ Express 5 + Redis (Upstash) มีดีไซน์แนว neobrutalist รองรับ 2 themes (light/dark) ใช้ฟอนต์ JetBrains Mono แบบ self-hosted เปิดให้ใช้งานได้เลยแบบ public (localStorage) โดยไม่ต้อง login

## บุคลิก

- **Role:** trophy goblin
- ขับเคลื่อนด้วย streak, XP และการ level up ฉลองชัยชนะเล็กๆ ไล่ล่าสถิติความสำเร็จ และรักษาลูป habit ให้สนุก

## เทคโนโลยี (Stack)

| ชั้น (Layer) | เทคโนโลยี |
|-------|------|
| Frontend | Vite 8 + vanilla HTML/CSS/JS |
| Backend | Express 5 (serverless ผ่าน Vercel) |
| Database | Redis (ioredis → Upstash) — owner mode เท่านั้น |
| Storage | localStorage (guest mode) + Redis API (owner mode) |
| Auth | SHA-256 header-based access password (owner mode) |
| Deploy | Vercel (static + serverless function) |
| PWA | Service Worker (caching + notification clicks, ไม่มี manifest) |

## สถาปัตยกรรม

### โหมดการใช้งาน (Modes)

| Mode | Trigger | Storage | Auth |
|------|---------|---------|------|
| **Guest** (default) | เปิด app ไม่มี stored password | localStorage | ไม่มี |
| **Owner** | Triple-tap 🎯 logo → password | Redis via API | SHA-256 |

### StorageAdapter

ใช้ `Storage` object ที่ routing ทุก operation ไป localStorage หรือ Redis API ตาม mode:
- `Storage.getHabits()`, `Storage.addHabit()`, `Storage.deleteHabit()`
- `Storage.checkin()`, `Storage.undoCheckin()`
- `Storage.saveNote()`, `Storage.startTimer()`, `Storage.stopTimer()`
- `Storage.getStats()`, `Storage.getDigest()`
- `Storage.getNotifSettings()`, `Storage.saveNotifSettings()`

### ฟีเจอร์

- **Public mode** — ใช้ได้เลยไม่ต้อง login, ข้อมูลเก็บใน localStorage
- **Owner mode** — triple-tap logo เพื่อเข้าสู่ Redis-backed mode
- **Habits**: CRUD พร้อม emoji picker, ชื่อ, สี
- **Check-ins**: toggle รายวัน, คำนวณ streak, ให้ XP rewards
- **XP/Levels**: +10-40 XP ต่อการ check-in (มี streak bonus), level up ทุก 100 XP
- **Notes**: note รายวันต่อ habit, แก้ไข/ลบได้
- **Timer**: stopwatch ต่อ habit พร้อมสะสมเวลารวม
- **Stats**: จำนวน habit ทั้งหมด, XP, best streak, % ทำได้รายสัปดาห์, bar chart
- **Digest**: สรุปรายวันพร้อมนับ done/pending และ streak
- **Notifications**: ตั้งเตือนรายวันได้ (browser notif)
- **Themes**: 2 themes — light + dark ผ่าน attribute `data-theme`
- **Auth**: access password เก็บใน Redis (SHA-256), login ค้างผ่าน localStorage
- **Design**: neobrutalist, card entrance animations, backdrop blur modals, spring easing

### โมเดลข้อมูล (Data Model)

#### Owner mode (Redis)
```
habit:{id} → hash { name, emoji, color, archived, created_at }
habit:{id}:dates → set of ISO date strings
habit:{id}:note:{date} → string
habit:{id}:timer:running → timestamp
habit:{id}:timer:total → seconds
habits:all → sorted set (ordered by creation)
user:xp → integer
app:password → SHA-256 hash string
notifications:enabled → boolean
notifications:time → HH:MM string
```

#### Guest mode (localStorage)
```
habby:habits → Array of habit objects
habby:habit:{id}:dates → Array of ISO date strings
habby:habit:{id}:note:{date} → string
habby:habit:{id}:timer:total → number (seconds)
habby:habit:{id}:timer:running → number|null (timestamp)
habby:xp → number
habby:notif:enabled → boolean
habby:notif:time → HH:MM string
```

## คำสั่ง (Commands)

| คำสั่ง (Command) | ทำอะไร |
|---------|-------------|
| `yarn dev` | Dev server (Vite + Express proxy) |
| `yarn build` | Production build (Vite) |
| `node server.js` | Local full-stack (port 3001) |
| push to GitHub | Vercel auto-deploys |

## ตัวกระตุ้น (Triggers)

### "update .md"

1. อ่าน project AGENTS.md + สถานะ KB ปัจจุบัน
2. อัปเดต `projects/habby/status.md` ด้วยการเปลี่ยนแปลงล่าสุด
3. อัปเดต `projects/habby/agent.md` (ฟีเจอร์, โมเดลข้อมูล)

### "cleanup"

1. สแกนไฟล์ที่ไม่ได้ใช้, ไฟล์ว่าง, export ที่ตาย
2. ตรวจสุขภาพ: `yarn build`
3. นำผลมาให้ user เลือก
4. อัปเดต STATUS.md + ไฟล์ agent ใน KB
5. ห้าม cleanup `.env*`, `node_modules/`, `dist/`, `.git/` หรือ config ที่จำเป็น
