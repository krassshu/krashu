import { t, type Locale } from '@/lib/i18n';
import { Icon } from './icons';
const nodes: [string, string, string, boolean][] = [
    ['person', 'Ludzie i domy', 'Wspólny kontekst', false],
    ['file', 'Pamięć', 'Dokumenty i historia', false],
    ['plug', 'Sterowanie', 'Urządzenia i rutyny', true],
    ['network', 'Świadomość', 'Czujniki, kamery, energia', true],
    ['search', 'Inteligencja', 'Odpowiedzi z kontekstem', true],
    ['shield', 'Prywatność', 'Twoje dane. Twoje zasady.', false],
];
export function HomeTree({ locale = "pl" }: {
    locale?: Locale;
} = {}) {
    return <figure className="home-tree">
        <div className="panel-toolbar"><span><span className="status-dot"/>{t(" HOME INTELLIGENCE", locale)}</span><span>{t("wizja produktu", locale)}</span></div>
        <div className="tree-body">
            <div className="tree-root">
                <span className="tree-root-icon"><Icon name="home" size={22}/></span>
                <div><strong>HomeIntelCore</strong><span>{t("Jeden kontekst całego domu.", locale)}</span></div>
                <span className="mono tree-id">{t("root", locale)}</span>
            </div>
            <ul className="tree-nodes">{nodes.map(([icon, name, desc, planned]) => <li key={name}>
                <span className="tree-branch"/><Icon name={icon} size={18}/><strong>{t(name, locale)}</strong>
                <span className="tree-description">{t(desc, locale)}</span>
                {planned ? <span className="tag planned">{t("plan", locale)}</span> : null}
            </li>)}</ul>
        </div>
        <figcaption><Icon name="box" size={14}/>{t(" Budujemy fundament: Home Memory.", locale)}<span className="mono">{t("local://home", locale)}</span></figcaption>
    </figure>;
}
