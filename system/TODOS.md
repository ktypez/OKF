---
type: system-doc
id: todos-convention
last_updated: 2026-07-11
---

# TODOs Convention

Project-level TODO items live in each project's KB (`projects/<project>/knowledge/`) as `document`-type nodes with checklist-style markdown bodies. These are discovered on every startup.

## How TODOs work

- Each TODO is a KB node with `type: document`, `status: active`, and a body containing one or more `- [ ]` checklist items
- Project agent profiles (`agent.md`) link to their TODO nodes in the KB
- There is no single `TODOS.md` file in project roots — everything lives in the KB graph

## Startup Check (GLOBAL)

Every agent **must** run this on every new session before starting any task:

1. Check `./TODOS.md` at project root if it exists (legacy support)
2. Query KB: `okf_query_nodes project:<project> type:document status:active`
3. Filter results: any node with `- [ ]` checklist items in its body is a TODO
4. Present to user: "Open TODOs: N items — <titles>"
5. Ask: work on a TODO or proceed with current request

## Per-project agent.md

Each project's `agent.md` should have a `## TODOs` section:
- List the project's TODO node IDs (e.g. DOC-002, DOC-003)
- State the startup check procedure
- Link to this system document (`todos-convention`)
