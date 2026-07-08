---
type: workspace-index
id: okf-index
last_updated: 2026-07-05
---

# Workspace Index

## Workspace Summary
- **Root:** `/home`
- **Last Sync:** 2026-07-04 00:00 UTC
- **Scope:** `/home` (excluding node_modules, .git, etc.)

## Project Inventory

| Project | Profile | Agent | Status | Role | Tech Stack |
|---------|---------|-------|--------|------|------------|
| clientdata | [profile](./projects/clientdata/profile.md) | [agent](./projects/clientdata/agent.md) | [status](./projects/clientdata/status.md) | active | Next.js 16, React 19, Neon, Drizzle |
| habby | [profile](./projects/habby/profile.md) | [agent](./projects/habby/agent.md) | [status](./projects/habby/status.md) | active | Vite 6, Express, Redis |
| mcky.space | [profile](./projects/mcky.space/profile.md) | [agent](./projects/mcky.space/agent.md) | [status](./projects/mcky.space/status.md) | active | Astro 7, Alpine.js, Supabase |
| truck | [profile](./projects/truck/profile.md) | [agent](./projects/truck/agent.md) | [status](./projects/truck/status.md) | active | React 19, Vite 8, Supabase, PWA |
| collage | [profile](./projects/collage/profile.md) | [agent](./projects/collage/agent.md) | [status](./projects/collage/status.md) | active | Express, Sharp, R2, LIFF |
| astryx | [status](./projects/astryx/status.md) | — | [status](./projects/astryx/status.md) | active | — |
| writer | [profile](./projects/writer/profile.md) | [agent](./projects/writer/agent.md) | — | global | Markdown, AI agent system |

## Graph (Knowledge Graph)
The entire KB is connected as a graph with typed edges. Every node has a stable ID.

| Metric | Count |
|--------|-------|
| Total nodes | 106 |
| Total edges | 208 |
| Projects covered | 7 |
| Knowledge types | decision, lesson, risk, component, task, document |

- **Graph index:** `graph.json` — auto-generated registry with all nodes and edges
- **Rebuild:** `node ~/OKF/scripts/build-graph.js`
- **Dashboard:** Vercel — `deploy-dashboard` trigger to deploy
- **Schema:** [`.opencode/rules/okf-format.md`](./.opencode/rules/okf-format.md)

## Agent Roles

| Project | Role | Personality |
|---------|------|-------------|
| clientdata | data goblin | — |
| habby | trophy goblin | — |
| mcky.space | terminal hipster | — |
| truck | overtime enthusiast | — |
| collage | barista engineer | — |
| writer | word goblin | — |

## Technology Summary
- **Frameworks:** Next.js, React, Astro, Express, Vite.
- **Databases:** Supabase (PostgreSQL), Neon (PostgreSQL), Redis (Upstash).
- **Integrations:** LINE Platform (LIFF), Telegram Bot API.
- **Image Processing:** Sharp.
- **Storage:** Cloudflare R2.

## Documentation Coverage
- **Profiles:** 100%
- **Agent Context:** 100%
- **Structure:** 100%
- **Dependencies:** 100%
- **Commands:** 100%
- **Status:** 100%
- **Knowledge Graph:** 122 nodes, 233 edges

## Triggers

| Trigger | Action | When |
|---------|--------|------|
| `update .md` | Read project KB files, update status + agent context | All |
| `cleanup` | Scan unused deps/files, health check, update KB | All |
| `wrap-day` | Read diff, update changelog + status, commit | truck only |
| `dispatch` | Operator — list open tasks, claim, plan, execute | Per project |
| `doctor-kb` | Knowledge lifecycle audit — stale, expired, broken links | All |
| `backfill` | Seed KB from git history + code structure | Per project |
| `deploy-dashboard` | Deploy dashboard to Vercel (dev/preview/prod) | `dashboard/public/index.html` or `api/github.js` changes |
| `deploy-mcp` | Deploy MCP server to Cloudflare Workers | Any `mcp-server/src/*.ts` or `wrangler.jsonc` changes |

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/build-graph.js` | Rebuild `graph.json` from all KB files |
| `scripts/deploy-dashboard.sh` | Deploy dashboard to Vercel |
| `scripts/dispatch.js` | List open tasks and context |
| `scripts/claim-task.js` | Atomically claim a task |
| `scripts/complete-task.js` | Close a task and record lesson |
| `scripts/doctor-kb.js` | Knowledge lifecycle audit |
| `scripts/backfill.js` | Seed KB from git/code/docs |
| `mcp-server/` | MCP server — Cloudflare Workers + Durable Object |

## System Files
- [Conventions](./system/conventions.md) — user profile, Termux setup, communication rules
- [Workspace](./system/workspace.md) — cross-project comparison, dev commands
- [Inventory](./system/inventory.md) — project discovery, task triggers
- [Glossary](./system/glossary.md) — terminology
- [Sync Log](./system/sync-log.md) — change history
