---
type: system-doc
id: sync-log
last_updated: 2026-07-21
---

# Sync Log

## 2026-07-21 (Full OKF Rebuild)

- **Trigger:** User requested "rebuild entire OKF .md ที่เหลือใหม่หมด ไฟล์มันมั่วๆ"
- **Scope:** All 73 .md files audited, 46 files rebuilt
- **Changes:**
  - Standardized frontmatter schema across all project files (profile.md, agent.md, status.md, commands.md, dependencies.md, structure.md)
  - Fixed broken references (deleted scripts: doctor-kb.js, backfill.js, build-graph.js, dispatch.js, claim-task.js, complete-task.js)
  - Fixed data inconsistencies (Vite 7→8, active→archived, 90→30 days, PWA status)
  - Fixed ID naming (mcky-* → mcky-space-*)
  - Removed stray `---` fences, deduplicated frontmatter
  - Added frontmatter to sync-log.md
  - Updated glossary with missing terms
  - Rebuilt SQLite database and dashboard

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

## 2026-07-12 (Add current personality to every agent)

- **Trigger:** User requested "add current personality to KB and every agents and every project"
- **Projects Scanned:** clientdata, collage, data.mcky.space, habby, mcky.space, receipts-dms, truck, writer (all 8)
- **Action:** Added explicit `## Personality` section (Role + description) to every agent.md body so the current personality is visible in KB content, not just frontmatter.
- **Files Updated:**
  - `projects/clientdata/agent.md` — added `## Personality` (data goblin), last_updated 2026-07-12
  - `projects/data.mcky.space/agent.md` — added `## Personality` (data goblin stable), last_updated 2026-07-12
  - `projects/habby/agent.md` — added `## Personality` (trophy goblin), last_updated 2026-07-12
  - `projects/mcky.space/agent.md` — added `## Personality` (terminal hipster), last_updated 2026-07-12
  - `projects/truck/agent.md` — added `## Personality` (overtime enthusiast), last_updated 2026-07-12
  - `projects/writer/agent.md` — added `## Personality` (word goblin), last_updated 2026-07-12
  - `projects/collage/agent.md` — already had personality context (barista engineer) from earlier today
  - `projects/receipts-dms/agent.md` — did NOT exist; created as knowledge node `NODE-002.md` (agent-profile, paper goblin) since `okf_create_node` writes to `knowledge/`
- **index.md Updated:**
  - receipts-dms agent column: `—` → `[agent](./projects/receipts-dms/knowledge/NODE-002.md)`
  - receipts-dms agent role: `—` → `paper goblin`
  - last_updated: 2026-07-11 → 2026-07-12
- **Orphan:** `NODE-001.md` (receipts-dms agent, misnamed) archived (status: archived), left in place to avoid data loss
- **Conflicts:** None
- **Warnings:** receipts-dms has no top-level `agent.md` (system creates knowledge nodes only); index links to the knowledge node instead.

## 2026-07-12 (Personalities doc)

- **Trigger:** User requested documenting agent personalities centrally ("เอาสิ")
- **Files Created:**
  - `system/personalities.md` — canonical reference for all 8 agent personalities (goblin crew), with per-agent obsession table + how-they-fit-together
- **Files Updated:**
  - `index.md` — added Personalities link to System Files section
  - `system/workspace.md` — added "Agent Personalities" section (table of 8 agents) + last_updated 2026-07-12
- **Conflicts:** None
- **Warnings:** None

## 2026-07-12 (Language policy: Thai first)

- **Trigger:** User requested KB use Thai as primary language, English only for loanwords / punchier terms
- **Files Updated:**
  - `system/conventions.md` — added Language rule: "Thai first; English when it fits better (loanwords/technical terms or punchier/fun words)" + last_updated 2026-07-12
  - `system/personalities.md` — rewrote entirely in Thai-led prose with English terms where natural (schema, streak, aesthetic, invalidation, goblin names)
  - `system/workspace.md` — Agent Personalities table rewritten Thai-led (ความคลั่งไคล้ column)
- **Conflicts:** None
- **Warnings:** None

## 2026-07-12 (Translate system/ to Thai-led)

- **Trigger:** User requested "ไหวหรอ" → confirmed, translate system/ files to Thai-first with English for loanwords/punchier terms (scope option 1)
- **Files Rewritten (Thai-led):**
  - `system/glossary.md` — terms kept English (technical), headers + descriptions Thai
  - `system/inventory.md` — all sections Thai-led (ตัวกระตุ้นงาน, รายการโปรเจกต์, อ้างอิง AGENTS.md)
  - `index.md` — all section headers + labels Thai-led (ดัชนี Workspace, รายการโปรเจกต์, บทบาท Agent, ตัวกระตุ้น, สคริปต์, เครื่องมือ MCP, ไฟล์ระบบ)
  - `system/workspace.md` — comparison + dev commands Thai-led (เปรียบเทียบโปรเจกต์, คำสั่ง Dev ตามโปรเจกต์)
  - `system/TODOS.md` — Thai-led (กระบวนการ TODOs, การตรวจสอบตอนเริ่ม)
  - `system/glossary.md`, `inventory.md`, `workspace.md`, `TODOS.md` — last_updated bumped to 2026-07-12
