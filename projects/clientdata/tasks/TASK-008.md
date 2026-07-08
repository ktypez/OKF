---
type: task
id: TASK-008
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
component: ClientDetail
anchors:
  - /home/clientdata/components/ClientDetail.tsx
links:
  - type: relates-to
    target: clientdata-agent
closed: '2026-07-08'
---



# Fix setState during render in ClientDetail

**Severity:** Medium
**File:** `components/ClientDetail.tsx:59-64`

## Bug

`setPrevClientId` and `setPhotoIdx` are called directly in the render body (not in an effect). Calling setState during render causes React to immediately re-render the component, and can trigger infinite render loops or subtle timing bugs with concurrent features.

## Fix

Move to a `useEffect` with `[client.id]` dependency:
```tsx
useEffect(() => {
  setPrevClientId(client.id)
  setPhotoIdx(0)
}, [client.id])
```
