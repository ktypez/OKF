---
name: manage-okf
description: Maintain an OKF (Open Knowledge Framework) workspace by discovering projects, extracting verified metadata and documentation, normalizing project knowledge into a consistent schema, and synchronizing a central workspace knowledge base that serves as the authoritative source of truth. Use whenever asked to create, repair, update, audit, synchronize, migrate, or organize OKF files across a workspace or multi-project repository.
---

# Manage OKF

## Purpose

Maintain a centralized, consistent, and continuously synchronized workspace knowledge framework (OKF).

The OKF acts as the single source of truth for workspace-level knowledge while preserving project-specific documentation and developer intent.

The skill should:

- Discover projects automatically.
- Extract verified information from existing files.
- Normalize project documentation into a consistent structure.
- Preserve manual documentation whenever possible.
- Record provenance for important facts.
- Detect drift between projects and the OKF.
- Produce deterministic, repeatable outputs suitable for version control.

The skill should be safe to run repeatedly without creating unnecessary diffs.

---

# Default Workspace Layout

Unless the user specifies another location, create the OKF at the workspace root.

```text
OKF/
│
├── README.md
├── index.md
│
├── projects/
│   ├── <project-name>/
│   │   ├── profile.md
│   │   ├── structure.md
│   │   ├── dependencies.md
│   │   ├── commands.md
│   │   ├── decisions.md
│   │   ├── status.md
│   │   └── assets.md
│
├── system/
│   ├── glossary.md
│   ├── conventions.md
│   ├── workspace.md
│   ├── sync-log.md
│   └── inventory.md
│
└── templates/
    └── project-template.md
```

The canonical entry points are:

- `OKF/index.md`
- `OKF/projects/<project>/profile.md`

For exact field definitions, follow:

```
references/okf-schema.md
```

If the schema document does not exist, generate documentation using the default schema below.

---

# Workspace Discovery

## 1. Locate Workspace Root

Prefer the current directory if it appears to contain multiple projects.

Otherwise:

- locate the nearest parent containing multiple repositories or projects
- respect any workspace explicitly specified by the user
- never scan outside the intended workspace without confirmation

Workspace indicators include:

- multiple sibling project directories
- `.git`
- `.gitignore`
- `.github`
- `.vscode`
- workspace configuration files
- monorepo tooling
- existing `OKF/`

If multiple possible roots exist, ask before continuing.

---

# Project Discovery

Inventory projects using shallow scanning.

Prefer:

```
rg --files
```

combined with shallow directory inspection.

Recognize projects using indicators including:

- package.json
- pyproject.toml
- Cargo.toml
- go.mod
- composer.json
- pom.xml
- build.gradle
- Makefile
- README*
- Dockerfile
- docker-compose.*
- nix files
- workspace manifests
- solution files
- app configuration

Treat each logical application or library as one project.

Ignore:

- node_modules
- vendor
- .git
- dist
- build
- out
- target
- .next
- .cache
- __pycache__
- .venv
- venv
- coverage
- tmp
- logs
- generated code

unless explicitly requested.

---

# Evidence Collection

Always prefer explicit evidence over inference.

Priority order:

1. project manifest
2. README
3. documentation
4. configuration
5. build scripts
6. CI files
7. source tree
8. comments
9. inferred observations

Never invent information.

Unknown information should be recorded as:

```
Unknown
```

not guessed.

Collect whenever available:

## Identity

- project name
- display name
- description
- purpose
- repository
- owner
- maintainers

## Technology

- language(s)
- framework(s)
- runtime
- package manager
- build system
- deployment targets

## Dependencies

- major libraries
- external services
- databases
- cloud providers
- APIs

## Development

- setup commands
- install commands
- build commands
- test commands
- lint commands
- format commands
- run commands

## Architecture

- directory structure
- modules
- entry points
- important packages
- services

## Documentation

- README
- docs
- ADRs
- design documents
- specifications

## Quality

- tests
- CI
- code coverage
- linters
- formatters

## Status

- active
- archived
- experimental
- maintenance
- unknown

Record file paths that support important facts.

Example:

```
Source:
- package.json
- README.md
- docs/setup.md
```

---

# Build or Update OKF

Create any missing directories.

Create missing Markdown files.

Update existing files without destroying manually written content.

Generated sections should be updated.

Manual sections should remain untouched.

Preserve content beneath headings such as:

- Notes
- Manual Notes
- Decisions
- Open Questions
- Future Ideas
- TODO

unless the user explicitly requests replacement.

Prefer tables and structured lists over prose.

Outputs should remain stable across repeated executions.

---

# Generated Sections

Generated content should be clearly separated.

Example:

```markdown
<!-- BEGIN GENERATED -->

...

<!-- END GENERATED -->
```

Only replace content inside generated blocks.

Leave everything else untouched.

---

# Synchronization Rules

The OKF is the authoritative workspace knowledge base.

Project files remain evidence sources.

Do not overwrite project documentation unless explicitly instructed.

When information differs:

1. determine whether the newer source is obvious
2. if obvious, update OKF
3. otherwise record a conflict
4. ask the user if manual resolution is required

Never silently discard conflicting information.

---

# Conflict Resolution

Record unresolved conflicts in:

```
OKF/system/sync-log.md
```

Include:

- timestamp (UTC)
- affected project
- conflicting files
- observed values
- proposed resolution
- resolution status

Example:

```
2026-07-04 13:25 UTC

Project:
payment-api

Conflict:

README:
Python 3.12

pyproject.toml:
Python >=3.11

Status:
Needs confirmation.
```

---

# Inventory Rules

Use stable project identifiers.

Prefer folder names unless an official project name exists.

Never delete project entries automatically.

If a project disappears:

- retain its folder
- mark status:

```
Missing from latest scan
```

Include the last successful scan timestamp.

---

# Status Tracking

Each project should record:

- last scan
- last successful sync
- project status
- documentation completeness
- confidence level
- unresolved issues

---

# Index Maintenance

`OKF/index.md` should contain:

- workspace summary
- project inventory
- project links
- technology summary
- dependency summary
- last synchronization
- unresolved conflicts
- documentation coverage

Keep links relative.

Sort projects alphabetically unless another order is requested.

---

# Logging

Every synchronization should append an entry to:

```
OKF/system/sync-log.md
```

Include:

- UTC timestamp
- projects scanned
- files updated
- files created
- files skipped
- conflicts
- warnings
- duration (if available)

Timestamp format:

```
YYYY-MM-DD HH:MM UTC
```

---

# Safety Rules

Never:

- fabricate metadata
- delete documentation automatically
- overwrite manual notes
- remove projects because scanning failed
- rewrite files unrelated to the OKF
- modify project source code

When uncertain, preserve existing information and ask.

---

# Idempotency

Running this skill multiple times should produce identical results when the workspace has not changed.

Avoid:

- timestamp churn outside logs
- unstable ordering
- unnecessary formatting changes
- regenerated prose with identical meaning

Outputs should be deterministic and version-control friendly.

---

# Completion Report

After synchronization, provide a concise summary including:

## Workspace

- workspace root
- scan scope

## Projects

- discovered
- updated
- newly added
- missing

## OKF Changes

- files created
- files updated
- files skipped

Include exact paths.

## Conflicts

List unresolved conflicts.

## Validation

Report:

- evidence sources consulted
- assumptions made
- unknown fields
- verification performed

If no changes were necessary, explicitly state:

> OKF is already synchronized with the current workspace.