---
type: agent-profile
id: collage-agent
project: collage
last_updated: 2026-07-05
freshness: 2026-07-05
verified: 2026-07-05
personality: barista engineer
status_ref: ./status.md
status: active
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: collage-profile
  - type: relates-to
    target: collage-status
  - type: relates-to
    target: collage-structure
  - type: relates-to
    target: collage-commands
  - type: relates-to
    target: workspace
---

# Collage Agent

## Overview

LINE LIFF collage maker. Group members upload photos → Sharp generates collage → sent back via `liff.sendMessages()`. Zero-cost messaging (no Messaging API).

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Vanilla HTML/CSS/JS + LIFF SDK |
| Backend | Express.js + Sharp |
| Storage | Cloudflare R2 (bucket `ezzyreport`) |
| Image Proxy | Render `/api/image/:filename` |
| Font | Noto Sans Thai (embedded 214KB) |
| Deployment | Frontend → report.mcky.space, Backend → Render |

## Architecture

```
LIFF App (LINE in-app browser)
  → POST /api/collage (multer uploads → Sharp composition → R2 upload)
  → Returns imageUrl → liff.sendMessages([{ type: 'image', ... }])
```

### Collage Pipeline (v2)

1. `multer` saves uploaded files to `/tmp/uploads/`
2. Sharp reads metadata (dimensions) for all images in parallel
3. Grid columns computed from lookup table: `[1→1, 2→2, 3→3, 4→2, 5-9→3, 10-12→4]`
4. Card dimensions calculated per-image (fixed width, height from aspect ratio + 24px padding)
5. Shadows generated per unique card size (cached SVG rect + Sharp blur)
6. Images resized to fill card content width → rounded corners composited via mask
7. Header SVG rendered via opentype.js paths (64px title, 34px date, 3-stop gradient)
8. 8px divider rendered below header
9. All layers composited onto canvas → JPEG quality 85 → upload to R2
10. Temporary files deleted

### Themes (v2)

| Theme | Header Gradient | Divider |
|-------|----------------|---------|
| crimson | #3B050A → #8F1018 → #C32029 | #F0B400 |
| corporate-blue | #052040 → #0B3C87 → #1A5FBF | #5AAEFF |
| emerald | #043528 → #0A6B53 → #0E8F6E | #F4C430 |
| dark | #000 → #111 → #2A2A2A | #D4AF37 |
| purple | #2A0F4A → #6B2FB8 → #9B5FE0 | #FFB6FF |

## Key Patterns

- **LIFF only** — no LINE Messaging API, uses `liff.sendMessages()` for free
- **Dynamic import** — `await import()` for sharp and S3 SDK to avoid ARM64 "double free" crash
- **Manual .env loader** — no dotenv dependency (reads `.env` with `readFileSync`)
- **R2 image proxy** — images served through Render at `/api/image/:filename` (LINE may block bare `.r2.dev` URLs)
- **Text rendering** — opentype.js converts Thai text to SVG paths (librsvg ignores embedded @font-face)
- **Cached shadows** — shadow tiles generated per unique (w, h) and cached, reused across cells
- **Parallel batches** — per-row image processing with `Promise.all`
- **SVG masks** — rounded corners applied via `dest-in` blend with white rect mask

## Commands

| Command | What it does |
|---------|-------------|
| `node server.js` | Start Express backend (port 3000) |
| `node --watch server.js` | Dev mode with auto-reload |

## Triggers

### "update .md"

1. Read project KB + actual source
2. Update `projects/collage/status.md` with latest changes
3. Update `projects/collage/agent.md` (architecture, patterns)

## Rules

- No dotenv — read `.env` manually
- Always use `await import()` for sharp/S3 SDK (ARM64 safety)
- Thai text → SVG paths via opentype.js, never rely on system fonts

### Termux Environment

| Tool | Notes |
|------|-------|
| Node.js | v22.14.0 (ARM64) — use `node` directly |
| sharp | Dynamic `await import()` to avoid crash |
| cwebp | Available |
