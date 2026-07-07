# OKF MCP Server - Deployment Guide

## Prerequisites

1. **Cloudflare Account** - สมัครฟรีที่ https://dash.cloudflare.com
2. **GitHub Personal Access Token** - สร้างที่ https://github.com/settings/tokens
   - Scope: `repo` (Full control of private repositories)

## Setup Steps

### 1. Login to Cloudflare

```bash
cd /home/okf-mcp-server
npx wrangler login
```

### 2. Set Secrets (GitHub Credentials)

```bash
npx wrangler secret put GITHUB_OWNER
# Enter your GitHub username (e.g., "mcky-it")

npx wrangler secret put GITHUB_REPO
# Enter your OKF repository name (e.g., "OKF")

npx wrangler secret put GITHUB_TOKEN
# Enter your GitHub Personal Access Token
```

### 3. Deploy to Cloudflare Workers

```bash
npx wrangler deploy
```

After deployment, you'll get a URL like:
```
https://okf-mcp-server.{your-account}.workers.dev/mcp
```

### 4. Test the MCP Server

1. Open MCP Inspector: https://modelcontextprotocol.io/inspector
2. Enter your MCP server URL: `https://okf-mcp-server.{your-account}.workers.dev/mcp`
3. Click "Connect"
4. Click "List Tools" to see available tools
5. Try calling tools like `okf_list_projects`

### 5. Configure opencode.json

Add to your `opencode.json`:

```json
{
  "mcp": {
    "okf": {
      "type": "remote",
      "url": "https://okf-mcp-server.{your-account}.workers.dev/mcp",
      "enabled": true
    }
  }
}
```

## Available Tools

### Read Tools

| Tool | Description |
|------|-------------|
| `okf_list_projects` | List all projects |
| `okf_get_project` | Get project metadata |
| `okf_query_nodes` | Query nodes by type/status |
| `okf_get_node` | Get specific node by ID |
| `okf_search` | Search knowledge base |
| `okf_get_file` | Get raw file content |

### Write Tools

| Tool | Description |
|------|-------------|
| `okf_create_node` | Create new knowledge node |
| `okf_update_node` | Update existing node |
| `okf_update_status` | Update node status |
| `okf_add_edge` | Add link between nodes |
| `okf_claim_task` | Claim a task |
| `okf_complete_task` | Complete a task |

## Local Development

```bash
cd /home/okf-mcp-server
npx wrangler dev --port 8788
```

Then test at: `http://localhost:8788/mcp`

## Troubleshooting

### "Unauthorized" Error
- Check that GitHub secrets are set correctly
- Verify your GitHub token has `repo` scope

### "Not Found" Error
- Verify `GITHUB_OWNER` and `GITHUB_REPO` are correct
- Check that the OKF repository exists and is accessible

### Rate Limiting
- GitHub API has rate limits (5000 requests/hour for authenticated users)
- For heavy usage, consider adding caching or optimizing API calls