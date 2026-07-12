---
type: document
id: habby-structure
project: habby
last_updated: 2026-07-12
status: active
freshness: 2026-07-12
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: documents
    target: habby-agent
  - type: relates-to
    target: habby-profile
---

# โครงสร้างโปรเจกต์: habby

## โครงสร้างไดเรกทอรี (Directory Layout)

- `api/`: ตรรกะ backend API
- `css/`: style ระดับ global
- `js/`: ตรรกะ frontend (`main.js`)
- `public/`: ไฟล์ static และ Service Worker
- `dist/`: ผลลัพธ์จาก build
- `scripts/`: สคริปต์เครื่องมือ (เช่น `cleanup-archived.mjs`)

## ไฟล์สำคัญ (Key Files)

- `index.html`: จุด entry หลัก
- `server.js`: Express server สำหรับ hosting/API
- `vite.config.js`: การตั้งค่า build ของ Vite
