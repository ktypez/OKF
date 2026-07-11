---
type: agent-profile
id: clientdata-agent
project: clientdata
last_updated: 2026-07-04
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
personality: data goblin
status_ref: ./status.md
anchors:
  - /home/clientdata/app/
  - /home/clientdata/lib/
  - /home/clientdata/components/
links:
  - type: relates-to
    target: clientdata-profile
  - type: relates-to
    target: clientdata-status
  - type: relates-to
    target: clientdata-structure
  - type: relates-to
    target: clientdata-commands
  - type: relates-to
    target: workspace
---

# clientdata Agent

## Overview

Client management & CRM — Next.js 16 with Drizzle + Neon Postgres, Cloudflare R2 file storage, and PWA support.

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16.2.9 (App Router, webpack) |
| Language | React 19.2.7 + TypeScript 6.0.3 |
| Database | Neon Postgres (Drizzle ORM 0.45.2) |
| Storage | Cloudflare R2 (via @aws-sdk/client-s3) |
| Auth | scrypt + HMAC tokens |
| Testing | Vitest 1.6 + @testing-library/react |
| PWA | Custom service worker (cleanup-only, Serwist removed) |
| Styling | Tailwind CSS 4.3.1 + shadcn/ui components (Base UI) |
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
| `pnpm dev` | Dev server (port 3002, -H 0.0.0.0) |
| `pnpm build` | Production build (`next build --webpack`) |
| `pnpm test` | Run tests (16 tests) |
| `pnpm lint` | ESLint |
| `pnpm db:push` | Push Drizzle schema |
| `pnpm db:migrate` | Run migration |

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

### "doctor-kb" — Knowledge Lifecycle

1. Scan `.md` files in `projects/clientdata/knowledge/`
2. Flag nodes where `verified` is 30+ days old — prompt user to re-verify
3. Find nodes with `status: superseded` — confirm they should stay archived
4. Find nodes with `expires` date passed — auto-set `status: expired`
5. Present findings, let user choose actions

### "backfill" — Seed KB from Codebase

1. Scan git log for commit messages → extract decisions as DEC-* nodes
2. Scan project directory structure → create COMP-* component nodes
3. Read existing docs (README, DESIGN.md, etc.) → extract lessons as LSN-*
4. Read package.json → verify profile.md dependency accuracy
5. Present findings for user approval before writing

## TODOs

Query KB on startup: `okf_query_nodes project:clientdata type:document status:active` — any node with `- [ ]` checklist items is a pending TODO. Notify user, ask intent. See `system/TODOS.md`.

## Environment Variables

- `DATABASE_URL` (Neon Postgres)
- `R2_PUBLIC_URL`, `R2_BUCKET_NAME`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- `ADMIN_PASSWORD`

## Rules

- `public/sw.js` is cleanup-only script (Serwist removed)
- sonner removed — no toast library installed
- All UI edits must use shadcn components — no custom button/modal patterns when shadcn equivalent exists
- `pnpm-lock.yaml` must be committed when dependencies change (Vercel uses `--frozen-lockfile`)
