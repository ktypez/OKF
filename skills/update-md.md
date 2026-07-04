---
type: skill
id: update-md
last_updated: 2026-07-04
source: ~/.config/opencode/skills/update-md/SKILL.md
category: kb-maintenance
projects: [truck, mcky.space, clientdata, habby]
---

# update-md Skill

**Purpose:** Read project AGENTS.md + KB files, update OKF with latest project changes.

## Trigger
`update .md` or `update kb` — all projects

## Workflow
1. Determine project from context (cwd, conversation)
2. Read project's `AGENTS.md` + `~/OKF/projects/<project>/status.md`
3. Read `~/OKF/projects/<project>/agent.md` for trigger instructions
4. Update sections in `~/OKF/projects/<project>/status.md`:
   - Stack, Routes, Components, API (if applicable), Design System, Data Model
   - Changelogs (from git log), PWA, Tests, Known Issues
5. Sync `~/OKF/projects/<project>/agent.md` if architecture, patterns, or stack changed

## Status File Sections (all projects)

Every status file `~/OKF/projects/<project>/status.md` must have these sections (empty if N/A):

1. Stack
2. Routes
3. Components
4. API
5. Design System
6. Data Model
7. Changelog
8. PWA
9. Tests
10. Known Issues

Read the existing file for the exact format — each file is self-documenting.

## Per-Project

| Project | Stack | Notes |
|---------|-------|-------|
| truck | React 19 + Vite 8 + Supabase | PWA, 16 tests, edge functions |
| mcky.space | Astro 7 + Alpine.js | No PWA, no tests |
| clientdata | Next.js 16 + Drizzle + Neon | PWA, 16 tests |
| habby | Vite 6 + Express 5 + Redis | PWA, no tests |
