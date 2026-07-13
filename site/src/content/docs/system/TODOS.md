---
title: กระบวนการ TODOs (TODOs Convention)
description: OKF knowledge base
---

# กระบวนการ TODOs (TODOs Convention)

TODO ระดับโปรเจกต์อยู่ใน KB ของแต่ละโปรเจกต์ (`projects/<project>/knowledge/`) เป็น node ประเภท `document` ที่มีเนื้อหาแบบ checklist ถูกค้นพบทุกครั้งที่เริ่ม session

## TODOs ทำงานยังไง

- แต่ละ TODO คือ KB node ที่มี `type: document`, `status: active` และ body ที่มี `- [ ]` อย่างน้อยหนึ่งรายการ
- Agent profile ของโปรเจกต์ (`agent.md`) ลิงก์ไปยัง TODO node ใน KB
- ไม่มีไฟล์ `TODOS.md` เดี่ยวในรากโปรเจกต์ — ทุกอย่างอยู่ใน KB graph

## การตรวจสอบตอนเริ่ม (GLOBAL)

Agent **ต้อง** รันสิ่งนี้ในทุก session ใหม่ ก่อนเริ่มงานใดๆ:

1. เช็ค `./TODOS.md` ที่รากโปรเจกต์ถ้ามี (รองรับแบบเก่า)
2. Query KB: `okf_query_nodes project:<project> type:document status:active`
3. กรองผล: node ใดที่ body มี `- [ ]` คือ TODO
4. แจ้งผู้ใช้: "Open TODOs: N items — <titles>"
5. ถาม: ทำ TODO หรือดำเนินเรื่องที่ขอมาต่อ

## agent.md ระดับโปรเจกต์

`agent.md` ของแต่ละโปรเจกต์ควรมีหมวด `## TODOs`:
- ระบุ TODO node ID ของโปรเจกต์ (เช่น DOC-002, DOC-003)
- อธิบายขั้นตอนการตรวจสอบตอนเริ่ม
- ลิงก์ไปยังเอกสารระบบนี้ (`todos-convention`)
