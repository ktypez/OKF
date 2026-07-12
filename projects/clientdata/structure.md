---
type: document
id: clientdata-structure
project: clientdata
last_updated: 2026-07-12
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

# โครงสร้างโปรเจกต์: clientdata

## Directory Layout (โครงสร้างไดเรกทอรี)

- `app/`: Next.js App Router
  - `api/`: API routes
- `components/`: React components
  - `ui/`: Base UI components
- `hooks/`: Custom hooks (เช่น `useClients`, `useGeolocation`)
- `lib/`: Core logic
  - `db/`: Database utilities
  - `auth.ts`: Authentication
  - `storage.ts`: S3/R2 storage logic
- `scripts/`: Maintenance scripts (เช่น `migrate-redis-to-neon.ts`)
- `types/`: TypeScript type definitions
- `public/`: PWA manifest และ icons

## Key Files (ไฟล์สำคัญ)

- `app/page.tsx`: จุด entry หลัก
- `drizzle.config.ts`: การตั้งค่า Drizzle ORM
- `next.config.ts`: การตั้งค่า Next.js
