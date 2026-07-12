---
type: document
id: clientdata-commands
project: clientdata
last_updated: 2026-07-12
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: documents
    target: clientdata-agent
  - type: relates-to
    target: clientdata-dependencies
  - type: relates-to
    target: clientdata-structure
---

# คำสั่งโปรเจกต์: clientdata

## การพัฒนา (Development)

- `npm run dev`: เริ่ม development server
- `npm run build`: Build สำหรับ production

## ฐานข้อมูล (Database)

- `npm run db:push`: Push การเปลี่ยนแปลง schema ไปยัง Neon
- `npm run db:migrate`: รันสคริปต์ migration จาก Redis ไป Neon

## การตรวจสอบคุณภาพ (Quality Assurance)

- `npm run lint`: รัน ESLint
