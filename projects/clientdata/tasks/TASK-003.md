---
type: task
id: TASK-003
project: clientdata
last_updated: 2026-07-07
status: closed
freshness: 2026-07-07
verified: 2026-07-07
expires: null
superseded_by: null
claimed_by: agent
opened: 2026-07-07
closed: 2026-07-07
priority: high
component: ui
anchors:
  - /home/clientdata/app/
  - /home/clientdata/components/
  - /home/clientdata/lib/
links:
  - type: relates-to
    target: DEC-008
  - type: relates-to
    target: LSN-002
---

# TASK-003: Migrate UI to Astryx Design System

## Description

Replace all shadcn/ui, Base UI, and Phosphor Icons dependencies with the Astryx Design System (Meta) and Lucide icons. Keep the same UX, workflow, API, and architecture.

## Outcome

- All UI primitives (Button, Card, Dialog, Tooltip, Skeleton, Spinner, Switch, Sheet) rewritten as Astryx wrappers
- All layout/navigation components rewritten (SideNav, TopNav, PageHeader, Layout)
- All data views rewritten (Table, Card, List, Typeahead, Lightbox)
- All overlays & forms rewritten (FormLayout, TextInput, Selector, ImageUpload)
- All Phosphor Icons replaced with Lucide equivalents
- TypeScript compiles with zero errors
- Production build succeeds
- Deployed to https://astryx.mcky.space on the `astryx` branch
