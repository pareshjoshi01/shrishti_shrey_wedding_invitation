import {sameOrigin,cookie} from '@/lib/admin-auth';
export async function POST(req:Request){if(!sameOrigin(req))return new Response('Invalid request',{status:403});return new Response(null,{status:303,headers:{Location:'/admin/login','Set-Cookie':cookie('',req,0),'Cache-Control':'no-store'}})}
