---
type: task
id: TASK-001
project: clientdata
last_updated: 2026-07-04
status: closed
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
claimed_by: agent
opened: 2026-06-22
closed: 2026-06-28
priority: high
component: dashboard
anchors: []
links:
  - type: caused-by
    target: DEC-001
  - type: relates-to
    target: LSN-001
  - type: relates-to
    target: RSK-001
---

# TASK-001: SPA routing implementation

## Description

Implement History API-based SPA routing for the main dashboard, replacing full-page navigation between Map, List, and Admin views.

## Outcome

- `pushState`/`popState` handlers in `page.tsx`
- View state persists during navigation
- Map state preserved across view switches
