---
type: task
id: TASK-002
project: clientdata
last_updated: 2026-07-04
status: open
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
claimed_by: null
opened: 2026-07-04
closed: null
priority: medium
component: dashboard
anchors: []
links:
  - type: relates-to target: LSN-001
  - type: relates-to target: RSK-001
---

# TASK-002: Refactor page.tsx useState to useReducer

## Description

The main `page.tsx` has ~30 tightly coupled `useState` hooks. Refactor to a single `useReducer` with a well-defined action union type.

## Acceptance Criteria

- All view state, selection state, form state, and map state in one reducer
- Action types defined in a shared types file
- No regressions in existing functionality
