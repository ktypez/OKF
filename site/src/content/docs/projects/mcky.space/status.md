---
title: Project Status — mcky.space
description: project-status from mcky.space
---

# Project Status — mcky.space

## Stack

- **Framework**: Astro 7 (SSR)
- **UI**: Alpine.js via CDN, pure CSS neobrutalism
- **Blog**: Markdown (`.md` files), compiled at build time via Astro
- **Syntax Highlighting**: PrismJS
- **Database**: Supabase (no auth, read-only queries?)
- **Font**: JetBrains Mono (self-hosted WOFF2)
- **Deploy**: Vercel

## Routes

| Path | Page |
|------|------|
| `/` | Terminal-style homepage with blog section |
| `/about` | About page |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post |
| `/projects` | Projects showcase |
| `/404` | 404 page |

## Changelog

### 2026-07-11
- refactor: remove API routes, update blog, gitignore cleanup
- fix: local dev environment — prism syntax highlighting, os.networkInterfaces patch, LAN access (host 0.0.0.0)
- homepage: move blog to its own blog.txt section, list posts as sub-items under blog link
- homepage tags: white text on all 4 neo-tags

### 2026-07-08
- Removed orphaned `/api/auth` and `/api/habits/*` routes
- XSS fix + CSP + Prism syntax highlighting + content corrections

### Earlier
- RSK-001 resolved (switched shiki → prism)
- LAN access enabled, Termux ESM binding patches
- Auth removed entirely, dark mode refreshed (navy → deep grey)
- Blog section on homepage, terminal-style design

## Design

- Neobrutalism — 3px borders, hard offset shadows, bright accents
- CSS-only shimmer skeletons for loading states
- JetBrains Mono throughout
- ARIA landmarks, safe-area-insets, `prefers-reduced-motion`
