---
type: project-status
id: clientdata-status
project: clientdata
last_updated: 2026-07-04
state: active
documentation_completeness: High
confidence_level: High
---

# Project Status — clientdata

## Stack

- **Framework**: Next.js 16.2.9 (App Router)
- **UI Library**: React 19.2.7, TypeScript 6.0.3
- **Styling**: Tailwind CSS 4.3.1 + PostCSS + shadcn/ui components (Base UI)
- **Database**: Neon (Postgres) via server actions + API routes
- **Maps**: MapLibre GL JS (lazy-loaded via `next/dynamic`)
- **Auth**: Password-based (SHA-256), admin + viewer roles
- **Storage**: Supabase Storage (client images)
- **Deploy**: Vercel (serverless)
- **Font**: IBM Plex Sans Thai via `next/font/google`
- **Testing**: Vitest 1.6 + @testing-library/react + jsdom 24
- **Dark mode**: `next-themes` with `@custom-variant dark` in globals.css

## Routes

- `/` — Main SPA (Dashboard / Map / Admin views via History API)
- `/c/[id]` — Public client page (server wrapper pattern)
- `/api/clients` — CRUD endpoints
- `/api/suggestions` — Suggestions CRUD + approve/reject
- `/api/auth` — Password auth

## Components

| Component | Purpose |
|-----------|---------|
| Button | shadcn Button — variants: default, outline, secondary, ghost, destructive, link |
| Card | shadcn Card — `data-slot="card"`, `ring-1 ring-foreground/10` |
| Dialog | shadcn Dialog — `@base-ui/react/dialog`, `showCloseButton` prop |
| Sheet | shadcn Sheet — side panel overlay |
| Skeleton | Base animated skeleton primitive |
| TableSkeleton | Table row loading placeholder |
| SearchDropdown | Map view search results dropdown |
| MapPreviewDynamic | Lazy-loaded map preview wrapper |
| Sidebar | Sheet drawer with collapsible groups |
| ThemePresetPicker | Dropdown with color swatches for 14 tweakcn theme presets |
| PhotoRequestDialog | Photo upload + send dialog (8 states self-contained) |
| Lightbox | Full-screen image viewer with prev/next navigation |

## API

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/clients` | GET | List all clients (with caching) |
| `/api/clients` | POST | Add client (duplicate check) |
| `/api/clients/[id]` | DELETE | Delete client |
| `/api/suggestions` | GET | Get suggestions for client (auth-gated) |
| `/api/suggestions` | POST | Create suggestion |
| `/api/suggestions/[id]/approve` | POST | Approve suggestion (transaction-protected) |
| `/api/suggestions/[id]/reject` | POST | Reject suggestion |
| `/api/auth` | POST | Password verification |
| `/api/auth?check=setup` | GET | Check auth setup (graceful error fallback) |

## Changelog

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
- All inputs at `text-[14px] font-sans`

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

## Known Issues

- `/usr/bin/env` broken on Termux
- `useReducer` refactor of page.tsx deferred (30 tightly coupled useState hooks)
- Delete is immediate without undo (sonner removed)
- Cannot build locally (Node.js 18.19.1 too old for Next.js 16)
