---
type: project-commands
id: data-mcky-space-cmds
project: data.mcky.space
last_updated: 2026-07-12
status: active
---

# ระบบคำสั่ง (Commands)

| Command | Action |
|---------|--------|
| `npx vite` | เริ่ม dev server |
| `npx vite build` | สร้าง production build |
| `npx wrangler pages deploy --project-name data ./dist` | Deploy ไป Cloudflare Pages |
| `npx wrangler pages dev --port 8788 ./dist` | รัน Pages Functions บน local |
