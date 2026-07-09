---
title: Project Status — clientdata
description: project-status from clientdata
---

# Project Status — clientdata

## Stack

- **Framework**: Next.js 16.2.9 (App Router)
- **UI Library**: React 19.2.7, TypeScript 6.0.3
- **UI System**: shadcn/ui + Base UI + Phosphor Icons
- **Styling**: Tailwind CSS 4.3.1 + PostCSS
- **Database**: Neon (Postgres) via server actions + API routes
- **Maps**: MapLibre GL JS (lazy-loaded via `next/dynamic`)
- **Auth**: Password-based (SHA-256), admin + viewer roles
- **Storage**: Supabase Storage (client images)
- **Deploy**: Vercel (serverless) — `master` → `data.mcky.space`
- **Font**: IBM Plex Sans Thai via `next/font/google`
- **Testing**: Vitest 1.6 + @testing-library/react + jsdom 24
- **Dark mode**: `next-themes` with `@custom-variant dark` in globals.css + Astryx theme

## Routes

- `/` — Main SPA (Dashboard / Map / Admin views via History API)
- `/c/[id]` — Public client page (server wrapper pattern)
- `/api/clients` — CRUD endpoints
- `/api/clients/search?q=` — Search by name/shopName
- `/api/suggestions` — Suggestions CRUD + approve/reject
- `/api/auth` — Password auth

## Components

| Component | Purpose |
|-----------|---------|
| Button | shadcn Button — variants: default, outline, secondary, ghost, destructive, link |
| Card | shadcn Card |
| Dialog | shadcn Dialog — `@base-ui/react/dialog`, `showCloseButton` prop |
| Sheet | shadcn Sheet — side panel overlay |
| Skeleton | Base animated skeleton primitive |
| TableSkeleton | Table row loading placeholder |
| SearchDropdown | Map view search results dropdown |
| MapPreviewDynamic | Lazy-loaded map preview wrapper |
| Sidebar | SideNav-based layout with collapsible sections |
| ThemePresetPicker | Dropdown with color swatches for 14 tweakcn theme presets |
| PhotoRequestDialog | Photo upload + send dialog (8 states self-contained) |
| Lightbox | Full-screen image viewer with prev/next navigation |

