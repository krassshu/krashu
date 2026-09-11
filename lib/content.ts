/** Shared project facts. Every page reads from here so a fact has one place. */
export type Status = 'active' | 'lab' | 'planned' | 'future' | 'concept';

export const statusLabel: Record<Status, string> = {
  active: 'W rozwoju',
  lab: 'W laboratorium',
  planned: 'Planowane',
  future: 'Dalsza perspektywa',
  concept: 'Koncepcja',
};

export type StackEntry = { name: string; role: string; description: string; status: Status };
export const stack: StackEntry[] = [
  { name: 'Next.js', role: 'Interfejs użytkownika', description: 'Warstwa prezentacji łącząca użytkownika z Core. Docelowo jedna aplikacja do całego domu.', status: 'lab' },
  { name: 'Caddy', role: 'Wejście do systemu', description: 'Reverse proxy kierujący ruch do interfejsu w obrębie sieci domowej.', status: 'lab' },
  { name: 'Core', role: 'Model domu', description: 'Obiekty, ich relacje, uprawnienia oraz terminy. Tutaj powstaje wspólny kontekst domu.', status: 'lab' },
  { name: 'PostgreSQL', role: 'Dwie odrębne bazy', description: 'Core i Paperless-ngx przechowują dane we własnych bazach. Podział jest celowy i utrzymywany.', status: 'lab' },
  { name: 'Kolejka zadań', role: 'Praca w tle', description: 'Import dokumentów, OCR i przypomnienia trafiają do kolejki zamiast blokować interfejs.', status: 'lab' },
  { name: 'Paperless-ngx', role: 'Dokumenty i OCR', description: 'Warstwa dokumentowa udostępniana Core przez granicę DocumentProvider. Wersja 3.0.4 w aktualnym laboratorium.', status: 'lab' },
  { name: 'Gotenberg', role: 'Konwersja plików', description: 'Usługa konwersji dokumentów wykorzystywana przez Paperless-ngx.', status: 'lab' },
  { name: 'Docker Compose', role: 'Uruchomienie', description: 'Opisuje wspólne środowisko usług na serwerze HomeIntelCore.', status: 'lab' },
  { name: 'Home Assistant', role: 'Silnik integracji', description: 'Planowana integracja ze smart home: urządzenia, sceny i rutyny pod wspólnym interfejsem.', status: 'planned' },
  { name: 'Monitoring / NVR', role: 'Kamery', description: 'Planowana warstwa rejestracji obrazu, analizowana lokalnie tam, gdzie to możliwe.', status: 'planned' },
  { name: 'Energia', role: 'Fotowoltaika i liczniki', description: 'Planowane źródło danych: falownik, magazyn energii, licznik i ładowarka EV.', status: 'planned' },
  { name: 'Lokalne AI', role: 'Warstwa rozumowania', description: 'Planowane wyszukiwanie semantyczne i odpowiedzi w kontekście domu. Modele i sprzęt nieokreślone.', status: 'planned' },
  { name: 'WireGuard', role: 'Dostęp zdalny', description: 'Planowana, kontrolowana warstwa VPN. Usługi nie są wystawiane publicznie.', status: 'planned' },
];

