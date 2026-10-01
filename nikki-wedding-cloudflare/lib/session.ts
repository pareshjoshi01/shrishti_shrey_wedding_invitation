const enc=new TextEncoder();
export async function hmacKey(secret:string){return crypto.subtle.importKey('raw',enc.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign','verify'])}
const hex=(bytes:ArrayBuffer)=>Array.from(new Uint8Array(bytes)).map(x=>x.toString(16).padStart(2,'0')).join('');
const unhex=(s:string)=>new Uint8Array(s.match(/.{2}/g)!.map(x=>parseInt(x,16)));
export async function signature(secret:string,message:string){return hex(await crypto.subtle.sign('HMAC',await hmacKey(secret),enc.encode(message)))}
export async function verifySignature(secret:string,message:string,sig:string){if(!/^[a-f0-9]{64}$/.test(sig))return false;return crypto.subtle.verify('HMAC',await hmacKey(secret),unhex(sig),enc.encode(message))}
export async function issueSession(secret:string,password:string,now=Date.now()){const payload=String(Math.floor(now/1000)+43200)+'.'+crypto.randomUUID();const key=await signature(secret,'session-key:'+password);return payload+'.'+await signature(key,payload)}
export async function validSession(token:string|undefined,secret:string,password:string,now=Date.now()){if(!token||token.length>180)return false;const parts=token.split('.');if(parts.length!==3||!/^\d{10}$/.test(parts[0])||!Number.isFinite(Number(parts[0])))return false;const exp=Number(parts[0]);if(exp<=Math.floor(now/1000)||exp>Math.floor(now/1000)+43200)return false;const key=await signature(secret,'session-key:'+password);return verifySignature(key,parts[0]+'.'+parts[1],parts[2])}
export async function passwordMatches(secret:string,configured:string,supplied:string){return verifySignature(secret,'password:'+supplied,await signature(secret,'password:'+configured))}
