import { t, localHref, type Locale } from '@/lib/i18n';
import Link from '@/components/site-link';
import { SectionHeading, Note } from '@/components/ui';
import { StatusBadge } from '@/components/status-badge';
import { HeroSystem } from '@/components/hero-system';
import { StatusPanel } from '@/components/status-panel';
import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { ObjectExplorer } from '@/components/object-explorer';
import { NetworkPreview } from '@/components/network-topology';
import { RoadmapTimeline } from '@/components/roadmap-timeline';
import { objectChains, roadmapStages } from '@/lib/samples';
import { siteUrl } from '@/lib/site';

function structuredData(locale: Locale) {
  const url = new URL(localHref('/', locale), siteUrl).href;
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebSite', '@id': `${url}#website`, url, name: 'HomeIntelCore', inLanguage: locale === 'pl' ? 'pl-PL' : 'en', description: t('Dokumentacja HomeIntelCore, lokalnego systemu dla całego domu.', locale) },
    { '@type': 'SoftwareApplication', name: 'HomeIntelCore', url, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Self-hosted', description: t('Projekt w rozwoju. Obecny zakres Home Memory obejmuje ludzi, domy, obiekty, dokumenty, OCR, wyszukiwanie oraz terminy i przypomnienia. Sterowanie, świadomość, lokalne AI i autonomia są planowanymi etapami.', locale) },
  ] };
}

