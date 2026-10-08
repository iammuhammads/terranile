import type {MetadataRoute} from 'next';
import {pages,siteOrigin,nativePublicRoutes} from '@/lib/marketing';
export default function sitemap():MetadataRoute.Sitemap{
  return [...Object.keys(pages),...nativePublicRoutes].map(route=>({url:siteOrigin+route}));
}
