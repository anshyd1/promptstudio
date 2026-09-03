import type {Metadata} from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieNotice from '@/components/CookieNotice';
export const metadata:Metadata={metadataBase:new URL('https://promptstudio-lemon.vercel.app'),title:{default:'PromptStudio AI — Free Professional Prompt Library',template:'%s | PromptStudio AI'},description:'Free customizable prompts for professional image, video, e-commerce and commercial creative work.',openGraph:{type:'website',siteName:'PromptStudio AI'},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/>{children}<Footer/><CookieNotice/></body></html>}
