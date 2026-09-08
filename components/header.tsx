import { LanguageSwitch } from './language-switch';
import { t, localHref, type Locale } from '@/lib/i18n';
import Link from 'next/link';
import { Brand, Icon } from './icons';
import { routes } from '@/lib/site';
export function Header({ locale = "pl" }: {
    locale?: Locale;
} = {}) { return <header className="site-header"><div className="container header-inner"><Link href={localHref("/", locale)} aria-label={t("HomeOS \u2014 strona g\u0142\u00F3wna", locale)}><Brand /></Link><nav className="desktop-nav" aria-label={t("Nawigacja g\u0142\u00F3wna", locale)}>{t(routes.slice(1).map(r => <Link key={r.href} href={localHref(r.href, locale)}>{t(r.label, locale)}</Link>), locale)}</nav><LanguageSwitch/><span className="header-status"><span className="status-dot"/>{t(" Projekt w rozwoju", locale)}</span><details className="mobile-nav"><summary>{t("Menu ", locale)}<Icon name="network" size={16}/></summary><nav aria-label={t("Nawigacja mobilna", locale)}>{t(routes.map(r => <Link key={r.href} href={localHref(r.href, locale)}>{t(r.label, locale)}</Link>), locale)}</nav></details></div></header>; }
export function Footer({ locale = "pl" }: {
    locale?: Locale;
} = {}) { return <footer className="site-footer"><div className="container footer-top"><div><Link href={localHref("/", locale)} aria-label={t("HomeOS \u2014 strona g\u0142\u00F3wna", locale)}><Brand /></Link><p>{t("Tw\u00F3j dom. Twoje dane. Tw\u00F3j serwer.", locale)}</p></div><nav aria-label={t("Nawigacja w stopce", locale)}>{t(routes.map(r => <Link key={r.href} href={localHref(r.href, locale)}>{t(r.label, locale)}</Link>), locale)}</nav></div><div className="container footer-bottom"><span>{t("HomeOS / Dokumentacja projektu", locale)}</span><span>{t("Local-first. Z za\u0142o\u017Cenia.", locale)}</span><span>{t("PL \u00B7 Europe / Warsaw", locale)}</span></div></footer>; }
