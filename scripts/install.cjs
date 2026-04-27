#!/usr/bin/env node
'use strict';

/**
 * agent-starter-kit installer
 *
 * Usage:
 *   npx agent-starter-kit install [--target=<claude|cursor|windsurf|copilot|codex|all>]
 *   npx agent-starter-kit install --project   # copy rules into current project directory
 *
 * Installs plugin files into the appropriate locations for each AI coding CLI.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const PKG_DIR = path.resolve(__dirname, '..');
const HOME = os.homedir();
const CWD = process.cwd();

const args = process.argv.slice(2);
const isProject = args.includes('--project');
const targetArg = (args.find(a => a.startsWith('--target=')) || '').replace('--target=', '') || 'all';

const TARGETS = {
  claude: installClaude,
  cursor: installCursor,
  windsurf: installWindsurf,
  copilot: installCopilot,
  codex: installCodex,
};

function copy(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`  copied → ${dest}`);
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copy(srcPath, destPath);
    }
  }
}

function installClaude() {
  console.log('\nInstalling for Claude Code...');
  const pluginDir = path.join(HOME, '.claude', 'plugins', 'marketplaces', 'agent-starter-kit');
  copyDir(path.join(PKG_DIR, '.claude-plugin'), path.join(pluginDir, '.claude-plugin'));
  copyDir(path.join(PKG_DIR, 'skills'), path.join(pluginDir, 'skills'));
  copyDir(path.join(PKG_DIR, 'hooks'), path.join(pluginDir, 'hooks'));
  copy(path.join(PKG_DIR, 'CLAUDE.md'), path.join(pluginDir, 'CLAUDE.md'));
  if (isProject) {
    copy(path.join(PKG_DIR, 'CLAUDE.md'), path.join(CWD, 'CLAUDE.md'));
    console.log('  also copied CLAUDE.md to project root');
  }
  console.log('  Claude Code: done');
}

function installCursor() {
  console.log('\nInstalling for Cursor...');
  const dest = isProject
    ? path.join(CWD, '.cursor', 'rules', 'agent-starter-kit.mdc')
    : path.join(HOME, '.cursor', 'rules', 'agent-starter-kit.mdc');
  copy(path.join(PKG_DIR, '.cursor', 'rules', 'agent-starter-kit.mdc'), dest);
  console.log('  Cursor: done');
}

function installWindsurf() {
  console.log('\nInstalling for Windsurf...');
  const dest = isProject
    ? path.join(CWD, '.windsurf', 'rules', 'agent-starter-kit.md')
    : path.join(HOME, '.windsurf', 'rules', 'agent-starter-kit.md');
  copy(path.join(PKG_DIR, '.windsurf', 'rules', 'agent-starter-kit.md'), dest);
  console.log('  Windsurf: done');
}

function installCopilot() {
  console.log('\nInstalling for GitHub Copilot...');
  if (!isProject) {
    console.log('  Copilot instructions are project-scoped. Re-run with --project from your repo root.');
    return;
  }
  copy(
    path.join(PKG_DIR, '.github', 'copilot-instructions.md'),
    path.join(CWD, '.github', 'copilot-instructions.md')
  );
  console.log('  Copilot: done');
}

function installCodex() {
  console.log('\nInstalling for OpenAI Codex...');
  const dest = isProject
    ? path.join(CWD, '.codex-plugin', 'plugin.json')
    : path.join(HOME, '.codex', 'plugins', 'agent-starter-kit', 'plugin.json');
  copy(path.join(PKG_DIR, '.codex-plugin', 'plugin.json'), dest);
  copy(
    path.join(PKG_DIR, 'AGENTS.md'),
    isProject ? path.join(CWD, 'AGENTS.md') : path.join(HOME, '.codex', 'AGENTS.md')
  );
  console.log('  Codex: done');
}

function main() {
  console.log('agent-starter-kit installer');
  console.log('===========================');

  const toInstall = targetArg === 'all' ? Object.keys(TARGETS) : [targetArg];

  for (const target of toInstall) {
    if (!TARGETS[target]) {
      console.error(`Unknown target: ${target}. Valid: ${Object.keys(TARGETS).join(', ')}, all`);
      process.exit(1);
    }
    TARGETS[target]();
  }

  console.log('\nDone. Restart your AI CLI to load the new guidelines and hooks.');
}

main();
