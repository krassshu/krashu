import { t, type Locale } from '@/lib/i18n';
import { Icon } from './icons';
export function ArchitectureDiagram({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <figure className="architecture-diagram">
        <div className="panel-toolbar"><span>{t("HOMEINTELCORE / ARCHITEKTURA LOGICZNA", locale)}</span><span>{t("Zakres Core", locale)}</span></div>
        <div className="architecture-content">
            <div className="architecture-entry">
                <span><Icon name="person" size={17}/>{t(" Użytkownik", locale)}</span>
                <i aria-hidden="true">↓</i>
                <span><strong>{t("Interfejs użytkownika", locale)}</strong><small>{t("Next.js — jedna aplikacja do domu", locale)}</small></span>
                <i aria-hidden="true">↓</i>
                <span className="core-node"><strong>{t("Core", locale)}</strong><small>{t("Obiekty · relacje · uprawnienia · terminy", locale)}</small></span>
            </div>
            <div className="architecture-branches">
                <div className="arch-branch"><strong>{t("PostgreSQL Core", locale)}</strong><span>{t("Model obiektów i relacji", locale)}</span></div>
                <div className="arch-branch"><strong>{t("Kolejka zadań", locale)}</strong><span>{t("Praca w tle: import, OCR, przypomnienia", locale)}</span></div>
                <div className="arch-branch provider">
                    <strong>{t("DocumentProvider", locale)}</strong><span>{t("Granica integracji dokumentów", locale)}</span>
                    <i aria-hidden="true">↓</i>
                    <div className="paperless-node"><strong>{t("Paperless-ngx", locale)}</strong><span>{t("Dokumenty / OCR", locale)}</span></div>
                    <div className="paperless-deps"><span>{t("PostgreSQL", locale)}<small>{t("Dane Paperless", locale)}</small></span><span>{t("Gotenberg", locale)}<small>{t("Konwersja plików", locale)}</small></span></div>
                </div>
            </div>
            <div className="planned-layers">
                <div className="planned-layers-label"><span className="tag planned">{t("planowane warstwy", locale)}</span><span>{t("Nie wdrożone. Dołączają do tego samego modelu domu.", locale)}</span></div>
                <div className="planned-grid">
                    <span><Icon name="plug" size={16}/><strong>{t("Home Assistant", locale)}</strong><small>{t("Urządzenia, sceny, rutyny", locale)}</small></span>
                    <span><Icon name="network" size={16}/><strong>{t("Monitoring / NVR", locale)}</strong><small>{t("Kamery i lokalna rejestracja obrazu", locale)}</small></span>
                    <span><Icon name="clock" size={16}/><strong>{t("Energia", locale)}</strong><small>{t("Falownik, licznik, magazyn energii", locale)}</small></span>
                    <span><Icon name="search" size={16}/><strong>{t("Lokalne AI", locale)}</strong><small>{t("Wyszukiwanie semantyczne i kontekst", locale)}</small></span>
                    <span><Icon name="shield" size={16}/><strong>{t("WireGuard", locale)}</strong><small>{t("Kontrolowany dostęp zdalny", locale)}</small></span>
                </div>
            </div>
            <div className="compose-label"><span className="status-dot"/>{t(" Docker Compose ", locale)}<span>{t("/ uruchomienie usług na własnym serwerze", locale)}</span></div>
        </div>
        <figcaption>{t("Użytkownik korzysta z interfejsu Next.js, a interfejs z Core. Core przechowuje model obiektów i relacji w PostgreSQL, zleca pracę w tle kolejce zadań i sięga po dokumenty przez DocumentProvider, który łączy go z Paperless-ngx, jego bazą PostgreSQL i usługą Gotenberg. Home Assistant, monitoring, energia, lokalne AI i WireGuard to warstwy planowane, jeszcze niewdrożone.", locale)}</figcaption>
    </figure>;
}
