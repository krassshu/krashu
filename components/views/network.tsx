import { t, type Locale } from '@/lib/i18n';
import { PageIntro, SectionHeading, BreadcrumbData, Note, TextLink } from '@/components/ui';
import { NetworkExplorer } from '@/components/network-topology';
import { StatusBadge } from '@/components/status-badge';
import { NodeIcon } from '@/components/flow/node-icon';
import { segments, branches } from '@/lib/content';

export default function Network({ locale = 'pl' }: { locale?: Locale } = {}) {
  const T = (s: string) => t(s, locale);
  return <>
    <BreadcrumbData label="Sieć domowa" path="/network/" locale={locale} />
    <PageIntro label="Sieć domowa" title="Sieć domowa" locale={locale}
      description="Sieć jest planowana pod pracę HomeIntelCore w LAN: serwer ma dostać własny szybki link, a urządzenia domowe mają być rozdzielone według roli. Poniżej znajduje się plan topologii fizycznej i koncepcja segmentacji logicznej. Okablowanie nie zostało jeszcze wykonane, a VLAN-y i reguły firewalla nie są ustalone."
      meta={<dl className="meta-list"><div><dt>Router</dt><dd className="mono">MikroTik RB5009</dd></div><div><dt>Switch</dt><dd className="mono">CRS310-8G+2S+IN</dd></div><div><dt>{T('Link serwera')}</dt><dd className="mono">SFP+</dd></div><div><dt>{T('Stan')}</dt><dd><StatusBadge status="planned" locale={locale} label="Plan" /></dd></div></dl>} />

    <section className="section-row container" aria-labelledby="topology">
      <h2 id="topology" className="visually-hidden">{T('Topologia')}</h2>
      <NetworkExplorer locale={locale} />
    </section>

    <section className="section container" aria-labelledby="devices">
      <SectionHeading id="devices" title="Urządzenia" locale={locale}>{T('Trzy elementy wyznaczają szkielet sieci. Reszta to zakończenia okablowania w pomieszczeniach.')}</SectionHeading>
      <div className="card-grid card-grid-3">
        <article className="card card-secondary"><span className="card-icon" aria-hidden="true"><NodeIcon kind="router" size={18} /></span><h3>MikroTik RB5009</h3><p className="card-tech mono">RB5009</p><p>{T('Router i brama. Łączy się przez patch panel z głównym switchem; port i medium uplinku nie zostały określone.')}</p><StatusBadge status="planned" locale={locale} label="Plan" /></article>
        <article className="card card-secondary"><span className="card-icon" aria-hidden="true"><NodeIcon kind="switch" size={18} /></span><h3>MikroTik CRS310</h3><p className="card-tech mono">CRS310-8G+2S+IN</p><ul className="card-meta mono"><li>8 × 2.5G RJ45</li><li>2 × SFP+</li></ul><p>{T('Główny switch. Rozprowadza połączenia do pomieszczeń i planowanych punktów dostępowych.')}</p><StatusBadge status="planned" locale={locale} label="Plan" /></article>
        <article className="card card-secondary"><span className="card-icon" aria-hidden="true"><NodeIcon kind="server" size={18} /></span><h3>{T('Serwer HomeIntelCore / NAS')}</h3><p className="card-tech mono">Docker Compose</p><ul className="card-meta mono"><li>SFP+</li><li>{T('Pokój 1')}</li></ul><p>{T('Usługi i lokalne dane. Osobny link SFP+ wyróżnia ścieżkę do serwera, bez deklarowania niezmierzonej przepustowości.')}</p><StatusBadge status="lab" locale={locale} /></article>
      </div>
    </section>

    <section className="section-row container" aria-labelledby="segmentation">
      <div className="split split-4-8">
        <div>
          <SectionHeading id="segmentation" title="Segmentacja" locale={locale} />
          <p>{T('Segmenty porządkują role urządzeń niezależnie od kabli. Nie oznaczają gotowej konfiguracji VLAN ani wdrożonej polityki dostępu, a sam podział nie definiuje dozwolonego ruchu między segmentami.')}</p>
        </div>
        <div className="table-wrap"><table className="segment-table">
          <caption>{T('Koncepcja segmentów sieci')}</caption>
          <thead><tr><th scope="col">{T('Segment')}</th><th scope="col">{T('Rola')}</th><th scope="col">VLAN</th><th scope="col">{T('Status')}</th></tr></thead>
          <tbody>{segments.map(s => <tr key={s.name}><th scope="row"><span className="mono">{s.name}</span></th><td data-label={T('Rola')}>{T(s.role)}</td><td data-label="VLAN" className="mono">{T('nieokreślony')}</td><td data-label={T('Status')}><StatusBadge status="concept" locale={locale} /></td></tr>)}</tbody>
        </table></div>
      </div>
    </section>

    <section className="section-row container" aria-labelledby="security">
      <div className="split split-4-8">
        <SectionHeading id="security" title="Założenia bezpieczeństwa" locale={locale} />
        <div className="prose">
          <p>{T('HomeIntelCore jest projektowany do pracy w LAN. Usługi domowe nie są i nie mają być wystawiane publicznie. Zdalny dostęp ma być osobną, kontrolowaną warstwą VPN opartą docelowo o WireGuard, a konkretna konfiguracja i zasady bezpieczeństwa pozostają elementem wdrożenia.')}</p>
          <div className="info-strip"><span className="technical-label">{T('DOSTĘP SPOZA DOMU')}</span><span className="mono">WireGuard</span><StatusBadge status="planned" locale={locale} /><span>{T('żadna usługa nie jest wystawiona publicznie')}</span></div>
        </div>
      </div>
    </section>

    <section className="section-row container" aria-labelledby="cabling">
      <div className="split split-4-8">
        <div>
          <SectionHeading id="cabling" title="Notatki o okablowaniu" locale={locale} />
          <p>{T('Plan przewiduje dziewięć zakończeń RJ45 oraz jeden link SFP+ do serwera. CRS310-8G+2S+IN ma osiem portów RJ45, więc jedno zakończenie musi pozostać rezerwą albo zostać obsłużone przez dodatkowy mały switch zarządzalny.')}</p>
        </div>
        <div className="table-wrap"><table className="cabling-table">
          <caption>{T('Planowane zakończenia okablowania')}</caption>
          <thead><tr><th scope="col">{T('Połączenie')}</th><th scope="col">{T('Przeznaczenie')}</th><th scope="col">{T('Pomieszczenie')}</th></tr></thead>
          <tbody>{branches.map((b, i) => <tr key={i} className={b.fast ? 'row-fast' : undefined}><th scope="row"><span className="mono">{b.count ?? 1} × {b.port}</span></th><td data-label={T('Przeznaczenie')}>{T(b.target)}</td><td data-label={T('Pomieszczenie')}>{T(b.room)}</td></tr>)}</tbody>
        </table></div>
      </div>
    </section>

    <section className="section-row container" aria-labelledby="open">
      <div className="split split-4-8">
        <SectionHeading id="open" title="Do ustalenia" locale={locale} />
        <div className="prose">
          <ul className="open-list">
            <li>{T('numery portów switcha i przypisanie uplinku z routera')}</li>
            <li>{T('moduły SFP+ i medium dla uplinku')}</li>
            <li>{T('identyfikatory VLAN, podsieci i reguły firewalla')}</li>
            <li>{T('modele planowanych punktów dostępowych')}</li>
            <li>{T('ewentualny dodatkowy mały switch zarządzalny dla dziewiątego zakończenia RJ45')}</li>
          </ul>
          <TextLink href="/architecture/" locale={locale}>{T('Zobacz usługi na serwerze HomeIntelCore')}</TextLink>
        </div>
      </div>
      <Note locale={locale}>{T('To plan okablowania i koncepcja segmentacji, a nie wykonana instalacja.')}</Note>
    </section>
  </>;
}
