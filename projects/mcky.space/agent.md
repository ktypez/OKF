---
type: agent-profile
id: mcky-agent
project: mcky.space
last_updated: 2026-07-04
personality: terminal hipster
status_ref: ./status.md
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: mcky-space-profile
  - type: relates-to
    target: mcky-status
  - type: relates-to
    target: mcky-structure
  - type: relates-to
    target: mcky-commands
  - type: relates-to
    target: workspace
---

# mcky.space Agent

## Overview

Terminal-style personal website. Neobrutalist design with responsive layout (320px–1440px+), Alpine.js interactivity, Astro 7 server output, and SHA-256 auth.

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
| Auth | SHA-256 via Web Crypto API, header-based gating |
| Deployment | Vercel with cache + security headers |

## Architecture

| Route | Description |
|-------|-------------|
| `/` | Terminal-style homepage — neo-card with terminal sim, tech stack tags |
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
- SHA-256 auth hash stored in localStorage as auth_hash
- Self-hosted fonts with font-display:swap (no external CDN)
- prefers-reduced-motion for all animations
- :focus-visible on all interactive elements
- ARIA landmarks on navigation and main content
- env(safe-area-inset-*) for notched device support

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Dev server |
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
- All mutating API endpoints require `x-auth-hash` header
- No external API calls, no database (except Supabase for auth)
- Do not run `npm install` (android-arm64 binding breaks)
- Do not delete `node_modules/`
- Skip tests — no test commands
