---
type: task
id: TASK-006
project: clientdata
last_updated: '2026-07-08'
status: closed
freshness: 2026-07-08T00:00:00.000Z
verified: 2026-07-08T00:00:00.000Z
expires: null
superseded_by: null
claimed_by: null
opened: 2026-07-08T00:00:00.000Z
priority: high
component: api
anchors:
  - /home/clientdata/app/api/suggestions/[id]/route.ts
links:
  - type: relates-to
    target: clientdata-agent
closed: '2026-07-08'
---


# Fix unauthenticated GET /api/suggestions/[id]

**Severity:** High
**File:** `app/api/suggestions/[id]/route.ts:4-11`

## Bug

The GET handler returns suggestion data without any authentication check. Anyone can enumerate suggestion IDs and read client names, addresses, and coordinates.

## Fix

Add `isAuthorized(request)` check, or restrict the fields returned for unauthenticated requests.
