---
type: project-profile
id: mcky-space-profile
project: mcky.space
last_updated: 2026-07-04
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: mcky-agent
  - type: relates-to
    target: mcky-status
  - type: relates-to
    target: mcky-structure
  - type: relates-to
    target: mcky-dependencies
  - type: relates-to
    target: mcky-commands
---

# Project Profile: mcky.space

## Identity
- **Name:** mcky.space
- **Display Name:** mcky.space
- **Description:** Terminal-style personal website.
- **Purpose:** Personal portfolio and blog.
- **Repository:** Unknown
- **Owner:** Unknown

## Technology
- **Languages:** TypeScript, JavaScript
- **Frameworks:** Astro 7, Alpine.js
- **Runtime:** Node.js
- **Package Manager:** npm
- **Build System:** Astro build
- **Deployment Targets:** Vercel

## Dependencies
- **Major Libraries:** `@supabase/supabase-js`, `marked`
- **External Services:** Supabase
- **Databases:** Supabase (PostgreSQL)
- **Cloud Providers:** Supabase, Vercel
- **APIs:** Supabase API

## Development
- **Setup:** `npm install`
- **Install:** `npm install`
- **Build:** `npm run build`
- **Test:** Not configured (skip tests)
- **Lint:** Not configured (pure CSS)
- **Run:** `npm run dev`

## Architecture
- **Structure:** Astro SSR with Alpine.js client interactivity
- **Entry Points:** `src/pages/`
- **Important Packages:** `marked` for markdown processing

## Documentation
- **Agent Context:** [agent.md](./agent.md)
- **Status:** [status.md](./status.md)

## Quality
- **Tests:** N/A (skipped)
- **CI:** Vercel CI
- **Linters:** None (pure CSS)

## Status
- **State:** active
- **Documentation Completeness:** High
- **Confidence Level:** High

**Source:**
- `/home/mcky.space/package.json`
- `/home/OKF/projects/mcky.space/agent.md`
