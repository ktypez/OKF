---
type: instruction
id: okf-setup
last_updated: 2026-07-23T00:00:00.000Z
title: OKF Setup Guide
description: ''
tags:
  - SETUP
timestamp: Wed Jul 23 2026 00:00:00 GMT+0000 (Coordinated Universal Time)T12:00:00Z
---

# OKF Setup Guide

Quick start for agents and humans cloning this repo.

## What Is This

OKF (Open Knowledge Framework) is a portable knowledge base at `~/OKF/`. It stores project context as markdown files with YAML frontmatter — profiles, agents, status, and more.

## Quick Setup

```bash
git clone <repo-url> ~/OKF
```

`~/OKF/` is a plain directory of markdown files — no build step, no MCP server, no tooling needed.

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
│   └── sync-log.md                   ← Change history
├── skills/                           ← Specialized skills
└── plan/                             ← Multi-step task plans
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

## Rules

- Read/edit `.md` files directly — no tooling layer in between
- Dates are always YYYY-MM-DD
- No Chinese characters — Thai or English only
- `.md` files are the source of truth (edit them directly)
