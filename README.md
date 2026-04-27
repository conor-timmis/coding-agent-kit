# agent-starter-kit

An installable AI agent starter kit that is heavily inspired by [Andrej Karpathy's coding behavioral guidelines](https://github.com/forrestchang/andrej-karpathy-skills) & [claude-mem](https://github.com/thedotmack/claude-mem), packaged for all popular AI coding CLIs.

## What's included

| Component | Description |
|-----------|-------------|
| **Karpathy Guidelines** | Think Before Coding · Simplicity First · Surgical Changes · Goal-Driven Execution |
| **Memory System** | File-based cross-session memory — saves decisions, patterns, context, and feedback |
| **Hooks** | SessionStart injects relevant past context · PostToolUse logs notable file changes |

## Supported CLIs

| CLI | Install method |
|-----|---------------|
| Claude Code | `.claude-plugin/` + skills + hooks |
| Cursor | `.cursor/rules/agent-starter-kit.mdc` |
| Windsurf | `.windsurf/rules/agent-starter-kit.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| OpenAI Codex | `.codex-plugin/plugin.json` + `AGENTS.md` |
| Any AI tool | `CLAUDE.md` / `AGENTS.md` at project root |

## Install

**All CLIs (global):**
```bash
npx agent-starter-kit install
```

**Specific CLI:**
```bash
npx agent-starter-kit install --target=claude
npx agent-starter-kit install --target=cursor
npx agent-starter-kit install --target=windsurf
npx agent-starter-kit install --target=copilot
npx agent-starter-kit install --target=codex
```

**Current project only:**
```bash
npx agent-starter-kit install --project
```

**Manual install** — copy the relevant files from this repo:
- Claude Code: `.claude-plugin/`, `skills/`, `hooks/`, `CLAUDE.md`
- Cursor: `.cursor/rules/agent-starter-kit.mdc`
- Windsurf: `.windsurf/rules/agent-starter-kit.md`
- Copilot: `.github/copilot-instructions.md`
- Codex: `.codex-plugin/plugin.json`, `AGENTS.md`
- Generic: `CLAUDE.md` or `AGENTS.md`

## Memory system

Memory files live in `~/.agent-starter-kit/memory/` (global across projects) or `.agent-memory/` (per-project).

**Save a memory** — ask your AI:
> "Remember that we use Zod for all validation in this project."

**Recall memories** — ask your AI:
> "What do you remember about the auth architecture?"

**Memory categories:**
- `decisions/` — architectural choices and rationale
- `patterns/` — recurring solutions that worked
- `context/` — project background and constraints
- `feedback/` — your preferences and corrections

The `session-start` hook automatically surfaces relevant context at the start of each session.

## Behavioral guidelines

Guidelines are derived from [Andrej Karpathy's observations](https://x.com/karpathy/status/2015883857489522876) on common LLM coding pitfalls:

1. **Think Before Coding** — surface assumptions, push back on unclear requests
2. **Simplicity First** — minimum code that solves the problem, nothing speculative
3. **Surgical Changes** — touch only what the request requires
4. **Goal-Driven Execution** — define verifiable success criteria before starting

## License

MIT
