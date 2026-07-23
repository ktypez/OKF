---
type: skill
id: kb-ops
last_updated: 2026-07-22T00:00:00.000Z
description: Manage OKF workspace — list projects, search files, read project docs.
title: kb-ops
tags:
  - skill
  - agent
  - opencode
  - kb-ops
timestamp: Wed Jul 22 2026 00:00:00 GMT+0000 (Coordinated Universal Time)T12:00:00Z
---

# kb-ops

Knowledge base operations — manage project docs across all projects in the OKF.

## Available MCP Tools

| Tool | Description |
|------|-------------|
| `projects` | List all projects with metadata |
| `project` | Read project profile + agent + status |
| `search` | Full-text search across title, description, body |
| `filter` | Query projects by technology, status, deployment |
| `read` | Read raw content of any OKF file |
| `tree` | Browse KB directory structure |
| `dashboard` | Summary table of all projects |
| `stats` | Cross-project statistics |
| `graph` | Mermaid knowledge graph — project → technology |
| `rebuild` | Force recompile KB from .md files |

## Usage

1. `projects` — discover what projects exist
2. `project <name>` — read full project context
3. `search <query>` — find specific content across KB
4. `read <path>` — read any specific file
