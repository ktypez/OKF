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
  - type: supersedes
    target: DEC-003
  - type: relates-to
    target: TASK-012
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

- No push without explicit instruction
- Commit only when asked

## Deployment Rules

| What changes | Action |
|-------------|--------|
| KB files (projects/, system/) | Edit locally, push when asked |
| `mcp-server/src/*.ts` or `wrangler.jsonc` | `deploy-mcp` |
| `dashboard/public/index.html` or `api/github.js` | `deploy-dashboard` |

## MCP Sync Rule

After using MCP to create/update KB nodes → run `git pull` to sync local.

## OpenCode Permissions

External directories allowed:
- `~/OKF/**`
- `~/truck/**`
- `~/mcky.space/**`
- `~/clientdata/**`
- `~/habby/**`
- `~/cafe/**`
