---
type: workspace-index
id: okf-index
last_updated: 2026-07-04
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
| cafe-v2 | [profile](./projects/cafe-v2/profile.md) | [agent](./projects/cafe-v2/agent.md) | [status](./projects/cafe-v2/status.md) | experimental | Express, LINE Bot, LIFF |
| clientdata | [profile](./projects/clientdata/profile.md) | [agent](./projects/clientdata/agent.md) | [status](./projects/clientdata/status.md) | active | Next.js 16, React 19, Neon, Drizzle |
| habby | [profile](./projects/habby/profile.md) | [agent](./projects/habby/agent.md) | [status](./projects/habby/status.md) | active | Vite 6, Express, Redis |
| mcky.space | [profile](./projects/mcky.space/profile.md) | [agent](./projects/mcky.space/agent.md) | [status](./projects/mcky.space/status.md) | active | Astro 7, Alpine.js, Supabase |
| truck | [profile](./projects/truck/profile.md) | [agent](./projects/truck/agent.md) | [status](./projects/truck/status.md) | active | React 19, Vite 8, Supabase, PWA |
| writer | [profile](./projects/writer/profile.md) | [agent](./projects/writer/agent.md) | — | global | Markdown, AI agent system |

## Agent Roles

| Project | Role | Personality |
|---------|------|-------------|
| cafe | barista engineer | — |
| cafe-v2 | — | — |
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

## Triggers

| Trigger | Action | Projects |
|---------|--------|----------|
| `update .md` | Read project KB files, update status + agent context | All |
| `cleanup` | Scan unused deps/files, health check, update KB | All |
| `wrap-day` | Read diff, update changelog + status, commit | truck only |

## System Files
- [Conventions](./system/conventions.md) — user profile, Termux setup, communication rules
- [Workspace](./system/workspace.md) — cross-project comparison, dev commands
- [Inventory](./system/inventory.md) — project discovery, task triggers
- [Glossary](./system/glossary.md) — terminology
- [Sync Log](./system/sync-log.md) — change history
