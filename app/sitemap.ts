import type {MetadataRoute} from 'next';
import {pages,siteOrigin} from '@/lib/marketing';
export default function sitemap():MetadataRoute.Sitemap{
  return Object.keys(pages).map(route=>({url:siteOrigin+route}));
}
