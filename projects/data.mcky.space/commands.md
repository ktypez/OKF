---
type: project-commands
id: data-mcky-space-cmds
project: data.mcky.space
last_updated: '2026-07-13'
status: active
freshness: '2026-07-13'
---

---
type: project-commands
id: data-mcky-space-cmds
project: data.mcky.space
last_updated: 2026-07-13
status: active
---

# ระบบคำสั่ง (Commands)

| Command | Action |
|---------|--------|
| `npx vite` | เริ่ม dev server |
| `npm run build` | สร้าง production build |
| `npx wrangler pages deploy ./dist --project-name=data-mcky-space` | Deploy ไป Cloudflare Pages (git auto-deploy ปิดอยู่) |
| `npx wrangler pages dev --port 8788 ./dist` | รัน Pages Functions บน local |
| `node scripts/health-check.mjs` | ตรวจสภาพ production (หน้าขาว/refresh loop/SW v2/bare spec) |

## หมายเหตุ deploy
- Git auto-deploy **ปิด** (production_deployments_enabled:false) → `wrangler pages deploy` คือผู้คุมเดียว
- ใช้ `--project-name=data-mcky-space` (ไม่ใช่ `data`)
- ไม่ใช้ `--branch` flag
- ถ้า build พังด้วย UNRESOLVED_IMPORT ให้เช็ค `vite.config.ts` resolve.alias (pnpm strict layout)

