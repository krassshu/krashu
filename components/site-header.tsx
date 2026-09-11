import { LanguageSwitch } from './language-switch';
import { t, localHref, type Locale } from '@/lib/i18n';
import Link from '@/components/site-link';
import { Brand } from './icons';
import { routes } from '@/lib/site';
import { StatusBadge } from './status-badge';
import { SiteNav } from './site-nav';

export function SiteHeader({ locale = 'pl' }: { locale?: Locale }) {
  const items = routes.map(r => ({ href: localHref(r.href, locale), label: t(r.label, locale) }));
  return <header className="site-header">
    <div className="container header-inner">
      <Link href={localHref('/', locale)} className="brand-link" aria-label={t('HomeIntelCore, strona główna', locale)}><Brand /></Link>
      <SiteNav items={items} label={t('Nawigacja główna', locale)} className="desktop-nav" />
      <div className="header-tools">
        <StatusBadge status="active" locale={locale} />
        <LanguageSwitch />
        <details className="mobile-nav">
          <summary>{t('Menu', locale)}</summary>
          <SiteNav items={items} label={t('Nawigacja mobilna', locale)} className="mobile-menu" />
        </details>
      </div>
    </div>
  </header>;
}
