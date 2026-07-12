---
type: project-profile
id: collage-profile
project: collage
last_updated: '2026-07-12'
status: active
freshness: '2026-07-12'
verified: 2026-07-11T00:00:00.000Z
expires: null
superseded_by: null
anchors:
  - /home/collage/
links:
  - type: relates-to
    target: collage-status
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

## Dependencies
- **Backend:** `sharp`, `express`, `multer`, `@aws-sdk/client-s3`, `fontkit`, `opentype.js`
- **Frontend:** `@line/bot-sdk` (สำหรับ webhook serverless function)
- **External Services:** Cloudflare R2 (เก็บรูป), LINE Messaging API
- **Font:** NotoSansThai (bundled .ttf)

## สถาปัตยกรรม (Architecture)
- **Backend:** Express server บน Render.com — collage generation API
- **Frontend:** หน้า HTML เดียวกับ LIFF SDK v2 — UI ตัวทำ collage
- **Webhook:** Vercel Serverless Function — ตัวจัดการคำสั่งบอท LINE
- **Storage:** Cloudflare R2 สำหรับรูป collage ที่สร้าง

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
