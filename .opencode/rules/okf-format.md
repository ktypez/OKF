---
type: rule
id: okf-format-rule
description: Rules for handling OKF (Open Knowledge Format) files
last_updated: 2026-07-21
---

# OKF Format Rules

OKF = YAML frontmatter + Markdown body. Project docs in `~/OKF/projects/` use this format.

## Project Files

Each project has these files:

| File | Type | Description |
|------|------|-------------|
| `profile.md` | `project-profile` | Technical metadata (stack, deps, architecture, commands, structure) |
| `agent.md` | `agent-profile` | Agent context (personality, triggers, patterns, changelog) |
| `status.md` | `project-status` | Live status (changelog, known issues, design decisions) — optional |

## Frontmatter Schema

### profile.md

```yaml
---
type: project-profile
id: <project>-profile
project: <project-name>
last_updated: YYYY-MM-DD
status: active | archived
stack:
  language: <language>
  framework: <framework>
  ui: <ui-library>
  database: <database>
  storage: <storage>
  state: <state-management>
  auth: <auth-method>
  testing: <testing-framework>
  deployment: <deploy-target>
  ci: <ci-system>
agent_personality: <personality>
links:
  agent: <project>-agent
  status: <project>-status
---
```

### agent.md

```yaml
---
type: agent-profile
id: <project>-agent
project: <project-name>
last_updated: YYYY-MM-DD
status: active | archived
personality: <personality-name>
status_ref: <project>-status
links:
  profile: <project>-profile
  status: <project>-status
---
```

### status.md

```yaml
---
type: project-status
id: <project>-status
project: <project-name>
last_updated: YYYY-MM-DD
status: active | archived
links:
  profile: <project>-profile
  agent: <project>-agent
---
```

## Rules

1. **Always preserve frontmatter** — do not strip or modify YAML frontmatter when editing OKF files
2. **Read frontmatter first** — before working with a file, parse its frontmatter to understand its `type` and `id`
3. **Frontmatter is metadata** — the `---` delimiters must remain intact; content after the second `---` is the Markdown body
4. **Date format**: always `YYYY-MM-DD` in `last_updated`
5. **IDs are unique per project** — use `<project>-<type>` format: `truck-profile`, `habby-agent`, etc.
6. **ID prefix matches project name** — mcky.space uses `mcky-space-*`, not `mcky-*`
7. **No stray `---` fences** — only one opening and one closing `---` per file
8. **status field** — must match actual project state (archived projects use `status: archived` in ALL files)
9. **links field** — cross-reference related files within the same project
10. **stack field** in profile.md — use structured object, not inline string
11. **Scope budget** — ห้ามเกิน 3 ไฟล์ต่อ project, 5 ไฟล์ใน system/, รวมไม่เกิน 35 .md files
12. **No extra file types** — ห้ามเพิ่ม commands.md, dependencies.md, structure.md ที่ project level
