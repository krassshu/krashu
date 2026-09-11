import { t, type Locale } from '@/lib/i18n';
import { milestones } from '@/lib/content';
import { StatusBadge } from './status-badge';

/** Development stages on one axis. The current stage is emphasised; Home Box is visually further away. */
export function RoadmapTimeline({ compact = false, locale = 'pl' }: { compact?: boolean; locale?: Locale }) {
  return <ol className={`timeline${compact ? ' timeline-compact' : ''}`} aria-label={t('Etapy rozwoju projektu', locale)}>
    {milestones.map(m => <li key={m.stage} className={`stage stage-${m.status}`} aria-current={m.status === 'active' ? 'step' : undefined}>
      <span className="stage-marker" aria-hidden="true" />
      <span className="stage-number mono">{m.stage}</span>
      <div className="stage-body">
        <div className="stage-head"><h3>{m.name}</h3><StatusBadge status={m.status} locale={locale} /></div>
        <p className="stage-features">{m.features.map(f => t(f, locale)).join(' · ')}</p>
        {compact ? null : <p className="stage-description">{t(m.description, locale)}</p>}
      </div>
    </li>)}
  </ol>;
}
