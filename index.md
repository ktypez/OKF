---
okf_version: 0.1
---
# ดัชนี Workspace (Workspace Index)

## สรุป Workspace
- **Root:** `/home`
- **Sync ล่าสุด:** 2026-07-23
- **ขอบเขต:** `/home` (ตัด node_modules, .git ออก)

## รายการโปรเจกต์

| โปรเจกต์ | Profile | Agent | Status | Role | Tech Stack |
|---------|---------|-------|--------|------|------------|
| clientdata | [profile](./projects/clientdata/profile.md) | [agent](./projects/clientdata/agent.md) | [status](./projects/clientdata/status.md) | ~~archived~~ | Next.js 16, React 19, Neon PostgreSQL |
| data.mcky.space | [profile](./projects/data.mcky.space/profile.md) | [agent](./projects/data.mcky.space/agent.md) | [status](./projects/data.mcky.space/status.md) | active | Vite 8, React 19, Tailwind 4, Cloudflare D1/R2, Zustand |
| habby | [profile](./projects/habby/profile.md) | [agent](./projects/habby/agent.md) | [status](./projects/habby/status.md) | active | Vite 8, Express 5, Redis, Vitest |
| mcky.space | [profile](./projects/mcky.space/profile.md) | [agent](./projects/mcky.space/agent.md) | [status](./projects/mcky.space/status.md) | active | Astro 7, Vanilla JS, Supabase, Vercel |
| paper | [profile](./projects/paper/profile.md) | [agent](./projects/paper/agent.md) | [status](./projects/paper/status.md) | active | Vite 8, React 19, Radix UI, Tailwind 4, Cloudflare D1/R2 |
| collage | [profile](./projects/collage/profile.md) | [agent](./projects/collage/agent.md) | [status](./projects/collage/status.md) | active | Express 4, sharp, Cloudflare R2, LINE Bot SDK |
| truck | [profile](./projects/truck/profile.md) | [agent](./projects/truck/agent.md) | [status](./projects/truck/status.md) | active | React 19, Vite 8, Supabase, TanStack Query |
| writer | [profile](./projects/writer/profile.md) | [agent](./projects/writer/agent.md) | — | active | Markdown, AI agent system |

## รูปแบบ (Schema)

- **Format:** [`.opencode/rules/okf-format.md`](./.opencode/rules/okf-format.md)
- **Setup:** [`SETUP.md`](./SETUP.md) — เริ่มต้นไวสำหรับสภาพแวดล้อมใหม่

## บทบาท Agent (Agent Roles)

| โปรเจกต์ | Role | Personality |
|---------|------|-------------|
| clientdata | ~~data goblin~~ | archived |
| data.mcky.space | data goblin (stable) | — |
| habby | trophy goblin | — |
| mcky.space | terminal hipster | — |
| truck | overtime enthusiast | — |
| collage | barista engineer | — |
| paper | paper goblin | — |
| writer | word goblin | — |

## สรุปเทคโนโลยี (Technology Summary)
- **Frameworks:** React 19, Vite 8, Astro 7, Express 5, Express 4, Next.js 16
- **UI:** Tailwind 4, Radix UI, Zustand, TanStack Query
- **ฐานข้อมูล:** Supabase (PostgreSQL), Cloudflare D1, Redis
- **Storage:** Cloudflare R2, Supabase Storage
- **การเชื่อมต่อ:** LINE Platform (LIFF + Bot SDK), Vercel, Cloudflare Pages
- **ประมวลผลรูป:** Sharp
- **Testing:** Vitest
- **Tooling:** TypeScript, ESLint, Prettier, Wrangler

## ความครอบคลุมเอกสาร (Documentation Coverage)
- **Profiles:** 100%
- **Agent Context:** 100%
- **Status:** 100%

## ตัวกระตุ้น (Triggers)

| Trigger | การทำงาน | ใช้เมื่อไหร่ |
|---------|--------|------|
| `update .md` | อ่านไฟล์ KB โปรเจกต์, อัปเดต status + agent context | ทั้งหมด |
| `cleanup` | สแกน dependency/ไฟล์ที่ไม่ใช้, ตรวจสุขภาพ, อัปเดต KB | ทั้งหมด |
| `wrap-day` | อ่าน diff, อัปเดต changelog + status, commit | เฉพาะ truck |
| `check todos` | อ่าน ./TODOS.md ที่รากโปรเจกต์, แจ้งผู้ใช้เรื่องที่ค้าง | ทั้งหมด |
| `check scope` | ตรวจสอบไฟล์ OKF ทั้งหมดว่าเกิน scope budget หรือไม่, แจ้งเตือนถ้าเกิน | ทั้งหมด |

## การเข้าถึง KB

KB ถูก maintain โดยการอ่านและเขียนไฟล์ `.md` โดยตรง — source of truth คือไฟล์ markdown ไม่มี tooling layer คั่นกลาง

## ไฟล์ระบบ (System Files)
- [Setup](./SETUP.md) — เริ่มต้นไวสำหรับสภาพแวดล้อมใหม่
- [Conventions](./system/conventions.md) — โปรไฟล์ผู้ใช้, ตั้งค่า Termux, กฎการสื่อสาร, Universal Prompt
- [Glossary](./system/glossary.md) — ศัพท์เทคนิค
- [Personalities](./system/personalities.md) — บุคลิกภาพ agent / คราวก๊อบลิน
- [Sync Log](./system/sync-log.md) — ประวัติการเปลี่ยนแปลง

## Cross-links

- [Clientdata](projects/clientdata/profile.md)
- [Collage](projects/collage/profile.md)
- [data.mcky.space](projects/data.mcky.space/profile.md)
- [Habby](projects/habby/profile.md)
- [mcky.space](projects/mcky.space/profile.md)
- [Paper](projects/paper/profile.md)
- [Truck](projects/truck/profile.md)
- [Writer](projects/writer/profile.md)
- [Workspace Conventions](system/conventions.md)
- [Glossary](system/glossary.md)
- [Personalities](system/personalities.md)
