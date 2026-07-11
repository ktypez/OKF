# Sync Log

## 2026-07-03 00:00 UTC

- **Projects Scanned:** cafe, cafe-v2, clientdata, habby, mcky.space, truck
- **Files Created:**
  - `/home/OKF/README.md`
  - `/home/OKF/index.md`
  - `/home/OKF/projects/cafe/profile.md`
  - `/home/OKF/projects/cafe-v2/profile.md`
  - `/home/OKF/projects/clientdata/profile.md`
  - `/home/OKF/projects/habby/profile.md`
  - `/home/OKF/projects/mcky.space/profile.md`
  - `/home/OKF/projects/truck/profile.md`
  - `/home/OKF/templates/project-template.md`
- **Files Updated:**
  - `/home/OKF/index.md`
- **Files Skipped:** N/A
- **Conflicts:** None
- **Warnings:** None
- **Duration:** N/A

## 2026-07-03 00:05 UTC (Full KB Populate)

- **Projects Updated:** All
- **Files Created:**
  - `structure.md` (All projects)
  - `dependencies.md` (All projects)
  - `commands.md` (All projects)
  - `status.md` (All projects)
- **Files Updated:**
  - `/home/OKF/index.md`
  - `/home/OKF/system/sync-log.md`
- **Coverage:** 100% for Profiles, Structure, Dependencies, Commands, and Status.

## 2026-07-04 00:00 UTC (AI-KB Migration)

- **Projects Scanned:** cafe, cafe-v2, clientdata, habby, mcky.space, truck, writer
- **Action:** Migrated rich content from `~/AI-KB/` into `~/OKF/` per conversion plan
- **Files Created:**
  - `agent.md` (all projects) — from AI-KB agent profiles (personality, triggers, patterns)
  - `status.md` (all projects) — expanded with routes, components, design system, changelog, API docs
  - `profile.md` (all projects) — enriched with architecture/quality docs
  - `/home/OKF/skills/INDEX.md`
  - `/home/OKF/system/conventions.md`
  - `/home/OKF/system/workspace.md`
  - `/home/OKF/system/inventory.md`
  - `/home/OKF/system/glossary.md`
- **Files Updated:**
  - `/home/OKF/index.md` — added agent_role column, writer project, triggers section, system links
- **Source Deprecated:** `~/AI-KB/` removed (all content migrated)

## 2026-07-05 00:00 UTC

- **Trigger:** manage-okf sync
- **Projects Scanned:** cafe, clientdata, habby, mcky.space, truck, writer
- **Files Updated:** `projects/writer/status.md` — TASK-001 status body fixed (open → closed)
- **New Discoveries:** `/home/DESIGN/` (single design doc, not a project), `/home/reports/` (empty)
- **Conflicts:** None
- **Warnings:** None
- **OKF is already synchronized with the current workspace.**

## 2026-07-06 (Collage KB Sync)

- **Trigger:** User requested collage KB update
- **Projects Scanned:** collage
- **Files Updated:**
  - `projects/collage/profile.md` — deployment targets (webhook on Vercel), added fontkit to major libs
  - `projects/collage/structure.md` — added `frontend/api/webhook.js`, `frontend/package.json`, `vercel.json`
  - `projects/collage/dependencies.md` — added fontkit (backend), `@line/bot-sdk` (frontend)
  - `projects/collage/status.md` — routes split by layer (Vercel vs Render), webhook API note
- **Files Skipped:** `agent.md`, `commands.md` — no changes needed
- **Conflicts:** None
- **Warnings:** None**

## 2026-07-06 (OpenCode Config + Commands)

- **Trigger:** User requested opencode config update for KB integration + make triggers work
- **Files Updated:**
  - `~/.config/opencode/config.json` — expanded instructions (added workspace.md), per-project references, default_agent (kb), skills paths
  - `~/.config/opencode/opencode.jsonc` — added `~/collage/**` to permissions
- **Files Created:**
  - `~/.config/opencode/agents/kb-agent.md` — KB management agent (triggers, graph, dashboard)
  - `~/.config/opencode/commands/update-md.md` — `/update-md` sync project state to KB
  - `~/.config/opencode/commands/cleanup.md` — `/cleanup` health scan
  - `~/.config/opencode/commands/doctor-kb.md` — `/doctor-kb` knowledge lifecycle audit
  - `~/.config/opencode/commands/dispatch.md` — `/dispatch` task operator
  - `~/.config/opencode/commands/dashboard.md` — `/dashboard` graph dashboard control
  - `~/.config/opencode/commands/update-config.md` — `/update-config` sync opencode config with KB

## 2026-07-06

- **Updated:** `clientdata/lib/clients.ts` — `searchClients()` now splits query into individual keywords (AND across keywords, OR across name/shopName). Enables multi-word search like `*ลูกค้า all the wall` matching clients containing all 3 words anywhere in name/shopName.
- **Updated:** `clientdata/status.md` — added changelog entry for keyword search change

## 2026-07-10

- **Projects Added:**
  - `receipts-dms` — receipt document management (Vite 6 + React 19 + Cloudflare D1/R2)
- **Files Created:**
  - `projects/receipts-dms/profile.md`
  - `projects/receipts-dms/structure.md`
  - `projects/receipts-dms/dependencies.md`
  - `projects/receipts-dms/commands.md`
  - `projects/receipts-dms/status.md`
- **Files Updated:**
  - `index.md` — added receipts-dms to project inventory, agent roles, technology summary

## 2026-07-11

- **Project Renamed:** `data` → `data.mcky.space` (matches actual directory at `/home/data.mcky.space/`)
- **Project Added:** `collage` — image collage maker + LINE LIFF bot
- **Path Fixed:** `receipts-dms` — source is `~/paper/receipts-dms` not `~/receipts-dms`
- **Stack Updated:** `data.mcky.space` — corrected from Next.js 16 + Vercel to Vite 7 + Cloudflare Pages
- **Files Created:**
  - `projects/collage/profile.md`, `structure.md`, `commands.md`, `dependencies.md`, `status.md`, `agent.md`
  - `projects/data.mcky.space/structure.md`, `commands.md`, `dependencies.md`
  - `scripts/build-graph.js`, `scripts/dispatch.js`, `scripts/claim-task.js`, `scripts/complete-task.js`, `scripts/build-dashboard.js`
  - `graph.json`
- **Files Updated:**
  - `index.md` — added collage, renamed data → data.mcky.space, updated scripts table
  - `USAGE.md` — renamed data → data.mcky.space
  - `workspace.md` — renamed data → data.mcky.space, fixed source path
  - `projects/data.mcky.space/profile.md`, `status.md`, `agent.md` — stack/anchors/ids
  - `projects/clientdata/status.md` — recent changelog (SW v2, webpack removal, keyword search)
  - `projects/truck/status.md` — recent changelog (type safety, holiday pay)
  - `projects/mcky.space/status.md` — recent changelog (API removal, blog layout)
  - `projects/habby/status.md` — recent changelog (test suite, AGENTS.md)
  - `projects/collage/agent.md` — cross-link fixed to data-mcky-space-agent
  - `opencode.jsonc` — added `~/collage/**`, `~/paper/**`, `~/data.mcky.space/**` permissions
  - `.gitignore` — added dashboard.html
- **Removed:**
  - `collage` from index.md agent roles (orphan ref)
  - `~/cafe/`, `~/collage/` from cleanup.md source roots (directories don't exist)
