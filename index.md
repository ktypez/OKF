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
| cafe | [profile](./projects/cafe/profile.md) | [agent](./projects/cafe/agent.md) | [status](./projects/cafe/status.md) | active | Next.js 15, React 19, Supabase, LINE |
| clientdata | [profile](./projects/clientdata/profile.md) | [agent](./projects/clientdata/agent.md) | [status](./projects/clientdata/status.md) | active | Next.js 16, React 19, Neon, Drizzle |
| habby | [profile](./projects/habby/profile.md) | [agent](./projects/habby/agent.md) | [status](./projects/habby/status.md) | active | Vite 6, Express, Redis |
| mcky.space | [profile](./projects/mcky.space/profile.md) | [agent](./projects/mcky.space/agent.md) | [status](./projects/mcky.space/status.md) | active | Astro 7, Alpine.js, Supabase |
| truck | [profile](./projects/truck/profile.md) | [agent](./projects/truck/agent.md) | [status](./projects/truck/status.md) | active | React 19, Vite 8, Supabase, PWA |
| writer | [profile](./projects/writer/profile.md) | [agent](./projects/writer/agent.md) | — | global | Markdown, AI agent system |

## Graph (Knowledge Graph)
The entire KB is connected as a graph with typed edges. Every node has a stable ID.

| Metric | Count |
|--------|-------|
| Total nodes | 115 |
| Total edges | 219 |
| Projects covered | 7 |
| Knowledge types | decision, lesson, risk, component, task, document |

- **Graph index:** `graph.json` — auto-generated registry with all nodes and edges
- **Rebuild:** `node ~/OKF/scripts/build-graph.js`
- **Dashboard:** `dashboard.html` — interactive D3 force-directed graph visualization
- **Dashboard commands:** `bash scripts/dashboard.sh <start|stop|restart|rebuild>`
- **View:** [http://localhost:8080](http://localhost:8080) after `start`
- **Schema:** [`.opencode/rules/okf-format.md`](./.opencode/rules/okf-format.md)

## Agent Roles

| Project | Role | Personality |
|---------|------|-------------|
| cafe | barista engineer | — |
| clientdata | data goblin | — |
| habby | trophy goblin | — |
| mcky.space | terminal hipster | — |
| truck | overtime enthusiast | — |
| writer | word goblin | — |

## Technology Summary
- **Frameworks:** Next.js, React, Astro, Express, Vite.
- **Databases:** Supabase (PostgreSQL), Neon (PostgreSQL), Redis (Upstash).
- **Integrations:** LINE Platform, Telegram Bot API.

## Documentation Coverage
- **Profiles:** 100%
- **Agent Context:** 100%
- **Structure:** 100%
- **Dependencies:** 100%
- **Commands:** 100%
- **Status:** 100%
- **Knowledge Graph:** 115 nodes, 219 edges

## Triggers

| Trigger | Action | Projects |
|---------|--------|----------|
| `update .md` | Read project KB files, update status + agent context | All |
| `cleanup` | Scan unused deps/files, health check, update KB | All |
| `wrap-day` | Read diff, update changelog + status, commit | truck only |
| `dispatch` | Operator — list open tasks, claim, plan, execute | Per project |
| `doctor-kb` | Knowledge lifecycle audit — stale, expired, broken links | All |
| `backfill` | Seed KB from git history + code structure | Per project |
| `dashboard` | Start/stop/restart/rebuild the graph dashboard | OKF |

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/build-graph.js` | Rebuild `graph.json` from all KB files |
| `scripts/build-dashboard.js` | Generate `dashboard.html` |
| `scripts/dashboard.sh` | Start/stop/restart the HTTP server, or rebuild dashboard |
| `scripts/dispatch.js` | List open tasks and context |
| `scripts/claim-task.js` | Atomically claim a task |
| `scripts/complete-task.js` | Close a task and record lesson |
| `scripts/doctor-kb.js` | Knowledge lifecycle audit |
| `scripts/backfill.js` | Seed KB from git/code/docs |

## System Files
- [Conventions](./system/conventions.md) — user profile, Termux setup, communication rules
- [Workspace](./system/workspace.md) — cross-project comparison, dev commands
- [Inventory](./system/inventory.md) — project discovery, task triggers
- [Glossary](./system/glossary.md) — terminology
- [Sync Log](./system/sync-log.md) — change history
