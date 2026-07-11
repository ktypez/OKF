---
title: Directory Structure
description: project-structure from receipts-dms
---

# Directory Structure

```
receipts-dms/
├── functions/                    # Cloudflare Pages Functions
│   └── api/
│       ├── _middleware.js        # Auth middleware (HMAC cookie check)
│       ├── auth/
│       │   ├── check.js          # GET /api/auth/check
│       │   ├── login.js          # POST /api/auth/login
│       │   └── logout.js         # POST /api/auth/logout
│       ├── categories.js         # GET/POST /api/categories
│       ├── categories/
│       │   └── [id].js           # PUT/DELETE /api/categories/:id
│       ├── file/
│       │   └── [id].js           # GET /api/file/:id (serve from R2)
│       ├── receipts.js           # GET /api/receipts
│       ├── receipts/
│       │   ├── [id].js           # GET/PUT/DELETE /api/receipts/:id
│       │   └── [id]/
│       │       └── tags/         # (legacy, empty)
│       ├── tags/                 # (legacy, empty)
│       └── upload.js             # POST /api/upload
├── src/
│   ├── App.tsx                   # Root: BrowserRouter, AuthProvider, routes
│   ├── main.tsx                  # Entry point
│   ├── index.css                 # Tailwind + CSS variables theme
│   ├── components/
│   │   ├── bottom-nav.tsx        # Mobile bottom nav (Thai labels)
│   │   ├── layout.tsx            # App shell (sidebar/bottom-nav + content)
│   │   ├── sidebar.tsx           # Desktop sidebar nav
│   │   ├── topbar.tsx            # Top bar (theme toggle)
│   │   ├── theme-toggle.tsx      # Dark/light toggle
│   │   └── ui/                   # shadcn/ui components
│   ├── hooks/
│   │   ├── use-categories.ts     # Category data hook
│   │   └── use-receipts.ts       # Receipt data hook
│   ├── lib/
│   │   ├── api.ts                # API client
│   │   ├── auth-context.tsx      # Auth state provider
│   │   ├── theme-provider.tsx    # Theme context
│   │   ├── use-media-query.ts    # Media query hook
│   │   └── utils.ts              # Helpers (stripExtension, cn)
│   ├── pages/
│   │   ├── categories.tsx        # Category CRUD
│   │   ├── dashboard.tsx         # Stats + recent receipts
│   │   ├── login.tsx             # Password login
│   │   ├── receipt-detail.tsx    # Receipt preview + edit
│   │   ├── receipts.tsx          # Receipt list (table/card view)
│   │   ├── settings.tsx          # Theme, storage stats, logout
│   │   └── upload.tsx            # Upload with compression + progress
│   └── types/
│       └── index.ts              # TypeScript interfaces
├── schema.sql                    # D1 table definitions
├── wrangler.toml                 # Cloudflare Pages config
├── vite.config.ts                # Vite config
├── tailwind.config.js            # Tailwind config (CSS vars)
└── package.json
```
