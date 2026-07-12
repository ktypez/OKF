---
type: agent-profile
id: mcky-agent
project: mcky.space
last_updated: '2026-07-12'
personality: terminal hipster
status_ref: ./status.md
status: active
freshness: '2026-07-12'
verified: 2026-07-05T00:00:00.000Z
expires: null
superseded_by: null
anchors: []
links:
  - type: relates-to
    target: mcky-space-profile
  - type: relates-to
    target: mcky-status
  - type: relates-to
    target: mcky-structure
  - type: relates-to
    target: mcky-commands
  - type: relates-to
    target: workspace
---

# เอเจนต์ mcky.space

## ภาพรวม

เว็บไซต์ส่วนตัวสไตล์ terminal ดีไซน์ neobrutalism แบบ responsive (320px–1440px+), มี interactivity จาก Alpine.js และใช้ Astro 7 แบบ server output ไม่มี auth

## บุคลิก

- **Role:** terminal hipster
- ขับเคลื่อนด้วยความสวยงาม แบบ minimal ชอบ terminal ให้ความสำคัญกับ neobrutalism ฟอนต์ monospace และการทำ interaction ด้วย CSS ล้วน ๆ ให้ความเคารพ reference design มากที่สุด

## สแต็ก

| เลเยอร์ | เทคโนโลยี |
|-------|------|
| Framework | Astro 7.0.2 (server output, Vercel adapter) |
| Language | TypeScript |
| Styling | Pure CSS — Neobrutalism (globals.css, no Tailwind) |
| Font | JetBrains Mono (self-hosted WOFF2 variable font) |
| Database | Supabase (auth) |
| Blog | .md files compiled to TS at build time |
| Client UI | Alpine.js via CDN |
| Markdown | `marked` |
| Auth | None (removed) |
| Deployment | Vercel with cache + security headers |

## สถาปัตยกรรม

| เส้นทาง | รายละเอียด |
|-------|-------------|
| `/` | หน้าแรกสไตล์ terminal — neo-card พร้อม terminal sim, แท็ก tech stack, รายการบล็อกย่อย |
| `/about` | หน้า About — neo-cards สำหรับ bio, stack badges, contact |
| `/blog` | รายการบล็อก — neo-card ต่อโพสต์ แสดงวันที่แบบ badge, สถานะว่าง |
| `/blog/[slug]` | โพสต์บล็อก — เนื้อหาสไตล์ neo มี nav ย้อน/ถัดไป |
| `/projects` | แกลลอรี่โปรเจกต์ — neo-cards พร้อมแท็กสี, สถานะว่าง |
| `/404` | หน้า 404 สไตล์ มี terminal prompt |

### คอมโพเนนต์

| คอมโพเนนต์ | ไฟล์ | หมายเหตุ |
|-----------|------|-------|
| `PageHeader` | `src/components/PageHeader.astro` | หัวข้อหน้าที่นำมาใช้ซ้ำได้ พร้อม back link + title |
| `TerminalLine` | `src/components/TerminalLine.astro` | บรรทัด terminal prompt ที่นำมาใช้ซ้ำได้ |
| `Layout` | `src/layouts/Layout.astro` | Layout พื้นฐาน มี sidebar, noscript, ปุ่มสลับ theme |

## รูปแบบหลัก

- ใช้ Alpine.js x-data + x-init สำหรับ interactivity ฝั่ง client (ไม่มี bundle React)
- ใช้ `marked` เรนเดอร์ markdown แบบเบา ๆ (ไม่พึ่งพา React)
- หน้าคงที่ Astro สำหรับเนื้อหาที่ไม่ต้องมี interaction
- บล็อก .md คอมไพล์เป็น TS ตอน build (ไม่เข้าถึง filesystem ตอน runtime)
- โหลด skeleton ด้วย CSS ล้วน (.skel class พร้อม shimmer keyframe)
- ฟอนต์แบบ self-host พร้อม font-display:swap (ไม่ใช้ CDN ภายนอก)
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

Query KB ตอนเริ่มทำงาน: `okf_query_nodes project:mcky.space type:document status:active` — node ใดที่มีรายการเช็กลิสต์ `- [ ]` ถือเป็น TODO ที่ค้างอยู่ แจ้งผู้ใช้แล้วถามความต้องการ ดูเพิ่มเติมที่ `system/TODOS.md`

## กฎ

- ให้ความสำคัญกับ reference design เมื่อมีให้
- route ใหม่ต้องตรงกับสไตล์ neobrutalism เดิม
- หน้าคงที่เป็น Astro HTML ล้วน — ไม่ต้องใช้ JS
- หน้าที่มี interaction ใช้ Alpine.js x-data directives แบบ inline ในเทมเพลต .astro
- บล็อกอ่านอย่างเดียว — แก้ไขผ่าน Git (.md files + rebuild)
- ไม่มี external API calls ไม่มี database (ยกเว้น Supabase สำหรับ auth)
- `npm run dev` bind `0.0.0.0` เป็นค่าเริ่มต้น (เข้าถึงผ่าน LAN) บน Termux มีการ patch os.networkInterfaces ใน astro.config.mjs เพื่อป้องกัน crash แบบ EACCES
- ห้ามรัน `npm install` ถ้า node_modules ยังครบ (android-arm64 จะทิ้งไฟล์ ESM/binding)
- ห้ามลบ `node_modules/` (มี native binding shims + ESM wrappers ที่ถูกสร้างอยู่)
- Shiki/mcky.space RSK-001 แก้ไขแล้ว — สลับไปใช้ Prism สำหรับ syntax highlight, manual rolldown binding, unstorage ESM wrappers
- ถ้าสร้าง node_modules ใหม่ทั้งหมด ให้ใช้ manual fixes ซ้ำ: `npm install @rolldown/binding-linux-arm64-gnu@1.1.2` แล้วสร้าง unstorage ESM wrappers ใหม่
- ข้ามการเทส — ไม่มีคำสั่งเทส
