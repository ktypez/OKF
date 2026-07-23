---
type: system-doc
id: todos-convention
last_updated: 2026-07-21T00:00:00.000Z
title: กระบวนการ TODOs (TODOs Convention)
description: ''
tags:
  - okf
  - workspace
  - convention
  - TODOS
timestamp: Tue Jul 21 2026 00:00:00 GMT+0000 (Coordinated Universal Time)T12:00:00Z
---

# กระบวนการ TODOs (TODOs Convention)

TODO ระดับโปรเจกต์อยู่ใน `TODOS.md` ที่รากโปรเจกต์ (`~/<project>/TODOS.md`)

## TODOs ทำงานยังไง

- แต่ละ TODO คือ checklist item (`- [ ]`) ใน `TODOS.md`
- Agent profile ของโปรเจกต์ (`agent.md`) อธิบายขั้นตอนการตรวจสอบ

## การตรวจสอบตอนเริ่ม (GLOBAL)

Agent **ต้อง** รันสิ่งนี้ในทุก session ใหม่ ก่อนเริ่มงานใดๆ:

1. เช็ค `./TODOS.md` ที่รากโปรเจกต์ถ้ามี
2. ถ้ามี: อ่านและแจ้งผู้ใช้ "Open TODOs: N items"
3. ถาม: ทำ TODO หรือดำเนินเรื่องที่ขอมาต่อ

## agent.md ระดับโปรเจกต์

`agent.md` ของแต่ละโปรเจกต์ควรมีหมวด `## TODOs`:
- อธิบายขั้นตอนการตรวจสอบตอนเริ่ม
- ลิงก์ไปยังเอกสารระบบนี้ (`todos-convention`)
