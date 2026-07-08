---
type: task
id: TASK-013
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
component: api
anchors:
  - /home/clientdata/app/api/suggestions/route.ts
links:
  - type: relates-to
    target: clientdata-agent
closed: '2026-07-08'
---



# Add try/catch to POST /api/suggestions

**Severity:** Medium
**File:** `app/api/suggestions/route.ts:100-118`

## Bug

`createSuggestion()` is not wrapped in try/catch. A database error (connection failure, constraint violation) will propagate as an unhandled exception.

## Fix

Wrap in try/catch and return 500 on failure.
