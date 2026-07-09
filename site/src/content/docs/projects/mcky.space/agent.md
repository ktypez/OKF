---
title: mcky.space Agent
description: agent-profile from mcky.space
---

# mcky.space Agent

## Overview

Terminal-style personal website. Neobrutalist design with responsive layout (320px–1440px+), Alpine.js interactivity, Astro 7 server output. No auth.

## Stack

| Layer | Tech |
|-------|------|
| Framework | Astro 7.0.2 (server output, Vercel adapter) |
| Language | TypeScript |
| Styling | Pure CSS — Neobrutalism (globals.css, no Tailwind) |
| Font | JetBrains Mono (self-hosted WOFF2 variable font) |
| Database | Supabase (auth) |
| Blog | .md files compiled to TS at build time |
| Client UI | Alpine.js via CDN |
| Markdown | `marked` |
| Auth | None (removed) |
| Deployment | Vercel with cache + security headers |

## Architecture

| Route | Description |
|-------|-------------|
| `/` | Terminal-style homepage — neo-card with terminal sim, tech stack tags, blog sub-items |
| `/about` | About page — neo-cards for bio, stack badges, contact |
| `/blog` | Blog listing — neo-card per post, badge dates, empty state |
| `/blog/[slug]` | Blog post — neo-styled content, prev/next nav |
| `/projects` | Project showcase — neo-cards with colored tags, empty state |
| `/404` | Styled 404 page with terminal prompt |

### Components

| Component | File | Notes |
|-----------|------|-------|
| `PageHeader` | `src/components/PageHeader.astro` | Reusable page header with back link + title |
| `TerminalLine` | `src/components/TerminalLine.astro` | Reusable terminal prompt line |
| `Layout` | `src/layouts/Layout.astro` | Base layout with sidebar, noscript, theme toggle |

## Key Patterns

- Alpine.js x-data + x-init for client-side interactivity (no React bundle)
- `marked` for lightweight markdown rendering (no React dependency)
- Astro static pages for non-interactive content
- Blog .md compiled to TS at build time (no runtime filesystem access)
- CSS-only skeleton loading (.skel class with shimmer keyframe)
- Self-hosted fonts with font-display:swap (no external CDN)
- prefers-reduced-motion for all animations
- :focus-visible on all interactive elements
- ARIA landmarks on navigation and main content
- env(safe-area-inset-*) for notched device support

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Dev server (binds 0.0.0.0 for LAN access) |
| `npm run dev -- --host 127.0.0.1` | Dev server (localhost only) |
| `npm run build` | Build (prebuild blog index + astro build) |
| `node scripts/build-blog-posts.mjs` | Build blog index manually |
| `npm run start` | Start production server |

## Triggers

### "update .md"

1. Read project AGENTS.md + current KB status
2. Update `projects/mcky.space/status.md` with latest changes
3. Update `projects/mcky.space/agent.md` (routes, components, design system)
4. If project AGENTS.md has stale info, update it too

### "cleanup"

1. Scan unused files, empty files, dead exports in `src/`
2. Present findings for user to choose
3. Update STATUS.md + KB agent file
4. Never cleanup `.env*`, `node_modules/`, `dist/`, `.next/`, `.git/`, or essential config

## Rules

- Prioritize reference design when given
- New routes must match existing neobrutalism style
- Static pages are pure Astro HTML — no JS needed
- Interactive pages use Alpine.js x-data directives inline in .astro templates
- Blog is read-only — edit via Git (.md files + rebuild)
- No external API calls, no database (except Supabase for auth)
- `npm run dev` binds to `0.0.0.0` by default (LAN access). On Termux, os.networkInterfaces is patched in astro.config.mjs to prevent EACCES crash.
- Do not run `npm install` if node_modules is intact (android-arm64 drops ESM/binding files)
- Do not delete `node_modules/` (generated native binding shims + ESM wrappers live here)
- Shiki/mcky.space RSK-001 resolved — switches: Prism for syntax highlight, manual rolldown binding, unstorage ESM wrappers
- If node_modules is rebuilt from scratch, reapply manual fixes: `npm install @rolldown/binding-linux-arm64-gnu@1.1.2` and regenerate unstorage ESM wrappers
- Skip tests — no test commands
