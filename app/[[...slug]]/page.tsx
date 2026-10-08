import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {pages,routeFromSegments} from '@/lib/marketing';
import {pageMetadata,pageStructuredData,serializeStructuredData} from '@/lib/seo';
import {SiteShell} from '@/components/site-shell';

type Props={params:Promise<{slug?:string[]}>};
export const dynamicParams=false;
export function generateStaticParams(){
  return Object.keys(pages).map(route=>({slug:route==='/'?[]:route.split('/').filter(Boolean)}));
}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const route=routeFromSegments((await params).slug),page=pages[route];
  if(!page)return {title:'Page not found — Terranile',robots:{index:false,follow:false}};
  return pageMetadata(route,page);
}
export default async function MarketingRoute({params}:Props){
  const route=routeFromSegments((await params).slug),page=pages[route];
  if(!page)notFound();
  return <SiteShell route={route} className={page.className}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:serializeStructuredData(pageStructuredData(route,page))}}/>
    {/* Repository-owned, build-time marketing HTML only. User content must use escaped React props. */}
    <div className="marketing-content" dangerouslySetInnerHTML={{__html:page.body}}/>
    {route==='/contact/'&&<section className="section contact-build"><span className="eyebrow">Custom software, AI &amp; research</span><h2>Build with Terranile.</h2><p>Websites, apps and software from $10,000. AI and research engagements from $20,000.</p><a className="pill-link" href="/build/">Start a project ↗</a></section>}
  </SiteShell>;
}
