import { t, type Locale } from '@/lib/i18n';
const segments = [['Trusted', 'Komputery i urządzenia domowników'], ['Servers', 'Usługi uruchamiane na serwerach'], ['IoT', 'Urządzenia połączonego domu'], ['Cameras', 'Kamery i rejestracja obrazu'], ['Guest', 'Urządzenia gości'], ['Lab', 'Środowisko eksperymentów'], ['Management', 'Zarządzanie infrastrukturą']];
export function Segments({ locale = "pl" }: {
    locale?: Locale;
} = {}) { return <div className="segments">{t(segments.map(([name, desc], i) => <div className="segment-row" key={name}><span className="segment-index">{t("0", locale)}{t(i + 1, locale)}</span><strong>{t(name, locale)}</strong><span>{t(desc, locale)}</span><span className="tag planned">{t("koncepcja", locale)}</span></div>), locale)}</div>; }
