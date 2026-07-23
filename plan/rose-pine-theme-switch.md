---
type: Plan
id: plan-rose-pine-theme-switch
version: 4
status: superseded
created: 2026-07-09T00:00:00.000Z
updated: 2026-07-13T00:00:00.000Z
superseded-by: expo-theme
title: 'Plan: Rose Pine Theme Switch'
description: ''
tags:
  - plan
  - rose-pine-theme-switch
timestamp: '2026-07-23T12:00:00Z'
---

# Plan: Rose Pine Theme Switch

## Goal
Replace custom neobrutalist theme with starlight-theme-rose-pine plugin

## Steps
- [x] Install starlight-theme-rose-pine package
- [x] Update astro.config.mjs — add plugin, remove customCss
- [x] Update content.config.ts — revert schema extend
- [x] Update index.mdx — remove lucode-specific hero.layout
- [x] Remove lucode-starlight and starlight-sidebar-topics from package.json
- [x] Commit and push
- [x] Verify deploy at kb.mcky.space

## Files
- site/astro.config.mjs
- site/package.json
- site/src/content.config.ts
- site/src/content/docs/index.mdx

## Verification
- [x] Site loads at kb.mcky.space with Rose Pine palette
- [x] Dark/light/auto theme toggle works
- [x] Sidebar groups collapse correctly
