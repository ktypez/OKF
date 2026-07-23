---
type: template
id: project-template
last_updated: 2026-07-21T00:00:00.000Z
title: Project Profile Template
description: ''
tags:
  - template
  - project-template
timestamp: Tue Jul 21 2026 00:00:00 GMT+0000 (Coordinated Universal Time)T12:00:00Z
---

# Project Profile Template

Copy this when creating a new project in OKF.

## profile.md

```yaml
---
type: project-profile
id: <project>-profile
project: <project-name>
last_updated: YYYY-MM-DD
status: active
stack:
  language: <language>
  framework: <framework>
  ui: <ui-library>
  database: <database>
  storage: <storage>
  state: <state-management>
  auth: <auth-method>
  testing: <testing-framework>
  deployment: <deploy-target>
  ci: <ci-system>
agent_personality: <personality>
links:
  agent: <project>-agent
  status: <project>-status
---
```

## agent.md

```yaml
---
type: agent-profile
id: <project>-agent
project: <project-name>
last_updated: YYYY-MM-DD
status: active
personality: <personality-name>
status_ref: <project>-status
links:
  profile: <project>-profile
  status: <project>-status
---
```

## status.md

```yaml
---
type: project-status
id: <project>-status
project: <project-name>
last_updated: YYYY-MM-DD
status: active
links:
  profile: <project>-profile
  agent: <project>-agent
---
```

## commands.md

```yaml
---
type: project-commands
id: <project>-commands
project: <project-name>
last_updated: YYYY-MM-DD
links:
  profile: <project>-profile
---
```

## dependencies.md

```yaml
---
type: project-dependencies
id: <project>-dependencies
project: <project-name>
last_updated: YYYY-MM-DD
links:
  profile: <project>-profile
---
```

## structure.md

```yaml
---
type: project-structure
id: <project>-structure
project: <project-name>
last_updated: YYYY-MM-DD
links:
  profile: <project>-profile
---
```
