---
type: project-profile
id: receipts-dms-profile
project: receipts-dms
last_updated: 2026-07-21
status: active
stack:
  language: TypeScript
  framework: Vite 8 + React 19
  ui: Radix UI + Tailwind CSS 4
  database: Cloudflare D1 (SQLite)
  storage: Cloudflare R2
  state: React hooks
  auth: password + HMAC-SHA256
  testing: none
  deployment: Cloudflare Pages
  ci: none
agent_personality: paper goblin
links:
  agent: receipts-dms-agent
  status: receipts-dms-status
---

# receipts-dms

**Role:** production
**Framework:** Vite 8 + React 19 + TypeScript
**Backend:** Cloudflare Pages Functions (D1 + R2)
**Deployment:** Cloudflare Pages (paper.mcky.space)
**Stack:** shadcn/ui, Tailwind v4, lucide-react, react-router v7

## คำอธิบาย

ระบบจัดการเอกสารใบเสร็จ สำหรับจัดระเบียบและจัดการรูปภาพใบเสร็จ รองรับการอัปโหลดพร้อมบีบอัดรูปภาพ (WebP 2048px / 80%), จัดการหมวดหมู่, บันทึกโน้ต, ค้นหาแบบเต็มข้อความ, และ auth แบบรหัสผ่านเดียว

## เทคโนโลยี

| เลเยอร์ | เทคโนโลยี |
|-------|-----------|
| Frontend | Vite 8, React 19, TypeScript 7, Tailwind 4 |
| UI | shadcn/ui (Radix primitives), lucide-react, framer-motion |
| Routing | react-router v7 |
| Auth | รหัสผ่านเดียว (env var) + HMAC-SHA256 cookie |
| Backend | Cloudflare Pages Functions (Workers runtime) |
| Database | Cloudflare D1 (receipts_db) |
| Storage | Cloudflare R2 (BUCKET) |
| Image Processing | Client-side WebP via Canvas API |

## สถาปัตยกรรม

```
receipts-dms/
├── functions/                    # Cloudflare Pages Functions
│   └── api/
│       ├── _middleware.js        # Auth middleware (เช็ค HMAC cookie)
│       ├── auth/
│       │   ├── check.js          # GET /api/auth/check
│       │   ├── login.js          # POST /api/auth/login
│       │   └── logout.js         # POST /api/auth/logout
│       ├── categories.js         # GET/POST /api/categories
│       ├── categories/
│       │   └── [id].js           # PUT/DELETE /api/categories/:id
│       ├── file/
│       │   └── [id].js           # GET /api/file/:id (เสิร์ฟจาก R2)
│       ├── receipts.js           # GET /api/receipts
│       ├── receipts/
│       │   └── [id].js           # GET/PUT/DELETE /api/receipts/:id
│       └── upload.js             # POST /api/upload
├── src/
│   ├── App.tsx                   # Root: BrowserRouter, AuthProvider, routes
│   ├── main.tsx                  # จุดเริ่มต้น
│   ├── index.css                 # Tailwind + CSS variables theme
│   ├── components/
│   │   ├── bottom-nav.tsx        # Mobile bottom nav (ป้ายภาษาไทย)
│   │   ├── layout.tsx            # App shell (sidebar/bottom-nav + content)
│   │   ├── sidebar.tsx           # Desktop sidebar nav
│   │   ├── topbar.tsx            # Top bar (ปุ่มสลับ theme)
│   │   ├── theme-toggle.tsx      # สลับ dark/light
│   │   └── ui/                   # คอมโพเนนต์ shadcn/ui
│   ├── hooks/
│   │   ├── use-categories.ts     # hook ข้อมูลหมวดหมู่
│   │   └── use-receipts.ts       # hook ข้อมูลใบเสร็จ
│   ├── lib/
│   │   ├── api.ts                # API client
│   │   ├── auth-context.tsx      # Auth state provider
│   │   ├── theme-provider.tsx    # Theme context
│   │   ├── use-media-query.ts    # hook media query
│   │   └── utils.ts              # ฟังก์ชันช่วย (stripExtension, cn)
│   ├── pages/
│   │   ├── categories.tsx        # Category CRUD
│   │   ├── dashboard.tsx         # สถิติ + ใบเสร็จล่าสุด
│   │   ├── login.tsx             # เข้าสู่ระบบด้วยรหัสผ่าน
│   │   ├── receipt-detail.tsx    # preview + แก้ไขใบเสร็จ
│   │   ├── receipts.tsx          # รายการใบเสร็จ (มุมมอง table/card)
│   │   ├── settings.tsx          # Theme, สถิติการจัดเก็บ, logout
│   │   └── upload.tsx            # อัปโหลดพร้อมบีบอัด + ความคืบหน้า
│   ├── types/
│   │   └── index.ts              # interface ของ TypeScript
│   └── vite-env.d.ts             # Vite type declarations
├── schema.sql                    # นิยามตาราง D1
├── wrangler.toml                 # config Cloudflare Pages
├── vite.config.ts                # config Vite
└── package.json
```

SPA พร้อม Cloudflare Pages Functions เป็น backend เส้นทาง API ทั้งหมดใต้ `/api/*` ถูกป้องกันโดย `_middleware.js` ยกเว้น `/api/auth/*` Auth ใช้ HttpOnly cookie ที่เซ็นด้วย HMAC

