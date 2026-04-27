#!/usr/bin/env node
'use strict';

/**
 * SessionStart hook — injects relevant memory into Claude Code context.
 *
 * Reads from ~/.agent-starter-kit/memory/ and surfaces entries that match
 * the current working directory or are tagged as global.
 *
 * Output on stdout is injected into the session as system context.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const MEMORY_DIR = path.join(os.homedir(), '.agent-starter-kit', 'memory');
const MAX_ENTRIES = 10;
const STALE_DAYS = 90;

function readMemoryEntries(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = [];
  for (const category of ['decisions', 'patterns', 'context', 'feedback']) {
    const catDir = path.join(dir, category);
    if (!fs.existsSync(catDir)) continue;
    for (const file of fs.readdirSync(catDir)) {
      if (!file.endsWith('.md')) continue;
      try {
        const content = fs.readFileSync(path.join(catDir, file), 'utf8');
        entries.push({ category, file, content });
      } catch {
        // skip unreadable files
      }
    }
  }
  return entries;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const meta = {};
  for (const line of match[1].split('\n')) {
    const [k, ...v] = line.split(':');
    if (k && v.length) meta[k.trim()] = v.join(':').trim();
  }
  return meta;
}

function isStale(dateStr) {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const diffDays = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays > STALE_DAYS;
}

function getProjectName() {
  try {
    return path.basename(process.cwd());
  } catch {
    return null;
  }
}

function main() {
  let input = '';
  process.stdin.on('data', chunk => { input += chunk; });
  process.stdin.on('end', () => {
    const projectName = getProjectName();
    const entries = readMemoryEntries(MEMORY_DIR);

    const relevant = entries.filter(({ content }) => {
      const meta = parseFrontmatter(content);
      return meta.project === 'global' || meta.project === projectName;
    });

    if (relevant.length === 0) {
      process.exit(0);
    }

    const lines = [`## Memory from previous sessions (${projectName})\n`];
    let count = 0;
    for (const { category, file, content } of relevant) {
      if (count >= MAX_ENTRIES) break;
      const meta = parseFrontmatter(content);
      const stale = isStale(meta.date);
      const body = content.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
      const summary = body.split('\n')[0];
      lines.push(`- [${category}] ${summary}${stale ? ' *(may be stale)*' : ''}`);
      count++;
    }

    if (count > 0) {
      process.stdout.write(lines.join('\n') + '\n');
    }

    process.exit(0);
  });
}

main();
