---
type: project-profile
id: data-mcky-space-profile
project: data.mcky.space
last_updated: 2026-07-11
status: active
freshness: 2026-07-11
verified: 2026-07-11
expires: null
superseded_by: null
anchors:
  - /home/data.mcky.space/
links:
  - type: relates-to
    target: data-mcky-space-status
  - type: relates-to
    target: clientdata-profile
---

# Project Profile: data.mcky.space

## Identity
- **Name:** data.mcky.space
- **Display Name:** data.mcky.space (Production)
- **Description:** Client management & CRM — production deployment.
- **Purpose:** Production deployment of clientdata, rebuilt with Vite + Cloudflare Pages.
- **Repository:** `ktypez/clientdata` (stable branch)

## Technology
- **Languages:** TypeScript
- **Frameworks:** Vite 7, React 19
- **Runtime:** Node.js
- **Package Manager:** npm
- **Build System:** Vite
- **Deployment Targets:** Cloudflare Pages

## Dependencies
- **Major Libraries:** `drizzle-orm`, `zustand`, `maplibre-gl`, `@aws-sdk/client-s3`
- **External Services:** Neon Database, Cloudflare R2
- **Databases:** Neon (PostgreSQL)
- **Cloud Providers:** Neon, Cloudflare

## Development
- **Setup:** `git clone -b stable https://github.com/ktypez/clientdata ~/data.mcky.space`
- **Run:** `npx vite`

## Architecture
- **Structure:** Vite SPA with Cloudflare Pages Functions backend
- **State:** Zustand
- **Source:** Stable branch of ktypez/clientdata, ported from Next.js to Vite

## Deployment
- **Branch:** `stable`
- **Domain:** `data.mcky.space`
- **Platform:** Cloudflare Pages (serverless functions)
- **Project:** data (Cloudflare Pages)

## Status
- **State:** active
- **Role:** Production deployment
- **Source:** `clientdata` (master branch — experimental), ported to Vite
