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

Build używa Webpacka, zachowując poprawkę repozytorium dla Alpine. Skrypt `npm test` jest przygotowany pod Playwright; scenariusze przeglądarkowe nie zostały jeszcze dodane.

## Docker

```sh
docker build -t homeintelcore .
docker run --rm -p 3000:3000 homeintelcore
```

Domyślnie powstaje build `standalone`, zgodny z Dockerfile. Opcjonalny eksport statyczny: `SITE_OUTPUT=export npm run build`; pliki wynikowe trafiają do `out/`.

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
- `components/` — `SiteHeader`, `SiteFooter`, `StatusBadge`, `ArchitectureDiagram`, `NetworkTopology`, `ObjectRelationship`, `DocumentFlow`, `RoadmapTimeline`, `TechTable` oraz elementy z `ui.tsx` (`PageIntro`, `SectionHeading`, `MetaList`, `Note`, `TextLink`).
- `lib/content.ts` — jedno źródło faktów: stos technologiczny ze statusami, etapy roadmapy, segmenty sieci, plan zakończeń okablowania.
- `lib/` — metadata, adresy, słownik tłumaczeń (`en.json`, klucz = tekst polski) i obsługa języków.
- `app/globals.css` — tokeny (kolory, typografia, odstępy, promienie), style komponentów, breakpointy i reduced motion.

Statusy w całej witrynie pochodzą z jednego słownika (`W rozwoju`, `W laboratorium`, `Planowane`, `Dalsza perspektywa`, `Koncepcja`). Diagramy są zbudowane w HTML/CSS i na wąskich ekranach przechodzą w układ pionowy. Fonty Instrument Sans i IBM Plex Mono są ładowane przez `next/font/google` i self-hostowane podczas buildu.

Strona prezentuje koncepcję HomeIntelCore; nie implementuje jego backendu ani importowania dokumentów.
