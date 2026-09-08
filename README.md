# HomeOS

Responsywna wizytówka i dokumentacja koncepcji lokalnego systemu zarządzania domem. Next.js App Router, TypeScript, Server Components i lekki przełącznik PL / EN.

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
docker build -t homeos .
docker run --rm -p 3000:3000 homeos
```

Domyślnie powstaje build `standalone`, zgodny z Dockerfile. Opcjonalny eksport statyczny: `SITE_OUTPUT=export npm run build`; pliki wynikowe trafiają do `out/`.

## Routing i języki

Polski: `/`, `/architecture/`, `/network/`, `/documents/`, `/roadmap/`.

Angielski: te same ścieżki z prefiksem `/en/`. Przełącznik języka zachowuje aktualną podstronę. Tłumaczenia znajdują się w `lib/en.json`, wspólne widoki w `components/views/`.

## SEO i domena

Metadata API zawiera tytuły, opisy, canonical, Open Graph, Twitter oraz alternatywne wersje językowe. Dane JSON-LD opisują projekt i ścieżki nawigacji. `app/sitemap.ts` i `app/robots.ts` generują pliki dla robotów.

Podczas budowania ustaw `SITE_URL` na właściwą domenę. Domyślnie indeksowanie jest wyłączone: metadata ma `noindex`, robots blokuje roboty, a sitemap jest pusta. Na docelowym publicznym wdrożeniu ustaw `SITE_INDEXABLE=true` i przebuduj stronę. Przykład:

```sh
docker build --build-arg SITE_URL=https://twoja-domena.pl --build-arg SITE_INDEXABLE=true -t homeos .
```

Bez konfiguracji adres bazowy wskazuje przygotowany adres podglądu Sites; nie oznacza to, że podgląd został opublikowany. Wartości SEO są ustalane podczas buildu, więc zmiana samych zmiennych uruchomionego kontenera ich nie zmieni.

## Struktura

- `app/` — osobne układy językowe, routing, ikona, robots i sitemap.
- `components/` — hero, Object Engine, przepływ dokumentów, diagramy architektury i sieci, roadmapa, nawigacja.
- `lib/` — metadata, adresy, tłumaczenia i obsługa języków.
- `app/globals.css` — wspólne tokeny, układ responsywny i reduced motion.

Treść wyraźnie oddziela obecny zakres MVP w rozwoju od planowanych modułów. Strona prezentuje koncepcję HomeOS; nie implementuje jego backendu ani importowania dokumentów.
