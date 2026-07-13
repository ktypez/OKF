---
title: Project Structure — clientdata
description: document from clientdata
---

:::caution[Archived Project]
This project is no longer actively maintained. Content may be outdated.
:::

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
