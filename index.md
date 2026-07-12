---
type: workspace-index
id: okf-index
last_updated: 2026-07-12
---

# ดัชนี Workspace (Workspace Index)

## สรุป Workspace
- **Root:** `/home`
- **Sync ล่าสุด:** 2026-07-11 00:00 UTC
- **ขอบเขต:** `/home` (ตัด node_modules, .git ออก)

## รายการโปรเจกต์

| โปรเจกต์ | Profile | Agent | Status | Role | Tech Stack |
|---------|---------|-------|--------|------|------------|
| clientdata | [profile](./projects/clientdata/profile.md) | [agent](./projects/clientdata/agent.md) | [status](./projects/clientdata/status.md) | experimental | Next.js 16, React 19, Neon, Drizzle |
| data.mcky.space | [profile](./projects/data.mcky.space/profile.md) | [agent](./projects/data.mcky.space/agent.md) | [status](./projects/data.mcky.space/status.md) | active | Vite 7, React 19, Neon, Drizzle |
| habby | [profile](./projects/habby/profile.md) | [agent](./projects/habby/agent.md) | [status](./projects/habby/status.md) | active | Vite 6, Express, Redis |
| mcky.space | [profile](./projects/mcky.space/profile.md) | [agent](./projects/mcky.space/agent.md) | [status](./projects/mcky.space/status.md) | active | Astro 7, Alpine.js, Supabase |
| receipts-dms | [profile](./projects/receipts-dms/profile.md) | [agent](./projects/receipts-dms/knowledge/NODE-002.md) | [status](./projects/receipts-dms/status.md) | active | Vite 6, React 19, Cloudflare D1/R2 |
| collage | [profile](./projects/collage/profile.md) | [agent](./projects/collage/agent.md) | [status](./projects/collage/status.md) | active | Express 4, sharp, LINE LIFF |
| truck | [profile](./projects/truck/profile.md) | [agent](./projects/truck/agent.md) | [status](./projects/truck/status.md) | active | React 19, Vite 8, Supabase |
| writer | [profile](./projects/writer/profile.md) | [agent](./projects/writer/agent.md) | — | global | Markdown, AI agent system |

## รูปแบบ (Schema)

- **Format:** [`.opencode/rules/okf-format.md`](./.opencode/rules/okf-format.md)
- **Setup:** [`SETUP.md`](./SETUP.md) — เริ่มต้นไวสำหรับสภาพแวดล้อมใหม่

## บทบาท Agent (Agent Roles)

| โปรเจกต์ | Role | Personality |
|---------|------|-------------|
| clientdata | data goblin (experimental) | — |
| data.mcky.space | data goblin (stable) | — |
| habby | trophy goblin | — |
| mcky.space | terminal hipster | — |
| truck | overtime enthusiast | — |
| collage | barista engineer | — |
| receipts-dms | paper goblin | — |
| writer | word goblin | — |

## สรุปเทคโนโลยี (Technology Summary)
- **Frameworks:** Next.js, React, Astro, Express, Vite
- **ฐานข้อมูล:** Supabase (PostgreSQL), Neon (PostgreSQL), Redis (Upstash), Cloudflare D1
- **การเชื่อมต่อ:** LINE Platform (LIFF + Bot SDK), Telegram Bot API
- **ประมวลผลรูป:** Sharp, WebP (Canvas API)
- **Storage:** Cloudflare R2

## ความครอบคลุมเอกสาร (Documentation Coverage)
- **Profiles:** 100%
- **Agent Context:** 100%
- **Structure:** 100%
- **Dependencies:** 100%
- **Commands:** 100%
- **Status:** 100%
- **Knowledge Nodes:** 122

## ตัวกระตุ้น (Triggers)

| Trigger | การทำงาน | ใช้เมื่อไหร่ |
|---------|--------|------|
| `update .md` | อ่านไฟล์ KB โปรเจกต์, อัปเดต status + agent context | ทั้งหมด |
| `cleanup` | สแกน dependency/ไฟล์ที่ไม่ใช้, ตรวจสุขภาพ, อัปเดต KB | ทั้งหมด |
| `wrap-day` | อ่าน diff, อัปเดต changelog + status, commit | เฉพาะ truck |
| `doctor-kb` | ตรวจวงจรชีวิตความรู้ — stale, expired | ทั้งหมด |
| `backfill` | หว่าน KB จากประวัติ git + โครงสร้างโค้ด | ตามโปรเจกต์ |
| `check todos` | อ่าน ./TODOS.md ที่รากโปรเจกต์, แจ้งผู้ใช้เรื่องที่ค้าง | ทั้งหมด |

## สคริปต์ (Scripts)

| สคริปต์ | ใช้งาน |
|--------|---------|
| `scripts/doctor-kb.js` | ตรวจวงจรชีวิตความรู้ |
| `scripts/backfill.js` | หว่าน KB จาก git/code/docs |
| `scripts/build-graph.js` | สร้าง graph.json จากไฟล์ KB |
| `scripts/dispatch.js` | แสดงงานค้างข้ามโปรเจกต์ |
| `scripts/claim-task.js` | Claim งานแบบ atomically |
| `scripts/complete-task.js` | ปิดงาน + บันทึกบทเรียน |
| `scripts/build-dashboard.js` | สร้าง HTML dashboard |

## เครื่องมือ MCP (MCP Tools)

Local MCP server ที่ `~/OKF/mcp-server/` ใช้เครื่องมือเหล่านี้เพื่อ query และจัดการ KB

| เครื่องมือ | คำอธิบาย |
|------|-------------|
| `okf_list_projects` | แสดงโปรเจกต์ทั้งหมดพร้อมจำนวนไฟล์ |
| `okf_get_project` | ดึง profile + agent + status ของโปรเจกต์ |
| `okf_query_nodes` | กรอง node ตาม type/status/project |
| `okf_get_node` | อ่าน node เดียวตาม ID (frontmatter + body) |
| `okf_search` | ค้นหาเต็มข้อความข้ามไฟล์ .md ทั้งหมด |
| `okf_get_file` | เนื้อหาดิบของไฟล์ OKF ใดก็ได้ |
| `okf_create_node` | สร้าง node พร้อม ID อัตโนมัติ |
| `okf_update_node` | อัปเดตฟิลด์ frontmatter และ/หรือ body |
| `okf_update_status` | ตั้งสถานะวงจรชีวิตให้ node |
| `okf_add_edge` | เพิ่มลิงก์แบบมีประเภทระหว่าง 2 node |
| `okf_doctor` | รันการตรวจวงจรชีวิต (stale, expired, superseded) |
| `okf_list_dir` | แสดงโครงสร้างไดเรกทอรี OKF |

## ไฟล์ระบบ (System Files)
- [Conventions](./system/conventions.md) — โปรไฟล์ผู้ใช้, ตั้งค่า Termux, กฎการสื่อสาร
- [Workspace](./system/workspace.md) — เปรียบเทียบข้ามโปรเจกต์, คำสั่ง dev
- [Inventory](./system/inventory.md) — ค้นพบโปรเจกต์, ตัวกระตุ้นงาน
- [Glossary](./system/glossary.md) — ศัพท์เทคนิค
- [Personalities](./system/personalities.md) — บุคลิกภาพ agent / คราวก๊อบลิน
- [Sync Log](./system/sync-log.md) — ประวัติการเปลี่ยนแปลง
- [TODOs Convention](./system/TODOS.md) — กระบวนการ TODOs + ตรวจสอบตอนเริ่ม (global)