export default function Home({ locale = 'pl' }: { locale?: Locale } = {}) {
  const T = (s: string) => t(s, locale);
  const modules = [
    { id: 'documents', icon: 'service' as const, label: T('Dokumenty'), status: T('w laboratorium'), note: T('Paperless-ngx, OCR i wyszukiwanie za granicą DocumentProvider. Pierwszy wdrażany moduł.') },
    { id: 'objects', icon: 'core' as const, label: T('Obiekty'), status: T('w laboratorium'), note: T('Osoby, domy, pojazdy, urządzenia i ich relacje w Core, z uprawnieniami i terminami.') },
    { id: 'network', icon: 'switch' as const, label: T('Sieć'), status: T('plan'), note: T('MikroTik RB5009 i CRS310 z osobnym linkiem SFP+ do serwera. Okablowanie jeszcze niewykonane.'), planned: true },
    { id: 'automation', icon: 'ap' as const, label: T('Automatyka'), status: T('planowane'), note: T('Home Assistant jako silnik integracji, sterowanie i rutyny w granicach zgody użytkownika.'), planned: true },
  ];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)).replace(/</g, '\\u003c') }} />

    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span>HomeIntelCore</span><span>{T('Lokalna infrastruktura domowa')}</span></p>
          <h1>{T('Jeden system dla danych, urządzeń i automatyki domowej.')}</h1>
          <p className="lead">{T('HomeIntelCore rozwijam jako lokalną platformę działającą na własnej infrastrukturze. Dokumenty są pierwszym wdrażanym modułem, a kolejne warstwy będą korzystać ze wspólnego modelu domu.')}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href={localHref('/architecture/', locale)}>{T('Zobacz architekturę')}</Link>
            <Link className="button" href={localHref('/network/', locale)}>{T('Topologia sieci')}</Link>
          </div>
          <p className="hero-status"><StatusBadge status="active" locale={locale} /><span><strong>Home Memory</strong> · {T('obecnie w rozwoju, na własnym serwerze')}</span></p>
        </div>
        <HeroSystem core={{ label: 'HomeIntelCore', note: T('model domu, relacje, uprawnienia, terminy') }} modules={modules} caption={T('Core łączy moduły wspólnym modelem domu. Wskaż moduł, żeby zobaczyć jego rolę.')} />
      </div>
    </section>

    <section className="section band container-wide" aria-labelledby="status">
      <div className="container">
        <SectionHeading id="status" title="Obecny system" locale={locale}>{T('Co działa w laboratorium, co jest następne i co pozostaje dalszą perspektywą.')}</SectionHeading>
        <StatusPanel locale={locale} />
      </div>
    </section>

    <section className="section container" aria-labelledby="architecture">
      <SectionHeading id="architecture" title="Architektura" locale={locale} link={{ href: '/architecture/', label: 'Zobacz pełną architekturę' }}>{T('Interfejs Next.js rozmawia z Core. Core przechowuje model obiektów w PostgreSQL, zleca pracę w tle kolejce zadań i korzysta z dokumentów przez DocumentProvider, który łączy go z Paperless-ngx. Kolejne integracje mają dołączać do tego samego modelu.')}</SectionHeading>
      <ArchitectureDiagram compact locale={locale} />
    </section>

    <section className="section container" aria-labelledby="objects">
      <div className="split split-5-7">
        <div>
          <SectionHeading id="objects" title="Object Engine" locale={locale} />
          <p>{T('Podstawową jednostką w Core jest obiekt: osoba, dom, pomieszczenie, pojazd, zwierzę, urządzenie, usługa albo organizacja. Obiekt jest punktem odniesienia dla dokumentów, terminów i relacji, więc system wie, czego dotyczy zapisana informacja, a nie tylko gdzie leży plik.')}</p>
          <p className="technical-row"><span className="technical-label">{T('OBIEKT MA')}</span><span className="mono">{T('pola · dokumenty · relacje · tagi · terminy · historię · uprawnienia')}</span></p>
          <Link className="text-link" href={localHref('/architecture/#object-engine', locale)}>{T('Jak działa model obiektowy')}</Link>
        </div>
        <ObjectExplorer chains={objectChains(locale)} label={T('Typ obiektu')} caption={T('dane przykładowe')} />
      </div>
    </section>

    <section className="section band container-wide" aria-labelledby="network">
      <div className="container">
        <SectionHeading id="network" title="Sieć domowa" locale={locale} link={{ href: '/network/', label: 'Przejdź do topologii sieci' }}>{T('Serwer HomeIntelCore ma pracować w LAN za routerem MikroTik RB5009 i switchem CRS310-8G+2S+IN, z osobnym linkiem SFP+. Sieć jest na etapie planu: okablowanie nie zostało wykonane, a segmentacja jest koncepcją bez ustalonych VLAN-ów.')}</SectionHeading>
        <NetworkPreview locale={locale} />
      </div>
    </section>

    <section className="section container" aria-labelledby="roadmap">
      <SectionHeading id="roadmap" title="Kierunek rozwoju" locale={locale} link={{ href: '/roadmap/', label: 'Zobacz roadmapę' }}>{T('Home Memory jest obecnym zakresem prac. Pozostałe etapy są planowane i nie mają dat ani deklarowanego stopnia ukończenia.')}</SectionHeading>
      <RoadmapTimeline compact stages={roadmapStages(locale)} label={T('Etapy rozwoju projektu')} modulesLabel={T('MODUŁY')} />
    </section>

    <section className="section container" aria-labelledby="principles">
      <h2 id="principles" className="visually-hidden">{T('Założenia projektu')}</h2>
      <div className="principles-strip">
        <div><span className="technical-label">Local-first</span><p>{T('Podstawowe dane domu zostają na własnym serwerze. Internet ma rozszerzać system, a nie być warunkiem jego działania.')}</p></div>
        <div><span className="technical-label">Self-hosted</span><p>{T('Usługi uruchamiane przez Docker Compose w homelabie, za własnym routerem i switchem, bez wystawiania ich publicznie.')}</p></div>
        <div><span className="technical-label">Privacy-first</span><p>{T('Asystent i automatyzacja mają działać tylko w granicach uprawnień osoby, która pyta, za zgodą i z zapisem w historii.')}</p></div>
      </div>
      <Note locale={locale}>{T('Ta strona opisuje projekt i jego stan. Nie implementuje backendu ani importu dokumentów.')}</Note>
    </section>
  </>;
}
