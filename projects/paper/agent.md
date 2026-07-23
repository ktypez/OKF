---
type: agent-profile
id: paper-agent
project: paper
last_updated: 2026-07-23T00:00:00.000Z
status: active
personality: paper goblin
status_ref: paper-status
links:
  profile: paper-profile
  status: paper-status
title: paper Agent
description: ''
tags:
  - paper
  - react
  - cloudflare
  - dms
  - agent
timestamp: 2026-07-23T12:00:00.000Z
---

# paper Agent

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

- Path: `/home/paper/`
- Deploy: Cloudflare Pages (paper.mcky.space)
- Thai-language UI labels, responsive, dark/light theme

## Relationships

- `mcky.space` — sibling project under the paper ecosystem
