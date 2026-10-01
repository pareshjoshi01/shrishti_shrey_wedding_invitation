import {isAdmin} from '@/lib/admin-auth';import {redirect} from 'next/navigation';import Admin from './manager';
export const dynamic='force-dynamic';export default async function Page(){if(!await isAdmin())redirect('/admin/login');return <Admin/>}
