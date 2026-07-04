---
type: index
id: skills-index
last_updated: 2026-07-04
skills:
  - id: code-audit
    path: skills/code-audit.md
  - id: kb-sync
    path: skills/kb-sync.md
  - id: frontend-dev
    path: skills/frontend-dev.md
  - id: design-skill-os
    path: skills/design-skill-os.md
  - id: supabase-postgres-best-practices
    path: skills/supabase-postgres-best-practices.md
  - id: web-dev
    path: skills/web-dev.md
  - id: writer-work
    path: skills/writer-work.md
  - id: manage-okf
    path: skills/manage-okf.md
  - id: kb-ops
    path: skills/kb-ops.md
---

# Skills Overview

Centralized index of all specialized skills available for AI agents.

## Skill Registry

| Skill | Category | Description |
|-------|----------|-------------|
| code-audit | Engineering | Project health scans + code quality reviews — unused deps, bugs, security, performance, best practices |
| kb-sync | KB Maintenance | Sync OKF with project state — update status, validate frontmatter, maintain indexes |
| frontend-dev | Engineering | Expert frontend — React 19, Next.js 16, Vue, Angular, Svelte, TypeScript |
| design-skill-os | Design | Elite design reasoning — gestalt, 60-30-10, modular scale, Nielsen heuristics |
| supabase-postgres-best-practices | Database | Postgres performance optimization from Supabase |
| web-dev | Engineering | Modern web apps — semantic HTML5, CSS Grid/Flexbox, vanilla JS |
| writer-work | Content | Concise summaries, changelogs, step-by-step instructions, documentation |
| manage-okf | KB Maintenance | Discover projects, extract metadata, normalize into OKF schema, sync |
| kb-ops | KB Maintenance | Manage tasks, risks, and knowledge health — list, create, claim, close, audit |

## Directory Layout

```
~/OKF/
├── skills/
│   ├── INDEX.md                    ← THIS FILE
│   ├── code-audit.md
│   ├── kb-sync.md
│   ├── frontend-dev.md
│   ├── design-skill-os.md
│   ├── supabase-postgres-best-practices.md
│   ├── web-dev.md
│   ├── writer-work.md
│   └── manage-okf.md
│   └── kb-ops.md
```

## Usage

Skills are loaded automatically by opencode based on task context. Each skill has a `SKILL.md` in `~/.config/opencode/skills/<skill-name>/`.

To invoke a skill manually, reference it by name in your task.

## Adding New Skills

1. Create skill in `~/.config/opencode/skills/<skill-name>/SKILL.md`
2. Add entry to this `INDEX.md`
3. Ensure matching doc exists
