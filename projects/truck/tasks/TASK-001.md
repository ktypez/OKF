---
type: task
id: TASK-001
project: truck
last_updated: 2026-07-05
status: closed
freshness: 2026-07-05
verified: 2026-07-05
expires: null
superseded_by: null
claimed_by: agent
opened: 2026-07-04
closed: 2026-07-05
priority: low
component: auth
anchors: []
links:
  - type: relates-to
    target: truck-agent
  - type: relates-to
    target: truck-status
  - type: relates-to
    target: LSN-001
---

# TASK-001: Refactor reauthentication into helper

## Description

Extract the reauthentication pattern (signInWithPassword before updateUser) into a reusable helper function.

## Acceptance Criteria

- `reauthenticate()` helper in `lib/supabase.ts`
- All `updateUser()` calls use the helper
- Error handling for failed reauthentication
