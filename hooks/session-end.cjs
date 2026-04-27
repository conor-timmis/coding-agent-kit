#!/usr/bin/env node
'use strict';

/**
 * SessionEnd hook — no-op for agent-starter-kit.
 *
 * Memory is saved explicitly via the `memory` skill rather than
 * auto-captured at session end. This avoids storing noise.
 */

process.stdin.resume();
process.stdin.on('end', () => process.exit(0));
