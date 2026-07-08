---
type: project-commands
id: writer-commands
project: writer
last_updated: 2026-07-05
---

# Writer Commands

The writer project is documentation-only (no codebase). Use standard OKF scripts:

| Command | Purpose |
|---------|---------|
| `node ~/OKF/scripts/build-graph.js` | Rebuild graph.json from all KB files |
| `node ~/OKF/scripts/dispatch.js` | List open tasks and context |
| `node ~/OKF/scripts/claim-task.js <TASK-ID>` | Claim a task |
| `node ~/OKF/scripts/complete-task.js <TASK-ID>` | Close a task and record lesson |
| `node ~/OKF/scripts/doctor-kb.js` | Knowledge lifecycle audit |
| `node ~/OKF/scripts/backfill.js` | Seed KB from git history + code structure |
