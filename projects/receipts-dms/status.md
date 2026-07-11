---
type: project-status
id: receipts-dms-status
project: receipts-dms
last_updated: 2026-07-11
status: active
anchors:
  - /home/paper/receipts-dms/
---

# Status

**Role:** production
**Deployment:** Cloudflare Pages (paper.mcky.space)
**Last deploy:** 2026-07-10

## Features

- [x] Upload with image compression (WebP 2048px / 80%)
- [x] XHR upload progress bar
- [x] Receipt list (table + card view toggle)
- [x] Receipt detail (preview, lightbox, edit filename/category/notes)
- [x] Category CRUD (card-based, collapsible edit)
- [x] Full-text search (filename + notes)
- [x] Category filter
- [x] Pagination (20 per page)
- [x] Notes (upload textarea, display, edit)
- [x] Single-password auth (HMAC cookie)
- [x] Dark/light theme toggle
- [x] Storage stats (receipt count + total size)
- [x] Bottom nav (mobile) + sidebar (desktop)
- [x] Thai language UI labels
- [x] Responsive design

## Removed

- Tags system (was added and fully removed)
- File extension display (hidden via `stripExtension`)
- Action column in table view

## Database

```sql
receipts: id, filename, category, content_type, size, uploaded_at, notes
categories: id, name, created_at
```

## Routes

| Path | Page |
|------|------|
| `/` | Dashboard |
| `/receipts` | Receipt list |
| `/receipts/:id` | Receipt detail |
| `/upload` | Upload |
| `/categories` | Category management |
| `/settings` | Settings |
| `/login` | Login (no auth required) |
