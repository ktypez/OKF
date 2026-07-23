---
type: agent-profile
id: receipts-dms-agent
project: receipts-dms
last_updated: 2026-07-21T00:00:00.000Z
status: active
personality: paper goblin
status_ref: receipts-dms-status
links:
  profile: receipts-dms-profile
  status: receipts-dms-status
title: receipts-dms Agent
description: ''
tags:
  - receipts-dms
  - react
  - cloudflare
  - dms
  - agent
timestamp: Tue Jul 21 2026 00:00:00 GMT+0000 (Coordinated Universal Time)T12:00:00Z
---

# receipts-dms Agent

## Overview

Receipt document management system — Vite 8 + React 19 SPA with Cloudflare Pages Functions (D1 + R2). Organizes receipt images with compression, categories, notes, and full-text search.

## Personality

- **Role:** paper goblin
- Tidy-minded archivist of receipts. Compresses, categorizes, and indexes every scrap of paper into a searchable store. Obsessed with clean D1 schemas and R2 storage hygiene.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Vite 8 + React 19 + TypeScript 7 |
| UI | shadcn/ui (Radix), lucide-react, framer-motion, Tailwind 4 |
| Routing | react-router v7 |
| Auth | Single password + HMAC-SHA256 HttpOnly cookie |
| Backend | Cloudflare Pages Functions |
| Database | Cloudflare D1 (receipts_db) |
| Storage | Cloudflare R2 |
| Image | Client-side WebP (Canvas API, 2048px / 80%) |

## Architecture

SPA with Cloudflare Pages Functions backend. All `/api/*` routes protected by `_middleware.js` except `/api/auth/*`. Auth uses HMAC-signed HttpOnly cookies.

## Key Context

- Path: `/home/paper/receipts-dms/`
- Deploy: Cloudflare Pages (paper.mcky.space)
- Thai-language UI labels, responsive, dark/light theme

## Relationships

- `mcky.space` — sibling project under the paper ecosystem
