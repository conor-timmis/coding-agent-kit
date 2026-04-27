#!/usr/bin/env node
'use strict';

/**
 * PostToolUse hook — captures notable tool events as candidate observations.
 *
 * Watches for Write/Edit tool use on files that look like key decisions
 * (e.g. config files, schema files, architecture docs) and appends a
 * brief log entry to ~/.agent-starter-kit/pending.jsonl for the AI to
 * review and optionally promote to memory via the memory skill.
 *
 * This hook never blocks — exits 0 on any error.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const PENDING_LOG = path.join(os.homedir(), '.agent-starter-kit', 'pending.jsonl');

const NOTABLE_PATTERNS = [
  /package\.json$/,
  /tsconfig\.json$/,
  /\.env\.example$/,
  /schema\.(ts|js|json|sql)$/i,
  /migration/i,
  /ARCHITECTURE/i,
  /DECISIONS/i,
];

function isNotable(filePath) {
  return NOTABLE_PATTERNS.some(re => re.test(filePath));
}

function main() {
  let input = '';
  process.stdin.on('data', chunk => { input += chunk; });
  process.stdin.on('end', () => {
    try {
      const event = JSON.parse(input);
      const toolName = event?.tool_name || event?.toolName || '';
      const toolInput = event?.tool_input || event?.toolInput || {};

      if (!['Write', 'Edit', 'MultiEdit'].includes(toolName)) {
        process.exit(0);
      }

      const filePath = toolInput?.file_path || toolInput?.path || '';
      if (!filePath || !isNotable(filePath)) {
        process.exit(0);
      }

      const entry = JSON.stringify({
        ts: new Date().toISOString(),
        tool: toolName,
        file: filePath,
        cwd: process.cwd(),
      });

      const dir = path.dirname(PENDING_LOG);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.appendFileSync(PENDING_LOG, entry + '\n');
    } catch {
      // never block the session
    }
    process.exit(0);
  });
}

main();
