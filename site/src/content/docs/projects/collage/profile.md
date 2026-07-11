---
title: 'Project Profile: collage'
description: project-profile from collage
---

# Project Profile: collage

## Identity
- **Name:** collage
- **Description:** Image collage maker with LINE LIFF bot integration.
- **Purpose:** Generate themed photo collages shared via LINE chat.

## Technology
- **Languages:** JavaScript (Node.js), HTML/CSS
- **Frameworks:** Express 4 (backend), vanilla HTML/CSS/JS (frontend)
- **Runtime:** Node.js (ESM)
- **Package Manager:** npm
- **Image Processing:** sharp 0.33, opentype.js 2.0, fontkit 2.0
- **Deployment Targets:** Render.com (backend API), Vercel (frontend + webhook)

## Dependencies
- **Backend:** `sharp`, `express`, `multer`, `@aws-sdk/client-s3`, `fontkit`, `opentype.js`
- **Frontend:** `@line/bot-sdk` (for webhook serverless function)
- **External Services:** Cloudflare R2 (image storage), LINE Messaging API
- **Font:** NotoSansThai (bundled .ttf)

## Architecture
- **Backend:** Express server on Render.com — collage generation API
- **Frontend:** Single HTML page with LIFF SDK v2 — collage maker UI
- **Webhook:** Vercel Serverless Function — LINE bot command handler
- **Storage:** Cloudflare R2 for generated collage images

## Deployment
| Component | Platform | URL |
|-----------|----------|-----|
| Backend API | Render.com | `collage-7cgv.onrender.com` |
| Frontend + Webhook | Vercel | collage.vercel.app |
| Image storage | Cloudflare R2 | pub-737d7924b2654190843ce35c45f973b6.r2.dev |
| Source | GitHub | `github.com/ktypez/collage` |

## Status
- **State:** active
- **Role:** Active development
- **LINE LIFF ID:** `2010606328-7UnH1Yre`
