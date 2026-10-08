import type {Metadata} from 'next';
import {pages,siteOrigin,type MarketingPage} from '@/lib/marketing';

const organizationId=`${siteOrigin}/#organization`;
const websiteId=`${siteOrigin}/#website`;
const organization={
  '@type':'Organization','@id':organizationId,name:'Terranile',
  legalName:'Terranile Digital Infrastructure Ltd.',url:`${siteOrigin}/`,
  logo:`${siteOrigin}/assets/terranile-logo-clean.png`,foundingDate:'2025'
};
export function breadcrumbs(route:string){
  if(route==='/')return [];
  const parent=route.startsWith('/companies/')?'/projects/':
    route.split('/').filter(Boolean).length>1?`/${route.split('/')[1]}/`:null;
  const routes=['/',...(parent&&pages[parent]?[parent]:[]),route];
  return routes.map(path=>({path,name:path==='/'?'Home':pages[path].title.replace(/ — Terranile$/,'')}));
}
export function pageMetadata(route:string,page:MarketingPage):Metadata{
  const article=route==='/research/opex-001/'||route.startsWith('/perspectives/')&&route!=='/perspectives/';
  const image=route==='/research/opex-001/'?'/assets/research/risk-return.png':'/assets/terranile-hero.webp';
  return {
    title:page.title,description:page.description,
    alternates:{canonical:`${siteOrigin}${route}`},
    openGraph:{type:article?'article':'website',siteName:'Terranile',title:page.title,
      description:page.description,url:`${siteOrigin}${route}`,images:[{url:`${siteOrigin}${image}`,alt:article&&route==='/research/opex-001/'?'OPEX Research 001 historical risk and return comparison':'Terranile'}]},
    twitter:{card:'summary_large_image',title:page.title,description:page.description,images:[`${siteOrigin}${image}`]}
  };
}
export function pageStructuredData(route:string,page:MarketingPage){
  const graph:Record<string,unknown>[]=[];
  if(route==='/')graph.push(organization,{'@type':'WebSite','@id':websiteId,name:'Terranile',url:`${siteOrigin}/`,publisher:{'@id':organizationId}});
  const crumbs=breadcrumbs(route);
  if(crumbs.length)graph.push({'@type':'BreadcrumbList',itemListElement:crumbs.map((crumb,index)=>({'@type':'ListItem',position:index+1,name:crumb.name,item:`${siteOrigin}${crumb.path}`}))});
  if(route==='/research/opex-001/'||route.startsWith('/perspectives/')&&route!=='/perspectives/'){
    graph.push({'@type':route==='/research/opex-001/'?'ScholarlyArticle':'Article',
      '@id':`${siteOrigin}${route}#article`,headline:page.title.replace(/ — Terranile$/,''),description:page.description,
      url:`${siteOrigin}${route}`,mainEntityOfPage:`${siteOrigin}${route}`,inLanguage:'en',
      publisher:organization,isPartOf:{'@id':websiteId},
      ...(route==='/research/opex-001/'?{image:[`${siteOrigin}/assets/research/risk-return.png`]}:{})});
  }
  return {'@context':'https://schema.org','@graph':graph};
}
export function serializeStructuredData(value:unknown){
  return JSON.stringify(value).replace(/</g,'\\u003c');
}
