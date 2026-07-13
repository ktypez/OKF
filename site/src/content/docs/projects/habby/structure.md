---
title: 'โครงสร้างโปรเจกต์: habby'
description: document from habby
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
