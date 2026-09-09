import { t, localHref, type Locale } from '@/lib/i18n';
import { SectionHeading, Note, TextLink } from './ui';
import { Icon } from './icons';

const pillars: [string, string, string, string, string][] = [
    ['file', 'Memory', 'Dom pamięta.', 'Dokumenty, obiekty, ludzie i ich historia mają wspólne miejsce i wspólny kontekst.', 'Obecny fundament'],
    ['plug', 'Control', 'Zarządzasz z jednego miejsca.', 'Urządzenia, sceny i rutyny w jednej aplikacji, z Home Assistant jako silnikiem integracji pod spodem.', 'Planowane'],
    ['network', 'Awareness', 'Wiesz, co dzieje się w domu.', 'Zdarzenia z czujników, monitoringu i licznika energii łączą się z rytmem życia domu.', 'Planowane'],
    ['search', 'Intelligence', 'Pytasz własnymi słowami.', 'Lokalne AI korzysta z relacji między danymi, żeby odpowiadać w kontekście, a nie tylko przeszukiwać tekst.', 'Planowane'],
    ['clock', 'Automation', 'Odzyskujesz czas.', 'Zatwierdzone rutyny i działania łączące kilka systemów przejmują powtarzalne obowiązki.', 'Planowane'],
    ['shield', 'Privacy', 'Wiedza o domu zostaje w domu.', 'Praca lokalna, uprawnienia i pełna kontrola nad tym, co opuszcza Twoją sieć.', 'Zasada projektu'],
];

