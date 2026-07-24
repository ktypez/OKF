---
type: project-status
id: truck-status
project: truck
last_updated: '2026-07-24'
status: active
links:
  profile: truck-profile
  agent: truck-agent
title: สถานะโปรเจกต์ — Truck
description: ''
tags:
  - truck
  - react
  - supabase
  - status
timestamp: 'Tue Jul 21 2026 00:00:00 GMT+0000 (Coordinated Universal Time)T12:00:00Z'
---

# สถานะโปรเจกต์ — Truck

## Changelog

### 2026-07-24 (transition fix)
- **Fix**: ย้าย `<Suspense>` เข้าไปใน `<motion.div>` แทนครอบ `<AnimatePresence>` — แก้ admin page blank แรกเข้า (lazy import discard animation tree + AdminGuard state)
- **Fix**: เอา `mode="wait"` ออกจาก AnimatePresence — mount หน้าใหม่ทันที ไม่รอ exit animation
- **Fix**: เอา `location` prop ออกจาก `<Routes>` — ใช้ context auto แทน (ป้องกัน RRv7 edge case)
- **Fix**: AdminGuard เปลี่ยน `sb.auth.getUser()` → `sb.auth.getSession()` เพื่อเลี่ยง race condition ที่ต้องเข้าซ้ำๆ หน้า admin ถึงจะแสดง
- **Fix**: เพิ่ม loading state ใน AdminGuard แทน `return null` — ผู้ใช้เห็น Loading card ขณะตรวจสอบสิทธิ์ admin

### 2026-07-17 (animations)
- **Animation**: เพิ่ม motion (Framer Motion) สำหรับ route transitions — `<AnimatePresence mode="wait">` + `<motion.div>` fade+slide (0.2s, custom easing)
- **Animation**: เพิ่ม exit animations สำหรับ modals ทั้งหมด — backdrop fade out + content scale down (0.18s) ใน ModalWrapper, ConfirmModal, Modals (theme picker), ShiftModal, MonthYearPopup
- **Animation**: เพิ่ม toast exit animation — slide right + fade out (0.25s) ผ่าน `<AnimatePresence>` ใน ToastContext
- **Animation**: เพิ่ม `whileTap={{ scale: 0.9 }}` บน NavTabs ปุ่ม
- **Cleanup**: เอา CSS animations (fadeIn, scaleIn, slideIn, slideOut) ออกจาก globals.css สำหรับ modals/toasts ที่ motion จัดการแล้ว
- **Fix**: เอา pnpm-lock.yaml ออกจาก git (Vercel detect แล้วใช้ pnpm แทน npm)
- **Fix**: ย้าย `@rolldown/binding-linux-arm64-gnu` ไป optionalDependencies (ARM64-only dep ไม่ fail บน x64)

### 2026-07-13 (perf + refactor)
- **Loading/Perf**: แตก themes.css (16 ธีม ~36KB) → ไฟล์ต่อธีม โหลด dynamic เฉพาะธีมที่ใช้ (ลด dead CSS ~94%)
- **Loading/Perf**: CalendarGrid ย้าย inline styles → CSS classes + memoize cells; DateSlider scrollIntoView behavior auto (เลิก smooth)
- **Bandwidth**: ShiftCalendar ตัด query yearly-logs → yearly-leave-counts (เลือกเฉพาะ leave_type)
- **Memory**: แก้ retryTimer leak ใน offlineQueue (module singleton → Map ราย user + clearRetryTimer ตอน logout)
- **Refactor**: แตก calculateIncome (170+ บรรทัด) → aggregate/calcPartTime/calcFullTime/buildResult/finalize
- **Bandwidth**: recompress background images ด้วย cwebp q82 ย่อเหลือ 1200×1400 — รวม 976KB → 412KB (~58%) ยังชัดเท่าเดิม
- **Caching**: vercel.json ตั้ง Cache-Control max-age 7 วัน + must-revalidate สำหรับ /files/*.webp
- Tests: calculator 23/23, offlineQueue 40/40, shift-helpers 20/20 ผ่าน; tsc clean

### 2026-07-13 (KB)
- **KB refresh**: อัปเดต dependencies (ลบ vite-plugin-pwa), อัปเดต test count (101 tests), แก้ไข frontmatter ซ้ำซ้อน
- Sync OKF knowledge base across all 8 projects
- Updated workspace index with current project inventory
- Refreshed documentation timestamps and freshness

### 2026-07-11
- ลบ PWA ทั้งหมด: ลบ vite-plugin-pwa, sw.js, SwUpdateToast, public/icons/
- เพิ่ม SVG truck favicon (public/favicon.svg)
- แทนที่ motorbike favicon ด้วย truck SVG (หัวรถ + หลังคาโหลด + ล้อ)

### 2026-07-08
- wrap-day: changelog + อัปเดตสถานะสำหรับ 8 กรกฎาคม
- คุณภาพโค้ด: typed interfaces, ลบ eslint-disable blocks, ตรวจสอบ env var, async cancellation flags
- ทำความสะอาด gitignore
- Admin user card: ลบ type badge, เรียง type + reset ซ้อนกัน
- แก้ไข: เงินวันหยุดถูกนับเป็นเงินเดือน (incomeBase), ช่วงสัปดาห์ จ.-อา.

### 2026-07-06
- Auth modal overlay (ModalWrapper) — สกัดการนำทางเมื่อ session หมดอายุ

## การออกแบบ (Design)

- 16 themes พร้อมพื้นหลังไล่ระดับ + ลวดลาย SVG noise
- ตัวแปร Neobrutalist (เงาแข็ง ขอบหนา)
- เอฟเฟกต์แก้วสำหรับธีม shinchan
- CSS custom properties ด้วยสเกล `--space-*` (2px ถึง 30px)
- `toBuddhistYear()` สำหรับแสดงปฏิทินไทย
- Motion animations — fade/slide/scale ด้วย custom easing `[0.16, 1, 0.3, 1]`

## ปัญหาที่ทราบ (Known Issues)

- ต้อง reauthentication ก่อน `sb.auth.updateUser()`
- Mutation invalidation: การ save ที่ mutates `logs` ต้อง invalidate ทั้งหมดของ: `monthly-logs`, `yearly-logs`, `income`
- Avatar upload: Supabase Storage `avatars/{userId}/avatar.{ext}`, ≤2MB
- ห้ามใช้ `@ts-ignore` หรือ `@ts-expect-error` (ใช้ `as Record<string, any>` แทน)

## MCP Auto Sync Log

- 2026-07-23T13:50:54.190Z — f1c6130: test: mcp-kb post-commit hook test
- 2026-07-24T05:21:23.307Z — 7da45ac: fix: AdminGuard ใช้ getSession แทน getUser + เพิ่ม loading state แก้ต้องเข้าซ้ำๆ หน้า admin ถึงแสดง
- 2026-07-24T05:25:00.000Z — kb-sync: อัปเดต changelog หลัง fix admin guard
- 2026-07-24T05:38:01.772Z — f946f64: fix: AdminGuard เพิ่ม retry + error state + logError — แก้ redirect เงียบกรณี query ล้มเหลวชั่วคราว
- 2026-07-24T05:53:14.935Z — cf79c56: fix: move Suspense inside AnimatePresence — แก้ admin page blank แรกเข้า