export type Milestone = { stage: string; name: string; features: string[]; description: string; status: Status };
export const milestones: Milestone[] = [
  { stage: '01', name: 'Home Memory', features: ['Ludzie', 'Domy', 'Obiekty', 'Dokumenty', 'OCR', 'Wyszukiwanie', 'Terminy'], description: 'Obecny zakres prac i zakres MVP. Cyfrowa pamięć domu: model obiektów z relacjami, dokumenty z OCR i wyszukiwaniem oraz terminy i przypomnienia. Rozwiązuje pierwszy realny problem i tworzy bazę danych o domu, na której mają opierać się kolejne warstwy.', status: 'active' },
  { stage: '02', name: 'Home Control', features: ['Home Assistant', 'Urządzenia', 'Sceny', 'Rutyny'], description: 'Planowana warstwa sterowania. Home Assistant ma pełnić rolę silnika integracji, a HomeIntelCore dostarczać jedną aplikację do domu zamiast kilkunastu aplikacji producentów. Zwykłe sterowanie domem ma pozostać dostępne bez udziału AI.', status: 'planned' },
  { stage: '03', name: 'Home Awareness', features: ['Czujniki', 'Monitoring', 'Energia', 'Zdarzenia'], description: 'Planowana warstwa świadomości. Czujniki, kamery i dane o energii mają trafiać do wspólnej historii domu, analizowanej lokalnie tam, gdzie jest to możliwe.', status: 'planned' },
  { stage: '04', name: 'Home Intelligence', features: ['Lokalne AI', 'Wyszukiwanie semantyczne', 'Relacje', 'Kontekst'], description: 'Planowana warstwa rozumienia. Lokalny asystent ma korzystać z relacji między danymi i odpowiadać w kontekście domu, w granicach uprawnień osoby, która pyta. Zakres modeli i wymagania sprzętowe nie zostały jeszcze określone.', status: 'planned' },
  { stage: '05', name: 'Home Autonomy', features: ['Informacja', 'Sugestia', 'Potwierdzenie', 'Zatwierdzona rutyna'], description: 'Planowana warstwa działania. Asystent proponuje rutyny, uczy się powtarzalnych zachowań i wykonuje wcześniej zaakceptowane działania w jawnie określonych granicach. Poziomy autonomii opisane niżej dotyczą tego etapu.', status: 'planned' },
  { stage: '06', name: 'Home Box', features: ['Urządzenie', 'Dane lokalne', 'Integracje', 'Backup', 'Lokalne AI'], description: 'Dalsza perspektywa. Kompletne urządzenie łączące dane, integracje, kopie zapasowe i lokalne AI, możliwe do wdrożenia również przez osobę nietechniczną. Dzisiaj system jest projektowany pod własny serwer w homelabie. Sprzęt, wydajność i sposób dystrybucji pozostają do zweryfikowania.', status: 'future' },
];

export const autonomyLevels: [string, string][] = [
  ['Informacja', 'System pokazuje stan, na przykład temperaturę w salonie.'],
  ['Sugestia', 'System proponuje działanie i czeka na decyzję.'],
  ['Działanie na polecenie', 'Użytkownik prosi, system wykonuje.'],
  ['Zatwierdzona rutyna', 'Powtarzalne działanie zostaje zaakceptowane raz i można je wyłączyć.'],
  ['Ograniczona autonomia', 'System działa sam w jawnie określonych granicach, a każde wykonanie zostawia zapis w historii.'],
];

export type Segment = { name: string; role: string };
export const segments: Segment[] = [
  { name: 'Trusted', role: 'Komputery i urządzenia domowników' },
  { name: 'Servers', role: 'Usługi uruchamiane na serwerach' },
  { name: 'IoT', role: 'Urządzenia połączonego domu' },
  { name: 'Cameras', role: 'Kamery i rejestracja obrazu' },
  { name: 'Guest', role: 'Urządzenia gości' },
  { name: 'Lab', role: 'Środowisko eksperymentów' },
  { name: 'Management', role: 'Zarządzanie infrastrukturą' },
];

/** Planned cable endings from the CRS310. Rooms are a detail; the link type and target matter more. */
export type Branch = { port: 'SFP+' | 'RJ45'; count?: number; target: string; room: string; planned?: boolean; fast?: boolean };
export const branches: Branch[] = [
  { port: 'SFP+', target: 'Serwer HomeIntelCore / NAS', room: 'Pokój 1', fast: true },
  { port: 'RJ45', target: 'Komputer', room: 'Pokój 1' },
  { port: 'RJ45', target: 'Rezerwa lub mały switch zarządzalny', room: 'Pokój 1' },
  { port: 'RJ45', target: 'Punkt sieciowy', room: 'Sypialnia' },
  { port: 'RJ45', target: 'Punkt sieciowy', room: 'Pokój 2' },
  { port: 'RJ45', count: 3, target: 'TV, konsola, rezerwa', room: 'Salon' },
  { port: 'RJ45', target: 'Planowany punkt dostępowy', room: 'AP dół', planned: true },
  { port: 'RJ45', target: 'Planowany punkt dostępowy', room: 'AP góra', planned: true },
];
