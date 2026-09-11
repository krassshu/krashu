import { t, type Locale } from '@/lib/i18n';
import { architectureGraph } from '@/lib/graphs';
import { FlowFigure } from './flow/flow-figure';
import { StatusBadge } from './status-badge';

function Node({ name, role, kind, locale }: { name: string; role?: string; kind?: 'core' | 'planned'; locale: Locale }) {
  return <div className={`node${kind === 'core' ? ' node-core' : ''}${kind === 'planned' ? ' node-planned' : ''}`}><strong>{name}</strong>{role ? <span>{t(role, locale)}</span> : null}</div>;
}

/** Vertical HTML tree used under 768px, where an interactive canvas would be too small to read. */
function ArchitectureTree({ compact, locale }: { compact: boolean; locale: Locale }) {
  return <div className="arch-body">
    {compact ? null : <div className="arch-entry">
      <Node name={t('Użytkownik', locale)} role="w sieci domowej" locale={locale} />
      <div className="arch-entry-remote">
        <Node name={t('Użytkownik zdalny', locale)} role="spoza LAN" locale={locale} />
        <span className="arch-entry-link" aria-hidden="true" />
        <Node name="WireGuard" role="VPN, wejście do LAN, planowane" kind="planned" locale={locale} />
      </div>
    </div>}
    <ol className="arch-chain">
      {compact ? <li><Node name={t('Użytkownik', locale)} locale={locale} /></li> : <li><Node name="Caddy" role="reverse proxy w LAN" locale={locale} /></li>}
      <li><Node name="Next.js" role="interfejs użytkownika" locale={locale} /></li>
      <li><Node name="Core" role="obiekty, relacje, uprawnienia, terminy" kind="core" locale={locale} /></li>
    </ol>
    <div className="arch-branches">
      <div className="arch-branch"><Node name="PostgreSQL" role="dane Core" locale={locale} /></div>
      <div className="arch-branch"><Node name={t('Kolejka zadań', locale)} role="praca w tle" locale={locale} /></div>
      <div className="arch-branch">
        <Node name="DocumentProvider" role="granica integracji" locale={locale} />
        <ol className="arch-chain arch-sub"><li><Node name="Paperless-ngx" role="dokumenty, OCR" locale={locale} /></li></ol>
        <div className="arch-leaves"><Node name="PostgreSQL" role="baza Paperless" locale={locale} /><Node name="Gotenberg" role="konwersja plików" locale={locale} /></div>
      </div>
    </div>
    <div className="arch-planned">
      <div className="arch-planned-head"><StatusBadge status="planned" locale={locale} /></div>
      <ul>{['Home Assistant', 'Monitoring / NVR', 'Energia', 'Lokalne AI'].map(name => <li key={name}><Node name={t(name, locale)} kind="planned" locale={locale} /></li>)}</ul>
    </div>
  </div>;
}

export function ArchitectureDiagram({ compact = false, locale = 'pl' }: { compact?: boolean; locale?: Locale }) {
  return <FlowFigure graph={architectureGraph(compact)} locale={locale} className={compact ? 'diagram-compact' : undefined}
    title="ARCHITEKTURA LOGICZNA" meta={compact ? 'skrót' : 'Docker Compose, własny serwer'}
    ariaLabel={compact ? 'Uproszczony schemat zależności HomeIntelCore' : 'Zależności usług HomeIntelCore w obecnym laboratorium'}
    height={compact ? 600 : 760}
    fallback={<ArchitectureTree compact={compact} locale={locale} />}
    caption={t(compact
      ? 'Najedź na węzeł albo ustaw na nim fokus, żeby zobaczyć jego bezpośrednie zależności. Home Assistant, monitoring, energia i lokalne AI są planowane.'
      : 'Użytkownik w sieci domowej korzysta z interfejsu Next.js za Caddy, a interfejs z Core. Użytkownik spoza LAN ma docelowo wchodzić przez WireGuard do sieci domowej i dalej tą samą ścieżką; WireGuard jest warstwą sieciową, nie integracją Core. Core przechowuje model obiektów w PostgreSQL, zleca pracę w tle kolejce zadań i sięga po dokumenty przez DocumentProvider, który łączy go z Paperless-ngx wraz z jego bazą PostgreSQL i usługą Gotenberg. Home Assistant, monitoring, energia i lokalne AI są planowanymi integracjami.', locale)} />;
}
