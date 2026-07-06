---
type: document
id: collage-commands
project: collage
last_updated: 2026-07-05
status: active
freshness: 2026-07-05
verified: 2026-07-05
expires: null
superseded_by: null
anchors: []
links:
  - type: documents
    target: collage-agent
  - type: relates-to
    target: collage-dependencies
  - type: relates-to
    target: collage-structure
---

# Project Commands: collage

## Backend

| Command | What it does |
|---------|-------------|
| `node server.js` | Start Express server (port 3000) |
| `node --watch server.js` | Dev mode with auto-restart |

## Deployment

| Action | How |
|--------|-----|
| Push to `main` → Render auto-deploys backend | `git push` |
| Push to `main` → Vercel auto-deploys frontend | `git push` |
| Manual Render deploy | Dashboard → Deploy |
| Manual Vercel deploy | `npx vercel --prod` from `frontend/` |

## LIFF

- LIFF ID: `2010606328-7UnH1Yre`
- LIFF endpoint: `https://report.mcky.space/liff`
- Test URL: `https://liff.line.me/2010606328-7UnH1Yre`
