import {env} from 'cloudflare:workers';
import {defaults} from './invitation';
export function db(){const d=(env as any).DB;if(!d)throw new Error('Storage is unavailable. Please try again shortly.');return d;}
export async function config(){const r=await db().prepare('SELECT value FROM settings WHERE key = ?').bind('config').first();return r?JSON.parse(r.value):defaults;}
export {isAdmin as allowed} from './admin-auth';
