---
type: task
id: TASK-007
project: clientdata
last_updated: 2026-07-08
status: open
freshness: 2026-07-08
verified: 2026-07-08
expires: null
superseded_by: null
claimed_by: null
opened: 2026-07-08
priority: high
component: api
anchors:
  - /home/clientdata/app/api/
links:
  - type: relates-to
    target: clientdata-agent
---

# Add rate limiting to API endpoints

**Severity:** High
**File:** All API routes under `app/api/`

## Bug

No rate limiting on any endpoint. `POST /api/auth` is particularly vulnerable to brute-force password attacks.

## Fix

Implement rate limiting middleware, especially on auth and write endpoints.
