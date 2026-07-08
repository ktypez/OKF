---
type: instruction
id: okf-usage
last_updated: 2026-07-04
---

# OKF Usage Guide

## How to Use This Knowledge Base

This Knowledge Base (`~/OKF/`) is a portable, self-documenting system for AI coding agents.

### Bootstrap Flow

Before starting any task, follow this flow:

1. **Read INDEX.md** — `~/OKF/index.md` for project roster + rules
2. **Read AGENTS.md** — project root `./AGENTS.md` for KB links
3. **Follow links** — read every file in the `## KB` section of AGENTS.md
4. **Read conventions** — `~/OKF/system/conventions.md` for communication rules + Termux setup
5. **Start task** — you now have full context

### Universal Prompt

Copy this block into your AI tool's custom instructions / system prompt:

---

You have access to a shared knowledge base at `~/OKF/`. Before any task:

1. Read `~/OKF/index.md` — project roster and global rules
2. Read `./AGENTS.md` in current project root — follow its `## KB` links
3. Read every file linked in that `## KB` section
4. Read `~/OKF/system/conventions.md` for communication rules
5. Start working

**Projects:**

| Project | Agent | Status |
|---------|-------|--------|
| cafe | [agent](projects/cafe/agent.md) | [status](projects/cafe/status.md) |
| clientdata | [agent](projects/clientdata/agent.md) | [status](projects/clientdata/status.md) |
| habby | [agent](projects/habby/agent.md) | [status](projects/habby/status.md) |
| mcky.space | [agent](projects/mcky.space/agent.md) | [status](projects/mcky.space/status.md) |
| truck | [agent](projects/truck/agent.md) | [status](projects/truck/status.md) |
| collage | [agent](projects/collage/agent.md) | [status](projects/collage/status.md) |
| writer | [agent](projects/writer/agent.md) | — |

Shared: `~/OKF/system/conventions.md`, `~/OKF/system/workspace.md`

**Rules:**
- No Chinese characters — Thai or English only
- Concise, direct answers (< 4 lines when possible)
- Read INDEX.md + AGENTS.md + linked KB files before writing code
- Don't update KB files unless told (valid triggers: `update .md`, `cleanup`)
- Never commit or push unless told
- Don't create README or docs files unless asked

### Directory Layout

```
~/OKF/
├── index.md                ← Entry point — start here
├── README.md               ← Overview
├── USAGE.md                ← This file — how to use
├── projects/               ← Project-specific docs
│   ├── <project>/
│   │   ├── agent.md        ← Agent context (personality, triggers, patterns)
│   │   ├── profile.md      ← Technical metadata (stack, deps, architecture)
│   │   ├── status.md       ← Live project status (routes, design, changelog)
│   │   ├── structure.md    ← Directory layout
│   │   ├── dependencies.md ← Package dependencies
│   │   ├── commands.md     ← Dev commands
│   │   ├── decisions.md    ← Architecture decisions
│   │   └── assets.md       ← Media assets
│   └── ...
├── system/                 ← Workspace-level docs
│   ├── conventions.md      ← Communication rules, Termux setup
│   ├── workspace.md        ← Cross-project comparison, dev commands
│   ├── inventory.md        ← Task triggers, AGENTS.md patterns
│   ├── glossary.md         ← Terminology
│   └── sync-log.md         ← Change history
├── skills/                 ← Specialized skills
│   └── INDEX.md
└── templates/              ← Templates
    └── project-template.md
```

## Triggers

| Trigger | Action | When |
|---------|--------|------|
| `update .md` or `update kb` | Read project state → update status.md → sync agent.md | |
| `cleanup` | Scan unused files/deps → health check → present findings → update KB | |
| `wrap-day` | Read git diff → add changelog entry → update status → commit (truck only) | |
| `dispatch` | Operator — list open tasks, claim, plan, execute | Per project |
| `doctor-kb` | Knowledge lifecycle audit — stale, expired, broken links | All |
| `backfill` | Seed KB from git history + code structure | Per project |
| `deploy-dashboard` | Deploy dashboard to Vercel (dev/preview/prod) | `dashboard/public/index.html` or `api/github.js` changes |
| `deploy-mcp` | Deploy MCP server to Cloudflare Workers | Any `mcp-server/src/*.ts` or `wrangler.jsonc` changes |
