---
title: Dependencies
description: project-dependencies from receipts-dms
---

# Dependencies

## Runtime

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.7 | UI framework |
| react-dom | ^19.2.7 | DOM renderer |
| react-router | ^7.18.1 | Client routing |
| @radix-ui/react-dialog | ^1.1.19 | Modal dialogs |
| @radix-ui/react-dropdown-menu | ^2.1.20 | Dropdown menus |
| @radix-ui/react-label | ^2.1.11 | Form labels |
| @radix-ui/react-progress | ^1.1.12 | Upload progress bar |
| @radix-ui/react-select | ^2.3.3 | Category select |
| @radix-ui/react-separator | ^1.1.11 | Visual separators |
| @radix-ui/react-slot | ^1.3.0 | Slot/as-child pattern |
| @radix-ui/react-tooltip | ^1.2.12 | Tooltips |
| class-variance-authority | ^0.7.1 | shadcn/ui utility |
| clsx | ^2.1.1 | Class name merging |
| cookie | ^1.1.1 | Cookie parsing |
| lucide-react | ^1.24.0 | Icons |
| sonner | ^2.0.7 | Toast notifications |
| tailwind-merge | ^3.6.0 | Tailwind class merging |

## Dev

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^6.4.3 | Build tool |
| @vitejs/plugin-react | ^5.2.0 | React plugin for Vite |
| typescript | ^7.0.2 | Type checking |
| tailwindcss | ^3.4.19 | CSS framework |
| postcss | ^8.5.16 | CSS processing |
| autoprefixer | ^10.5.2 | CSS vendor prefixes |
| @types/react | ^19.2.17 | React types |
| @types/react-dom | ^19.2.3 | React DOM types |

## Cloudflare

| Service | Binding | Purpose |
|---------|---------|---------|
| D1 | `receipts_db` | SQL database (receipts, categories) |
| R2 | `BUCKET` | File storage (receipt images) |

## External

| Service | Purpose |
|---------|---------|
| Cloudflare Pages | Hosting + Functions runtime |
| paper.mcky.space | Custom domain |
