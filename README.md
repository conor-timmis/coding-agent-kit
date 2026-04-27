# agent-starter-kit

Installable starter kit for AI coding agents, inspired by [Karpathy-style coding behavior](https://github.com/forrestchang/andrej-karpathy-skills) and [claude-mem](https://github.com/thedotmack/claude-mem).

## What you get

- Behavioral rules: Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution
- Memory system: file-based memory for decisions, patterns, context, and feedback
- Hooks: `SessionStart` surfaces relevant context, `PostToolUse` logs notable file changes

## Supported CLIs

- Claude Code
- Cursor
- Windsurf
- GitHub Copilot
- OpenAI Codex
- Any tool that reads `CLAUDE.md` or `AGENTS.md`

## Install

Global install:

```bash
npx agent-starter-kit install
```

Install for one CLI:

```bash
npx agent-starter-kit install --target=claude
npx agent-starter-kit install --target=cursor
npx agent-starter-kit install --target=windsurf
npx agent-starter-kit install --target=copilot
npx agent-starter-kit install --target=codex
```

Current project only:

```bash
npx agent-starter-kit install --project
```

Manual install (copy files from this repo):

- Claude Code: `.claude-plugin/`, `skills/`, `hooks/`, `CLAUDE.md`
- Cursor: `.cursor/rules/agent-starter-kit.mdc`
- Windsurf: `.windsurf/rules/agent-starter-kit.md`
- Copilot: `.github/copilot-instructions.md`
- Codex: `.codex-plugin/plugin.json`, `AGENTS.md`
- Generic: `CLAUDE.md` or `AGENTS.md`

## Memory

Memory location:

- Global: `~/.agent-starter-kit/memory/`
- Per-project: `.agent-memory/`

Example prompts:

> "Remember that we use Zod for all validation in this project."
>
> "What do you remember about the auth architecture?"

Categories:

- `decisions/`
- `patterns/`
- `context/`
- `feedback/`

The `session-start` hook injects relevant memory at the start of each session.

## License

MIT
