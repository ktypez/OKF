---
title: Conventions
description: OKF knowledge base
---

# Conventions

## Communication Rules

- **Language: Thai first.** Write in Thai as the primary language across KB and chat.
- **English only when it fits better** — use English for (a) loanwords/technical terms that read more naturally in English (e.g. *schema*, *streak*, *invalidation*, *cache*), or (b) words that are punchier / more fun in English (slang, goblin names, etc.). Mix freely: Thai sentence + English term where it lands harder.
- No Chinese characters anywhere.
- Concise, direct responses — under 4 lines when possible
- Use contractions (I'll, don't — หรือ 'ฉันจะ', 'ไม่ต้อง' ในภาษาไทย)
- No emojis unless explicitly asked
- Answer first, then act
- Skip intros ("I'll help you with...")

## File Format

All KB files use **OKF format** — YAML frontmatter + Markdown body. Every file is a **node** in the project knowledge graph.

```yaml
---
type: <type>
id: <unique-id>
project: <project-name>
last_updated: <YYYY-MM-DD>
status: active              # active | superseded | expired | archived
freshness: <YYYY-MM-DD>     # when content last changed
verified: <YYYY-MM-DD>      # when last confirmed against reality
expires: null               # optional expiry date
superseded_by: null         # id of node that replaces this one
anchors: []                 # file:line paths this node concerns
links:                      # typed edges to other nodes
  - type: relates-to
    target: DEC-003
---
```

See `~/.opencode/rules/okf-format.md` for full schema reference.

## Node.js Setup (Termux)

| Tool | Command |
|------|---------|
| **Node version** | v22.14.0 (ARM64, `/usr/local/node-v22.14.0-linux-arm64/`) |
| **Run dev** | Use `node` directly (shebang unavailable) |
| **Vite** | `node node_modules/vite/bin/vite.js build` |
| **ESLint** | `node node_modules/.bin/eslint src/` |
| **Vitest** | `node node_modules/.bin/vitest run` |
| **Next.js dev** | `npx next dev -H localhost` |
| **npm** | Works normally |
| **Supabase CLI** | Not available on Termux (CI only) |
| **cwebp** | Available — `cwebp -q 80 input.jpg -o output.webp` |
| **sharp / ffmpeg** | Not available |

## Startup Check

Before starting any task, check if `./TODOS.md` exists in the current project root:

1. If present, read and notify the user: "📋 Open TODOs: N items"
2. Ask if they want to work on a TODO or proceed with the current request
3. Record the session decision

## Plan Workflow

For multi-step tasks:

1. **Create** `~/OKF/plan/<todo-name>.md` — YAML frontmatter (id, version, status, created, updated) + goal, steps (checkboxes), files, verification
2. **Run** `node scripts/build-site.js` — copies plan files to Starlight content
3. **Execute** — use opencode's todowrite for in-session progress tracking
4. **Update** plan.md at milestones — commit each update (git history = version log)
5. **Persist** — plans stay in `plan/` directory after completion
6. **Name** — one file per task, named after the todo (kebab-case)

```markdown
---
id: plan-my-task
version: 1
status: in_progress
created: 2026-07-09
updated: 2026-07-09
---

# Plan: My Task
```

## Git Rules

- Project code (~/truck/, etc.) — follow project conventions

## Deployment Rules

| What changes | Action |
|-------------|--------|
| KB files (projects/, system/) | Edit locally, push when asked |

## MCP Integration

Use MCP tools to read/write KB nodes. Do NOT manually edit .md files for knowledge nodes — use the tools.

**Query workflow:**
1. `okf_list_projects` — discover projects
2. `okf_query_nodes` — filter by type/status/project
3. `okf_get_node` — read specific node by ID
4. `okf_search` — full-text search across KB

**Write workflow:**
1. `okf_create_node` — create with auto-generated ID
2. `okf_update_node` — update frontmatter or body
3. `okf_add_edge` — link to other nodes
4. `okf_update_status` — set lifecycle status (active/expired/superseded/archived)

**Maintenance:**
- `okf_doctor` — run lifecycle audit, auto-fix expired nodes
- `okf_list_dir` — browse KB structure

**Rules:**
- Always use `project` param to scope queries
- Node IDs are per-project (DEC-001 in truck != DEC-001 in clientdata)
- Dates are always YYYY-MM-DD format
- Prefer `okf_query_nodes` over `okf_search` for structured queries

## OpenCode Permissions

External directories allowed:
- `~/OKF/**`
- `~/truck/**`
- `~/mcky.space/**`
- `~/clientdata/**`
- `~/habby/**`
