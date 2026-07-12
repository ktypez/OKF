---
type: document
id: truck-commands
project: truck
last_updated: 2026-07-12
status: active
freshness: 2026-07-04
verified: 2026-07-04
expires: null
superseded_by: null
anchors: []
links:
  - type: documents
    target: truck-agent
  - type: relates-to
    target: truck-dependencies
  - type: relates-to
    target: truck-structure
---

# คำสั่งของโปรเจกต์ Truck

## การพัฒนา (Development)
- `npm run dev`: เริ่ม Vite dev server

## การ build (Build)
- `npm run build`: Build PWA สำหรับ production
- `npm run preview`: ดูตัวอย่าง production build

## ตรวจสอบคุณภาพ (Quality Assurance)
- `npm run test`: รัน Vitest tests
- `npm run test:watch`: รัน tests แบบ watch mode
- `npm run lint`: รัน ESLint
- `npm run typecheck`: ตรวจสอบ TypeScript type
- `npm run format`: จัดรูปแบบโค้ดด้วย Prettier
