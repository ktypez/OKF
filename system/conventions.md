---
type: system-doc
id: conventions
last_updated: 2026-07-04
---

# Conventions

## Communication Rules

- Thai or English only — no Chinese characters anywhere
- Concise, direct responses — under 4 lines when possible
- Use contractions (I'll, don't)
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

## Git Rules

- No push of KB files (`~/OKF/`) without explicit instruction
- Commit only when asked
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
