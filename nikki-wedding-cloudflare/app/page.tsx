import Invitation from './invitation-client';import {defaults} from '@/lib/invitation';import {config} from '@/lib/storage';
export const dynamic='force-dynamic';
export default async function Home(){let c=defaults;try{c=await config()}catch{}return <Invitation config={c} preview/>}
