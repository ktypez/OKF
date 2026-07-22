---
type: instruction
id: okf-setup
last_updated: 2026-07-21
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
│   │   ├── okf.js                    ← Core OKF functions
│   │   ├── db.js                     ← SQLite connection
│   │   ├── sync.js                   ← Markdown → SQLite sync
│   │   └── tools.js                  ← MCP tools
│   └── okf.db                        ← SQLite database
└── skills/                           ← Specialized skills
```

## How the KB Works

Every `.md` file uses YAML frontmatter + Markdown body:

```yaml
---
type: project-profile
id: truck-profile
project: truck
last_updated: 2026-07-21
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

The MCP server exposes 8 tools for reading and querying the KB.

### Query

```
okf_list_projects                    → see all projects
okf_get_project truck                → read truck's profile + agent + status
okf_search "Supabase"                → full-text search
okf_query_projects framework=React   → query by technology
okf_dashboard                        → summary of all projects
okf_project_stats                    → statistics across projects
okf_list_dir                         → browse structure
okf_get_file projects/truck/profile.md → raw file content
```

## Rules

- Use MCP tools to read/write KB — don't manually edit .md files
- Dates are always YYYY-MM-DD
- No Chinese characters — Thai or English only
- Don't push KB changes without explicit instruction
- Don't commit unless asked
