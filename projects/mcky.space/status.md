---
type: project-status
id: mcky-space-status
project: mcky.space
last_updated: 2026-07-22
status: active
links:
  profile: mcky-space-profile
  agent: mcky-space-agent
---

## เส้นทาง

| Path | Page |
|------|------|
| `/` | หน้าแรกสไตล์ terminal พร้อมส่วนบล็อก |
| `/about` | หน้า About |
| `/blog` | รายการบล็อก |
| `/blog/[slug]` | โพสต์บล็อก (รองรับ bilingual EN/TH) |
| `/projects` | แกลลอรี่โปรเจกต์ |
| `/404` | หน้า 404 |

## บันทึกการเปลี่ยนแปลง

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
