---
type: task
id: TASK-011
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
  - /home/clientdata/app/api/clients/route.ts
links:
  - type: relates-to
    target: clientdata-agent
closed: '2026-07-08'
---



# Add try/catch to GET /api/clients

**Severity:** Medium
**File:** `app/api/clients/route.ts:6-14`

## Bug

`getClientsWithCount(limit)` has no try/catch. A database error will propagate as an unhandled exception, returning an opaque 500 with no useful error message.

## Fix

Wrap in try/catch and return a structured error response.
