# OKF Dashboard - Deployment Guide

## Prerequisites

1. **Vercel Account** - สมัครฟรีที่ https://vercel.com
2. **GitHub Personal Access Token** - ตัวเดียวกับที่ใช้กับ MCP Server

## Setup Steps

### 1. Login to Vercel

```bash
cd /home/okf-dashboard
npx vercel login
```

### 2. Set Environment Variables

```bash
npx vercel env add GITHUB_OWNER
# Enter your GitHub username (e.g., "mcky-it")

npx vercel env add GITHUB_REPO
# Enter your OKF repository name (e.g., "OKF")

npx vercel env add GITHUB_TOKEN
# Enter your GitHub Personal Access Token
```

### 3. Deploy to Vercel

```bash
npx vercel --prod
```

After deployment, you'll get a URL like:
```
https://okf-dashboard.vercel.app
```

### 4. Test the Dashboard

1. Open your Vercel URL in browser
2. Dashboard should load and display the knowledge graph
3. Click nodes to see details in the inspector panel
4. Use search and filters to find specific nodes

## Features

- **Force-directed graph** visualization with D3.js
- **Search** across all nodes
- **Filter** by type, status, or project
- **Project cards** for quick navigation
- **Node inspector** with details and links
- **Responsive design** for mobile

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GITHUB_OWNER` | GitHub username | `mcky-it` |
| `GITHUB_REPO` | Repository name | `OKF` |
| `GITHUB_TOKEN` | Personal access token | `ghp_xxxx...` |

## How It Works

1. Dashboard loads `graph.json` from GitHub via API proxy
2. API proxy (`/api/github`) adds authentication server-side
3. Token stays hidden from browser (secure)
4. Rate limit: 5000 requests/hour (authenticated)

## Troubleshooting

### "Failed to load graph"
- Check environment variables are set correctly
- Verify GitHub token has `repo` scope
- Check Vercel function logs for errors

### Rate Limiting
- GitHub API has 5000 req/hour for authenticated users
- Dashboard loads graph.json once per page load
- Clicking nodes triggers additional requests

## Local Development

```bash
cd /home/okf-dashboard
npx vercel dev
```

Then open: `http://localhost:3000`