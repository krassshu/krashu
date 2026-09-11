import { t, localHref, type Locale } from '@/lib/i18n';
import Link from '@/components/site-link';
import { SectionHeading, MetaList, Note } from '@/components/ui';
import { StatusBadge } from '@/components/status-badge';
import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { ObjectRelationship } from '@/components/object-relationship';
import { NetworkTopology } from '@/components/network-topology';
import { RoadmapTimeline } from '@/components/roadmap-timeline';
import { siteUrl } from '@/lib/site';

function structuredData(locale: Locale) {
  const url = new URL(localHref('/', locale), siteUrl).href;
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebSite', '@id': `${url}#website`, url, name: 'HomeIntelCore', inLanguage: locale === 'pl' ? 'pl-PL' : 'en', description: t('Dokumentacja HomeIntelCore, lokalnego systemu dla całego domu.', locale) },
    { '@type': 'SoftwareApplication', name: 'HomeIntelCore', url, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Self-hosted', description: t('Projekt w rozwoju. Obecny zakres Home Memory obejmuje ludzi, domy, obiekty, dokumenty, OCR, wyszukiwanie oraz terminy i przypomnienia. Sterowanie, świadomość, lokalne AI i autonomia są planowanymi etapami.', locale) },
  ] };
}

const lab: [string, string][] = [
  ['Core', 'obiekty, relacje, uprawnienia, terminy'],
  ['Next.js', 'interfejs użytkownika'],
  ['PostgreSQL', 'dwie odrębne bazy'],
  ['Kolejka zadań', 'import, OCR, przypomnienia'],
  ['DocumentProvider', 'granica integracji dokumentów'],
  ['Paperless-ngx 3.0.4', 'dokumenty, OCR, wyszukiwanie'],
  ['Gotenberg', 'konwersja plików'],
  ['Caddy', 'reverse proxy w LAN'],
  ['Docker Compose', 'uruchomienie usług'],
];
const planned: [string, string][] = [
  ['Home Assistant', 'urządzenia, sceny, rutyny'],
  ['Monitoring / NVR', 'kamery, lokalna rejestracja'],
  ['Energia', 'falownik, licznik, magazyn, ładowarka EV'],
  ['Lokalne AI', 'wyszukiwanie semantyczne, kontekst'],
  ['WireGuard', 'dostęp zdalny'],
];

const principles: [string, string][] = [
  ['Local-first', 'Podstawowe dane domu, w tym dokumenty, zostają na własnym serwerze. Internet ma rozszerzać możliwości systemu, a nie być warunkiem działania jego podstawowych funkcji.'],
  ['Uprawnienia i zgoda', 'Asystent i automatyzacja mają korzystać tylko z informacji dostępnych osobie, która pyta. Działania automatyczne wymagają wcześniejszej zgody, mają jawne granice i zostawiają zapis w historii. Ten model dotyczy planowanych warstw, nie obecnego zakresu.'],
  ['Dostęp zdalny', 'Usługi domowe nie są wystawiane publicznie. Dostęp spoza domu ma być osobną warstwą VPN opartą docelowo o WireGuard.'],
];

