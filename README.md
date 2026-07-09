# OKF — Open Knowledge Framework

A portable, self-documenting knowledge base system for AI coding agents.

OKF lives at `~/OKF/` and provides structured context for every project in the workspace — consistent schemas, YAML frontmatter, trigger-based automation, and a 5-step bootstrap flow for AI agents.

## Layout

```
OKF/
├── index.md            Workspace index (entry point)
├── projects/           Per-project docs
│   └── <project>/
│       ├── agent.md    Agent personality + triggers
│       ├── profile.md  Tech stack + architecture
│       ├── status.md   Routes, components, changelog
│       ├── structure.md
│       └── commands.md
├── system/             Workspace-level docs
│   ├── conventions.md  Communication rules + setup
│   ├── inventory.md    Task triggers
│   └── workspace.md    Cross-project comparison
├── skills/             Registered skills
└── templates/          Project template

```

## Triggers

| Trigger | Action |
|---------|--------|
| `update .md` | Sync KB with latest project state |
| `cleanup` | Health check — unused deps, stale files |
| `wrap-day` | Read diff, update changelog + status, commit (truck only) |
| `doctor-kb` | Knowledge lifecycle audit — stale, expired |
| `backfill` | Seed KB from git history + code structure |

## Quick Start

1. Read `index.md` for the full project roster
2. Read `system/conventions.md` for rules
3. Navigate to `projects/<name>/` for per-project context
