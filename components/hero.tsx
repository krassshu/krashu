import { t, localHref, type Locale } from '@/lib/i18n';
import Link from 'next/link';
import { Icon } from './icons';
import { HomeTree } from './home-tree';
export function Hero({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <section className="hero container">
        <div className="hero-copy">
            <div className="eyebrow"><span className="tiny-square"/>{t(" HOMEINTELCORE / HOME INTELLIGENCE", locale)}</div>
            <h1>{t("Dom, który pamięta.", locale)}<br /><span>{t("Rozumie. Pomaga.", locale)}</span></h1>
            <p>{t("Jeden prywatny system łączący domowników, dokumenty, obiekty, urządzenia i codzienne sprawy. Powstaje po to, by rozumieć kontekst domu i pomagać działać — za Twoją zgodą, na Twoim serwerze.", locale)}</p>
            <div className="hero-actions">
                <Link className="button primary" href="#idea">{t("Poznaj wizję ", locale)}<Icon name="arrow" size={18}/></Link>
                <Link className="button secondary" href={localHref("/roadmap/", locale)}>{t("Zobacz kierunek rozwoju ", locale)}<span aria-hidden="true">↗</span></Link>
            </div>
            <div className="hero-footnote"><span className="status-dot"/>{t(" Local-first ", locale)}<span>/</span>{t(" Privacy-first ", locale)}<span>/</span>{t(" W rozwoju", locale)}</div>
        </div>
        <HomeTree locale={locale}/>
        <div className="hero-bottom">
            <span>{t("WIZJA — MNIEJ ZARZĄDZANIA DOMEM. WIĘCEJ CZASU NA ŻYCIE.", locale)}</span>
            <a href="#idea">{t("Przewiń, żeby poznać system ", locale)}<span aria-hidden="true">↓</span></a>
        </div>
    </section>;
}
