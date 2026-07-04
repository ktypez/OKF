---
type: agent-profile
id: clientdata-agent
project: clientdata
last_updated: 2026-07-04
personality: data goblin
status_ref: ./status.md
---

# clientdata Agent

## Overview

Client management & CRM — Next.js 16 with Drizzle + Neon Postgres, Cloudflare R2 file storage, and PWA support.

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router, webpack) |
| Language | React 19 + TypeScript |
| Database | Neon Postgres (Drizzle ORM) |
| Storage | Cloudflare R2 |
| Auth | scrypt + HMAC tokens |
| Testing | Vitest 1.6 + @testing-library/react |
| PWA | Serwist removed (cleanup-only sw) |
| Styling | Tailwind + CSS custom properties + shadcn/ui components |
| Deployment | Vercel |

## Architecture

| Directory | Purpose |
|-----------|---------|
| `app/` | App Router pages, API routes, public pages, providers, CSS |
| `components/` | Reusable UI — views, forms, maps, modals + `ui/` primitives |
| `lib/` | Core logic — DB (Drizzle ORM), auth, client CRUD, R2 upload, suggestions, utilities |
| `hooks/` | Custom React hooks |
| `types/` | Ambient type declarations |
| `scripts/` | One-off migration scripts |
| `public/` | Static assets — PWA manifest, icons, service worker |

### Key Components

| Component | Purpose |
|-----------|---------|
| PageHeader | Header bar — sidebar toggle, search, add button, theme toggle, theme preset picker |
| Sidebar | Sheet drawer with collapsible groups |
| InlineMap | Full-page cluster map with geolocation + route |
| ThemePresetPicker | Dropdown with color swatches for 14 tweakcn theme presets |
| SuggestionDiff | Shared diff display for suggestions |

## Key Patterns

- `lib/auth.ts` uses `.auth-local.json` fallback when DATABASE_URL is unset
- `fetchClients` calls `setCachedClients(data)` to sync localStorage cache
- `ClientDetail` uses `AbortController` for suggestions fetch
- Delete is immediate (no undo toast)
- `/c/[id]` page uses server wrapper pattern
- `cssVarToHex` helper converts oklch/var to hex for MapLibre compatibility (uses DOM `getComputedStyle`, not Canvas2D)
- Pin colors follow style presets via `--pin-color` CSS var
- Dark mode via `next-themes` + `@custom-variant dark`
- All inputs at `text-[14px] font-sans`

## Commands

| Command | What it does |
|---------|-------------|
| `npx next dev -H localhost` | Dev server (port 3002) |
| `npm run build` | Production build (`next build --webpack`) |
| `pnpm test` | Run tests (16 tests) |
| `npm run lint` | ESLint |
| `npm run db:push` | Push Drizzle schema |
| `npm run db:migrate` | Run migration |

## Triggers

### "update .md"

1. Read project AGENTS.md + current KB status
2. Update `projects/clientdata/status.md` with latest changes
3. Update `projects/clientdata/agent.md` (directory map, components, patterns)
4. If project AGENTS.md has stale info, update it too

### "cleanup"

1. Scan unused imports, empty files, dead exports
2. Health check: `npm run lint` + `tsc --noEmit`
3. Deep scan: leftover dirs, `console.log`, TODO/FIXME
4. Present findings for user to choose
5. Update STATUS.md + KB agent file
6. Never cleanup `.env*`, `node_modules/`, `.next/`, `.git/`, or essential config

## Environment Variables

- `DATABASE_URL` (Neon Postgres)
- `R2_PUBLIC_URL`, `R2_BUCKET_NAME`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- `ADMIN_PASSWORD`

## Rules

- `public/sw.js` is cleanup-only script (Serwist removed)
- sonner removed — no toast library installed
- All UI edits must use shadcn components — no custom button/modal patterns when shadcn equivalent exists
