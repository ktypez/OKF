---
type: task
id: TASK-012
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



# Clamp limit query param in GET /api/clients

**Severity:** Medium
**File:** `app/api/clients/route.ts:9`

## Bug

The `limit` parameter accepts any integer. A client could pass `?limit=999999999`, causing the database to return the entire table. This is a denial-of-service vector.

## Fix

Clamp the value: `const limit = limitParam ? Math.min(parseInt(limitParam, 10) || 0, 500) : undefined`
