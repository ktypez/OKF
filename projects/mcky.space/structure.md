---
type: document
id: mcky-structure
project: mcky.space
last_updated: 2026-07-04
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: documents
    target: mcky-agent
  - type: relates-to
    target: mcky-space-profile
---

# Project Structure: mcky.space

## Directory Layout
- `src/`: Astro source code
  - `pages/`: Route definitions
  - `components/`: Astro/UI components
  - `layouts/`: Page layouts
  - `lib/`: Utility functions
  - `api/`: API endpoints
  - `data/`: Static data files
- `public/`: Static assets (fonts, etc.)
- `docs/`: Project documentation
- `scripts/`: Build scripts (e.g., `build-blog-posts.mjs`)

## Key Files
- `astro.config.mjs`: Astro configuration
- `setup.sql`: Database setup script
- `vercel.json`: Vercel deployment config
