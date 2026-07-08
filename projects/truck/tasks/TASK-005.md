---
type: task
id: TASK-005
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
component: logging
anchors:
  - src/App.tsx:106
  - src/App.tsx:115
  - src/components/ProfilePage.tsx:63
  - src/components/ProfilePage.tsx:73
  - src/components/ProfilePage.tsx:78
  - src/components/ProfilePage.tsx:180
  - src/components/ErrorBoundary.tsx:20
  - src/components/profile/UserManagement.tsx:70
links:
  - type: relates-to
    target: truck-agent
  - type: relates-to
    target: truck-status
---

# TASK-005: Remove console.error from production code

## Description

Remove or replace console.error calls with a proper error reporting mechanism.

## Files and Lines

- src/App.tsx:106 - Failed to replay offline queue
- src/App.tsx:115 - Failed to restore session
- src/components/ProfilePage.tsx:63 - Failed to load user profile
- src/components/ProfilePage.tsx:73 - Failed to load admin flag
- src/components/ProfilePage.tsx:78 - Failed to load admin flag
- src/components/ProfilePage.tsx:180 - Sign out failed
- src/components/ErrorBoundary.tsx:20 - ErrorBoundary caught
- src/components/profile/UserManagement.tsx:70 - user_profiles error

## Acceptance Criteria

- Remove console.error calls or replace with toggleable error utility
- No sensitive data leaked in error messages
- Error handling still works (catch blocks remain)
