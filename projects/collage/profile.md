---
type: project-profile
id: collage-profile
project: collage
last_updated: 2026-07-22
status: active
stack:
  language: JavaScript
  framework: Express 4 (backend) + vanilla HTML/CSS/JS (frontend)
  ui: vanilla CSS
  database: none
  storage: Cloudflare R2
  state: none
  auth: LINE Messaging API
  testing: none
  deployment: Render.com (backend) + Vercel (frontend)
  ci: none
agent_personality: barista engineer
links:
  agent: collage-agent
  status: collage-status
---

# ข้อมูลโปรเจกต์: collage

## ข้อมูลจำเพาะ (Identity)
- **Name:** collage
- **Description:** เครื่องมือทำ collage รูปภาพ พร้อม LINE LIFF bot
- **Purpose:** สร้าง collage ภาพแนวธีมแล้วแชร์ผ่าน LINE chat

## เทคโนโลยี (Technology)
- **Languages:** JavaScript (Node.js), HTML/CSS
- **Frameworks:** Express 4 (backend), vanilla HTML/CSS/JS (frontend)
- **Runtime:** Node.js (ESM)
- **Package Manager:** npm
- **Image Processing:** sharp 0.33, opentype.js 2.0, fontkit 2.0
- **Deployment Targets:** Render.com (backend API), Vercel (frontend + webhook)

## Development

| Command | Action |
|---------|--------|
| `node backend/server.js` | เริ่ม backend API server (พอร์ต 3000) |
| `npm run deploy:webhook` | Deploy webhook ไป Vercel |
| `npm run deploy:backend` | Deploy backend ไป Render.com |

## API

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/collage` | อัปโหลดรูป + สร้าง collage |
| GET | `/api/image/:filename` | ดึงรูป collage จาก R2 |
| GET | `/health` | ตรวจสอบสถานะ |
| POST | `/api/cleanup` | ลบ collages ที่เก่ากว่า 30 วัน |

## LINE Bot

| Command | Response |
|---------|----------|
| `!ส่งรูป` / `!รูป` | เปิด LIFF collage maker |
| `!เมนู` | เมนูหลัก ลิงก์ไป collage, truck, data |
| `!ลูกค้า <query>` | ค้นหาลูกค้าใน data.mcky.space |

## Dependencies

### Backend

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.21.0 | HTTP server |
| sharp | ^0.33.5 | ประมวลผลรูปภาพ (สร้าง collage) |
| @aws-sdk/client-s3 | ^3.600.0 | Cloudflare R2 storage |
| multer | ^1.4.5-lts.1 | จัดการอัปโหลดไฟล์ |
| fontkit | ^2.0.4 | โหลดฟอนต์ |
| opentype.js | ^2.0.0 | เรนเดอร์ฟอนต์สำหรับข้อความ overlay |
| cors | ^2.8.5 | คำขอข้าม origin |

### Frontend

| Package | Version | Purpose |
|---------|---------|---------|
| @line/bot-sdk | ^9.0.0 | LINE Messaging API (webhook) |

### External Services

| Service | Purpose |
|---------|---------|
| Cloudflare R2 | เก็บรูปภาพ (bucket: ezzyreport) |
| LINE Messaging API | Bot webhook + LIFF integration |
| Render.com | โฮสต์ backend API |
| Vercel | โฮสต์ frontend + webhook |

## สถาปัตยกรรม (Architecture)
- **Backend:** Express server บน Render.com — collage generation API
- **Frontend:** หน้า HTML เดียวกับ LIFF SDK v2 — UI ตัวทำ collage
- **Webhook:** Vercel Serverless Function — ตัวจัดการคำสั่งบอท LINE
- **Storage:** Cloudflare R2 สำหรับรูป collage ที่สร้าง

### Project Structure

```
collage/
├── backend/
│   ├── server.js              # Express server: routes, multer, startup
│   ├── collage.js             # Core: layout engine, header SVG, card/shadow rendering
│   ├── r2-storage.js          # S3 client for R2: upload, get stream, cleanup old
│   ├── NotoSansThai.ttf       # Thai font for text overlay
│   ├── .env.example           # R2 env vars template
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── index.html             # LIFF app page (collage maker UI)
│   ├── sample.html            # Theme color preview mockup
│   ├── api/
│   │   └── webhook.js         # LINE bot webhook (Vercel Serverless Function)
│   ├── vercel.json            # Route /liff → /index.html
│   ├── .env.local             # Vercel OIDC token
│   └── package.json
├── .gitignore
├── .vercel/
│   └── repo.json
```

## การ deploy (Deployment)
| Component | Platform | URL |
|-----------|----------|-----|
| Backend API | Render.com | `collage-7cgv.onrender.com` |
| Frontend + Webhook | Vercel | collage.vercel.app |
| Image storage | Cloudflare R2 | pub-737d7924b2654190843ce35c45f973b6.r2.dev |
| Source | GitHub | `github.com/ktypez/collage` |

## สถานะ (Status)
- **State:** active
- **Role:** พัฒนาอยู่
- **LINE LIFF ID:** `2010606328-7UnH1Yre`
