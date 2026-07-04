---
type: project-profile
id: cafe-v2-profile
project: cafe-v2
last_updated: 2026-07-04
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: cafe-v2-status
  - type: relates-to
    target: cafe-v2-structure
  - type: relates-to
    target: cafe-v2-dependencies
  - type: relates-to
    target: cafe-v2-commands
---
# Project Profile: cafe-v2

## Identity
- **Name:** coffee-line-bot
- **Display Name:** LINE Coffee Shop Ordering System Prototype
- **Description:** A prototype system for coffee shop ordering using LINE.
- **Purpose:** Demonstrate LIFF-based ordering and LINE Bot notifications.
- **Repository:** Unknown
- **Owner:** Unknown

## Technology
- **Languages:** JavaScript
- **Frameworks:** Express, Tailwind CSS
- **Runtime:** Node.js
- **Package Manager:** npm
- **Build System:** Manual (Node.js)
- **Deployment Targets:** VPS, Heroku

## Dependencies
- **Major Libraries:** `@line/bot-sdk`, `express`, `qrcode`
- **External Services:** LINE Platform
- **Databases:** In-memory (Prototype)
- **Cloud Providers:** Unknown
- **APIs:** LINE Messaging API

## Development
- **Setup:** `npm install`
- **Install:** `npm install`
- **Build:** N/A
- **Test:** N/A
- **Lint:** N/A
- **Run:** `npm start`

## Architecture
- **Structure:**
  - `liff/`: Frontend HTML/JS
  - `server/`: Express Backend
  - `admin/`: Admin Dashboard HTML
- **Entry Points:** `server/index.js`

## Documentation
- **README:** `/home/cafe-v2/README.md`

## Quality
- **Tests:** None
- **CI:** None
- **Linters:** None

## Status
- **State:** experimental
- **Documentation Completeness:** Medium
- **Confidence Level:** High

**Source:**
- `/home/cafe-v2/package.json`
- `/home/cafe-v2/README.md`
