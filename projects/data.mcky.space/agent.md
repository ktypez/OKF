---
type: agent-profile
id: data-mcky-space-agent
project: data.mcky.space
last_updated: 2026-07-11
status: active
freshness: 2026-07-11
verified: 2026-07-11
expires: null
superseded_by: null
personality: data goblin
status_ref: ./status.md
anchors:
  - /home/data.mcky.space/
links:
  - type: relates-to
    target: data-mcky-space-profile
  - type: relates-to
    target: data-mcky-space-status
  - type: relates-to
    target: clientdata-agent
---

# data.mcky.space Agent

## Overview

Production deployment of clientdata — ported from Next.js to Vite 7 + Cloudflare Pages.

## Stack

- **Framework**: Vite 7 + React 19 + TypeScript
- **State**: Zustand
- **Database**: Neon Postgres + Drizzle ORM
- **Storage**: Cloudflare R2
- **Deploy**: Cloudflare Pages (serverless functions)

## Key Differences from clientdata

- **Framework**: Vite 7 instead of Next.js 16 (App Router → react-router-dom)
- **State**: Zustand instead of React useState (30+ hooks → centralized stores)
- **Deploy**: Cloudflare Pages instead of Vercel
- **PWA**: Has service worker for offline support
- **Source**: `stable` branch of `ktypez/clientdata`, ported framework

## Commands

| Command | What it does |
|---------|-------------|
| `npx vite` | Dev server |
| `npx vite build` | Production build |

## Git Workflow

- `~/data.mcky.space` tracks `origin/stable`
- Experimental changes go through `clientdata` (master) → tested → merged to `stable`
- Ported framework changes happen directly on `stable` branch
