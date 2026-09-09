import { t, type Locale } from '@/lib/i18n';
import { Icon } from './icons';
type Room = { name: string; code: string; ports: [string, 'rj45' | 'sfp'][] };
const rooms: Room[] = [
    { name: 'Sypialnia', code: '01', ports: [['1 × RJ45 → punkt sieciowy', 'rj45']] },
    { name: 'Pokój 2', code: '02', ports: [['1 × RJ45 → punkt sieciowy', 'rj45']] },
    { name: 'Pokój 1', code: '03', ports: [['1 × RJ45 → komputer', 'rj45'], ['1 × SFP+ → serwer / NAS', 'sfp'], ['1 × RJ45 → rezerwa lub mały switch', 'rj45']] },
    { name: 'Salon', code: '04', ports: [['1 × RJ45 → TV', 'rj45'], ['1 × RJ45 → konsola', 'rj45'], ['1 × RJ45 → rezerwa', 'rj45']] },
    { name: 'AP dół', code: '05', ports: [['1 × RJ45 → planowany AP', 'rj45']] },
    { name: 'AP góra', code: '06', ports: [['1 × RJ45 → planowany AP', 'rj45']] },
];
export function NetworkDiagram({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    const room = (r: Room) => <article key={r.code} className={r.code === '03' ? 'network-room server-room' : 'network-room'}>
        <div className="room-title"><span>{r.code}</span><h3>{t(r.name, locale)}</h3></div>
        <ul>{r.ports.map(([port, kind]) => <li className={kind === 'sfp' ? 'fast-port' : ''} key={port}><span className="port-square"/>{t(port, locale)}</li>)}</ul>
    </article>;
    return <figure className="network-diagram">
        <div className="panel-toolbar"><span>{t("NETWORK / TOPOLOGIA FIZYCZNA", locale)}</span><span>{t("plan okablowania", locale)}</span></div>
        <div className="network-canvas">
            <div className="network-source">
                <span>{t("Internet", locale)}</span>
                <span className="connection" aria-hidden="true">→</span>
                <span><Icon name="network" size={18}/>{t(" MikroTik RB5009", locale)}</span>
                <span className="connection" aria-hidden="true">→</span>
                <span>{t("Patch panel", locale)}</span>
                <span className="connection" aria-hidden="true">→</span>
                <div className="switch-node"><Icon name="server" size={24}/><div><small>{t("GŁÓWNY SWITCH", locale)}</small><strong>{t("MikroTik CRS310", locale)}</strong><span>{t("CRS310-8G+2S+IN · 8 × 2.5G RJ45 · 2 × SFP+", locale)}</span></div></div>
            </div>
            <div className="network-rooms">
                {rooms.slice(0, 3).map(room)}
                <span className="rooms-bus" aria-hidden="true"/>
                {rooms.slice(3).map(room)}
            </div>
            <div className="server-link"><Icon name="server" size={18}/><strong>{t("CRS310 ", locale)}<span aria-hidden="true">→</span>{t(" SFP+ ", locale)}<span aria-hidden="true">→</span>{t(" serwer HomeIntelCore / NAS", locale)}</strong><span>{t("szybki link serwera", locale)}</span></div>
            <div className="port-budget">
                <span className="tag planned">{t("bilans portów", locale)}</span>
                <p>{t("Plan przewiduje dziewięć zakończeń RJ45, a CRS310 udostępnia osiem portów RJ45. Jedno zakończenie musi więc pozostać rezerwą albo zostać obsłużone przez dodatkowy mały switch zarządzalny.", locale)}</p>
            </div>
        </div>
        <figcaption>{t("Internet prowadzi do routera MikroTik RB5009, a ten przez patch panel do głównego switcha CRS310-8G+2S+IN. Switch rozprowadza połączenia do pomieszczeń i planowanych punktów dostępowych na dole i na górze. W Pokoju 1 osobny link SFP+ łączy switch z serwerem HomeIntelCore / NAS. To plan okablowania, a nie wykonana instalacja.", locale)}</figcaption>
    </figure>;
}
