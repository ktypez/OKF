---
type: document
id: collage-structure
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
    target: collage-agent
  - type: relates-to
    target: collage-profile
---

# Project Structure: collage

## Directory Layout

```
/home/collage/
├── frontend/
│   ├── index.html           ← LIFF app UI (static, Vercel-deployed)
│   ├── api/
│   │   └── webhook.js       ← LINE webhook (Vercel serverless function)
│   ├── package.json
│   ├── vercel.json
│   └── .env.local           ← LINE credentials (gitignored)
├── backend/
│   ├── server.js            ← Express server (collage API, image proxy)
│   ├── collage.js           ← Sharp collage engine
│   ├── r2-storage.js        ← S3-compatible R2 client
│   ├── NotoSansThai.ttf     ← Embedded Thai font (214KB)
│   ├── package.json
│   └── .env                 ← R2 credentials (gitignored)
├── .gitignore
├── .vercel/
└── AGENTS.md
```

## Key Files

| File | Purpose |
|------|---------|
| `frontend/index.html` | LIFF app — file upload, name/date inputs, preset picker, status messages |
| `frontend/api/webhook.js` | LINE webhook — `!`/`*` commands, clientdata search (Vercel serverless) |
| `frontend/vercel.json` | Vercel config — `/liff` rewrite to `index.html` |
| `backend/server.js` | Express — `POST /api/collage`, `GET /api/image/:filename`, `GET /health` |
| `backend/collage.js` | Core engine — grid layout, Sharp composite, SVG header, presets |
| `backend/r2-storage.js` | `uploadCollage()`, `getCollageStream()` via `@aws-sdk/client-s3` |
| `backend/NotoSansThai.ttf` | Thai font for opentype.js SVG path rendering |
