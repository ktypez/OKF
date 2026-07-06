---
type: project-profile
id: collage-profile
project: collage
last_updated: 2026-07-06
status: active
freshness: 2026-07-06
verified: 2026-07-06
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: collage-agent
  - type: relates-to
    target: collage-status
  - type: relates-to
    target: collage-structure
  - type: relates-to
    target: collage-dependencies
  - type: relates-to
    target: collage-commands
---

# Project Profile: collage

## Identity
- **Name:** collage
- **Display Name:** Collage Maker
- **Description:** LINE LIFF collage maker — group members upload photos, generates a collage via Sharp, sends it back to the group chat via `liff.sendMessages()`.
- **Purpose:** Free photo collage for LINE groups without Messaging API costs.
- **Repository:** `github.com/ktypez/collage`

## Technology
- **Languages:** JavaScript (ESM)
- **Frameworks:** Express.js, Sharp
- **Runtime:** Node.js v22
- **Package Manager:** npm
- **Build System:** None (pure JS)
- **Deployment Targets:** Frontend → Vercel (static + serverless webhook), Backend → Render (Express)

## Dependencies
- **Major Libraries:** `sharp`, `express`, `multer`, `cors`, `@aws-sdk/client-s3`, `opentype.js`, `fontkit`
- **External Services:** Cloudflare R2 (image storage), Render, Vercel
- **Databases:** None
- **Cloud Providers:** Cloudflare (R2), Render, Vercel, LINE (LIFF)

## Development
- **Setup:** `npm install` in `backend/`
- **Install:** `npm install`
- **Run (backend):** `node server.js`
- **Run (frontend):** Serve `frontend/` as static files

## Architecture
- **Structure:** Frontend (static HTML/JS) + Backend (Express REST API)
- **Entry Points:** `backend/server.js`, `frontend/index.html`
- **Important Packages:** `sharp` for image compositing, `opentype.js` for Thai text rendering

## Documentation
- **Agent Context:** [agent.md](./agent.md)
- **Status:** [status.md](./status.md)

## Quality
- **Tests:** None
- **CI:** Auto-deploy from GitHub (Render + Vercel)

## Status
- **State:** active
- **Documentation Completeness:** Medium
- **Confidence Level:** High