export default function Home({ locale = 'pl' }: { locale?: Locale } = {}) {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)).replace(/</g, '\\u003c') }} />

    <section className="hero container">
      <div className="hero-copy">
        <p className="eyebrow"><span>HomeIntelCore</span><span>{t('Local-first home platform', locale)}</span></p>
        <h1>{t('Jedno lokalne środowisko dla całego domu.', locale)}</h1>
        <p className="lead">{t('HomeIntelCore łączy ludzi, obiekty, dokumenty i terminy w jednym modelu domu, który działa na własnym serwerze. Projekt rozwijam od warstwy Home Memory. Sterowanie urządzeniami, monitoring, energia i lokalne AI są planowane jako kolejne warstwy korzystające z tego samego modelu.', locale)}</p>
        <p>{t('Informacje o domu są zwykle rozproszone: polisa w mailu, instrukcja w folderze, faktura w chmurze, a termin przeglądu w pamięci domownika. Celem projektu jest powiązanie ich z osobą, pojazdem, pomieszczeniem lub urządzeniem, których dotyczą.', locale)}</p>
        <ul className="hero-tags" aria-label={t('Charakter projektu', locale)}>
          <li>Local-first</li><li>Self-hosted</li><li>Privacy-first</li><li>{t('Active development', locale)}</li>
        </ul>
        <div className="hero-actions">
          <Link className="button button-primary" href={localHref('/architecture/', locale)}>{t('Zobacz architekturę', locale)}</Link>
          <Link className="button" href={localHref('/network/', locale)}>{t('Sieć domowa', locale)}</Link>
        </div>
      </div>
      <aside className="hero-meta" aria-label={t('Stan projektu w skrócie', locale)}>
        <MetaList locale={locale} items={[
          ['Etap', <><span>Home Memory</span> <StatusBadge status="active" locale={locale} /></>],
          ['Środowisko', 'własny serwer, Docker Compose'],
          ['Dokumenty', <><span>Paperless-ngx 3.0.4</span> <StatusBadge status="lab" locale={locale} /></>],
          ['Sieć', 'plan homelabu, MikroTik RB5009 i CRS310'],
          ['Dostęp zdalny', <><span>WireGuard</span> <StatusBadge status="planned" locale={locale} /></>],
        ]} />
      </aside>
    </section>

    <section className="section container" aria-labelledby="status">
      <SectionHeading id="status" title="Stan projektu" locale={locale}>{t('Oddzielam to, co działa w laboratorium, od tego, co dopiero planuję. Laboratorium jest środowiskiem testowym projektu na własnym serwerze, nie gotowym produktem.', locale)}</SectionHeading>
      <div className="status-board">
        <div>
          <h3><StatusBadge status="lab" locale={locale} /></h3>
          <ul className="status-list">{lab.map(([name, role]) => <li key={name}><span className="mono">{t(name, locale)}</span><span>{t(role, locale)}</span></li>)}</ul>
        </div>
        <div>
          <h3><StatusBadge status="planned" locale={locale} /></h3>
          <ul className="status-list">{planned.map(([name, role]) => <li key={name}><span className="mono">{t(name, locale)}</span><span>{t(role, locale)}</span></li>)}</ul>
          <h3><StatusBadge status="future" locale={locale} /></h3>
          <ul className="status-list"><li><span className="mono">Home Box</span><span>{t('kompletne urządzenie zamiast własnego serwera', locale)}</span></li></ul>
        </div>
      </div>
    </section>

    <section className="section container" aria-labelledby="architecture">
      <div className="split split-5-7">
        <div>
          <SectionHeading id="architecture" title="Architektura" locale={locale} />
          <p>{t('Interfejs Next.js rozmawia z Core. Core przechowuje model obiektów i relacji w PostgreSQL, zleca pracę w tle kolejce zadań i korzysta z dokumentów przez DocumentProvider, który łączy go z Paperless-ngx.', locale)}</p>
          <p>{t('Kolejne integracje mają dołączać do tego samego modelu domu, a nie tworzyć osobne silosy danych. Ta sama zasada ma dotyczyć Home Assistant, monitoringu i energii.', locale)}</p>
          <Link className="text-link" href={localHref('/architecture/', locale)}>{t('Zobacz pełną architekturę', locale)}</Link>
        </div>
        <ArchitectureDiagram compact locale={locale} />
      </div>
    </section>

    <section className="section container" aria-labelledby="objects">
      <div className="split split-5-7">
        <div>
          <SectionHeading id="objects" title="Object Engine" locale={locale} />
          <p>{t('Podstawową jednostką w Core jest obiekt: osoba, dom, pomieszczenie, pojazd, zwierzę, urządzenie, usługa albo organizacja. Obiekt jest punktem odniesienia dla dokumentów, terminów i relacji. Dzięki temu system wie, czego dotyczy zapisana informacja, a nie tylko gdzie leży plik.', locale)}</p>
          <p className="technical-row"><span className="technical-label">{t('OBIEKT MA', locale)}</span><span className="mono">{t('pola · dokumenty · relacje · tagi · terminy · historię · uprawnienia', locale)}</span></p>
          <Link className="text-link" href={localHref('/architecture/#object-engine', locale)}>{t('Jak działa model obiektowy', locale)}</Link>
        </div>
        <ObjectRelationship locale={locale} />
      </div>
    </section>

    <section className="section container" aria-labelledby="network">
      <SectionHeading id="network" title="Sieć domowa" locale={locale} link={{ href: '/network/', label: 'Przejdź do topologii sieci' }}>{t('Serwer HomeIntelCore ma pracować w LAN za routerem MikroTik RB5009 i switchem CRS310-8G+2S+IN, z osobnym linkiem SFP+. Sieć jest na etapie planu: okablowanie nie zostało wykonane, a segmentacja jest koncepcją bez ustalonych VLAN-ów.', locale)}</SectionHeading>
      <NetworkTopology compact locale={locale} />
    </section>

    <section className="section container" aria-labelledby="principles">
      <div className="split split-4-8">
        <SectionHeading id="principles" title="Założenia projektu" locale={locale} />
        <dl className="principles">{principles.map(([name, text]) => <div key={name}><dt>{t(name, locale)}</dt><dd>{t(text, locale)}</dd></div>)}</dl>
      </div>
    </section>

    <section className="section container" aria-labelledby="roadmap">
      <SectionHeading id="roadmap" title="Kierunek rozwoju" locale={locale} link={{ href: '/roadmap/', label: 'Zobacz roadmapę' }}>{t('Home Memory jest obecnym zakresem prac. Pozostałe etapy są planowane i nie mają dat ani deklarowanego stopnia ukończenia.', locale)}</SectionHeading>
      <RoadmapTimeline compact locale={locale} />
      <Note locale={locale}>{t('Ta strona opisuje projekt i jego stan. Nie implementuje backendu ani importu dokumentów.', locale)}</Note>
    </section>
  </>;
}
