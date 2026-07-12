---
type: project-status
id: receipts-dms-status
project: receipts-dms
last_updated: 2026-07-12
status: active
anchors:
  - /home/paper/receipts-dms/
---

# สถานะ

**Role:** production
**Deployment:** Cloudflare Pages (paper.mcky.space)
**Last deploy:** 2026-07-10

## ฟีเจอร์

- [x] อัปโหลดพร้อมบีบอัดรูปภาพ (WebP 2048px / 80%)
- [x] แถบความคืบหน้า XHR upload
- [x] รายการใบเสร็จ (สลับมุมมอง table + card)
- [x] รายละเอียดใบเสร็จ (preview, lightbox, แก้ไข filename/category/notes)
- [x] Category CRUD (แบบ card, แก้ไขแบบยุบได้)
- [x] ค้นหาแบบเต็มข้อความ (filename + notes)
- [x] กรองตามหมวดหมู่
- [x] การแบ่งหน้า (20 ต่อหน้า)
- [x] บันทึกโน้ต (upload textarea, แสดงผล, แก้ไข)
- [x] auth แบบรหัสผ่านเดียว (HMAC cookie)
- [x] สลับธีม dark/light
- [x] สถิติการจัดเก็บ (จำนวนใบเสร็จ + ขนาดรวม)
- [x] bottom nav (มือถือ) + sidebar (เดสก์ท็อป)
- [x] ป้าย UI ภาษาไทย
- [x] การออกแบบ responsive

## ที่นำออก

- ระบบ tags (เคยเพิ่มแล้วลบออกทั้งหมด)
- การแสดงนามสกุลไฟล์ (ซ่อนผ่าน `stripExtension`)
- คอลัมน์ action ในมุมมอง table

## ฐานข้อมูล

```sql
receipts: id, filename, category, content_type, size, uploaded_at, notes
categories: id, name, created_at
```

## เส้นทาง

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/receipts` | รายการใบเสร็จ |
| `/receipts/:id` | รายละเอียดใบเสร็จ |
| `/upload` | อัปโหลด |
| `/categories` | จัดการหมวดหมู่ |
| `/settings` | ตั้งค่า |
| `/login` | เข้าสู่ระบบ (ไม่ต้อง auth) |
