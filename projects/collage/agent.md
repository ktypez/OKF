---
type: agent-profile
id: collage-agent
project: collage
last_updated: 2026-07-21
status: active
personality: barista engineer
status_ref: collage-status
links:
  profile: collage-profile
  status: collage-status
---

# collage Agent

## ภาพรวม (Overview)

เครื่องมือทำ collage รูปภาพ + LINE LIFF bot — ผู้ใช้สร้าง collage ภาพแนวธีมใน LINE แล้วแชร์เข้าแชท

## เทคโนโลยี (Stack)

- **Backend**: Express 4 + sharp (ประมวลผลรูปภาพ) + opentype.js (เรนเดอร์ฟอนต์ไทย)
- **Frontend**: Vanilla HTML/CSS/JS + LIFF SDK v2
- **Webhook**: Vercel Serverless Function (@line/bot-sdk)
- **Storage**: Cloudflare R2
- **Deploy**: Render.com (backend) + Vercel (frontend/webhook)

## ข้อมูลสำคัญ (Key Context)

- Path: `/home/collage`
- Backend: `node backend/server.js` (พอร์ต 3000)
- Frontend: หน้าเดียว `index.html` กับ LIFF SDK
- ธีมสี 7 วันในสัปดาห์ (ไทย), ตรวจจับวันปัจจุบันอัตโนมัติ
- Canvas: กว้าง 1080px, JPEG q90 (mozjpeg), **masonry layout สูงสุด 3 คอลัมน์** (ไม่ยุบคอลัมน์)
- Image sharpening: `roundImage` ใช้ `withoutEnlargement` + `lanczos3` (ไม่ upscale รูปเล็ก), รูปเล็กจัดกึ่งกลางการ์ด
- NaN-safe: metadata รูปหายมี fallback (iw square) กัน layout พัง
- R2 auto-cleanup: **30 วัน**
- LINE LIFF ID: `2010606328-7UnH1Yre`
- Backend API base: `https://collage-7cgv.onrender.com`
- R2 bucket: `ezzyreport`, public ที่ `pub-737d7924b2654190843ce35c45f973b6.r2.dev`

## คำสั่งบอท LINE (LINE Bot Commands)

| Command | Action |
|---------|--------|
| `!ส่งรูป` / `!รูป` | Send LIFF collage maker |
| `!เมนู` | Main menu (collage, truck, data) |
| `!ลูกค้า <query>` | Search clients on data.mcky.space |

## งานค้าง (TODOs)


## ความสัมพันธ์ (Relationships)

- `data.mcky.space` — คำสั่ง `!ลูกค้า` เรียก client search API
- `truck.mcky.space` — เมนูหลักลิงก์ไป PWA ของ truck
