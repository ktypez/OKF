---
type: skill
id: kb-sync
last_updated: 2026-07-22T00:00:00.000Z
source: ~/.config/opencode/skills/kb-sync/SKILL.md
category: kb-maintenance
projects:
  - global
title: kb-sync Skill
description: ''
tags:
  - skill
  - agent
  - opencode
  - kb-sync
timestamp: Wed Jul 22 2026 00:00:00 GMT+0000 (Coordinated Universal Time)T12:00:00Z
---

# kb-sync Skill

**Purpose:** Use to sync KB with project state — update status files, validate frontmatter, maintain indexes.

## Trigger
`update .md`, `update kb`, `sync kb`

## Workflow
1. Determine project from context
2. Read project's AGENTS.md + status.md + agent.md
3. Update status sections from project state
4. Sync agent.md if architecture/stack changed
5. Validate all KB `.md` frontmatter
6. Verify index.md matches projects/ directories
7. Clean stale entries

## MCP Tools
- `project <name>` — read project docs
- `search <query>` — find content across KB
- `tree` — verify directory structure
