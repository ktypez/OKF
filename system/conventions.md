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

All KB files use **OKF format** — YAML frontmatter + Markdown body.

```yaml
---
type: <type>
id: <unique-id>
last_updated: <YYYY-MM-DD>
---
```

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

## OpenCode Permissions

External directories allowed:
- `~/OKF/**`
- `~/truck/**`
- `~/mcky.space/**`
- `~/clientdata/**`
- `~/habby/**`
- `~/cafe/**`
