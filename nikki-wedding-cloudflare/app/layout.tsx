import type {Metadata} from 'next';import './globals.css';
export const metadata:Metadata={title:'Srishti & Shrey | You are invited',description:'Join us to celebrate Srishti and Shrey.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
