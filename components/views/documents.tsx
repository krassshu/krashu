import { t, localHref, type Locale } from '@/lib/i18n';
import { PageIntro, SectionHeading, BreadcrumbData, Note, TextLink } from '@/components/ui';
import { DocumentFlow } from '@/components/document-flow';
export default function Documents({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <>
        <BreadcrumbData label={t("Dokumenty", locale)} path="/documents/" locale={locale}/>
        <PageIntro number="03" label={t("Dokumenty", locale)} title={t("Dokument to początek informacji.", locale)} description={t("Zarządzanie dokumentami domowymi wymaga czegoś więcej niż folderu na PDF-y. HomeIntelCore ma łączyć zawartość dokumentu z tym, kogo lub czego on dotyczy. Dokumenty są pamięcią domu.", locale)} locale={locale}/>
        <section className="container section">
            <SectionHeading number="01" label={t("PRZYKŁAD", locale)} title={t("Jedna polisa. Kilka ważnych powiązań.", locale)} locale={locale}>{t("Skan otrzymuje nazwę, typ, powiązanie z pojazdem i datę ważności. Dopiero razem te informacje dają użyteczny kontekst.", locale)}</SectionHeading>
            <DocumentFlow locale={locale}/>
            <Note locale={locale}>{t("Oskar, Toyota Corolla i daty polisy to dane przykładowe. Diagram ilustruje założenia obecnego zakresu, a nie działający importer dokumentów na tej stronie.", locale)}</Note>
        </section>
        <section className="container section">
            <SectionHeading number="02" label={t("AKTUALNE LABORATORIUM", locale)} title={t("Paperless-ngx jako warstwa dokumentowa.", locale)} locale={locale}>{t("Warstwa dokumentowa jest testowana w środowisku laboratoryjnym projektu, zanim stanie się częścią gotowego produktu.", locale)}</SectionHeading>
            <div className="editorial-columns">
                <article><h3>{t("Paperless-ngx 3.0.4", locale)}</h3><p>{t("Wersja uruchomiona w aktualnym laboratorium. Odpowiada za przechowywanie plików, OCR i wyszukiwanie pełnotekstowe w treści dokumentów.", locale)}</p></article>
                <article><h3>{t("Środowisko M3", locale)}</h3><p>{t("Laboratorium działa na maszynie M3 i służy do weryfikacji założeń: importu, OCR, wydajności i granicy integracji z Core.", locale)}</p></article>
                <article><h3>{t("Dane rozdzielone od Core", locale)}</h3><p>{t("Paperless-ngx ma własną bazę PostgreSQL. Core przechowuje model obiektów i relacje w swojej bazie. Dokument i obiekt pozostają połączone, nie będąc jednym rekordem.", locale)}</p></article>
            </div>
            <Note locale={locale}>{t("Uruchomione laboratorium nie oznacza jeszcze kompletnego produktu. To środowisko testowe obecnego zakresu Home Memory.", locale)}</Note>
        </section>
        <section className="container section">
            <SectionHeading number="03" label={t("OBECNY ZAKRES", locale)} title={t("Plik, odczyt, relacja, wyszukiwanie.", locale)} locale={locale}/>
            <ol className="process-list">
                <li><span>01</span><div><h3>{t("Dokument w Paperless-ngx", locale)}</h3><p>{t("Warstwa dokumentowa porządkuje pliki. OCR udostępnia tekst do wyszukiwania, także gdy punktem wyjścia jest skan.", locale)}</p></div></li>
                <li><span>02</span><div><h3>{t("Kontekst w Core", locale)}</h3><p>{t("Dokument zostaje powiązany z obiektem HomeIntelCore przez warstwę DocumentProvider. Polisa odnosi się do pojazdu, a pojazd ma relację z właścicielem.", locale)}</p></div></li>
                <li><span>03</span><div><h3>{t("Dane w PostgreSQL", locale)}</h3><p>{t("Core przechowuje swój model i relacje. Paperless-ngx ma odrębną bazę dla warstwy dokumentowej. Dokument i obiekt nie muszą być jednym rekordem, żeby pozostawały połączone.", locale)}</p></div></li>
                <li><span>04</span><div><h3>{t("Informacja dostępna wtedy, gdy trzeba", locale)}</h3><p>{t("Wyszukiwanie pomaga odnaleźć treść. Powiązania prowadzą do właściwego obiektu. Poprawnie zapisany termin może stanowić podstawę przypomnienia.", locale)}</p></div></li>
            </ol>
        </section>
        <section className="container section">
            <div className="editorial-columns two">
                <article><h2>{t("OCR nie zastępuje kontekstu", locale)}</h2><p>{t("Odczytanie daty ze skanu nie oznacza jeszcze, że jest to data końca ubezpieczenia. Typ dokumentu, obiekt i termin wymagają poprawnego opisania. Projekt nie zakłada, że każdy PDF zostanie bezbłędnie zinterpretowany automatycznie.", locale)}</p></article>
                <article><h2>{t("Prywatny cyfrowy segregator", locale)}</h2><p>{t("Dokumenty pozostają na własnym serwerze. HomeIntelCore dodaje do nich model domu: osoby, pojazdy, urządzenia i relacje, które nadają plikom znaczenie. Faktura może odnosić się jednocześnie do domu, pomieszczenia, urządzenia, zakupu i gwarancji.", locale)}</p></article>
            </div>
            <TextLink href={localHref("/architecture/#object-engine", locale)} locale={locale}>{t("Zobacz model obiektów", locale)}</TextLink>
        </section>
        <section className="container section">
            <SectionHeading number="04" label={t("CO DALEJ", locale)} title={t("Fundament pod kolejne warstwy.", locale)} locale={locale}>{t("Ludzie, domy, obiekty, dokumenty, OCR, wyszukiwanie oraz terminy i przypomnienia tworzą etap Home Memory. Sterowanie, świadomość i lokalne AI pozostają dalszymi etapami, a nie obecną funkcją OCR.", locale)}</SectionHeading>
            <TextLink href={localHref("/roadmap/", locale)} locale={locale}>{t("Sprawdź rozdzielenie MVP i planów", locale)}</TextLink>
        </section>
    </>;
}
