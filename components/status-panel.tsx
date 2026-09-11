import { t, type Locale } from '@/lib/i18n';
import { StatusBadge } from './status-badge';
import { milestones } from '@/lib/content';

const running: [string, string][] = [
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
const strip = ['Next.js', 'PostgreSQL', 'Paperless-ngx', 'Docker Compose', 'Caddy', 'Gotenberg', 'MikroTik'];

/** Current stack on the left, the next stage on the right. Reads like an infrastructure dashboard, says only what the lab has. */
export function StatusPanel({ locale = 'pl' }: { locale?: Locale }) {
  const next = milestones[1], future = milestones[milestones.length - 1];
  return <div className="status-panel">
    <div className="status-card status-card-current">
      <div className="status-card-head">
        <div><span className="technical-label">{t('OBECNY ETAP', locale)}</span><h3>Home Memory</h3></div>
        <StatusBadge status="active" locale={locale} />
      </div>
      <ul className="status-rows">{running.map(([name, role]) => <li key={name}><span className="mono">{t(name, locale)}</span><span className="status-rows-role">{t(role, locale)}</span><span className="status-rows-state status-lab"><span className="status-dot" aria-hidden="true" />{t('lab', locale)}</span></li>)}</ul>
      <p className="status-card-foot">{t('Usługi uruchomione w laboratorium projektu na własnym serwerze. To środowisko testowe, nie wdrożony produkt.', locale)}</p>
    </div>
    <div className="status-side">
      <div className="status-card">
        <div className="status-card-head">
          <div><span className="technical-label">{t('NASTĘPNY ETAP', locale)}</span><h3>{next.name}</h3></div>
          <StatusBadge status="planned" locale={locale} />
        </div>
        <p className="mono status-modules">{next.features.map(f => t(f, locale)).join(' · ')}</p>
        <p>{t('Home Assistant jako silnik integracji, HomeIntelCore jako jedna aplikacja do domu. Bez dat i bez deklarowanego stopnia ukończenia.', locale)}</p>
      </div>
      <div className="status-card status-card-future">
        <div className="status-card-head">
          <div><span className="technical-label">{t('DALSZA PERSPEKTYWA', locale)}</span><h3>{future.name}</h3></div>
          <StatusBadge status="future" locale={locale} />
        </div>
        <p>{t('Kompletne urządzenie zamiast własnego serwera. Sprzęt, wydajność i dystrybucja pozostają do zweryfikowania.', locale)}</p>
      </div>
    </div>
    <div className="stack-strip" aria-label={t('Stos technologiczny', locale)}>
      <span className="technical-label">{t('STOS', locale)}</span>
      {strip.map(s => <span key={s} className="mono">{s}</span>)}
    </div>
  </div>;
}
