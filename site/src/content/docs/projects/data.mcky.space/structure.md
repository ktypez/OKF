---
title: โครงสร้างโฟลเดอร์ (Directory Structure)
description: project-structure from data.mcky.space
---

# โครงสร้างโฟลเดอร์ (Directory Structure)

```
data.mcky.space/
├── functions/                    # Cloudflare Pages Functions
│   └── api/
│       ├── _middleware.ts        # Auth middleware
│       ├── clients.ts            # GET /api/clients
│       ├── clients/
│       │   ├── [id].ts           # GET/PUT/DELETE /api/clients/:id
│       │   ├── search.ts         # GET /api/clients/search
│       │   ├── suggestions.ts    # GET/POST /api/clients/suggestions
│       │   └── trash/
│       │       ├── index.ts      # GET /api/clients/trash
│       │       └── [id].ts       # POST/DELETE /api/clients/trash/:id
│       ├── auth/
│       │   ├── login.ts          # POST /api/auth/login
│       │   └── logout.ts         # POST /api/auth/logout
│       └── upload.ts             # POST /api/upload
├── src/
│   ├── App.tsx                   # Root: router + providers
│   ├── main.tsx                  # Entry point
│   ├── index.css                 # Tailwind + CSS variables
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   └── ...
│   ├── lib/
│   │   ├── db.ts                 # Drizzle ORM client
│   │   └── ...
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Clients.tsx
│   │   └── ...
│   └── stores/
│       └── ...                   # Zustand stores
├── wrangler.toml                 # Cloudflare Pages config
├── vite.config.ts
├── package.json
└── tsconfig.json
```
