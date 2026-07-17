---
type: skill
id: writer-work
last_updated: 2026-07-17
source: ~/.config/opencode/skills/writer-work/SKILL.md
category: content
projects: [global]
---

# writer-work Skill

**Purpose:** Use for content writing — summaries, changelogs, step-by-step instructions, and documentation. Also triggered by "summarize" or "wrap-day".

## References
- `~/OKF/projects/writer/agent.md` for capabilities
- `~/OKF/system/conventions.md` for communication preferences
- `~/OKF/system/workspace.md` for project context

## Style Rules
- Concise, direct — skip introductions ("I'll help you with...")
- Thai or English only — no Chinese characters
- Use contractions (I'll, don't)
- No emojis unless explicitly asked
- Under 4 lines when possible

## Common Tasks

### Changelog Entries
- Read diff or commit history
- Summarize changes in past tense, grouped by type (Feat, Fix, Style, Perf, etc.)
- Format for `Changelog.tsx` (truck) or markdown changelogs

### Step-by-Step Instructions
- Break into numbered steps
- Include exact commands and file paths
- Use code blocks for commands

### Status Updates
- Read `~/OKF/projects/<project>/status.md`
- Update with recent changes in clear, scannable format
- Keep existing structure (Stack / Components / Known, etc.)
