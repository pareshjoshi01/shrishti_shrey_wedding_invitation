export type EventInfo={id:string;name:string;date:string;time:string;end:string;venue:string;city:string;map:string;image:string;note:string};
export type Config={couple:string;envelope:string;draft:boolean;events:EventInfo[]};
export const FORMAL_WEDDING_ID='formal_wedding_en';
export const FORMAL_WEDDING_HI_ID='formal_wedding_hi';
export const weddingDesignIds=['wedding',FORMAL_WEDDING_ID,FORMAL_WEDDING_HI_ID];
export const eventIds=['sangeet','haldi',...weddingDesignIds];
export const genericCombinations=[
['sangeet','haldi','wedding'],['sangeet','haldi'],['sangeet','wedding'],['haldi','wedding'],['sangeet'],['haldi'],['wedding'],
['sangeet','haldi',FORMAL_WEDDING_ID],['sangeet',FORMAL_WEDDING_ID],['haldi',FORMAL_WEDDING_ID],[FORMAL_WEDDING_ID],
['sangeet','haldi',FORMAL_WEDDING_HI_ID],['sangeet',FORMAL_WEDDING_HI_ID],['haldi',FORMAL_WEDDING_HI_ID],[FORMAL_WEDDING_HI_ID]
];
export function isFormalWedding(id:string){return id===FORMAL_WEDDING_ID||id===FORMAL_WEDDING_HI_ID;}
export function adminEventName(e:EventInfo){return e.id===FORMAL_WEDDING_ID?'Wedding Invite (English)':e.id===FORMAL_WEDDING_HI_ID?'Wedding Invite (Hindi)':e.name;}
export function guestEventName(e:EventInfo){return isFormalWedding(e.id)?'Wedding Invite':e.name;}
export function selectDesign(current:string[],id:string,checked:boolean){return checked?[...current.filter(selected=>selected!==id&&!(weddingDesignIds.includes(id)&&weddingDesignIds.includes(selected))),id]:current.filter(selected=>selected!==id);}
export function rsvpEventId(id:string){return isFormalWedding(id)?'wedding':id;}
export function validSelection(ids:unknown):ids is string[]{return Array.isArray(ids)&&ids.length>0&&ids.every(id=>typeof id==='string'&&eventIds.includes(id))&&new Set(ids).size===ids.length&&ids.filter(id=>weddingDesignIds.includes(id)).length<=1;}
export const defaults:Config={couple:'Srishti Jain weds Shrey Gupta',envelope:'/art/envelope.jpg',draft:false,events:[
{id:'sangeet',name:'Sangeet',date:'2026-12-07',time:'17:30',end:'20:00',venue:'Hotel Radisson',city:'Bhopal',map:'',image:'/art/sangeet.jpg',note:'5:30 PM ring ceremony · 6:00–8:00 PM Sangeet, followed by dinner and photos on stage'},
{id:'haldi',name:'Haldi',date:'2026-12-10',time:'11:00',end:'14:00',venue:'Luxera',city:'Delhi',map:'',image:'/art/haldi.jpg',note:'Showering the couple with love, laughter and turmeric!'},
{id:'wedding',name:'Wedding',date:'2026-12-12',time:'18:00',end:'23:00',venue:'Luxera',city:'Delhi',map:'',image:'/art/wedding.jpg',note:'With the blessings of our families, we begin a new chapter together.'},
{id:FORMAL_WEDDING_ID,name:'Wedding Invite',date:'2026-12-12',time:'19:00',end:'23:00',venue:'Luxera',city:'New Delhi',map:'',image:'/art/formal-wedding-en.png',note:'Mehrauli-Gurgaon Road, Near Arjan Garh, New Delhi'},
{id:FORMAL_WEDDING_HI_ID,name:'Wedding Invite',date:'2026-12-12',time:'19:00',end:'23:00',venue:'Luxera',city:'New Delhi',map:'',image:'/art/formal-wedding-hi.png',note:'Mehrauli-Gurgaon Road, Near Arjan Garh, New Delhi'}]};
export function dateLabel(e:EventInfo){return new Date(e.date+'T12:00:00').toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});}
export function timeLabel(e:EventInfo){return new Date(e.date+'T'+e.time).toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit'});}
