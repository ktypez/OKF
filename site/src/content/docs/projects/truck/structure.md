---
title: โครงสร้างโปรเจกต์ Truck
description: document from truck
---

# โครงสร้างโปรเจกต์ Truck

## โครงสร้างโฟลเดอร์ (Directory Layout)
- `src/`: โค้ด React source
  - `components/`: UI components
  - `hooks/`: Custom React hooks
  - `lib/`: Utility และ API logic
  - `utils/`: Helper functions
  - `styles/`: CSS และไฟล์ theme
  - `test/`: Vitest tests
- `public/`: PWA assets (icons, splash, sw.js)
- `supabase/`: Supabase functions และ migrations
- `api/`: External API integrations (เช่น `telegram.ts`)

## ไฟล์สำคัญ (Key Files)
- `src/main.tsx`: จุดเริ่มต้นแอป
- `src/App.tsx`: Root component
- `vite.config.ts`: การตั้งค่า Vite
- `vitest.config.ts`: การตั้งค่า test
