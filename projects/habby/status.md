---
type: project-status
id: habby-status
project: habby
last_updated: 2026-07-11
status: active
freshness: 2026-07-11
verified: 2026-07-11
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

# Project Status — habby

## Stack

- **Frontend**: Vite 6 + vanilla HTML/CSS/JS
- **Backend**: Express 5 (ESM) + ioredis (Upstash Redis)
- **Auth**: SHA-256 header-based
- **Deploy**: Vercel (static + serverless function)
- **Package Manager**: yarn
- **Testing**: Vitest + testing-library (21 tests)
- **PWA**: Service worker with push notifications
- **Font**: JetBrains Mono

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Dashboard | Habit grid with streaks, XP, daily view |
| `/stats` | Stats | Progress charts, streaks, level history |
| `/settings` | Settings | Auth, notifications, theme toggle |

## Changelog

### 2026-07-11
- chore: add AGENTS.md, gitignore cleanup

### 2026-07-04
- feat: add test suite — Vitest + testing-library, 21 tests covering streak/XP/check-in logic

### 2026-06 (Week 2)
- Adopted mcky.space design system: JetBrains Mono, 2-theme (light/dark), neobrutalist tokens
- Migration script: clean up orphaned archived habits from Redis
- Removed unused `$$` helper, fixed indent, dark theme digest badge compat, dead CSS rules

## Design

- Neobrutalist, `.neo-card` pattern
- 2 themes (light/dark)
- JetBrains Mono

## Data Model

- Redis hashes for: habits + dates + notes + timers
- Sorted set for habit ordering
- XP stored as integer (+10-40 per check-in, streak bonus)
- Level up every 100 XP

## Features

- [x] Gamified habits with XP/leveling system
- [x] Per-habit stopwatch timer
- [x] Streak tracking with bonus XP
- [x] Daily digest
- [x] Browser push notifications
- [x] PWA with offline support
- [x] SHA-256 header-based auth
