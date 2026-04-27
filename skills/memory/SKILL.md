---
name: memory
description: File-based cross-session memory. Use when the user asks to remember something, recall past decisions, search past context, or when starting a new session on a known project.
license: MIT
---

# Memory Skill

Lightweight file-based memory that persists key decisions, patterns, and context across AI coding sessions.

Memory lives in `~/.agent-starter-kit/memory/` (global) or `.agent-memory/` (per-project).

## Memory Categories

| Directory | Purpose |
|-----------|---------|
| `decisions/` | Architectural choices and their rationale |
| `patterns/` | Recurring solutions that worked well |
| `context/` | Project background, constraints, stakeholder info |
| `feedback/` | User corrections and preferences |

## Saving a Memory

When the user asks you to remember something:

1. Determine the category (decisions / patterns / context / feedback).
2. Create a file at `~/.agent-starter-kit/memory/<category>/<slug>.md` with this format:

```markdown
---
project: <project name or "global">
date: <YYYY-MM-DD>
tags: [<relevant tags>]
---

<One-line summary of what was learned or decided>

**Why:** <The motivation, constraint, or incident that makes this worth remembering>
**Apply:** <When and how to use this in future sessions>
```

3. Confirm to the user: "Saved to memory: `<category>/<slug>.md`"

## Recalling Memory

When starting a session on a known project, or when asked to recall:

1. Read files in `~/.agent-starter-kit/memory/` that match the current project name or are tagged globally.
2. Summarise relevant entries in 1–2 lines each.
3. Flag any entries that may be stale (older than 90 days or referencing files that no longer exist).

## Searching Memory

When asked to find past decisions or patterns:

1. Scan all markdown files under `~/.agent-starter-kit/memory/`.
2. Match against keywords from the user's query.
3. Return matching entries with their file path, date, and summary line.

## Example Invocations

- "Remember that we decided to use Zod for validation in this project."
- "What do you remember about the auth architecture?"
- "Save this pattern: always debounce resize handlers with 150ms."
- "What feedback have you saved about my preferences?"
