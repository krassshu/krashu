import { LanguageSwitch } from './language-switch';
import { t, localHref, type Locale } from '@/lib/i18n';
import Link from 'next/link';
import { Brand, Icon } from './icons';
import { routes } from '@/lib/site';
export function Header({ locale = "pl" }: {
    locale?: Locale;
} = {}) { return <header className="site-header"><div className="container header-inner"><Link href={localHref("/", locale)} aria-label={t("HomeIntelCore — strona główna", locale)}><Brand /></Link><nav className="desktop-nav" aria-label={t("Nawigacja główna", locale)}>{routes.slice(1).map(r => <Link key={r.href} href={localHref(r.href, locale)}>{t(r.label, locale)}</Link>)}</nav><LanguageSwitch/><span className="header-status"><span className="status-dot"/>{t(" Projekt w rozwoju", locale)}</span><details className="mobile-nav"><summary>{t("Menu ", locale)}<Icon name="network" size={16}/></summary><nav aria-label={t("Nawigacja mobilna", locale)}>{routes.map(r => <Link key={r.href} href={localHref(r.href, locale)}>{t(r.label, locale)}</Link>)}</nav></details></div></header>; }
export function Footer({ locale = "pl" }: {
    locale?: Locale;
} = {}) { return <footer className="site-footer"><div className="container footer-top"><div><Link href={localHref("/", locale)} aria-label={t("HomeIntelCore — strona główna", locale)}><Brand /></Link><p>{t("Prywatna inteligencja całego domu.", locale)}</p></div><nav aria-label={t("Nawigacja w stopce", locale)}>{routes.map(r => <Link key={r.href} href={localHref(r.href, locale)}>{t(r.label, locale)}</Link>)}</nav></div><div className="container footer-bottom"><span>{t("HomeIntelCore / Dokumentacja projektu", locale)}</span><span>{t("Local-first. Privacy-first.", locale)}</span><span>{t("PL · Europe / Warsaw", locale)}</span></div></footer>; }
