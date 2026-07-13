---
title: 'โครงสร้างโปรเจกต์: mcky.space'
description: document from mcky.space
---

# โครงสร้างโปรเจกต์: mcky.space

## โครงสร้างไดเรกทอรี
- `src/`: ซอร์สโค้ด Astro
  - `pages/`: นิยาม route
  - `components/`: คอมโพเนนต์ Astro/UI
  - `layouts/`: layout ของหน้า
  - `lib/`: ฟังก์ชันช่วย
  - `api/`: จุดสิ้นสุด API
  - `data/`: ไฟล์ข้อมูลคงที่
- `public/`: สินทรัพย์คงที่ (ฟอนต์ ฯลฯ)
- `docs/`: เอกสารโปรเจกต์
- `scripts/`: สคริปต์ build (เช่น `build-blog-posts.mjs`)

## ไฟล์สำคัญ
- `astro.config.mjs`: การตั้งค่า Astro
- `setup.sql`: สคริปต์ตั้งค่าฐานข้อมูล
- `vercel.json`: config การ deploy Vercel
