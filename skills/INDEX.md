---
type: index
id: skills-index
last_updated: 2026-07-04
skills:
  - id: update-md
    path: skills/update-md.md
  - id: cleanup-project
    path: skills/cleanup-project.md
  - id: code-review
    path: skills/code-review.md
  - id: kb-manage
    path: skills/kb-manage.md
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
---

# Skills Overview

Centralized index of all specialized skills available for AI agents.

## Skill Registry

| Skill | Category | Description |
|-------|----------|-------------|
| update-md | KB Maintenance | Read project KB files, update status + agent files with latest changes |
| cleanup-project | Project Health | Scan unused deps/files, health check, present findings, update KB |
| code-review | Engineering | Code quality, bug detection, security audit, performance, best practices |
| kb-manage | KB Maintenance | Maintain and validate the OKF — frontmatter checks, index updates, sync |
| frontend-dev | Engineering | Expert frontend — React 19, Next.js 16, Vue, Angular, Svelte, TypeScript |
| design-skill-os | Design | Elite design reasoning — gestalt, 60-30-10, modular scale, Nielsen heuristics |
| supabase-postgres-best-practices | Database | Postgres performance optimization from Supabase |
| web-dev | Engineering | Modern web apps — semantic HTML5, CSS Grid/Flexbox, vanilla JS |
| writer-work | Content | Concise summaries, changelogs, step-by-step instructions, documentation |
| manage-okf | KB Maintenance | Discover projects, extract metadata, normalize into OKF schema, sync |

## Directory Layout

```
~/OKF/
├── skills/
│   ├── INDEX.md                    ← THIS FILE
│   ├── update-md.md
│   ├── cleanup-project.md
│   ├── code-review.md
│   ├── kb-manage.md
│   ├── frontend-dev.md
│   ├── design-skill-os.md
│   ├── supabase-postgres-best-practices.md
│   ├── web-dev.md
│   ├── writer-work.md
│   └── manage-okf.md
```

## Usage

Skills are loaded automatically by opencode based on task context. Each skill has a `SKILL.md` in `~/.config/opencode/skills/<skill-name>/`.

To invoke a skill manually, reference it by name in your task.

## Adding New Skills

1. Create skill in `~/.config/opencode/skills/<skill-name>/SKILL.md`
2. Add entry to this `INDEX.md`
3. Ensure matching doc exists
