---
type: task
id: TASK-001
project: cafe-v2
last_updated: 2026-07-04
status: open
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
claimed_by: null
opened: 2026-07-04
closed: null
priority: high
component: storage
anchors: []
links:
  - type: relates-to
    target: cafe-v2-profile
  - type: relates-to
    target: cafe-v2-status
  - type: relates-to
    target: DEC-001
  - type: supersedes
    target: cafe-v2-profile
---

# TASK-001: Replace in-memory storage with Supabase

## Description

The prototype uses in-memory JS objects. Migrate to Supabase for persistent storage.

## Acceptance Criteria

- All CRUD operations use Supabase client
- Schema matches current data shapes
- Connection pooling and error handling
- Environment-based configuration
