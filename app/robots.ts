import type { MetadataRoute } from 'next';
import { siteUrl, indexable } from '@/lib/site';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
 return {rules: indexable ? {userAgent:'*',allow:'/',disallow:['/api/','/admin/','/test/','/staging/']} : {userAgent:'*',disallow:'/'}, ...(indexable ? {sitemap:new URL('/sitemap.xml',siteUrl).href} : {})};
}