## จุดเริ่มต้น (Entry Points)

| ไฟล์ | หน้าที่ |
|------|---------|
| `src/main.tsx` | App bootstrap |
| `src/App.tsx` | Root component, routing, auth guard |
| `src/lib/auth-context.tsx` | Auth state management |
| `src/lib/api.ts` | API client (fetch helper) |
| `functions/api/_middleware.js` | Auth middleware สำหรับเส้นทาง `/api/*` ทั้งหมด |

## การจัดการสถานะ

React state ผ่าน hooks (`useReceipts`, `useCategories`) Theme ผ่าน React context Auth ผ่าน `AuthProvider` context

## การตัดสินใจหลัก

- auth แบบรหัสผ่านเดียว (ไม่มีลงทะเบียนผู้ใช้) สำหรับใช้ส่วนตัว
- บีบอัดรูปภาพฝั่ง client เป็น WebP ก่อนอัปโหลด (ลดการใช้พื้นที่)
- HttpOnly cookie ที่เซ็นด้วย HMAC สำหรับรักษาสถานะ session
- bottom nav บนมือถือ, sidebar บนเดสก์ท็อป

## Development

| คำสั่ง | การทำงาน |
|---------|--------|
| `npm run dev` | เริ่ม dev server |
| `npm run build` | Production build ไปยัง `./dist` |
| `npm run preview` | Preview build ผลลัพธ์ |
| `npx wrangler pages deploy --project-name receipts-dms ./dist` | Deploy ไป Cloudflare Pages |
| `npx wrangler pages dev --port 8788 ./dist` | รัน Pages Functions แบบท้องถิ่น |
| `npx wrangler d1 execute receipts-db --local --file=schema.sql` | ประยุกต์ schema แบบท้องถิ่น |
| `npx wrangler d1 execute receipts-db --file=schema.sql` | ประยุกต์ schema บน Cloudflare |
| `npx wrangler pages secret put AUTH_PASSWORD --project-name receipts-dms` | ตั้งรหัสผ่าน auth |
| `npx wrangler pages secret put AUTH_SECRET --project-name receipts-dms` | ตั้ง HMAC secret สำหรับ auth |

### ตัวแปรสภาพแวดล้อม (Secrets)

| ตัวแปร | หน้าที่ |
|----------|---------|
| `AUTH_PASSWORD` | รหัสผ่านเดียวสำหรับเข้าสู่ระบบ |
| `AUTH_SECRET` | คีย์ HMAC สำหรับเซ็น/ตรวจสอบ auth token |

## Dependencies

### Runtime

| แพ็กเกจ | เวอร์ชัน | หน้าที่ |
|---------|---------|---------|
| react | ^19.2.7 | UI framework |
| react-dom | ^19.2.7 | DOM renderer |
| react-router | ^7.18.1 | Client routing |
| @radix-ui/react-dialog | ^1.1.19 | Modal dialogs |
| @radix-ui/react-dropdown-menu | ^2.1.20 | Dropdown menus |
| @radix-ui/react-label | ^2.1.11 | Form labels |
| @radix-ui/react-progress | ^1.1.12 | Upload progress bar |
| @radix-ui/react-select | ^2.3.3 | Category select |
| @radix-ui/react-separator | ^1.1.11 | Visual separators |
| @radix-ui/react-slot | ^1.3.0 | Slot/as-child pattern |
| @radix-ui/react-tooltip | ^1.2.12 | Tooltips |
| class-variance-authority | ^0.7.1 | shadcn/ui utility |
| clsx | ^2.1.1 | Class name merging |
| cookie | ^1.1.1 | Cookie parsing |
| framer-motion | ^12.42.2 | Animation library |
| lucide-react | ^1.24.0 | Icons |
| sonner | ^2.0.7 | Toast notifications |
| tailwind-merge | ^3.6.0 | Tailwind class merging |

### Dev

| แพ็กเกจ | เวอร์ชัน | หน้าที่ |
|---------|---------|---------|
| vite | ^8.0.0 | Build tool |
| @vitejs/plugin-react | ^5.0.0 | React plugin for Vite |
| typescript | ^7.0.2 | Type checking |
| tailwindcss | ^4.3.1 | CSS framework |
| @tailwindcss/vite | ^4.3.1 | Tailwind Vite plugin |
| @types/react | ^19.2.17 | React types |
| @types/react-dom | ^19.2.3 | React DOM types |

### Cloudflare

| บริการ | Binding | หน้าที่ |
|---------|---------|---------|
| D1 | `receipts_db` | ฐานข้อมูล SQL (receipts, categories) |
| R2 | `BUCKET` | การเก็บไฟล์ (รูปภาพใบเสร็จ) |

### ภายนอก

| บริการ | หน้าที่ |
|---------|---------|
| Cloudflare Pages | Hosting + Functions runtime |
| paper.mcky.space | Custom domain |

## ที่เกี่ยวข้อง

| ประเภท | ลิงก์ |
|------|------|
| Status | [status.md](./status.md) |

## หลักฐาน

- `package.json`
- `wrangler.toml`
- `vite.config.ts`
- `schema.sql`
- `src/lib/auth-context.tsx`
