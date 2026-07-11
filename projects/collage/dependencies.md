---
type: project-dependencies
id: collage-deps
project: collage
last_updated: 2026-07-11
status: active
---

# Dependencies

## Backend

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.21.0 | HTTP server |
| sharp | ^0.33.0 | Image processing (collage generation) |
| @aws-sdk/client-s3 | ^3.600.0 | Cloudflare R2 storage |
| multer | ^1.4.5 | File upload handling |
| fontkit | ^2.0.0 | Font loading |
| opentype.js | ^2.0.0 | Font rendering for text overlays |
| cors | | Cross-origin requests |

## Frontend

| Package | Version | Purpose |
|---------|---------|---------|
| @line/bot-sdk | ^9.0.0 | LINE Messaging API (webhook) |

## External Services

| Service | Purpose |
|---------|---------|
| Cloudflare R2 | Image storage (bucket: ezzyreport) |
| LINE Messaging API | Bot webhook + LIFF integration |
| Render.com | Backend API hosting |
| Vercel | Frontend + webhook hosting |
