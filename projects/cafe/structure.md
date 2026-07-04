---
type: document
id: cafe-structure
project: cafe
last_updated: 2026-07-04
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: documents
    target: cafe-agent
  - type: relates-to
    target: cafe-profile
---

# Project Structure: cafe

## Directory Layout
- `app/`: Next.js App Router
  - `api/`: API routes
  - `liff/`: LIFF specific pages
  - `settings/`: Settings pages
- `components/`: React components
  - `ui/`: Base UI components
  - `admin/`: Admin panel components
- `hooks/`: Custom React hooks (e.g., `use-liff`, `use-auth`)
- `lib/`: Core utility functions and business logic
  - `supabase.ts`: Supabase client
  - `promptpay.ts`: PromptPay QR generation
  - `line-bot.ts`: LINE Bot logic
- `public/`: Static assets (menu images, etc.)
- `fonts/`: Custom fonts (Kanit)
- `supabase/`: Supabase migrations and config
- `scripts/`: Utility scripts (e.g., `setup-richmenu.mjs`)
- `__tests__`: Vitest tests

## Key Files
- `app/page.tsx`: Main entry point
- `lib/supabase.ts`: Database connection
- `next.config.ts`: Next.js configuration
