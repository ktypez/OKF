---
type: task
id: TASK-017
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
component: r2
anchors:
  - /home/clientdata/lib/r2.ts
links:
  - type: relates-to
    target: clientdata-agent
closed: '2026-07-08'
---



# Fix all-or-nothing Promise.all in R2 upload

**Severity:** Medium
**File:** `lib/r2.ts:82-83`

## Bug

`Promise.all(images.map(...))` means if ANY single image upload fails, the entire batch fails and client creation is blocked. Already-uploaded images from successful calls are orphaned in R2.

## Fix

Use `Promise.allSettled` and filter out failures, or upload sequentially and clean up on failure.
