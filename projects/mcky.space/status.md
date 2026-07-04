---
type: project-status
id: mcky-status
project: mcky.space
last_updated: 2026-07-04
state: active
documentation_completeness: High
confidence_level: High
---

# Project Status — mcky.space

## Stack

- **Framework**: Astro 7.0.2 (server output, `@astrojs/vercel`)
- **Language**: TypeScript
- **Styling**: Pure CSS — neobrutalism (3px borders, hard offset shadows, bright accents)
- **Font**: JetBrains Mono (self-hosted WOFF2 variable font, 400–800, `font-display:swap`)
- **Data**: Supabase (auth); blog from `.md` files
- **Markdown**: `marked` (lightweight, no React)
- **Client UI**: Alpine.js via CDN
- **Auth**: SHA-256 password, Web Crypto API, header-based gating
- **Blog**: `.md` files in `src/data/blog/` → TypeScript at build via `scripts/build-blog-posts.mjs`
- **Deployment**: Vercel with cache headers + security headers

## Routes

| Path | Status | Description |
|------|--------|-------------|
| `/` | ✅ Live | Terminal-style homepage with terminal sim, tech stack tags |
| `/about` | ✅ Live | About page — neo-cards for bio, stack badges, contact |
| `/blog` | ✅ Live | Blog listing — neo-card per post, badge dates, empty state |
| `/blog/[slug]` | ✅ Live | Blog post — neo-styled content, prev/next nav |
| `/projects` | ✅ Live | Project showcase — neo-cards with colored tags, empty state |
| `/404` | ✅ Live | Styled 404 page with terminal prompt |
| Habits | 🔗 External | Sidebar + homepage link to habby.mcky.space (new tab) |

## Components

| Component | File | Notes |
|-----------|------|-------|
| `PageHeader` | `src/components/PageHeader.astro` | Reusable page header with back link + title |
| `TerminalLine` | `src/components/TerminalLine.astro` | Reusable terminal prompt line |
| `Layout` | `src/layouts/Layout.astro` | Base layout with sidebar, noscript, theme toggle |

## API

| Route | Method | Auth Required | Purpose |
|-------|--------|---------------|---------|
| `/api/auth` | POST | No | Password verification, returns `hash` on success |

## Changelog

### 2026-07-02 — Blog post, DESIGN.md docs, cleanup
- **Blog**: Published "Project Updates: Component Extraction & Design System"
- **Docs**: DESIGN.md updated
- **Cleanup**: Removed dead nav link, unreachable CSS
- **SEO**: Added `og:url` meta tag

### 2026-07-01 — Responsive Redesign (5 phases)
- Self-hosted JetBrains Mono, extracted components, safe-area insets, 44px touch targets
- Responsive breakpoints, fluid typography (clamp), CSS containment
- Button press animation, prefers-reduced-motion, 404 page, empty states
- Vercel cache/security headers, ARIA landmarks, OG/Twitter meta tags
- Noscript fallback, CSS audit

### 2026-06-22
- Neobrutalism retheme, auth middleware, Astro 7 migration

### 2026-06-15
- Initial Astro 7 project setup with Alpine.js

## Design System

- **Theme**: Neobrutalism — light default (`#f5f5f0` bg), dark mode via `[data-theme="dark"]`
- **Borders**: 3px solid `var(--border)`
- **Shadows**: Hard offset (`4px 4px 0` / `2px 2px 0`)
- **Colors**: CSS custom properties — green, amber, red, blue, purple, orange, cyan, pink
- **Components**: `.neo-card` (shadow), `.neo-tag` (labels), `.neo-badge` (chips), `.stub` (empty state)
- **CSS variables** in `:root` — no hardcoded values outside tokens
- **Skeleton**: `.skel` class with `shimmer` keyframe (CSS-only)

## Known Issues

- Alpine.js loaded from CDN (intentional per stack definition)
- Dev server broken locally (shiki module corruption) — works on Vercel
- `npm install` breaks android-arm64 native binding
