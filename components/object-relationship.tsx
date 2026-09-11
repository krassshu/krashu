import { t, type Locale } from '@/lib/i18n';

/** One relation chain instead of prose: person, vehicle, document, date. */
export function ObjectRelationship({ locale = 'pl' }: { locale?: Locale }) {
  return <figure className="relation" aria-label={t('Przykład relacji między obiektami: osoba, pojazd, dokument i termin', locale)}>
    <div className="diagram-head"><span>{t('OBJECT ENGINE', locale)}</span><span>{t('dane przykładowe', locale)}</span></div>
    <ol className="relation-chain">
      <li className="relation-node"><span className="technical-label">{t('OSOBA', locale)}</span><strong>Oskar</strong></li>
      <li className="relation-edge"><span className="mono">owns</span></li>
      <li className="relation-node"><span className="technical-label">{t('POJAZD', locale)}</span><strong>Toyota Corolla</strong></li>
      <li className="relation-edge"><span className="mono">has document</span></li>
      <li className="relation-node"><span className="technical-label">{t('DOKUMENT', locale)}</span><strong>{t('Polisa OC', locale)}</strong></li>
      <li className="relation-edge"><span className="mono">expires</span></li>
      <li className="relation-node relation-date"><span className="technical-label">{t('TERMIN', locale)}</span><strong><time dateTime="2027-04-12">{t('12.04.2027', locale)}</time></strong><span>{t('przypomnienie 30 dni wcześniej', locale)}</span></li>
    </ol>
    <figcaption>{t('Plik jest załącznikiem. Obiekt jest punktem odniesienia dla dokumentów, terminów i relacji.', locale)}</figcaption>
  </figure>;
}
