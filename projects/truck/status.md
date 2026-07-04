---
type: project-status
id: truck-status
project: truck
last_updated: 2026-07-04
state: active
documentation_completeness: High
confidence_level: High
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: truck-agent
  - type: relates-to
    target: truck-profile
  - type: relates-to
    target: truck-structure
---

# Project Status — truck

## Stack

- React 19 + Vite 8 + TypeScript 6 + Supabase (timestamptz, Asia/Bangkok)
- react-router-dom v7, @tanstack/react-query v5
- PWA via vite-plugin-pwa (injectManifest)
- Custom themes.css (16 themes, default: clean-light)
- Telegram Bot API for account requests
- Node v22.14.0 (ARM64 binary)

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` or `/daily` | DailyView | Shift logging daily view — DateSlider, ShiftBadge, OdometerCard, CounterCard, LeaveCard |
| `/shifts` | ShiftCalendar | Monthly shift calendar + leave summary |
| `/income` | IncomeView | Income/tax monthly view — HeroCard, SalaryBreakdown, TaxSummary |
| `/history` | History | Monthly history table |
| `/profile` | ProfilePage | Profile + yearly KPI + email/password + admin panel |
| `/changelog` | Changelog | What's New — 5 items/page + load more |

## API

### Edge Functions

| Function | Trigger | Purpose |
|----------|---------|---------|
| `approve-user` | Admin approves user | Sets status to approved, inserts user_profiles, Telegram notif |
| `get-all-users` | Admin opens UserManagement | Returns all users (admin-only) |
| `notify-telegram` | Request/approve/reject | Sends Telegram message to admin |

## Changelog

### 2026-07-03
- **Edge Functions**: locked down CORS using `ALLOWED_ORIGIN` environment variable
- **Code Review**: aligned cache invalidation keys, secured math boundaries in calculator

### 2026-07-02
- **Code Review Fixes**: memory leaks, error logging, skeleton placement, exponential retry backoff for offline queue
- **Theme (Modern → mcky.space)**: replaced Modern warm minimal with mcky.space neobrutalist

### Week 2026-06-22
- Node v22 upgrade, useCallback + formRef perf, unique idx migration, neobrutalist theme, RLS hardening, skeletons, component merge, dead code cleanup

### 2026-06-15
- Initial project setup

## Design System

- **16 themes**: 5 light, 5 dark, 6 shinchan
- **Picker**: 2-column grid (light/dark) + collapsible shinchan section
- **Clean light/dark**: gradient bg (160°) + SVG noise texture overlay (feTurbulence, 8% opacity)
- **Shinchan**: glass effect (`backdrop-filter: blur(8px)`) on cards, solid bg on modals
- **Neobrutalist**: vivid yellow bg, blue primary, 3px black borders, offset shadows
- **CSS custom properties**: `--primary`/`--primary-bg`/`--secondary` via attribute selector specificity
- **Spacing**: `--space-2xs`(2px) to `--space-3xl`(30px) used across all margin/padding/gap
- **Icons**: `@phosphor-icons/react` (tree-shaking via npm)

## Data Model

- **Income Settings**: `income_settings` table (key/value/label, 11 defaults)
- **Leave Counts**: Monthly from `monthly-logs` query, yearly from `yearly-logs` query
- **Offline Queue**: `saveLog()`/`removeLog()` attempt Supabase, fallback to localStorage + optimistic cache
- **Back Exit Confirm**: `navDepthRef` tracks forward nav depth; popstate decrements; confirm dialog on ≤ 0

## PWA

- **Install banner**: floats above navtab (bottom: 88px), dismissed state in localStorage
- **SW**: `registerSW({ immediate })`, cache version `ezzy-truck-v3`
- **Cache strategies**: `/assets/` JS → network-first; non-JS assets → cacheFirstWithFallback; icons/fonts → staleWhileRevalidate; pages/Supabase → networkFirst
- **Shortcuts**: /daily?today=1, /shifts, /income, /profile

## Tests

| File | Tests | Coverage |
|------|-------|----------|
| calculator.test.ts | 4 | base, round+OT, holiday, custom settings |
| OdometerCard.test.tsx | 7 | render, values, focus chain, save |
| OfflineBanner.test.tsx | 3 | online/offline toggling |
| *(review round 2)* | 2 | useMemo pattern, type safety |

## Known Issues

- CSS overrides use `!important` only when needed
- Module-level `Intl.DateTimeFormat` instance (don't recreate in render)
- localStorage key pattern: `last-saved-{userId}-{year}-{month}-{day}`
- Reauthentication: `signInWithPassword()` before `updateUser()`
- Avatar: Supabase Storage bucket `avatars`, path `{userId}/avatar.{ext}`, ≤2MB
