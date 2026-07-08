---
type: task
id: TASK-009
project: clientdata
last_updated: '2026-07-08'
status: closed
freshness: 2026-07-08T00:00:00.000Z
verified: 2026-07-08T00:00:00.000Z
expires: null
superseded_by: null
claimed_by: agent
opened: 2026-07-08T00:00:00.000Z
priority: medium
component: ClientDetail
anchors:
  - /home/clientdata/components/ClientDetail.tsx
links:
  - type: relates-to
    target: clientdata-agent
closed: '2026-07-08'
---



# Fix stale closure in handleApprove

**Severity:** Medium
**File:** `components/ClientDetail.tsx:169-186`

## Bug

`handleApprove` reads `suggestions.find(...)` from closure after calling `setSuggestions(...)`. The closure holds old state. Also causes callback recreation on every suggestions fetch, defeating memoization.

## Fix

Capture the suggestion data *before* the state update, or pass the suggestion object directly into `handleApprove`.