## API

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/clients` | GET | List all clients (with caching) |
| `/api/clients/search?q=` | GET | Search clients by name/shopName (ILIKE, max 10) |
| `/api/clients` | POST | Add client (duplicate check) |
| `/api/clients/[id]` | DELETE | Delete client |
| `/api/suggestions` | GET | Get suggestions for client (auth-gated) |
| `/api/suggestions` | POST | Create suggestion |
| `/api/suggestions/[id]/approve` | POST | Approve suggestion (transaction-protected) |
| `/api/suggestions/[id]/reject` | POST | Reject suggestion |
| `/api/auth` | POST | Password verification |
| `/api/auth?check=setup` | GET | Check auth setup (graceful error fallback) |

## Changelog

### 2026-07-08
- **Back-navigation removed**: removed nav stack + "stay where user left" persistence (popstate handler, history tracking)
- **Query perf**: combined 2 DB queries into 1, show cached data from localStorage while API response is pending
- **Gitignore cleanup**: cleaned up stale .gitignore entries

### 2026-07-07
- **Astryx spun off** (TASK-003, DEC-008): Astryx migration moved to separate repo `ktypez/astryx` with its own Vercel project at `astryx.mcky.space`. `master` stays on shadcn/ui + Base UI + Phosphor Icons, deployed at `data.mcky.space`.
- **Preset theme revert**: removed ThemePresetPicker/useThemePreset system, then reverted — preset picker restored
- **Search back fix**: reset search/filter state on browser back navigation (popstate handler)

### 2026-07-06 (night)
- **Keyword search**: `searchClients()` now splits query into individual words — each keyword matches via ILIKE on name/shopName, combined with AND. This means `!ลูกค้า all the wall` matches clients containing ALL of "all", "the", "wall" anywhere in name/shopName (not just the full phrase).

### 2026-07-06 (evening)
- **Lockfile sync** (`ec81036`): synced `pnpm-lock.yaml` with `package.json` — removed stale `@serwist/*` packages (304 line deletion)
- **Lint cleanup**: fixed 3 ref-access render errors, 5 warnings — removed unused imports (`setCachedClients`, `useReducer`, `progress`), converted `initialLoadDone` ref to state, fixed MapPicker/MapPreview dep warnings via ref sync in effects
- **Dep cleanup**: removed stale `@serwist/*` packages, removed unused `turbopack: {}` from next.config.ts

### 2026-07-06
- **Search bugfix** (`e8629ac`): reverted default query limit — search needs all clients for client-side filtering

### 2026-07-05
- **Loading UX overhaul** (commit `033290e`): Split loading gate — app shell (sidebar + header) now renders immediately while only the content area shows a skeleton. Added branded inline splash script in `<head>` (dark bg + centered pulsing icon) to eliminate blank screen between PWA splash and React hydration. Deleted `app/icon.svg` (conflicted with `favicon.svg` metadata). Changed all `dynamic()` loading callbacks from `<LoadingScreen />` to `null`.
- **Flexible client name validation** (commit `7ff117e`): Changed add/edit form to require name OR shopName (at least one) instead of only name. Updated AddClientForm, SuggestEditForm, validateClient, and suggestions API. Labels adjusted: name no longer `*`, shopName now `*`. Hint text shown when both empty.
- **Clientdata search API** (`688c203`): `GET /api/clients/search?q=xxx` — ILIKE on name + shopName, max 10 results; URL param `?q=xxx` pre-fills search (`7b51957`)
- **Performance fixes** (`c23ed82`, `f79280b`): SSR server component shell (`page.tsx`), removed `<Suspense>` boundary, DB index `clients_updated_at_idx` on `updated_at`, all dynamic imports now have skeleton loaders
- **PWA overhaul** (`8dd06d6`, `768f215`): SW rewritten — network-first shell cache for SPA routes, no offline/outbox/tile/image cache. Deleted `lib/sync/outbox.ts`, `components/OfflineSettings.tsx`, `hooks/useSyncStatus.ts`, `hooks/useStorageUsage.ts`. SW returns cached shell for SPA navigations. SW version stabilized to `v4` with proper cleanup + `SKIP_WAITING` handler (`74c26bd`)

### 2026-07-01
- **Code review batch 2**: Deduplicated SuggestionDiff, useGeolocation, useMapDarkMode; fixed empty catch blocks; React.memo SearchDropdown; removed lucide-react; cssVarToHex uses DOM getComputedStyle
- **Pins follow style presets**: `getPinColor()` reads `--pin-color` defaults to `--primary`

### 2026-06-30
- **CSS vars cascade from shadcn**: --surface, --text-primary etc. now reference shadcn vars
- **Sidebar**: migrated to shadcn sidebar classes
- **Map page**: pin colors, strokes follow presets
- **Code review batch**: consolidated copy handlers, binary search image compression, extracted PhotoRequestDialog/Lightbox, ClientDetail 966→744 lines

### Week 2026-06-28
- "+" button moved to header right side, sidebar stays open on desktop, font fix, all inputs 14px, outline button dark mode

### Week 2026-06-27
- Palette reworked to Claude warm palette, theme system deleted, dark mode toggle, dark basemaps

### Week 2026-06-26
- Theme system split, presets reduced 10→6, StylePicker redesigned, pin colors theme-aware

### Week 2026-06-22
- Redesign: sidebar → sheet drawer, IBM Plex Sans Thai, sonner removed, PWA tuned, Vitest setup, stack upgrade, code review (15 issues), design audit, CSS variables migration, skeletons, route planning

### 2026-06-15
- Initial Next.js 16 + Drizzle + Neon setup

## Design System

- **shadcn starter palette**: `:root` `--background: oklch(1 0 0)`, `--primary: oklch(0.205 0 0)`
- **Dark**: `--background: oklch(0.145 0 0)`
- **IBM Plex Sans Thai** primary font, applied as `--font-ibm-plex` CSS variable
- **Theme Preset Picker** — 14 tweakcn presets, swaps CSS vars for colors + shadows + spacing + tracking

## Data Model

### Clients
- Table: `clients` (Neon Postgres via Drizzle ORM)
- Fields: id, name, phone, address, images[], lat, lng, notes, created_at, updated_at

### Suggestions
- Table: `suggestions` — client_id, field, old_value, new_value, status, created_by
- Approval wrapped in db.transaction()

### Auth
- Admin accounts: scrypt + HMAC tokens, local `.auth-local.json` fallback

## Tests

| Module | Tests | What's tested |
|--------|-------|---------------|
| lib/utils.ts | 14 | cn, getMapsUrl, formatDateTime, formatDate, generateId, haversineKm, displayStep, cssVarToHex |
| hooks/useDebounce.ts | 2 | initial value, delayed update |

**Framework**: Vitest 1.6 + @testing-library/react + jsdom 24
**Lint**: 0 errors, 0 warnings (ESLint 9)

## Known Issues

- `useReducer` refactor of page.tsx deferred (30 tightly coupled useState hooks)
- Delete is immediate without undo (no toast/undo)
