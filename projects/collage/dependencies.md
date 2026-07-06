---
type: document
id: collage-dependencies
project: collage
last_updated: 2026-07-06
status: active
freshness: 2026-07-06
verified: 2026-07-06
expires: null
superseded_by: null
anchors: []
links:
  - type: documents
    target: collage-profile
  - type: relates-to
    target: collage-structure
  - type: relates-to
    target: collage-commands
---

# Dependencies: collage

## Backend (backend/package.json)

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.21.0 | HTTP server |
| sharp | ^0.33.5 | Image compositing (resize, blur, composite, JPEG encode) |
| multer | ^1.4.5-lts.1 | Multipart file upload handling |
| cors | ^2.8.5 | CORS headers |
| @aws-sdk/client-s3 | ^3.600.0 | Cloudflare R2 S3-compatible API |
| opentype.js | ^2.0.0 | Thai text → SVG path conversion |
| fontkit | ^2.0.4 | Font metrics for layout |

## Frontend (frontend/package.json)

| Package | Version | Purpose |
|---------|---------|---------|
| @line/bot-sdk | ^9.0.0 | LINE Messaging API client (webhook) |

## External Services

| Service | Purpose | Tier |
|---------|---------|------|
| Cloudflare R2 | Image storage (bucket `ezzyreport`) | Free (10GB) |
| Render | Express backend hosting | Free |
| Vercel | Static frontend hosting | Free |
| LINE (LIFF) | In-app browser + sendMessages API | Free |

## Runtime

- Node.js v22.14.0 (ARM64)
- ESM modules (`"type": "module"`)
