import { t, type Locale } from '@/lib/i18n';
import { branches, segments } from '@/lib/content';
import { networkPhysicalGraph, networkLogicalGraph } from '@/lib/graphs';
import { FlowFigure } from './flow/flow-figure';
import { StatusBadge } from './status-badge';
import { ModeTabs } from './mode-tabs';

function PhysicalTree({ compact, locale }: { compact: boolean; locale: Locale }) {
  const rows = compact
    ? [{ port: 'SFP+', target: t('Serwer HomeIntelCore / NAS', locale), fast: true }, { port: '2 × RJ45', target: t('Komputer i rezerwa', locale) }, { port: '5 × RJ45', target: t('Punkty sieciowe', locale) }, { port: '2 × RJ45', target: t('2 punkty dostępowe', locale), planned: true }]
    : branches.map(b => ({ port: `${b.count ? `${b.count} × ` : ''}${b.port}`, target: t(b.target, locale), room: t(b.room, locale), fast: b.fast, planned: b.planned }));
  return <div className="topo-body">
    <ol className="topo-chain">
      <li><div className="node"><strong>{t('Internet', locale)}</strong></div></li>
      <li><div className="node"><strong>MikroTik RB5009</strong><span>{t('router', locale)}</span></div></li>
      {compact ? null : <li><div className="node node-passive"><strong>{t('Patch panel', locale)}</strong><span>{t('pasywne okablowanie', locale)} · <span className="mono">PASSIVE</span></span></div></li>}
      <li><div className="node node-core"><strong>MikroTik CRS310</strong><span className="mono">CRS310-8G+2S+IN</span><span>8 × 2.5G RJ45 · 2 × SFP+</span></div></li>
    </ol>
    <ul className="topo-branches">{rows.map((row, i) => <li key={i} className={row.fast ? 'topo-fast' : undefined}>
      <span className="port mono">{row.port}</span><span className="topo-target">{row.target}</span>
      {'room' in row && row.room ? <span className="topo-room">{row.room}</span> : null}
      {row.planned ? <StatusBadge status="planned" locale={locale} /> : null}
    </li>)}</ul>
  </div>;
}

function LogicalTree({ locale }: { locale: Locale }) {
  return <div className="topo-body">
    <ol className="topo-chain"><li><div className="node node-core"><strong>MikroTik RB5009</strong><span>{t('router między segmentami', locale)}</span></div></li></ol>
    <ul className="topo-branches">{segments.map(s => <li key={s.name}><span className="port mono">{s.name}</span><span className="topo-target">{t(s.role, locale)}</span><StatusBadge status="concept" locale={locale} /></li>)}</ul>
  </div>;
}

/** Homepage preview: physical chain only. */
export function NetworkPreview({ locale = 'pl' }: { locale?: Locale }) {
  return <FlowFigure graph={networkPhysicalGraph(true)} locale={locale} className="diagram-compact" title="TOPOLOGIA FIZYCZNA" meta="plan okablowania" ariaLabel="Planowana topologia fizyczna sieci domowej" height={440}
    fallback={<PhysicalTree compact locale={locale} />}
    caption={<>{t('Internet prowadzi do routera RB5009, a ten do głównego switcha CRS310. Serwer dostaje osobny link SFP+, pozostałe zakończenia to porty 2.5G RJ45. Okablowanie nie zostało wykonane.', locale)} <span className="mono">{segments.map(s => s.name).join(' · ')}</span> <StatusBadge status="concept" locale={locale} /></>} />;
}

/** Full page: physical and logical views behind accessible tabs. */
export function NetworkExplorer({ locale = 'pl' }: { locale?: Locale }) {
  const physical = <FlowFigure graph={networkPhysicalGraph(false)} locale={locale} title="TOPOLOGIA FIZYCZNA" meta="plan okablowania" ariaLabel="Planowana topologia fizyczna sieci domowej" height={760}
    fallback={<PhysicalTree compact={false} locale={locale} />}
    caption={t('Internet prowadzi do routera MikroTik RB5009, a ten przez patch panel do głównego switcha CRS310-8G+2S+IN. Patch panel jest elementem pasywnym: tylko zakańcza okablowanie, niczego nie przełącza ani nie routuje. Switch rozprowadza połączenia do pomieszczeń i planowanych punktów dostępowych, a osobny link SFP+ prowadzi do serwera HomeIntelCore / NAS. Numery portów i moduły SFP+ nie zostały określone; przycisk szczegółów przy węźle pokazuje, co jest ustalone.', locale)} />;
  const logical = <FlowFigure graph={networkLogicalGraph()} locale={locale} title="SEGMENTACJA LOGICZNA" meta="koncepcja" ariaLabel="Koncepcja segmentacji logicznej sieci domowej" height={700}
    fallback={<LogicalTree locale={locale} />}
    caption={t('Siedem segmentów porządkuje role urządzeń niezależnie od kabli. Identyfikatory VLAN, podsieci, przypisania portów i reguły firewalla nie zostały jeszcze określone, a sam podział nie definiuje dozwolonego ruchu między segmentami.', locale)} />;
  return <ModeTabs label={t('Widok sieci', locale)} tabs={[{ id: 'physical', label: t('Fizyczna', locale), content: physical }, { id: 'logical', label: t('Logiczna', locale), content: logical }]} />;
}