export function VisionPillars({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <section className="section container" id="vision">
        <SectionHeading number="02" label={t("SZEŚĆ FILARÓW", locale)} title={t("Cały dom. Jeden wspólny kontekst.", locale)} locale={locale}>{t("Docelowy kierunek łączy pamięć domu z działaniem. Każda warstwa korzysta z tego samego modelu gospodarstwa domowego.", locale)}</SectionHeading>
        <div className="vision-grid">{pillars.map(([icon, name, title, desc, status], i) => <article key={name}>
            <div className="pillar-label"><Icon name={icon} size={18}/><span className="mono">{String(i + 1).padStart(2, '0')} / {name}</span></div>
            <h3>{t(title, locale)}</h3>
            <p>{t(desc, locale)}</p>
            <span className={status === 'Obecny fundament' ? 'tag' : 'tag planned'}>{t(status, locale)}</span>
        </article>)}</div>
        <Note locale={locale}>{t("To opis wizji docelowej. Obecny zakres prac to Home Memory: ludzie, domy, obiekty, dokumenty, OCR, wyszukiwanie oraz terminy i przypomnienia. Pozostałe filary są kierunkiem rozwoju, a nie działającymi funkcjami.", locale)}</Note>
    </section>;
}

const moments: [string, string, string][] = [
    ['06:30', 'Dom przygotowuje poranek.', 'Wcześniej zatwierdzona rutyna podnosi temperaturę, odsłania rolety i włącza wybrane światła.'],
    ['12:00', 'Faktura znajduje swoje miejsce.', 'Dokument zostaje powiązany z właściwym urządzeniem, a system proponuje termin płatności i przypomnienie.'],
    ['17:00', 'Energia spotyka codzienność.', 'Asystent proponuje przesunięcie ładowania samochodu na godziny największej produkcji fotowoltaiki.'],
    ['22:30', 'Dom pomaga zamknąć dzień.', 'Jedno polecenie uruchamia zatwierdzoną scenę nocną i pokazuje sprawy wymagające uwagi.'],
];

export function ConciergeSection({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <section className="dark-section"><div className="container section">
        <SectionHeading number="05" label={t("DOMOWY CONCIERGE / DOCELOWE DOŚWIADCZENIE", locale)} title={t("Mniej konfiguracji. Więcej życia.", locale)} locale={locale}>{t("Asystent ma rozumieć prośbę, proponować plan i uzyskiwać właściwą zgodę. Zwykłe sterowanie domem pozostaje dostępne bez udziału AI.", locale)}</SectionHeading>
        <div className="concierge-example">
            <span className="mono">{t("PRZYKŁADOWA PROŚBA", locale)}</span>
            <blockquote>{t("„Jutro wstaję o 6:30. Przygotuj mi dom rano.”", locale)}</blockquote>
            <p className="mono">{t("kontekst → propozycja → zgoda → działanie → zapis wyniku", locale)}</p>
        </div>
        <div className="day-grid">{moments.map(([time, title, desc]) => <article key={time}>
            <time>{time}</time><h3>{t(title, locale)}</h3><p>{t(desc, locale)}</p>
        </article>)}</div>
        <Note locale={locale}>{t("Powyższe sceny opisują docelowe doświadczenie, a nie funkcje dostępne dzisiaj. Warstwa concierge wymaga wcześniejszego zbudowania pamięci, sterowania i świadomości domu.", locale)}</Note>
        <TextLink href={localHref("/roadmap/", locale)} locale={locale}>{t("Poznaj etapy prowadzące do tej wizji", locale)}</TextLink>
    </div></section>;
}

const levels: [string, string][] = [
    ['Informacja', 'System pokazuje stan: „Temperatura w salonie wynosi 17°C”.'],
    ['Sugestia', 'System proponuje działanie i czeka na decyzję.'],
    ['Działanie na polecenie', 'Użytkownik prosi, system wykonuje.'],
    ['Zatwierdzona rutyna', 'Powtarzalne działanie zostaje zaakceptowane raz.'],
    ['Ograniczona autonomia', 'System działa sam w jawnie określonych granicach.'],
];

export function AutonomySection({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <section className="container section" id="autonomy">
        <SectionHeading number="06" label={t("ZAUFANIE I UPRAWNIENIA", locale)} title={t("Dom działa w granicach Twojej zgody.", locale)} locale={locale}>{t("Celem nie jest dom robiący cokolwiek bez wiedzy właściciela, lecz kontrolowana autonomia. Automatyzacja otrzymuje uprawnienia krok po kroku.", locale)}</SectionHeading>
        <ol className="autonomy-steps">{levels.map(([name, desc], i) => <li key={name}>
            <span className="autonomy-index mono">{i + 1}</span>
            <div><strong>{t(name, locale)}</strong><span>{t(desc, locale)}</span></div>
        </li>)}</ol>
        <div className="editorial-columns">
            <article><h3>{t("Te same zasady dostępu", locale)}</h3><p>{t("Asystent korzysta wyłącznie z informacji dostępnych osobie, która pyta. Prywatne pola i dokumenty pozostają prywatne także w wyszukiwaniu, odpowiedziach i historii działań.", locale)}</p></article>
            <article><h3>{t("Zgoda, którą można cofnąć", locale)}</h3><p>{t("Uczenie rutyn wymaga zgody. Zatwierdzone działania mają jawne granice, można je wyłączyć, a ich wykonanie zostawia zapis w historii. Działania o dużych skutkach wymagają mocniejszego potwierdzenia.", locale)}</p></article>
            <article><h3>{t("Użyteczny bez internetu", locale)}</h3><p>{t("Podstawowe funkcje domowe mają działać bez usługi w chmurze. Zdalny dostęp jest osobną warstwą opartą docelowo o WireGuard, a zewnętrzne integracje i modele AI pozostają świadomym wyborem użytkownika.", locale)}</p></article>
        </div>
        <Note locale={locale}>{t("Poziomy autonomii opisują model uprawnień przyjęty w projekcie. Żaden z nich nie jest jeszcze zaimplementowany — warstwa sterowania domem należy do planowanych etapów.", locale)}</Note>
    </section>;
}

export function HomeBoxSection({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <section className="container section box-section">
        <div>
            <div className="eyebrow">{t("10 / HOME BOX · DALSZA PERSPEKTYWA", locale)}</div>
            <h2>{t("Domowy serwer prosty jak urządzenie.", locale)}</h2>
            <p className="body-copy">{t("Docelowy Home Box ma łączyć dane, dokumenty, integracje, kopie zapasowe i lokalne AI w jednym urządzeniu stojącym w domu. Podłączasz, konfigurujesz dom, dodajesz urządzenia i korzystasz — bez poczucia, że administrujesz serwerem.", locale)}</p>
            <p className="body-copy">{t("To najdalszy punkt roadmapy. Sprzęt, wydajność i sposób dystrybucji pozostają do zweryfikowania. Dzisiaj system jest projektowany pod własny serwer w homelabie.", locale)}</p>
        </div>
        <div className="box-path">
            <Icon name="server" size={30}/>
            <strong>{t("Dziś", locale)}</strong><span>{t("Własny serwer w homelabie", locale)}</span>
            <i aria-hidden="true">↓</i>
            <strong>{t("Home Box", locale)}</strong><span>{t("Docelowo: kompletne urządzenie", locale)}</span>
            <span className="tag planned">{t("dalsza perspektywa", locale)}</span>
        </div>
    </section>;
}
