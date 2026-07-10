---
type: project-profile
id: data-profile
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
    target: data-status
  - type: relates-to
    target: clientdata-profile
---

# Project Profile: data

## Identity
- **Name:** data
- **Display Name:** EzzyData (Production)
- **Description:** Client management & CRM — production deployment.
- **Purpose:** Stable production deployment of clientdata.
- **Repository:** `ktypez/clientdata` (stable branch)

## Technology
- **Languages:** TypeScript
- **Frameworks:** Next.js 16, React 19
- **Runtime:** Node.js
- **Package Manager:** npm
- **Build System:** Next.js build (webpack)
- **Deployment Targets:** Vercel

## Dependencies
- **Major Libraries:** `drizzle-orm`, `next-themes`, `tailwind-merge`, `@base-ui/react`, `maplibre-gl`
- **External Services:** Neon Database, Cloudflare R2
- **Databases:** Neon (PostgreSQL)
- **Cloud Providers:** Neon, Cloudflare
- **APIs:** Neon API, Cloudflare R2 API

## Development
- **Setup:** `git clone -b stable https://github.com/ktypez/clientdata ~/data`
- **Run:** `npx next dev -H localhost`

## Architecture
- **Structure:** Same as clientdata (Next.js App Router SPA)
- **Source:** Stable branch of ktypez/clientdata

## Deployment
- **Branch:** `stable`
- **Domain:** `data.mcky.space`
- **Platform:** Vercel (serverless)
- **Project:** data (Vercel)

## Status
- **State:** active
- **Role:** Production deployment
- **Source:** `clientdata` (master branch — experimental)
