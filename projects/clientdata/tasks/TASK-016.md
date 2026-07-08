---
type: task
id: TASK-016
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
component: auth
anchors:
  - /home/clientdata/lib/auth.ts
links:
  - type: relates-to
    target: clientdata-agent
closed: '2026-07-08'
---



# Fix RangeError in legacy hash verification

**Severity:** Medium
**File:** `lib/auth.ts:106`

## Bug

`crypto.timingSafeEqual(Buffer.from(legacyHash, 'hex'), Buffer.from(stored, 'hex'))` throws `RangeError` if `stored` is not a valid hex string of exactly 64 characters. The outer code has no try/catch around this path.

## Fix

Add a length check before calling `timingSafeEqual`: `if (Buffer.from(stored, 'hex').length !== 32) return false`
