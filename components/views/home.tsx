import { t, localHref, type Locale } from '@/lib/i18n';
import { Hero } from '@/components/hero';
import { ObjectEngine } from '@/components/object-engine';
import { IdeaSection, DocumentsSection, ArchitectureSection, NetworkSection, LocalFirst, RoadmapSection } from '@/components/home-sections';
import { siteUrl } from '@/lib/site';
function structuredData(locale: Locale) { return { '@context': 'https://schema.org', '@graph': [
        { '@type': 'WebSite', '@id': `${new URL(localHref('/', locale), siteUrl).href}#website`, url: new URL(localHref('/', locale), siteUrl).href, name: 'HomeOS', inLanguage: locale === 'pl' ? 'pl-PL' : 'en', description: t('Koncepcja i dokumentacja prywatnego systemu zarządzania domem.', locale) },
        { '@type': 'SoftwareApplication', name: 'HomeOS', url: new URL(localHref('/', locale), siteUrl).href, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Self-hosted', description: t('Projekt w rozwoju. Zakres MVP obejmuje obiekty, dokumenty, wyszukiwanie i przypomnienia.', locale) }
    ] }; }
export default function Home({ locale = "pl" }: {
    locale?: Locale;
} = {}) { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)).replace(/</g, '\\u003c') }}/><Hero locale={locale}/><IdeaSection locale={locale}/><ObjectEngine locale={locale}/><DocumentsSection locale={locale}/><ArchitectureSection locale={locale}/><NetworkSection locale={locale}/><LocalFirst locale={locale}/><RoadmapSection locale={locale}/></>; }
