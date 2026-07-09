---
type: project-status
id: mcky-status
project: mcky.space
last_updated: '2026-07-09'
state: active
documentation_completeness: High
confidence_level: High
status: active
freshness: '2026-07-09'
verified: '2026-07-08'
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: mcky-agent
  - type: relates-to
    target: mcky-space-profile
  - type: relates-to
    target: mcky-structure
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
| `/` | ✅ Live | Terminal-style homepage with terminal sim, tech stack tags, blog sub-items |
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

No API routes remain. The site is fully static — blog content is compiled from markdown at build time. The former `/api/auth` and `/api/habits/*` routes (Supabase-backed, client-hash auth) were removed on 2026-07-08 when auth was stripped from the project.

## Changelog

### 2026-07-08 — Security + cleanup pass
- **B2 (deleted)**: Removed orphaned `/api/auth`, `/api/habits/*`, `require-auth.ts`, `supabase.ts` — client-hash auth was spoofable and auth was already stripped from the UI
- **B1 (XSS fix)**: Blog posts now rendered via `marked` + Prism and sanitized with DOMPurify before `set:html`
- **B7 (CSP)**: Added `Content-Security-Policy` to `vercel.json` (script-src allows self + Alpine CDN + unsafe-inline)
- **B4 (Prism)**: Wired `marked-highlight` + `prismjs` so blog code blocks actually get syntax highlighting (claimed since 2026-07-05 but was not applied to runtime `marked` output)
- **B5 (content)**: Corrected stale blog posts that described a React/Next.js stack and a live Supabase backend — site is static Astro
- **B6 (docs)**: Filled mcky.space profile repo/owner (`ktypez/mcky.space`); removed misleading `supabase` tag from homepage/projects

### 2026-07-05 — RSK-001 resolved, LAN access enabled
- **RSK-001**: Switched `syntaxHighlight` from shiki to `prism` — eliminates shiki dependency
- **Rolldown binding**: Installed `@rolldown/binding-linux-arm64-gnu@1.1.2` — npm skip fix
- **Unstorage**: Generated 22 missing `.mjs` ESM wrappers (npm drops ESM on android-arm64)
- **Dev server**: Set `server: { host: '0.0.0.0' }` in astro.config.mjs — LAN access by default
- **Termux fix**: Patched `os.networkInterfaces` in astro.config.mjs to return fake interfaces (EACCES workaround)
- **Docs**: Updated RSK-001 (resolved), agent.md rules + commands, status.md known issues

### 2026-07-04 — Auth removal, dark mode refresh, homepage blog section
- **Auth**: Removed login/logout from layout — auth store, sidebar buttons, floating form all stripped
- **Dark mode**: Navy → deep grey palette (#141414 bg, #aaa text, #666 borders)
- **Homepage**: Blog moved to own `cat blog.txt` section with post sub-items; all 4 tech tags now white text
- **Blog**: Published "From Chaos to Clarity: Building OKF" with file structure example
- **Docs**: Added README, censored internal project names from blog post

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

- **Theme**: Neobrutalism — light default (`#f5f5f0` bg), dark mode via `[data-theme="dark"]` (#141414 deep grey bg, #aaa text, #666 borders)
- **Borders**: 3px solid `var(--border)`
- **Shadows**: Hard offset (`4px 4px 0` / `2px 2px 0`)
- **Colors**: CSS custom properties — green, amber, red, blue, purple, orange, cyan, pink
- **Components**: `.neo-card` (shadow), `.neo-tag` (labels), `.neo-badge` (chips), `.stub` (empty state)
- **CSS variables** in `:root` — no hardcoded values outside tokens
- **Skeleton**: `.skel` class with `shimmer` keyframe (CSS-only)

## Known Issues

- Alpine.js loaded from CDN (intentional per stack definition)
- `npm install` still drops ESM/binding files on android-arm64 — manual fixes required

## Dev Server Fix (2026-07-05)

RSK-001 resolved. Dev server now works locally:
- `npm run dev` binds `0.0.0.0` by default (LAN access from other devices)
- `npm run dev -- --host 127.0.0.1` for localhost-only
- Switched `syntaxHighlight` from shiki to `prism` in `astro.config.mjs`
- Installed `@rolldown/binding-linux-arm64-gnu@1.1.2` manually (npm skips it on android-arm64)
- Generated 22 missing `.mjs` wrapper files for unstorage (npm drops ESM files on android-arm64)
- Patched `os.networkInterfaces` in config to prevent EACCES crash on Termux

