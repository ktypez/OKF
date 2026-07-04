---
type: agent-profile
id: cafe-agent
project: cafe
last_updated: 2026-07-04
personality: barista engineer
status_ref: ./status.md
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: cafe-profile
  - type: relates-to
    target: cafe-status
  - type: relates-to
    target: cafe-structure
  - type: relates-to
    target: cafe-commands
  - type: relates-to
    target: workspace
---

# Cafe Agent

## Overview

Cafe LIFF — coffee shop ordering & management platform. Next.js 15 app router with drag-and-drop kanban, POS for walk-in orders, customer LIFF ordering via LINE, PromptPay payment, LINE notifications with receipt images, and delivery fee system.

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15.5.19 (App Router) + TypeScript 5.9.3 |
| UI | React 19.2.1 + Tailwind CSS 4.1.11 |
| Animation | motion 12.23.24 |
| Icons | lucide-react 0.553.0 |
| Database | Supabase (@supabase/supabase-js 2.108.2) |
| Storage | Cloudflare R2 (receipt images) |
| Utils | clsx, tailwind-merge, class-variance-authority |
| Payment | PromptPay QR payload generator (CRC16-XModem) |
| LINE | @line/bot-sdk (messaging API) |
| Receipt | playwright (headless Chromium) + html2canvas (client-side, 6x scale) |
| Sound | Web Audio API (6 sound types) |
| Auth | jose (JWT), admin@admin.com restriction |
| GPS | Haversine formula for delivery distance |

## Architecture

```
app/page.tsx → Admin Dashboard SPA (kanban / POS / sales)
app/liff/page.tsx → Customer LIFF ordering flow (LINE)
app/settings/page.tsx → Settings (menu + recipe management)
app/api/* → CRUD endpoints, LINE, auth
lib/ → Types, data store, Supabase, auth, LINE bot, receipt, R2, delivery fee
components/ → Admin UI, settings UI, shared ReceiptViewer
hooks/ → useLiff, useCustomer, useSound, useAuth, useToast, useIsMobile
```

## Key Patterns

- **Hybrid architecture**: Supabase queries with global in-memory fallback
- **Auto-seed**: Empty Supabase `menus` table auto-populated with 8 initial items
- **Real-time**: `subscribeToOrders()` subscribes to `postgres_changes` + 4s `setInterval` polling fallback
- **Receipt**: Shared HTML template (720px wide, compact text) — auto-scales to viewport
- **Delivery Fee**: GPS coordinates → Haversine distance → fee (฿5 base, +฿5/km, max ฿30, max 10km)
- **LINE Notifications**: Admin triggers → text (ready) or receipt image (completed)
- **All components**: shadcn pattern (cva + clsx + tailwind-merge + forwardRef)

## Commands

| Command | What it does |
|---------|-------------|
| `npx next dev -H localhost` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

## Triggers

### "update .md"

1. Read project AGENTS.md + current KB status
2. Update `projects/cafe/status.md` with latest changes
3. Update `projects/cafe/agent.md` (architecture, routes, components)
4. If project AGENTS.md has stale info, update it too

### "cleanup"

1. Scan unused imports, empty files, dead exports
2. Health check: `npm run lint` + `tsc --noEmit`
3. Deep scan: leftover dirs, `console.log`, TODO/FIXME
4. Present findings for user to choose
5. Update STATUS.md + KB agent file
6. Never cleanup `.env*`, `node_modules/`, `.next/`, `.git/`, or essential config

## Environment Variables

- `APP_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `LINE_CHANNEL_ACCESS_TOKEN`, `LINE_CHANNEL_SECRET`
- `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL`
- `NEXT_PUBLIC_CAFE_LAT`, `NEXT_PUBLIC_CAFE_LNG`

## Rules

- Light theme with Claude-inspired warm amber preset
- All components use shadcn pattern
- Thai labels everywhere (admin + LIFF)
- ReceiptViewer is canonical — do not modify without explicit instruction
- Admin restricted to `admin@admin.com` only
- Phone number is primary login for LIFF
- GPS required for delivery (no fallback), max distance 10km
