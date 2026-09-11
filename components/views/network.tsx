import { t, type Locale } from '@/lib/i18n';
import { PageIntro, SectionHeading, BreadcrumbData, Note, TextLink } from '@/components/ui';
import { NetworkTopology } from '@/components/network-topology';
import { StatusBadge } from '@/components/status-badge';
import { segments, branches } from '@/lib/content';

export default function Network({ locale = 'pl' }: { locale?: Locale } = {}) {
  return <>
    <BreadcrumbData label="Sieć domowa" path="/network/" locale={locale} />
    <PageIntro label="Sieć domowa" title="Sieć domowa" locale={locale}
      description="Sieć jest planowana pod pracę HomeIntelCore w LAN: serwer ma dostać własny szybki link, a urządzenia domowe mają być rozdzielone według roli. Poniżej znajduje się plan topologii fizycznej i koncepcja segmentacji logicznej. Okablowanie nie zostało jeszcze wykonane, a VLAN-y i reguły firewalla nie są ustalone."
      meta={<dl className="meta-list"><div><dt>Router</dt><dd className="mono">MikroTik RB5009</dd></div><div><dt>Switch</dt><dd className="mono">CRS310-8G+2S+IN</dd></div><div><dt>{t('Link serwera', locale)}</dt><dd className="mono">SFP+</dd></div><div><dt>{t('Stan', locale)}</dt><dd><StatusBadge status="planned" locale={locale} label="Plan" /></dd></div></dl>} />

    <section className="section container" aria-labelledby="topology">
      <SectionHeading id="topology" title="Topologia fizyczna" locale={locale}>{t('Router MikroTik RB5009 łączy się przez patch panel z głównym switchem CRS310-8G+2S+IN. Switch ma osiem portów 2.5G RJ45 i dwa porty SFP+, z których jeden prowadzi do serwera HomeIntelCore / NAS.', locale)}</SectionHeading>
      <NetworkTopology locale={locale} />
    </section>

    <section className="section section-row container" aria-labelledby="segmentation">
      <div className="split split-4-8">
        <div>
          <SectionHeading id="segmentation" title="Segmentacja logiczna" locale={locale} />
          <p>{t('Segmenty porządkują role urządzeń niezależnie od kabli. Nie oznaczają gotowej konfiguracji VLAN ani wdrożonej polityki dostępu, a sam podział nie definiuje dozwolonego ruchu między segmentami.', locale)}</p>
        </div>
        <div className="table-wrap"><table className="segment-table">
          <caption>{t('Koncepcja segmentów sieci', locale)}</caption>
          <thead><tr><th scope="col">{t('Segment', locale)}</th><th scope="col">{t('Rola', locale)}</th><th scope="col">{t('Status', locale)}</th></tr></thead>
          <tbody>{segments.map(s => <tr key={s.name}><th scope="row"><span className="mono">{s.name}</span></th><td data-label={t('Rola', locale)}>{t(s.role, locale)}</td><td data-label={t('Status', locale)}><StatusBadge status="concept" locale={locale} /></td></tr>)}</tbody>
        </table></div>
      </div>
      <Note locale={locale}>{t('Identyfikatory VLAN, podsieci, przypisania portów i reguły firewalla nie zostały jeszcze określone.', locale)}</Note>
    </section>

    <section className="section section-row container" aria-labelledby="cabling">
      <div className="split split-4-8">
        <div>
          <SectionHeading id="cabling" title="Plan okablowania" locale={locale} />
          <p>{t('Plan przewiduje dziewięć zakończeń RJ45 oraz jeden link SFP+ do serwera. CRS310-8G+2S+IN ma osiem portów RJ45, więc jedno zakończenie musi pozostać rezerwą albo zostać obsłużone przez dodatkowy mały switch zarządzalny. Sposób podłączenia routera do switcha wymaga osobnego przypisania portu. Numery portów, moduły SFP+ i medium dla uplinku nie zostały jeszcze określone.', locale)}</p>
        </div>
        <div className="table-wrap"><table className="cabling-table">
          <caption>{t('Planowane zakończenia okablowania', locale)}</caption>
          <thead><tr><th scope="col">{t('Połączenie', locale)}</th><th scope="col">{t('Przeznaczenie', locale)}</th><th scope="col">{t('Pomieszczenie', locale)}</th></tr></thead>
          <tbody>{branches.map((b, i) => <tr key={i} className={b.fast ? 'row-fast' : undefined}>
            <th scope="row"><span className="mono">{b.count ?? 1} × {b.port}</span></th>
            <td data-label={t('Przeznaczenie', locale)}>{t(b.target, locale)}</td>
            <td data-label={t('Pomieszczenie', locale)}>{t(b.room, locale)}</td>
          </tr>)}</tbody>
        </table></div>
      </div>
    </section>

    <section className="section section-row container" aria-labelledby="remote">
      <div className="split split-4-8">
        <SectionHeading id="remote" title="Serwer i dostęp zdalny" locale={locale} />
        <div className="prose">
          <p>{t('HomeIntelCore jest projektowany do pracy w LAN. Link CRS310 → SFP+ → serwer wyróżnia ścieżkę do usług i lokalnych danych, bez deklarowania niezmierzonej przepustowości.', locale)}</p>
          <p>{t('Zdalny dostęp ma być osobną, kontrolowaną warstwą VPN opartą docelowo o WireGuard. Usługi domowe nie są i nie mają być wystawiane publicznie. Konkretna konfiguracja i zasady bezpieczeństwa pozostają elementem wdrożenia.', locale)}</p>
          <TextLink href="/architecture/" locale={locale}>{t('Zobacz usługi na serwerze HomeIntelCore', locale)}</TextLink>
        </div>
      </div>
    </section>
  </>;
}
