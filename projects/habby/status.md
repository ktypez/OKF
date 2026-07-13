---
type: project-status
id: habby-status
project: habby
last_updated: '2026-07-13'
status: active
freshness: '2026-07-13'
verified: 2026-07-11T00:00:00.000Z
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

---
type: project-status
id: habby-status
project: habby
last_updated: 2026-07-13
status: active
freshness: 2026-07-13
verified: 2026-07-13
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

- **Frontend**: Vite 6 + vanilla HTML/CSS/JS
- **Backend**: Express 5 (ESM) + ioredis (Upstash Redis)
- **Auth**: SHA-256 header-based
- **Deploy**: Vercel (static + serverless function)
- **Package Manager**: yarn
- **Testing**: Vitest + testing-library (21 tests)
- **PWA**: Service worker พร้อม push notifications
- **Font**: JetBrains Mono

## เส้นทาง (Routes)

| Path | หน้า (Page) | คำอธิบาย (Description) |
|------|------|-------------|
| `/` | Dashboard | ตาราง habit พร้อม streak, XP, มุมมองรายวัน |
| `/stats` | Stats | กราฟความก้าวหน้า, streak, ประวัติ level |
| `/settings` | Settings | Auth, notifications, สลับ theme |

## บันทึกการเปลี่ยนแปลง (Changelog)

### 2026-07-13
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
- 2 themes (light/dark)
- JetBrains Mono

## โมเดลข้อมูล (Data Model)

- Redis hashes สำหรับ: habits + dates + notes + timers
- Sorted set สำหรับเรียงลำดับ habit
- XP เก็บเป็น integer (+10-40 ต่อ check-in, มี streak bonus)
- Level up ทุก 100 XP

## ฟีเจอร์ (Features)

- [x] Habit แบบ gamified พร้อมระบบ XP/leveling
- [x] Stopwatch timer ต่อ habit
- [x] ติดตาม streak พร้อม bonus XP
- [x] Daily digest
- [x] Browser push notifications
- [x] PWA พร้อม offline support
- [x] SHA-256 header-based auth

