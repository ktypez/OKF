---
type: project-profile
id: data-mcky-space-profile
project: data.mcky.space
last_updated: 2026-07-22
status: active
stack:
  language: TypeScript
  framework: Vite 8 + React 19
  ui: Tailwind CSS 4
  database: Cloudflare D1 (SQLite)
  storage: Cloudflare R2
  state: Zustand
  auth: password (admin/viewer)
  testing: health-check script
  deployment: Cloudflare Pages
  ci: none
agent_personality: data goblin (stable)
links:
  agent: data-mcky-space-agent
  status: data-mcky-space-status
---

# ข้อมูลโปรเจกต์: data.mcky.space

## ข้อมูลจำเพาะ (Identity)
- **Name:** data.mcky.space
- **Display Name:** data.mcky.space (Production)
- **Description:** ระบบจัดการลูกค้า & CRM — production deployment
- **Purpose:** production deployment ของ clientdata, สร้างใหม่ด้วย Vite + Cloudflare Pages
- **Repository:** `ktypez/data.mcky.space` (branch main)

## เทคโนโลยี (Technology)
- **Languages:** TypeScript
- **Frameworks:** Vite 8, React 19, Tailwind CSS 4
- **Animation:** Motion (Framer Motion) v12
- **Runtime:** Node.js
- **Package Manager:** pnpm
- **Build System:** Vite
- **Deployment Targets:** Cloudflare Pages

## Dependencies

### Runtime

| Package | Version | Purpose |
|---------|---------|---------|
| react / react-dom | 19.2.7 | UI framework |
| react-router-dom | ^7.6.0 | เราติ้งฝั่ง client |
| drizzle-orm | ^0.45.2 | Database ORM |
| zustand | ^5.0.14 | จัดการ state |
| maplibre-gl | ^5.24.0 | เรนเดอร์แผนที่ |
| @phosphor-icons/react | ^2.1.10 | Icons |
| class-variance-authority | ^0.7.1 | สร้าง CSS variants |
| tailwind-merge | ^3.6.0 | Merge Tailwind classes |
| open-location-code | ^1.0.3 | Plus Codes (Open Location Code) |
| cookie | ^2.0.1 | จัดการ cookies |

### Dev

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^8.0.0 | Build tool |
| @vitejs/plugin-react | ^5.0.0 | Vite React plugin |
| typescript | ^6.0.3 | ตรวจสอบ type |
| tailwindcss | ^4.3.1 | CSS framework |
| @tailwindcss/vite | ^4.3.1 | Tailwind Vite plugin |
| wrangler | ^4.0.0 | Deploy Cloudflare Pages |

## การพัฒนา (Development)

### คำสั่ง (Commands)

| Command | Action |
|---------|--------|
| `pnpm dev` | เริ่ม dev server |
| `pnpm run build` | สร้าง production build |
| `pnpm exec wrangler pages deploy ./dist --project-name=data-mcky-space` | Deploy ไป Cloudflare Pages (git auto-deploy ปิดอยู่) |
| `pnpm exec wrangler pages dev --port 8788 ./dist` | รัน Pages Functions บน local |
| `node scripts/health-check.mjs` | ตรวจสภาพ production (หน้าขาว/refresh loop/SW v2/bare spec) |

### หมายเหตุ deploy
- Git auto-deploy **ปิด** (production_deployments_enabled:false) → `wrangler pages deploy` คือผู้คุมเดียว
- ใช้ `--project-name=data-mcky-space` (ไม่ใช่ `data`)
- ไม่ใช้ `--branch` flag
- ถ้า build พังด้วย UNRESOLVED_IMPORT ให้เช็ค `vite.config.ts` resolve.alias (pnpm strict layout)

## สถาปัตยกรรม (Architecture)

### โครงสร้างโฟลเดอร์

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

### สรุปสถาปัตยกรรม
- **Structure:** Vite SPA กับ Cloudflare Pages Functions backend
- **Animation:** Motion (Framer Motion) — AnimatePresence for mount/unmount, spring transitions, stagger containers, shared variants in `src/lib/motion.ts`
- **State:** Zustand
- **Source:** `ktypez/data.mcky.space` (branch main), ย้ายจาก Next.js มา Vite
- **Maps:** MapLibre GL JS — `InlineMap.tsx` lazy-loaded แยก chunk (`React.lazy` + `Suspense`) ถ้าพังจะไม่กระทบหน้าอื่น
- **PWA/SW:** มี service worker (`public/sw.js` v2) ทำแค่ cache app shell อย่างปลอดภัย, network-first, **ไม่มี auto-reload**

## การ deploy (Deployment)
- **Branch:** `main`
- **Domain:** `data.mcky.space`
- **Platform:** Cloudflare Pages (project: `data-mcky-space`)
- **Auto-deploy (git):** ปิด (production_deployments_enabled:false)
- **Deploy command:** `pnpm exec wrangler pages deploy ./dist --project-name=data-mcky-space` (ไม่ใช้ --branch)

## สถานะ (Status)
- **State:** active (STABLE — 2026-07-17 เพิ่ม Motion animations)
- **Role:** Production deployment
- **Source:** `clientdata` (branch master — ทดลอง), ย้ายมา Vite แล้ว
