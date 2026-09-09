import { t, localHref, type Locale } from '@/lib/i18n';
import { Hero } from '@/components/hero';
import { ObjectEngine } from '@/components/object-engine';
import { IdeaSection, DocumentsSection, ArchitectureSection, NetworkSection, LocalFirst, RoadmapSection } from '@/components/home-sections';
import { VisionPillars, ConciergeSection, AutonomySection, HomeBoxSection } from '@/components/vision-sections';
import { siteUrl } from '@/lib/site';
function structuredData(locale: Locale) { return { '@context': 'https://schema.org', '@graph': [
        { '@type': 'WebSite', '@id': `${new URL(localHref('/', locale), siteUrl).href}#website`, url: new URL(localHref('/', locale), siteUrl).href, name: 'HomeIntelCore', inLanguage: locale === 'pl' ? 'pl-PL' : 'en', description: t('Koncepcja i dokumentacja prywatnej inteligencji całego domu.', locale) },
        { '@type': 'SoftwareApplication', name: 'HomeIntelCore', url: new URL(localHref('/', locale), siteUrl).href, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Self-hosted', description: t('Projekt w rozwoju. Obecny zakres Home Memory obejmuje ludzi, domy, obiekty, dokumenty, OCR, wyszukiwanie oraz terminy i przypomnienia. Sterowanie, świadomość, lokalne AI i autonomia są planowanymi etapami.', locale) }
    ] }; }
export default function Home({ locale = "pl" }: {
    locale?: Locale;
} = {}) { return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)).replace(/</g, '\\u003c') }}/>
    <Hero locale={locale}/>
    <IdeaSection locale={locale}/>
    <VisionPillars locale={locale}/>
    <ObjectEngine locale={locale}/>
    <DocumentsSection locale={locale}/>
    <ConciergeSection locale={locale}/>
    <AutonomySection locale={locale}/>
    <ArchitectureSection locale={locale}/>
    <NetworkSection locale={locale}/>
    <LocalFirst locale={locale}/>
    <HomeBoxSection locale={locale}/>
    <RoadmapSection locale={locale}/>
</>; }
