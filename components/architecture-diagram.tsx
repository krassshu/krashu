import { t, type Locale } from '@/lib/i18n';
import { StatusBadge } from './status-badge';

function Node({ name, role, kind, locale }: { name: string; role?: string; kind?: 'core' | 'planned' | 'plain'; locale: Locale }) {
  return <div className={`node${kind === 'core' ? ' node-core' : ''}${kind === 'planned' ? ' node-planned' : ''}`}>
    <strong>{name}</strong>{role ? <span>{t(role, locale)}</span> : null}
  </div>;
}

const planned: [string, string][] = [
  ['Home Assistant', 'urządzenia, sceny, rutyny'],
  ['Monitoring / NVR', 'kamery, lokalna rejestracja'],
  ['Energia', 'falownik, licznik, magazyn'],
  ['Lokalne AI', 'wyszukiwanie semantyczne'],
  ['WireGuard', 'dostęp zdalny'],
];

/**
 * Service dependencies as an HTML/CSS diagram. `compact` is the homepage teaser;
 * the full version adds Caddy, the Docker Compose boundary and node roles.
 */
export function ArchitectureDiagram({ compact = false, locale = 'pl' }: { compact?: boolean; locale?: Locale }) {
  const title = t(compact ? 'Uproszczony schemat zależności HomeIntelCore' : 'Zależności usług HomeIntelCore w obecnym laboratorium', locale);
  return <figure className={`arch${compact ? ' arch-compact' : ''}`} aria-label={title}>
    <div className="diagram-head"><span>{t('ARCHITEKTURA LOGICZNA', locale)}</span><span>{t(compact ? 'skrót' : 'Docker Compose, własny serwer', locale)}</span></div>
    <div className="arch-body">
      <ol className="arch-chain">
        <li><Node name={t('Użytkownik', locale)} locale={locale} /></li>
        {compact ? null : <li><Node name="Caddy" role="reverse proxy w LAN" locale={locale} /></li>}
        <li><Node name="Next.js" role={compact ? undefined : 'interfejs użytkownika'} locale={locale} /></li>
        <li><Node name="Core" role={compact ? 'obiekty, relacje, terminy' : 'model obiektów, relacje, uprawnienia, terminy'} kind="core" locale={locale} /></li>
      </ol>
      <div className="arch-branches" role="list">
        <div className="arch-branch" role="listitem"><Node name="PostgreSQL" role={compact ? 'dane Core' : 'baza Core: obiekty i relacje'} locale={locale} /></div>
        <div className="arch-branch" role="listitem"><Node name={t('Kolejka zadań', locale)} role={compact ? 'praca w tle' : 'import, OCR, przypomnienia'} locale={locale} /></div>
        <div className="arch-branch" role="listitem">
          <Node name="DocumentProvider" role={compact ? 'granica integracji' : 'granica integracji dokumentów'} locale={locale} />
          <ol className="arch-chain arch-sub">
            <li><Node name="Paperless-ngx" role={compact ? 'dokumenty, OCR' : 'dokumenty, OCR, wyszukiwanie pełnotekstowe'} locale={locale} /></li>
          </ol>
          <div className="arch-leaves">
            <Node name="PostgreSQL" role="baza Paperless" locale={locale} />
            <Node name="Gotenberg" role="konwersja plików" locale={locale} />
          </div>
        </div>
      </div>
      <div className="arch-planned">
        <div className="arch-planned-head"><StatusBadge status="planned" locale={locale} /><span>{t('Integracje mają dołączyć do Core i korzystać z tego samego modelu domu.', locale)}</span></div>
        <ul>{planned.map(([name, role]) => <li key={name}><Node name={t(name, locale)} role={compact ? undefined : role} kind="planned" locale={locale} /></li>)}</ul>
      </div>
    </div>
    <figcaption>{t('Użytkownik korzysta z interfejsu Next.js, a interfejs z Core. Core przechowuje model obiektów w PostgreSQL, zleca pracę w tle kolejce zadań i sięga po dokumenty przez DocumentProvider, który łączy go z Paperless-ngx wraz z jego bazą PostgreSQL i usługą Gotenberg. Home Assistant, monitoring, energia, lokalne AI i WireGuard są planowane i nie zostały wdrożone.', locale)}</figcaption>
  </figure>;
}
