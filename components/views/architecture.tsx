import { t, localHref, type Locale } from '@/lib/i18n';
import { PageIntro, SectionHeading, BreadcrumbData, Note, TextLink } from '@/components/ui';
import { ArchitectureDiagram } from '@/components/architecture-diagram';
const stack: [string, string, string, string][] = [
    ['Next.js', 'Interfejs użytkownika', 'Warstwa prezentacji łącząca użytkownika z Core. Docelowo jedna aplikacja do całego domu.', 'lab'],
    ['Caddy', 'Wejście do systemu', 'Reverse proxy kierujący ruch do interfejsu w obrębie sieci domowej.', 'lab'],
    ['Core', 'Model domu', 'Odpowiada za obiekty, ich relacje, uprawnienia oraz terminy. To tutaj powstaje wspólny kontekst domu.', 'lab'],
    ['PostgreSQL', 'Dwie odrębne bazy', 'Core i Paperless-ngx przechowują dane we własnych bazach. Podział jest celowy i utrzymywany.', 'lab'],
    ['Kolejka zadań', 'Praca w tle', 'Import dokumentów, OCR i przypomnienia trafiają do kolejki zamiast blokować interfejs.', 'lab'],
    ['Paperless-ngx', 'DocumentProvider', 'Warstwa dokumentowa udostępniana Core przez granicę DocumentProvider. Wersja 3.0.4 w aktualnym laboratorium.', 'lab'],
    ['Gotenberg', 'Konwersja', 'Usługa konwersji dokumentów wykorzystywana przez Paperless-ngx.', 'lab'],
    ['Docker Compose', 'Uruchomienie', 'Opisuje wspólne środowisko usług na serwerze HomeIntelCore.', 'lab'],
    ['Home Assistant', 'Silnik integracji', 'Planowana integracja ze Smart Home: urządzenia, sceny i rutyny pod wspólnym interfejsem.', 'planned'],
    ['Monitoring / NVR', 'Kamery', 'Planowana warstwa rejestracji obrazu, analizowana lokalnie tam, gdzie to możliwe.', 'planned'],
    ['Energia', 'Fotowoltaika i liczniki', 'Planowane źródło danych: falownik, magazyn energii, licznik i ładowarka EV.', 'planned'],
    ['Lokalne AI', 'Warstwa rozumowania', 'Planowane wyszukiwanie semantyczne i odpowiedzi w kontekście domu. Modele i sprzęt nieokreślone.', 'planned'],
    ['WireGuard', 'Dostęp zdalny', 'Planowana, kontrolowana warstwa VPN. Usługi nie są wystawiane publicznie.', 'planned'],
];
export default function Architecture({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <>
        <BreadcrumbData label={t("Architektura", locale)} path="/architecture/" locale={locale}/>
        <PageIntro number="01" label={t("Architektura", locale)} title={t("Jeden Core. Jasne granice odpowiedzialności.", locale)} description={t("HomeIntelCore łączy własny model domu z wyspecjalizowanymi usługami. Ta architektura opisuje docelowe zależności systemu, a nie backend strony prezentacyjnej.", locale)} locale={locale}/>
        <section className="container section">
            <SectionHeading number="01" label={t("PRZEPŁYW", locale)} title={t("Od użytkownika do danych.", locale)} locale={locale}/>
            <ArchitectureDiagram locale={locale}/>
            <Note locale={locale}>{t("Diagram pokazuje zależności usług. Nie jest specyfikacją portów, uwierzytelniania ani reguł dostępu.", locale)}</Note>
        </section>
        <section className="container section" id="object-engine">
            <SectionHeading number="02" label={t("OBJECT ENGINE", locale)} title={t("Wspólny język dla danych domu.", locale)} locale={locale}>{t("Obiekt nadaje informacjom punkt odniesienia. Zamiast osobnych silosów dla samochodu, osoby i urządzenia powstaje model, w którym można zapisać ich relacje.", locale)}</SectionHeading>
            <div className="editorial-columns">
                <article><h3>{t("Tożsamość i pola", locale)}</h3><p>{t("Obiekt reprezentuje osobę, dom, pomieszczenie, pojazd, urządzenie, zwierzę, usługę lub organizację. Pola opisują jego cechy, a tagi pomagają organizować zbiór.", locale)}</p></article>
                <article><h3>{t("Relacje i dokumenty", locale)}</h3><p>{t("Toyota Corolla może mieć właściciela będącego osobnym obiektem. Polisa, faktury i instrukcja odnoszą się do tego samego pojazdu, zachowując własną tożsamość dokumentów.", locale)}</p></article>
                <article><h3>{t("Terminy i historia", locale)}</h3><p>{t("Data końca ubezpieczenia ma znaczenie w kontekście pojazdu. Termin i historia zmian pozostają przy obiekcie, zamiast znikać w nazwach plików.", locale)}</p></article>
                <article><h3>{t("Uprawnienia i zgoda", locale)}</h3><p>{t("Dokument mieszkania może być wspólny, a prywatny dokument domownika pozostaje prywatny. Te same zasady mają obowiązywać planowaną warstwę AI, a historia działań ma pokazywać, co i dlaczego się wydarzyło.", locale)}</p></article>
            </div>
            <TextLink href={localHref("/documents/", locale)} locale={locale}>{t("Prześledź przykład polisy OC", locale)}</TextLink>
        </section>
        <section className="container section">
            <SectionHeading number="03" label={t("TECHNOLOGY STACK", locale)} title={t("Każda usługa ma swoje zadanie.", locale)} locale={locale}>{t("Pierwsza grupa działa w aktualnym laboratorium. Druga opisuje warstwy planowane, których jeszcze nie wdrożono.", locale)}</SectionHeading>
            <div className="stack-table">{stack.map(([name, role, desc, status]) => <article key={name}>
                <h3>{t(name, locale)}</h3><span>{t(role, locale)}</span>
                <p>{t(desc, locale)}</p>
                <span className={status === 'lab' ? 'tag' : 'tag planned'}>{t(status === 'lab' ? 'w laboratorium' : 'planowane', locale)}</span>
            </article>)}</div>
            <Note locale={locale}>{t("„W laboratorium” oznacza usługę uruchomioną w środowisku testowym projektu, a nie gotowy, wdrożony produkt. Warstwy planowane nie zostały jeszcze zbudowane.", locale)}</Note>
        </section>
        <section className="container section">
            <SectionHeading number="04" label={t("GRANICA INTEGRACJI", locale)} title={t("DocumentProvider oddziela kontekst od pliku.", locale)} locale={locale}/>
            <div className="editorial-columns two">
                <p className="body-copy">{t("Core nie musi przejmować zadań systemu dokumentowego. DocumentProvider jest granicą, przez którą HomeIntelCore korzysta z Paperless-ngx. Relacje do osób, pojazdów i urządzeń pozostają częścią modelu domu.", locale)}</p>
                <p className="body-copy">{t("Oddzielne bazy PostgreSQL podkreślają ten podział. Kolejka zadań obsługuje pracę w tle, a Docker Compose spina usługi w środowisko homelabu na własnym serwerze. Ta sama zasada ma dotyczyć kolejnych integracji: Home Assistant, monitoringu i energii.", locale)}</p>
            </div>
            <TextLink href={localHref("/network/", locale)} locale={locale}>{t("Zobacz sieć, w której działa serwer", locale)}</TextLink>
        </section>
    </>;
}
