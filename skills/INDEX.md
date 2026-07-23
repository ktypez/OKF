---
type: index
id: skills-index
last_updated: 2026-07-21T00:00:00.000Z
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
title: Skills Overview
description: ''
tags:
  - skill
  - agent
  - opencode
  - INDEX
timestamp: Tue Jul 21 2026 00:00:00 GMT+0000 (Coordinated Universal Time)T12:00:00Z
---
# Skills Overview

Centralized index of all specialized skills available for AI agents.

## Skill Registry

| Skill | Category | Description |
|-------|----------|-------------|
| code-audit | Engineering | Use for project health scans + code quality reviews — unused deps, bugs, security, performance, best practices |
| kb-sync | KB Maintenance | Use to sync KB with project state — update status files, validate frontmatter, maintain indexes |
| frontend-dev | Engineering | Use for frontend engineering tasks — React 19, Next.js 16, Vue, Svelte, TypeScript, state management, responsive design, performance, testing, a11y |
| design-skill-os | Design | Use for UI/UX design reasoning — gestalt principles, 60-30-10 color, typographic scale, Nielsen heuristics, accessibility audits |
| supabase-postgres-best-practices | Database | Use for Postgres/Supabase performance optimization — query performance, RLS, schema design, indexing, connection management |
| web-dev | Engineering | Use for building modern web apps with semantic HTML5, CSS Grid/Flexbox, and vanilla JS |
| writer-work | Content | Use for content writing — summaries, changelogs, step-by-step instructions, and documentation. Also triggered by "summarize" or "wrap-day" |
| manage-okf | KB Maintenance | Maintain an OKF workspace by discovering projects, extracting verified metadata and documentation, normalizing project knowledge into a consistent schema, and synchronizing a central workspace knowledge base that serves as the authoritative source of truth |
| kb-ops | KB Maintenance | Manage tasks, risks, and knowledge health across the OKF workspace — list, create, claim, close tasks; track and resolve risks; audit freshness and drift |

## Directory Layout

```
~/OKF/
├── skills/
│   ├── INDEX.md                    ← THIS FILE
│   ├── code-audit.md
│   ├── kb-sync.md
│   ├── kb-ops.md
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

## Cross-links

- [Code Audit](code-audit.md)
- [KB Sync](kb-sync.md)
- [Frontend Dev](frontend-dev.md)
- [Design Skill OS](design-skill-os.md)
- [Supabase PG Best Practices](supabase-postgres-best-practices.md)
- [Web Dev](web-dev.md)
- [Writer Work](writer-work.md)
- [Manage OKF](manage-okf.md)
- [KB Ops](kb-ops.md)
