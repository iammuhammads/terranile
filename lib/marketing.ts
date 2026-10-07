import 'server-only';
import pageData from '@/generated/pages.json';

export type MarketingPage = {title:string;description:string;body:string;className:string};
export const pages: Record<string,MarketingPage> = pageData;
export const siteOrigin=(process.env.SITE_URL||'https://terranile.com').replace(/\/$/,'');
export function routeFromSegments(segments:string[]=[]){
  return segments.length?'/'+segments.join('/')+'/':'/';
}
