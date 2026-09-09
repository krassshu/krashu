import { t, localHref, type Locale } from '@/lib/i18n';
import { PageIntro, SectionHeading, BreadcrumbData, Note, TextLink } from '@/components/ui';
import { NetworkDiagram } from '@/components/network-diagram';
import { Segments } from '@/components/segments';
export default function Network({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <>
        <BreadcrumbData label={t("Sieć domowa", locale)} path="/network/" locale={locale}/>
        <PageIntro number="02" label={t("Sieć domowa", locale)} title={t("Infrastruktura pod własny system.", locale)} description={t("Fizyczne połączenia odpowiadają na pytanie: co i gdzie podłączamy? Segmentacja logiczna opisuje role urządzeń. To dwa osobne widoki tej samej sieci — na razie w formie planu.", locale)} locale={locale}/>
        <section className="container section">
            <SectionHeading number="01" label={t("TOPOLOGIA FIZYCZNA", locale)} title={t("RB5009 i CRS310 jako punkt dystrybucji.", locale)} locale={locale}>{t("Router MikroTik RB5009 łączy się przez patch panel z głównym switchem CRS310-8G+2S+IN. Switch udostępnia osiem portów 2.5G RJ45 oraz dwa porty SFP+, z których jeden prowadzi do serwera HomeIntelCore / NAS.", locale)}</SectionHeading>
            <NetworkDiagram locale={locale}/>
            <Note locale={locale}>{t("To plan okablowania, a nie potwierdzenie wykonanej instalacji. Punkty dostępowe na dole i na górze są planowane. Żadna usługa nie jest wystawiona publicznie.", locale)}</Note>
        </section>
        <section className="container section">
            <SectionHeading number="02" label={t("PLAN PORTÓW", locale)} title={t("Każde połączenie ma przeznaczenie.", locale)} locale={locale}/>
            <div className="table-wrap"><table>
                <caption>{t("Planowane zakończenia okablowania w pomieszczeniach", locale)}</caption>
                <thead><tr><th scope="col">{t("Pomieszczenie", locale)}</th><th scope="col">{t("Połączenie", locale)}</th><th scope="col">{t("Przeznaczenie", locale)}</th></tr></thead>
                <tbody>
                    <tr><th scope="row">{t("Sypialnia", locale)}</th><td>{t("1 × RJ45", locale)}</td><td>{t("Punkt sieciowy", locale)}</td></tr>
                    <tr><th scope="row">{t("Pokój 2", locale)}</th><td>{t("1 × RJ45", locale)}</td><td>{t("Punkt sieciowy", locale)}</td></tr>
                    <tr><th scope="row">{t("Pokój 1", locale)}</th><td>{t("1 × RJ45", locale)}</td><td>{t("Komputer", locale)}</td></tr>
                    <tr className="highlight-row"><th scope="row">{t("Pokój 1", locale)}</th><td>{t("1 × SFP+", locale)}</td><td>{t("Serwer HomeIntelCore / NAS — szybki link", locale)}</td></tr>
                    <tr><th scope="row">{t("Pokój 1", locale)}</th><td>{t("1 × RJ45", locale)}</td><td>{t("Rezerwa lub mały switch zarządzalny", locale)}</td></tr>
                    <tr><th scope="row">{t("Salon", locale)}</th><td>{t("3 × RJ45", locale)}</td><td>{t("TV, konsola, rezerwa", locale)}</td></tr>
                    <tr><th scope="row">{t("AP dół", locale)}</th><td>{t("1 × RJ45", locale)}</td><td>{t("Planowany punkt dostępowy", locale)}</td></tr>
                    <tr><th scope="row">{t("AP góra", locale)}</th><td>{t("1 × RJ45", locale)}</td><td>{t("Planowany punkt dostępowy", locale)}</td></tr>
                </tbody>
            </table></div>
            <p className="body-copy spaced">{t("Łącznie plan przewiduje dziewięć zakończeń RJ45 oraz jeden link SFP+ do serwera. CRS310-8G+2S+IN ma osiem portów RJ45, więc jedno zakończenie musi pozostać rezerwą albo zostać obsłużone przez dodatkowy mały switch zarządzalny. Sposób podłączenia routera do switcha wymaga osobnego przypisania portu. Numery portów, moduły SFP+ i medium dla uplinku nie zostały jeszcze określone.", locale)}</p>
        </section>
        <section className="container section" id="segmentation">
            <SectionHeading number="03" label={t("SEGMENTACJA LOGICZNA", locale)} title={t("Role urządzeń, niezależnie od kabli.", locale)} locale={locale}>{t("Poniższe segmenty porządkują koncepcję sieci. Nie oznaczają gotowej konfiguracji VLAN ani wdrożonej polityki dostępu.", locale)}</SectionHeading>
            <Segments locale={locale}/>
            <Note locale={locale}>{t("Identyfikatory VLAN, podsieci, przypisania portów i reguły firewalla nie zostały jeszcze ostatecznie określone. Sam podział na segmenty nie definiuje dozwolonego ruchu między nimi.", locale)}</Note>
        </section>
        <section className="container section">
            <div className="editorial-columns two">
                <article><h2>{t("Serwer blisko danych", locale)}</h2><p>{t("HomeIntelCore jest projektowany do pracy w LAN. Link CRS310 → SFP+ → serwer wyróżnia ścieżkę do usług i lokalnych danych, bez deklarowania niezmierzonej przepustowości.", locale)}</p></article>
                <article><h2>{t("Dostęp poza domem", locale)}</h2><p>{t("Zdalny dostęp jest osobną, kontrolowaną warstwą VPN, opartą docelowo o WireGuard. Usługi domowe nie są i nie mają być wystawiane publicznie. Konkretna konfiguracja i zasady bezpieczeństwa pozostają elementem wdrożenia.", locale)}</p></article>
            </div>
            <TextLink href={localHref("/architecture/", locale)} locale={locale}>{t("Poznaj usługi na serwerze HomeIntelCore", locale)}</TextLink>
        </section>
    </>;
}
