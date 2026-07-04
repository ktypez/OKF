---
type: project-status
id: cafe-status
project: cafe
last_updated: 2026-07-04
state: active
documentation_completeness: High
confidence_level: High
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: cafe-agent
  - type: relates-to
    target: cafe-profile
  - type: relates-to
    target: cafe-structure
---

# Project Status — cafe

## Stack

- **Framework**: Next.js 15.5.19 (App Router)
- **UI Library**: React 19.2.1, TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.11 + PostCSS
- **Animation**: motion 12.23.24
- **Icons**: lucide-react 0.553.0
- **Database**: Supabase (@supabase/supabase-js 2.108.2) + in-memory fallback
- **Storage**: Cloudflare R2 (receipt images)
- **Utils**: clsx, tailwind-merge, class-variance-authority
- **Payment**: PromptPay QR payload generator (CRC16-XModem)
- **LINE**: @line/bot-sdk (messaging API)
- **Receipt**: playwright (headless Chromium) + html2canvas (client-side, 6x scale)
- **Sound**: Web Audio API (no audio files)
- **Auth**: jose (JWT), admin@admin.com restriction
- **Lint**: ESLint 9.39.1 + eslint-config-next 16.0.8
- **GPS**: Haversine formula for delivery distance calculation

## Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Page | Admin Dashboard — kanban, POS, sales |
| `/liff` | Page | Customer LIFF ordering (LINE) |
| `/settings` | Page | Menu & category & customization settings (tabbed) |
| `/api/menus` | API | Menu CRUD |
| `/api/orders` | API | Orders CRUD |
| `/api/recipes` | API | Recipe CRUD |
| `/api/customers` | API | Customer CRUD |
| `/api/auth/login` | API | Admin login |
| `/api/line-notify` | API | LINE push notifications |
| `/api/line/webhook` | API | LINE webhook |

## Components

| Component | Purpose |
|-----------|---------|
| ReceiptViewer | Canonical shared receipt — **do not modify** |
| OrderCard | Kanban card (shadcn Card + Badge) |
| KanbanColumn | Column wrapper (shadcn Card) |
| PosTab | POS ordering (shadcn Card) |
| SalesSummary | Sales table (shadcn Card + Table + Badge) |
| MenuManager | Menu CRUD + R2 photo upload |
| CategoryManager | Category CRUD |
| CustomizationManager | Option CRUD by type |

## Changelog

### 2026-07-02
- **POS layout redesign**: Full-width menu grid with search + category pills, cart as bottom sheet

### 2026-07-01
- Settings as modal, Sheet side prop, Claude-inspired palette, all buttons → shadcn, dynamic categories, customization API, R2 photo upload, delivery fee system, light theme conversion, Cloudflare R2 migration

## Design System

- **Theme**: Claude-inspired warm amber preset
- **All components**: shadcn pattern (cva + cn + forwardRef)
- **Cards**: shadcn Card (`rounded-xl`, `border border-border`, `bg-card`)
- **Badges**: default/secondary/destructive/outline/success/warning
- **Dialogs**: motion-based, no Radix
- **Animations**: `tw-animate-css` for enter/exit animations
- **Status colors**: primary (pending), blue (cooking), emerald (ready), stone (completed)
- **Receipt**: Shared HTML template (720px wide, compact text) — auto-scales to viewport

## Data Model

### Tables (Supabase)
- **menus**: id, name, th_name, description, price, category, image_url, available, customization
- **categories**: id, name, slug, sort_order
- **customization_options**: id, type, label, value, price_modifier, sort_order
- **orders**: id, line_user_id, type, items, total, delivery_fee, slip_url, status
- **shop_settings**: id, open
- **customers**: id, phone_number, line_user_id, points

### Storage
- **Cloudflare R2**: receipt images (`receipts/{orderId}-{timestamp}.jpg`) + menu images
- Bucket: `cafe-receipts`

## Known Issues

- No testing setup yet
- Slip upload uses client-side `URL.createObjectURL` (no persistent storage)
- LIFF page is ~1600 lines (could be split)
- Missing shadcn components: Select, Textarea, Switch
- Pre-existing `sharp` module missing for `/api/line/setup-richmenu` (Termux only)
