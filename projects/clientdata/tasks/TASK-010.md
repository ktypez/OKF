---
type: task
id: TASK-010
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
component: PhotoRequestDialog
anchors:
  - /home/clientdata/components/PhotoRequestDialog.tsx
links:
  - type: relates-to
    target: clientdata-agent
closed: '2026-07-08'
---



# Fix object URL leak in PhotoRequestDialog

**Severity:** Medium
**File:** `components/PhotoRequestDialog.tsx:38`

## Bug

`URL.createObjectURL(f)` is called when a file is selected, but `URL.revokeObjectURL()` is never called. Each file selection allocates a blob URL that persists until page unload, leaking memory.

## Fix

Revoke the previous object URL when a new file is selected and when the dialog closes.
