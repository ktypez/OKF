---
type: component
id: COMP-001
project: clientdata
last_updated: 2026-07-04
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors:
  - /home/clientdata/app/page.tsx
links:
  - type: relates-to  target: DEC-001
  - type: relates-to  target: TASK-001
  - type: relates-to  target: LSN-001
  - type: relates-to  target: RSK-001
---

# COMP-001: Dashboard

The main SPA dashboard — entry point for all client management workflows.

## Sub-components

- PageHeader (search, add, theme toggle)
- Sidebar (sheet drawer with collapsible groups)
- InlineMap (cluster map with geolocation)
- ClientDetail (client info panel, suggestions)
- ThemePresetPicker (14 presets dropdown)
