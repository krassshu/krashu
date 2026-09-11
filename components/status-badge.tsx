import { t, type Locale } from '@/lib/i18n';
import { statusLabel, type Status } from '@/lib/content';
/** One status vocabulary for the whole site. Text always accompanies the colour. */
export function StatusBadge({ status, locale = 'pl', label }: { status: Status; locale?: Locale; label?: string }) {
  return <span className={`status status-${status}`}><span className="status-dot" aria-hidden="true" />{t(label ?? statusLabel[status], locale)}</span>;
}
