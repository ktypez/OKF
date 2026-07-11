---
title: receipts-dms
description: project-profile from receipts-dms
---

# receipts-dms

**Role:** production
**Framework:** Vite 6 + React 19 + TypeScript
**Backend:** Cloudflare Pages Functions (D1 + R2)
**Deployment:** Cloudflare Pages (paper.mcky.space)
**Stack:** shadcn/ui, Tailwind v3, lucide-react, react-router v7

## Description

A receipt document management system for organizing and managing receipt images. Supports upload with image compression (WebP 2048px / 80%), category management, notes, full-text search, and single-password auth.

## Technology

| Layer | Technology |
|-------|-----------|
| Frontend | Vite 6, React 19, TypeScript 7, Tailwind 3 |
| UI | shadcn/ui (Radix primitives), lucide-react |
| Routing | react-router v7 |
| Auth | Single password (env var) + HMAC-SHA256 cookie |
| Backend | Cloudflare Pages Functions (Workers runtime) |
| Database | Cloudflare D1 (receipts_db) |
| Storage | Cloudflare R2 (BUCKET) |
| Image Processing | Client-side WebP via Canvas API |

## Architecture

SPA with Cloudflare Pages Functions backend. All API routes under `/api/*` are protected by `_middleware.js` except `/api/auth/*`. Auth uses HMAC-signed HttpOnly cookies.

## Entry Points

| File | Purpose |
|------|---------|
| `src/main.tsx` | App bootstrap |
| `src/App.tsx` | Root component, routing, auth guard |
| `src/lib/auth-context.tsx` | Auth state management |
| `src/lib/api.ts` | API client (fetch helper) |
| `functions/api/_middleware.js` | Auth middleware for all `/api/*` routes |

## State Management

React state via hooks (`useReceipts`, `useCategories`). Theme via React context. Auth via `AuthProvider` context.

## Key Decisions

- Single password auth (no user registration) for personal use
- Client-side image compression to WebP before upload (reduces storage)
- HMAC-signed HttpOnly cookie for session persistence
- Bottom nav on mobile, sidebar on desktop

## Related

| Type | Link |
|------|------|
| Status | [status.md](./status.md) |
| Structure | [structure.md](./structure.md) |
| Dependencies | [dependencies.md](./dependencies.md) |
| Commands | [commands.md](./commands.md) |

## Evidence

- `package.json`
- `wrangler.toml`
- `vite.config.ts`
- `schema.sql`
- `src/lib/auth-context.tsx`
