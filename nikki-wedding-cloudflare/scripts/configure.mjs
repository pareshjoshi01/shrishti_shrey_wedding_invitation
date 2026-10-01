import fs from 'node:fs';
const [id,bucket='nikki-wedding-artwork']=process.argv.slice(2);
if(!id||!/^[-a-f0-9]{36}$/.test(id)||id==='00000000-0000-4000-8000-000000000000')throw Error('Usage: node scripts/configure.mjs <real-D1-database-id> [R2-bucket-name]');
if(!/^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/.test(bucket))throw Error('Invalid R2 bucket name.');
const config=JSON.parse(fs.readFileSync('wrangler.jsonc','utf8'));config.d1_databases[0].database_id=id;config.r2_buckets[0].bucket_name=bucket;fs.writeFileSync('wrangler.jsonc',JSON.stringify(config,null,2)+'\n');console.log('Cloudflare resources configured. Run pnpm run build before deploying.');
