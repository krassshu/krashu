import { t, type Locale } from '@/lib/i18n';
import { branches, segments } from '@/lib/content';
import { StatusBadge } from './status-badge';

/**
 * Physical topology as a tree: upstream chain, then every planned ending from the CRS310.
 * `compact` groups the endings for the homepage; the full tree lives on /network.
 */
export function NetworkTopology({ compact = false, locale = 'pl' }: { compact?: boolean; locale?: Locale }) {
  type Row = { port: string; target: string; room?: string; count?: number; fast?: boolean; planned?: boolean };
  const rows: Row[] = compact
    ? [
      { port: 'SFP+', target: t('Serwer HomeIntelCore / NAS', locale), fast: true },
      { port: 'RJ45', target: t('Komputer i rezerwa w pokoju z serwerem', locale) },
      { port: 'RJ45', target: t('Punkty sieciowe w pokojach i salonie', locale) },
      { port: 'RJ45', target: t('Dwa planowane punkty dostępowe', locale), planned: true },
    ]
    : branches.map(b => ({ port: b.port, target: t(b.target, locale), room: t(b.room, locale), count: b.count, fast: b.fast, planned: b.planned }));
  return <figure className={`topo${compact ? ' topo-compact' : ''}`} aria-label={t('Planowana topologia fizyczna sieci domowej', locale)}>
    <div className="diagram-head"><span>{t('TOPOLOGIA FIZYCZNA', locale)}</span><span>{t('plan okablowania', locale)}</span></div>
    <div className="topo-body">
      <ol className="topo-chain">
        <li><div className="node"><strong>{t('Internet', locale)}</strong></div></li>
        <li><div className="node"><strong>MikroTik RB5009</strong><span>{t('router', locale)}</span></div></li>
        {compact ? null : <li><div className="node"><strong>{t('Patch panel', locale)}</strong></div></li>}
        <li><div className="node node-core"><strong>MikroTik CRS310</strong><span className="mono">CRS310-8G+2S+IN · 8 × 2.5G RJ45 · 2 × SFP+</span></div></li>
      </ol>
      <ul className="topo-branches">
        {rows.map((row, i) => <li key={i} className={row.fast ? 'topo-fast' : undefined}>
          <span className="port mono">{row.count ? `${row.count} × ` : ''}{row.port}</span>
          <span className="topo-target">{row.target}</span>
          {row.room ? <span className="topo-room">{row.room}</span> : null}
          {row.planned ? <StatusBadge status="planned" locale={locale} /> : null}
        </li>)}
      </ul>
    </div>
    {compact
      ? <div className="topo-segments"><span className="technical-label">{t('SEGMENTACJA LOGICZNA', locale)}</span><span>{segments.map(s => s.name).join(' · ')}</span><StatusBadge status="concept" locale={locale} /></div>
      : null}
    <figcaption>{compact
      ? t('Internet prowadzi do routera RB5009, a ten do głównego switcha CRS310. Serwer dostaje osobny link SFP+. Okablowanie nie zostało wykonane, a segmenty są koncepcją bez ustalonych VLAN-ów.', locale)
      : t('Internet prowadzi do routera MikroTik RB5009, a ten przez patch panel do głównego switcha CRS310-8G+2S+IN. Switch rozprowadza połączenia do pomieszczeń i planowanych punktów dostępowych. Osobny link SFP+ łączy switch z serwerem HomeIntelCore / NAS. To plan okablowania, a nie wykonana instalacja.', locale)}</figcaption>
  </figure>;
}
