import type { Metadata } from 'next';
import { t, localHref, type Locale } from './i18n';
export const siteUrl = new URL(process.env.SITE_URL || 'https://homeos-lokalny-dom.grey-lily-7788.chatgpt.site');
export const indexable = process.env.SITE_INDEXABLE === 'true';
export const routes = [
  { href: '/', label: 'Projekt' },
  { href: '/architecture/', label: 'Architektura' },
  { href: '/network/', label: 'Sieć' },
  { href: '/documents/', label: 'Dokumenty' },
  { href: '/roadmap/', label: 'Roadmapa' },
];
export function pageMetadata(title: string, description: string, path: string, locale: Locale = 'pl'): Metadata {
  const translatedTitle = t(title, locale), translatedDescription = t(description, locale), url = localHref(path, locale);
  return { title: translatedTitle, description: translatedDescription, alternates: { canonical: url, languages: { 'pl-PL': path, en: localHref(path, 'en'), 'x-default': path } },
    openGraph: { title: `${translatedTitle} | HomeIntelCore`, description: translatedDescription, url, siteName: 'HomeIntelCore', locale: locale === 'pl' ? 'pl_PL' : 'en_GB', alternateLocale: locale === 'pl' ? 'en_GB' : 'pl_PL', type: 'website' },
    twitter: { card: 'summary', title: `${translatedTitle} | HomeIntelCore`, description: translatedDescription } };
}
export function rootMetadata(locale: Locale): Metadata {
  const title = locale === 'pl' ? 'HomeIntelCore: jedno lokalne środowisko dla całego domu' : 'HomeIntelCore: one local environment for the whole home';
  const description = locale === 'pl'
    ? 'HomeIntelCore to lokalny, self-hosted system łączący ludzi, obiekty, dokumenty i terminy w jednym modelu domu. Obecny zakres to Home Memory; sterowanie, monitoring, energia i lokalne AI są planowane.'
    : 'HomeIntelCore is a local-first, self-hosted system connecting people, objects, documents and deadlines in one home model. Home Memory is the current scope; control, monitoring, energy and local AI are planned.';
  return { ...pageMetadata(title, description, '/', locale), metadataBase: siteUrl, title: { default: title, template: '%s | HomeIntelCore' }, authors: [{ name: 'HomeIntelCore' }], creator: 'HomeIntelCore', publisher: 'HomeIntelCore', robots: { index: indexable, follow: true, googleBot: { index: indexable, follow: true } } };
}
