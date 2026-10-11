import {env} from 'cloudflare:workers';
import {defaults,type Config} from './invitation';
export function db(){const d=(env as any).DB;if(!d)throw new Error('Storage is unavailable. Please try again shortly.');return d;}
export async function config():Promise<Config>{const r=await db().prepare('SELECT value FROM settings WHERE key = ?').bind('config').first();if(!r)return defaults;const saved=JSON.parse(r.value) as Config;return {...defaults,...saved,events:defaults.events.map(event=>saved.events?.find(item=>item.id===event.id)??event)};}
export {isAdmin as allowed} from './admin-auth';
