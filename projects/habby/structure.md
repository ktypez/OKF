---
type: document
id: habby-structure
project: habby
last_updated: 2026-07-04
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: documents
    target: habby-agent
  - type: relates-to
    target: habby-profile
---

# Project Structure: habby

## Directory Layout
- `api/`: Backend API logic
- `css/`: Global styles
- `js/`: Frontend logic (`main.js`)
- `public/`: Static assets and Service Worker
- `dist/`: Build output
- `scripts/`: Utility scripts (e.g., `cleanup-archived.mjs`)

## Key Files
- `index.html`: Main entry point
- `server.js`: Express server for hosting/API
- `vite.config.js`: Vite build configuration
