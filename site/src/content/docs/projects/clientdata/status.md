---
title: Project Status — clientdata
description: project-status from clientdata
---

:::caution[Archived Project]
This project is no longer actively maintained. Content may be outdated.
:::

# Project Status — clientdata

## Stack

- **Framework**: Next.js 16.2.9 (App Router SPA with History API)
- **UI Library**: React 19.2.7, TypeScript 6
- **UI System**: shadcn/ui + Base UI + Phosphor Icons
- **Styling**: Tailwind CSS 4.3.1 + PostCSS, 14 theme presets
- **Database**: Neon (Postgres) via Drizzle ORM (server actions + API routes)
- **Maps**: MapLibre GL JS (lazy-loaded via `next/dynamic`)
- **Auth**: Password-based (scrypt + HMAC tokens), admin + viewer roles
- **Storage**: Cloudflare R2 via `@aws-sdk/client-s3`
- **Deploy**: Vercel (serverless) — `master` → `astryx.mcky.space`
- **Font**: IBM Plex Sans Thai via `next/font/google`
- **Dark mode**: `next-themes` with Tailwind `@custom-variant dark`
- **Tests**: Vitest (16 tests)

## Routes

| Path | Page |
|------|------|
| `/` | SPA Dashboard — maps, client list, admin panel |
| `/c/[id]` | Public client page (no auth) |
| `POST /api/clients` | Create client |
| `GET /api/clients` | List clients (paginated, searchable) |
| `GET /api/clients/search` | Search clients by keyword |
| `GET /api/clients/suggestions` | Get/promote suggestions |
| `GET/PUT/DELETE /api/clients/[id]` | Client CRUD |
| `POST /api/upload` | File upload to R2 |
| `POST /api/auth/login` | Login |
| `POST /api/auth/logout` | Logout |

## Changelog

### 2026-07-11
- fix: bump SW cache version to v2 — clean install, clear stale api-v1 cache
- fix: remove webpack config — Next.js 16 defaults to Turbopack
- fix: reset search/filter on browser back (popstate handler)
- searchClients: split query into keywords (AND across words, ILIKE per keyword)

### 2026-07-08
- Remove back-navigation stack in favor of native History API
- Combined 2 DB queries into a single join for client list performance
- localStorage cache sync: cache only on create/update, clear on delete
- Fix: seed.sql conflict — renamed `suggestions_userId` → `suggestions_user_id`

### Earlier
- Phone number formatting + copy in client card
- Full-text search across name + shopName (ILIKE, not trigram)
- Suggestion approval with transaction protection
- theme.ts: 14 CSS variable presets, extracted from themes.css
- shadcn/ui migration — 5 components, theme provider replaced
- Photo upload: 3 sizes (thumb/web/original) via R2, lazy loading
- MapLibre GL clustering + popups, lazy loaded via next/dynamic
- scrypt + HMAC auth, server-side sessions, admin + viewer roles
- Public client page at `/c/[id]` — no auth required
- 16 Vitest tests (auth, suggestions, clients, upload)

## Known Issues

- `useReducer` refactor deferred — 30+ `useState` hooks in one component
- No undo on client delete (trash restore exists but no undo toast)
- SW cache version must be bumped manually on breaking changes

## Data Model

```sql
clients: id, name, shopName, phone, lat, lng, photoKey, note, suggestedById, createdAt
suggestions: id, name, shopName, phone, suggestedBy, userId, approvedAt
```
