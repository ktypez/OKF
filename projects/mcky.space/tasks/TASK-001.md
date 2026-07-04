---
type: task
id: TASK-001
project: mcky.space
last_updated: 2026-07-05
status: closed
freshness: 2026-07-05
verified: 2026-07-05
expires: null
superseded_by: null
claimed_by: agent
opened: 2026-07-04
closed: 2026-07-05
priority: medium
component: infra
anchors: []
links:
  - type: relates-to
    target: mcky-agent
  - type: relates-to
    target: mcky-status
  - type: relates-to
    target: RSK-001
  - type: relates-to
    target: DEC-001
  - type: resolved-by
    target: LSN-001
---

# TASK-001: Fix local dev environment

## Description

Investigate shiki native module corruption on android-arm64. Find a workaround or alternative syntax highlighter.

## Acceptance Criteria

- `npm run dev` works locally on Termux
- Syntax highlighting still works in blog posts
