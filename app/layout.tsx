import type {Metadata,Viewport} from 'next';
import type {ReactNode} from 'react';
import {siteOrigin} from '@/lib/marketing';

export const metadata:Metadata={metadataBase:new URL(siteOrigin),icons:{icon:'/assets/terranile-logo-clean.png'}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#f2f2f2'};
export default function RootLayout({children}:{children:ReactNode}){
  return <html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
    <link rel="stylesheet" href="/site.css"/>
    <link rel="stylesheet" href="/visuals-v2.css"/>
    <link rel="stylesheet" href="/visuals-v3.css"/>
    <link rel="stylesheet" href="/brand.css"/>
  </head><body>{children}</body></html>;
}
