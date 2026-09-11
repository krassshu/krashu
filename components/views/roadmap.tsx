import { t, type Locale } from '@/lib/i18n';
import { PageIntro, SectionHeading, BreadcrumbData, Note, TextLink } from '@/components/ui';
import { RoadmapTimeline } from '@/components/roadmap-timeline';
import { StatusBadge } from '@/components/status-badge';
import { autonomyLevels } from '@/lib/content';
import { roadmapStages } from '@/lib/samples';

const comparison: [string, string, string][] = [
  ['Dane', 'Obiekty, relacje, dokumenty, terminy', 'Pełny graf wiedzy o domu'],
  ['Dokumenty', 'Paperless-ngx, OCR, wyszukiwanie', 'Automatyczne rozpoznawanie i przypisywanie kontekstu'],
  ['Urządzenia', 'Poza zakresem', 'Home Assistant jako silnik integracji'],
  ['Monitoring i energia', 'Poza zakresem', 'Zdarzenia, kamery i dane energetyczne we wspólnej historii'],
  ['AI', 'Poza zakresem', 'Lokalny asystent działający w granicach uprawnień'],
  ['Sprzęt', 'Własny serwer w homelabie', 'Home Box jako kompletne urządzenie'],
];

export default function RoadmapPage({ locale = 'pl' }: { locale?: Locale } = {}) {
  const T = (s: string) => t(s, locale);
  return <>
    <BreadcrumbData label="Roadmapa" path="/roadmap/" locale={locale} />
    <PageIntro label="Roadmapa" title="Roadmapa" locale={locale}
      description="Projekt rośnie od warstwy pamięci domu. Kolejne etapy mają korzystać z tego samego modelu obiektów zamiast budować własne silosy danych. Roadmapa opisuje kierunek, bez dat wydania i bez deklarowanego stopnia ukończenia."
      meta={<dl className="meta-list"><div><dt>{T('Obecny etap')}</dt><dd><span>01 Home Memory</span> <StatusBadge status="active" locale={locale} /></dd></div><div><dt>{T('Następny')}</dt><dd><span>02 Home Control</span> <StatusBadge status="planned" locale={locale} /></dd></div><div><dt>{T('Daty')}</dt><dd>{T('nieokreślone')}</dd></div></dl>} />

    <section className="section-row container" aria-labelledby="stages">
      <h2 id="stages" className="visually-hidden">{T('Etapy')}</h2>
      <RoadmapTimeline stages={roadmapStages(locale)} label={T('Etapy rozwoju projektu')} modulesLabel={T('MODUŁY')} />
      <Note locale={locale}>{T('Tylko pierwszy etap jest obecnym zakresem prac. Etapy planowane i dalsza perspektywa nie są dostępnymi funkcjami.')}</Note>
    </section>

    <section className="section container" aria-labelledby="mvp">
      <SectionHeading id="mvp" title="Obecny zakres a wizja docelowa" locale={locale} />
      <div className="table-wrap"><table className="compare-table">
        <caption>{T('Rozróżnienie między obecnym zakresem a kierunkiem rozwoju')}</caption>
        <thead><tr><th scope="col">{T('Obszar')}</th><th scope="col">{T('Obecny MVP')}</th><th scope="col">{T('Wizja docelowa')}</th></tr></thead>
        <tbody>{comparison.map(([area, now, later]) => <tr key={area}><th scope="row">{T(area)}</th><td data-label={T('Obecny MVP')}>{T(now)}</td><td data-label={T('Wizja docelowa')}>{T(later)}</td></tr>)}</tbody>
      </table></div>
    </section>

    <section className="section-row container" aria-labelledby="autonomy">
      <div className="split split-4-8">
        <div>
          <SectionHeading id="autonomy" title="Model uprawnień" locale={locale} />
          <p>{T('Celem nie jest dom robiący cokolwiek bez wiedzy właściciela, lecz kontrolowana autonomia. Automatyzacja ma otrzymywać uprawnienia krok po kroku, a działania o dużych skutkach mają wymagać mocniejszego potwierdzenia.')}</p>
          <p>{T('Przykład docelowej prośby: „Jutro wstaję o 6:30. Przygotuj mi dom rano.” Asystent ma zebrać kontekst, zaproponować plan, uzyskać zgodę, wykonać działanie i zapisać wynik w historii.')}</p>
        </div>
        <ol className="levels card">{autonomyLevels.map(([name, text], i) => <li key={name}><span className="mono">{String(i + 1).padStart(2, '0')}</span><div><strong>{T(name)}</strong><span>{T(text)}</span></div></li>)}</ol>
      </div>
      <Note locale={locale}>{T('Poziomy autonomii opisują model uprawnień przyjęty w projekcie. Żaden z nich nie jest zaimplementowany; warstwa sterowania domem należy do planowanych etapów.')}</Note>
    </section>

    <section className="section-row container" aria-labelledby="assumptions">
      <div className="split split-4-8">
        <SectionHeading id="assumptions" title="Założenia rozwoju" locale={locale} />
        <div className="prose">
          <p>{T('Najpierw użyteczny model: dokumenty, obiekty, wyszukiwanie i przypomnienia tworzą wspólną podstawę, z której mają korzystać kolejne moduły.')}</p>
          <p>{T('Integracje jako warstwy: Home Assistant, monitoring i energia rozszerzają zastosowanie systemu, ale nie zmieniają lokalnego modelu w usługę zależną od chmury.')}</p>
          <p>{T('Lokalne AI później: AI pojawia się w planie dopiero po zbudowaniu kontekstu danych. Zakres modeli, wymagania sprzętowe i funkcje nie zostały jeszcze określone.')}</p>
          <TextLink href="/documents/" locale={locale}>{T('Zobacz fundament dokumentowy')}</TextLink>
        </div>
      </div>
    </section>
  </>;
}
