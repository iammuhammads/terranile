import 'server-only';
import pageData from '@/generated/pages.json';

export type MarketingPage = {title:string;description:string;body:string;className:string};
export const pages: Record<string,MarketingPage> = pageData;
export const siteOrigin='https://terranile.com';
export function routeFromSegments(segments:string[]=[]){
  return segments.length?'/'+segments.join('/')+'/':'/';
}

export const nativePublicRoutes=['/build/'];
