---
type: agent-profile
id: habby-agent
project: habby
last_updated: 2026-07-04
personality: trophy goblin
status_ref: ./status.md
status: active
freshness: 2026-07-04
verified: 2026-07-04
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

## Overview

Gamified habit tracker — Vite frontend + Express 5 backend + Redis (Upstash). Password-protected, neobrutalist design. 2 themes (light/dark), self-hosted JetBrains Mono font.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Vite 6 + vanilla HTML/CSS/JS |
| Backend | Express 5 (serverless via Vercel) |
| Database | Redis (ioredis → Upstash) |
| Auth | SHA-256 header-based access password |
| Deploy | Vercel (static + serverless function) |
| PWA | Service Worker (push notifications, install prompt) |

## Architecture

### Features

- **Habits**: CRUD with emoji picker, name, color
- **Check-ins**: Daily toggle, streak calculation, XP rewards
- **XP/Levels**: +10-40 XP per check-in (streak bonus), level up every 100 XP
- **Notes**: Daily notes per habit, edit/delete
- **Timer**: Per-habit stopwatch with total accumulation
- **Stats**: Total habits, XP, best streak, weekly completion %, bar chart
- **Digest**: Daily summary with done/pending counts and streaks
- **Notifications**: Configurable daily reminder (browser notif)
- **Themes**: 2 themes — light + dark via `data-theme` attribute
- **Auth**: Access password stored in Redis (SHA-256), persistent login via localStorage

### Data Model

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

## TODOs

Query KB on startup: `okf_query_nodes project:habby type:document status:active` — any node with `- [ ]` checklist items is a pending TODO. Notify user, ask intent. See `system/TODOS.md`.

## Commands

| Command | What it does |
|---------|-------------|
| `yarn dev` | Dev server (Express + Vite) |
| `yarn build` | Production build (Vite) |
| `node server.js` | Local full-stack (port 3001) |
| push to GitHub | Vercel auto-deploys |

## Triggers

### "update .md"

1. Read project AGENTS.md + current KB status
2. Update `projects/habby/status.md` with latest changes
3. Update `projects/habby/agent.md` (features, data model)
4. If project AGENTS.md has stale info, update it too

### "cleanup"

1. Scan unused files, empty files, dead exports
2. Health check: `yarn build`
3. Present findings for user to choose
4. Update STATUS.md + KB agent file
5. Never cleanup `.env*`, `node_modules/`, `dist/`, `.git/`, or essential config
