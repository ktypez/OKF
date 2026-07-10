---
type: project-status
id: data-status
project: data
last_updated: 2026-07-10
status: active
freshness: 2026-07-10
verified: 2026-07-10
expires: null
superseded_by: null
anchors:
  - /home/data/
links:
  - type: relates-to
    target: data-profile
  - type: relates-to
    target: data-agent
  - type: relates-to
    target: clientdata-status
---

# Project Status — data

## Stack

- **Framework**: Next.js 16.2.9 (App Router)
- **UI Library**: React 19.2.7, TypeScript 6.0.3
- **UI System**: shadcn/ui + Base UI + Phosphor Icons
- **Styling**: Tailwind CSS 4.3.1 + PostCSS
- **Database**: Neon (Postgres) via server actions + API routes
- **Maps**: MapLibre GL JS (lazy-loaded via `next/dynamic`)
- **Auth**: Password-based (SHA-256), admin + viewer roles
- **Storage**: Supabase Storage (client images)
- **Deploy**: Vercel (serverless) — `stable` → `data.mcky.space`
- **Font**: IBM Plex Sans Thai via `next/font/google`
- **Dark mode**: `next-themes` with `@custom-variant dark`

## Routes

Same as clientdata (master branch).

## Deployment

| Detail | Value |
|--------|-------|
| Branch | `stable` |
| Domain | `data.mcky.space` |
| Vercel project | data |
| Source repo | `ktypez/clientdata` |

## Changelog

### 2026-07-10
- Initial stable deployment setup
- Production branch changed from `master` to `stable`
- Deployed at `data.mcky.space`