- **Already Thai-led from prior step:** `system/personalities.md`, `system/conventions.md` (language rule)
- **Conflicts:** None
- **Warnings:** Tech stack names, framework names, and goblin nicknames retained in English by policy (fits-better rule).

## 2026-07-12 (Translate all projects to Thai-led, except /knowledge)

- **Trigger:** User requested translating every project KB to Thai-first, EXCEPT files under each project's `/knowledge/` directory.
- **Method:** 5 parallel writer-agent subagents, one per project group (clientdata | collage+data.mcky.space | habby+writer | mcky.space+receipts-dms | truck).
- **Files Translated (Thai-led, English kept for tech terms/frameworks/goblin names):**
  - clientdata (8): agent, assets, commands, decisions, dependencies, profile, status, structure
  - collage (6): agent, commands, dependencies, profile, status, structure
  - data.mcky.space (6): agent, commands, dependencies, profile, status, structure
  - habby (8): agent, assets, commands, decisions, dependencies, profile, status, structure
  - mcky.space (8): agent, assets, commands, decisions, dependencies, profile, status, structure
  - receipts-dms (5): commands, dependencies, profile, status, structure (no root agent.md — agent is a knowledge node, excluded)
  - truck (8): agent, assets, commands, decisions, dependencies, profile, status, structure
  - writer (5): agent, commands, profile, status, structure
  - All `last_updated` bumped to 2026-07-12 where they differed.
- **Excluded (kept as-is):** all `projects/<project>/knowledge/*.md` nodes (per user instruction).
- **Verification:** CJK scan across all non-knowledge project .md files returned zero Chinese characters. One stray CJK fragment ("启动时") found earlier in habby/writer agent files was replaced with Thai ("ตอนเริ่มรัน").
- **Conflicts:** None
- **Warnings:** Some agent.md files contain a duplicated frontmatter block — subagents preserved both blocks and bumped dates; recommend a follow-up cleanup pass to de-duplicate frontmatter if desired.

## 2026-07-12 (De-duplicate duplicated frontmatter)

- **Trigger:** User requested fixing duplicated frontmatter blocks ("แก้ frontmatter ซ้ำ")
- **Finding:** A scan showed `DUP(4)` = 2 stacked frontmatter blocks in 7 `agent.md` files (normal files show `DUP(2)` = open+close fence, not a duplicate). The duplicate FM2 was appended right after FM1's closing `---`, repeated from the original frontmatter.
- **Files Fixed (frontmatter de-duplicated, FM2 block removed):**
  - `projects/clientdata/agent.md`
  - `projects/habby/agent.md`
  - `projects/mcky.space/agent.md`
  - `projects/truck/agent.md`
  - `projects/writer/agent.md`
  - `projects/data.mcky.space/agent.md`
  - (collage/agent.md had only normal `DUP(2)` — no change needed)
- **Verification:** Re-scan confirmed zero files with more than 2 `---` fences. `git diff` shows only the 6 agent.md changed for frontmatter cleanup (other project/agent.md diffs are from the prior Thai translation step). Content/IDs/links preserved; only the stray duplicate FM block was removed.
- **Conflicts:** None
- **Warnings:** None

## 2026-07-13 (Full workspace audit + OKF sync)

- **Trigger:** User requested "ตรวจดูโปรเจค folder in ~/ แล้วอัพเดทใหม่อีกที" (check project folders in ~/ and update again)
- **Discovery:** Scanned `/home/` to compare actual project directories against OKF records
- **Key Findings:**
  - `clientdata` directory **does not exist** — project archived in OKF
  - `data.mcky.space` stack corrected: Neon → Cloudflare D1, added Tailwind 4, Zustand, MapLibre
  - `habby` stack corrected: Redis (Upstash) → ioredis (plain Redis)
  - `collage` stack enriched: added AWS S3, fontkit, opentype.js
  - `truck` stack enriched: added TanStack Query
  - `receipts-dms` stack corrected: Tailwind v3 (not v4), added Radix UI
  - `mcky.space` confirmed: Astro 7 + Alpine.js 3 (CDN) + Supabase + Vercel
- **Files Updated:**
  - `index.md` — project table (tech stacks, clientdata → archived), agent roles, technology summary
  - `projects/data.mcky.space/profile.md` — Neon → Cloudflare D1, added Tailwind 4
  - `projects/habby/profile.md` — Redis (Upstash) → Redis (ioredis)
  - `projects/clientdata/status.md` → status set to `archived`
  - `projects/clientdata/agent.md` → status set to `archived`
  - `projects/clientdata/profile.md` → status set to `archived`
- **Status Changes:**
  - `clientdata-status`: active → archived
  - `clientdata-agent`: active → archived
  - `clientdata-profile`: active → archived
- **Conflicts:** None
- **Warnings:** `clientdata` code no longer exists in `~/`; OKF metadata retained for historical reference.
