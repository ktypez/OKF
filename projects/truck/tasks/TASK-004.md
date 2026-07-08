---
type: task
id: TASK-004
project: truck
last_updated: 2026-07-08
status: open
freshness: 2026-07-08
verified: null
expires: null
superseded_by: null
claimed_by: null
opened: 2026-07-08
closed: null
priority: medium
component: config
anchors:
  - src/lib/supabase.ts:4
  - src/lib/supabase.ts:5
links:
  - type: relates-to
    target: truck-agent
  - type: relates-to
    target: truck-status
---

# TASK-004: Add env var validation with clear error messages

## Description

Replace non-null assertions on env vars with proper validation that throws clear error messages at startup.

## Files and Lines

- src/lib/supabase.ts:4 - VITE_SUPABASE_URL with ! assertion
- src/lib/supabase.ts:5 - VITE_SUPABASE_ANON_KEY with ! assertion

## Acceptance Criteria

- Add validation check before createClient call
- Throw descriptive error if env vars are missing
- Remove ! assertions
- App fails fast with clear message instead of opaque runtime error
