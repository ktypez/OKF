---
type: task
id: TASK-006
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
component: patterns
anchors:
  - src/App.tsx:99
  - src/App.tsx:111
  - src/components/ProfilePage.tsx:56
  - src/components/ProfilePage.tsx:67
  - src/AppRoutes.tsx:19
links:
  - type: relates-to
    target: truck-agent
  - type: relates-to
    target: truck-status
---

# TASK-006: Fix async useEffect patterns

## Description

Refactor async operations inside useEffect to use proper patterns.

## Files and Lines

- src/App.tsx:99-109 - replayQueue promise in useEffect
- src/App.tsx:111-125 - getSession promise in useEffect
- src/components/ProfilePage.tsx:56-65 - getUser promise in useEffect
- src/components/ProfilePage.tsx:67-81 - async IIFE for admin check
- src/AppRoutes.tsx:19-30 - AdminGuard async auth check

## Acceptance Criteria

- Extract async functions outside useEffect or use async IIFE
- All promises have .catch() handlers
- Proper cleanup/abort on unmount
- No React warnings in strict mode
