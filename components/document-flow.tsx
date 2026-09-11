import { t, type Locale } from '@/lib/i18n';

const steps: [string, string, string, boolean][] = [
  ['01', 'PDF', 'scan_0032.pdf', true],
  ['02', 'OCR / Paperless-ngx', 'tekst do wyszukiwania', false],
  ['03', 'Metadane dokumentu', 'Polisa OC', false],
  ['04', 'Relacja z obiektem', 'Toyota Corolla', false],
  ['05', 'Termin', '12.04.2027', false],
  ['06', 'Przypomnienie', '30 dni wcześniej', false],
];

/** The document path in the current Home Memory scope, shown before it is explained. */
export function DocumentFlow({ locale = 'pl' }: { locale?: Locale }) {
  return <figure className="doc-flow" aria-label={t('Przepływ dokumentu od pliku PDF do przypomnienia', locale)}>
    <div className="diagram-head"><span>{t('PRZEPŁYW DOKUMENTU', locale)}</span><span>{t('zakres Home Memory', locale)}</span></div>
    <ol className="doc-steps">
      {steps.map(([n, label, value, mono]) => <li key={n}>
        <span className="technical-label">{n} {t(label, locale)}</span>
        <strong className={mono ? 'mono' : undefined}>{t(value, locale)}</strong>
      </li>)}
    </ol>
    <figcaption>{t('Oskar, Toyota Corolla i daty polisy to dane przykładowe. OCR odczytuje tekst; powiązanie z obiektem i termin wymagają poprawnych metadanych. Ta strona nie zawiera działającego importera.', locale)}</figcaption>
  </figure>;
}
