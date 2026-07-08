---
type: task
id: TASK-002
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
component: types
anchors:
  - src/lib/offlineQueue.ts:17
  - src/lib/offlineQueue.ts:74
  - src/lib/offlineQueue.ts:115
  - src/lib/offlineQueue.ts:168
  - src/components/DailyView.tsx:205
  - src/components/DailyView.tsx:275
  - src/components/History.tsx:48
  - src/components/ProfilePage.tsx:116
links:
  - type: relates-to
    target: truck-agent
  - type: relates-to
    target: truck-status
---

# TASK-002: Replace Record<string, any> with proper types

## Description

Replace all Record<string, any> usages with properly typed interfaces to improve type safety.

## Files and Lines

- src/lib/offlineQueue.ts:17 - payload in QueuedOp interface
- src/lib/offlineQueue.ts:74 - payload in addOp function
- src/lib/offlineQueue.ts:115 - log in updateLogCache
- src/lib/offlineQueue.ts:168 - payload in saveLog
- src/components/DailyView.tsx:205 - payload object
- src/components/DailyView.tsx:275 - payload object
- src/components/History.tsx:48 - dayMap object
- src/components/ProfilePage.tsx:116 - byMonth object

## Acceptance Criteria

- Define specific interfaces (ShiftPayload, LeavePayload, LogEntry, etc.)
- Replace all Record<string, any> with concrete types
- TypeScript compiles without errors
- No runtime behavior changes
