---
type: task
id: TASK-003
project: truck
last_updated: 2026-07-08
status: open
freshness: 2026-07-08
verified: null
expires: null
superseded_by: null
claimed_by: null
opened: 2026-07-08
closed: null
priority: medium
component: linting
anchors:
  - src/App.tsx:59
  - src/components/DailyView.tsx:130
  - src/components/DailyView.tsx:135
  - src/components/profile/UserManagement.tsx:107
  - src/components/profile/UserManagement.tsx:109
  - src/components/ToastContext.tsx:1
links:
  - type: relates-to
    target: truck-agent
  - type: relates-to
    target: truck-status
---

# TASK-003: Remove ESLint suppressions and fix root causes

## Description

Remove all eslint-disable comments and fix the underlying issues they were suppressing.

## Files and Lines

- src/App.tsx:59 - react-hooks/set-state-in-effect
- src/components/DailyView.tsx:130 - react-hooks/set-state-in-effect
- src/components/DailyView.tsx:135 - react-hooks/set-state-in-effect
- src/components/profile/UserManagement.tsx:107 - react-hooks/set-state-in-effect
- src/components/profile/UserManagement.tsx:109 - react-hooks/exhaustive-deps
- src/components/ToastContext.tsx:1 - react-refresh/only-export-components

## Acceptance Criteria

- All eslint-disable comments removed
- For set-state-in-effect: refactor to avoid setState inside useEffect
- For exhaustive-deps: add missing dependencies or restructure effect
- ESLint passes with no warnings
- No runtime behavior changes
