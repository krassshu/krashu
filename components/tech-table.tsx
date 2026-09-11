import { t, type Locale } from '@/lib/i18n';
import { stack } from '@/lib/content';
import { StatusBadge } from './status-badge';

/** Technology, responsibility and status in one scannable table. */
export function TechTable({ locale = 'pl' }: { locale?: Locale }) {
  return <div className="table-wrap"><table className="tech-table">
    <caption>{t('Usługi HomeIntelCore i ich status', locale)}</caption>
    <thead><tr><th scope="col">{t('Technologia', locale)}</th><th scope="col">{t('Rola', locale)}</th><th scope="col">{t('Zakres', locale)}</th><th scope="col">{t('Status', locale)}</th></tr></thead>
    <tbody>{stack.map(row => <tr key={row.name}>
      <th scope="row"><span className="mono">{t(row.name, locale)}</span></th>
      <td data-label={t('Rola', locale)}>{t(row.role, locale)}</td>
      <td data-label={t('Zakres', locale)}>{t(row.description, locale)}</td>
      <td data-label={t('Status', locale)}><StatusBadge status={row.status} locale={locale} /></td>
    </tr>)}</tbody>
  </table></div>;
}
