---
type: system-doc
id: inventory
last_updated: 2026-07-04
---

# Inventory

## Task Triggers

| Trigger | Description | Projects |
|---------|-------------|----------|
| `update .md` | Read KB status + agent files, update with latest project state | All |
| `cleanup` | Scan unused deps/files, health check, present findings, update KB | All |
| `wrap-day` | Review today's diff, write changelog entry, update truck status, commit | truck |
| `blog-post` | Write a blog post — publish at mcky.space (`src/data/blog/`), not in OKF | mcky.space |

### update .md

1. Read project's KB files in `~/OKF/projects/<project>/`
2. Read source files to discover changes (components, routes, data flow)
3. Update `status.md` with latest state
4. Update `agent.md` if patterns changed
5. If project AGENTS.md has stale info, update it too

### cleanup

1. Scan unused imports, empty files, dead exports
2. If available: run lint + typecheck
3. Present findings for user to choose
4. Update KB files
5. Never touch `.env*`, `node_modules/`, `dist/`, `.next/`, `.git/`, or essential config

### wrap-day (truck only)

1. Read `git diff` + `Changelog.tsx`
2. Add `vYYYY.MM.DD` entry with Thai summary
3. Update `status.md`
4. `git add` + commit `"docs: wrap-day YYYY-MM-DD"`

## AGENTS.md Reference

Each project root has an ultra-thin `AGENTS.md` with 2 sections:

- `## KB` — links to the project's KB files in `~/OKF/projects/<project>/`
- `## Local` — project-specific notes (env files, status tips)

All context lives in this OKF. No duplication.
