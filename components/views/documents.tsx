import { t, type Locale } from '@/lib/i18n';
import { PageIntro, SectionHeading, BreadcrumbData, Note, TextLink } from '@/components/ui';
import { DocumentFlow } from '@/components/document-flow';
import { StatusBadge } from '@/components/status-badge';

const roles: [string, string][] = [
  ['Paperless-ngx', 'Przechowuje pliki, wykonuje OCR i udostępnia wyszukiwanie pełnotekstowe w treści dokumentów. W laboratorium działa wersja 3.0.4.'],
  ['DocumentProvider', 'Granica, przez którą Core korzysta z Paperless-ngx. Dokument zostaje powiązany z obiektem HomeIntelCore: polisa odnosi się do pojazdu, a pojazd ma relację z właścicielem.'],
  ['Core', 'Przechowuje model obiektów, relacje i terminy. Poprawnie zapisany termin może być podstawą przypomnienia.'],
  ['PostgreSQL', 'Core i Paperless-ngx mają osobne bazy. Dokument i obiekt pozostają połączone, nie będąc jednym rekordem.'],
];

export default function Documents({ locale = 'pl' }: { locale?: Locale } = {}) {
  return <>
    <BreadcrumbData label="Dokumenty" path="/documents/" locale={locale} />
    <PageIntro label="Dokumenty" title="Dokumenty" locale={locale}
      description="Warstwa dokumentowa jest obecnym zakresem Home Memory. Plik trafia do Paperless-ngx, gdzie dostaje OCR i wyszukiwanie, a Core wiąże go z obiektem i terminem. Poniższy przykład pokazuje ten przepływ na polisie OC."
      meta={<dl className="meta-list"><div><dt>{t('Warstwa dokumentowa', locale)}</dt><dd className="mono">Paperless-ngx 3.0.4</dd></div><div><dt>{t('Laboratorium', locale)}</dt><dd>{t('maszyna M3', locale)}</dd></div><div><dt>{t('Stan', locale)}</dt><dd><StatusBadge status="lab" locale={locale} /></dd></div></dl>} />

    <section className="section container">
      <DocumentFlow locale={locale} />
    </section>

    <section className="section section-row container" aria-labelledby="roles">
      <div className="split split-4-8">
        <div>
          <SectionHeading id="roles" title="Kto za co odpowiada" locale={locale} />
          <p>{t('Cztery elementy obsługują ten przepływ. Każdy ma jedno zadanie i własne miejsce na dane.', locale)}</p>
        </div>
        <dl className="principles">{roles.map(([name, text]) => <div key={name}><dt className="mono">{name}</dt><dd>{t(text, locale)}</dd></div>)}</dl>
      </div>
    </section>

    <section className="section section-row container" aria-labelledby="lab">
      <div className="split split-4-8">
        <SectionHeading id="lab" title="Laboratorium" locale={locale} />
        <div className="prose">
          <p>{t('Laboratorium działa na maszynie M3 i służy do weryfikacji założeń: importu, OCR, wydajności i granicy integracji z Core. Uruchomione laboratorium nie oznacza kompletnego produktu. To środowisko testowe obecnego zakresu Home Memory.', locale)}</p>
          <p>{t('Odczytanie daty ze skanu nie oznacza jeszcze, że jest to data końca ubezpieczenia. Typ dokumentu, obiekt i termin wymagają poprawnego opisania. Projekt nie zakłada, że każdy PDF zostanie bezbłędnie zinterpretowany automatycznie.', locale)}</p>
          <p>{t('Dokumenty pozostają na własnym serwerze. HomeIntelCore dodaje do nich model domu: osoby, pojazdy, urządzenia i relacje, które nadają plikom znaczenie. Faktura może odnosić się jednocześnie do domu, pomieszczenia, urządzenia, zakupu i gwarancji.', locale)}</p>
          <TextLink href="/architecture/#object-engine" locale={locale}>{t('Zobacz model obiektów', locale)}</TextLink>
        </div>
      </div>
      <Note locale={locale}>{t('Sterowanie, świadomość i lokalne AI pozostają dalszymi etapami roadmapy, a nie częścią obecnej warstwy dokumentowej.', locale)}</Note>
    </section>
  </>;
}
