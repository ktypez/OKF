---
type: project-status
id: collage-status
project: collage
last_updated: 2026-07-22
status: active
links:
  profile: collage-profile
  agent: collage-agent
---

# สถานะโปรเจกต์ — collage

## Routes

### Backend (Express, Render.com)
| Path | Description |
|------|-------------|
| `POST /api/collage` | สร้าง collage จากรูปที่อัปโหลด |
| `GET /api/image/:filename` | ดึง collage จาก R2 |
| `GET /health` | ตรวจสอบสถานะ |
| `POST /api/cleanup` | ลบ collages เก่า (>30 วัน) |

### Frontend (Vercel)
| Path | Description |
|------|-------------|
| `/liff` | UI ตัวทำ collage (LIFF) |
| `/api/webhook` | LINE bot webhook |

## ระบบดีไซน์ (Design System)

- ธีมสี 7 วันในสัปดาห์ (อา=แดง, จ=เบจ, อ=ชมพู, พ=เขียว, พฤ=ส้ม, ศ=น้ำเงิน, ส=ม่วง)
- Collage: กว้าง 1080px, หัวกระดาษ gradient สูง 220px, การ์ดขาวมุมมน, เงาตก
- Layout: masonry, สูงสุด 3 คอลัมน์ (ไม่ยุบคอลัมน์)
- Output: JPEG คุณภาพ 90 (mozjpeg)
- ปฏิทินไทย (ปี พ.ศ. +543), ชื่อเดือนไทย

## ฟีเจอร์ (Features)

- [x] LIFF integration — เปิดจาก LINE, เลือกรูป, สร้าง collage
- [x] ธีมสี 7 วันในสัปดาห์, ตรวจจับวันนี้ให้อัตโนมัติ
- [x] Masonry layout (สูงสุด 3 คอลัมน์, ไม่ยุบ) — รูปสั้นเติมช่องว่าง
- [x] NaN-safe กับขนาดรูป
- [x] เรนเดอร์ฟอนต์ไทยผ่าน opentype.js
- [x] คำสั่งบอท LINE (!ส่งรูป, !เมนู, !ลูกค้า)
- [x] Cloudflare R2 storage พร้อมลบอัตโนมัติทุก 30 วัน
- [x] Dark mode (prefers-color-scheme)
- [x] ชื่อผู้ใช้คงอยู่ (localStorage)
- [x] รูปต้นทางคมขึ้น — ไม่ upscaling, ลดขนาด lanczos3, Q90 mozjpeg

## บันทึกการเปลี่ยนแปลง (Changelog)

### 2026-07-13
- Sync OKF knowledge base across all 8 projects
- Updated workspace index with current project inventory
- Refreshed documentation timestamps and freshness

### 2026-07-12 (3)
- กลับเป็น masonry (max 3 คอลัมน์) แทน row-wrapping grid — รูปสั้นเติมช่องว่าง ลดความยาว collage
- ลบ isSmallLayout ห้ามยุบคอลัมน์ (ผู้ใช้: ไม่ควรยุบ มีแต่จะเพิ่ม)
- คง guard NaN ตามไอเดีย "วัดความสูงจากรูปแรกของแถว"

### 2026-07-12 (2)
- Fix บั๊ก layout รูปกระจกข้างบน (rowTops สะสม Y)
- Auto-cleanup R2: 90 -> 30 วัน

### 2026-07-12 (1)
- Fix blur: withoutEnlargement + lanczos3 + Q90 mozjpeg
- Layout: masonry -> row-wrapping grid 3 คอลัมน์ (ชั่วคราว)
- Fix บั๊ก NaN

### 2026-07-11
- Initial KB documentation
- Theme system: 7 day-of-week colors
- Smart grid layout, centered last row
- Persistent name via localStorage
- Canvas auto-fits content height
- Main menu: added truck.mcky.space button
- Webhook: URLSearchParams for + encoding
- Shrink preset buttons to 34px
- Sample mockup
- gitignore cleanup
