# HomeIntelCore

Dokumentacja projektu **HomeIntelCore**: lokalnego, self-hosted systemu łączącego ludzi, obiekty, dokumenty i terminy w jednym modelu domu. Next.js App Router, TypeScript, Server Components i lekki przełącznik PL / EN.

HomeIntelCore to system local-first i privacy-first, działający na własnym serwerze. Obecny zakres (Home Memory) obejmuje model obiektów, dokumenty z OCR, wyszukiwanie oraz terminy. Sterowanie urządzeniami, monitoring, energia i lokalne AI są planowane jako kolejne warstwy tego samego modelu, z uprawnieniami, zgodą użytkownika i historią działań.

> Nazwa **HomeOS** była wcześniejszą, historyczną nazwą roboczą tego projektu. Obecną nazwą jest HomeIntelCore.

## Uruchomienie

```sh
npm ci
npm run dev
```

Podgląd: http://localhost:3000.

## Weryfikacja

```sh
npm run lint
npm run typecheck
npm run build
```

Build używa Webpacka, zachowując poprawkę repozytorium dla Alpine.

## Testy

```sh
npm test
```

Płynne przewijanie celowo nie jest zadeklarowane globalnie w CSS: animowałoby resety przewijania wykonywane przez router i zostawiało nową podstronę w połowie strony. Obsługuje je `components/anchor-link.tsx` dla kotwic w obrębie strony, z poszanowaniem `prefers-reduced-motion`.

`npm test` uruchamia Playwright (`playwright.config.ts`). Konfiguracja sama buduje projekt (z `SITE_OUTPUT=server`, czyli bez trybu standalone) i startuje `next start` na porcie **3113**; poza CI istniejący serwer na tym porcie jest ponownie wykorzystywany. Testy w `tests/`:

- `pages.spec.ts` — każda z dziesięciu tras (PL i EN) przy szerokościach 390, 768 i 1440 px: status 200, brak poziomego przewijania, dokładnie jeden `h1`, brak błędów konsoli; dodatkowo przekierowanie `/en` → `/en/` (308).
- `hover.spec.ts` — hover na `.card`, `.status-card`, `.hero-module`, `.stage`, `.fnode`, `.relation-node` i `.button` nie zmienia wymiarów elementu ani wysokości jego rodzica (tolerancja 0,5 px). Diagramy React Flow montują się dopiero od 1024 px, więc test czeka na `.react-flow`.
- `interactions.spec.ts` — zakładki topologii sieci, przełączanie łańcuchów w Object Engine bez skoku wysokości, menu mobilne, przełącznik języka i przełącznik motywu.
- `diagrams.spec.ts` — geometria węzłów diagramów: moduły hero, węzły React Flow (w obrębie jednej warstwy), etapy roadmapy i węzły Object Engine mają równe wymiary, ich zawartość nie wychodzi poza kafelek, a hover nie zmienia rozmiaru; dodatkowo układ 2 × 2 modułów przy 390 i 430 px.
- `navigation.spec.ts` — klikanie linków w nawigacji (nie `page.goto`) dla dziewięciu przejść PL i EN, z pozycji 0, 200 i 600 px: każda nowa trasa kończy na `scrollY <= 1` z `h1` poniżej przyklejonego nagłówka. Dodatkowo kotwica „Zobacz model obiektów”, link pomijający nawigację oraz Wstecz/Dalej z natywnym przywracaniem przewijania.
- `a11y.spec.ts` — skan axe (`@axe-core/playwright`) na `/`, `/en/`, `/network/` i `/documents/`; test nie przechodzi przy naruszeniach o wadze `serious` lub `critical`, pozostałe są wypisywane.

## Docker

```sh
docker build -t homeintelcore .
docker run --rm -p 3000:3000 homeintelcore
```

Domyślnie powstaje build `standalone`, zgodny z Dockerfile. Opcjonalny eksport statyczny: `SITE_OUTPUT=export npm run build`; pliki wynikowe trafiają do `out/`. `SITE_OUTPUT=server` buduje zwykły serwer pod `next start` (używane przez testy).

## Routing i języki

Polski: `/`, `/architecture/`, `/network/`, `/documents/`, `/roadmap/`.

