import { t, type Locale } from '@/lib/i18n';
import { PageIntro, SectionHeading, BreadcrumbData, Note, TextLink } from '@/components/ui';
import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { TechTable } from '@/components/tech-table';
import { StatusBadge } from '@/components/status-badge';

const coreDuties: [string, string][] = [
  ['Obiekty i relacje', 'Osoba, dom, pomieszczenie, pojazd, zwierzę, urządzenie, usługa lub organizacja. Pola opisują cechy obiektu, tagi porządkują zbiór, a relacje łączą obiekty ze sobą.'],
  ['Uprawnienia', 'Dokument mieszkania może być wspólny, a prywatny dokument domownika pozostaje prywatny. Te same zasady mają obowiązywać planowaną warstwę AI.'],
  ['Terminy i historia', 'Data końca ubezpieczenia ma znaczenie w kontekście pojazdu. Termin i historia zmian pozostają przy obiekcie, zamiast znikać w nazwach plików.'],
  ['Wspólny kontekst', 'Kolejne integracje mają zapisywać informacje w tym samym modelu, żeby nie powstawały osobne silosy dla urządzeń, kamer i energii.'],
];

export default function Architecture({ locale = 'pl' }: { locale?: Locale } = {}) {
  return <>
    <BreadcrumbData label="Architektura" path="/architecture/" locale={locale} />
    <PageIntro label="Architektura" title="Architektura" locale={locale}
      description="HomeIntelCore składa się z własnego Core i kilku wyspecjalizowanych usług uruchamianych razem przez Docker Compose. Ta strona opisuje zależności między nimi w obecnym laboratorium oraz miejsca, w które mają dołączyć planowane integracje. Nie jest specyfikacją portów, uwierzytelniania ani reguł dostępu."
      meta={<dl className="meta-list"><div><dt>{t('Środowisko', locale)}</dt><dd>{t('własny serwer, Docker Compose', locale)}</dd></div><div><dt>{t('Stan', locale)}</dt><dd><StatusBadge status="lab" locale={locale} /></dd></div></dl>} />

    <section className="section container">
      <ArchitectureDiagram locale={locale} />
    </section>

    <section className="section section-row container" aria-labelledby="core">
      <div className="split split-4-8">
        <SectionHeading id="core" title="Za co odpowiada Core" locale={locale} />
        <dl className="principles">{coreDuties.map(([name, text]) => <div key={name}><dt>{t(name, locale)}</dt><dd>{t(text, locale)}</dd></div>)}</dl>
      </div>
    </section>

    <section className="section section-row container" aria-labelledby="provider">
      <div className="split split-4-8">
        <SectionHeading id="provider" title="DocumentProvider" locale={locale} />
        <div className="prose">
          <p>{t('Core nie przejmuje zadań systemu dokumentowego. DocumentProvider jest granicą, przez którą HomeIntelCore korzysta z Paperless-ngx: pliki, OCR i wyszukiwanie pełnotekstowe zostają po stronie Paperless, a relacje do osób, pojazdów i urządzeń pozostają częścią modelu domu.', locale)}</p>
          <p>{t('Oddzielne bazy PostgreSQL podkreślają ten podział. Dokument i obiekt nie muszą być jednym rekordem, żeby pozostawały połączone.', locale)}</p>
          <TextLink href="/documents/" locale={locale}>{t('Prześledź przykład polisy OC', locale)}</TextLink>
        </div>
      </div>
    </section>

    <section className="section section-row container" aria-labelledby="object-engine">
      <div className="split split-4-8">
        <SectionHeading id="object-engine" title="Object Engine" locale={locale} />
        <div className="prose">
          <p>{t('Obiekt nadaje informacjom punkt odniesienia. Zamiast osobnych silosów dla samochodu, osoby i urządzenia powstaje model, w którym można zapisać ich relacje. Toyota Corolla może mieć właściciela będącego osobnym obiektem, a polisa, faktury i instrukcja odnoszą się do tego samego pojazdu, zachowując własną tożsamość dokumentów.', locale)}</p>
          <p className="technical-row"><span className="technical-label">{t('OBIEKT MA', locale)}</span><span className="mono">{t('pola · dokumenty · relacje · tagi · terminy · historię · uprawnienia', locale)}</span></p>
        </div>
      </div>
    </section>

    <section className="section section-row container" aria-labelledby="jobs">
      <div className="split split-4-8">
        <SectionHeading id="jobs" title="Praca w tle" locale={locale} />
        <div className="prose">
          <p>{t('Import dokumentów, OCR i przypomnienia trafiają do kolejki zadań zamiast blokować interfejs. Kolejka jest częścią obecnego laboratorium, a sposób jej uruchomienia opisuje ten sam plik Docker Compose co pozostałe usługi.', locale)}</p>
        </div>
      </div>
    </section>

    <section className="section container" aria-labelledby="services">
      <SectionHeading id="services" title="Usługi i ich status" locale={locale}>{t('Pierwsza grupa działa w aktualnym laboratorium. Druga opisuje integracje planowane, których jeszcze nie zbudowano.', locale)}</SectionHeading>
      <TechTable locale={locale} />
      <Note locale={locale}>{t('„W laboratorium” oznacza usługę uruchomioną w środowisku testowym projektu, a nie gotowy, wdrożony produkt.', locale)}</Note>
    </section>

    <section className="section section-row container" aria-labelledby="integrations">
      <div className="split split-4-8">
        <SectionHeading id="integrations" title="Planowane integracje" locale={locale} />
        <div className="prose">
          <p>{t('Home Assistant ma pełnić rolę silnika integracji dla urządzeń, scen i rutyn. Monitoring i energia mają dostarczać zdarzenia do wspólnej historii domu. Lokalne AI ma korzystać z relacji między danymi, a WireGuard ma być jedyną drogą dostępu spoza LAN. Każda z tych warstw ma dołączyć do Core przez własną granicę integracji, tak jak dokumenty przez DocumentProvider.', locale)}</p>
          <TextLink href="/network/" locale={locale}>{t('Zobacz sieć, w której działa serwer', locale)}</TextLink>
        </div>
      </div>
    </section>
  </>;
}
