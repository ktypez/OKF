---
title: Commands
description: project-commands from receipts-dms
---

# Commands

| Command | Action |
|---------|--------|
| `node node_modules/.bin/vite` | Start dev server (with proxy to localhost:8788) |
| `node node_modules/vite/bin/vite.js build` | Production build to `./public` |
| `npx wrangler pages deploy --project-name receipts-dms ./public` | Deploy to Cloudflare Pages |
| `npx wrangler pages dev --port 8788 ./public` | Run Pages Functions locally |
| `npx wrangler d1 execute receipts-db --local --file=schema.sql` | Apply schema locally |
| `npx wrangler d1 execute receipts-db --file=schema.sql` | Apply schema on Cloudflare |
| `npx wrangler pages secret put AUTH_PASSWORD --project-name receipts-dms` | Set auth password |
| `npx wrangler pages secret put AUTH_SECRET --project-name receipts-dms` | Set auth HMAC secret |

## Environment Variables (secrets)

| Variable | Purpose |
|----------|---------|
| `AUTH_PASSWORD` | Single password for login |
| `AUTH_SECRET` | HMAC key for signing/verifying auth tokens |
