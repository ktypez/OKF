---
type: skill
id: kb-manage
last_updated: 2026-07-04
source: ~/.config/opencode/skills/kb-manage/SKILL.md
category: kb-maintenance
projects: [global]
---

# kb-manage Skill

**Purpose:** Maintain and validate the OKF — frontmatter checks, index updates.

## Location
`~/OKF/`

## Validation
1. Check all `.md` files have valid YAML frontmatter (required: `type`, `id`, `last_updated`)
2. Verify `~/OKF/index.md` project table matches actual `~/OKF/projects/` directories
3. Check `projects/<project>/status.md` files reference correct project names

## Index Updates
- New project: add to `~/OKF/index.md` table + create `projects/<project>/` with agent.md, profile.md, status.md
- Rename/delete project: update `~/OKF/index.md` index

## Project Structure
Each project in `~/OKF/projects/<project>/`:
- `agent.md` — agent context (personality, triggers, patterns, commands, rules)
- `profile.md` — technical metadata (stack, deps, architecture)
- `status.md` — live project status (routes, components, design, changelog)
- `structure.md` — directory layout
- `dependencies.md` — package dependencies
- `commands.md` — dev commands
- `decisions.md` — architecture decisions
- `assets.md` — media assets

## Tasks Sync
- After adding/removing shared trigger: update `~/OKF/system/inventory.md`

## Cleanup
- Remove stale index entries if project directory missing
- Remove stale `projects/<project>/` dirs with no matching index entry
- Update `last_updated` dates on modified files
