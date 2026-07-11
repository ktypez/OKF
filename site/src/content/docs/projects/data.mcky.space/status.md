---
title: Project Status — data.mcky.space
description: project-status from data.mcky.space
---

# Project Status — data.mcky.space

## Stack

- **Framework**: Vite 7
- **UI Library**: React 19.2.7, TypeScript
- **Routing**: react-router-dom v7
- **Styling**: Tailwind CSS 4 + PostCSS
- **State**: Zustand
- **Database**: Neon (Postgres) via Drizzle ORM
- **Maps**: MapLibre GL JS
- **Auth**: Password-based, admin + viewer roles
- **Storage**: Cloudflare R2 via @aws-sdk/client-s3
- **Deploy**: Cloudflare Pages (serverless) — `stable` → `data.mcky.space`
- **PWA**: Service worker for offline support

## Routes

Same feature set as clientdata (master branch), ported to Vite SPA.

## Deployment

| Detail | Value |
|--------|-------|
| Branch | `stable` |
| Domain | `data.mcky.space` |
| Platform | Cloudflare Pages |
| Source repo | `ktypez/clientdata` |

## Changelog

### 2026-07-11
- Ported from Next.js to Vite 7 + Cloudflare Pages
- Added Zustand for state management (replaced React useState hooks)
- Added service worker for PWA support
- Fix: kill stale service workers on first load
- Fix: trash restore/delete called wrong endpoint
- Fix: fallback for trash items without deletedAt
- Show 20 clients per page (up from 10/20)
- Show placeholder SVG when client has no photos
