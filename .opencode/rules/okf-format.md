---
type: rule
id: okf-format-rule
description: Rules for handling OKF (Open Knowledge Format) files with graph-aware schema
---

# OKF Format Rules

OKF = YAML frontmatter + Markdown body. Every file in `~/OKF/` uses this format.

Every file is a **node** in the project knowledge graph, with typed edges to other nodes.

## Base Structure

```yaml
---
type: <category>
id: <unique-id>
project: <project-name>       # required for task/knowledge/component nodes
last_updated: <YYYY-MM-DD>
status: active                # active | superseded | expired | archived
freshness: <YYYY-MM-DD>       # when content last changed
verified: <YYYY-MM-DD>        # when last confirmed against reality
expires: null                 # optional expiry date (YYYY-MM-DD or null)
superseded_by: null           # id of node that replaces this one
anchors:                      # file paths and symbols this node concerns
  - src/lib/auth.ts:42-60
  - src/lib/utils.ts
links:                        # typed edges to other nodes
  - type: supersedes
    target: DEC-003
  - type: relates-to
    target: TASK-012
  - type: blocks
    target: TASK-015
  - type: caused-by
    target: TASK-008
  - type: fulfills
    target: GOAL-001
  - type: documents
    target: COMP-002
---
```

## Node Types

| Type | ID Prefix | Description |
|------|-----------|-------------|
| `decision` | DEC | Architectural/design decisions with rationale |
| `lesson` | LSN | Things learned the hard way — failures, gotchas |
| `risk` | RSK | Known risks, regressions to avoid, unresolved issues |
| `goal` | GOAL | Project objectives, milestones, north stars |
| `gap` | GAP | Known unknowns, missing capabilities |
| `task` | TASK | Work items with lifecycle (open → claimed → closed) |
| `document` | DOC | Longer narratives — design specs, audits, overviews |
| `diagram` | DIAG | Visual architecture / sequence as text |
| `component` | COMP | Structural parts of the system, nested into a tree |
| `project-profile` | (none) | Technical metadata for a project |
| `agent-profile` | (none) | Agent context (personality, triggers, patterns) |
| `project-status` | (none) | Live project status (routes, changelog, known issues) |
| `system-doc` | (none) | Workspace-level documentation |
| `skill` | (none) | Skill definition |
| `instruction` | (none) | Usage instructions |
| `index` | (none) | Index / registry |

## Edge Types (links)

| Link Type | Direction | Meaning |
|-----------|-----------|---------|
| `supersedes` | → | This node replaces an older one |
| `superseded-by` | → | This node was replaced by another |
| `caused-by` | → | This node exists because of another (task created a lesson) |
| `blocks` | → | This node blocks the target from progressing |
| `blocks-for` | → | The target blocks this node |
| `relates-to` | → | Loose association |
| `fulfills` | → | This node satisfies a goal or requirement |
| `documents` | → | This document describes the target |
| `anchored-to` | → | This node concerns specific code (file:symbol) |
| `contradicts` | → | This node conflicts with another |
| `depends-on` | → | This node depends on the target |
| `part-of` | → | This component is a sub-component of the target |

## Rules

1. **Always preserve frontmatter** — do not strip or modify YAML frontmatter when editing OKF files
2. **Read frontmatter first** — before working with a file, parse its frontmatter to understand its `type` and `id`
3. **Frontmatter is metadata** — the `---` delimiters must remain intact; content after the second `---` is the Markdown body
4. **Date format**: always `YYYY-MM-DD` in `last_updated`, `freshness`, `verified`, `expires`
5. **No nested YAML** — frontmatter is flat or single-level lists only
6. **IDs are unique per project** — use sequential numbers: `DEC-001`, `TASK-001`, etc.
7. **Knowledge lifecycle**: set `status: superseded` when replaced, `status: expired` when stale, `status: archived` when no longer relevant. Update `verified` on confirmation.
8. **Anchors reference real paths** — relative to project root. Use `filepath:line-numbers` format.
9. **Graph index** — `graph.json` at `~/OKF/` is auto-generated from all KB files. Run `node scripts/build-graph.js` to rebuild.
