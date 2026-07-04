---
type: document
id: clientdata-structure
project: clientdata
last_updated: 2026-07-04
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors:
  - /home/clientdata/app/
  - /home/clientdata/lib/
  - /home/clientdata/components/
links:
  - type: documents
    target: clientdata-agent
  - type: relates-to
    target: clientdata-profile
  - type: relates-to
    target: clientdata-dependencies
  - type: relates-to
    target: clientdata-commands
---

# Project Structure: clientdata

## Directory Layout
- `app/`: Next.js App Router
  - `api/`: API routes
- `components/`: React components
  - `ui/`: Base UI components
- `hooks/`: Custom hooks (e.g., `useClients`, `useGeolocation`)
- `lib/`: Core logic
  - `db/`: Database utilities
  - `auth.ts`: Authentication
  - `storage.ts`: S3/R2 storage logic
- `scripts/`: Maintenance scripts (e.g., `migrate-redis-to-neon.ts`)
- `types/`: TypeScript type definitions
- `public/`: PWA manifest and icons

## Key Files
- `app/page.tsx`: Main entry point
- `drizzle.config.ts`: Drizzle ORM configuration
- `next.config.ts`: Next.js configuration
