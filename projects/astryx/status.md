---
type: project-status
id: astryx-status
project: astryx
last_updated: 2026-07-07
status: active
freshness: 2026-07-07
verified: 2026-07-07
expires: null
superseded_by: null
state: active
documentation_completeness: Low
confidence_level: Medium
anchors:
  - /home/astryx/app/
  - /home/astryx/components/
  - /home/astryx/lib/
links:
  - type: relates-to
    target: clientdata-status
  - type: relates-to
    target: DEC-008
  - type: relates-to
    target: TASK-003
---

# Project Status — astryx

Fork of [clientdata](/root/OKF/projects/clientdata/status.md) with Astryx Design System UI. Same backend, same API, same data model — only the frontend UI layer changed.

## Stack

- **Framework**: Next.js 16.2.9 (App Router)
- **UI Library**: React 19.2.7, TypeScript 6.0.3
- **UI System**: Astryx Design System v0.1.3 (Meta) — Neutral theme preset
- **Icons**: lucide-react via `@astryxdesign/core/Icon`
- **Styling**: Tailwind CSS 4.3.1 + PostCSS + Astryx CSS tokens
- **Database**: Neon (Postgres) via same API as clientdata
- **Auth**: Password-based (SHA-256), admin + viewer roles
- **Storage**: Supabase Storage (client images)
- **Deploy**: Vercel (serverless) — `main` → `astryx.mcky.space`
- **Font**: IBM Plex Sans Thai via `next/font/google`

## Repo

- **GitHub**: https://github.com/ktypez/astryx
- **Vercel**: astryx project (pongwashira-sroywongsas-projects)
- **Domain**: https://astryx.mcky.space

## Changelog

### 2026-07-07

- **Fork from clientdata**: Created separate repo `ktypez/astryx` with Astryx migration code. All shadcn/ui, Base UI, Phosphor Icons replaced with Astryx + lucide. See clientdata changelog for earlier history.
- **Fix**: Added missing `lib/astryx-setup.ts` — icon registry file was never committed. Pushed fix, Vercel should auto-deploy.
- **Sidebar → BottomNav**: Replaced sidebar with mobile-only bottom navigation bar (5 tabs: Home, Filter, +, Map, Account). Centered "+" button opens add-client form. Filter & User dropdowns with counts and theme toggle. Removed Sidebar.tsx, `sidebarOpen` state, hamburger menus from all views. `components/BottomNav.tsx` added.
- **Remove PageHeader**: Deleted PageHeader component. Removed all desktop-responsive view modes (DesktopTableView, DesktopCardView, GroupedTableView). Inline search bar in list view. Map/detail views use BottomNav for navigation.
- **LoginModal redesign**: Switched to full Astryx components (HStack, VStack, Heading, Text, Icon). Cleaned up inline tailwind classes — uses Astryx tokens and component props.
- **ClientTablePage**: Replaced MobileCardList with Astryx Table + PowerSearch from `table-page` template. Columns: Name/Shop (clickable → detail), Address, Images (Badge), Created date. PowerSearch handles search/filter. BottomNav simplified to 4 tabs (Filter tab removed). SelectionToolbar, RouteModal, MobileCardList removed.
