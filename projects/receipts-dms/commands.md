---
type: project-commands
id: receipts-dms-cmds
project: receipts-dms
last_updated: 2026-07-12
status: active
anchors:
  - /home/paper/receipts-dms/
---

# คำสั่ง

| คำสั่ง | การทำงาน |
|---------|--------|
| `node node_modules/.bin/vite` | เริ่ม dev server (พร้อม proxy ไป localhost:8788) |
| `node node_modules/vite/bin/vite.js build` | Production build ไปยัง `./public` |
| `npx wrangler pages deploy --project-name receipts-dms ./public` | Deploy ไป Cloudflare Pages |
| `npx wrangler pages dev --port 8788 ./public` | รัน Pages Functions แบบท้องถิ่น |
| `npx wrangler d1 execute receipts-db --local --file=schema.sql` | ประยุกต์ schema แบบท้องถิ่น |
| `npx wrangler d1 execute receipts-db --file=schema.sql` | ประยุกต์ schema บน Cloudflare |
| `npx wrangler pages secret put AUTH_PASSWORD --project-name receipts-dms` | ตั้งรหัสผ่าน auth |
| `npx wrangler pages secret put AUTH_SECRET --project-name receipts-dms` | ตั้ง HMAC secret สำหรับ auth |

## ตัวแปรสภาพแวดล้อม (secrets)

| ตัวแปร | หน้าที่ |
|----------|---------|
| `AUTH_PASSWORD` | รหัสผ่านเดียวสำหรับเข้าสู่ระบบ |
| `AUTH_SECRET` | คีย์ HMAC สำหรับเซ็น/ตรวจสอบ auth token |
