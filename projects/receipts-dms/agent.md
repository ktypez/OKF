---
type: agent-profile
id: receipts-dms-agent
project: receipts-dms
last_updated: '2026-07-18'
status: active
freshness: '2026-07-18'
verified: '2026-07-18'
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: receipts-dms-profile
  - type: relates-to
    target: receipts-dms-status
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
| UI | shadcn/ui (Radix), lucide-react, Tailwind 4 |
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

## TODOs

Query KB on startup: `okf_query_nodes project:receipts-dms type:document status:active` — any node with `- [ ]` checklist items is a pending TODO. Notify user, ask intent. See `system/TODOS.md`.

## Relationships

- `mcky.space` — sibling project under the paper ecosystem
