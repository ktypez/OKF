---
type: project-status
id: collage-status
project: collage
last_updated: 2026-07-06
freshness: 2026-07-06
verified: 2026-07-06
state: active
documentation_completeness: High
confidence_level: High
status: active
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: collage-agent
  - type: relates-to
    target: collage-profile
  - type: relates-to
    target: collage-structure
---

# Project Status — collage

## Stack

- Frontend: Vanilla HTML/CSS/JS + LIFF SDK v2
- Backend: Express.js + Sharp + opentype.js
- Storage: Cloudflare R2 (bucket `ezzyreport`)
- Hosting: report.mcky.space (frontend), Render (backend)
- Canvas: 1080px wide, JPEG quality 85

## Routes

| Route | Layer | Description |
|-------|-------|-------------|
| `/` or `/liff` | Vercel (static) | LIFF collage maker — image picker, preset selector, create & share |
| `/api/webhook` | Vercel (serverless) | LINE bot webhook — `!`/`*` prefix commands |
| `/api/collage` | Render (Express) | POST — collage creation endpoint |
| `/api/image/:filename` | Render (Express) | GET — R2 image proxy |
| `/api/cleanup` | Render (Express) | POST — triggers R2 cleanup |
| `/health` | Render (Express) | GET — health check |

## API

### POST /api/collage

Multipart form with fields: `images[]`, `name`, `date`, `preset`.

Returns `{ success: true, imageUrl: "https://..." }`.

### GET /api/image/:filename

Proxies image from R2 through Render.

### GET /health

`{ status: "ok" }`

### POST /api/webhook (Vercel serverless)

LINE webhook — validates signature via `@line/bot-sdk`, processes `!`/`*` commands. Deployed at `frontend/api/webhook.js`, served via Vercel.

### POST /api/cleanup

Triggers R2 cleanup (deletes collages older than 90 days). Also runs on server startup.

## Features

- **5 themes**: crimson, corporate-blue, emerald, dark, purple
- **Grid lookup table**: 1→1, 2→2, 3→3, 4→2, 5-9→3, 10-12→4 (max 4 cols)
- **White cards**: border-radius 24px, padding 12px, drop shadow 0 8px 24px rgba(0,0,0,.12)
- **Image border-radius**: 18px inside card, preserves aspect ratio
- **Last-row centering**: final row centered when incomplete
- **Header**: 3-stop gradient, 64px title, 34px date, 25% of canvas (min 220px)
- **8px divider**: gold line below header
- **Content padding**: 40px top, 48px sides, 48px bottom
- **Thai date auto-format**: `วันที่ 2 พฤษภาคม 2569` from `YYYY-MM-DD`
- **Auto canvas height**: min 1350px, expands with content

## Changelog

### 2026-07-06
- **Webhook polished**: `*` prefix alongside `!` for all commands, emoji aligned with clientdata (👤 🛒 📌), maps link removed from single result, multi-result links to `?q=QUERY`

### 2026-07-05
- **v2 redesign**: card-based layout, 1080px canvas, new grid algorithm
- 5 new themes (crimson, corporate-blue, emerald, dark, purple)
- White cards with shadow + rounded corners
- 8px gold divider below header
- Last-row centering
- Min canvas height 1350px
- Added 5 color presets with frontend picker
- **LINE webhook deployed**: 3 commands (`!ส่งรูป`/`!รูป`, `!เมนู`, `!ลูกค้า`) + R2 cleanup endpoint
- `vercel.json` cleaned: no custom builds, no 301 redirect, `/liff` rewrites to `index.html`

### 2026-07-04
- Initial deployment: Sharp collage engine, R2 storage, LIFF integration
- Header text via opentype.js (Noto Sans Thai SVG paths)
- Dynamic imports for ARM64 compatibility

## Constraints

- LINE LIFF endpoint must point to `https://report.mcky.space`
- Render needs 5 R2 env vars: `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_PUBLIC_URL`
- No dotenv — `.env` read manually via `readFileSync`
- `await import()` required for sharp/S3 SDK (ARM64 Termux crash workaround)
- Original uploaded files deleted after collage creation

## Design

- **Canvas:** 1080px × flexible height (min 1350px)
- **Header:** 25% of canvas (min 220px), 3-stop gradient, centered 64px title + 34px date
- **Divider:** 8px gold line below header
- **Content:** padding 40px top, 48px sides, 48px bottom
- **Cards:** white bg, 24px border-radius, 12px padding, `0 8px 24px rgba(0,0,0,.12)` shadow
- **Images:** 18px border-radius, fill card width, preserve aspect ratio
- **Grid:** column lookup table, max 4 cols, last-row centered
- **Gaps:** 24px between cards
- **Shadow:** SVG rect + Sharp blur (cached by size)
