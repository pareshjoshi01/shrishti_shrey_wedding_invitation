import {env} from 'cloudflare:workers';import {cookies} from 'next/headers';import {validSession} from './session';
export const COOKIE='wedding_admin';
export function secrets(){const e=env as any;const password=e.ADMIN_PASSWORD,secret=e.SESSION_SECRET;if(typeof password!=='string'||password.length<12||typeof secret!=='string'||secret.length<32||password.includes('replace-with')||secret.includes('replace-with'))return null;return {password,secret}}
export async function isAdmin(){const s=secrets();if(!s)return false;return validSession((await cookies()).get(COOKIE)?.value,s.secret,s.password)}
export function sameOrigin(req:Request){return req.headers.get('origin')===new URL(req.url).origin}
export function cookie(value:string,req:Request,maxAge=43200){return `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${new URL(req.url).protocol==='https:'?'; Secure':''}`}
