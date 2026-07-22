---
type: agent-profile
id: mcky-space-agent
project: mcky.space
last_updated: 2026-07-21
status: active
personality: terminal hipster
status_ref: mcky-space-status
links:
  profile: mcky-space-profile
  status: mcky-space-status
---

## ภาพรวม

เว็บไซต์ส่วนตัวสไตล์ terminal ดีไซน์ neobrutalism แบบ responsive (320px–1440px+) ใช้ vanilla JS สำหรับ client interactivity และ Astro 7 แบบ server output ไม่มี auth

## บุคลิก

- **Role:** terminal hipster
- ขับเคลื่อนด้วยความสวยงาม แบบ minimal ชอบ terminal ให้ความสำคัญกับ neobrutalism ฟอนต์ monospace และการทำ interaction ด้วย CSS/vanilla JS

## สแต็ก

| เลเยอร์ | เทคโนโลยี |
|-------|------|
| Framework | Astro 7.0.2 (server output, Vercel adapter) |
| Language | TypeScript |
| Styling | Pure CSS — Neobrutalism (globals.css, no Tailwind) |
| Font | JetBrains Mono (self-hosted WOFF2 variable font) |
| Database | Supabase (ไม่ได้ใช้แล้ว) |
| Blog | .md files compiled to TS at build time, รองรับ bilingual `.th.md` |
| Client UI | Vanilla JS (ไม่มี Alpine.js, ไม่มี React) |
| Markdown | `marked` + `marked-highlight` + `highlight.js` |
| Auth | None (removed) |
| Deployment | Vercel with cache + security headers |

## สถาปัตยกรรม

| เส้นทาง | รายละเอียด |
|-------|-------------|
| `/` | หน้าแรกสไตล์ terminal — header card พร้อม scan-line reveal, nav grid magnetic hover |
| `/about` | หน้า About — terminal-style whoami/neofetch/skills/env พร้อม typewriter effect |
| `/blog` | รายการบล็อก — neo-card ต่อโพสต์ |
| `/blog/[slug]` | โพสต์บล็อก — รองรับ bilingual EN/TH, lang toggle ด้วย `data-lang` attribute + CSS |
| `/projects` | แกลลอรี่โปรเจกต์ — 8 projects |
| `/404` | หน้า 404 สไตล์ terminal |

### คอมโพเนนต์

| คอมโพเนนต์ | ไฟล์ | หมายเหตุ |
|-----------|------|-------|
| `PageHeader` | `src/components/PageHeader.astro` | header มี back link + title |
| `Layout` | `src/layouts/Layout.astro` | Layout พื้นฐาน มี sidebar, floating buttons (lang + dark toggle), noscript |

## รูปแบบหลัก

- Vanilla JS สำหรับ client interactivity (theme toggle, lang toggle, magnetic hover)
- `data-lang` attribute บน `<html>` สำหรับ bilingual toggle (`data-lang="en"` / `data-lang="th"`)
- CSS toggle: `[data-lang="en"] .lang-th { display:none }` และกลับกัน
- `.th.md` naming convention สำหรับ bilingual blog posts (จับคู่กับ .md หลักที่ slug เดียวกัน)
- ใช้ `marked` เรนเดอร์ markdown — highlight.js สำหรับ syntax highlighting
- หน้าคงที่ Astro HTML ล้วน — ไม่ต้องใช้ JS
- บล็อก .md คอมไพล์เป็น TS ตอน build (`scripts/build-blog-posts.mjs`)
- โหลด skeleton ด้วย CSS ล้วน (.skel class พร้อม shimmer keyframe)
- ฟอนต์ self-host พร้อม font-display:swap
- รองรับ prefers-reduced-motion ทุกแอนิเมชัน
- :focus-visible บนองค์ประกอบที่โต้ตอบได้ทั้งหมด
- ARIA landmarks บน navigation และเนื้อหาหลัก
- env(safe-area-inset-*) สำหรับอุปกรณ์แบบมีรอยบาก

## คำสั่ง

| คำสั่ง | ทำอะไร |
|---------|-------------|
| `npm run dev` | เซิร์ฟเวอร์ dev (bind 0.0.0.0 สำหรับเข้าถึงผ่าน LAN) |
| `npm run dev -- --host 127.0.0.1` | เซิร์ฟเวอร์ dev (เฉพาะ localhost) |
| `npm run build` | Build (prebuild blog index + astro build) |
| `node scripts/build-blog-posts.mjs` | สร้าง blog index ด้วยตนเอง |
| `npm run start` | เริ่ม production server |

## ตัวกระตุ้น

### "update .md"

1. อ่าน AGENTS.md ของโปรเจกต์ + สถานะ KB ปัจจุบัน
2. อัปเดต `projects/mcky.space/status.md` ด้วยการเปลี่ยนแปลงล่าสุด
3. อัปเดต `projects/mcky.space/agent.md` (routes, components, design system)
4. ถ้า AGENTS.md ของโปรเจกต์เก่า ก็อัปเดตด้วย

### "cleanup"

1. สแกนไฟล์ที่ไม่ได้ใช้ ไฟล์ว่าง exports ตายใน `src/`
2. นำผลมาเสนอให้ผู้ใช้เลือก
3. อัปเดต STATUS.md + ไฟล์ agent ของ KB
4. ห้ามลบ `.env*`, `node_modules/`, `dist/`, `.next/`, `.git/`, หรือ config ที่จำเป็น

## รายการที่ต้องทำ


## กฎ

- ให้ความสำคัญกับ reference design เมื่อมีให้
- route ใหม่ต้องตรงกับสไตล์ neobrutalism เดิม
- หน้าคงที่เป็น Astro HTML ล้วน — ไม่ต้องใช้ JS
- หน้าที่มี interaction ใช้ vanilla JS (pattern เดียวกับ theme toggle)
- บล็อกอ่านอย่างเดียว — แก้ไขผ่าน Git (.md files + rebuild)
- bilingual blog: ไฟล์ `.th.md` ต้องมี `slug` เดียวกับไฟล์ `.md` หลัก
- `npm run dev` bind `0.0.0.0` เป็นค่าเริ่มต้น (เข้าถึงผ่าน LAN) บน Termux มีการ patch os.networkInterfaces ใน astro.config.mjs เพื่อป้องกัน crash แบบ EACCES
- ห้ามรัน `npm install` ถ้า node_modules ยังครบ (android-arm64 จะทิ้งไฟล์ ESM/binding)
- ห้ามลบ `node_modules/` (มี native binding shims + ESM wrappers ที่ถูกสร้างอยู่)
- ข้ามการเทส — ไม่มีคำสั่งเทส
