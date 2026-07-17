---
type: skill
id: code-audit
last_updated: 2026-07-17
source: ~/.config/opencode/skills/code-audit/SKILL.md
category: engineering
projects: [truck, mcky.space, clientdata, habby]
---

# code-audit Skill

**Purpose:** Use for project health scans + code quality reviews — unused deps, bugs, security, performance, best practices.

**Merged from:** cleanup-project + code-review

## Trigger
`cleanup`, `review`, `audit` — all projects

## Workflow
1. Determine project from `~/OKF/projects/`
2. Read project's status file to identify stack
3. Scan unused imports, empty files, dead exports, leftover dirs
4. Deep scan: `console.log`, TODO/FIXME, stale logs
5. Code review: quality, bugs, security, perf, practices
6. Present findings — let user choose what to fix
7. Commit & push only if told
8. Update `~/OKF/projects/<project>/status.md`
