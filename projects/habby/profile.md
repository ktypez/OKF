---
type: project-profile
id: habby-profile
project: habby
last_updated: 2026-07-21T00:00:00.000Z
status: active
stack:
  language: JavaScript
  framework: Vite 8 + Express 5
  ui: vanilla CSS (neobrutalist)
  database: Redis (owner mode)
  storage: localStorage (guest mode)
  state: none
  auth: SHA-256
  testing: Vitest (18 tests)
  deployment: Vercel (static + serverless)
  ci: none
agent_personality: trophy goblin
links:
  agent: habby-agent
  status: habby-status
title: 'โปรไฟล์โปรเจกต์: habby'
description: ''
tags:
  - habby
  - react
  - golang
  - game
  - profile
timestamp: Tue Jul 21 2026 00:00:00 GMT+0000 (Coordinated Universal Time)T12:00:00Z
---
# โปรไฟล์โปรเจกต์: habby

## ข้อมูลตัวตน (Identity)

- **Name:** habby
- **Display Name:** Habby
- **Description:** แอปติดตาม habit แบบ gamified — public mode พร้อม localStorage + owner mode พร้อม Redis
- **Repository:** https://github.com/ktypez/habby

## เทคโนโลยี (Technology)

- **Languages:** JavaScript
- **Frameworks:** Vite 8, Express 5
- **Runtime:** Node.js
- **Package Manager:** yarn
- **Build System:** Vite build
- **Deployment Targets:** Vercel (static + serverless)
- **Font:** JetBrains Mono (self-hosted)

## Dependencies

### Core Dependencies

| Package | Version | หน้าที่ |
|---------|---------|--------|
| `express` | ^5.2.1 | HTTP server + API routes |
| `ioredis` | ^5.11.1 | Redis client (Upstash) |
| `cors` | ^2.8.6 | CORS middleware |

### Dev Dependencies

| Package | Version | หน้าที่ |
|---------|---------|--------|
| `vite` | ^8.0.0 | Build tool + dev server |
| `vitest` | ^4.1.9 | Testing framework |

### External Services

- **Redis** (Upstash) — สำหรับ owner mode data storage
- **Vercel** — static hosting + serverless functions

### หมายเหตุ

- ไม่มี frontend framework (vanilla JS)
- ไม่มี UI library
- ไม่มี linting tools
- ไม่มี TypeScript

## Development

| คำสั่ง | ทำอะไร |
|--------|--------|
| `yarn install` | ติดตั้ง dependencies |
| `yarn dev` | Vite dev server (proxy /api → localhost:3001) |
| `yarn dev:server` | Express backend (port 3001) |
| `yarn build` | build frontend ด้วย Vite → `dist/` |
| `yarn preview` | preview production build |
| `yarn start` | เริ่ม production server |
| `node node_modules/.bin/vitest run` | รันชุดทดสอบ (18 tests — streak + XP logic) |

### Deployment

push to GitHub → Vercel auto-deploys

## Architecture

```
habby/
├── api/              # Backend API routes (serverless)
├── css/              # Global styles (neobrutalist theme)
├── js/               # Frontend logic (main.js)
├── lib/              # Shared utilities (logic.js — streak/XP calculations)
├── public/           # Static assets + service worker
│   ├── sw.js         # Service Worker (caching + notification clicks)
│   └── fonts/        # JetBrains Mono (self-hosted woff2)
├── scripts/          # Tool scripts (cleanup-archived.mjs)
├── tests/            # Vitest tests (streak + XP logic)
├── dist/             # Build output
├── index.html        # SPA entry point
├── server.js         # Express server (API + static hosting)
├── vite.config.js    # Vite configuration
├── vitest.config.js  # Vitest configuration
├── vercel.json       # Vercel deployment config
└── package.json
```

### Key Files

| ไฟล์ | หน้าที่ |
|------|--------|
| `index.html` | SPA entry point |
| `js/main.js` | Frontend logic ทั้งหมด (SPA routing, UI, Storage adapter) |
| `lib/logic.js` | Pure functions — calculateStreak, calcXpForCheckin, calcLevel |
| `server.js` | Express server + API routes |
| `api/` | Serverless API handlers สำหรับ Vercel |
| `public/sw.js` | Service Worker — cache-first strategy + notification click handler |
| `css/style.css` | Global styles — neobrutalist theme |
| `vite.config.js` | Vite build + dev server proxy config |

### Storage

Dual-mode — localStorage (guest) + Redis API (owner)

### PWA

Service worker สำหรับ caching + notification clicks (ไม่มี manifest — ไม่รองรับ install prompt)

### Entry Points

`index.html` (Vite), `server.js` (Express)

## Cross-links

- [Habby Agent](agent.md)
- [Habby Status](status.md)
