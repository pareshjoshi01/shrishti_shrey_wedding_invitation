import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const PLACEHOLDER = '00000000-0000-4000-8000-000000000000';
const bin = fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url));

function run(args, {allowFailure = false} = {}) {
  const result = spawnSync(process.execPath, [bin, ...args], {encoding: 'utf8', env: process.env});
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if ((result.status ?? 1) !== 0 && !allowFailure) process.exit(result.status || 1);
  return {status: result.status ?? 1, stdout: result.stdout || '', stderr: result.stderr || ''};
}

function parseJson(text) {
  const arrayAt = text.indexOf('[');
  const objectAt = text.indexOf('{');
  const start = arrayAt === -1 ? objectAt : objectAt === -1 ? arrayAt : Math.min(arrayAt, objectAt);
  if (start === -1) throw new Error('Wrangler did not return JSON. The build token needs D1 permission.');
  return JSON.parse(text.slice(start));
}

function writeJson(path, value) {
  fs.writeFileSync(path, JSON.stringify(value, null, 2) + '\n');
}

const config = JSON.parse(fs.readFileSync('wrangler.jsonc', 'utf8'));
const database = config.d1_databases[0];
const builtPath = 'dist/server/wrangler.json';
const built = fs.existsSync(builtPath) ? JSON.parse(fs.readFileSync(builtPath, 'utf8')) : null;

if (database.database_id === PLACEHOLDER) {
  const listed = run(['d1', 'list', '--json']);
  const databases = parseJson(listed.stdout);
  let match = databases.find((db) => db.name === database.database_name);
  if (!match) {
    const created = run(['d1', 'create', database.database_name], {allowFailure: true});
    if (created.status !== 0 && !/already exists/i.test(`${created.stdout}\n${created.stderr}`)) process.exit(created.status || 1);
    match = parseJson(run(['d1', 'list', '--json']).stdout).find((db) => db.name === database.database_name);
  }
  const id = match?.uuid || match?.database_id;
  if (!id) throw new Error(`Could not find D1 database ${database.database_name}.`);
  database.database_id = id;
  writeJson('wrangler.jsonc', config);
  if (built?.d1_databases?.[0]) built.d1_databases[0].database_id = id;
  console.log(`Using D1 database ${database.database_name} (${id}).`);
}

const bucket = config.r2_buckets?.[0]?.bucket_name;
if (bucket) {
  const info = run(['r2', 'bucket', 'info', bucket], {allowFailure: true});
  if (info.status !== 0) {
    const created = run(['r2', 'bucket', 'create', bucket], {allowFailure: true});
    if (created.status !== 0) {
      console.log(`Continuing without R2. Artwork upload stays unavailable until bucket ${bucket} exists.`);
      if (built) built.r2_buckets = [];
    }
  }
}

if (built) writeJson(builtPath, built);
run(['d1', 'migrations', 'apply', 'DB', '--remote', '--config', 'wrangler.jsonc']);
run(['deploy', '--config', builtPath]);
