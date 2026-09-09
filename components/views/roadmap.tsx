import { t, localHref, type Locale } from '@/lib/i18n';
import { PageIntro, SectionHeading, BreadcrumbData, Note, TextLink } from '@/components/ui';
import { Roadmap } from '@/components/roadmap';
export default function RoadmapPage({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <>
        <BreadcrumbData label={t("Roadmapa", locale)} path="/roadmap/" locale={locale}/>
        <PageIntro number="04" label={t("Roadmapa", locale)} title={t("System rośnie od fundamentu.", locale)} description={t("Najpierw pamięć domu: obiekty, dokumenty i terminy. Kolejne warstwy mają korzystać z tego samego kontekstu. Roadmapa opisuje kierunek projektu, bez deklarowanych dat wydania.", locale)} locale={locale}/>
        <section className="container section">
            <SectionHeading number="01" label={t("SZEŚĆ ETAPÓW", locale)} title={t("Od pamięci domu do Home Box.", locale)} locale={locale}>{t("Każdy etap opisuje nazwę, zakres i status. Tylko pierwszy z nich jest obecnym zakresem prac.", locale)}</SectionHeading>
            <Roadmap detailed locale={locale}/>
            <Note locale={locale}>{t("„Obecny fundament” oznacza aktualny zakres prac, a nie deklarację gotowego wydania. Etapy oznaczone jako planowane lub dalsza perspektywa nie są prezentowane jako dostępne funkcje.", locale)}</Note>
        </section>
        <section className="container section">
            <SectionHeading number="02" label={t("MVP A WIZJA DOCELOWA", locale)} title={t("Dwa różne poziomy tego samego projektu.", locale)} locale={locale}/>
            <div className="table-wrap"><table>
                <caption>{t("Rozróżnienie między obecnym zakresem a kierunkiem rozwoju", locale)}</caption>
                <thead><tr><th scope="col">{t("Obszar", locale)}</th><th scope="col">{t("Obecny MVP", locale)}</th><th scope="col">{t("Wizja docelowa", locale)}</th></tr></thead>
                <tbody>
                    <tr><th scope="row">{t("Dane", locale)}</th><td>{t("Obiekty, relacje, dokumenty, terminy", locale)}</td><td>{t("Pełny graf wiedzy o domu", locale)}</td></tr>
                    <tr><th scope="row">{t("Dokumenty", locale)}</th><td>{t("Paperless-ngx, OCR, wyszukiwanie", locale)}</td><td>{t("Automatyczne rozpoznawanie i przypisywanie kontekstu", locale)}</td></tr>
                    <tr><th scope="row">{t("Urządzenia", locale)}</th><td>{t("Poza zakresem", locale)}</td><td>{t("Home Assistant jako silnik integracji", locale)}</td></tr>
                    <tr><th scope="row">{t("Monitoring i energia", locale)}</th><td>{t("Poza zakresem", locale)}</td><td>{t("Zdarzenia, kamery i dane energetyczne we wspólnej historii", locale)}</td></tr>
                    <tr><th scope="row">{t("AI", locale)}</th><td>{t("Poza zakresem", locale)}</td><td>{t("Lokalny asystent działający w granicach uprawnień", locale)}</td></tr>
                    <tr><th scope="row">{t("Sprzęt", locale)}</th><td>{t("Własny serwer w homelabie", locale)}</td><td>{t("Home Box jako kompletne urządzenie", locale)}</td></tr>
                </tbody>
            </table></div>
        </section>
        <section className="container section">
            <SectionHeading number="03" label={t("ZAŁOŻENIA ROZWOJU", locale)} title={t("Kontekst pozostaje w Core.", locale)} locale={locale}/>
            <div className="editorial-columns">
                <article><h3>{t("Najpierw użyteczny model", locale)}</h3><p>{t("Dokumenty, obiekty, wyszukiwanie i przypomnienia tworzą wspólną podstawę. Kolejne moduły mają z niej korzystać, zamiast budować własne silosy danych.", locale)}</p></article>
                <article><h3>{t("Integracje jako warstwy", locale)}</h3><p>{t("Home Assistant, monitoring i energia rozszerzają zastosowanie systemu. Nie zmieniają lokalnego modelu w usługę zależną od chmury.", locale)}</p></article>
                <article><h3>{t("Lokalne AI później", locale)}</h3><p>{t("AI pojawia się w planie dopiero po zbudowaniu kontekstu danych. Zakres modeli, wymagania sprzętowe i funkcje nie zostały jeszcze określone.", locale)}</p></article>
            </div>
            <TextLink href={localHref("/documents/", locale)} locale={locale}>{t("Zobacz fundament dokumentowy", locale)}</TextLink>
        </section>
    </>;
}
