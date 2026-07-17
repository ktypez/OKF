---
type: project-structure
id: data-mcky-space-structure
project: data.mcky.space
last_updated: 2026-07-12
status: active
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
│   │   ├── LoginModal.tsx        # Admin login modal (password field, see DOC-004)
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
