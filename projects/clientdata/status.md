---
type: project-status
id: clientdata-status
project: clientdata
last_updated: '2026-07-13'
status: archived
freshness: '2026-07-13'
verified: 2026-07-11T00:00:00.000Z
expires: null
superseded_by: null
anchors:
  - /home/clientdata/
links:
  - type: relates-to
    target: clientdata-profile
  - type: relates-to
    target: clientdata-agent
---


---
type: project-status
id: clientdata-status
project: clientdata
last_updated: 2026-07-13
status: active
freshness: 2026-07-13
verified: 2026-07-13
expires: null
superseded_by: null
anchors:
  - /home/clientdata/
links:
  - type: relates-to
    target: clientdata-profile
  - type: relates-to
    target: clientdata-agent
---

# สถานะโปรเจกต์ — clientdata

## Stack (สแต็ก)

- **Framework**: Next.js 16.2.9 (App Router SPA ใช้ History API)
- **UI Library**: React 19.2.7, TypeScript 6
- **UI System**: shadcn/ui + Base UI + Phosphor Icons
- **Styling**: Tailwind CSS 4.3.1 + PostCSS, 14 theme presets
- **Database**: Neon (Postgres) ผ่าน Drizzle ORM (server actions + API routes)
- **Maps**: MapLibre GL JS (lazy-loaded ผ่าน `next/dynamic`)
- **Auth**: ฐานรหัสผ่าน (scrypt + HMAC tokens), บทบาท admin + viewer
- **Storage**: Cloudflare R2 ผ่าน `@aws-sdk/client-s3`
- **Deploy**: Vercel (serverless) — `master` → `astryx.mcky.space`
- **Font**: IBM Plex Sans Thai ผ่าน `next/font/google`
- **Dark mode**: `next-themes` คู่กับ Tailwind `@custom-variant dark`
- **Tests**: Vitest (16 tests)

## Routes (เส้นทาง)

| Path | Page |
|------|------|
| `/` | SPA Dashboard — maps, client list, admin panel |
| `/c/[id]` | Public client page (no auth) |
| `POST /api/clients` | Create client |
| `GET /api/clients` | List clients (paginated, searchable) |
| `GET /api/clients/search` | Search clients by keyword |
| `GET /api/clients/suggestions` | Get/promote suggestions |
| `GET/PUT/DELETE /api/clients/[id]` | Client CRUD |
| `POST /api/upload` | File upload to R2 |
| `POST /api/auth/login` | Login |
| `POST /api/auth/logout` | Logout |

## Changelog (บันทึกการเปลี่ยนแปลง)

### 2026-07-13
- Sync OKF knowledge base across all 8 projects
- Updated workspace index with current project inventory
- Refreshed documentation timestamps and freshness

### 2026-07-11
- fix: bump SW cache version to v2 — clean install, clear stale api-v1 cache
- fix: remove webpack config — Next.js 16 defaults to Turbopack
- fix: reset search/filter on browser back (popstate handler)
- searchClients: split query into keywords (AND across words, ILIKE per keyword)

### 2026-07-08
- Remove back-navigation stack in favor of native History API
- Combined 2 DB queries into a single join for client list performance
- localStorage cache sync: cache only on create/update, clear on delete
- Fix: seed.sql conflict — renamed `suggestions_userId` → `suggestions_user_id`

### Earlier
- Phone number formatting + copy in client card
- Full-text search across name + shopName (ILIKE, not trigram)
- Suggestion approval with transaction protection
- theme.ts: 14 CSS variable presets, extracted from themes.css
- shadcn/ui migration — 5 components, theme provider replaced
- Photo upload: 3 sizes (thumb/web/original) via R2, lazy loading
- MapLibre GL clustering + popups, lazy loaded via next/dynamic
- scrypt + HMAC auth, server-side sessions, admin + viewer roles
- Public client page at `/c/[id]` — no auth required
- 16 Vitest tests (auth, suggestions, clients, upload)

## Known Issues (ปัญหาที่ทราบ)

- `useReducer` refactor เลื่อนไว้ — มี `useState` hooks 30+ ตัวใน component เดียว
- ไม่มี undo เมื่อลบ client (มี trash restore แต่ไม่มี undo toast)
- SW cache version ต้อง bump เองมือเมื่อมี breaking changes

## Data Model

```sql
clients: id, name, shopName, phone, lat, lng, photoKey, note, suggestedById, createdAt
suggestions: id, name, shopName, phone, suggestedBy, userId, approvedAt
```


