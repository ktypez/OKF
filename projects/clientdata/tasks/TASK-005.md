---
type: task
id: TASK-005
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
  - /home/clientdata/app/api/suggestions/[id]/route.ts
links:
  - type: relates-to
    target: clientdata-agent
closed: '2026-07-08'
---



# Fix null body crash in PUT /api/suggestions/[id]

**Severity:** High
**File:** `app/api/suggestions/[id]/route.ts:20-28`

## Bug

After parsing JSON, `raw` is cast to `Record<string, unknown>` without a null check. If the request body is `null` (valid JSON), `obj.action` throws `TypeError: Cannot read properties of null`.

## Fix

Add a guard: `if (!raw || typeof raw !== 'object') return Response.json({ error: 'Invalid body' }, { status: 400 })`
