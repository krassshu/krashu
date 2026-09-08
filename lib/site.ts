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
 openGraph:{title:`${translatedTitle} | HomeOS`,description:translatedDescription,url,siteName:'HomeOS',locale:locale==='pl'?'pl_PL':'en_GB',alternateLocale:locale==='pl'?'en_GB':'pl_PL',type:'website'},
 twitter:{card:'summary',title:`${translatedTitle} | HomeOS`,description:translatedDescription}};
}
export function rootMetadata(locale:Locale):Metadata {
 const title=locale==='pl'?'HomeOS — lokalny system operacyjny domu':'HomeOS — a local home operating system';
 const description=locale==='pl'?'HomeOS: prywatny system zarządzania domem. Obiekty, dokumenty i terminy połączone na własnym serwerze. Poznaj koncepcję, architekturę i sieć domową.':'HomeOS: a private home management system. Objects, documents and deadlines connected on your own server. Explore the concept, architecture and home network.';
 return {...pageMetadata(title,description,'/',locale),metadataBase:siteUrl,title:{default:title,template:'%s | HomeOS'},authors:[{name:'HomeOS'}],creator:'HomeOS',publisher:'HomeOS',robots:{index:indexable,follow:true,googleBot:{index:indexable,follow:true}}};
}
