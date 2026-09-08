import type { MetadataRoute } from 'next';
import { routes, siteUrl, indexable } from '@/lib/site';
import { localHref } from '@/lib/i18n';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap {return indexable ? routes.flatMap(route => (['pl','en'] as const).map(locale => ({url:new URL(localHref(route.href,locale),siteUrl).href,alternates:{languages:{'pl-PL':new URL(route.href,siteUrl).href,en:new URL(localHref(route.href,'en'),siteUrl).href}}}))) : [];}
