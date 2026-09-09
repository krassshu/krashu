import { t, localHref, type Locale } from '@/lib/i18n';
import { SectionHeading, TextLink } from './ui';
import { Icon } from './icons';
import { DocumentFlow } from './document-flow';
import { ArchitectureDiagram } from './architecture-diagram';
import { NetworkDiagram } from './network-diagram';
import { Roadmap } from './roadmap';

export function IdeaSection({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <section id="idea" className="section container">
        <div className="idea-layout">
            <SectionHeading number="01" label={t("PROBLEM", locale)} title={t("Dane są wszędzie. Kontekst — nigdzie.", locale)} locale={locale}>{t("Dom pełen inteligentnych urządzeń nie jest jeszcze inteligentny jako całość.", locale)}</SectionHeading>
            <div className="idea-explanation">
                <p>{t("Polisa w mailu. Instrukcja w folderze. Faktura na dysku w chmurze. Kamery we własnej aplikacji, urządzenia w kolejnej, a termin przeglądu — gdzieś w pamięci domownika.", locale)}</p>
                <p>{t("Każdy kolejny produkt „smart” zwykle dodaje następną aplikację, zamiast upraszczać życie. HomeIntelCore ma połączyć te informacje we wspólnym modelu domu: z osobą, pojazdem, pomieszczeniem lub urządzeniem, którego dotyczą.", locale)}</p>
            </div>
        </div>
        <div className="scattered-sources"><span>{t("Segregatory", locale)}</span><span>{t("Foldery i PDF-y", locale)}</span><span>{t("Chmury", locale)}</span><span>{t("Maile", locale)}</span><span>{t("Aplikacje producentów", locale)}</span><span>{t("Home Assistant", locale)}</span><span>{t("Monitoring", locale)}</span><span>{t("Fotowoltaika", locale)}</span></div>
        <div className="idea-result"><Icon name="box" size={19}/><span>{t("Jeden model domu łączy informacje z wielu miejsc.", locale)}</span><span className="mono">{t("dane → kontekst → decyzja → działanie", locale)}</span></div>
    </section>;
}

export function DocumentsSection({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <section className="section container">
        <div className="section-top">
            <SectionHeading number="04" label={t("HOME MEMORY / OBECNY ZAKRES", locale)} title={t("Od pliku do informacji.", locale)} locale={locale}>{t("Pamięć domu jest budowana jako pierwsza. Paperless-ngx odczytuje dokument, Core wiąże go z obiektem, a wyszukiwanie pozwala wrócić do informacji wtedy, gdy jest potrzebna.", locale)}</SectionHeading>
            <TextLink href={localHref("/documents/", locale)} locale={locale}>{t("Przepływ dokumentów", locale)}</TextLink>
        </div>
        <DocumentFlow locale={locale}/>
        <div className="tech-footline"><span>{t("OBECNY ZAKRES", locale)}</span><span>{t("Core", locale)}</span><span>{t("Paperless-ngx", locale)}</span><span>{t("OCR", locale)}</span><span>{t("PostgreSQL", locale)}</span><span>{t("Wyszukiwanie", locale)}</span><span>{t("Terminy i przypomnienia", locale)}</span></div>
    </section>;
}

export function ArchitectureSection({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <section className="dark-section"><div className="container section">
        <div className="section-top">
            <SectionHeading number="07" label={t("ARCHITEKTURA", locale)} title={t("Czytelne granice. Wspólny system.", locale)} locale={locale}>{t("Core odpowiada za model obiektów i kontekst. Wyspecjalizowane usługi zajmują się dokumentami, kolejką zadań i przechowywaniem danych. Kolejne warstwy domu dołączają jako integracje.", locale)}</SectionHeading>
            <TextLink href={localHref("/architecture/", locale)} locale={locale}>{t("Poznaj zależności", locale)}</TextLink>
        </div>
        <ArchitectureDiagram locale={locale}/>
    </div></section>;
}

export function NetworkSection({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <section className="section container">
        <div className="section-top">
            <SectionHeading number="08" label={t("INFRASTRUKTURA", locale)} title={t("Dom zaczyna się od dobrej sieci.", locale)} locale={locale}>{t("W planie homelabu router MikroTik RB5009 łączy się z głównym switchem CRS310-8G+2S+IN, a dedykowany link SFP+ prowadzi do serwera HomeIntelCore.", locale)}</SectionHeading>
            <TextLink href={localHref("/network/", locale)} locale={locale}>{t("Dokumentacja sieci", locale)}</TextLink>
        </div>
        <NetworkDiagram locale={locale}/>
        <div className="network-summary">
            <div><h3>{t("Fizyczne połączenia", locale)}</h3><p>{t("Plan portów, patch panelu, pomieszczeń i szybkiego linku serwera. Okablowanie nie zostało jeszcze wykonane.", locale)}</p></div>
            <div><h3>{t("Logiczna segmentacja", locale)}</h3><p>{t("Trusted · Servers · IoT · Cameras · Guest · Lab · Management", locale)}</p><TextLink href={localHref("/network/#segmentation", locale)} locale={locale}>{t("Zobacz koncepcję segmentów", locale)}</TextLink></div>
        </div>
    </section>;
}

export function LocalFirst({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <section className="local-section"><div className="container local-layout">
        <div>
            <div className="eyebrow">{t("09 / LOCAL-FIRST · PRIVACY-FIRST", locale)}</div>
            <h2>{t("Centrum Twojego domu.", locale)}<br />{t("W Twoim domu.", locale)}</h2>
            <p>{t("Dom zawiera wyjątkowo wrażliwe informacje: dokumenty, dane rodziny, finanse, obraz z kamer i historię obecności. Dlatego podstawowe dane domowe zostają na własnym serwerze i nie muszą trafiać do zewnętrznej chmury.", locale)}</p>
            <p>{t("Internet ma rozszerzać możliwości systemu, a nie być warunkiem działania jego podstawowych funkcji.", locale)}</p>
            <div className="local-values"><span><Icon name="shield" size={15}/>{t(" Prywatność i własność danych", locale)}</span><span><Icon name="network" size={15}/>{t(" Praca w LAN", locale)}</span><span><Icon name="server" size={15}/>{t(" Self-hosting", locale)}</span></div>
        </div>
        <figure className="local-diagram">
            <div>{t("Dane domu", locale)}</div>
            <span aria-hidden="true">↓</span>
            <div className="local-server"><Icon name="server" size={21}/>{t(" Serwer HomeIntelCore", locale)}</div>
            <span aria-hidden="true">↓</span>
            <div>{t("Lokalne przechowywanie", locale)}</div>
            <figcaption>{t("Zdalny dostęp i integracje zewnętrzne pozostają osobną, kontrolowaną warstwą poza LAN. Docelowo opiera się ona o WireGuard.", locale)}</figcaption>
        </figure>
    </div></section>;
}

export function RoadmapSection({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <section className="section container">
        <div className="section-top">
            <SectionHeading number="11" label={t("KIERUNEK ROZWOJU", locale)} title={t("Najpierw fundament. Potem kolejne warstwy.", locale)} locale={locale}>{t("Home Memory to obecny zakres prac. Control, Awareness, Intelligence, Autonomy i Home Box są planowanymi etapami, a nie działającymi funkcjami.", locale)}</SectionHeading>
            <TextLink href={localHref("/roadmap/", locale)} locale={locale}>{t("Pełna roadmapa", locale)}</TextLink>
        </div>
        <Roadmap locale={locale}/>
    </section>;
}
