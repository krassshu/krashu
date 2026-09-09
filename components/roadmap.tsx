import { t, type Locale } from '@/lib/i18n';
export type Milestone = { stage: string; name: string; features: string; description: string; status: 'current' | 'planned' | 'horizon' };
export const milestones: Milestone[] = [
    { stage: '01', name: 'Home Memory', features: 'Ludzie · Domy · Obiekty · Dokumenty · OCR · Wyszukiwanie · Terminy', description: 'Aktualny fundament i zakres MVP. Cyfrowa pamięć domu: model obiektów wraz z relacjami, dokumenty z OCR i wyszukiwaniem oraz terminy i przypomnienia. Rozwiązuje pierwszy realny problem i tworzy bazę danych o domu, na której opierają się kolejne warstwy.', status: 'current' },
    { stage: '02', name: 'Home Control', features: 'Home Assistant · Urządzenia · Sceny · Rutyny', description: 'Planowana warstwa sterowania. Home Assistant ma pełnić rolę silnika integracji, a HomeIntelCore dostarczać jedną aplikację do domu zamiast kilkunastu aplikacji producentów.', status: 'planned' },
    { stage: '03', name: 'Home Awareness', features: 'Czujniki · Monitoring · Energia · Zdarzenia', description: 'Planowana warstwa świadomości. Czujniki, kamery i dane o energii mają trafiać do wspólnej historii domu, analizowanej lokalnie tam, gdzie jest to możliwe.', status: 'planned' },
    { stage: '04', name: 'Home Intelligence', features: 'Lokalne AI · Wyszukiwanie semantyczne · Relacje · Kontekst', description: 'Planowana warstwa rozumienia. Lokalny asystent ma korzystać z relacji między danymi i odpowiadać w kontekście domu. Zakres modeli i wymagania sprzętowe nie zostały jeszcze określone.', status: 'planned' },
    { stage: '05', name: 'Home Autonomy', features: 'Informacja · Sugestia · Potwierdzenie · Zatwierdzona rutyna', description: 'Planowana warstwa działania. AI proponuje rutyny, uczy się powtarzalnych zachowań i wykonuje wcześniej zaakceptowane działania w jawnie określonych granicach.', status: 'planned' },
    { stage: '06', name: 'Home Box', features: 'Urządzenie · Dane lokalne · Integracje · Backup · Lokalne AI', description: 'Dalsza perspektywa. Kompletne urządzenie łączące dane, integracje, kopie zapasowe i lokalne AI, możliwe do wdrożenia również przez osobę nietechniczną. Sprzęt i sposób dystrybucji pozostają do zweryfikowania.', status: 'horizon' },
];
const statusLabel: Record<Milestone['status'], string> = { current: 'Obecny fundament · w rozwoju', planned: 'Planowane', horizon: 'Dalsza perspektywa' };
export function Roadmap({ detailed = false, locale = "pl" }: {
    detailed?: boolean;
    locale?: Locale;
}) {
    return <ol className={detailed ? 'roadmap detailed' : 'roadmap'}>{milestones.map(m => <li className={m.status === 'current' ? 'milestone current' : 'milestone'} key={m.stage}>
        <div className="milestone-version"><span className="milestone-dot"/>{m.stage}</div>
        <div className="milestone-content">
            <span className={m.status === 'current' ? 'tag' : 'tag planned'}>{t(statusLabel[m.status], locale)}</span>
            <h3>{m.name}</h3>
            <p>{t(m.features, locale)}</p>
            {detailed ? <p className="milestone-description">{t(m.description, locale)}</p> : null}
        </div>
    </li>)}</ol>;
}
