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
| clientdata | [agent](projects/clientdata/agent.md) | [status](projects/clientdata/status.md) |
| data.mcky.space | [agent](projects/data.mcky.space/agent.md) | [status](projects/data.mcky.space/status.md) |
| habby | [agent](projects/habby/agent.md) | [status](projects/habby/status.md) |
| mcky.space | [agent](projects/mcky.space/agent.md) | [status](projects/mcky.space/status.md) |
| truck | [agent](projects/truck/agent.md) | [status](projects/truck/status.md) |
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
├── templates/              ← Templates
│   └── project-template.md
```

## Triggers

| Trigger | Action | When |
|---------|--------|------|
| `update .md` or `update kb` | Read project state → update status.md → sync agent.md | |
| `cleanup` | Scan unused files/deps → health check → present findings → update KB | |
| `wrap-day` | Read git diff → add changelog entry → update status → commit (truck only) | |
| `doctor-kb` | Knowledge lifecycle audit — stale, expired | All |
| `backfill` | Seed KB from git history + code structure | Per project |

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
