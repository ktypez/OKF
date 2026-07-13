---
title: 'คำสั่งโปรเจกต์: clientdata'
description: document from clientdata
---

:::caution[Archived Project]
This project is no longer actively maintained. Content may be outdated.
:::

# คำสั่งโปรเจกต์: clientdata

## การพัฒนา (Development)

- `npm run dev`: เริ่ม development server
- `npm run build`: Build สำหรับ production

## ฐานข้อมูล (Database)

- `npm run db:push`: Push การเปลี่ยนแปลง schema ไปยัง Neon
- `npm run db:migrate`: รันสคริปต์ migration จาก Redis ไป Neon

## การตรวจสอบคุณภาพ (Quality Assurance)

- `npm run lint`: รัน ESLint
