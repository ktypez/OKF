---
type: task
id: TASK-008
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
component: hooks
anchors:
  - src/App.tsx:99
  - src/App.tsx:111
  - src/components/DailyView.tsx:92
  - src/components/profile/UserManagement.tsx:106
  - src/components/ThemeEffects.tsx:10
  - src/App.tsx:85
links:
  - type: relates-to
    target: truck-agent
  - type: relates-to
    target: truck-status
---

# TASK-008: Clean up stale closures and DOM manipulation

## Description

Fix stale closure risks and review DOM manipulation patterns.

## Files and Lines

- src/App.tsx:99-109 - replayQueue closure may use stale session
- src/App.tsx:111-125 - getSession empty deps array
- src/components/DailyView.tsx:92-110 - complex useEffect deps
- src/components/profile/UserManagement.tsx:106-110 - fetchAll with suppressed deps
- src/components/ThemeEffects.tsx:10-54 - DOM manipulation in useEffect
- src/App.tsx:85 - window.close() no-op in PWA

## Acceptance Criteria

- Use refs to capture latest values for stale closures
- Ensure DOM cleanup runs correctly
- Remove or replace window.close() with PWA-compatible alternative
- No runtime behavior changes
