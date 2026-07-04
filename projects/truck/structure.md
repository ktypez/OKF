---
type: document
id: truck-structure
project: truck
last_updated: 2026-07-04
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: documents
    target: truck-agent
  - type: relates-to
    target: truck-profile
---

# Project Structure: truck

## Directory Layout
- `src/`: React source code
  - `components/`: UI components
  - `hooks/`: Custom React hooks
  - `lib/`: Utility and API logic
  - `utils/`: Helper functions
  - `styles/`: CSS and theme files
  - `test/`: Vitest tests
- `public/`: PWA assets (icons, splash, sw.js)
- `supabase/`: Supabase functions and migrations
- `api/`: External API integrations (e.g., `telegram.ts`)

## Key Files
- `src/main.tsx`: App entry point
- `src/App.tsx`: Root component
- `vite.config.ts`: Vite configuration
- `vitest.config.ts`: Test configuration
