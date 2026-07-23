---
type: system-doc
id: conventions
last_updated: 2026-07-22
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

## Startup Check

Before starting any task, check if `./TODOS.md` exists in the current project root:

1. If present, read and notify the user: "📋 Open TODOs: N items"
2. Ask if they want to work on a TODO or proceed with the current request
3. Record the session decision

## Scope Budget

OKF ต้อง Maintain ขนาดให้เท่านี้ — ห้ามเกิน:

| ระดับ | ไฟล์ที่อนุญาต | จำนวนสูงสุด |
|-------|--------------|------------|
| **ต่อ project** | `profile.md`, `agent.md`, `status.md` | 3 ไฟล์ |
| **system/** | `conventions.md`, `glossary.md`, `personalities.md`, `sync-log.md`, `TODOS.md` | 5 ไฟล์ |
| **root/** | `index.md`, `SETUP.md`, `package.json` | 3 ไฟล์ |
| **รวม** | ทั้งหมดใน `~/OKF/` **ไม่รวม** `mcp-server/`, `scripts/`, `skills/`, `plan/`, `templates/` | **ไม่เกิน 35 ไฟล์ .md** |

**กฎเหล็ก:**
1. **ห้ามเพิ่ม** `commands.md`, `dependencies.md`, `structure.md` เข้าไปใน project — ทุกอย่างรวมอยู่ใน `profile.md`
2. **ห้ามเพิ่ม** system file ใหม่นอกเหนือจาก 5 ตัวที่มี — ถ้าต้องการ content ใหม่ ให้ merge ลงไฟล์ที่มีอยู่
3. **ห้ามเพิ่ม** root .md ใหม่ — `index.md` คือ entry point เดียว
4. ถ้า project ไหนต้องการมากกว่า 3 ไฟล์ ให้ถาม user ก่อน
5. `check scope` trigger จะตรวจสอบและแจ้งเตือนถ้าเกิน budget

## Project Files

Each project has 2-3 files in `~/OKF/projects/<project>/`:

| File | Type | Description |
|------|------|-------------|
| `profile.md` | `project-profile` | Tech stack, architecture, dependencies, commands, structure |
| `agent.md` | `agent-profile` | Agent personality, triggers, patterns, changelog |
| `status.md` | `project-status` | Changelog, known issues, design decisions (optional) |

### Universal Prompt

Copy this block into AI tool custom instructions / system prompt:

---

You have access to a shared knowledge base at `~/OKF/`. Before any task:

1. Read `~/OKF/index.md` — project roster and global rules
2. Read `./AGENTS.md` in current project root — follow its `## KB` links
3. Read every file linked in that `## KB` section
4. Read `~/OKF/system/conventions.md` for communication rules
5. Start working

**Projects:**

| Project | Profile | Agent | Status |
|---------|---------|-------|--------|
| clientdata | [profile](projects/clientdata/profile.md) | [agent](projects/clientdata/agent.md) | [status](projects/clientdata/status.md) |
| data.mcky.space | [profile](projects/data.mcky.space/profile.md) | [agent](projects/data.mcky.space/agent.md) | [status](projects/data.mcky.space/status.md) |
| habby | [profile](projects/habby/profile.md) | [agent](projects/habby/agent.md) | [status](projects/habby/status.md) |
| mcky.space | [profile](projects/mcky.space/profile.md) | [agent](projects/mcky.space/agent.md) | [status](projects/mcky.space/status.md) |
| receipts-dms | [profile](projects/receipts-dms/profile.md) | [agent](projects/receipts-dms/agent.md) | [status](projects/receipts-dms/status.md) |
| collage | [profile](projects/collage/profile.md) | [agent](projects/collage/agent.md) | [status](projects/collage/status.md) |
| truck | [profile](projects/truck/profile.md) | [agent](projects/truck/agent.md) | [status](projects/truck/status.md) |
| writer | [profile](projects/writer/profile.md) | [agent](projects/writer/agent.md) | — |

Shared: `~/OKF/system/conventions.md`

**Rules:**
- No Chinese characters — Thai or English only
- Concise, direct answers (< 4 lines when possible)
- Read index.md + AGENTS.md + linked KB files before writing code

---

## File Format

Project docs use **OKF format** — YAML frontmatter + Markdown body.

```yaml
---
type: project-profile | agent-profile | project-status
id: <project>-profile | <project>-agent | <project>-status
project: <project-name>
last_updated: YYYY-MM-DD
status: active
---
```

## AGENTS.md Convention

Each project root may have `AGENTS.md` with 2 sections:

- `## KB` — links to KB files in `~/OKF/projects/<project>/`
- `## Local` — project-specific notes (env files, setup tricks)

## Plan Workflow

For multi-step tasks:

1. **Create** `~/OKF/plan/<todo-name>.md` — YAML frontmatter (id, version, status, created, updated) + goal, steps (checkboxes), files, verification
2. **Run** `cd ~/kb.mcky.space && node scripts/build-site.cjs` — copies plan files to Starlight content
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

## Check Scope

ตรวจสอบว่า OKF ยังอยู่ใน Scope Budget หรือไม่:

1. นับ `.md` files ใน `projects/` — ห้ามเกิน 3 ไฟล์ต่อ project
2. นับ `.md` files ใน `system/` — ห้ามเกิน 5 ไฟล์
3. นับ `.md` files ที่ root — ห้ามเกิน 3 ไฟล์
4. รวมทั้งหมดต้องไม่เกิน 35 `.md` files
5. ถ้าเกิน: แจ้ง user พร้อมรายการไฟล์ที่ควร merge หรือลบ

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

- Project code (~/truck/, etc.) — follow project conventions

## Deployment Rules

| What changes | Action |
|-------------|--------|
| KB files (projects/, system/) | Edit locally, push when asked |

## MCP Tools

Local MCP server at `~/OKF/mcp-server/`. Use these tools to read and query the KB.

| Tool | Description |
|------|-------------|
| `projects` | List all projects with metadata |
| `project` | Get profile + agent + status for a project |
| `search` | Full-text search across title, description, body |
| `read` | Raw content of any OKF file |
| `tree` | List OKF directory structure |
| `filter` | Query projects by technology, status, deployment, language |
| `dashboard` | Summary of all projects |
| `stats` | Statistics across projects |
| `graph` | Mermaid knowledge graph — project → technology relationships |
| `rebuild` | Force recompile KB from .md files |

**Rules:**
- Dates are always YYYY-MM-DD format
- Prefer `project` over `search` for project-specific queries

## OpenCode Permissions

External directories allowed:
- `~/OKF/**`
- `~/truck/**`
- `~/mcky.space/**`
- `~/clientdata/**`
- `~/habby/**`
- `~/collage/**`
- `~/data.mcky.space/**`
- `~/paper/**`

## Build Site

1. `cd ~/kb.mcky.space && npm run sync` — pull latest content from `~/OKF/`
2. `git add -A && git commit -m "docs: update KB" && git push`
3. Vercel auto-deploys from GitHub (`ktypez/kb.mcky.space`)

Or just say **"build site"** to trigger this workflow.

**Note:** `generate` must be run locally before push since content lives in `~/OKF/` (not in git).

## KB Sync

สั่ง **"sync kb"** หรือ **"refresh kb"** หรือ **"update kb"** เมื่อต้องการให้ตรวจสอบและอัปเดตฐานความรู้ทั้งหมดให้ตรงกับสถานะปัจจุบันของทุกโปรเจกต์

**ขั้นตอนที่จะดำเนินการ:**
1. อ่าน `package.json` และไฟล์ config ของทุกโปรเจกต์
2. เปรียบเทียบกับข้อมูลปัจจุบันใน `~/OKF/projects/*/`
3. อัปเดต `profile.md`, `status.md`, `agent.md` ตามสภาพจริง
4. ตรวจสอบสถานะโปรเจกต์ (active/archived)
5. commit + push การเปลี่ยนแปลง
6. commit + push การเปลี่ยนแปลง — Vercel auto-deploys

**คำที่ใช้ได้:** "sync kb", "refresh kb", "update kb", "อัปเดต kb", "ทำให้ kb ทันสมัย"
