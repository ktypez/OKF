---
type: project-status
id: habby-status
project: habby
last_updated: 2026-07-21
status: active
links:
  profile: habby-profile
  agent: habby-agent
---

# สถานะโปรเจกต์ — habby

## Routes

| Path | หน้า (Page) | คำอธิบาย (Description) |
|------|------|-------------|
| `/` | Dashboard | ตาราง habit พร้อม streak, XP, มุมมองรายวัน |
| `/stats` | Stats | กราฟความก้าวหน้า, streak, ประวัติ level |
| `/settings` | Settings | Auth, notifications, สลับ theme |

## Changelog

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
- feat: เพิ่มชุดทดสอบ — Vitest + testing-library, 18 tests ครอบคลุมตรรกะ streak/XP/check-in

### 2026-06 (สัปดาห์ที่ 2)
- ยึดระบบดีไซน์ mcky.space: JetBrains Mono, 2-theme (light/dark), token แนว neobrutalist
- สคริปต์ migration: เคลียร์ archived habit ที่เป็น orphan ออกจาก Redis
- ลบ helper `$$` ที่ไม่ได้ใช้, แก้ indent, ความเข้ากันได้ของ digest badge ใน dark theme, กฎ CSS ที่ตาย

## Design

- แนว neobrutalist, รูปแบบ `.neo-card`
- 2 themes (light/dark) — dark ใช้ neutral charcoal palette
- JetBrains Mono (self-hosted)
- Card entrance animations (staggered, spring easing)
- Backdrop blur on modals
- Spring easing on XP bar, level-up overlay, toast notifications

## Features

- [x] Public mode — ใช้ได้เลยไม่ต้อง login, ข้อมูลใน localStorage
- [x] Owner mode — triple-tap logo → login → ข้อมูลใน Redis
- [x] Habit แบบ gamified พร้อมระบบ XP/leveling
- [x] Stopwatch timer ต่อ habit
- [x] ติดตาม streak พร้อม bonus XP
- [x] Daily digest
- [x] Browser push notifications (notification click handler)
- [x] Service worker สำหรับ offline caching
- [x] SHA-256 header-based auth (owner mode)
