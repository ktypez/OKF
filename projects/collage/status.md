---
type: project-status
id: collage-status
project: collage
last_updated: 2026-07-11
status: active
freshness: 2026-07-11
verified: 2026-07-11
expires: null
superseded_by: null
anchors:
  - /home/collage/
links:
  - type: relates-to
    target: collage-profile
  - type: relates-to
    target: collage-agent
---

# Project Status — collage

## Stack

- **Backend**: Node.js (ESM), Express 4.21, sharp 0.33
- **Frontend**: Vanilla HTML/CSS/JS, LIFF SDK v2
- **Webhook**: Vercel Serverless Function, @line/bot-sdk
- **Storage**: Cloudflare R2 (S3-compatible)
- **Deploy**: Render.com (backend) + Vercel (frontend + webhook)

## Routes

### Backend (Express, Render.com)
| Path | Description |
|------|-------------|
| `POST /api/collage` | Generate collage from uploaded images |
| `GET /api/image/:filename` | Serve collage from R2 |
| `GET /health` | Health check |
| `POST /api/cleanup` | Cleanup old collages (>90 days) |

### Frontend (Vercel)
| Path | Description |
|------|-------------|
| `/liff` | LIFF collage maker UI |
| `/api/webhook` | LINE bot webhook |

## Design System

- 7 Thai day-of-week color themes (sun=red, mon=beige, tue=pink, wed=green, thu=orange, fri=blue, sat=purple)
- Collage: 1080px wide, 220px gradient header, white rounded cards, drop shadows
- Output: JPEG quality 85
- Thai calendar (Buddhist year +543), Thai month names

## Features
- [x] LIFF integration — open from LINE, select photos, generate collage
- [x] 7 day-of-week color themes, auto-detects today
- [x] Smart grid layout (adaptive columns based on image count)
- [x] Thai font rendering via opentype.js
- [x] LINE bot commands (!ส่งรูป, !เมนู, !ลูกค้า)
- [x] Cloudflare R2 storage with 90-day auto-cleanup
- [x] Dark mode (prefers-color-scheme)
- [x] Persistent user name (localStorage)

## Changelog

### 2026-07-11
- Initial KB documentation
- Theme system: 7 day-of-week colors instead of generic themes
- Auto day detection, native date picker fallback
- Smart grid layout, centered last row
- Persistent name via localStorage
- Canvas auto-fits content height
- Main menu: added truck.mcky.space button, updated emojis
- Webhook: URLSearchParams for + encoding in search queries
- Shrink preset buttons to 34px
- Sample mockup with header, divider, grid cards
- gitignore cleanup
