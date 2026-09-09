import type { Metadata } from 'next';
import { t, localHref, type Locale } from './i18n';
export const siteUrl = new URL(process.env.SITE_URL || 'https://homeos-lokalny-dom.grey-lily-7788.chatgpt.site');
export const indexable = process.env.SITE_INDEXABLE === 'true';
export const routes = [
 { href: '/', label: 'Idea projektu', short: 'Idea' },
 { href: '/architecture/', label: 'Architektura', short: 'Architektura' },
 { href: '/network/', label: 'Sieć domowa', short: 'Sieć' },
 { href: '/documents/', label: 'Dokumenty', short: 'Dokumenty' },
 { href: '/roadmap/', label: 'Roadmapa', short: 'Roadmapa' },
];
export function pageMetadata(title:string,description:string,path:string,locale:Locale='pl'):Metadata {
 const translatedTitle=t(title,locale),translatedDescription=t(description,locale),url=localHref(path,locale);
 return {title:translatedTitle,description:translatedDescription,alternates:{canonical:url,languages:{'pl-PL':path,'en':localHref(path,'en'),'x-default':path}},
 openGraph:{title:`${translatedTitle} | HomeIntelCore`,description:translatedDescription,url,siteName:'HomeIntelCore',locale:locale==='pl'?'pl_PL':'en_GB',alternateLocale:locale==='pl'?'en_GB':'pl_PL',type:'website'},
 twitter:{card:'summary',title:`${translatedTitle} | HomeIntelCore`,description:translatedDescription}};
}
export function rootMetadata(locale:Locale):Metadata {
 const title=locale==='pl'?'HomeIntelCore — prywatna inteligencja całego domu':'HomeIntelCore — a private intelligence for your entire home';
 const description=locale==='pl'?'HomeIntelCore: lokalny, prywatny system łączący ludzi, dokumenty, obiekty, urządzenia, energię i monitoring w jednym kontekście domu. Obecny fundament to Home Memory; kolejne warstwy są kierunkiem rozwoju.':'HomeIntelCore: a local-first, private system connecting people, documents, objects, devices, energy and monitoring in one home context. Home Memory is the current foundation; the remaining layers are the direction of development.';
 return {...pageMetadata(title,description,'/',locale),metadataBase:siteUrl,title:{default:title,template:'%s | HomeIntelCore'},authors:[{name:'HomeIntelCore'}],creator:'HomeIntelCore',publisher:'HomeIntelCore',robots:{index:indexable,follow:true,googleBot:{index:indexable,follow:true}}};
}
