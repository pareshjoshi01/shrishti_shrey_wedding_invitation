import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const config = JSON.parse(fs.readFileSync('wrangler.jsonc', 'utf8'));
if (config.d1_databases[0].database_id === '00000000-0000-4000-8000-000000000000') {
  throw Error('Set your real D1 database_id in wrangler.jsonc first. See README.md.');
}
const bin = fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url));
for (const args of [
  ['d1', 'migrations', 'apply', 'DB', '--remote', '--config', 'wrangler.jsonc'],
  ['deploy', '--config', 'dist/server/wrangler.json'],
]) {
  const result = spawnSync(process.execPath, [bin, ...args], {stdio: 'inherit', env: process.env});
  if (result.status !== 0) process.exit(result.status || 1);
}
