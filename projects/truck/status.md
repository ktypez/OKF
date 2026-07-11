---
type: project-status
id: truck-status
project: truck
last_updated: 2026-07-11
status: active
freshness: 2026-07-11
verified: 2026-07-11
expires: null
superseded_by: null
anchors:
  - /home/truck/
links:
  - type: relates-to
    target: truck-profile
  - type: relates-to
    target: truck-agent
---

# Project Status — truck

## Stack

- **Framework**: React 19.2.7 + Vite 8 + TypeScript 6
- **Routing**: react-router-dom v7
- **Data**: TanStack React Query v5
- **UI**: Custom themes.css (16 themes: 5 light, 5 dark, 6 shinchan)
- **Auth**: Supabase Auth (email/password)
- **Database**: Supabase Postgres (timestamptz, Asia/Bangkok TZ)
- **Backend**: Supabase Edge Functions (Deno)
- **Deploy**: Vercel (SPA rewrite) + Supabase
- **Testing**: Vitest (90 tests), ESLint, Prettier
- **CI**: GitHub Actions
- **Integrations**: Telegram Bot API for account requests

## Routes

| Path | View | Description |
|------|------|-------------|
| `/` or `/daily` | DailyView | Daily log with shift type, hours, income |
| `/shifts` | ShiftCalendar | Month calendar with shift history |
| `/income` | IncomeView | Income breakdown: base, OT, holiday, total |
| `/history` | HistoryPage | Full log browser with filters |
| `/profile` | ProfilePage | User info, settings, admin panel |
| `/changelog` | Changelog | Release notes |

## Changelog

### 2026-07-08
- wrap-day: changelog + status update for July 8
- Code quality: typed interfaces, removed eslint-disable blocks, env var validation, async cancellation flags
- gitignore cleanup
- Admin user card: removed type badge, stacked type + reset
- Fix: holiday pay counted as salary (incomeBase), week boundary Mon-Sun

### 2026-07-11
- Removed PWA entirely: deleted vite-plugin-pwa, sw.js, SwUpdateToast, public/icons/
- Added SVG truck favicon (public/favicon.svg)
- Replaced motorbike favicon with proper truck SVG (cab + cargo box + wheels)

### 2026-07-06
- Auth modal overlay (ModalWrapper) — intercepts navigation when session expires

## Design

- 16 themes with gradient background + SVG noise texture
- Neobrutalist variant (hard shadows, thick borders)
- Glass effect for shinchan themes
- CSS custom properties with `--space-*` scale (2px to 30px)
- `toBuddhistYear()` for Thai calendar display

## PWA

Removed in 2026-07-11. Offline queue (localStorage mutation queue) still works independently without a service worker.

## Known Issues

- Reauthentication required before `sb.auth.updateUser()`
- Mutation invalidation: save that mutates `logs` must invalidate ALL of: `monthly-logs`, `yearly-logs`, `income`
- Avatar upload: Supabase Storage `avatars/{userId}/avatar.{ext}`, ≤2MB
- No `@ts-ignore` or `@ts-expect-error` allowed (use `as Record<string, any>`)
