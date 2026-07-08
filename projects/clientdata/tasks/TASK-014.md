---
type: task
id: TASK-014
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
  - /home/clientdata/app/api/auth/route.ts
links:
  - type: relates-to
    target: clientdata-agent
closed: '2026-07-08'
---



# Increase minimum password length

**Severity:** Medium
**File:** `app/api/auth/route.ts:59, 93-108`

## Bug

Minimum password length for initial setup is only 4 characters (trivially brute-forceable). The PUT handler (password change) also has no length check at all — a user could set a single-character password.

## Fix

Increase to at least 8 characters. Add the same minimum length check in the PUT handler.
