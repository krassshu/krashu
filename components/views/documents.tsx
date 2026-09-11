import { t, type Locale } from '@/lib/i18n';
import { PageIntro, SectionHeading, BreadcrumbData, Note, TextLink } from '@/components/ui';
import { DocumentFlow } from '@/components/document-flow';
import { StatusBadge } from '@/components/status-badge';
import { NodeIcon } from '@/components/flow/node-icon';
import { documentSteps } from '@/lib/samples';
import type { NodeKind } from '@/lib/graphs';

const roles: [NodeKind, string, string, string][] = [
  ['service', 'Paperless-ngx', '3.0.4', 'Przechowuje pliki, wykonuje OCR i udostępnia wyszukiwanie pełnotekstowe w treści dokumentów.'],
  ['provider', 'DocumentProvider', 'granica integracji', 'Granica, przez którą Core korzysta z Paperless-ngx. Dokument zostaje powiązany z obiektem HomeIntelCore: polisa odnosi się do pojazdu, a pojazd ma relację z właścicielem.'],
  ['core', 'Core', 'model domu', 'Przechowuje model obiektów, relacje i terminy. Poprawnie zapisany termin może być podstawą przypomnienia.'],
  ['db', 'PostgreSQL', 'dwie bazy', 'Core i Paperless-ngx mają osobne bazy. Dokument i obiekt pozostają połączone, nie będąc jednym rekordem.'],
];

export default function Documents({ locale = 'pl' }: { locale?: Locale } = {}) {
  const T = (s: string) => t(s, locale);
  return <>
    <BreadcrumbData label="Dokumenty" path="/documents/" locale={locale} />
    <PageIntro label="Dokumenty" title="Dokumenty" locale={locale}
      description="Warstwa dokumentowa jest obecnym zakresem Home Memory. Plik trafia do Paperless-ngx, gdzie dostaje OCR i wyszukiwanie, a Core wiąże go z obiektem i terminem. Poniższy przykład pokazuje ten przepływ na polisie OC."
      meta={<dl className="meta-list"><div><dt>{T('Warstwa dokumentowa')}</dt><dd className="mono">Paperless-ngx 3.0.4</dd></div><div><dt>{T('Laboratorium')}</dt><dd>{T('maszyna M3')}</dd></div><div><dt>{T('Stan')}</dt><dd><StatusBadge status="lab" locale={locale} /></dd></div></dl>} />

    <section className="section-row container">
      <DocumentFlow steps={documentSteps(locale)} title={T('PRZEPŁYW DOKUMENTU')} meta={T('zakres Home Memory')} caption={T('Oskar, Toyota Corolla i daty polisy to dane przykładowe. OCR odczytuje tekst; powiązanie z obiektem i termin wymagają poprawnych metadanych. Ta strona nie zawiera działającego importera.')} />
    </section>

    <section className="section container" aria-labelledby="roles">
      <SectionHeading id="roles" title="Kto za co odpowiada" locale={locale}>{T('Cztery elementy obsługują ten przepływ. Każdy ma jedno zadanie i własne miejsce na dane.')}</SectionHeading>
      <div className="card-grid card-grid-2">{roles.map(([kind, name, tech, text]) => <article key={name} className="card card-secondary"><span className="card-icon" aria-hidden="true"><NodeIcon kind={kind} size={18} /></span><h3 className="mono">{name}</h3><p className="mono card-tech">{T(tech)}</p><p>{T(text)}</p></article>)}</div>
    </section>

    <section className="section-row container" aria-labelledby="lab">
      <div className="split split-4-8">
        <SectionHeading id="lab" title="Laboratorium" locale={locale} />
        <div className="prose">
          <p>{T('Laboratorium działa na maszynie M3 i służy do weryfikacji założeń: importu, OCR, wydajności i granicy integracji z Core. Uruchomione laboratorium nie oznacza kompletnego produktu. To środowisko testowe obecnego zakresu Home Memory.')}</p>
          <p>{T('Odczytanie daty ze skanu nie oznacza jeszcze, że jest to data końca ubezpieczenia. Typ dokumentu, obiekt i termin wymagają poprawnego opisania. Projekt nie zakłada, że każdy PDF zostanie bezbłędnie zinterpretowany automatycznie.')}</p>
          <p>{T('Dokumenty pozostają na własnym serwerze. HomeIntelCore dodaje do nich model domu: osoby, pojazdy, urządzenia i relacje, które nadają plikom znaczenie. Faktura może odnosić się jednocześnie do domu, pomieszczenia, urządzenia, zakupu i gwarancji.')}</p>
          <div className="info-strip"><span className="technical-label">{T('OBECNY ZAKRES')}</span><span className="mono">{['Ludzie', 'Domy', 'Obiekty', 'Dokumenty', 'OCR', 'Wyszukiwanie', 'Terminy'].map(T).join(' · ')}</span><StatusBadge status="active" locale={locale} /></div>
          <TextLink href="/architecture/#object-engine" locale={locale}>{T('Zobacz model obiektów')}</TextLink>
        </div>
      </div>
      <Note locale={locale}>{T('Sterowanie, świadomość i lokalne AI pozostają dalszymi etapami roadmapy, a nie częścią obecnej warstwy dokumentowej.')}</Note>
    </section>
  </>;
}
