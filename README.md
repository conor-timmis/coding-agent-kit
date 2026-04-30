# Coding Agent Starter Kit

Your AI coding agent is already smart. This makes it *reliable*.

Out of the box, most AI agents forget everything between sessions, go off on tangents, and over-engineer simple tasks. The Coding Agent Starter Kit gives your agent a memory, a set of battle-tested behavioral rules, and the discipline to actually follow your lead. This is your Starter Kit, inspired by [Karpathy-style coding behavior](https://github.com/forrestchang/andrej-karpathy-skills) & [claude-mem](https://github.com/thedotmack/claude-mem).

One command. Works with every major AI coding CLI.

## What changes

**Before:** Your agent starts every session cold. It doesn't know your stack, your decisions, or what you tried last week. It writes 200 lines when 50 would do. It "helps" by refactoring things you didn't ask it to touch.

**After:** Your agent remembers. It asks before assuming. It makes the smallest change that solves the problem, and it stops when the goal is met.

Specifically, you get:

- **Behavioral rules** — Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution. No more runaway rewrites.
- **Persistent memory** — Decisions, patterns, context, and feedback survive across sessions. Tell it once, it remembers.
- **Automatic hooks** — `SessionStart` injects relevant memory so the agent hits the ground running. `PostToolUse` logs notable file changes so nothing gets lost.

## Usage Statistics

- `claude-mem` documents **~10x token savings** for its 3-layer memory retrieval flow.
- This starter kit includes additional behavioral rules, so those savings are **not guaranteed** in every workflow.

For a defensible project-specific number, run a 1-week before/after benchmark using the same task mix and model settings.

## Supported CLIs

Works wherever you code:

- Claude Code
- Cursor
- Windsurf
- GitHub Copilot
- OpenAI Codex
- Any tool that reads `CLAUDE.md` or `AGENTS.md`

## Install

One command installs everywhere:

```bash
npx agent-starter-kit install
```

Or pick your CLI:

```bash
npx agent-starter-kit install --target=claude
npx agent-starter-kit install --target=cursor
npx agent-starter-kit install --target=windsurf
npx agent-starter-kit install --target=copilot
npx agent-starter-kit install --target=codex
```

Just this project:

```bash
npx agent-starter-kit install --project
```

If you prefer installing first, then running:

```bash
npm install agent-starter-kit
npx agent-starter-kit install
```

Prefer to do it manually? Copy these files from the repo:

- Claude Code: `.claude-plugin/`, `skills/`, `hooks/`, `CLAUDE.md`
- Cursor: `.cursor/rules/agent-starter-kit.mdc`
- Windsurf: `.windsurf/rules/agent-starter-kit.md`
- Copilot: `.github/copilot-instructions.md`
- Codex: `.codex-plugin/plugin.json`, `AGENTS.md`
- Generic: `CLAUDE.md` or `AGENTS.md`

Users can install with:

```bash
npm install agent-starter-kit
```

## Memory

Your agent's memory lives here:

- Global (all projects): `~/.agent-starter-kit/memory/`
- Per-project: `.agent-memory/`

Just talk to it naturally:

> "Remember that we use Zod for all validation in this project."
>
> "What do you remember about the auth architecture?"

Memory is organized into:

- `decisions/` — why you built things the way you did
- `patterns/` — solutions that worked, ready to reuse
- `context/` — project background, constraints, team conventions
- `feedback/` — corrections so the agent doesn't make the same mistake twice

At the start of each session, the `session-start` hook automatically pulls in what's relevant — so you spend less time re-explaining and more time shipping.

## License

MIT

---

<div align="center">
<p>Fancy treating me to a Coffee?</p>
<a href="https://ko-fi.com/conort"><img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="ko-fi"></a>
</div>
