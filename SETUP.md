---
type: instruction
id: okf-setup
last_updated: 2026-07-22
---

# OKF Setup Guide

Quick start for agents and humans cloning this repo.

## What Is This

OKF (Open Knowledge Framework) is a portable knowledge base at `~/OKF/`. It stores project context as markdown files with YAML frontmatter — profiles, agents, status, and more.

## Quick Setup

### 1. Clone & Install MCP

```bash
git clone <repo-url> ~/OKF
cd ~/OKF/mcp-server && npm install
```

### 2. Configure OpenCode

Add to `~/.config/opencode/opencode.jsonc`:

```jsonc
{
  "mcp": {
    "okf": {
      "type": "local",
      "command": ["node", "/root/OKF/mcp-server/index.js"],
      "enabled": true
    }
  }
}
```

Restart opencode after adding.

### 3. Verify

```bash
# Test MCP server
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}' | node ~/OKF/mcp-server/index.js
```

## Directory Layout

```
~/OKF/
├── index.md                          ← Start here — project roster
├── projects/<project>/
│   ├── profile.md                    ← Tech stack, architecture, deps, commands, structure
│   ├── agent.md                      ← Agent personality, triggers, changelog
│   └── status.md                     ← Live status, changelog, known issues
├── system/
│   ├── conventions.md                ← Communication rules, Universal Prompt
│   ├── glossary.md                   ← Terminology
│   ├── personalities.md              ← Agent personalities
│   ├── sync-log.md                   ← Change history
│   └── TODOS.md                      ← TODOs convention
├── mcp-server/                       ← Local MCP server
│   ├── index.js
│   ├── lib/
│   │   ├── okf.js                    ← Core OKF functions (read, write, parse)
│   │   ├── db.js                     ← SQLite connection (node:sqlite)
│   │   ├── compiler.js               ← Markdown → SQLite compiler
│   │   ├── tools.js                  ← MCP tools (×10)
│   │   └── watcher.js                ← File change watcher (chokidar)
│   └── okf.db                        ← Compiled SQLite database (.gitignore)
└── skills/                           ← Specialized skills
```

## How the KB Works

Every `.md` file uses YAML frontmatter + Markdown body:

```yaml
---
type: project-profile
id: truck-profile
project: truck
last_updated: 2026-07-22
status: active
---
```

### File Types

| Type | File | Purpose |
|------|------|---------|
| `project-profile` | profile.md | Tech stack, architecture, dependencies, commands, structure |
| `agent-profile` | agent.md | Agent personality, triggers, changelog |
| `project-status` | status.md | Live status, changelog, known issues |

## Using MCP Tools

The MCP server exposes 10 tools for reading and querying the KB.

### Query

```
projects                                  → list all projects
project truck                             → read truck's profile + agent + status
search "Supabase"                         → full-text search
filter framework=React                    → query by technology
dashboard                                 → summary table of all projects
stats                                     → cross-project statistics
tree                                      → browse directory structure
read projects/truck/profile.md            → raw file content
graph                                     → Mermaid knowledge graph
rebuild                                   → force recompile from .md files
```

## Rules

- Use MCP tools to read/query KB — the compiler syncs .md → SQLite automatically
- Dates are always YYYY-MM-DD
- No Chinese characters — Thai or English only
- `.md` files are the source of truth (edit them directly); `okf.db` is derived
