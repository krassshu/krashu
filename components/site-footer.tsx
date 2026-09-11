import { t, localHref, type Locale } from '@/lib/i18n';
import Link from '@/components/site-link';
import { routes } from '@/lib/site';
import { StatusBadge } from './status-badge';

export function SiteFooter({ locale = 'pl' }: { locale?: Locale }) {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div className="footer-about">
        <strong>HomeIntelCore</strong>
        <p>{t('Lokalny system łączący ludzi, obiekty, dokumenty i terminy w jednym modelu domu. Projekt rozwijany i dokumentowany na własnym serwerze.', locale)}</p>
      </div>
      <nav className="footer-nav" aria-label={t('Nawigacja w stopce', locale)}>
        {routes.map(r => <Link key={r.href} href={localHref(r.href, locale)}>{t(r.label, locale)}</Link>)}
      </nav>
      <dl className="footer-meta">
        <div><dt>{t('Status', locale)}</dt><dd><StatusBadge status="active" locale={locale} /> <span>{t('etap Home Memory', locale)}</span></dd></div>
        <div><dt>{t('Charakter', locale)}</dt><dd>{t('Local-first, self-hosted', locale)}</dd></div>
      </dl>
    </div>
  </footer>;
}
