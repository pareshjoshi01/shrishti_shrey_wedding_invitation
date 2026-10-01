import fs from 'node:fs';import {spawn} from 'node:child_process';
if(!fs.existsSync('dist/server/wrangler.json'))throw Error('Run pnpm run build first.');
if(fs.existsSync('.dev.vars'))fs.copyFileSync('.dev.vars','dist/server/.dev.vars');else fs.rmSync('dist/server/.dev.vars',{force:true});
const child=spawn(process.execPath,['node_modules/wrangler/bin/wrangler.js','dev','--config','dist/server/wrangler.json','--persist-to','.wrangler/state',...process.argv.slice(2)],{stdio:'inherit'});child.on('exit',code=>process.exit(code??1));
