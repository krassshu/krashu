import { t, type Locale } from '@/lib/i18n';
import { PageIntro, SectionHeading, BreadcrumbData, Note, TextLink } from '@/components/ui';
import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { TechTable } from '@/components/tech-table';
import { StatusBadge } from '@/components/status-badge';
import { NodeIcon } from '@/components/flow/node-icon';
import type { NodeKind } from '@/lib/graphs';

const coreDuties: [NodeKind, string, string][] = [
  ['core', 'Obiekty i relacje', 'Osoba, dom, pomieszczenie, pojazd, zwierzę, urządzenie, usługa lub organizacja. Pola opisują cechy obiektu, tagi porządkują zbiór, a relacje łączą obiekty ze sobą.'],
  ['user', 'Uprawnienia', 'Dokument mieszkania może być wspólny, a prywatny dokument domownika pozostaje prywatny. Te same zasady mają obowiązywać planowaną warstwę AI.'],
  ['queue', 'Terminy i historia', 'Data końca ubezpieczenia ma znaczenie w kontekście pojazdu. Termin i historia zmian pozostają przy obiekcie, zamiast znikać w nazwach plików.'],
  ['segment', 'Wspólny kontekst', 'Kolejne integracje mają zapisywać informacje w tym samym modelu, żeby nie powstawały osobne silosy dla urządzeń, kamer i energii.'],
];
const integrations: [string, string][] = [
  ['Home Assistant', 'silnik integracji dla urządzeń, scen i rutyn'],
  ['Monitoring / NVR', 'kamery i lokalna rejestracja obrazu'],
  ['Energia', 'falownik, magazyn energii, licznik, ładowarka EV'],
  ['Lokalne AI', 'wyszukiwanie semantyczne i odpowiedzi w kontekście domu'],
];

export default function Architecture({ locale = 'pl' }: { locale?: Locale } = {}) {
  const T = (s: string) => t(s, locale);
  return <>
    <BreadcrumbData label="Architektura" path="/architecture/" locale={locale} />
    <PageIntro label="Architektura" title="Architektura" locale={locale}
      description="HomeIntelCore składa się z własnego Core i kilku wyspecjalizowanych usług uruchamianych razem przez Docker Compose. Ta strona opisuje zależności między nimi w obecnym laboratorium oraz miejsca, w które mają dołączyć planowane integracje. Nie jest specyfikacją portów, uwierzytelniania ani reguł dostępu."
      meta={<dl className="meta-list"><div><dt>{T('Środowisko')}</dt><dd>{T('własny serwer, Docker Compose')}</dd></div><div><dt>{T('Warstwa dokumentów')}</dt><dd className="mono">Paperless-ngx 3.0.4</dd></div><div><dt>{T('Stan')}</dt><dd><StatusBadge status="lab" locale={locale} /></dd></div></dl>} />

    <section className="section-row container">
      <ArchitectureDiagram locale={locale} />
    </section>

    <section className="section container" aria-labelledby="core">
      <SectionHeading id="core" title="Za co odpowiada Core" locale={locale}>{T('Core jest jedynym miejscem, w którym powstaje wspólny kontekst domu. Wyspecjalizowane usługi robią swoje, a Core wiąże ich wyniki z obiektami.')}</SectionHeading>
      <div className="card-grid card-grid-2">{coreDuties.map(([kind, name, text]) => <article key={name} className="card card-secondary"><span className="card-icon" aria-hidden="true"><NodeIcon kind={kind} size={18} /></span><h3>{T(name)}</h3><p>{T(text)}</p></article>)}</div>
    </section>

    <section className="section-row container" aria-labelledby="provider">
      <div className="split split-4-8">
        <SectionHeading id="provider" title="DocumentProvider i praca w tle" locale={locale} />
        <div className="prose">
          <p>{T('Core nie przejmuje zadań systemu dokumentowego. DocumentProvider jest granicą, przez którą HomeIntelCore korzysta z Paperless-ngx: pliki, OCR i wyszukiwanie pełnotekstowe zostają po stronie Paperless, a relacje do osób, pojazdów i urządzeń pozostają częścią modelu domu. Oddzielne bazy PostgreSQL podkreślają ten podział.')}</p>
          <p>{T('Import dokumentów, OCR i przypomnienia trafiają do kolejki zadań zamiast blokować interfejs. Kolejka jest częścią obecnego laboratorium i startuje z tego samego pliku Docker Compose co pozostałe usługi.')}</p>
          <div className="info-strip"><span className="technical-label">{T('GRANICA')}</span><span className="mono">Core → DocumentProvider → Paperless-ngx</span><span>{T('dokument i obiekt pozostają połączone, nie będąc jednym rekordem')}</span></div>
          <TextLink href="/documents/" locale={locale}>{T('Prześledź przykład polisy OC')}</TextLink>
        </div>
      </div>
    </section>

    <section className="section-row container" aria-labelledby="object-engine">
      <div className="split split-4-8">
        <SectionHeading id="object-engine" title="Object Engine" locale={locale} />
        <div className="prose">
          <p>{T('Obiekt nadaje informacjom punkt odniesienia. Zamiast osobnych silosów dla samochodu, osoby i urządzenia powstaje model, w którym można zapisać ich relacje. Toyota Corolla może mieć właściciela będącego osobnym obiektem, a polisa, faktury i instrukcja odnoszą się do tego samego pojazdu, zachowując własną tożsamość dokumentów.')}</p>
          <div className="info-strip"><span className="technical-label">{T('OBIEKT MA')}</span><span className="mono">{T('pola · dokumenty · relacje · tagi · terminy · historię · uprawnienia')}</span></div>
        </div>
      </div>
    </section>

    <section className="section container" aria-labelledby="services">
      <SectionHeading id="services" title="Komponenty i ich status" locale={locale}>{T('Pierwsza grupa działa w aktualnym laboratorium: aplikacja, bazy, usługi pomocnicze i sposób ich uruchomienia. Druga opisuje warstwy planowane, których jeszcze nie zbudowano.')}</SectionHeading>
      <TechTable locale={locale} />
      <Note locale={locale}>{T('„W laboratorium” oznacza komponent uruchomiony w środowisku testowym projektu, a nie gotowy, wdrożony produkt.')}</Note>
    </section>

    <section className="section-row container" aria-labelledby="integrations">
      <SectionHeading id="integrations" title="Planowane integracje" locale={locale}>{T('Każda z tych warstw ma dołączyć do Core przez własną granicę integracji, tak jak dokumenty przez DocumentProvider. WireGuard nie jest integracją aplikacyjną: to planowana warstwa sieciowa, przez którą użytkownik spoza LAN ma trafiać do tego samego wejścia co w domu.')}</SectionHeading>
      <div className="card-grid card-grid-4">{integrations.map(([name, role]) => <article key={name} className="card card-planned"><span className="mono">{T(name)}</span><p>{T(role)}</p><StatusBadge status="planned" locale={locale} /></article>)}</div>
      <TextLink href="/network/" locale={locale}>{T('Zobacz sieć, w której działa serwer')}</TextLink>
    </section>
  </>;
}