Angielski: te same ścieżki z prefiksem `/en/`. Przełącznik języka zachowuje aktualną podstronę. Tłumaczenia znajdują się w `lib/en.json`, wspólne widoki w `components/views/`.

## Zakres treści

Strona rozdziela obecny zakres prac od wizji docelowej:

- **Home Memory** — obecny fundament: ludzie, domy, obiekty, dokumenty, OCR, wyszukiwanie oraz terminy i przypomnienia.
- **Home Control**, **Home Awareness**, **Home Intelligence**, **Home Autonomy** — etapy planowane.
- **Home Box** — dalsza perspektywa: kompletne urządzenie z danymi lokalnymi, integracjami, backupem i lokalnym AI.

Funkcje planowane nie są prezentowane jako już działające. Sieć opisano jako plan homelabu (MikroTik RB5009, CRS310-8G+2S+IN, patch panel, link SFP+ do serwera), a nie jako wykonaną instalację; zdalny dostęp przedstawiono jako osobną warstwę VPN opartą docelowo o WireGuard.

## SEO i domena

Metadata API zawiera tytuły, opisy, canonical, Open Graph, Twitter oraz alternatywne wersje językowe. Dane JSON-LD opisują projekt i ścieżki nawigacji. `app/sitemap.ts` i `app/robots.ts` generują pliki dla robotów.

Podczas budowania ustaw `SITE_URL` na właściwą domenę. Domyślnie indeksowanie jest wyłączone: metadata ma `noindex`, robots blokuje roboty, a sitemap jest pusta. Na docelowym publicznym wdrożeniu ustaw `SITE_INDEXABLE=true` i przebuduj stronę. Przykład:

```sh
docker build --build-arg SITE_URL=https://twoja-domena.pl --build-arg SITE_INDEXABLE=true -t homeintelcore .
```

Bez konfiguracji adres bazowy wskazuje przygotowany adres podglądu Sites; nie oznacza to, że podgląd został opublikowany. Wartości SEO są ustalane podczas buildu, więc zmiana samych zmiennych uruchomionego kontenera ich nie zmieni.

## Struktura

- `app/` — osobne układy językowe, routing, ikona, robots i sitemap.
- `components/views/` — pięć widoków stron współdzielonych przez wersje PL i EN.
- `components/` — `SiteHeader` (z przełącznikiem motywu), `SiteFooter`, `StatusBadge`, `HeroSystem`, `StatusPanel`, `ArchitectureDiagram`, `NetworkPreview` / `NetworkExplorer`, `ObjectExplorer`, `DocumentFlow`, `RoadmapTimeline`, `TechTable` oraz elementy z `ui.tsx`.
- `components/flow/` — diagramy React Flow (`@xyflow/react`) z układem Dagre, własnymi węzłami i krawędziami, podświetlaniem powiązań po hover/fokusie i popoverem szczegółów (Base UI). Poniżej 1024 px diagramy przechodzą w pionowe drzewa HTML; każdy diagram ma też tekstowy odpowiednik dla czytników ekranu.
- `lib/content.ts` — jedno źródło faktów: stos technologiczny ze statusami, etapy roadmapy, segmenty sieci, plan zakończeń okablowania. `lib/graphs.ts` buduje z nich grafy diagramów, `lib/samples.ts` dostarcza przykładowe łańcuchy relacji i kroki przepływu dokumentu.
- `lib/` — metadata, adresy, słownik tłumaczeń (`en.json`, klucz = tekst polski) i obsługa języków.
- `app/globals.css` — tokeny (kolory, typografia, odstępy, promienie), style komponentów, breakpointy i reduced motion.

Statusy w całej witrynie pochodzą z jednego słownika (`W rozwoju`, `W laboratorium`, `Planowane`, `Dalsza perspektywa`, `Koncepcja`). Motyw jasny / systemowy / ciemny jest zapisywany w `localStorage` i stosowany przed pierwszym renderem przez skrypt inline. Interakcje (zakładki, popover) opierają się na `@base-ui/react`, animacje na `motion`. Fonty Instrument Sans i IBM Plex Mono są ładowane przez `next/font/google` i self-hostowane podczas buildu.

Strona prezentuje koncepcję HomeIntelCore; nie implementuje jego backendu ani importowania dokumentów.
