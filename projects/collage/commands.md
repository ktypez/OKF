---
type: project-commands
id: collage-cmds
project: collage
last_updated: 2026-07-11
status: active
---

# Commands

| Command | Action |
|---------|--------|
| `node backend/server.js` | Start backend API server (port 3000) |
| `npm run deploy:webhook` | Deploy webhook to Vercel |
| `npm run deploy:backend` | Deploy backend to Render.com |

## Backend API

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/collage` | Upload images + generate collage |
| GET | `/api/image/:filename` | Serve collage image from R2 |
| GET | `/health` | Health check |
| POST | `/api/cleanup` | Delete collages older than 90 days |

## LINE Bot Commands

| Command | Response |
|---------|----------|
| `!ส่งรูป` / `!รูป` | Open LIFF collage maker |
| `!เมนู` | Main menu with links to collage, truck, data |
| `!ลูกค้า <query>` | Search clients on data.mcky.space |
