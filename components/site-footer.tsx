import { t, localHref, type Locale } from '@/lib/i18n';
import Link from '@/components/site-link';
import { routes } from '@/lib/site';
import { StatusBadge } from './status-badge';
import { Brand } from './icons';

export function SiteFooter({ locale = 'pl' }: { locale?: Locale }) {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div className="footer-about">
        <Brand />
        <p>{t('Lokalna infrastruktura domowa: dokumenty, obiekty, sieć i automatyka w jednym modelu domu, na własnym serwerze.', locale)}</p>
        <p className="footer-note">{t('Rozwijany i dokumentowany jako żywy projekt techniczny.', locale)}</p>
      </div>
      <nav className="footer-nav" aria-label={t('Nawigacja w stopce', locale)}>
        {routes.map(r => <Link key={r.href} href={localHref(r.href, locale)}>{t(r.label, locale)}</Link>)}
      </nav>
      <dl className="footer-meta">
        <div><dt>{t('Etap', locale)}</dt><dd><span>Home Memory</span> <StatusBadge status="active" locale={locale} /></dd></div>
        <div><dt>{t('Stos', locale)}</dt><dd className="mono">Next.js · PostgreSQL · Paperless-ngx · Docker Compose</dd></div>
        <div><dt>{t('Sieć', locale)}</dt><dd className="mono">MikroTik RB5009 · CRS310</dd></div>
      </dl>
    </div>
    <div className="container footer-bottom"><span>HomeIntelCore</span><span>{t('Local-first · self-hosted · privacy-first', locale)}</span></div>
  </footer>;
}
