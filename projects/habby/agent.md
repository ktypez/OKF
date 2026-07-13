---
type: agent-profile
id: habby-agent
project: habby
last_updated: '2026-07-13'
personality: trophy goblin
status_ref: ./status.md
status: active
freshness: '2026-07-13'
verified: '2026-07-13'
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: habby-profile
  - type: relates-to
    target: habby-status
  - type: relates-to
    target: habby-structure
  - type: relates-to
    target: habby-commands
  - type: relates-to
    target: workspace
---


# Habby Agent

## ภาพรวม

แอปติดตาม habit แบบ gamified — ฝั่ง frontend ใช้ Vite + backend ใช้ Express 5 + Redis (Upstash) ป้องกันด้วย password มีดีไซน์แนว neobrutalist รองรับ 2 themes (light/dark) และใช้ฟอนต์ JetBrains Mono แบบ self-hosted

## บุคลิก

- **Role:** trophy goblin
- ขับเคลื่อนด้วย streak, XP และการ level up ฉลองชัยชนะเล็กๆ ไล่ล่าสถิติความสำเร็จ และรักษาลูป habit ให้สนุก

## เทคโนโลยี (Stack)

| ชั้น (Layer) | เทคโนโลยี |
|-------|------|
| Frontend | Vite 6 + vanilla HTML/CSS/JS |
| Backend | Express 5 (serverless ผ่าน Vercel) |
| Database | Redis (ioredis → Upstash) |
| Auth | SHA-256 header-based access password |
| Deploy | Vercel (static + serverless function) |
| PWA | Service Worker (push notifications, install prompt) |

## สถาปัตยกรรม

### ฟีเจอร์

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

### โมเดลข้อมูล (Data Model)

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

## งานที่ต้องทำ (TODOs)

Query KB ตอนเริ่มรัน: `okf_query_nodes project:habby type:document status:active` — node ใดที่มี checklist `- [ ]` ถือเป็น TODO ที่ค้างอยู่ แจ้ง user แล้วถามความตั้งใจ ดูเพิ่มที่ `system/TODOS.md`

## คำสั่ง (Commands)

| คำสั่ง (Command) | ทำอะไร |
|---------|-------------|
| `yarn dev` | Dev server (Express + Vite) |
| `yarn build` | Production build (Vite) |
| `node server.js` | Local full-stack (port 3001) |
| push to GitHub | Vercel auto-deploys |

## ตัวกระตุ้น (Triggers)

### "update .md"

1. อ่าน project AGENTS.md + สถานะ KB ปัจจุบัน
2. อัปเดต `projects/habby/status.md` ด้วยการเปลี่ยนแปลงล่าสุด
3. อัปเดต `projects/habby/agent.md` (ฟีเจอร์, โมเดลข้อมูล)
4. ถ้า project AGENTS.md มีข้อมูลเก่า ให้อัปเดตตามด้วย

### "cleanup"

1. สแกนไฟล์ที่ไม่ได้ใช้, ไฟล์ว่าง, export ที่ตาย
2. ตรวจสุขภาพ: `yarn build`
3. นำผลมาให้ user เลือก
4. อัปเดต STATUS.md + ไฟล์ agent ใน KB
5. ห้าม cleanup `.env*`, `node_modules/`, `dist/`, `.git/` หรือ config ที่จำเป็น

