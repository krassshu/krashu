import { t, localHref, type Locale } from '@/lib/i18n';
import { Icon } from './icons';
import { SectionHeading, TextLink } from './ui';
export function ObjectEngine({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <section className="section container object-section" id="objects">
        <div>
            <SectionHeading number="03" label={t("OBJECT ENGINE", locale)} title={t("Najpierw obiekt. Potem wszystko, co go dotyczy.", locale)} locale={locale}>{t("Centralną jednostką HomeIntelCore jest obiekt. Dokumenty, terminy i relacje zbierają się wokół rzeczy, które znasz z codzienności.", locale)}</SectionHeading>
            <p className="body-copy">{t("Osoba, dom, pomieszczenie, pojazd, zwierzę, urządzenie, usługa lub organizacja — wspólny model, różne znaczenia. Dzięki temu system nie jest magazynem plików: rozumie, czego dotyczą przechowywane informacje.", locale)}</p>
            <div className="object-features"><span>{t("Pola", locale)}</span><span>{t("Dokumenty", locale)}</span><span>{t("Relacje", locale)}</span><span>{t("Tagi", locale)}</span><span>{t("Terminy", locale)}</span><span>{t("Historia", locale)}</span><span>{t("Uprawnienia", locale)}</span></div>
            <TextLink href={localHref("/architecture/#object-engine", locale)} locale={locale}>{t("Jak działa model obiektowy", locale)}</TextLink>
        </div>
        <figure className="object-panel">
            <div className="panel-toolbar"><span>{t("OBJECT / VEHICLE", locale)}</span><span>{t("Przykładowe dane", locale)}</span></div>
            <div className="object-title"><span className="object-icon"><Icon name="car" size={27}/></span><div><span className="eyebrow">{t("POJAZD", locale)}</span><h3>{t("Toyota Corolla", locale)}</h3></div><span className="tag">{t("obiekt", locale)}</span></div>
            <dl className="object-fields">
                <div><dt><Icon name="person" size={15}/>{t(" Właściciel", locale)}</dt><dd>{t("Oskar ", locale)}<span className="relation">{t("↗ osoba", locale)}</span></dd></div>
                <div><dt><Icon name="file" size={15}/>{t(" Ubezpieczenie", locale)}</dt><dd>{t("Polisa OC ", locale)}<span className="relation">{t("↗ dokument", locale)}</span></dd></div>
                <div><dt><Icon name="calendar" size={15}/>{t(" Ważność polisy", locale)}</dt><dd><time dateTime="2027-04-12">{t("12.04.2027", locale)}</time></dd></div>
                <div><dt><Icon name="box" size={15}/>{t(" Powiązania", locale)}</dt><dd>{t("Przegląd · faktury · instrukcja", locale)}</dd></div>
            </dl>
            <div className="object-reminder"><Icon name="clock" size={17}/><span>{t("Przypomnienie 30 dni przed końcem polisy", locale)}</span></div>
            <figcaption>{t("Plik jest załącznikiem. Obiekt jest punktem odniesienia.", locale)}</figcaption>
        </figure>
    </section>;
}
