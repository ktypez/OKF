---
type: project-status
id: habby-status
project: habby
last_updated: 2026-07-04
state: active
documentation_completeness: Medium
confidence_level: High
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: habby-agent
  - type: relates-to
    target: habby-profile
  - type: relates-to
    target: habby-structure
---

# Project Status — habby

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Vite 6 + vanilla HTML/CSS/JS |
| Backend | Express 5 (serverless via Vercel) |
| Database | Redis (ioredis → Upstash) |
| Auth | SHA-256 header-based access password |
| Deploy | Vercel (static + serverless function) |
| PWA | Service Worker (push notifications, install prompt) |

## Routes

| Path | Purpose |
|------|---------|
| `/` | Main dashboard — habit grid, daily check-in, this week overview |
| `/stats` | Stats dashboard — 6 cards + bar chart (XP, streaks, completion %) |
| `/settings` | Auth, notifications config, theme picker |

## Changelog

### Week 2026-07-02
- **Redesign**: adopted mcky.space design system (DESIGN.md)
- Replaced Google Fonts with self-hosted JetBrains Mono
- Replaced 5-theme system with 2-theme (light/dark)
- Terminal-style login screen
- Added accessibility features

### Week 2026-06-22
- **Launch**: deployed to habby.mcky.space (Vercel)
- Auth, theme picker, cleanup, all core features

### 2026-06-15
- Initial rebuild as Vite + vanilla HTML/CSS/JS

## Design System

- **Theme**: 2 themes — light + dark via `data-theme` attribute
- **Style**: Neobrutalist, mcky.space design system
- **Tokens**: `--bg`, `--bg-raise`, `--border`, `--text`, `--muted`, 8 accent colors
- **Components**: `.neo-card` pattern (3px border, 6px radius, 4px shadow), terminal-style login
- **Typography**: JetBrains Mono (self-hosted WOFF2, `font-display: swap`)
- **Accessibility**: `:focus-visible`, `prefers-reduced-motion`, ARIA roles, `viewport-fit=cover`

## Data Model

```
habit:{id} → hash { name, emoji, color, archived, created_at }
habit:{id}:dates → set of ISO date strings
habit:{id}:note:{date} → string
habit:{id}:timer:running → timestamp
habit:{id}:timer:total → seconds
habits:all → sorted set
user:xp → integer
app:password → SHA-256 hash string
notifications:enabled → boolean
notifications:time → HH:MM string
```

## Known Issues

None currently.
