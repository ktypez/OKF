---
title: ระบบคำสั่ง (Commands)
description: project-commands from collage
---

# ระบบคำสั่ง (Commands)

| Command | Action |
|---------|--------|
| `node backend/server.js` | เริ่ม backend API server (พอร์ต 3000) |
| `npm run deploy:webhook` | Deploy webhook ไป Vercel |
| `npm run deploy:backend` | Deploy backend ไป Render.com |

## Backend API

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/collage` | อัปโหลดรูป + สร้าง collage |
| GET | `/api/image/:filename` | ดึงรูป collage จาก R2 |
| GET | `/health` | ตรวจสอบสถานะ |
| POST | `/api/cleanup` | ลบ collage ที่เก่ากว่า 90 วัน |

## คำสั่งบอท LINE (LINE Bot Commands)

| Command | Response |
|---------|----------|
| `!ส่งรูป` / `!รูป` | เปิด LIFF collage maker |
| `!เมนู` | เมนูหลัก ลิงก์ไป collage, truck, data |
| `!ลูกค้า <query>` | ค้นหาลูกค้าใน data.mcky.space |
