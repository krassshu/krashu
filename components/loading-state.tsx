import type { Locale } from '@/lib/i18n';
import { LogoMark } from './logo-mark';

export function LoadingState({ locale = 'pl' }: { locale?: Locale }) {
  return (
    <div className="route-loading container" role="status" aria-live="polite" aria-busy="true">
      <div className="loader-symbol"><LogoMark size={56} /></div>
      <p>{locale === 'pl' ? 'Wczytywanie strony…' : 'Loading page…'}</p>
      <span className="loader-track" aria-hidden="true"><span /></span>
    </div>
  );
}
