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
- **PWA**: vite-plugin-pwa (injectManifest), Workbox
- **Backend**: Supabase Edge Functions (Deno)
- **Deploy**: Vercel (SPA rewrite) + Supabase
- **Testing**: Vitest (16 tests), ESLint, Prettier
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

### 2026-07-06
- Auth modal overlay (ModalWrapper) — intercepts navigation when session expires
- Fix: workbox dep resolution (missing v6 → use v7 from vite-plugin-pwa)
- SW `FORCE_RELOAD` on activate — kills all old tabs to ensure fresh SW

## Design

- 16 themes with gradient background + SVG noise texture
- Neobrutalist variant (hard shadows, thick borders)
- Glass effect for shinchan themes
- CSS custom properties with `--space-*` scale (2px to 30px)
- `toBuddhistYear()` for Thai calendar display

## PWA

- Cache version: `ezzy-truck-v4`
- Strategy: network-first for JS, cacheFirstWithFallback for non-JS, staleWhileRevalidate for icons/fonts
- Offline queue: localStorage mutation queue with exponential backoff replay

## Known Issues

- Reauthentication required before `sb.auth.updateUser()`
- Mutation invalidation: save that mutates `logs` must invalidate ALL of: `monthly-logs`, `yearly-logs`, `income`
- Avatar upload: Supabase Storage `avatars/{userId}/avatar.{ext}`, ≤2MB
- No `@ts-ignore` or `@ts-expect-error` allowed (use `as Record<string, any>`)
