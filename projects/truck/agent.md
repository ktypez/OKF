---
type: agent-profile
id: truck-agent
project: truck
last_updated: 2026-07-11
personality: overtime enthusiast
status_ref: ./status.md
status: active
freshness: 2026-07-06
verified: 2026-07-06
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: truck-profile
  - type: relates-to
    target: truck-status
  - type: relates-to
    target: truck-structure
  - type: relates-to
    target: truck-commands
  - type: relates-to
    target: workspace
---

# Truck Agent

## Overview

Shift logging & income app for truck drivers. React 19 + Supabase with 16 themes and Telegram bot integration.

## Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 + Vite 8 + TypeScript 6 |
| Routing | react-router-dom v7 |
| Data Fetching | tanstack/react-query v5 |
| Database | Supabase (Postgres) |
| Auth | Supabase Auth |
| Styling | Custom themes.css (16 themes) |
| Notifications | Telegram Bot API |
| Deployment | Vercel (SPA rewrite) |

## Architecture

```
main.tsx → App.tsx (auth gate + session + theme)
         → AppRoutes.tsx (lazy-loaded: DailyView, ShiftCalendar, History, IncomeView, ProfilePage, Changelog, AdminPanel, UserManagement, IncomeSettings)
         → ErrorBoundary wrapper per route
         → Supabase (sb) + ReactQuery (monthly-logs, day-log, income, yearly-logs)
          → offlineQueue (localStorage mutation queue, auto-replay on reconnect)
         → AuthScreen (sign-in / request account via Telegram)
```

### Directory Map

| Directory | Responsibility |
|-----------|---------------|
| `src/lib/` | Supabase client (`sb`), offline mutation queue (`offlineQueue`) |
| `src/hooks/` | `useOnlineStatus`, `useFocusTrap`, `usePendingSyncCount` |
| `src/utils/` | `calculateIncome()`, shift helpers |
| `src/components/` | UI — 6 views + shared components |
| `src/components/daily/` | Daily logging (DateSlider, ShiftBadge, OdometerCard, CounterCard, LeaveCard) |
| `src/components/shifts/` | Monthly calendar (CalendarGrid, ShiftModal, ShiftSummary) |
| `src/components/history/` | Historical browsing |
| `src/components/income/` | Salary breakdown (HeroCard, SalaryBreakdown, TaxSummary) |
| `src/components/profile/` | Profile management modals |
| `src/components/skeletons/` | Loading skeletons (DailyView, ShiftCalendar, IncomeView) |
| `supabase/functions/` | Edge functions (approve-user, get-all-users, notify-telegram) |

## Key Patterns

- **Auth gate**: checks Supabase session → shows ModalWrapper with AuthScreen overlay on main app (z-index 9999, non-dismissible)
- **Toast**: `useToast()` from ToastContext — never `alert()` or `console.log()`
- **Modal pattern**: `.modal-backdrop` (fadeIn) + `.modal-content` (scaleIn)
- **Admin gate**: `user_profiles.is_admin` DB query (not hardcoded email)
- **Offline queue**: saves mutations to localStorage, replays on reconnect with exponential backoff (no service worker — independent)
- **Focus trap**: `useFocusTrap(active, ref, onClose?)` in modals
- **Skeleton loaders**: Theme-aware CSS skeleton for 3 views
- **Mutation invalidation contract**: saves mutating `logs` must invalidate ALL of: `['monthly-logs', userId, year, month]`, `['yearly-logs', userId, year]`, `['income', userId, year, month]`
- **Performance ref pattern**: `formRef` object + `useCallback` with minimal deps to prevent memo'd children from re-rendering

## Commands

| Command | What it does |
|---------|-------------|
| `node node_modules/.bin/vite` | Dev server |
| `node node_modules/vite/bin/vite.js build` | Production build |
| `node node_modules/.bin/vitest run` | Run tests (90 tests) |
| `node node_modules/.bin/eslint src/` | Lint |
| `node node_modules/.bin/prettier --write src/` | Format |

## Triggers

### "update .md"

1. Read project AGENTS.md + current KB status
2. Update `projects/truck/status.md` with latest changes
3. Update `projects/truck/agent.md` (architecture, patterns)
4. If project AGENTS.md has stale info, update it too

### "wrap-day"

1. Read diff, Changelog, STATUS.md
2. Add Thai summary to `src/components/Changelog.tsx` as new `v{YYYY.MM.DD}` entry
3. Update STATUS.md — Components / Data Flow / Constraints
4. `git add` + commit `"docs: wrap-day {YYYY-MM-DD}"`
5. Only touch Changelog.tsx and STATUS.md

### "cleanup"

1. Scan unused imports, empty files, dead exports
2. Health check: `tsc --noEmit` + build
3. Deep scan: leftover dirs, `vite.log`, `console.log`, TODO/FIXME
4. Present findings for user to choose
5. Update STATUS.md + project AGENTS.md
6. Never cleanup `.env*`, `node_modules/`, `dist/`, `.git/`, or essential config

## Environment Variables

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_TELEGRAM_BOT_TOKEN`
- `VITE_TELEGRAM_CHAT_ID`

## Rules

- `oldString` must be short & precise — avoid long code blocks in edits
- Always read the latest file version before editing

### Termux Environment

| Tool | Notes |
|------|-------|
| Node.js | v22.14.0 (ARM64) — use `node` directly. `.bin/` files are shell scripts. |
| Supabase CLI | CI only: `supabase/setup-cli@v1` in GitHub Actions |
| cwebp | Available — `cwebp -q 80 input.jpg -o output.webp` |
| sharp / ffmpeg | Not available |
