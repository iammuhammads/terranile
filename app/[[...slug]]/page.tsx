import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {pages,routeFromSegments} from '@/lib/marketing';
import {SiteShell} from '@/components/site-shell';

type Props={params:Promise<{slug?:string[]}>};
export const dynamicParams=false;
export function generateStaticParams(){
  return Object.keys(pages).map(route=>({slug:route==='/'?[]:route.split('/').filter(Boolean)}));
}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const route=routeFromSegments((await params).slug),page=pages[route];
  if(!page)return {title:'Page not found — Terranile',robots:{index:false,follow:false}};
  return {title:page.title,description:page.description,alternates:{canonical:route},openGraph:{type:'website',title:page.title,description:page.description,url:route}};
}
export default async function MarketingRoute({params}:Props){
  const route=routeFromSegments((await params).slug),page=pages[route];
  if(!page)notFound();
  return <SiteShell route={route} className={page.className}>
    {/* Repository-owned, build-time marketing HTML only. User content must use escaped React props. */}
    <div className="marketing-content" dangerouslySetInnerHTML={{__html:page.body}}/>
  </SiteShell>;
}
