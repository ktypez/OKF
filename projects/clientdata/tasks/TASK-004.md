---
type: task
id: TASK-004
project: clientdata
last_updated: '2026-07-08'
status: closed
freshness: 2026-07-08T00:00:00.000Z
verified: 2026-07-08T00:00:00.000Z
expires: null
superseded_by: null
claimed_by: agent
opened: 2026-07-08T00:00:00.000Z
priority: high
component: api
anchors:
  - /home/clientdata/app/api/clients/route.ts
links:
  - type: relates-to
    target: clientdata-agent
closed: '2026-07-08'
---



# Fix TOCTOU race in POST /api/clients

**Severity:** High
**File:** `app/api/clients/route.ts:37-45`

## Bug

`uploadClientImages` runs before duplicate check (`getClientById`). If ID already exists, images are uploaded to R2 but never cleaned up. Also, the duplicate check and `addClient` are not atomic — two concurrent POST requests with the same ID can both pass the check.

## Fix

Move the duplicate check *before* the image upload. For atomicity, use a database unique constraint and catch the insert error, or use a transaction/lock.
