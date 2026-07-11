---
title: collage Agent
description: agent-profile from collage
---

# collage Agent

## Overview

Image collage maker + LINE LIFF bot — users generate themed photo collages in LINE and share them to chat.

## Stack

- **Backend**: Express 4 + sharp (image processing) + opentype.js (Thai font rendering)
- **Frontend**: Vanilla HTML/CSS/JS + LIFF SDK v2
- **Webhook**: Vercel Serverless Function (@line/bot-sdk)
- **Storage**: Cloudflare R2
- **Deploy**: Render.com (backend) + Vercel (frontend/webhook)

## Key Context

- Path: `/home/collage`
- Backend: `node backend/server.js` (port 3000)
- Frontend: single `index.html` with LIFF SDK
- 7 Thai day-of-week color themes, auto-detects current day
- Canvas: 1080px wide, JPEG q85, smart grid layout
- LINE LIFF ID: `2010606328-7UnH1Yre`
- Backend API base: `https://collage-7cgv.onrender.com`
- R2 bucket: `ezzyreport`, public at `pub-737d7924b2654190843ce35c45f973b6.r2.dev`

## LINE Bot Commands

| Command | Action |
|---------|--------|
| `!ส่งรูป` / `!รูป` | Send LIFF collage maker |
| `!เมนู` | Main menu (collage, truck, data) |
| `!ลูกค้า <query>` | Search clients on data.mcky.space |

## Relationships

- `data.mcky.space` — `!ลูกค้า` command queries client search API
- `truck.mcky.space` — main menu links to truck PWA
