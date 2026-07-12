---
type: project-dependencies
id: collage-deps
project: collage
last_updated: 2026-07-12
status: active
---

# ไลบรารีที่พึ่งพา (Dependencies)

## Backend

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.21.0 | HTTP server |
| sharp | ^0.33.0 | ประมวลผลรูปภาพ (สร้าง collage) |
| @aws-sdk/client-s3 | ^3.600.0 | Cloudflare R2 storage |
| multer | ^1.4.5 | จัดการอัปโหลดไฟล์ |
| fontkit | ^2.0.0 | โหลดฟอนต์ |
| opentype.js | ^2.0.0 | เรนเดอร์ฟอนต์สำหรับข้อความ overlay |
| cors | | คำขอข้าม origin |

## Frontend

| Package | Version | Purpose |
|---------|---------|---------|
| @line/bot-sdk | ^9.0.0 | LINE Messaging API (webhook) |

## บริการภายนอก (External Services)

| Service | Purpose |
|---------|---------|
| Cloudflare R2 | เก็บรูปภาพ (bucket: ezzyreport) |
| LINE Messaging API | Bot webhook + LIFF integration |
| Render.com | โฮสต์ backend API |
| Vercel | โฮสต์ frontend + webhook |
