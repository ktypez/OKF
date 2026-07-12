---
type: project-structure
id: receipts-dms-structure
project: receipts-dms
last_updated: 2026-07-12
status: active
anchors:
  - /home/paper/receipts-dms/
---

# โครงสร้างไดเรกทอรี

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
│       │   ├── [id].js           # GET/PUT/DELETE /api/receipts/:id
│       │   └── [id]/
│       │       └── tags/         # (legacy, ว่างเปล่า)
│       ├── tags/                 # (legacy, ว่างเปล่า)
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
│   └── types/
│       └── index.ts              # interface ของ TypeScript
├── schema.sql                    # นิยามตาราง D1
├── wrangler.toml                 # config Cloudflare Pages
├── vite.config.ts                # config Vite
├── tailwind.config.js            # config Tailwind (CSS vars)
└── package.json
```
