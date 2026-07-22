---
type: project-profile
id: mcky-space-profile
project: mcky.space
last_updated: 2026-07-22
status: active
stack:
  language: JavaScript
  framework: Astro 7
  ui: Vanilla CSS
  database: Supabase (PostgreSQL, not actively used)
  storage: Supabase Storage
  state: none
  auth: SHA-256 header-based
  testing: none
  deployment: Vercel
  ci: none
agent_personality: terminal hipster
links:
  agent: mcky-space-agent
  status: mcky-space-status
---

## ข้อมูลตัวตน
- **Name:** mcky.space
- **Display Name:** mcky.space
- **Description:** เว็บไซต์ส่วนตัวสไตล์ terminal
- **Purpose:** Portfolio และบล็อกส่วนตัว
- **Repository:** mcky.space
- **Owner:** ktypez (https://github.com/ktypez/mcky.space)

## เทคโนโลยี
- **Languages:** TypeScript, JavaScript
- **Frameworks:** Astro 7
- **Runtime:** Node.js
- **Package Manager:** npm
- **Build System:** Astro build
- **Deployment Targets:** Vercel

## Dependencies

| Package | Version | Type |
|---------|---------|------|
| `astro` | ^7.0.2 | production |
| `@supabase/supabase-js` | ^2.108.2 | production |
| `marked` | ^18.0.5 | production |
| `@astrojs/vercel` | ^11.0.0 | production |
| `highlight.js` | ^11.11.1 | production |
| `marked-highlight` | ^2.2.4 | production |
| `prismjs` | ^1.30.0 | production |
| `typescript` | ^5 | dev |
| `@types/node` | ^20 | dev |

## Development

| Command | Description |
|---------|-------------|
| `npm run dev` | เริ่ม Astro dev server |
| `npm run build` | build เว็บไซต์ Astro |
| `npm run build-blog` | สร้างโพสต์บล็อกด้วยตนเอง |
| `npm run start` | เริ่ม Astro production server |
| `npm run preview` | ดูตัวอย่าง production build |

## Architecture

```
src/
├── pages/        # route definitions
├── components/   # Astro components
├── layouts/      # page layouts
├── lib/          # helper functions (posts.ts)
├── api/          # empty (routes removed)
└── data/         # static data files (blog/)
public/           # static assets (fonts, etc.)
scripts/          # build scripts (build-blog-posts.mjs)
```

**Key files:** `astro.config.mjs`, `setup.sql`, `vercel.json`

## Changelog

### 2026-07-17
- **blog**: เขียนโพสต์ "Building Collage: A Small Adventure"
- **bilingual blog**: รองรับ `.th.md` — จับคู่ภาษาไทยกับอังกฤษผ่าน slug เดียวกัน
- **lang toggle**: ปุ่ม EN/TH ที่มุมล่างขวา ใช้ `data-lang` attribute + vanilla JS (ไม่พึ่ง Alpine store)
- **lang toggle CSS**: ย้ายไป `globals.css` แก้ปัญหา Astro scoped CSS
- **lang toggle visibility**: แสดงเฉพาะหน้า `/blog` และ `/blog/*`
- **floating buttons**: ย้ายจาก bottom-right → top-right → กลับ bottom-right (หลัง user feedback)
- **build script**: `build-blog-posts.mjs` รองรับ `.th.md` pairing, Post interface เพิ่ม `bodyTh` + `lang`

### 2026-07-13
- **KB refresh**: แก้ไข frontmatter ซ้ำซ้อน, อัปเดต timestamps
- Sync OKF knowledge base across all 8 projects
- Updated workspace index with current project inventory
- Refreshed documentation timestamps and freshness

### 2026-07-11
- refactor: นำ API routes ออก, อัปเดตบล็อก, ทำความสะอาด gitignore
- fix: สภาพแวดล้อม dev ท้องถิ่น — prism syntax highlighting, patch os.networkInterfaces, LAN access (host 0.0.0.0)
- homepage: ย้ายบล็อกไปยัง blog.txt section ของตัวเอง, แสดงโพสต์เป็นรายการย่อยใต้ลิงก์บล็อก
- homepage tags: ข้อความสีขาวบน neo-tag ทั้ง 4

### 2026-07-08
- นำ route `/api/auth` และ `/api/habits/*` ที่ไม่ได้ใช้ทิ้ง
- แก้ XSS + CSP + Prism syntax highlighting + แก้ไขเนื้อหา

### Earlier
- แก้ RSK-001 แล้ว (สลับ shiki → prism)
- เปิดใช้ LAN access, patch Termux ESM binding
- นำ auth ออกทั้งหมด, รีเฟรช dark mode (navy → deep grey)
- ส่วนบล็อกบนหน้าแรก, ดีไซน์สไตล์ terminal

## การออกแบบ

- Neobrutalism — เส้นขอบ 3px, เงา offset แข็ง, สีสันสดใส
- shimmer skeletons ด้วย CSS ล้วนสำหรับสถานะโหลด
- JetBrains Mono ตลอดทั้งเว็บ
- ARIA landmarks, safe-area-insets, `prefers-reduced-motion`
- Bilingual toggle: `[data-lang="en"] .lang-th { display:none }` และกลับกัน
