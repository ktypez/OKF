---
type: workspace-index
id: okf-index
last_updated: 2026-07-11
---

# Workspace Index

## Workspace Summary
- **Root:** `/home`
- **Last Sync:** 2026-07-04 00:00 UTC
- **Scope:** `/home` (excluding node_modules, .git, etc.)

## Project Inventory

| Project | Profile | Agent | Status | Role | Tech Stack |
|---------|---------|-------|--------|------|------------|
| clientdata | [profile](./projects/clientdata/profile.md) | [agent](./projects/clientdata/agent.md) | [status](./projects/clientdata/status.md) | experimental | Next.js 16, React 19, Neon, Drizzle |
| data.mcky.space | [profile](./projects/data.mcky.space/profile.md) | [agent](./projects/data.mcky.space/agent.md) | [status](./projects/data.mcky.space/status.md) | active | Vite 7, React 19, Neon, Drizzle |
| habby | [profile](./projects/habby/profile.md) | [agent](./projects/habby/agent.md) | [status](./projects/habby/status.md) | active | Vite 6, Express, Redis |
| mcky.space | [profile](./projects/mcky.space/profile.md) | [agent](./projects/mcky.space/agent.md) | [status](./projects/mcky.space/status.md) | active | Astro 7, Alpine.js, Supabase |
| receipts-dms | [profile](./projects/receipts-dms/profile.md) | — | [status](./projects/receipts-dms/status.md) | active | Vite 6, React 19, Cloudflare D1/R2 |
| collage | [profile](./projects/collage/profile.md) | [agent](./projects/collage/agent.md) | [status](./projects/collage/status.md) | active | Express 4, sharp, LINE LIFF |
| truck | [profile](./projects/truck/profile.md) | [agent](./projects/truck/agent.md) | [status](./projects/truck/status.md) | active | React 19, Vite 8, Supabase, PWA |
| writer | [profile](./projects/writer/profile.md) | [agent](./projects/writer/agent.md) | — | global | Markdown, AI agent system |

## Schema

- **Format:** [`.opencode/rules/okf-format.md`](./.opencode/rules/okf-format.md)
- **Setup:** [`SETUP.md`](./SETUP.md) — quick start for new environments

## Agent Roles

| Project | Role | Personality |
|---------|------|-------------|
| clientdata | data goblin (experimental) | — |
| data.mcky.space | data goblin (stable) | — |
| habby | trophy goblin | — |
| mcky.space | terminal hipster | — |
| truck | overtime enthusiast | — |
| collage | barista engineer | — |
| receipts-dms | — | — |
| writer | word goblin | — |

## Technology Summary
- **Frameworks:** Next.js, React, Astro, Express, Vite.
- **Databases:** Supabase (PostgreSQL), Neon (PostgreSQL), Redis (Upstash), Cloudflare D1.
- **Integrations:** LINE Platform (LIFF + Bot SDK), Telegram Bot API.
- **Image Processing:** Sharp, WebP (Canvas API).
- **Storage:** Cloudflare R2.

## Documentation Coverage
- **Profiles:** 100%
- **Agent Context:** 100%
- **Structure:** 100%
- **Dependencies:** 100%
- **Commands:** 100%
- **Status:** 100%
- **Knowledge Nodes:** 122

## Triggers

| Trigger | Action | When |
|---------|--------|------|
| `update .md` | Read project KB files, update status + agent context | All |
| `cleanup` | Scan unused deps/files, health check, update KB | All |
| `wrap-day` | Read diff, update changelog + status, commit | truck only |
| `doctor-kb` | Knowledge lifecycle audit — stale, expired | All |
| `backfill` | Seed KB from git history + code structure | Per project |

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/doctor-kb.js` | Knowledge lifecycle audit |
| `scripts/backfill.js` | Seed KB from git/code/docs |
| `scripts/build-graph.js` | Build graph.json from KB files |
| `scripts/dispatch.js` | List open tasks across projects |
| `scripts/claim-task.js` | Claim a task atomically |
| `scripts/complete-task.js` | Close a task + record lesson |
| `scripts/build-dashboard.js` | Generate HTML dashboard |

## MCP Tools

Local MCP server at `~/OKF/mcp-server/`. Use these tools to query and manage the KB.

| Tool | Description |
|------|-------------|
| `okf_list_projects` | List all projects with file counts |
| `okf_get_project` | Get profile + agent + status for a project |
| `okf_query_nodes` | Filter nodes by type/status/project |
| `okf_get_node` | Read single node by ID (frontmatter + body) |
| `okf_search` | Full-text search across all .md files |
| `okf_get_file` | Raw content of any OKF file |
| `okf_create_node` | Create node with auto-generated ID |
| `okf_update_node` | Update frontmatter fields and/or body |
| `okf_update_status` | Set lifecycle status on a node |
| `okf_add_edge` | Add typed link between two nodes |
| `okf_doctor` | Run lifecycle audit (stale, expired, superseded) |
| `okf_list_dir` | List OKF directory structure |

## System Files
- [Conventions](./system/conventions.md) — user profile, Termux setup, communication rules
- [Workspace](./system/workspace.md) — cross-project comparison, dev commands
- [Inventory](./system/inventory.md) — project discovery, task triggers
- [Glossary](./system/glossary.md) — terminology
- [Sync Log](./system/sync-log.md) — change history
