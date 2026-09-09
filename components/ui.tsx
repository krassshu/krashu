import { t, localHref, type Locale } from '@/lib/i18n';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from './icons';
import { siteUrl } from '@/lib/site';
export function TextLink({ href, children, locale = "pl" }: {
    href: string;
    children: ReactNode;
    locale?: Locale;
}) { return <Link className="text-link" href={localHref(href, locale)}>{t(children, locale)}<Icon name="arrow" size={17}/></Link>; }
export function SectionHeading({ number, label, title, children, locale = "pl" }: {
    number: string;
    label: string;
    title: string;
    children?: ReactNode;
    locale?: Locale;
}) { return <div className="section-heading"><div className="eyebrow"><span>{t(number, locale)}</span>{t(" / ", locale)}{t(label, locale)}</div><h2>{t(title, locale)}</h2>{t(children && <p>{t(children, locale)}</p>, locale)}</div>; }
export function PageIntro({ number, label, title, description, locale = "pl" }: {
    number: string;
    label: string;
    title: string;
    description: string;
    locale?: Locale;
}) { return <section className="page-intro container"><nav className="breadcrumb" aria-label={t("\u015Acie\u017Cka nawigacji", locale)}><Link href={localHref("/", locale)}>{t("HomeIntelCore", locale)}</Link><span aria-hidden="true">{t("/", locale)}</span><span aria-current="page">{t(label, locale)}</span></nav><div className="eyebrow">{t(number, locale)}{t(" / DOKUMENTACJA PROJEKTU", locale)}</div><h1>{t(title, locale)}</h1><p>{t(description, locale)}</p></section>; }
export function BreadcrumbData({ label, path, locale = "pl" }: {
    label: string;
    path: string;
    locale?: Locale;
}) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'HomeIntelCore', item: new URL(localHref('/', locale), siteUrl).href }, { '@type': 'ListItem', position: 2, name: t(label, locale), item: new URL(localHref(path, locale), siteUrl).href }] }).replace(/</g, '\\u003c') }}/>; }
export function Note({ children, locale = "pl" }: {
    children: ReactNode;
    locale?: Locale;
}) { return <aside className="note"><Icon name="box" size={18}/><p>{t(children, locale)}</p></aside>; }
