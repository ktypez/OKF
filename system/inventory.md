---
type: system-doc
id: inventory
last_updated: 2026-07-12
---

# รายการโปรเจกต์ (Inventory)

## ตัวกระตุ้นงาน (Task Triggers)

| Trigger | คำอธิบาย | โปรเจกต์ |
|---------|-------------|----------|
| `update .md` | อ่านสถานะ KB + ไฟล์ agent แล้วอัปเดตด้วยสถานะโปรเจกต์ล่าสุด | ทั้งหมด |
| `cleanup` | สแกน dependency/ไฟล์ที่ไม่ใช้, ตรวจสุขภาพ, นำเสนอผล, อัปเดต KB | ทั้งหมด |
| `wrap-day` | ทบทวน diff วันนี้, เขียน changelog, อัปเดตสถานะ truck, commit | truck |
| `blog-post` | เขียน blog post — ฟิลเตอร์ชื่อโปรเจกต์ภายใน, เผยแพร่ที่ mcky.space (`src/data/blog/`) | mcky.space |
| `write-readme` | เขียน README.md ให้ repo ใดก็ได้ — ฟิลเตอร์ชื่อโปรเจกต์ภายใน | ทั้งหมด |

### update .md

1. อ่านไฟล์ KB ของโปรเจกต์ใน `~/OKF/projects/<project>/`
2. อ่านไฟล์ source เพื่อหาการเปลี่ยนแปลง (components, routes, data flow)
3. อัปเดต `status.md` ด้วยสถานะล่าสุด
4. อัปเดต `agent.md` ถ้าเกิด pattern ใหม่
5. ถ้า `AGENTS.md` ของโปรเจกต์เก่าไป ก็อัปเดตตามด้วย

### cleanup

1. สแกน import ที่ไม่ใช้, ไฟล์ว่าง, export ตาย
2. ถ้ามี: รัน lint + typecheck
3. นำเสนอผลให้ผู้ใช้เลือก
4. อัปเดตไฟล์ KB
5. ห้ามแตะ `.env*`, `node_modules/`, `dist/`, `.next/`, `.git/`, หรือ config หลัก

### write-readme

1. ใช้กฎฟิลเตอร์เหมือน `blog-post` — แทนชื่อโปรเจกต์ภายใน (clientdata, habby, truck) ด้วยคำอธิบายทั่วไป
2. กระชับ — overview, stack, setup, links
3. ไม่ต้องมี frontmatter (plain markdown)

### blog-post

1. เขียนเนื้อหา post
2. **ฟิลเตอร์ชื่อโปรเจกต์ภายใน** — แทน clientdata, habby, truck และตัวระบุเฉพาะโปรเจกต์ด้วยคำอธิบายทั่วไป ("a project", "another project" ฯลฯ)
3. บันทึกลง `mcky.space/src/data/blog/<slug>.md` พร้อม frontmatter (title, date, slug)
4. สร้าง blog index ใหม่: `node scripts/build-blog-posts.mjs`
5. ตรวจสอบ build ผ่าน

### wrap-day (เฉพาะ truck)

1. อ่าน `git diff` + `Changelog.tsx`
2. เพิ่ม entry `vYYYY.MM.DD` พร้อมสรุปภาษาไทย
3. อัปเดต `status.md`
4. `git add` + commit `"docs: wrap-day YYYY-MM-DD"`

## อ้างอิง AGENTS.md

แต่ละโปรเจกต์รากมี `AGENTS.md` บางคราวกับ 2 หมวด:

- `## KB` — ลิงก์ไปไฟล์ KB ของโปรเจกต์ใน `~/OKF/projects/<project>/`
- `## Local` — บันทึกเฉพาะโปรเจกต์ (env files, ทริคสถานะ)

บริบททั้งหมดอยู่ใน OKF นี้ ไม่ซ้ำซ้อน
