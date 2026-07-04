---
type: project-profile
id: habby-profile
project: habby
last_updated: 2026-07-04
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: habby-agent
  - type: relates-to
    target: habby-status
  - type: relates-to
    target: habby-structure
  - type: relates-to
    target: habby-dependencies
  - type: relates-to
    target: habby-commands
---

# Project Profile: habby

## Identity
- **Name:** habby
- **Display Name:** Habby
- **Description:** Gamified habit tracker.
- **Purpose:** Track habits with XP/leveling gamification.
- **Repository:** Unknown
- **Owner:** Unknown

## Technology
- **Languages:** JavaScript
- **Frameworks:** Vite 6, Express 5
- **Runtime:** Node.js
- **Package Manager:** yarn
- **Build System:** Vite build
- **Deployment Targets:** Vercel (static + serverless)

## Dependencies
- **Major Libraries:** `express`, `ioredis`, `cors`
- **External Services:** Redis (Upstash)
- **Databases:** Redis
- **Cloud Providers:** Upstash, Vercel
- **APIs:** Redis API

## Development
- **Setup:** `yarn install`
- **Install:** `yarn install`
- **Build:** `yarn build`
- **Test:** Not configured
- **Lint:** Not configured
- **Run:** `yarn dev`

## Architecture
- **Structure:** Vite frontend + Express backend
- **Entry Points:** `index.html` (Vite), `server.js` (Express)
- **Important Packages:** `ioredis` for Redis connection

## Documentation
- **Agent Context:** [agent.md](./agent.md)
- **Status:** [status.md](./status.md)

## Quality
- **Tests:** Not configured
- **CI:** Vercel CI
- **Linters:** Not configured

## Status
- **State:** active
- **Documentation Completeness:** Medium
- **Confidence Level:** High

**Source:**
- `/home/habby/package.json`
- `/home/OKF/projects/habby/agent.md`
