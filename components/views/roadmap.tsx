import { t, type Locale } from '@/lib/i18n';
import { PageIntro, SectionHeading, BreadcrumbData, Note, TextLink } from '@/components/ui';
import { RoadmapTimeline } from '@/components/roadmap-timeline';
import { StatusBadge } from '@/components/status-badge';
import { autonomyLevels } from '@/lib/content';

const comparison: [string, string, string][] = [
  ['Dane', 'Obiekty, relacje, dokumenty, terminy', 'Pełny graf wiedzy o domu'],
  ['Dokumenty', 'Paperless-ngx, OCR, wyszukiwanie', 'Automatyczne rozpoznawanie i przypisywanie kontekstu'],
  ['Urządzenia', 'Poza zakresem', 'Home Assistant jako silnik integracji'],
  ['Monitoring i energia', 'Poza zakresem', 'Zdarzenia, kamery i dane energetyczne we wspólnej historii'],
  ['AI', 'Poza zakresem', 'Lokalny asystent działający w granicach uprawnień'],
  ['Sprzęt', 'Własny serwer w homelabie', 'Home Box jako kompletne urządzenie'],
];

export default function RoadmapPage({ locale = 'pl' }: { locale?: Locale } = {}) {
  return <>
    <BreadcrumbData label="Roadmapa" path="/roadmap/" locale={locale} />
    <PageIntro label="Roadmapa" title="Roadmapa" locale={locale}
      description="Projekt rośnie od warstwy pamięci domu. Kolejne etapy mają korzystać z tego samego modelu obiektów zamiast budować własne silosy danych. Roadmapa opisuje kierunek, bez dat wydania i bez deklarowanego stopnia ukończenia."
      meta={<dl className="meta-list"><div><dt>{t('Obecny etap', locale)}</dt><dd><span>01 Home Memory</span> <StatusBadge status="active" locale={locale} /></dd></div><div><dt>{t('Etapy', locale)}</dt><dd>6</dd></div><div><dt>{t('Daty', locale)}</dt><dd>{t('nieokreślone', locale)}</dd></div></dl>} />

    <section className="section container" aria-labelledby="stages">
      <SectionHeading id="stages" title="Etapy" locale={locale}>{t('Tylko pierwszy etap jest obecnym zakresem prac. Etapy planowane i dalsza perspektywa nie są dostępnymi funkcjami.', locale)}</SectionHeading>
      <RoadmapTimeline locale={locale} />
    </section>

    <section className="section container" aria-labelledby="mvp">
      <SectionHeading id="mvp" title="Obecny zakres a wizja docelowa" locale={locale} />
      <div className="table-wrap"><table className="compare-table">
        <caption>{t('Rozróżnienie między obecnym zakresem a kierunkiem rozwoju', locale)}</caption>
        <thead><tr><th scope="col">{t('Obszar', locale)}</th><th scope="col">{t('Obecny MVP', locale)}</th><th scope="col">{t('Wizja docelowa', locale)}</th></tr></thead>
        <tbody>{comparison.map(([area, now, later]) => <tr key={area}><th scope="row">{t(area, locale)}</th><td data-label={t('Obecny MVP', locale)}>{t(now, locale)}</td><td data-label={t('Wizja docelowa', locale)}>{t(later, locale)}</td></tr>)}</tbody>
      </table></div>
    </section>

    <section className="section section-row container" aria-labelledby="autonomy">
      <div className="split split-4-8">
        <div>
          <SectionHeading id="autonomy" title="Model uprawnień" locale={locale} />
          <p>{t('Celem nie jest dom robiący cokolwiek bez wiedzy właściciela, lecz kontrolowana autonomia. Automatyzacja ma otrzymywać uprawnienia krok po kroku, a działania o dużych skutkach mają wymagać mocniejszego potwierdzenia.', locale)}</p>
          <p>{t('Przykład docelowej prośby: „Jutro wstaję o 6:30. Przygotuj mi dom rano.” Asystent ma zebrać kontekst, zaproponować plan, uzyskać zgodę, wykonać działanie i zapisać wynik w historii.', locale)}</p>
        </div>
        <ol className="levels">{autonomyLevels.map(([name, text], i) => <li key={name}><span className="mono">{String(i + 1).padStart(2, '0')}</span><div><strong>{t(name, locale)}</strong><span>{t(text, locale)}</span></div></li>)}</ol>
      </div>
      <Note locale={locale}>{t('Poziomy autonomii opisują model uprawnień przyjęty w projekcie. Żaden z nich nie jest zaimplementowany; warstwa sterowania domem należy do planowanych etapów.', locale)}</Note>
    </section>

    <section className="section section-row container" aria-labelledby="assumptions">
      <div className="split split-4-8">
        <SectionHeading id="assumptions" title="Założenia rozwoju" locale={locale} />
        <div className="prose">
          <p>{t('Najpierw użyteczny model: dokumenty, obiekty, wyszukiwanie i przypomnienia tworzą wspólną podstawę, z której mają korzystać kolejne moduły.', locale)}</p>
          <p>{t('Integracje jako warstwy: Home Assistant, monitoring i energia rozszerzają zastosowanie systemu, ale nie zmieniają lokalnego modelu w usługę zależną od chmury.', locale)}</p>
          <p>{t('Lokalne AI później: AI pojawia się w planie dopiero po zbudowaniu kontekstu danych. Zakres modeli, wymagania sprzętowe i funkcje nie zostały jeszcze określone.', locale)}</p>
          <TextLink href="/documents/" locale={locale}>{t('Zobacz fundament dokumentowy', locale)}</TextLink>
        </div>
      </div>
    </section>
  </>;
}
