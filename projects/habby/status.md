---
type: project-status
id: habby-status
project: habby
last_updated: '2026-07-17'
status: active
freshness: '2026-07-17'
verified: 2026-07-13T00:00:00.000Z
expires: null
superseded_by: null
anchors:
  - /home/habby/
links:
  - type: relates-to
    target: habby-profile
  - type: relates-to
    target: habby-agent
---

# สถานะโปรเจกต์ — habby

## เทคโนโลยี (Stack)

- **Frontend**: Vite 8 + vanilla HTML/CSS/JS
- **Backend**: Express 5 (ESM) + ioredis (Upstash Redis)
- **Auth**: SHA-256 header-based (owner mode) + localStorage guest mode
- **Storage**: Dual-mode — localStorage (public guests) + Redis API (owner)
- **Deploy**: Vercel (static + serverless function)
- **Package Manager**: yarn
- **Testing**: Vitest + testing-library (21 tests)
- **PWA**: Service worker พร้อม push notifications
- **Font**: JetBrains Mono (self-hosted)

## เส้นทาง (Routes)

| Path | หน้า (Page) | คำอธิบาย (Description) |
|------|------|-------------|
| `/` | Dashboard | ตาราง habit พร้อม streak, XP, มุมมองรายวัน |
| `/stats` | Stats | กราฟความก้าวหน้า, streak, ประวัติ level |
| `/settings` | Settings | Auth, notifications, สลับ theme |

## บันทึกการเปลี่ยนแปลง (Changelog)

### 2026-07-17
- **feat: public localStorage mode** — เปิดให้ใช้งานได้เลยโดยไม่ต้อง login, ข้อมูลเก็บใน localStorage
- **feat: hidden owner login** — triple-tap บน 🎯 เพื่อเข้า owner mode (Redis)
- **refactor: StorageAdapter** — abstraction ที่ routing ไป localStorage หรือ Redis API ตาม mode
- **style: design refinements** — card entrance animations, backdrop blur modals, spring easing, refined spacing/typography
- **fix: dark theme** — เปลี่ยน palette เป็น neutral charcoal (#121212), ลบ purple tint
- **fix: add habit button** — แก้ปุ่ม "+ ADD" ที่ไม่ trigger click (Enter ทำงานแต่ button ไม่)
- Guest data ถูกลบเมื่อ owner login

### 2026-07-13
- **KB refresh**: แก้ไข frontmatter ซ้ำซ้อน, แก้คำสั่งเป็น `yarn` (commands.md), อัปเดต timestamps
- Sync OKF knowledge base across all 8 projects
- Updated workspace index with current project inventory
- Refreshed documentation timestamps and freshness

### 2026-07-11
- chore: เพิ่ม AGENTS.md, ทำความสะอาด gitignore

### 2026-07-04
- feat: เพิ่มชุดทดสอบ — Vitest + testing-library, 21 tests ครอบคลุมตรรกะ streak/XP/check-in

### 2026-06 (สัปดาห์ที่ 2)
- ยึดระบบดีไซน์ mcky.space: JetBrains Mono, 2-theme (light/dark), token แนว neobrutalist
- สคริปต์ migration: เคลียร์ archived habit ที่เป็น orphan ออกจาก Redis
- ลบ helper `$$` ที่ไม่ได้ใช้, แก้ indent, ความเข้ากันได้ของ digest badge ใน dark theme, กฎ CSS ที่ตาย

## การออกแบบ (Design)

- แนว neobrutalist, รูปแบบ `.neo-card`
- 2 themes (light/dark) — dark ใช้ neutral charcoal palette
- JetBrains Mono (self-hosted)
- Card entrance animations (staggered, spring easing)
- Backdrop blur on modals
- Spring easing on XP bar, level-up overlay, toast notifications

## โมเดลข้อมูล (Data Model)

### Owner mode (Redis)
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

### Guest mode (localStorage)
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

## ฟีเจอร์ (Features)

- [x] Public mode — ใช้ได้เลยไม่ต้อง login, ข้อมูลใน localStorage
- [x] Owner mode — triple-tap logo → login → ข้อมูลใน Redis
- [x] Habit แบบ gamified พร้อมระบบ XP/leveling
- [x] Stopwatch timer ต่อ habit
- [x] ติดตาม streak พร้อม bonus XP
- [x] Daily digest
- [x] Browser push notifications
- [x] PWA พร้อม offline support
- [x] SHA-256 header-based auth (owner mode)
