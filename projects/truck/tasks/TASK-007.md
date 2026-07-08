---
type: task
id: TASK-007
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
priority: low
component: ui
anchors:
  - src/App.tsx:82
  - src/components/MonthYearSelector.tsx:33
  - src/components/daily/LeaveCard.tsx:37
  - src/lib/offlineQueue.ts:27
  - src/components/ToastContext.tsx:26
links:
  - type: relates-to
    target: truck-agent
  - type: relates-to
    target: truck-status
---

# TASK-007: Fix window.confirm, inline styles, and Math.random IDs

## Description

Replace window.confirm with ConfirmModal, move inline styles to CSS, use crypto.randomUUID.

## Files and Lines

- src/App.tsx:82 - window.confirm() - replace with existing ConfirmModal
- src/components/MonthYearSelector.tsx:33 - inline style tag on every render
- src/components/daily/LeaveCard.tsx:37 - inline style tag on every render
- src/lib/offlineQueue.ts:27 - Math.random for ID generation
- src/components/ToastContext.tsx:26 - Math.random for toast IDs

## Acceptance Criteria

- Replace window.confirm with ConfirmModal using async/await
- Move inline CSS to globals.css or inject once via useEffect
- Replace Math.random with crypto.randomUUID()
- No visual or behavioral changes
