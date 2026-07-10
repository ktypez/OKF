---
type: agent-profile
id: data-agent
project: data
last_updated: 2026-07-10
status: active
freshness: 2026-07-10
verified: 2026-07-10
expires: null
superseded_by: null
personality: data goblin
status_ref: ./status.md
anchors:
  - /home/data/
links:
  - type: relates-to
    target: data-profile
  - type: relates-to
    target: data-status
  - type: relates-to
    target: clientdata-agent
---

# data Agent

## Overview

Production deployment of clientdata — stable branch at `data.mcky.space`.

## Stack

Same as clientdata (Next.js 16 + Drizzle + Neon + R2).

## Key Difference

- **Source**: `stable` branch of `ktypez/clientdata`
- **Experimental upstream**: `clientdata` (master branch) — changes merged to stable before deploying here
- **Domain**: `data.mcky.space`

## Commands

| Command | What it does |
|---------|-------------|
| `npx next dev -H localhost` | Dev server |

## Triggers

### "update .md"

1. Sync status from clientdata stable branch state

## Git Workflow

- `~/data` tracks `origin/stable`
- Experimental changes go through `master` → tested → merged to `stable` → auto-deploys to `data.mcky.space`
