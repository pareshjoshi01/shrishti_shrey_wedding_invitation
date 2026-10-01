export type EventInfo={id:string;name:string;date:string;time:string;end:string;venue:string;city:string;map:string;image:string;note:string};
export type Config={couple:string;envelope:string;draft:boolean;events:EventInfo[]};
export const defaults:Config={couple:'Srishti Jain weds Shrey Gupta',envelope:'/art/envelope.jpg',draft:false,events:[
{id:'sangeet',name:'Sangeet',date:'2026-12-07',time:'17:30',end:'20:00',venue:'Hotel Radisson',city:'Bhopal',map:'',image:'/art/sangeet.jpg',note:'5:30 PM ring ceremony · 6:00–8:00 PM Sangeet, followed by dinner and photos on stage'},
{id:'haldi',name:'Haldi',date:'2026-12-10',time:'11:00',end:'14:00',venue:'Luxera',city:'Delhi',map:'',image:'/art/haldi.jpg',note:'Showering the couple with love, laughter and turmeric!'},
{id:'wedding',name:'Wedding',date:'2026-12-12',time:'18:00',end:'23:00',venue:'Luxera',city:'Delhi',map:'',image:'/art/wedding.jpg',note:'With the blessings of our families, we begin a new chapter together.'}]};
export function dateLabel(e:EventInfo){return new Date(e.date+'T12:00:00').toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});}
export function timeLabel(e:EventInfo){return new Date(e.date+'T'+e.time).toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit'});}
