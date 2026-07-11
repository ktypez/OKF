---
type: project-structure
id: collage-structure
project: collage
last_updated: 2026-07-11
status: active
anchors:
  - /home/collage/
---

# Directory Structure

```
collage/
├── backend/
│   ├── server.js              # Express server: routes, multer, startup
│   ├── collage.js             # Core: layout engine, header SVG, card/shadow rendering
│   ├── r2-storage.js          # S3 client for R2: upload, get stream, cleanup old
│   ├── NotoSansThai.ttf       # Thai font for text overlay
│   ├── .env.example           # R2 env vars template
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── index.html             # LIFF app page (collage maker UI)
│   ├── sample.html            # Theme color preview mockup
│   ├── api/
│   │   └── webhook.js         # LINE bot webhook (Vercel Serverless Function)
│   ├── vercel.json            # Route /liff → /index.html
│   ├── .env.local             # Vercel OIDC token
│   └── package.json
├── .gitignore
├── .vercel/
│   └── repo.json
```
